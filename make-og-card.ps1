<#
  Renders src/og-card.html to public/img/og-card.png (1200x630) with headless Edge.

    .\make-og-card.ps1
#>
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
. "$PSScriptRoot/cdp.ps1"

$source = ([Uri](Resolve-Path 'src/og-card.html').Path).AbsoluteUri
$target = Join-Path $PSScriptRoot 'public/img/og-card.png'

$edge = Start-HeadlessEdge
try {
  Invoke-Cdp 'Emulation.setDeviceMetricsOverride' @{ width = 1200; height = 630; deviceScaleFactor = 1; mobile = $false } | Out-Null
  Invoke-Cdp 'Page.navigate' @{ url = $source } | Out-Null
  # Wait for the web fonts, or the card renders in a fallback face.
  $fonts = Invoke-Js "new Promise(r => (document.readyState === 'complete' ? r() : addEventListener('load', () => r(), { once: true }))).then(() => document.fonts.ready).then(() => [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight))"
  if (-not ($fonts -match 'Josefin')) { throw "Josefin Sans did not load (got: $($fonts -join ', ')). Check the internet connection." }
  $data = (Invoke-Cdp 'Page.captureScreenshot' @{ format = 'png'; clip = @{ x = 0; y = 0; width = 1200; height = 630; scale = 1 } }).data
  [IO.File]::WriteAllBytes($target, [Convert]::FromBase64String($data))
  Write-Host ("Wrote {0} ({1:N0} KB), fonts: {2}" -f $target, ((Get-Item $target).Length / 1KB), (($fonts | Select-Object -Unique) -join ', '))
} finally {
  Stop-HeadlessEdge $edge
}
