<#
  Loads a page in headless Edge, scrolls to the bottom, and reports how many bytes
  the local server (serve.ps1) sent, plus layout shift. Also saves screenshots.

    .\measure.ps1 -Url http://localhost:4173/ [-Mobile] [-Shots C:\path\to\folder] [-Name home]
    .\measure.ps1 -Url http://localhost:4173/ -Elements '.learning-card'   # close-up screenshots

  Reported numbers:
    initialKB  = bytes sent after the page has loaded and settled, without scrolling
    scrolledKB = bytes sent after scrolling through the whole page (videos play as they enter view)
    cls        = cumulative layout shift during load and scroll (under 0.1 is "good")
  Google Fonts and Cloudflare scripts come from other hosts and are not counted.
  Video requests the browser abandons are counted up to the moment they stop, which on
  localhost is usually most of the file, so treat video bytes as an upper bound.
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
. "$PSScriptRoot/cdp.ps1"
$origin = ([Uri]$Url).GetLeftPart([UriPartial]::Authority)
$view = if ($Mobile) { '375' } else { '1440' }

function Get-ServerStats([switch]$Reset) {
  $q = if ($Reset) { '?reset=1' } else { '' }
  Invoke-RestMethod "$origin/__stats$q"
}
function Format-ByType($stats) {
  ($stats.byType.PSObject.Properties | Sort-Object Value -Descending | ForEach-Object { "$($_.Name)=$([math]::Round($_.Value / 1KB))KB" }) -join ' '
}
function Save-Png([string]$File, $Params) {
  if (-not $Shots) { return }
  New-Item -ItemType Directory -Force $Shots | Out-Null
  $data = (Invoke-Cdp 'Page.captureScreenshot' $Params).data
  [IO.File]::WriteAllBytes((Join-Path $Shots $File), [Convert]::FromBase64String($data))
}

$edge = Start-HeadlessEdge
try {
  if ($Mobile) {
    Invoke-Cdp 'Emulation.setDeviceMetricsOverride' @{ width = 375; height = 812; deviceScaleFactor = 2; mobile = $true } | Out-Null
    Invoke-Cdp 'Emulation.setTouchEmulationEnabled' @{ enabled = $true; maxTouchPoints = 5 } | Out-Null
    Invoke-Cdp 'Emulation.setEmitTouchEventsForMouse' @{ enabled = $true; configuration = 'mobile' } | Out-Null
  } else {
    Invoke-Cdp 'Emulation.setDeviceMetricsOverride' @{ width = 1440; height = 900; deviceScaleFactor = 1; mobile = $false } | Out-Null
  }
  Invoke-Cdp 'Network.enable' | Out-Null
  Invoke-Cdp 'Network.setCacheDisabled' @{ cacheDisabled = $true } | Out-Null
  # Sum layout shifts not caused by user input, from the first paint on.
  Invoke-Cdp 'Page.addScriptToEvaluateOnNewDocument' @{ source = @'
window.__cls = 0;
new PerformanceObserver((list) => {
  for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
}).observe({ type: 'layout-shift', buffered: true });
'@ } | Out-Null

  Get-ServerStats -Reset | Out-Null
  Invoke-Cdp 'Page.navigate' @{ url = $Url } | Out-Null
  Invoke-Js "new Promise(r => document.readyState === 'complete' ? r() : addEventListener('load', () => r(), { once: true }))" | Out-Null
  Start-Sleep -Seconds $SettleSeconds
  $initial = Get-ServerStats
  $clsInitial = Invoke-Js 'window.__cls'
  Save-Png "$Name-$view-top.png" @{ format = 'png' }

  $scrolled = $initial
  if (-not $NoScroll) {
    Invoke-Js @'
(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  for (let i = 0; i < 80 && scrollY + innerHeight < document.documentElement.scrollHeight - 2; i++) {
    window.scrollBy({ top: innerHeight * 0.6, behavior: 'instant' });
    await sleep(1000);
  }
  await sleep(3000);
})()
'@ | Out-Null
    $scrolled = Get-ServerStats
    Invoke-Js "window.scrollTo({ top: 0, behavior: 'instant' })" | Out-Null
    Start-Sleep -Milliseconds 800
    # Mobile renders at 2x; capture full pages at 1x so tall pages stay under the GPU texture limit.
    $h = [int](Invoke-Js 'document.documentElement.scrollHeight')
    $w = [int](Invoke-Js 'innerWidth')
    $scale = if ($Mobile) { 0.5 } else { 1 }
    Save-Png "$Name-$view-full.png" @{ format = 'png'; captureBeyondViewport = $true; clip = @{ x = 0; y = 0; width = $w; height = [Math]::Min($h, 16000); scale = $scale } }
  }

  foreach ($selector in $Elements) {
    $found = Invoke-Js "(() => { const el = document.querySelector('$selector'); if (!el) return false; el.scrollIntoView({ block: 'center', behavior: 'instant' }); return true; })()"
    if (-not $found) { Write-Warning "No element for $selector"; continue }
    Start-Sleep -Milliseconds 800
    # Read the position after scrolling has settled (the page uses smooth scrolling).
    $rect = Invoke-Js "(() => { const r = document.querySelector('$selector').getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }; })()"
    $safe = ($selector -replace '[^\w-]+', '_').Trim('_')
    $clip = @{ x = [Math]::Max(0, $rect.x - 12); y = [Math]::Max(0, $rect.y - 12); width = $rect.w + 24; height = [Math]::Min($rect.h + 24, 4000); scale = 1 }
    Save-Png "$Name-$view-$safe.png" @{ format = 'png'; captureBeyondViewport = $true; clip = $clip }
  }

  $layout = Invoke-Js @'
(() => {
  const doc = document.documentElement;
  const imgs = [...document.images];
  return {
    title: document.title,
    overflowX: doc.scrollWidth > innerWidth,
    imgsMissingSize: imgs.filter((i) => !i.getAttribute('width') && !getComputedStyle(i).aspectRatio.includes('/')).map((i) => i.getAttribute('src') || i.dataset.src),
    brokenImgs: imgs.filter((i) => i.getAttribute('src') && i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')),
    cls: window.__cls
  };
})()
'@

  [pscustomobject]@{
    url = $Url; view = $view
    initialKB = [math]::Round($initial.bytes / 1KB); scrolledKB = [math]::Round($scrolled.bytes / 1KB)
    initialByType = Format-ByType $initial; scrolledByType = Format-ByType $scrolled
    clsLoad = [math]::Round($clsInitial, 4); clsTotal = [math]::Round($layout.cls, 4)
    title = $layout.title; overflowX = $layout.overflowX
    imgsMissingSize = ($layout.imgsMissingSize -join ', '); brokenImgs = ($layout.brokenImgs -join ', ')
  }
} finally {
  Stop-HeadlessEdge $edge
}
