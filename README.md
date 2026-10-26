# emmanalcazarjr.com

Source for the portfolio at https://www.emmanalcazarjr.com. Plain HTML, CSS and JS
with a PowerShell build, so it needs no Node or npm install (Windows PowerShell 5.1 is enough).

## Commands

```powershell
.\build.ps1                               # builds dist/ and checks every local link
.\serve.ps1                               # preview dist/ at http://localhost:4173
.\measure.ps1 -Url http://localhost:4173/ # page weight + screenshots (headless Edge)
.\measure.ps1 -Url http://localhost:4173/ -Mobile   # same at 375px
.\optimize-images.ps1 -Dir public/img/scenes -Width 640   # 640px copies of new scene images
```

When you add a project scene image, run `optimize-images.ps1 -Width 640` so it gets a
640px copy; the build adds it to `srcset` automatically.

## Where things live

| Path | What |
| --- | --- |
| `src/pages/` | Page templates. `index.html` is the homepage. |
| `src/data/projects.json` | Every project: name, copy, metrics, media, links. Drives the homepage tiles and case studies. |
| `src/data/site.json` | Email, résumé path, the "Also on GitHub" list. |
| `src/assets/` | `main.css`, `main.js`, `icons.svg` (icon sprite). Copied to `dist/assets/` with a content hash in the name. |
| `public/` | Copied to `dist/` unchanged: images, videos, résumé PDF, favicons. |
| `reference/` | The live site as downloaded on 2026-10-27, kept for comparison. Not deployed. |

Template tokens: `{{icon name classes}}` inserts an icon from the sprite, `{{site.email}}` reads
`site.json`, and `<!-- build:name -->` markers are filled by the matching block in `build.ps1`.

## Deploying

Upload the contents of `dist/` to the Cloudflare project that serves the site.

`/reybineye`, `/evalgate/` and `/boardkid` are separate apps on the same domain and are **not**
in this folder. If your deploy replaces the whole site with `dist/`, copy those apps' files
into `dist/` first, or they will stop working.
