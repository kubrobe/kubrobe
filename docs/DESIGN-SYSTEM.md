# KUBROBE — Stage B design system

Hybrid editorial / cinematic / experimental, strictly monochrome. The source of truth is
`src/styles/global.css`. This file explains it.

## 1. Colour tokens

Contrast ratios are WCAG 2 against `bg` / `bg-2`. Every **text** token passes AA (4.5:1) on both surfaces.

| Token | Dark (default) | Ratio | Light | Ratio | Use |
| --- | --- | --- | --- | --- | --- |
| `bg` | `#080808` | | `#F3F1EC` | | page |
| `bg-2` | `#151515` | | `#E8E5DE` | | raised: previews, pressed states, mobile bar active |
| `ink` | `#F2F2F0` | 17.9 / 16.3 | `#0B0B0B` | 17.4 / 15.7 | headings, body |
| `ink-2` | `#A8A8A4` | 8.4 / 7.7 | `#4A4844` | 8.1 / 7.3 | secondary text, metadata |
| `ink-3` | `#808080` | 5.1 / 4.6 | `#64625D` | 5.4 / 4.8 | IDs, quiet labels |
| `rule` | `#242424` | | `#D8D4CB` | | hairlines |
| `rule-2` | `#3A3A3A` | | `#B9B4AA` | | emphasised hairlines, hover borders |

**Accent is inversion.** An active or selected element swaps `ink` and `bg`. There are no hues, gradients or glows.
The grain overlay is 3.5% in dark and off in light.

## 2. Typography

| Family | Role |
| --- | --- |
| **Geist** (variable 100–900) | wordmark, headings, UI, body |
| **Instrument Serif**, regular and italic | the editorial voice: writing titles, the introduction, one emphasised word per heading |
| **Geist Mono** (variable) | IDs, metadata, labels, numerals in tables |

Fluid between 375 px and 1440 px:

| Step | Size | Weight / tracking | Use |
| --- | --- | --- | --- |
| `display` | fitted to width | Geist 640, −5.5% | KUBROBE wordmark |
| `h1` | 56 → 128 | Geist 600, −4% | page titles |
| `h2` | 40 → 80 | Geist 560, −3.5% | section titles |
| `h3` | 24 → 34 | Geist 500, −2.5% | entry titles |
| `lead` | 22 → 36 | Geist 450 or Serif 400, −2% | introduction, about |
| `lg` | 17 → 20 | Geist 400 | large body |
| `body` | 17 / 1.6 | Geist 400, 65ch max | reading |
| `sm` | 14 | Geist 400 | secondary UI |
| `meta` | 12 / 1.6 | Mono, +2%, tabular | metadata |
| `micro` | 11 | Mono, +8%, uppercase | labels |

Rules: one serif-italic word per heading at most; mono is never used for sentences; line length 45–70ch for prose.

## 3. Spacing

Base unit 4 px. Tailwind's default `--spacing: 0.25rem` scale is the step scale (`1`=4, `2`=8, `3`=12, `4`=16, `6`=24, `8`=32, `12`=48, `16`=64, `24`=96, `32`=128).

Named rhythm tokens:

| Token | Value | Use |
| --- | --- | --- |
| `--kb-space-section` | clamp(72px, 11vw, 176px) | vertical space between sections |
| `--kb-space-block` | clamp(32px, 5vw, 72px) | between blocks inside a section |
| `--kb-margin` | max(16px, 4vw) | page side margin (plus safe-area insets) |
| `--kb-gutter` | clamp(16px, 1.6vw, 24px) | column gap |

## 4. Grid

| Breakpoint | Columns | Notes |
| --- | --- | --- |
| < 768 | 4 | rail collapses to a mono line above each heading |
| 768–959 | 6 | rail still inline; two-column compositions start |
| ≥ 960 (`lg`) | 12 | columns 1–2 are the **metadata rail**; content spans 3–12 or breaks it |

Max content width 1680 px. Asymmetric compositions use deliberate offsets, for example the
introduction in columns 4–11 and certifications split 3–7 / 8–12.
Full-width moments (wordmark, contact) ignore the rail.

## 5. Borders and surfaces

- Hairlines only: 1 px `rule`. Sections are separated by space first and a rule second.
- No radius anywhere (0). No shadows. No blur.
- Raised surfaces (`bg-2`) are used for previews and pressed states only.
- Dashed borders are reserved for placeholder markers.

## 6. Motion

**Principle: things are filed, not flown in.** Motion moves along the grid, resolves from coarse to fine,
or follows the pointer. Nothing loops except the very slow grain drift. Nothing hijacks scroll.

| Token | Value |
| --- | --- |
| `--kb-ease-out` | cubic-bezier(.2, .7, 0, 1): entrances, hovers |
| `--kb-ease-mask` | cubic-bezier(.76, 0, .24, 1): masks, page transitions |
| `--kb-dur-instant` | 120 ms: press, toggle |
| `--kb-dur-micro` | 240 ms: hover, focus |
| `--kb-dur-ui` | 420 ms: row shift, preview |
| `--kb-dur-reveal` | 900 ms: wordmark, headings |
| stagger | 50 ms, at most 8 items |

| Moment | Technique | JS | Reduced motion |
| --- | --- | --- | --- |
| Wordmark intro: letters rise through a mask, from the O outward | CSS keyframes | 0 | static |
| Wordmark weight follows the pointer (desktop, fine pointer only) | rAF + variable font axis | ~0.6 KB | off |
| Section headings and rows reveal as they enter | CSS scroll-driven animations (`animation-timeline: view()`) with `@supports` fallback to static | 0 | static |
| Project hover preview: 1-bit pattern seeded by the entry ID, revealed by a clip-path mask | canvas, desktop only | ~1 KB | shown without the mask animation |
| Page transitions | cross-document View Transitions (`@view-transition`) | 0 | off |
| Interactive navigation: underline draws from the left; active item inverted on phones | CSS | 0 | instant |
| Background movement: grain drifts in 8 s steps | CSS transform | 0 | off |

**Why no GSAP yet.** GSAP plus ScrollTrigger is about 45 KB gzipped, which is almost the whole
50 KB homepage budget. It would mostly be doing things that modern CSS now does without JavaScript
(scroll-linked reveals, staggered keyframes, view transitions). It earns its place only for
choreography CSS cannot express, such as a shared-element transition from a project row into a case
study with interruptible timelines. If that is wanted in Milestone 4, GSAP will be loaded dynamically,
only on the pages that use it.

**No custom cursor.** It would replace a native affordance without adding meaning.

## 7. Breakpoints

| Name | Min width | Tailwind variant |
| --- | --- | --- |
| sm | 480 px (30rem) | `sm:` |
| md | 768 px (48rem) | `md:` |
| lg | 960 px (60rem) | `lg:`: 12-column grid, top nav, rail |
| xl | 1440 px (90rem) | `xl:` |

Small Android (360 px) is the baseline test width.

## 8. Interaction principles

1. **Every interactive thing has three states**: rest, hover/focus (identical), pressed. Focus is always a visible 2 px outline.
2. **Keyboard parity**: anything shown on hover is shown on focus.
3. **Touch first**: targets at least 44 px tall on phones; nothing depends on hover.
4. **Information over decoration**: counts, IDs and dates are real data or absent.
5. **No scroll hijacking**, no smooth-scroll library, no custom cursor.
6. **Empty means hidden**: no section, nav item or count renders without real content.
7. **Motion is optional**: the page is complete and readable with motion off and with JavaScript off.
