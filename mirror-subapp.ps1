# Copies a static sub-app from the live site by following every local URL it references.
# Usage: .\mirror-subapp.ps1 -Origin https://emmanport.pages.dev -Path /boardkid/ -Out reference/subapps
param([string]$Origin, [string]$Path, [string]$Out)
$ErrorActionPreference = 'Stop'
$queue = New-Object System.Collections.Queue
$seen = @{}
$queue.Enqueue($Path)
$home_ = $null
while ($queue.Count) {
  $p = $queue.Dequeue()
  if ($seen[$p]) { continue }
  $seen[$p] = $true
  try { $r = Invoke-WebRequest ($Origin + $p) -UseBasicParsing } catch { Write-Host "  miss $p"; continue }
  $file = if ($p.EndsWith('/')) { $p + 'index.html' } else { $p }
  $dest = Join-Path $Out ($file.TrimStart('/') -replace '/', '\')
  New-Item -ItemType Directory -Force (Split-Path $dest) | Out-Null
  $r.RawContentStream.Position = 0
  $fs = [IO.File]::Create($dest); $r.RawContentStream.CopyTo($fs); $fs.Close()
  $type = "$($r.Headers['Content-Type'])"
  # The homepage fallback means a guessed path isn't real; flag it so it can be dropped.
  if ($type -like 'text/html*' -and $r.Content -match 'sidebar-about-btn') { Write-Host "  fallback $p"; Remove-Item $dest; continue }
  Write-Host "  got $p ($($r.RawContentLength) B)"
  if ($type -notmatch 'html|javascript|css|json|svg|manifest') { continue }
  $base = $p.Substring(0, $p.LastIndexOf('/') + 1)
  $text = $r.Content
  $refs = [regex]::Matches($text, '(?:src|href|content)=["'']([^"''#?]+)|url\(["'']?([^"'')#?]+)|["''`](\.{0,2}/?[\w./-]+\.(?:js|mjs|css|json|png|jpe?g|webp|svg|ico|woff2?|ttf|mp3|mp4|webm|wasm|txt|webmanifest))["''`]')
  foreach ($m in $refs) {
    $u = @($m.Groups[1].Value, $m.Groups[2].Value, $m.Groups[3].Value | Where-Object { $_ })[0]
    if (-not $u -or $u -match '^(https?:|data:|mailto:|//)') { continue }
    $abs = if ($u.StartsWith('/')) { $u } else { (New-Object Uri((New-Object Uri("http://x$base")), $u)).AbsolutePath }
    if ($abs.StartsWith($Path) -and -not $seen[$abs]) { $queue.Enqueue($abs) }
  }
}
