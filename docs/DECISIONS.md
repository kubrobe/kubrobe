# Decisions

Short records of choices that are not obvious from the code. Newest last.

| # | Decision | Why |
| --- | --- | --- |
| 1 | Four primary destinations; Contact lives in the footer | Contact is a closing moment on every page, not a destination competing with work. (Stage A) |
| 2 | Empty sections hidden, placeholders only in a separate noindex build | The site must never look finished while holding invented content. (Stages A–C) |
| 3 | Dark default regardless of OS; theme saved in `localStorage`, applied before first paint | The identity is dark; the saved choice avoids a flash. |
| 4 | CSS-first motion, no GSAP | Budget and reduced-motion respect. Reveals use `animation-timeline: view()` inside `@supports`, so unsupported browsers show content statically. |
| 5 | The scroll timeline lives in its own higher-specificity rule | Tailwind's CSS minifier folds `animation-timeline` into the `animation` shorthand, which browsers reject. |
| 6 | Generated dither figure as a fallback for entries with no screenshots | A distinctive, honest visual that is not a fake screenshot. |
| 7 | Real screenshots only, with a source line on the page | Stage D: demo-data screenshots from the project repos and CI. Nothing mocked. |
| 8 | Case-study status as a ledger (Working, Partial, Not done, Not verified, with a basis) | Keeps the page honest: "tested" means a test was run, "not verified" means no evidence. |
| 9 | ~~Contribution stated from the team's own documentation, with AI assistance noted, no teammates named~~ **Superseded by 57.** | Git history cannot separate who wrote what. |
| 10 | Gallery lightbox uses the native `popover` attribute | No JavaScript, Esc and light dismiss built in, focus returns to the trigger. |
| 11 | Two architecture diagrams (wide and portrait) switched by CSS | Legible without horizontal scrolling on phones. Only one is exposed to assistive technology at a time. |
| 12 | Three-column prose tables render as stacked cards on narrow screens | Clipped tables are worse than a different layout. |
| 13 | Canonical, `og:url`, `og:image` and the sitemap use `https://www.kubrobe.uz` by default (`SITE_URL` can override); `www` is canonical, the apex 308-redirects to it via Vercel domain settings (2026-11-23: the earlier `vercel.json` www→apex rule looped with that redirect and was removed) | Domain purchased (Sayt.uz). Previews on `*.vercel.app` still canonicalise to the production domain. |
| 14 | Empty Writing and Certifications stay reachable but `noindex` and out of the sitemap | Honest empty states without advertising thin pages. |
| 15 | Social image is typographic (wordmark and statement) | No fabricated or recycled screenshots. |
| 16 | No analytics, no cookies | Nothing to disclose; revisit after launch. |
| 17 | Intro plays only on a fresh arrival at `/`, decided by an inline script and the referrer, nothing stored | Returning visitors and in-site navigation never wait; no cookies. (Stage F) |
| 18 | Device stage is radio buttons plus `:has()`, not script | Works with no JavaScript and keyboard users get arrow-key behaviour free. |
| 19 | Lightbox stepping buttons are scripted and hidden without JS; they must not be popover targets | A popover target opens a nested popover instead of replacing the current one. |
| 20 | Theme switch is a time-limited class that fades colours, skipped under reduced motion | Interruptible, no view-transition snapshot cost, nothing left on the page afterwards. |
| 21 | Custom cursor not built (judged, not prototyped) | Competes with the editorial calm and adds a permanent pointer listener. |
| 22 | No GSAP or scroll library | Everything required is expressible in CSS; JS stays under 1.5 KB per page. |
| 23 | Previous/next on case studies hides "Previous" when only two entries exist | Showing the same project twice is noise and duplicates a view-transition name. |
| 24 | Parallax only with hover pointer and 60rem+ | No heavy motion on phones; avoids jank on touch. |
| 25 | Blank mobile areas were a full-page-capture artifact, not a bug; reveal ranges capped in pixels anyway | Scroll timelines never advance in full-page captures. Capping protects tall elements in short viewports. (Stage G) |
| 26 | Home page gets a descriptive title; other pages stay "Page · KUBROBE" | "KUBROBE" alone says nothing in a result list. |
| 27 | `WebSite` JSON-LD only when a real domain is set; no `Person` data | No real name provided; nothing is invented. |
| 28 | All CSS inlined; CSP allows inline script and style | Saves a request on a tiny site; inline theme script must run before first paint. |
| 29 | `vercel.json` carries build, headers, CSP and cache rules | Deployment is reproducible from the repository. |
| 30 | Local performance tests use a compressing server | A plain `http.server` sends uncompressed HTML and overstated LCP. |
| 31 | Homepage Selected Work is a text index; screens live only on case studies | A curated index reads faster and loads less than a gallery. (Stage H) |
| 32 | SkillSwap gallery is an exhibit with groups taken from a `group` field on each screenshot | Groups only where the screenshots support them (Website, Android app). |
| 33 | Gallery state is a radio group, not script | Works without JavaScript; keyboard behaviour is native. |
| 34 | Video is one config field (`src/data/media.ts`), hidden until set, click-to-load, no autoplay | No provider request before play; nothing fake can ship. |
| 35 | Duration shown is 5:56, measured from the owner's final file (356.4 s); the 3:58 cut is not used | Owner decision (Stage I): the 5:56 video is the only source of truth. |
| 38 | Video chapters are an optional config list rendered as seek buttons; labels are the video's own chapter titles | Start times verified against the file (seek tested to within 0.4 s). |
| 36 | Test video URLs are honoured only in the design-review build | A stray variable can never publish media. |
| 37 | Hero statistics reduced in scale | The project name leads. |
| 39 | V3 Phase 0: film grain, hero spotlight and the radial gradients in `DeviceStage` and the video poster removed | V3 brief: no decorative noise, gradients or endless loops. Solid-colour `linear-gradient` fills used to animate underlines and row fills stay: they draw a flat colour, not a gradient. |
| 40 | Jade accent tokens (`--kb-jade`, `-dim`, `-line`; Tailwind `jade`) ported from PR #1 without its modal or loading styles; focus rings use jade | Keeps the approved accent while PR #1 stays unmerged. |
| 41 | Favicon, touch icon and social image are generated from the Geist wordmark (`scripts/brand/`) and share one palette | The previous set was inconsistent (ring SVG, broken 180 px touch icon). Typography only. |
| 42 | Home title "KUBROBE · Najmiddin Kurganov"; home description is the approved supporting introduction, verbatim (`src/data/site.ts`) | V3 positioning; name publication approved 2026-11-23. Supersedes 26. |
| 43 | `theme-color` follows the real surfaces (`#080808` / `#F3F1EC`) and is set before first paint for a stored light theme | The old values did not match the page. |
| 44 | V3 Phase 1: all personal facts in `src/data/profile.ts`, contact channels in `src/data/site.ts` (`null` hides a channel; LinkedIn stays `null`) | One place to edit; nothing guessed. Placeholder profile mode removed now that real data exists. |
| 45 | Section rails use structural markers (01–05, Archive, @) instead of KB— codes; KB— codes stay only on real entries (101, 102) | V3 brief: no invented catalogue codes. |
| 46 | Home: hero (name, location, statement), introduction with identity card, selected work with a three-screen contact sheet per project, Now and interests, contact | Identity is clear in the first screen; the page ends on what is happening now, then contact. |
| 47 | Theme switch opens the new theme as a circle from the toggle (View Transitions API); falls back to the colour cross-fade; instant under reduced motion | Uses the O/status-glyph motif; no dependency. |
| 48 | Case studies show a 2px jade reading-progress line (CSS scroll timeline; hidden where unsupported) | Brief: subtle progress on long case studies, no JavaScript. |
| 49 | Copy-email button appears only after its script runs; if the clipboard is blocked it selects the address and says so | No control pretends to work without JavaScript. |
| 50 | V3 Phase 2: contact channels are typed entries in `src/data/site.ts` (email, phone, Telegram, GitHub, Instagram, Threads; LinkedIn `null`); one `ContactBlock` renders them on `/contact/` and at the foot of every other page | One source, no duplicated markup; the footer skips the block on `/contact/`. |
| 51 | Contact is a real page (`/contact/`) in the header, mobile bar and hero contents | Gives the channels a URL and a proper active state; replaces the `#contact` anchor. |
| 52 | Social links open in a new tab with `rel="me noopener noreferrer"` and say so to screen readers; platforms are named with handle and domain rather than logos | Recognisable without third-party brand artwork. |
| 53 | Meta text raised to 13px, labels to 12px, `ink-3` lightened to #8F8E8A (6.2:1) | Owner found small text hard to read. |
| 54 | Selected work rows: title, summary, labelled meta (type, status, role, stack), "Read the case study", and three whole screens (staggered on desktop); screens are slightly muted until hover or focus | Each project reads as a piece of work; contrast change gives feedback without decoration. Supersedes 31 and the contact sheet in 46. |
| 55 | Hero intro staggers each meta item, the statement words and each contents link (60ms steps; the whole sequence ends within 1.6s) | Opening reads as one sequence; nothing blocks reading or navigation. |
| 56 | The footer is a compact contact strip (email with copy, profile names opening in a new tab, a link to `/contact/`); the full contact block appears only on `/contact/`. "At a glance" panels are plain `div`s, not `aside`s; email and phone links are at least 44px tall | Owner asked for less repetition on every page. The `aside` change clears axe's landmark rule, and the height change fixes small touch targets found in Android emulation. |
| 57 | SkillSwap was designed and built by the owner alone, from scratch (website, server, database, Android app), with AI-assisted coding tools. It was registered as a team project for a university subject and a hackathon; that registration was for academic and hackathon participation, not shared implementation. Role: "Independent developer — designed and built from scratch"; the registration is recorded in the `context` field of the work entry. Never describe SkillSwap as team-built. The hackathon video transcript stays verbatim | Owner's correction, 2026-11-24. Supersedes 9. |
