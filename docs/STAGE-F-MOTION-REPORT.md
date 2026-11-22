# Stage F: motion and interaction report

Scope: raise visual quality, animation and interaction design without changing the identity (editorial, monochrome, dark-first) and without adding dependencies.

## Animations added

| Area | What it does | How |
| --- | --- | --- |
| Entrance (home, first arrival only) | Wordmark letters rise through a mask, hero rules draw, statement reveals word by word, spotlight fades in, header settles. Content is usable from the first frame. | CSS keyframes under `html[data-intro]`, set by a tiny inline script when the path is `/` and the referrer is not this site. No storage. |
| Wordmark | Weight eases from 640 to 440 as the hero scrolls away; pointer handler from Stage C kept. | `@property --kb-wm-w` and a scroll timeline. |
| Scroll reveals | Rise, mask and clip reveals; rule lines draw; section heading masks; figures and tables rise; counters on case-study headings. | `animation-timeline: view()` inside `@supports`. |
| Parallax | Gentle, on project figures only, desktop with a hover pointer. | Same scroll timelines; disabled below 60rem and without hover. |
| Project figures | Real screenshots in a framed board (SkillSwap) or overlapped device frames (Doran); greyscale to colour on hover or focus. | CSS. |
| SkillSwap gallery | Scroll-snap strip with position ticks, hover lift, enlarge viewer with caption, counter, arrows, swipe, Esc. | Native `popover`, one small script for stepping and swipe. |
| Doran stage | Coverflow of devices; choose a screen from tabs or by clicking a device; Enlarge opens the viewer. | Radio inputs and `:has()`. Works with no JavaScript. |
| Case-study navigation | Sticky "On this page" with scroll-spy (desktop), collapsible list (mobile), previous/next cards, breadcrumb with position. | One passive scroll listener, one read per frame. |
| Page transitions | Cross-document view transition: short fade, sliding nav indicator, project title morphs between work list, case study and next-project card. | `@view-transition`, `view-transition-name`. Unsupported browsers navigate immediately. |
| Work list | A screen from the project slides in beside the row on hover or keyboard focus. Decorative, pinned in place. | CSS with `:has()`; pointer and 60rem+ only. |
| Theme switch | 280 ms colour cross-fade, toggle icon turns 180 degrees. | Class on `html` for 360 ms, removed afterwards. |
| Micro-interactions | One easing family and four durations (120/240/420/900 ms). Shared `.kb-btn` (buttons) and `.kb-arrow` (directional nudge). | CSS tokens. |

## Dependencies

Added: none. Avoided: GSAP, Lenis, any scroll library, React islands, Three.js. Everything above is CSS plus about 1 KB of inline script per page where noted. GSAP was not needed because no animation required sequencing the platform cannot express.

## Performance

- Homepage JS: 0.87 KB gzipped (budget 50 KB). SkillSwap page 1.42 KB, Doran 1.25 KB, other pages 0.60 KB.
- CSS: about 13 KB gzipped in total across the shared and page sheets.
- No `requestAnimationFrame` loops except one-per-scroll-frame throttling in the contents scroll-spy and the existing wordmark pointer handler.
- Lighthouse (local static server, default throttling): `/` mobile 98, desktop 100; SkillSwap mobile 94, desktop 100; Doran mobile 98, desktop 100. Accessibility, best practices and SEO 100 on all. CLS 0 to 0.004. SkillSwap mobile LCP is 2.9 s (large hero screenshot strip), the lowest score.
- Stage E for comparison: Lighthouse 97 to 100, homepage JS 0.67 KB.

## Accessibility

- axe-core (WCAG 2 A/AA, 2.1 AA, best practice): 0 violations on all 8 routes at 360 and 1440, dark; home, SkillSwap, Doran, About, Work also clean in light.
- Every motion is under `prefers-reduced-motion: no-preference`; with `reduce`, zero elements animate (checked). Transitions in the stage and viewer are switched off too.
- No JavaScript: content visible, Doran stage still switches screens, viewer opens via popover, contents list and links work.
- Keyboard: focus ring everywhere; viewer arrows, Esc, focus returns to the trigger; stage radios are arrow-key operable; tab order unchanged.
- Touch: targets 44 px; hover previews are pointer-only; parallax off on touch.
- Decorative previews are `aria-hidden` with empty alt; screenshots keep real alt text.

## Browser compatibility

Tested: Chromium (Playwright). Not tested: Firefox (browser download blocked here), Safari/WebKit. Expected behaviour is progressive: scroll-driven reveals, view transitions and `@starting-style` simply do not run, and content shows in its final state. A build with the scroll-timeline support condition removed was served and checked to simulate this. `abs()` has a fallback in the stage; `:has()` and `popover` need current browsers (Safari 17.4+, Firefox 121+ for `:has()`, 125+ for popover). See the launch checklist.

## Rejected

- Custom cursor: judged on design grounds (it competes with the editorial calm, adds a permanent listener, and offers nothing a hover state does not) and not prototyped.
- Scroll hijacking, smooth-scroll libraries, mobile parallax, horizontal scroll sections, loader screens.

## Limitations

- Cross-document transitions and scroll timelines were only observed in Chromium.
- Touch was emulated, not run on a device.
- The copy-email button could not be exercised because no public email is set yet.
- GitHub and Render links are unreachable from this environment and were not checked.
- The title morph was verified by navigation events (transition present, names unique), not by frame inspection.
