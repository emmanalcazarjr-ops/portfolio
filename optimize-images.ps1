<#
  Re-encodes WebP images with headless Edge's WebP encoder, keeping only results that
  stay visually the same: the smallest quality whose PSNR is at least -MinPsnr dB
  (40 dB is near-indistinguishable).

  Without -Width: re-encodes each file in place, compared against the current file,
  and only if that saves at least 10%.
  With -Width N:  writes a resized copy <name>-N.webp next to each file (for srcset),
  compared against a lossless resize so only encoding loss counts.

    .\serve.ps1                                              # in another window (serves dist/)
    .\optimize-images.ps1 -Dir public/img/scenes             # in place; add -WhatIf to only report
    .\optimize-images.ps1 -Dir public/img/scenes -Width 640  # 640px copies
#>
[CmdletBinding(SupportsShouldProcess)]
param(
  [string]$Dir = 'public/img/scenes',
  [string]$Origin = 'http://localhost:4173',
  [int]$Width = 0,
  [double]$MinPsnr = 40,
  [double[]]$Qualities = @(0.95, 0.92, 0.9, 0.88, 0.85, 0.82, 0.8, 0.78, 0.75, 0.72, 0.7, 0.65)
)
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
. "$PSScriptRoot/cdp.ps1"
$inv = [Globalization.CultureInfo]::InvariantCulture

# The page must be same-origin with the images, or the canvas cannot be read back.
$publicRoot = (Resolve-Path 'public').Path
$files = Get-ChildItem $Dir -Filter *.webp | Where-Object { $_.BaseName -notmatch '-\d+$' }

$edge = Start-HeadlessEdge
try {
  Invoke-Cdp 'Page.navigate' @{ url = "$Origin/" } | Out-Null
  Start-Sleep -Seconds 2
  Invoke-Js @'
// Source canvas: the image as-is, or resized to `width` with high-quality smoothing.
window.source = async (url, width) => {
  const img = new Image();
  img.src = url + (url.includes('?') ? '&' : '?') + 'nocache=' + Math.random();
  await img.decode();
  const w = width || img.naturalWidth;
  const h = Math.round((img.naturalHeight * w) / img.naturalWidth);
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, w, h);
  return canvas;
};
window.pixels = async (source) => {
  const bmp = await createImageBitmap(source);
  const canvas = new OffscreenCanvas(bmp.width, bmp.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bmp, 0, 0);
  return ctx.getImageData(0, 0, bmp.width, bmp.height).data;
};
window.trial = async (url, width, qualities) => {
  const canvas = await source(url, width);
  const ref = await pixels(canvas);
  const results = [];
  for (const q of qualities) {
    const blob = await canvas.convertToBlob({ type: 'image/webp', quality: q });
    const px = await pixels(blob);
    let se = 0;
    for (let i = 0; i < px.length; i += 4) {
      const r = px[i] - ref[i], g = px[i + 1] - ref[i + 1], b = px[i + 2] - ref[i + 2];
      se += r * r + g * g + b * b;
    }
    const mse = se / ((px.length / 4) * 3);
    results.push({ q, size: blob.size, psnr: mse === 0 ? 99 : 10 * Math.log10((255 * 255) / mse), w: canvas.width, h: canvas.height });
  }
  return results;
};
window.encodeBase64 = async (url, width, q) => {
  const blob = await (await source(url, width)).convertToBlob({ type: 'image/webp', quality: q });
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
};
true
'@ | Out-Null

  $qs = ($Qualities | ForEach-Object { $_.ToString($inv) }) -join ','
  $report = foreach ($file in $files) {
    $url = $Origin + ($file.FullName.Substring($publicRoot.Length) -replace '\\', '/')
    $trials = Invoke-Js "trial('$url', $Width, [$qs])"
    $best = @($trials | Where-Object { $_.psnr -ge $MinPsnr } | Sort-Object size) | Select-Object -First 1
    $target = if ($Width) { Join-Path $file.DirectoryName "$($file.BaseName)-$Width.webp" } else { $file.FullName }
    $row = [ordered]@{ file = Split-Path $target -Leaf; sourceKB = [math]::Round($file.Length / 1KB, 1); outKB = '-'; size = '-'; quality = '-'; psnr = '-'; action = 'skipped: no encoding passed' }
    $worthIt = $best -and ($Width -or $best.size -le $file.Length * 0.9)
    if ($best) { $row.size = "$($best.w)x$($best.h)"; $row.quality = $best.q; $row.psnr = [math]::Round($best.psnr, 1); $row.outKB = [math]::Round($best.size / 1KB, 1) }
    if ($best -and -not $worthIt) { $row.action = 'kept: saves < 10%'; $row.outKB = $row.sourceKB }
    if ($worthIt) {
      if ($PSCmdlet.ShouldProcess((Split-Path $target -Leaf), "write q=$($best.q)")) {
        $b64 = Invoke-Js "encodeBase64('$url', $Width, $($best.q.ToString($inv)))"
        [IO.File]::WriteAllBytes($target, [Convert]::FromBase64String($b64))
        $row.action = 'written'
      } else { $row.action = 'would write' }
    }
    [pscustomobject]$row
  }
  $report | Format-Table -AutoSize | Out-String -Width 200 | Write-Host
  $done = $report | Where-Object { $_.outKB -ne '-' }
  $s = ($done | Measure-Object sourceKB -Sum).Sum; $o = ($done | Measure-Object outKB -Sum).Sum
  if ($s) { Write-Host ("Total: {0:N0} KB source -> {1:N0} KB output ({2:P0} smaller)" -f $s, $o, (($s - $o) / $s)) }
} finally {
  Stop-HeadlessEdge $edge
}
