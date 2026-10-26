<#
  Local preview server for dist/, close to how Cloudflare serves it:
  /x serves x.html or x/index.html, text is gzipped, video supports byte ranges.

    .\serve.ps1            # http://localhost:4173
    .\serve.ps1 -Root reference/live-snapshot   # the untouched live copy

  GET /__stats returns bytes sent since the last reset; /__stats?reset=1 resets it.
  Everything is sent with Cache-Control: no-store so each page load is measured cold.
#>
param([string]$Root = 'dist', [int]$Port = 4173)
$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path (Join-Path $PSScriptRoot $Root)).Path

$types = @{
  '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'
  '.json' = 'application/json'; '.svg' = 'image/svg+xml'; '.xml' = 'application/xml'; '.txt' = 'text/plain; charset=utf-8'
  '.vtt' = 'text/vtt; charset=utf-8'; '.webp' = 'image/webp'; '.jpg' = 'image/jpeg'; '.png' = 'image/png'; '.ico' = 'image/x-icon'
  '.mp4' = 'video/mp4'; '.pdf' = 'application/pdf'; '.woff2' = 'font/woff2'
}
$compressible = '.html', '.css', '.js', '.json', '.svg', '.xml', '.txt', '.vtt'

function Resolve-File([string]$urlPath) {
  $rel = [Uri]::UnescapeDataString($urlPath).TrimStart('/') -replace '/', '\'
  $base = Join-Path $Root $rel
  foreach ($candidate in $base, "$base.html", (Join-Path $base 'index.html')) {
    if ((Test-Path -LiteralPath $candidate -PathType Leaf) -and ([IO.Path]::GetFullPath($candidate).StartsWith($Root))) { return $candidate }
  }
  $null
}

$stats = @{ bytes = [long]0; requests = 0; byType = @{} }
$listener = [Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $Root at http://localhost:$Port/"

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request; $res = $ctx.Response
  try {
    $res.Headers['Cache-Control'] = 'no-store'
    $path = $req.Url.AbsolutePath

    if ($path -eq '/__stats') {
      $body = [Text.Encoding]::UTF8.GetBytes((@{ bytes = $stats.bytes; requests = $stats.requests; byType = $stats.byType } | ConvertTo-Json -Compress))
      if ($req.QueryString['reset']) { $stats.bytes = 0; $stats.requests = 0; $stats.byType = @{} }
      $res.ContentType = 'application/json'; $res.OutputStream.Write($body, 0, $body.Length); continue
    }

    $file = Resolve-File $path
    $status = 200
    if (-not $file) {
      $status = 404
      $file = @((Join-Path $Root '404.html'), (Join-Path $Root 'index.html')) | Where-Object { Test-Path $_ } | Select-Object -First 1
      # Cloudflare serves the homepage for unknown paths when there is no 404.html.
      if ($file -like '*index.html') { $status = 200 }
    }
    $ext = [IO.Path]::GetExtension($file).ToLower()
    $res.ContentType = if ($types[$ext]) { $types[$ext] } else { 'application/octet-stream' }
    $bytes = [IO.File]::ReadAllBytes($file)
    $res.StatusCode = $status

    if ($compressible -contains $ext -and "$($req.Headers['Accept-Encoding'])" -match 'gzip') {
      $ms = [IO.MemoryStream]::new()
      $gz = [IO.Compression.GZipStream]::new($ms, [IO.Compression.CompressionLevel]::Optimal, $true)
      $gz.Write($bytes, 0, $bytes.Length); $gz.Dispose()
      $bytes = $ms.ToArray()
      $res.Headers['Content-Encoding'] = 'gzip'
      $start = 0; $len = $bytes.Length
    } else {
      $res.Headers['Accept-Ranges'] = 'bytes'
      $start = 0; $len = $bytes.Length
      if ("$($req.Headers['Range'])" -match '^bytes=(\d*)-(\d*)$') {
        $from = $Matches[1]; $to = $Matches[2]
        if ($from -ne '') { $start = [long]$from; $end = if ($to -ne '') { [Math]::Min([long]$to, $bytes.Length - 1) } else { $bytes.Length - 1 } }
        else { $start = [Math]::Max(0, $bytes.Length - [long]$to); $end = $bytes.Length - 1 }
        $len = $end - $start + 1
        $res.StatusCode = 206
        $res.Headers['Content-Range'] = "bytes $start-$end/$($bytes.Length)"
      }
    }
    $res.ContentLength64 = $len
    $key = $ext.TrimStart('.'); $stats.requests++
    if ($req.HttpMethod -ne 'HEAD') {
      # Write in chunks so a request the browser aborts mid-stream (common for video)
      # only counts the bytes that actually went out.
      $sent = 0
      while ($sent -lt $len) {
        $n = [Math]::Min(65536, $len - $sent)
        $res.OutputStream.Write($bytes, $start + $sent, $n)
        $sent += $n; $stats.bytes += $n; $stats.byType[$key] = [long]$stats.byType[$key] + $n
      }
    }
  } catch {
    # Aborted by the browser; the bytes sent so far are already counted.
  } finally {
    try { $res.Close() } catch {}
  }
}
