# Stage H: editorial redesign and project media

Local commits only. Nothing pushed or deployed.

## Design changes

- **Homepage is text-first.** Selected Work is now an index: `01 SkillSwap`, `02 Doran`, each with a large title, description, type, year, status and an arrow. The whole row is one link with a 44 px+ target. No screenshots on the homepage; the screenshots, galleries and content data are untouched on the case studies. The page is 633 px shorter on desktop (4351 to 3718 px at 1440).
- **Homepage rhythm** reviewed top to bottom (header, wordmark, statement, biography and interests, work index, contact, footer). Section heights at 1440: 848 / 1074 / 1028 / 715 px; at 390: 580 / 1004 / 764 / 403 px. No unexplained gaps; no changes were needed beyond the index.
- **SkillSwap hero.** Title, lede, then a calm summary block (status, timeline, role, stack). The headline statistics are kept (they are verified) but reduced from 52 px to about 34 px so they no longer compete with the name. The spec sidebar no longer repeats role, timeline and stack.
- **SkillSwap gallery is an exhibit.** One large screen at a time beside a caption (index, group, title, description), a thumbnail index grouped as **Website** and **Android app** (the only groups the six screenshots support), previous/next buttons, arrow keys, swipe, and an Enlarge button into the existing viewer (Esc, arrows, swipe, focus returns). Works without JavaScript (selection is a radio group).
- **Case-study sequence** is Overview, Problem, Solution, Product experience, Technical architecture, Implementation, My contribution, Challenges and lessons, Current status, **Future direction** (renamed from "Next").
- **Architecture diagram** already ships a portrait variant for phones; checked at 390 px: legible, no horizontal scroll. An enlarged view was judged unnecessary.
- **Doran** keeps the device-frame coverflow, now larger, with a soft spotlight stage, and a visible caption heading and index (`01 / 03 Lesson path`) per screen. It is a coverflow of phones, while SkillSwap is an exhibit of flat screens, so the two read differently.
- **Design tokens** reviewed: all new work uses the existing type scale, `--kb-dur-*` timing, `--kb-ease-*` easing, hairline `--kb-rule` dividers, mono metadata (`.kb-meta`), the `.kb-btn` and `.kb-arrow` patterns. No new colours. Fixed an inconsistency (hero statistics scale).

## Motion

Kept the Stage F system. New, each with a purpose: title mask reveal on index rows; title shift, underline sweep, arrow nudge, metadata brightening and a faint fill on hover/focus/press; the title still morphs into the case study via the existing view transition; exhibit screens fade up 10 px on change; video section reveals with the clip reveal when configured. All off under reduced motion. Removed the unused parallax rules.

## Hackathon video

**The video file was not available to me.** The only thing supplied was a phone screenshot of a player (`SkillSwap_demo.mp4`, 3:58, paused at 0:45); the file is not in the project folders or the sandbox, and I cannot watch video anyway. So nothing was uploaded, copied or invented, and the real duration (3:58, not five minutes) is used. The screenshot was not used as a poster.

What was built:

- `src/data/media.ts`: the central configuration. **The one field to fill in is `videos.skillswap.url`.** It accepts a YouTube URL (`https://www.youtube.com/watch?v=...` or `youtu.be`), a Vimeo URL, or a local `/media/<file>.mp4` placed in `public/media/`. Optional `poster` and `captions` (WebVTT) fields exist. Title, description, duration (3:58) and caption are already written there; edit them if you want different wording.
- `src/components/VideoPlayer.astro`, section "From idea to presentation": 16:9, typographic poster with a play control (a real link to the video without JavaScript), click-to-load (iframe or `<video controls>` only after activation; focus moves to the player), no autoplay on arrival, YouTube via `youtube-nocookie`, Vimeo with do-not-track.
- Hidden on the live site until a URL is set. Dev and design-review builds show a dashed "Not configured" stand-in that never ships.
- CSP now allows `youtube-nocookie.com` and `player.vimeo.com` frames.
- Tested: no URL (production: no section, no provider text in the page; dev: stub), a local test MP4 (poster, click, loads, focus, plays; zero external requests), a YouTube URL (no request to any external host before the click; iframe with the right src and title after). The test URLs were only fed through a design-review build variable that is ignored in production and are not in any commit.
- Needs from you: the video URL (a private, unlisted YouTube link is fine), or the MP4 if you prefer hosting it with the site (note: a file in `public/` is public once deployed, and large files are better on a video host).

## Responsive and browser results (Chromium only)

axe: 0 violations on all 8 routes at 360 and 1440, dark; main routes in light. No horizontal overflow or console errors at 360, 768, 1024 and 1440. Index rows, exhibit, stage and video player checked at 390 and 1440, dark and light. Keyboard: Tab reaches an index row with a visible ring and Enter opens the case study; exhibit radios respond to arrow keys; viewer Esc returns focus to Enlarge. Reduced motion: no animation. No JavaScript: all headings and index rows visible, thumbnails still switch screens, step buttons stay hidden. Firefox and Safari are still untested (browser downloads blocked).

## Performance

Lighthouse (Brotli local server): all three pages 100 mobile and 100 desktop; accessibility, best practices, SEO 100; mobile LCP 1.5 s (home), 1.7 s (SkillSwap, Doran); CLS 0 to 0.002. JavaScript gzipped: home 0.87 KB (unchanged), SkillSwap 1.90 KB (from 1.42: exhibit stepping plus the video loader), Doran 1.25 KB. No provider loads before play and none loads on the homepage. Images keep explicit dimensions; thumbnails are 72/144 px, only the first screen loads eagerly. No dependencies added. Production build and `astro check`: 0 errors.

## Files

New: `src/components/Exhibit.astro`, `src/components/VideoPlayer.astro`, `src/data/media.ts`, `docs/STAGE-H-REPORT.md`.
Rewritten: `src/components/home/FeaturedWork.astro`.
Modified: `src/components/DeviceStage.astro`, `src/pages/work/[slug].astro`, `src/content.config.ts` (`group`, `video`, `presentation: exhibit`), `src/content/work/skillswap.md` (groups, presentation, video key, "Future direction"), `src/styles/motion.css`, `vercel.json`, and the docs.
Not touched: screenshots and their data, other pages, dependencies.

## Remaining information needed from you

1. The SkillSwap video URL (or MP4) for `src/data/media.ts`; whether the caption wording is right ("Recorded for the hackathon demo. It shows the demo data only; no real accounts appear." is my assumption, so please confirm it is true of the video).
2. Optional: a real frame from the video as `poster`, and a captions file.
3. Two more SkillSwap screens exist in the assets folder but were never in the gallery (a profile screen showing a demo email address, and a website browse screen). I left them out; say if you want either added.
