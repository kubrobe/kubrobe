# KUBROBE

Personal site. Direction C, "Index": a catalogued archive of a curious mind.

Astro 7 (static) · Tailwind CSS v4 · strict TypeScript · no UI framework.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server at localhost:4321 |
| `npm run dev:placeholders` | Dev server with the marked placeholder fixtures visible |
| `npm run build` | Type check (`astro check`) then production build to `dist/` |
| `npm run budget` | Gzipped JS per page; fails if the homepage exceeds 50 KB |
| `npm run preview` | Serve `dist/` |

## Content

See `src/content/README.md`. Personal details live in `src/data/profile.ts`.
Anything empty is hidden. Placeholder fixtures never ship in a normal build.

## Decisions

- **Navigation:** four primary destinations (Work, Writing, Certifications, About).
  Contact is not a page; it closes every page in the footer. A destination with no
  real entries is hidden. On screens under 900px the nav moves to a bottom bar.
- **Theme:** dark by default; light is a separate palette. Choice persists in
  `localStorage` (`kb-theme`) and is applied before first paint.
- **Status glyphs** ● ◐ ○ are SVG so they render identically on every platform.
- **Live clock** is off unless `showLocalTime` and `timeZone` are set in the profile.

## Deploy

Vercel detects Astro automatically (build `npm run build`, output `dist`).
Set `SITE_URL` once a domain exists; otherwise the Vercel production URL is used.
