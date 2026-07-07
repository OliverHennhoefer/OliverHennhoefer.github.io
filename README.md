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
Math is supported via `$$ ... $$` and inline `\( ... \)`.
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
npm run build    # optional, production smoke check before push
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
