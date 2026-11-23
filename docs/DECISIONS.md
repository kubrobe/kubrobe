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
| 9 | Contribution stated from the team's own documentation, with AI assistance noted, no teammates named | Git history cannot separate who wrote what. Pending the owner's confirmation. |
| 10 | Gallery lightbox uses the native `popover` attribute | No JavaScript, Esc and light dismiss built in, focus returns to the trigger. |
| 11 | Two architecture diagrams (wide and portrait) switched by CSS | Legible without horizontal scrolling on phones. Only one is exposed to assistive technology at a time. |
| 12 | Three-column prose tables render as stacked cards on narrow screens | Clipped tables are worse than a different layout. |
| 13 | Canonical, `og:url`, `og:image` omitted until a real domain is set | A localhost canonical in production would be harmful. |
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
