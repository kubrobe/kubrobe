# Final checklist

Status as of Stage G. ✓ = done and checked here. ☐ = open.

## A. Owner decisions and information (blocks launch)

- ☐ Public domain (sets `SITE_URL`).
- ☐ Contact email, if wanted. Add to `src/data/profile.ts`; the mailto and Copy button appear. Never a guessed address.
- ☐ Other profile links (LinkedIn etc.), only ones to be public.
- ☐ Confirm the GitHub repositories linked on the site are public: `kubrobe/skillswap`, `kubrobe/skillswap-android`, `kubrobe/doran`. Visitors see a 404 on a private repo.
- ☐ Confirm the Render site `skillswap-vqt7.onrender.com` opens (free tier may sleep); update the status row or remove the link.
- ☐ Confirm SkillSwap attribution wording (course project later extended; commit identities; teammates not named) and Doran "Solo project".
- ☐ Certifications with evidence. The section stays hidden and `noindex` until one exists.
- ☐ E-Commerce Sales Analysis details; then remove `draft: true`. It stays unpublished until then.
- ☐ Optional: real-device test of Doran pronunciation scoring if its "Partial" status should change.

## B. Repository and deploy

- ✓ `.gitignore`, `.env.example`, README with setup, architecture and deployment.
- ✓ `vercel.json` (build, output, headers, CSP, caching); CSP exercised with 0 violations.
- ✓ No secrets in tree or history.
- ☐ Create the GitHub repository and push (owner).
- ☐ Import into Vercel, set `SITE_URL`, deploy (`PRODUCTION-DEPLOYMENT.md`).
- ☐ Add domain and DNS, redeploy with final `SITE_URL`.

## C. Checks that need real browsers or devices

- ☐ Firefox (desktop): nav, theme, gallery viewer (popover), Doran stage (`:has()`), scroll reveals fall back to static, reduced motion.
- ☐ Safari macOS and iOS: same list, plus theme-colour meta, safe-area on the mobile bar, view transitions (expected: instant navigation).
- ☐ Real phone (Android and iPhone): swipe in the viewer, contents list, tap targets, no stuck blank areas while scrolling.
- ☐ Click every external link once (unreachable from the build sandbox).
- ☐ Link-preview cards (Slack, X, LinkedIn) show the KUBROBE image.
- ☐ Re-run Lighthouse on the deployed URL.

## D. Verified in Stage G (Chromium)

- ✓ Production build, `astro check` 0 errors, placeholder build, test-domain build.
- ✓ Homepage JS 0.87 KB gzipped (budget 50).
- ✓ axe: 0 violations, 8 routes at 360 and 1440 dark; main routes in light.
- ✓ No horizontal overflow, no broken images, no console errors at 360, 768, 1024, 1440.
- ✓ 122 internal references resolve; crawl found 0 dead links or anchors.
- ✓ Reveals, intro, back/forward, theme persistence, reduced motion, no-JS, simulated no-scroll-timeline.
- ✓ Lighthouse mobile 99 and desktop 100 on `/`, SkillSwap, Doran.
- ✓ Titles, descriptions, canonical (with a domain), sitemap, robots, OG image, favicons, JSON-LD.
- ✓ Content review: no placeholders, no unsupported claims, e-commerce draft hidden.

## E. After launch

- ☐ Search Console sitemap submission.
- ☐ First writing entry (appears in nav and sitemap by itself).
- ☐ Revisit CSP if inline scripts are moved to files.

## F. Stage H: video and media (owner)

- ☐ Set `videos.skillswap.url` in `src/data/media.ts` (YouTube unlisted, Vimeo, or `/media/<file>.mp4`). Until then the section stays hidden.
- ☐ Review the chapter titles, notes, caption and transcript in `src/data/media.ts` (written from the video's on-screen captions; the spoken audio was not checked). See `docs/STAGE-I-VIDEO-REPORT.md`.
- ☐ Verify the claims listed in section "Claims to verify" of the Stage I report (12 screens, 3 languages, 20 unit tests, 6 cached tables vs the case study's 7 Room entities, no secrets in the app, "every box is implemented today").
- ☐ The last chapters are a campus-pilot proposal (labelled "not an existing partnership or deployment" in the video and in the page caption); confirm you want them public.
- ☐ Decide whether the example people (Aziza, Bobur, Dilnoza) should be described as example characters in the caption; the video labels some screens "illustrative" but does not say so about the names.
- ☐ WebVTT captions are not generated (caption timing could not be established reliably); optional, add a `.vtt` in `public/media/` and set `captions`.
- ☐ Upload the 5:56 video yourself (YouTube Unlisted) and paste the URL into `videos.skillswap.url`; until then the section stays hidden. Note: `public/media/skillswap-poster.webp` (a still of the tagline frame) ships with the site even while hidden.
- ☐ After deploy: press play on the real video in Chrome, Firefox and Safari (iOS too); confirm no provider request before play.
- ☐ Decide whether the two unused SkillSwap screens should be added.
