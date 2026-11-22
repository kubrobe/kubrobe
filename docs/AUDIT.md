# KUBROBE — Stage A audit

Audited 2026-11-22 against commit `fd46687` (the Milestone 1–2 build).

## Environment

| Check | Result |
| --- | --- |
| Node in this workspace | v22.23.5 |
| `engines.node` in package.json | `>=22.23.4` (Astro 7 requirement) — satisfied |
| Lockfile | `package-lock.json`, npm 10.9 |
| Repository | Local git only. No GitHub remote, so no Vercel preview yet. |

## Architecture

- **Astro 7.4.13, `output: 'static'`.** Every route is prerendered. No adapter, no server.
- **Tailwind CSS 4.3.5** through `@tailwindcss/vite`. Tokens live in `src/styles/global.css` (`:root` variables mapped into `@theme inline`).
- **TypeScript `astro/tsconfigs/strictest`**, `@/*` path alias. `astro check` runs before every build.
- **No UI framework.** Client JS is a handful of inline `<script>` blocks (theme init, theme toggle, copy email, optional clock).
- **Content** is separated from presentation:
  - `src/content.config.ts`: three `glob()` collections (`work`, `writing`, `certifications`) sharing `number`, `title`, `status`, `draft`, `placeholder`.
  - `src/data/profile.ts`: zod-validated personal fields, all empty. Empty means hidden.
  - `src/lib/entries.ts`: queries, sorting, placeholder filtering, catalogue codes, status labels.
  - `src/lib/nav.ts`: four destinations; a destination with no real entries is hidden.

### Dependencies (runtime 7, dev 2)

| Package | Why | Keep? |
| --- | --- | --- |
| astro | framework | yes |
| tailwindcss, @tailwindcss/vite | styling | yes |
| @astrojs/sitemap | SEO | yes |
| @fontsource-variable/geist, geist-mono | sans + mono, self-hosted | yes |
| @fontsource/instrument-serif | serif | yes, now also the upright cut |
| @astrojs/check, typescript (dev) | type checking | yes |

No GSAP, no React, no image library yet.

### Components

`Seo`, `IndexBar`, `MobileBar`, `ThemeToggle`, `Footer`, `CopyEmail`, `Section`, `PageHead`, `Wordmark`, `EntryHead`, `EntryRow`, `StatusGlyph`, `Glyph`, `Empty`, `home/Hero`.

### Routes

`/`, `/work/`, `/work/[slug]/`, `/writing/`, `/writing/[slug]/`, `/certifications/`, `/about/`, `/404`. Plus `sitemap-index.xml`, `robots.txt`, `favicon.svg`.

## Design-system limitations

1. **One breakpoint.** Everything switches at an arbitrary `min-[900px]` (41 occurrences). No tablet layout.
2. **Every section is the same shape** (rail + h2 + content in columns 3–12). It reads as a well-made table, not an art-directed page. No asymmetry, no full-width moments other than the wordmark.
3. **Spacing is ad hoc.** Values like `py-12 min-[900px]:py-20` and `mt-14` are scattered; there is no named section rhythm.
4. **Type scale is partly arbitrary.** The statement size is an inline `clamp()`, and there is no display or lead step.
5. **The serif is underused.** Only the italic is installed, and it appears once.
6. **No motion layer.** Only a CSS row shift on hover.
7. **No image pipeline.** There are no real images yet, so this is deferred rather than missing.

## Performance risks

| Risk | Severity | Note |
| --- | --- | --- |
| Full-screen fixed grain overlay (SVG `feTurbulence`) | low–medium | Rasterised once, but a fixed layer over the page costs paint on low-end Android. Keep it small and allow `transform`-only movement. |
| Geist Mono not preloaded | low | The metadata line can swap font after first paint. |
| Adding GSAP + ScrollTrigger | medium | About 45 KB gzipped together, nearly the whole 50 KB homepage budget. |
| JS today | none | About 0.4 KB gzipped on the homepage. |

## Accessibility risks

| Risk | Fix in this stage |
| --- | --- |
| `ink-3` was 3.8:1 (dark) and 3.3:1 (light), used for small meaningful labels | New palette: every text token is at least 4.5:1 on both surfaces. |
| `aria-label` on a `<sup>` in nav counts is ignored by some screen readers | Use visually hidden text instead. |
| Certification rows with no credential URL link to the page they are on | Out of homepage scope; logged for the certifications page. |
| Empty collection pages (`/work/` with zero entries) are still in the sitemap | Logged for the next stage. |
| Placeholder build reuses real routes | Already `noindex`; keep. |

Kept and confirmed working: skip link, `main` focus target, one `h1` per page, visible focus outlines, `aria-current` on nav, live region for "Copied", theme applied before first paint, reduced-motion CSS reset.

## Preserve / modify / replace

| Area | Decision |
| --- | --- |
| Content collections, `profile.ts`, `entries.ts`, `nav.ts`, placeholder filtering | **Preserve** unchanged |
| Routes, static output, SEO, sitemap | **Preserve** |
| Theme switching and persistence | **Preserve**; new token values |
| Responsive nav (top bar + phone bottom bar) | **Preserve**; restyle, new breakpoint |
| `global.css` tokens | **Modify**: new palette, named breakpoints, spacing and type steps, motion tokens |
| `Section`, `Hero`, `Wordmark`, `EntryRow`, `Footer` | **Modify**: asymmetric layouts and motion hooks |
| Homepage composition | **Replace** with the Stage C layout |
| Other pages | **Untouched** until the homepage is reviewed (they inherit the new tokens) |

## Conflicts with the earlier locked "Index" decisions

The new brief is the newest instruction, so it wins where the two disagree.

| Earlier Index decision | New brief | Followed |
| --- | --- | --- |
| Dark `#0B0B0C` / `#ECECEA`, light `#F3F2EF` | `#080808` / `#151515` / `#F2F2F0`, warm off-white light | **New brief** |
| Geist + Geist Mono + Instrument Serif *italic*, one word per heading | Sans and restrained serif mix | **Both**: same families, plus the upright Instrument Serif for editorial moments (writing titles, intro) |
| 12-column grid with metadata rail | Asymmetric editorial grids | **Both**: the rail stays as the system spine, and sections now break it asymmetrically |
| "Catalogue" motion: filed, not flown | Cinematic, staggered, scroll-triggered | **Merged**: staggered, scroll-linked reveals that still move along the grid; no floating or looping |
| ⌘K Index palette, ● ◐ ○ glyphs, entry IDs | Not mentioned | **Kept**; the palette is still pending (not homepage scope) |
| GSAP for load sequence | "Prefer GSAP and CSS", minimal JS | **CSS first, no GSAP yet** (see DESIGN-SYSTEM.md, Motion) |
