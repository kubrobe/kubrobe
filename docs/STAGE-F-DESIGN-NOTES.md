# Stage F: design notes

Direction: keep the Index identity (monochrome, editorial, dark-first, Geist plus Instrument Serif italic, mono metadata). Raise craft, not decoration. References are used as principles, not templates: the slow confidence of editorial fashion and architecture sites, the typographic nerve of experimental type studios, the restraint of high-end product storytelling. No template layouts are borrowed.

## Three principles

1. **Hierarchy first.** One loud thing per screen (wordmark, section heading, project title); everything else quiet and mono. Motion must reinforce that order, never compete with it.
2. **Motion explains.** Every animation answers a question: where did this come from (reveals follow scroll direction), where am I (nav indicator, shared titles), what changed (gallery state, theme). If it explains nothing, it is cut.
3. **Memorable, not noisy.** Two or three signature moves, reused with the same easing and timing everywhere: mask rise (type), line draw (rules), clip reveal (images), shared-title morph (navigation).

## Current strengths

- A confident full-bleed wordmark and a strict 12-column grid with a mono metadata rail.
- Honest, readable case studies; consistent status glyphs and ledger tables.
- CSS-only reveals and cross-document view transitions already in place, under 1 KB of JavaScript.
- Dark and light palettes that both pass contrast.

## Weak areas found on inspection

| Area | Problem |
| --- | --- |
| Hero | Entrance replays on every in-site visit to the home page; rules and meta appear but nothing "draws"; statement fades as one block |
| Sections | Borders just appear; rails scroll away so the section label is lost on long sections |
| Featured work | Screens sit in a flat grid inside a grey box; Doran and SkillSwap look identical; the first impression of the flagship is a strip, not a composition |
| Case-study gallery | Good enlarge behaviour, but no sense of position (which of 6), no next/previous inside the enlarged view, no keyboard stepping |
| Doran | Generic gallery strip; real phone screenshots have no device character |
| SkillSwap page | Long page with no way to see structure or jump; stats and diagram appear all at once |
| Navigation between projects | None; the only way on is back to the list |
| Page transitions | Whole-page fade only; nothing connects a project title in the list to the same title on the case study |
| Theme switch | Instant flip |
| Micro-interactions | Hover effects defined per component; timings and easing mostly shared through tokens but buttons and links not unified |

## Proposed refinements

- A single motion layer (`src/styles/motion.css`) with named patterns and shared tokens. Components opt in with `data-reveal="…"`.
- Hero intro plays only on a fresh arrival (direct, reload, external link), not when navigating inside the site.
- Rules draw in; the statement reveals word by word through masks, keeping the italic word.
- Wordmark responds to scroll (weight and lift), and to the pointer (existing, kept).
- Sticky section labels, drawn section rules.
- Featured work as a layered composition: SkillSwap as a staggered board of bare screens, Doran as framed devices.
- Case-study gallery with position indicator, stepping in the enlarged view, arrow keys.
- Doran device stage with radio-driven screenshot switching (works without JavaScript).
- Sticky contents list on desktop, a compact disclosure on mobile; staggered diagram reveal.
- Previous and next project links; title morph between list and case study via view transitions.
- A short, interruptible theme cross-fade.

## Animation opportunities considered and rejected

- **Custom cursor.** Rejected on design grounds, not built (see DECISIONS.md). The hover previews and focus states already give the pointer meaning, and a cursor layer would add a permanent rAF loop and accessibility risk for decoration.
- **Smooth-scroll libraries, scroll pinning of long sections.** Rejected: scroll hijacking.
- **GSAP.** Not needed. Everything planned is expressible as CSS scroll-driven animation, view transitions, the Popover API and a few small scripts.
- **Parallax on phones.** Off: it costs battery and adds nothing on a small screen.

## Performance considerations

- Animate `transform`, `opacity` and `clip-path` only. No filters except the existing greyscale screenshot hover.
- Scroll-driven animations run on the compositor in Chromium; no scroll listeners are added.
- JavaScript budget for the homepage stays far under 50 KB. Any script is inline, small, event-driven and avoids rAF loops (the existing wordmark pointer loop runs only while the pointer moves).
- Images keep intrinsic aspect ratios (no layout shift); new images are lazy unless in the first viewport.
- Everything new has a static fallback: content is visible without JavaScript and without scroll-timeline support.
