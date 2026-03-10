# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # dev server with live reload (http://localhost:8080)
npm run build    # build static site to public/
npm run clean    # remove public/ output
```

## Architecture

Personal blog built with **Eleventy (11ty) v3**. Source in `src/`, output to `public/` (git-ignored). Deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`) on push to `main`, published to `gh-pages` branch.

### Layout hierarchy

```
src/_includes/layouts/base.njk      ← root HTML shell (nav, footer, meta)
  ├── src/_includes/layouts/home.njk   ← homepage wrapper
  └── src/_includes/layouts/post.njk   ← blog post (date, tags, giscus comments)
```

### Key files

- `src/_data/metadata.js` — site config: title, author, URL, giscus settings
- `src/blog/blog.json` — sets `layouts/post.njk` and `posts` tag for all posts
- `src/css/style.css` — GitHub Light-inspired design (CSS variables in `:root`)
- `src/css/prism-github.css` — syntax highlighting (GitHub Light Prism theme)

### Collections

- `collections.posts` — all `src/blog/*.md`, sorted newest first
- `collections.tagList` — sorted unique tags (excludes `posts` and `all`)
- `collections[tag]` — per-tag post list (auto-created by Eleventy from frontmatter tags)

### Writing a new post

Create `src/blog/my-post-slug.md` with frontmatter:

```markdown
---
title: Post title
date: 2025-01-01
tags:
  - posts
  - engineering
---
```

The `posts` tag is inherited from `blog.json`; only add extra tags in the post itself.

### Comments (giscus)

Comments are wired up but inactive until you fill in `giscus.repoId` and `giscus.categoryId` in `src/_data/metadata.js`. Steps:
1. Enable GitHub Discussions on the repo
2. Install the giscus GitHub app: https://github.com/apps/giscus
3. Visit https://giscus.app → fill in repo → copy `repoId` and `categoryId`
