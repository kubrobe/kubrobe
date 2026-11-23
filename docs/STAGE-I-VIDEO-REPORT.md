# Stage I: SkillSwap video integration and editorial review

Source of truth: the 5:56 SkillSwap hackathon video from the owner's Google Photos link. The 3:58 cut was not used and its metadata was removed. The file was downloaded to a private scratch folder outside the repository; it is not in git, not uploaded and not published. The URL field is still empty, so the section stays hidden on the live site.

## Facts measured from the file

- Duration: **5:56** (356.416 s). 1920×1080, H.264, 30 fps, AAC audio.
- The video has its own numbered chapter titles (top left) and burned-in English captions. Screens are tagged "Actual app screenshot" or "Illustrative view".
- Method: every 5 seconds was viewed (71 frames), plus black-frame and scene-change detection to find the exact chapter transitions, plus full-resolution checks of the chapter labels.

## Chapters (verified start times)

| # | Start | Video's own title | What happens |
|---|---|---|---|
| 1 | 0:00 | Students have skills worth sharing | Two students with complementary skills and no budget; SkillSwap introduced as an Android app that trades time instead of money. |
| 2 | 0:29 | The time-bank economy | 1 hour taught = 1 credit, 1 hour learned = −1; five welcome credits; credits are rows in a server ledger (welcome, booked, refund, taught); balance = sum of rows. Code from `db/08_hackathon.sql` and `src/mobile.js` is shown. |
| 3 | 1:05 | Discovering skills and booking lessons | Browse, search, live ticker, perfect matches (actual app screenshot); open a lesson, pick a slot, Book (illustrative view); Compose button → ViewModel → repository → server; booking runs in one database transaction (slot lock, own-lesson check, credit check); two students tapping at once, one wins; My lessons and wallet update. |
| 4 | 2:11 | Becoming a teacher | One-screen teach flow (skill, level, description, weekly times, publish), form validation, one request carries the offer and all slots, saved atomically, live update to other phones. |
| 5 | 2:45 | Lesson verification and credits | Four-digit check-in code, shown to the teacher as digits and QR; learner scans or types it; server compares, marks the lesson done and credits the teacher in the same transaction; wrong code returns 403; live "credit" event animates a coin. |
| 6 | 3:30 | Why credits connect different students | Three-person example (Aziza, Bobur, Dilnoza) with zero direct swaps. |
| 7 | 3:58 | Inside SkillSwap | Android architecture (Compose → ViewModel → repository → Room cache and ApiClient → Express server → PostgreSQL on Supabase, shared with the website), transactional sync of six tables, server-sent events, AES-GCM token in Android Keystore, figures: 12 screens, 3 languages, 20 unit tests, 6 cached tables. |
| 8 | 5:06 | Campus pilot proposal | Labelled "Proposal · not an existing partnership or deployment"; seven metrics a one-campus pilot would measure, each shown as "no data yet · to be measured"; three open questions. |
| – | 5:42 | Closing (not numbered in the video) | Closing line and "Let's run a campus pilot" (proposal). |

Seek check: all nine chapter buttons were exercised by keyboard in the test below; each landed within 0.4 s after the stated start.

## Implemented versus proposed

- **Implemented, as stated in the video:** everything in chapters 1–7. Chapter 7 says "Every box is implemented today. Nothing in this diagram is planned work."
- **Illustrative, not footage:** screens tagged "Illustrative view", the ledger rows, the "Student 1 / Student 2" booking race, the wallet balance and the A–D–B diagrams. Only screens tagged "Actual app screenshot" are real captures.
- **Proposed:** chapter 8 and the closing: a pilot on one campus, with no data yet. Not an existing partnership. The page caption says so.
- **Personal contribution:** the video does not state who built what. The page text makes no claim about it; that remains in the case study as written before.

## Claims to verify before publishing

1. "12 screens, 3 languages, 20 unit tests, 6 cached tables": the case study says the Room cache has **7 entities**. Check which is right (6 tables synced vs 7 entities may both be true).
2. "The app contains no database passwords or API keys" and "AES-GCM with a key that never leaves the Android Keystore".
3. "Every box is implemented today."
4. "Shared with the SkillSwap website" (one server, one database).
5. Whether the example people (Aziza Karimova, Bobur Rakhimov, Dilnoza, Student 1/2) are demo characters: the video marks some screens illustrative but does not say it about the names.
6. The code excerpts are labelled "actual source · unmodified": confirm they match the repository you want to show.
7. The GitHub address shown on the last slide (`github.com/kubrobe/skillswap-android`) is public and correct, if you publish it.
8. The spoken audio has not been checked against the captions (see transcript status).

## Transcript status

**Complete for the on-screen captions, not verified against the spoken audio.** No speech-to-text was available (model downloads were blocked), so the transcript is the burned-in English captions, sampled every 5 seconds and grouped by chapter. A brief caption that appeared and vanished between two samples could be missing. It carries no per-line timestamps because sampling cannot support them. The transcript block on the page opens with a line saying it is the caption text, not a spoken transcript. Nothing was invented.

## Caption (WebVTT) status

**Not generated.** Reliable cue timing needs a frame-accurate reading of every caption change or speech-to-text, and neither was available. The `captions` field exists but is empty. The video's own burned-in captions are visible once it plays.

## Poster

`public/media/skillswap-poster.webp`, a 1280×720 still at 0:28.3: the SkillSwap logo, "Trade skills, not bills." and the Android app / Kotlin / Jetpack Compose tags, with no caption bar. The player dims it so the play control stays legible. It is a still from your own video.

## Config (where the URL goes)

`src/data/media.ts` → `videos.skillswap.url`. Accepts a YouTube URL (`https://www.youtube.com/watch?v=…` or `youtu.be`), Vimeo, or a local `/media/<file>.mp4`. Also in that object: `duration`, `description`, `caption`, `chapters`, `transcript`, `poster`, `captions`.

## Files modified

- `src/data/media.ts` (duration, description, caption, nine chapters, transcript, poster)
- `src/components/VideoPlayer.astro` (poster dimmed behind the play control, play control background; poster, transcript and chapter notes support from earlier in this stage)
- `public/media/skillswap-poster.webp` (new)
- `docs/STAGE-I-VIDEO-REPORT.md` (new), `docs/FINAL-CHECKLIST.md`, `docs/DECISIONS.md`, `docs/STAGE-H-REPORT.md`

Not touched: homepage, SkillSwap case study text, Doran, design system, `vercel.json` (its CSP already allows YouTube and Vimeo frames), dependencies.

## Tests

Chromium only (Firefox and WebKit could not be installed here). Design-review build (`KB_SHOW_PLACEHOLDERS=true`) with the full video re-encoded to 640×360 at the same duration, served locally with range support; desktop 1440 px and mobile 390 px with reduced motion on.

| Check | Result |
|---|---|
| `astro check` | 0 errors, 0 warnings, 0 hints |
| Production build | passes; section absent from the built page (only the shared script text remains); no video file in `dist`; no MP4 tracked in git |
| Section appears when configured | yes (design-review build) |
| No video/provider request before play | 0 requests until activation, both viewports |
| Poster loads, lazy | yes |
| Keyboard | Tab/focus reaches the poster link; Enter loads the player and moves focus to it; all 9 chapter buttons work with Enter and Space; transcript opens with Enter |
| Chapter seeks | 9 of 9 within 0.4 s of the stated start; measured duration 356.416 s |
| Transcript | 10 paragraphs rendered in a collapsible block |
| Mobile | no horizontal scroll; every chapter and play target at least 44 px high |
| Reduced motion | mobile run used reduced motion; works |
| Console | no errors or warnings on either viewport |

Not tested: the real YouTube embed (no URL yet; an earlier stage tested the embed with a test ID), Firefox, Safari, iOS, and the light theme for this stage.

## Remaining owner decisions

1. Upload to YouTube (Unlisted) and paste the URL into `videos.skillswap.url`.
2. Review the chapter notes, caption and transcript wording.
3. Check the claims list above, especially 6 versus 7 cached tables.
4. Decide whether to publish the campus-pilot chapters and the GitHub address on the last slide.
5. Say whether you want WebVTT captions; if so, a speech-to-text option or a hand-timed caption file is needed.
