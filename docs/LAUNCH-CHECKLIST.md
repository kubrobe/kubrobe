# Launch checklist

Nothing is deployed and nothing has been pushed. Order matters: decisions first, then deploy, then post-deploy checks.

## 1. Needs a decision or information from the owner

- [x] Public domain name: `https://www.kubrobe.uz` is the built-in canonical origin. `SITE_URL` is an optional override only.
- [ ] Contact email. Add to `src/data/profile.ts`; the Copy button and mailto appear automatically. Do not use a guessed address.
- [ ] LinkedIn or other profile links (only ones you want public).
- [ ] Certifications, each as Earned, In progress or Planned, with evidence. The section stays hidden until at least one exists.
- [ ] E-Commerce Sales Analysis: year, status, goal, dataset, tools and methods, deliverables, your own part. Then remove `draft: true` from `src/content/work/ecommerce-sales-analysis.md`.
- [x] SkillSwap attribution: resolved 2026-11-24 (DECISIONS 57). Designed and built solely by the owner; team registration for the course and hackathon only; AI-assisted coding noted.
- [ ] Doran: confirm it is a solo project (currently shown as "Solo project").
- [ ] Android app: confirm "mostly working"; share a release APK link if you want one shown.
- [ ] Confirm the GitHub repos `kubrobe/skillswap`, `kubrobe/skillswap-android` and `kubrobe/doran` are public. Visitors get a 404 on a private repo.
- [ ] Open the live Render site and confirm it works, then update the status row for it (or remove the link).
- [ ] Real-device test of Doran's pronunciation scoring, if you want to change its "Partial" status.
- [ ] Optional screenshots: SkillSwap video lesson, SkillSwap website at laptop width, check-in QR flow; Doran speaking exercise; one chart from the e-commerce report.

## 2. Repository and deploy

- [ ] Create the GitHub repository for KUBROBE; push the local commits (restore from the saved bundle if needed: `git clone kubrobe.bundle kubrobe`).
- [ ] Connect to Vercel (build `npm run build`, output `dist`, Node 22.23.4 or newer).
- [x] `SITE_URL` is not needed in Vercel; leave it unset unless building for another origin.
- [ ] Confirm `KB_SHOW_PLACEHOLDERS` is not set in production.

## 3. After the first deploy

- [ ] Open `/robots.txt`: allows crawling and lists the sitemap. Open `/sitemap-index.xml`: lists `/`, `/about/`, `/work/`, and both case studies, not `/404`, `/writing/` or `/certifications/` while empty.
- [ ] View source on `/` and a case study: canonical, `og:url` and `og:image` use the real domain.
- [ ] Share a link to the home page and to SkillSwap in a link-preview tool (Slack, X card validator, LinkedIn Post Inspector) and check the card shows the KUBROBE image.
- [ ] Re-run Lighthouse on the deployed URL (mobile and desktop).
- [ ] Test in Safari (macOS and iOS) and Firefox: nav, theme, gallery lightbox, view transitions, scroll reveals, reduced motion.
- [ ] Click every external link once.
- [ ] Submit the sitemap in Google Search Console (and Bing if wanted).
- [ ] Check the 404 page on the live host.

## 4. Optional, after launch

- [ ] First writing entry (the Writing section appears in the nav and sitemap automatically).
- [ ] Case study for Doran once real-device scoring is tested.
- [ ] Decide on analytics. None is installed; the site sets no cookies.

## 5. Stage F browser checks (needs a real deployment)

- [ ] Safari and Firefox: popover viewer (open, Esc, stepping, focus return), Doran device stage, `:has()` states.
- [ ] Cross-document view transitions: confirm the title morph in Chrome and that Safari/Firefox navigate instantly without glitches.
- [ ] Scroll-driven reveals: in a browser without `animation-timeline`, all content is visible and static.
- [ ] Real phone: swipe in the viewer, contents list, no parallax, 44 px targets.
- [ ] Copy-email button once an address is public.
