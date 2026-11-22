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
