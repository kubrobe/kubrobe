# KUBROBE

Personal site of Kubrobe. Direction C, "Index": a catalogued archive of work, set in monochrome type.

Astro 7 (static output) · Tailwind CSS 4 · strict TypeScript · no UI framework · no animation library.

## Setup

Requires Node 22.23.4 or newer (`.nvmrc` is set to 22).

```bash
npm ci
npm run dev        # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run dev:placeholders` | Dev server with the marked placeholder fixtures visible (design review only) |
| `npm run build` | Type check (`astro check`), then production build to `dist/` |
| `npm run build:placeholders` | Layout-preview build; always `noindex`, `Disallow: /` |
| `npm run budget` | Gzipped JS per page; fails if the homepage passes 50 KB |
| `npm run preview` | Serve `dist/` |

## Architecture

- `src/data/profile.ts`: personal facts. Anything empty is hidden. Only verified facts live in `real`.
- `src/content/{work,writing,certifications}`: markdown entries with a typed schema (`src/content.config.ts`). `draft: true` never publishes; `placeholder: true` shows only in the placeholder build. See `src/content/README.md`.
- `src/pages`: home, about, work (list and case study), writing, certifications, 404, `robots.txt`.
- `src/components`: shared pieces. `home/` holds the homepage sections; `Gallery`, `DeviceStage` and `Lightbox` present project screens.
- `src/styles/global.css`: tokens (dark and light palettes), type, prose. `src/styles/motion.css`: all motion (CSS only; scroll-driven reveals behind `@supports`, first-arrival intro, view transitions).
- `src/lib`: entry helpers, build-time dither figure, nav, text helpers.
- Scripts in pages: theme toggle (inline, applied before first paint), copy-email, lightbox stepping, contents scroll-spy. Homepage JS is under 1 KB gzipped.

Design rules live in `docs/DESIGN-SYSTEM.md`; decisions in `docs/DECISIONS.md`; progress in `docs/TASKS.md`.

## Content rules

Nothing is invented: no personal facts, statistics, projects, screenshots or certifications beyond what the owner confirmed or the repositories show. Empty sections are hidden, not stubbed.

## Deployment

See `docs/PRODUCTION-DEPLOYMENT.md` (Vercel settings, environment variables, domain steps, post-deploy checks) and `docs/FINAL-CHECKLIST.md`.

Short version: import the repository into Vercel (framework Astro; `vercel.json` sets install, build and output), set `SITE_URL` to the final `https://` domain, leave `KB_SHOW_PLACEHOLDERS` unset.

## Environment variables

| Name | Where | Purpose |
| --- | --- | --- |
| `SITE_URL` | build | Public origin; enables canonical, `og:*`, sitemap URLs and `robots.txt` sitemap line |
| `KB_SHOW_PLACEHOLDERS` | build | `true` only for the design-review build |
| `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_GIT_COMMIT_SHA` | set by Vercel | Fallback site URL; build id shown in the footer |

No secrets are used anywhere in this project.
