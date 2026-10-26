<#
  Loads a page in headless Edge, scrolls to the bottom, and reports how many bytes
  the local server (serve.ps1) sent. Also saves screenshots.

    .\measure.ps1 -Url http://localhost:4173/ [-Mobile] [-Shots C:\path\to\folder] [-Name home]

  Reported numbers:
    initial  = bytes sent after the page has loaded and settled, without scrolling
    scrolled = bytes sent after scrolling through the whole page (videos play as they enter view)
  Google Fonts and Cloudflare scripts come from other hosts and are not counted.
#>
param(
  [Parameter(Mandatory)][string]$Url,
  [switch]$Mobile,
  [string]$Shots,
  [string]$Name = 'page',
  [int]$SettleSeconds = 6,
  [switch]$NoScroll,
  [string[]]$Elements = @()
)
$ErrorActionPreference = 'Stop'
$origin = ([Uri]$Url).GetLeftPart([UriPartial]::Authority)
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$profileDir = Join-Path $env:TEMP "measure-edge-$PID"
$debugPort = 9300 + (Get-Random -Maximum 500)

$proc = Start-Process $edge -PassThru -ArgumentList @(
  '--headless=new', "--remote-debugging-port=$debugPort", "--user-data-dir=`"$profileDir`"",
  '--autoplay-policy=no-user-gesture-required', '--mute-audio', '--no-first-run', '--disable-extensions',
  '--disable-background-networking', '--window-size=1440,900', 'about:blank')

$ws = $null
try {
  $target = $null
  for ($i = 0; $i -lt 50 -and -not $target; $i++) {
    Start-Sleep -Milliseconds 200
    try { $target = (Invoke-RestMethod "http://127.0.0.1:$debugPort/json/list") | Where-Object type -eq 'page' | Select-Object -First 1 } catch {}
  }
  if (-not $target) { throw 'Edge did not start' }

  $ws = [Net.WebSockets.ClientWebSocket]::new()
  $ws.Options.KeepAliveInterval = [TimeSpan]::FromSeconds(30)
  $ws.ConnectAsync([Uri]$target.webSocketDebuggerUrl, [Threading.CancellationToken]::None).Wait()
  $script:msgId = 0

  function Cdp([string]$method, $params = @{}) {
    $script:msgId++
    $id = $script:msgId
    $json = @{ id = $id; method = $method; params = $params } | ConvertTo-Json -Depth 10 -Compress
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
        if ($msg.error) { throw "$method failed: $($msg.error.message)" }
        return $msg.result
      }
    }
  }
  function Js([string]$expression) {
    (Cdp 'Runtime.evaluate' @{ expression = $expression; awaitPromise = $true; returnByValue = $true; timeout = 120000 }).result.value
  }
  function Stats([switch]$Reset) {
    $q = if ($Reset) { '?reset=1' } else { '' }
    Invoke-RestMethod "$origin/__stats$q"
  }
  function Shot([string]$file, [switch]$Full) {
    if (-not $Shots) { return }
    New-Item -ItemType Directory -Force $Shots | Out-Null
    $p = @{ format = 'png' }
    if ($Full) {
      $h = [int](Js 'document.documentElement.scrollHeight')
      $w = [int](Js 'innerWidth')
      $p.captureBeyondViewport = $true
      # Mobile renders at 2x; capture full pages at 1x so tall pages stay under the GPU texture limit.
      $scale = if ($Mobile) { 0.5 } else { 1 }
      $p.clip = @{ x = 0; y = 0; width = $w; height = [Math]::Min($h, 16000); scale = $scale }
    }
    $data = (Cdp 'Page.captureScreenshot' $p).data
    [IO.File]::WriteAllBytes((Join-Path $Shots $file), [Convert]::FromBase64String($data))
  }

  if ($Mobile) {
    Cdp 'Emulation.setDeviceMetricsOverride' @{ width = 375; height = 812; deviceScaleFactor = 2; mobile = $true } | Out-Null
    Cdp 'Emulation.setTouchEmulationEnabled' @{ enabled = $true; maxTouchPoints = 5 } | Out-Null
    Cdp 'Emulation.setEmitTouchEventsForMouse' @{ enabled = $true; configuration = 'mobile' } | Out-Null
  } else {
    Cdp 'Emulation.setDeviceMetricsOverride' @{ width = 1440; height = 900; deviceScaleFactor = 1; mobile = $false } | Out-Null
  }
  Cdp 'Network.enable' | Out-Null
  Cdp 'Network.setCacheDisabled' @{ cacheDisabled = $true } | Out-Null

  Stats -Reset | Out-Null
  Cdp 'Page.navigate' @{ url = $Url } | Out-Null
  Js "new Promise(r => document.readyState === 'complete' ? r() : addEventListener('load', () => r(), { once: true }))" | Out-Null
  Start-Sleep -Seconds $SettleSeconds
  $initial = Stats
  $view = if ($Mobile) { '375' } else { '1440' }
  Shot "$Name-$view-top.png"

  $scrolled = $initial
  if (-not $NoScroll) {
    Js @'
(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  for (let i = 0; i < 80 && scrollY + innerHeight < document.documentElement.scrollHeight - 2; i++) {
    window.scrollBy({ top: innerHeight * 0.6, behavior: 'instant' });
    await sleep(1000);
  }
  await sleep(3000);
})()
'@ | Out-Null
    $scrolled = Stats
    Js "window.scrollTo({ top: 0, behavior: 'instant' })" | Out-Null
    Start-Sleep -Milliseconds 800
    Shot "$Name-$view-full.png" -Full
  }

  # Close-up screenshots of specific elements, e.g. -Elements '.learning-card','.sidebar'
  foreach ($selector in $Elements) {
    $found = Js "(() => { const el = document.querySelector('$selector'); if (!el) return false; el.scrollIntoView({ block: 'center', behavior: 'instant' }); return true; })()"
    if (-not $found) { Write-Warning "No element for $selector"; continue }
    Start-Sleep -Milliseconds 800
    # Read the position after scrolling has settled (the page uses smooth scrolling).
    $rect = Js "(() => { const r = document.querySelector('$selector').getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }; })()"
    if ($Shots) {
      $clip = @{ x = [Math]::Max(0, $rect.x - 12); y = [Math]::Max(0, $rect.y - 12); width = $rect.w + 24; height = [Math]::Min($rect.h + 24, 4000); scale = 1 }
      $data = (Cdp 'Page.captureScreenshot' @{ format = 'png'; captureBeyondViewport = $true; clip = $clip }).data
      $safe = ($selector -replace '[^\w-]+', '_').Trim('_')
      [IO.File]::WriteAllBytes((Join-Path $Shots "$Name-$view-$safe.png"), [Convert]::FromBase64String($data))
    }
  }

  $layout = Js @'
(() => {
  const doc = document.documentElement;
  const imgs = [...document.images];
  return {
    title: document.title,
    overflowX: doc.scrollWidth > innerWidth,
    scrollWidth: doc.scrollWidth,
    imgsMissingSize: imgs.filter((i) => !i.getAttribute('width') && !getComputedStyle(i).aspectRatio.includes('/')).map((i) => i.getAttribute('src')),
    brokenImgs: imgs.filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== 'lazy').map((i) => i.getAttribute('src')),
    cls: window.__cls ?? null
  };
})()
'@

  [pscustomobject]@{
    url = $Url; view = $view
    initialKB = [math]::Round($initial.bytes / 1KB); scrolledKB = [math]::Round($scrolled.bytes / 1KB)
    initialByType = ($initial.byType.PSObject.Properties | Sort-Object Value -Descending | ForEach-Object { "$($_.Name)=$([math]::Round($_.Value/1KB))KB" }) -join ' '
    scrolledByType = ($scrolled.byType.PSObject.Properties | Sort-Object Value -Descending | ForEach-Object { "$($_.Name)=$([math]::Round($_.Value/1KB))KB" }) -join ' '
    title = $layout.title; overflowX = $layout.overflowX; scrollWidth = $layout.scrollWidth
    imgsMissingSize = ($layout.imgsMissingSize -join ', '); brokenImgs = ($layout.brokenImgs -join ', ')
  }
} finally {
  if ($ws) { $ws.Dispose() }
  Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
  Get-CimInstance Win32_Process -Filter "Name='msedge.exe'" | Where-Object { $_.CommandLine -like "*$profileDir*" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
  Start-Sleep -Milliseconds 500
  Remove-Item $profileDir -Recurse -Force -ErrorAction SilentlyContinue
}
