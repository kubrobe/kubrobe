# Stage E audit: pre-launch quality

Date: 22 Nov 2026. Scope: every published route, checked in Chromium (Playwright) against local static builds. Nothing here was tested against a deployed site, because none exists yet.

## How it was tested

| Check | Method | Coverage |
| --- | --- | --- |
| Layout, overflow, tap targets, alt text, heading order, broken images | Playwright script over each route | 8 routes × 360, 390, 480, 768, 1024, 1440 px |
| Accessibility | axe-core 4 (WCAG 2.0/2.1 A and AA, best practice) | 8 routes, dark theme at 360 and 1440 px, plus light theme on 5 routes |
| Lighthouse 12 | Headless Chromium, mobile and desktop presets, local static server | `/`, `/about/`, `/work/skillswap/`, `/work/doran/` |
| Interactions | Playwright, real clicks, taps and key presses | Nav, theme, gallery, copy button, reduced motion, view transitions, scroll reveals |
| Scroll-animation fallback | Built CSS copy with the `@supports (animation-timeline: view())` condition disabled | Simulated, see limitations |
| SEO output | Built with a stand-in `SITE_URL` and inspected | Meta, canonical, Open Graph, sitemap, robots |

Routes: `/`, `/about/`, `/work/`, `/work/skillswap/`, `/work/doran/`, `/writing/`, `/certifications/`, 404.

## Findings and fixes

| # | Finding | Severity | Fix | Status |
| --- | --- | --- | --- | --- |
| 1 | No social sharing image; Twitter card was `summary` | Medium | Added a monochrome 1200×630 `public/og.png` set from the verified statement (no screenshots). Card is `summary_large_image` | Fixed |
| 2 | Canonical, `og:url` and sitemap would point at `localhost` if deployed without `SITE_URL` | High | `Seo.astro` omits canonical, `og:url` and `og:image` until a real domain is configured | Fixed |
| 3 | Home and About used a generic description ("a catalogued archive…") | Low | Descriptions now come from the verified statement and bio | Fixed |
| 4 | Empty `/writing/` and `/certifications/` were indexable and in the sitemap | Medium | `noindex` while empty, excluded from the sitemap, empty-state copy reworded | Fixed |
| 5 | 404 page indexable | Low | `noindex` | Fixed |
| 6 | Static `robots.txt` had no sitemap line and allowed the placeholder build | Medium | Generated route: adds the sitemap URL when a domain exists, `Disallow: /` in the placeholder build | Fixed |
| 7 | Only an SVG favicon | Low | Added 32 px PNG and a 180 px touch icon | Fixed |
| 8 | Standalone links under 24 px tall (More about, case-study links, 404 link, Copy button 28 px) | Medium | 44 px minimum targets | Fixed |
| 9 | Status tables on case studies were clipped on phones (first column forced to one line) | High | Three-column tables become stacked cards under 48 rem; wider screens keep a table | Fixed |
| 10 | Architecture diagram needed horizontal scroll on phones | Medium | Separate portrait diagram under 40 rem, wide one above; no scrolling | Fixed |
| 11 | Gallery had no enlarge action and cramped phone sizing | Medium | Native `popover` lightbox (no JavaScript), larger phone thumbnails, hint text, keyboard and Esc support | Fixed |
| 12 | Home link `aria-label` did not contain its visible text "KB" (Lighthouse label-in-name) | Low | Label is now "KB, KUBROBE home" | Fixed |
| 13 | Doran's first screenshot was the mobile LCP element without priority | Low | `fetchpriority="high"` on the first gallery image | Fixed |
| 14 | Case study claimed the Render deployment as working | High (accuracy) | Now "Not verified" in the status table | Fixed |
| 15 | Repository links point at GitHub repos whose visibility is unknown | Medium | Cannot verify from this environment | **Open** |
| 16 | Live Render site could not be reached from the test environment | Medium | Reported as unverified on the page | **Open** |

## Results

- **axe:** 0 violations on all 8 routes in dark at 360 and 1440 px, and on 5 routes in light.
- **Responsive:** no horizontal overflow, no broken images, no missing alt attributes, one `h1` and no skipped heading levels on any route at any of the 6 widths. After fixes no interactive element is under 24 px on any route.
- **Lighthouse (local, simulated mobile throttling):** performance 97 to 100, accessibility 100, best practices 100, SEO 100 on all four pages. Cumulative layout shift 0, total blocking time 0 ms. Mobile LCP 1.5 to 2.6 s on the 4G simulation.
- **JavaScript:** homepage ships 0.67 KB gzipped (budget 50 KB), all inline. No GSAP, React or Three.js.
- **CSS:** one stylesheet, about 9 KB gzipped, plus 1 KB for the page-level styles.
- **Fonts:** Geist Latin is preloaded; the other subsets download only if a page uses those characters. `font-display: swap`; measured CLS is 0.
- **Interactions (Chromium):** desktop and mobile nav work, active state follows the page, view transitions fire, theme toggles by click and by Enter and persists across reload, gallery opens by click, tap or Tab+Enter, closes with Esc or Close and returns focus, copy button copies and announces (tested with the placeholder fixture address, not a real one), reduced motion runs no animations, scroll reveals attach as view timelines when motion is allowed.
- **Credibility sweep of the production build:** no placeholder text, no fixture addresses, no statistics beyond the verified ones, no certification claims, no award claims. The words "hackathon" and "competition" appear once, in the case study's origin note.

## Limitations (not tested)

- **Firefox:** the browser download was blocked in this environment, so Firefox was not tested.
- **Safari and iOS:** cannot be tested here. Popover, cross-document view transitions, scroll-driven animation and `:has()` all need a real check on Safari before launch.
- **Scroll-animation fallback:** verified only by simulation (rule disabled in a built copy, all content visible, no view timelines). A real browser without support was not available.
- **External links:** GitHub and the Render site are blocked from this environment. They were not requested, so they are unverified.
- **Android emulator, screen readers, real touch devices:** not used. Touch behaviour was emulated.
- **Lighthouse on production:** scores are from a local static server; re-run on the deployed URL.
