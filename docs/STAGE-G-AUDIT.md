# Stage G: production readiness audit

Date: 2026-11-23. Scope: prepare for first public release without redesigning. Nothing was pushed or deployed.

## 1. Mobile "empty spaces" investigation

**Finding: not a layout bug. The blank bands in the earlier mobile screenshots were a capture artifact.**

- The screenshots were Playwright full-page captures. A full-page capture enlarges the page but leaves the scroll position at 0, so every scroll-driven reveal (`animation-timeline: view()`) below the first screen is still at its "not yet entered" state: opacity 0 or clipped. Real visitors scroll, so each reveal plays.
- Evidence: (a) scrolling through all 7 routes at 360, 390, 768 and 1440 px in steps and probing every `[data-reveal]`, prose heading, figure, table and diagram rectangle found none stuck hidden or part-clipped once scrolled past; (b) at the very end of each page nothing in view was partly revealed (3 widths, 8 routes); (c) full-page capture with reduced motion shows the final layout with ordinary section spacing (72 px section padding on mobile); (d) viewport screenshots taken after real scrolling with motion on show the content (`stage-g/home-390-scroll-*.png`).
- Sections are intentionally spaced (72 px padding top and bottom on mobile, a hairline between sections). Nothing relies on `vh` heights, no `position: sticky` element is active on mobile (the contents list is a collapsed `<details>`), and no IntersectionObserver controls visibility (the only observer-like logic is the contents scroll-spy, which affects a highlight, not visibility).

**Hardening applied anyway** (real, if narrow, risk): reveal ranges were percentages of the element's height (`entry 0% entry 55%`). For a very tall element in a short viewport (landscape phone, small window) 55% of its height can exceed the viewport and the reveal would finish late. Ranges are now capped in pixels, for example `entry 0% entry min(55%, 240px)`. Added a `@media print` reset so printing never prints an unrevealed page.

**Failure modes covered:** browsers without scroll timelines never enter the animated rules (`@supports`), so content shows static (checked with a build whose support condition was disabled: 0 hidden or animated reveals on 5 routes at 390 px). With reduced motion, 0 elements animate. With JavaScript off, 0 hidden headings or reveal blocks on 4 routes.

## 2. Animation QA (Chromium)

| Case | Result |
| --- | --- |
| Direct load of `/` | Intro plays (`data-intro` set) |
| Internal navigation to `/about/` and back to `/` | No intro, no errors |
| Browser back and forward | Correct page, no intro, no errors |
| Reload of `/` | No intro (referrer is same site) |
| Direct load of `/work/doran/` | Renders, no intro |
| Case-study previous/next and back | Navigates, view transition present, correct pages |
| Theme switching | 280 ms colour fade; persists across navigation and reload; rapid double toggle ends in the right state |
| SkillSwap gallery, enlarge viewer | Opens, steps with arrow keys, closes, focus returns (Stage F tests; re-opened under CSP this stage) |
| Doran stage | Selects by tab or device; works without JS |
| Reduced motion | 0 animated reveal or parallax elements |
| JavaScript disabled | All content visible |

No new animations were added.

## 3. Cross-browser

| Browser | Status |
| --- | --- |
| Chromium (Playwright, headless) | Tested: all of this report |
| Firefox | **Not tested.** Playwright's Firefox download is blocked by the sandbox network policy (403 from the download hosts), and no system Firefox exists |
| Safari / WebKit | **Not tested.** Same reason, and WebKit cannot run on this Linux sandbox |

What was done instead (this is not a test in those browsers): the no-scroll-timeline build was served and checked for visibility; the no-JS and reduced-motion states were checked; `@supports` guards, `@starting-style`, `abs()` (with fallback) and popover were reviewed for graceful failure. Expected support: scroll-driven animations and cross-document view transitions are Chromium-only today and degrade to static content and instant navigation; `:has()` and popover need Firefox 121/125+ and Safari 17.4+. Real checks are in `FINAL-CHECKLIST.md`.

## 4. SEO

Checked on every route: unique `<title>`, description, robots, Open Graph and Twitter tags.

| Route | Title | Indexed |
| --- | --- | --- |
| `/` | KUBROBE · Digital products and practical experiments (was just "KUBROBE") | Yes |
| `/work/` | Work · KUBROBE | Yes |
| `/work/skillswap/`, `/work/doran/` | Project name · KUBROBE (type `article`) | Yes |
| `/about/` | About · KUBROBE | Yes |
| `/writing/`, `/certifications/` | Titled, `noindex`, out of the sitemap while empty | No |
| `/404` | Not found · KUBROBE, own description (was the home description), `noindex` | No |

- Canonical, `og:url`, `og:image` (+ width, height, alt), `twitter:image` and `summary_large_image` appear only when a real domain is configured. Verified with a test build using `SITE_URL=https://example.com` (nothing committed): canonical on each page, sitemap URLs on that domain, `robots.txt` with the Sitemap line.
- New: `WebSite` JSON-LD on the home page when a domain is set. No `Person` data was added because no real name was provided and none may be invented.
- Social image: `public/og.png` (1200×630) is the monochrome KUBROBE wordmark and verified statement in Geist and Instrument Serif; no screenshots. Kept as is after review.
- Favicons: `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` present.

## 5. Performance

Lighthouse 12, simulated mobile and desktop, local server. First numbers came from a plain `python http.server`, which sends no compression; production hosts send Brotli, so the final numbers use a local Brotli static server.

| Page | Mobile perf | Desktop perf | Mobile FCP / LCP | CLS |
| --- | --- | --- | --- | --- |
| `/` | 99 | 100 | 1.4 s / 1.8 s | 0 |
| `/work/skillswap/` | 99 (was 94) | 100 | 1.2 s / 2.0 s (was 2.9 s) | 0 mobile, 0.004 desktop |
| `/work/doran/` | 99 | 100 | 1.2 s / 1.8 s | 0 |

SkillSwap analysis: the LCP element is text (the lede), not an image. The slow figure came mainly from an uncompressed test server and from gallery images competing with the font and CSS on a slow simulated connection. Changes: all CSS inlined (`inlineStylesheets: 'always'`, removes a request), `fetchpriority="high"` removed from gallery images (they are not LCP), only the first two gallery images load eagerly. Font loading: Geist latin is preloaded; mono and serif load after first paint. Images have width and height (CLS 0). JavaScript is unchanged: homepage 0.87 KB gzipped, SkillSwap 1.42 KB, Doran 1.25 KB. Animation cost: reveals run on the compositor (opacity, transform, clip-path); one passive scroll listener on case studies.

## 6. Functionality

- Crawled from `/`: 5 reachable pages, 0 non-200 responses, 0 dead in-page anchors; 122 internal `href`/`src` references resolve in `dist`.
- External links (not fetched; GitHub and Render are unreachable from this sandbox): `github.com/kubrobe`, `/skillswap`, `/skillswap-android`, `/doran`, `skillswap-vqt7.onrender.com`; all `rel="noopener"`, profile link also `me`.
- Contact section: GitHub link only. No email is configured, so no mailto or Copy button is rendered. Copy was tested on the placeholder build (clipboard written, label and live region update, resets after 1.6 s), which never ships.
- Keyboard: first tab stop is "Skip to content", then brand, nav, theme toggle, then page content in visual order; every stop shows a focus indicator (project cards show it on the whole card).
- 404: unknown paths return the custom 404 page (status 404 on the static server; Vercel serves `404.html` the same way).

## 7. Deployment preparation

Added `vercel.json` (framework, `npm ci`, `npm run build`, output `dist`, trailing slashes, security headers, a Content-Security-Policy, long cache for hashed assets). The CSP was tested by serving the build with the header and exercising all routes, the enlarge viewer and the theme toggle: 0 violations. Secrets scan of the working tree and history for key, token and password patterns and private keys: nothing found; the project uses no secrets. `.env.example` lists the only two variables. See `PRODUCTION-DEPLOYMENT.md`.

## 8. Content review

All public text was read: no placeholder text in the production build (the only "placeholder" matches are CSS `::placeholder` rules), no e-commerce content (draft stays hidden), no certification claims (section empty and hidden), statuses are "Ongoing", the SkillSwap and Doran pages state what was run and what was only read from the repositories, and numbers carry their basis. Nothing needed changing. Still owner-dependent: see `FINAL-CHECKLIST.md`.

## 9. GitHub preparation

`.gitignore` covers `node_modules`, `dist*`, `.astro`, `.vercel`, `.env*` (except `.env.example`). Local history is intact (no rewriting). README rewritten with setup, commands, architecture, environment variables and deployment. Remote not configured; nothing pushed.

## Fixes made this stage

1. Reveal ranges capped in pixels; print reset.
2. Home and 404 titles/descriptions; `WebSite` JSON-LD.
3. LCP tuning (inline CSS, image priorities).
4. `vercel.json` with headers and CSP.
5. README.

## Remaining blockers

Owner information and access only (domain, contact email, repositories public, certifications evidence, e-commerce details, attribution confirmations) plus real Firefox, Safari and phone checks after the first deploy. See `FINAL-CHECKLIST.md`.
