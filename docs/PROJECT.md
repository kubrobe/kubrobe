# KUBROBE: project overview

## Vision

A small, fast, monochrome portfolio for Kubrobe: someone working across technology, business and creativity, and building things independently. It reads as an index of work, not a marketing page. Real projects, honestly described, are the content. Nothing is shown that cannot be backed up.

## Stack

Astro 7 (static output), Tailwind CSS 4 through `@tailwindcss/vite`, strict TypeScript, content collections with zod. Fonts are self-hosted Geist, Geist Mono and Instrument Serif. No UI framework, no GSAP, no Three.js. Motion is CSS: scroll-driven reveals and cross-document view transitions, both behind feature checks. The only scripts are two small inline ones (theme and copy-email). Homepage JavaScript is under 1 KB gzipped.

## Architecture

- `src/data/profile.ts`: personal facts. Anything empty is hidden. `real` holds verified facts; `placeholder` fixtures show only in the separate placeholder build.
- `src/content/{work,writing,certifications}`: markdown entries with a typed schema (`src/content.config.ts`). `draft: true` entries never publish. `placeholder: true` entries appear only in the placeholder build.
- `src/pages`: home, about, work (listing and case study), writing, certifications, 404, `robots.txt`.
- `src/components`: shared pieces; `home/` holds the homepage sections; `Gallery.astro` is the case-study screens gallery.
- `src/lib`: entry helpers, the build-time dither figure generator, nav.
- Builds: `npm run build` (production) and `npm run build:placeholders` (layout preview, always `noindex`, `Disallow: /`).

Design details live in `docs/DESIGN-SYSTEM.md`; the original audit in `docs/AUDIT.md`; the quality audit in `docs/STAGE-E-AUDIT.md`.

## Content rules

1. Never invent personal information, projects, statistics, certifications or links.
2. Every number on a case study comes from code, tests or git history, and says so.
3. Say what was verified, what was not, and by whom. Status uses plain words: Working, Partial, Not done, Not verified.
4. Empty sections are hidden, not stubbed.

## Current content

- Home, About: verified statement, bio, role, interests, GitHub link, city.
- Work: SkillSwap (flagship case study, 6 screenshots, architecture diagram), Doran (app entry, 3 screenshots). E-Commerce Sales Analysis exists as a hidden draft.
- Writing and Certifications: empty, hidden from navigation, `noindex`.

## Motion layer (Stage F)

All motion lives in `src/styles/motion.css` and is CSS-only: tokens, scroll-driven reveals under `@supports`, a first-arrival intro, and cross-document view transitions. Interactive pieces are `Gallery`, `DeviceStage` and `Lightbox` (native popover). No animation library is used. See `docs/STAGE-F-MOTION-REPORT.md`.
