# Oliver Hennhoefer - Astro Site

This repo is an Astro 7 site with a content collection-driven blog and RSS feed.

## Feed posts

Add a new post file under `src/content/blog/`:

`src/content/blog/<slug>.mdx` or `.md`

```md
---
title: "Your Post Title"
description: "Short summary for list pages and RSS."
pubDate: 2026-07-07
updatedDate: 2026-07-07   # optional
tags:
  - conformal inference
  - uncertainty
draft: false                # optional, true to hide from build
---

Write markdown/MDX below this frontmatter.
Math is supported via `$$ ... $$` and inline `$ ... $`.
```

## What updates automatically

- `src/pages/blog/index.astro`: full blog list
- `src/pages/blog/[...slug].astro`: post pages
- `src/pages/rss.xml.ts`: feed generation from collection
- Home page latest posts also read `src/content/blog` from the same collection

`draft: true` excludes the post from:

- homepage recent posts
- blog index
- RSS

## Local checks

From repo root:

```powershell
npm ci
npm run dev      # check content/rendering at http://localhost:4321
npm run build    # required: type checking and production build
npm run verify   # verify generated links, metadata, feed, and sitemap
```

## Deployment

Push to `main`.  
GitHub Actions workflow: `.github/workflows/deploy.yml` (Astro build + deploy to Pages).  
Do not use the legacy Jekyll `jekyll-build-pages` action for this repo.

## One-liner to create a draft post

```powershell
@'
---
title: "Post Title"
description: "Brief description."
pubDate: 2026-07-07
tags: []
draft: true
---

Start writing...
'@ | Set-Content "src/content/blog/my-post.mdx"
```

## Site structure

- `src/data/projects.ts` and `src/data/publications.ts` hold the shared research records.
- `src/components/` renders those records consistently on the homepage and CV.
- `src/styles/global.css` contains the typography, layout, responsive rules, and print styles.
- Article pages load KaTeX styles; ordinary pages do not. Dates render in UTC.
- The existing CV dates and experience are retained; incomplete placeholder fields are omitted. Verify personal details before publishing.

Use Node 22.12 or newer (CI uses Node 24). Set `ASTRO_TELEMETRY_DISABLED=1` when running local commands in a restricted environment.
Pull requests run the same build and generated-output checks as deployments. Dependency updates must include the lockfile; CI uses `npm ci` without rewriting it.

## Typography

Newsreader by Production Type is self-hosted in `public/fonts/newsreader/` under SIL OFL 1.1 (license included). The original WOFF2 files were downloaded from the Google Fonts CSS API on 2026-09-09; upstream: https://github.com/productiontype/Newsreader.

`src/styles/fonts.css` defines normal and italic variable faces, weights 200–800, and Latin/extended-Latin subsets. The Latin subset includes German umlauts and ß. Browsers fetch the fonts from this site; no font service or locally installed font is required. Optical sizing adapts the face to the text size. The normal Latin face is preloaded, and `font-display: swap` keeps text readable while downloading. Georgia remains a fallback if webfonts are blocked or unavailable.

## Technical reports

The `/reports/` page lists short PDFs separately from blog posts and formal publications. It starts empty until real reports are added.

1. Add the PDF to `public/reports/`, using a lowercase, hyphenated filename.
2. Add an entry to the array in `src/data/reports.json`:

```json
{
  "id": "your-report",
  "title": "Your report title",
  "description": "The question, approach, and principal finding or limitation.",
  "pubDate": "2026-09-09",
  "kind": "Negative result",
  "pdf": "/reports/your-report.pdf",
  "pages": 1,
  "draft": false
}
```

Kinds: `Technical report`, `White paper`, `Experiment`, or `Negative result`. `pages` and `code` (an absolute URL to supporting materials) are optional. Dates use UTC; entries appear newest first. Keep IDs and PDF URLs stable so links remain useful.

`draft: true` hides the listing only. Files in `public/` are always included in deployment; keep unpublished PDFs outside that directory. A missing PDF or incorrect PDF file header fails the build for published entries. Run `npm run build` and `npm run verify` before publishing.
