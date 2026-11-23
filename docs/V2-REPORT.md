# KUBROBE V2 — implementation report (2026-11-23)

## What changed
- **Jade accent** (`--kb-jade`, dark #63b393 8.4:1, light #17694f 5.9:1): focus rings, active nav, selected filters, primary buttons, modal top edge, Horangi's eyes. No large fills.
- **Horangi** (`src/components/Horangi.astro`): original faceted tiger mark. Header logo, hero, favicon, modal eyebrows, footer, 404 (asleep), media loading state (`.kb-loading`). Blinks and twitches its ears on hover; still under reduced motion.
- **Shared modal** (`components/modal/Modal.astro`, `ModalTrigger.astro`, `scripts/modal.ts`, `styles/modal.css`): native `<dialog>` + showModal (focus trap, inert page), animated open/close, Esc, outside click, scroll lock, focus restore, swap between modals, `#id` deep links, phone sheet with bottom Close. Without JS, triggers are `#id` links and the window shows as a `:target` overlay.
- **Seven detail windows** (`components/details/`): Languages, Skills (filter works without JS), Education, Certifications, Interests, Personal background, Project details (SkillSwap, Doran; link to the full case study).
- **Data files** (`src/data/`): `languages.ts`, `skills.ts`, `education.ts`, `interests.ts`, `background.ts`, `contact.ts`; project details in each work entry's `detail` frontmatter; certifications gained `credentialId`, `image`, `skills`.
- **Pages**: home (hero CTAs, Explore project buttons, About preview with "Get to know me", Explore cards, contact), About (two layers + project cards), 404.

## Content still needed from the owner
- Telegram username → `TELEGRAM_USERNAME` in `src/data/contact.ts` (or `PUBLIC_TELEGRAM_USERNAME` env var).
- Languages: names, levels, certificates, goals (`src/data/languages.ts`).
- Education: degree title and dates (`src/data/education.ts`).
- Certificates, if any (`src/content/certifications/`).
- Interests: "why" and "right now" in your own words; summaries are neutral drafts.
- Background: current goals, future ambitions.

## QA
- `astro check` 0 errors; build OK; JS budget OK.
- axe (WCAG 2.1 AA + best practice): 0 violations on 5 pages and 7 modals, dark and light.
- Behaviour: 24 automated checks (open, Esc, outside click, focus trap/restore, scroll lock, hash, swap, filter, no-JS) pass.
- No horizontal overflow at 320, 360, 375, 390, 430, 768, 1024, 1440 on all pages and all modals.
- Untested: real iOS Safari, Firefox (not available in sandbox).

## Production safeguards
`vercel.json` unchanged (no host redirect). Canonical stays https://www.kubrobe.uz. DNS untouched.
