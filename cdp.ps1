<#
  Minimal Chrome DevTools Protocol client for headless Edge. Dot-source it:

    . "$PSScriptRoot/cdp.ps1"
    $edge = Start-HeadlessEdge
    try { Invoke-Cdp 'Page.navigate' @{ url = '...' }; Invoke-Js 'document.title' } finally { Stop-HeadlessEdge $edge }
#>

function Start-HeadlessEdge {
  $exe = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
  $profileDir = Join-Path $env:TEMP "headless-edge-$PID-$(Get-Random)"
  $port = 9300 + (Get-Random -Maximum 500)
  $proc = Start-Process $exe -PassThru -ArgumentList @(
    '--headless=new', "--remote-debugging-port=$port", "--user-data-dir=`"$profileDir`"",
    '--autoplay-policy=no-user-gesture-required', '--mute-audio', '--no-first-run', '--disable-extensions',
    '--disable-background-networking', '--window-size=1440,900', 'about:blank')
  $target = $null
  for ($i = 0; $i -lt 50 -and -not $target; $i++) {
    Start-Sleep -Milliseconds 200
    try { $target = (Invoke-RestMethod "http://127.0.0.1:$port/json/list") | Where-Object type -eq 'page' | Select-Object -First 1 } catch {}
  }
  if (-not $target) { throw 'Edge did not start' }
  $ws = [Net.WebSockets.ClientWebSocket]::new()
  $ws.Options.KeepAliveInterval = [TimeSpan]::FromSeconds(30)
  $ws.ConnectAsync([Uri]$target.webSocketDebuggerUrl, [Threading.CancellationToken]::None).Wait()
  $script:CdpSocket = $ws
  $script:CdpMsgId = 0
  [pscustomobject]@{ Process = $proc; Socket = $ws; ProfileDir = $profileDir }
}

function Invoke-Cdp([string]$Method, $Params = @{}) {
  $ws = $script:CdpSocket
  $script:CdpMsgId++
  $id = $script:CdpMsgId
  $json = @{ id = $id; method = $Method; params = $Params } | ConvertTo-Json -Depth 10 -Compress
  $bytes = [Text.Encoding]::UTF8.GetBytes($json)
  $ws.SendAsync([ArraySegment[byte]]::new($bytes), [Net.WebSockets.WebSocketMessageType]::Text, $true, [Threading.CancellationToken]::None).Wait()
  $buffer = New-Object byte[] 1048576
  while ($true) {
    $ms = [IO.MemoryStream]::new()
    do {
      $r = $ws.ReceiveAsync([ArraySegment[byte]]::new($buffer), [Threading.CancellationToken]::None).Result
      $ms.Write($buffer, 0, $r.Count)
    } while (-not $r.EndOfMessage)
    $msg = [Text.Encoding]::UTF8.GetString($ms.ToArray()) | ConvertFrom-Json
    if ($msg.id -eq $id) {
      if ($msg.error) { throw "$Method failed: $($msg.error.message)" }
      return $msg.result
    }
  }
}

# Evaluates JavaScript in the page (promises are awaited) and returns the value.
function Invoke-Js([string]$Expression) {
  $r = Invoke-Cdp 'Runtime.evaluate' @{ expression = $Expression; awaitPromise = $true; returnByValue = $true; timeout = 120000 }
  if ($r.exceptionDetails) { throw "JS error: $($r.exceptionDetails.exception.description)" }
  $r.result.value
}

function Stop-HeadlessEdge($Edge) {
  if (-not $Edge) { return }
  try { $Edge.Socket.Dispose() } catch {}
  # -WhatIf:$false so a caller's -WhatIf never leaves Edge running.
  Stop-Process -Id $Edge.Process.Id -Force -ErrorAction SilentlyContinue -WhatIf:$false -Confirm:$false
  Get-CimInstance Win32_Process -Filter "Name='msedge.exe'" | Where-Object { $_.CommandLine -like "*$($Edge.ProfileDir)*" } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue -WhatIf:$false -Confirm:$false }
  Start-Sleep -Milliseconds 500
  Remove-Item $Edge.ProfileDir -Recurse -Force -ErrorAction SilentlyContinue -WhatIf:$false -Confirm:$false
}
