<#
  Builds the site into dist/ (the folder to deploy).

    .\build.ps1

  src/pages/*.html   page templates
  src/data/*.json    projects and site settings (edit these to change content)
  src/assets/        CSS, JS and the icon sprite; copied with a content hash in the name
  public/            copied to dist/ as-is (images, videos, PDF, favicons)

  Template syntax:
    {{css}} {{js}}               hashed asset URLs
    {{site.key}}                 value from src/data/site.json
    {{icon name extra-classes}}  <svg> that uses the icon sprite
    <!-- build:name -->          replaced by a generated block (see $blocks below)
#>
param([string]$Out = 'dist')
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
$utf8 = [Text.UTF8Encoding]::new($false)

function Read-Text($path) { [IO.File]::ReadAllText((Resolve-Path $path), $utf8).TrimStart([char]0xFEFF) }
function Write-Text($path, $text) {
  New-Item -ItemType Directory -Force (Split-Path $path) | Out-Null
  [IO.File]::WriteAllText($path, $text, $utf8)
}
function Esc($s) { ([string]$s).Replace('&', '&amp;').Replace('<', '&lt;').Replace('>', '&gt;').Replace('"', '&quot;').Replace("'", '&#39;') }
function Fill($template, $values) {
  foreach ($k in $values.Keys) { $template = $template.Replace("{{$k}}", [string]$values[$k]) }
  $template
}

$site = Read-Text 'src/data/site.json' | ConvertFrom-Json
$projects = Read-Text 'src/data/projects.json' | ConvertFrom-Json   # no @(): PS 5.1 would nest the array

# ---- Clean output, copy public/ ----
if (Test-Path $Out) { Remove-Item $Out -Recurse -Force }
New-Item -ItemType Directory $Out | Out-Null
Copy-Item 'public/*' $Out -Recurse

# ---- Fingerprinted assets ----
$assetUrl = @{}
New-Item -ItemType Directory (Join-Path $Out 'assets') | Out-Null
foreach ($file in Get-ChildItem 'src/assets' -File) {
  $hash = (Get-FileHash $file.FullName -Algorithm SHA256).Hash.Substring(0, 8).ToLower()
  $name = "$($file.BaseName).$hash$($file.Extension)"
  Copy-Item $file.FullName (Join-Path $Out "assets/$name")
  $assetUrl[$file.Name] = "/assets/$name"
}

function Icon($name, $classes = '') {
  $class = "bn-icon $classes".Trim()
  "<svg class=`"$class`" aria-hidden=`"true`"><use href=`"$($assetUrl['icons.svg'])#$name`"></use></svg>"
}

# Icon used in the fallback panel and dialog badge for each project.
$projectIcon = @{
  'specula' = 'eye'; 'rag' = 'layers-triple'; 'rushdailybot' = 'telegram'; 'reybineye' = 'camcorder-handheld'
  'rush-voice' = 'microphone'; 'emmanpi' = 'raspberry-pi'; 'bridgely' = 'server-network'
}
function ProjectIcon($p) { if ($projectIcon.ContainsKey($p.id)) { $projectIcon[$p.id] } else { 'command' } }
function Poster($p) { if ($p.poster) { $p.poster } else { $p.image } }

# ---- Generated blocks ----
function Render-ProjectTiles {
  $html = New-Object System.Collections.Generic.List[string]
  for ($i = 0; $i -lt $projects.Count; $i++) {
    $p = $projects[$i]
    $video = Fill @'

    <div class="card project-video-card" data-project-id="{{id}}" aria-hidden="true" style="--o:{{o}}; --i:{{o}}">
      <div class="project-video-frame">
        <video src="{{video}}" muted loop playsinline preload="metadata" poster="{{poster}}"></video>
        <div class="video-fallback">
          {{fallbackIcon}}
          <span>Demo video unavailable</span>
        </div>
        <div class="project-video-badge">
          {{playIcon}}
          <span>Demo</span>
        </div>
      </div>
    </div>
'@ @{ id = Esc $p.id; o = $i * 2; video = Esc $p.video; poster = Esc (Poster $p); fallbackIcon = Icon (ProjectIcon $p) 'icon-xl'; playIcon = Icon 'play' 'icon-xs' }

    $live = if ($p.live) { "<a class=`"action-pill primary`" href=`"$(Esc $p.live)`" target=`"_blank`" rel=`"noopener`" aria-label=`"$(Esc $p.name) live demo (opens in new tab)`">$(Icon 'arrow-up-right' 'icon-sm')<span>Live demo</span></a>" } else { '' }
    $repo = if ($p.repo) { "<a class=`"action-pill`" href=`"$(Esc $p.repo)`" target=`"_blank`" rel=`"noopener`" aria-label=`"$(Esc $p.name) source on GitHub (opens in new tab)`">$(Icon 'github' 'icon-sm')<span>GitHub</span></a>" } else { '' }
    $photo = Fill @'

    <div class="card project-photo-card is-interactive" data-project-id="{{id}}" style="--o:{{o}}; --i:{{o}}">
      <img class="project-photo" src="{{scene}}" alt="{{alt}}" width="1024" height="1024" loading="lazy" decoding="async" />
      <div class="photo-scrim" aria-hidden="true"></div>
      <div class="photo-caption">
        <span class="photo-kicker">{{category}}</span>
        <h3 class="photo-name">{{name}}</h3>
      </div>
      <div class="photo-actions">
        {{live}}
        {{repo}}
        <button class="action-pill" type="button" aria-haspopup="dialog" aria-label="Open {{name}} case study">{{caseIcon}}<span>Case study</span></button>
      </div>
    </div>
'@ @{ id = Esc $p.id; o = $i * 2 + 1; scene = Esc $(if ($p.scene) { $p.scene } else { $p.image }); alt = Esc $(if ($p.sceneAlt) { $p.sceneAlt } else { "$($p.name) in use" }); category = Esc $p.category; name = Esc $p.name; live = $live; repo = $repo; caseIcon = Icon 'layers-triple' 'icon-sm' }

    # Alternate the video/photo order per row so the two columns form a checkerboard.
    if ($i % 2 -eq 0) { $html.Add($video); $html.Add($photo) } else { $html.Add($photo); $html.Add($video) }
  }
  ($html -join '').Trim()
}

function Render-CaseStudyTemplates {
  $out = foreach ($p in $projects) {
    $year = if ($p.meta -match '·\s*(.+)$') { $Matches[1].Trim() } else { '' }
    $metrics = if ($p.metricsList) { '<ul class="dialog-metrics" aria-label="Key metrics">' + (($p.metricsList | ForEach-Object { "<li><b>$(Esc $_.val)</b><span>$(Esc $_.label)</span></li>" }) -join '') + '</ul>' } else { '' }
    $actions = @()
    if ($p.live) { $actions += "<a class=`"dialog-btn primary`" href=`"$(Esc $p.live)`" target=`"_blank`" rel=`"noopener`">$(Icon 'globe' 'icon-sm') <span>Live Demo ↗</span></a>" }
    if ($p.repo) { $actions += "<a class=`"dialog-btn secondary`" href=`"$(Esc $p.repo)`" target=`"_blank`" rel=`"noopener`">$(Icon 'github' 'icon-sm') <span>Code Repository ↗</span></a>" }
    if (-not $p.live -and -not $p.repo) { $actions += "<a class=`"dialog-btn primary`" href=`"mailto:$(Esc $site.email)?subject=Inquiry%20regarding%20$([Uri]::EscapeDataString($p.name))`">$(Icon 'envelope' 'icon-sm') <span>Request Technical Walkthrough ↗</span></a>" }
    Fill @'
  <template id="case-{{id}}">
    <div class="dialog-media">
      <button class="dialog-close-btn" type="button" aria-label="Close case study" data-close-modal>
        {{crossIcon}}
      </button>
      <video src="{{video}}" muted loop playsinline controls poster="{{poster}}"></video>
      <div class="video-fallback">
        {{projectIconXl}}
        <span>Demo video unavailable</span>
      </div>
    </div>
    <div class="dialog-content">
      <div class="dialog-header-row">
        <span class="dialog-category-badge">
          {{projectIconXs}}
          {{category}}
        </span>
        {{year}}
      </div>
      <h2 class="dialog-title" id="dlgTitle">{{name}}</h2>
      <div class="dialog-impact-box">
        <div class="impact-badge-tag">
          {{speedIcon}}
          <span>MEASURABLE SOFTWARE IMPACT</span>
        </div>
        <p class="impact-summary-text">{{impactSummary}}</p>
        <div class="impact-metric-pill">{{metric}}</div>
      </div>
      {{metrics}}
      <div class="dialog-desc-section">
        <h3 class="dialog-subhead">
          {{layersIcon}}
          <span>System Architecture &amp; Execution</span>
        </h3>
        <p class="dialog-desc">{{desc}}</p>
      </div>
      <ul class="dialog-tags" aria-label="Technologies">{{tags}}</ul>
      <div class="dialog-actions">{{actions}}</div>
    </div>
  </template>
'@ @{
      id = Esc $p.id; video = Esc $p.video; poster = Esc (Poster $p); category = Esc $p.category; name = Esc $p.name
      year = $(if ($year) { "<span class=`"dialog-meta`">$(Esc $year)</span>" } else { '' })
      impactSummary = Esc $p.impactSummary; metric = Esc $p.metric; metrics = $metrics; desc = Esc $p.desc
      tags = (($p.tags | ForEach-Object { "<li>$(Esc $_)</li>" }) -join ''); actions = ($actions -join "`n        ")
      crossIcon = Icon 'cross' 'icon-sm'; projectIconXl = Icon (ProjectIcon $p) 'icon-xl'; projectIconXs = Icon (ProjectIcon $p) 'icon-xs'
      speedIcon = Icon 'speedometer' 'icon-xs bolt'; layersIcon = Icon 'layers-triple' 'icon-xs subhead-icon'
    }
  }
  ($out -join "`n").Trim()
}

function Render-OpenRepos($style) {
  ($site.openRepos | ForEach-Object {
    if ($style -eq 'tools') {
      "<li><a href=`"$(Esc $_.url)`" target=`"_blank`" rel=`"noopener`"><span class=`"t-name`">$(Esc $_.name) ↗</span><span class=`"t-desc`">$(Esc $_.impact)</span></a></li>"
    } else {
      "<li><a href=`"$(Esc $_.url)`" target=`"_blank`" rel=`"noopener`" class=`"build-link-item`"><b>$(Esc $_.name) ↗</b><span>$(Esc $_.impact)</span></a></li>"
    }
  }) -join "`n          "
}

$blocks = @{
  'project-tiles'         = { Render-ProjectTiles }
  'case-study-templates'  = { Render-CaseStudyTemplates }
  'open-repos-tools'      = { Render-OpenRepos 'tools' }
  'open-repos-builds'     = { Render-OpenRepos 'builds' }
}

function Render-Page($template) {
  $html = $template
  foreach ($name in $blocks.Keys) {
    if ($html.Contains("<!-- build:$name -->")) { $html = $html.Replace("<!-- build:$name -->", (& $blocks[$name])) }
  }
  $html = $html.Replace('{{css}}', $assetUrl['main.css']).Replace('{{js}}', $assetUrl['main.js'])
  foreach ($prop in $site.PSObject.Properties) { if ($prop.Value -is [string]) { $html = $html.Replace("{{site.$($prop.Name)}}", (Esc $prop.Value)) } }
  $html = [regex]::Replace($html, '\{\{icon ([\w-]+)\s*([^}]*)\}\}', { param($m) Icon $m.Groups[1].Value $m.Groups[2].Value.Trim() })
  if ($html -match '\{\{[^}]+\}\}') { throw "Unfilled template token: $($Matches[0])" }
  $html
}

# ---- Pages ----
$pages = [ordered]@{}
$pages['index.html'] = Render-Page (Read-Text 'src/pages/index.html')
foreach ($path in $pages.Keys) { Write-Text (Join-Path $Out $path) $pages[$path] }

# ---- Checks ----
$problems = @()
foreach ($path in $pages.Keys) {
  $html = $pages[$path]
  foreach ($required in '<title>', 'name="description"', 'rel="canonical"') {
    if (-not $html.Contains($required)) { $problems += "$path is missing $required" }
  }
  foreach ($m in [regex]::Matches($html, '(?:href|src|poster|data-src)="(/[^"#?]*)')) {
    $url = $m.Groups[1].Value
    $file = Join-Path $Out ($url.TrimStart('/') -replace '/', '\')
    $exists = (Test-Path $file -PathType Leaf) -or (Test-Path "$file.html") -or (Test-Path (Join-Path $file 'index.html'))
    if (-not $exists) { $problems += "$path links to missing $url" }
  }
}
if ($problems) { $problems | ForEach-Object { Write-Host "  x $_" -ForegroundColor Red }; throw "Build checks failed ($($problems.Count))" }

# Placeholder text like "[test set / conditions]" is fine to build but should not ship.
foreach ($path in $pages.Keys) {
  foreach ($m in [regex]::Matches($pages[$path], '>\s*(\[[^\]<]+\])\s*<')) {
    Write-Host "  ! $path still has placeholder $($m.Groups[1].Value)" -ForegroundColor Yellow
  }
}

$files = Get-ChildItem $Out -Recurse -File
Write-Host ("Built {0} pages, {1} files, {2:N2} MB -> {3}" -f $pages.Count, $files.Count, (($files | Measure-Object Length -Sum).Sum / 1MB), (Resolve-Path $Out))
