/**
 * Central media configuration.
 *
 * To add the SkillSwap hackathon video, set `videos.skillswap.url` below. That is the only field you need;
 * the section appears on the live site as soon as it is set and not before.
 *
 *   url: 'https://www.youtube.com/watch?v=VIDEO_ID'   (YouTube, unlisted is fine)
 *   url: 'https://vimeo.com/123456789'                (Vimeo)
 *   url: '/media/skillswap-demo.mp4'                  (a local file placed in public/media/)
 *
 * Until `url` is set the section is not rendered on the live site. Nothing loads from a video
 * provider until a visitor presses play. Never put a video here that is not yours to publish.
 */
export interface VideoConfig {
  /** YouTube, Vimeo or local MP4 path. Leave undefined while there is no real video. */
  url: string | undefined;
  title: string;
  description: string;
  /** Shown on the poster, as m:ss. */
  duration: string;
  /** One sentence of context under the player. */
  caption: string;
  /** Optional chapters: start time in seconds, the video's own label, optional one-line description. Rendered as seek buttons. */
  chapters?: { t: number; label: string; note?: string }[] | undefined;
  /** Optional transcript, one paragraph per item. Rendered in a collapsible block under the player. */
  transcript?: string[] | undefined;
  /** Optional local poster image in public/media/ (a real frame from the video). */
  poster?: string | undefined;
  /** Optional local WebVTT captions in public/media/ (MP4 only). */
  captions?: string | undefined;
}

export const videos: Record<string, VideoConfig> = {
  skillswap: {
    url: undefined, // <- put the YouTube (unlisted) URL here when it exists
    title: 'SkillSwap: from idea to presentation',
    description: 'The hackathon presentation for SkillSwap: the idea, how credits work, the Android app, how it is built, and a proposed campus pilot.',
    duration: '5:56', // measured from the 5:56 file (356.4 s)
    caption: 'The hackathon presentation. Screens the video labels as illustrative are illustrations, and the final chapter is a proposal, not an existing partnership or deployment.',
    // Start times verified against the file (the video fades through black between its own numbered chapters).
    // Labels are the video's own on-screen chapter titles; notes are written from what is shown and captioned.
    chapters: [
      { t: 0, label: 'Students have skills worth sharing', note: 'The problem, and SkillSwap as an Android app that trades time instead of money.' },
      { t: 29, label: 'The time-bank economy', note: 'Teach an hour to earn a credit, book an hour to spend one; credits are rows in a server ledger.' },
      { t: 65, label: 'Discovering skills and booking lessons', note: 'Browse, search and book in the app; the server books each slot inside one transaction.' },
      { t: 131, label: 'Becoming a teacher', note: 'Publishing a lesson offer with weekly free times on one screen.' },
      { t: 165, label: 'Lesson verification and credits', note: 'A secret check-in code, as digits or a QR code, must match before the teacher earns the credit.' },
      { t: 210, label: 'Why credits connect different students', note: 'A three-person example in which nobody swaps directly.' },
      { t: 238, label: 'Inside SkillSwap', note: 'The Android architecture, the shared server and database, and project figures.' },
      { t: 306, label: 'Campus pilot proposal', note: 'A proposal, not an existing partnership: what a one-campus pilot would measure.' },
      { t: 342, label: 'Closing', note: 'The closing line and a call to run a campus pilot (proposal).' },
    ],
    // Taken from the burned-in captions, grouped by the video's chapters. Lines in square brackets describe visuals, not speech.
    transcript: [
      'Text of the on-screen captions, grouped by chapter. Spoken audio has not been checked against it.',
      '1. Students have skills worth sharing. Every campus is full of students who know something worth teaching. Aziza writes Python, and wants to learn interface design. Bobur designs in Figma, and wants to learn photography. Both have real skills. Neither has a tutoring budget, and they don’t want the same thing from each other. SkillSwap is an Android app that lets students trade what they know for what they want to learn, using time instead of money.',
      '2. The time-bank economy. Teach one hour, and you earn one credit. Book one hour of learning, and you spend one. New members start with five welcome credits, so they can learn before they teach. Under the hood, there is no balance number to overwrite. Every credit is a row in a ledger on our server: welcome, booked, refund, or taught. A balance is simply the sum of those rows, so every credit can be traced back to a lesson.',
      '3. Discovering skills and booking lessons. Here is the real app. Aziza opens Browse, searches skills and teachers, and sees her perfect matches. She opens a lesson, reviews the teacher’s free times, and taps Book. In the Compose screen, the button hands the time slot to our ViewModel and waits for one answer: success, or a message to show. The ViewModel passes it to a single repository. Every change goes to the server first, and then the phone downloads a fresh copy. The rules live on the server, inside one database transaction. It locks the time slot, rejects your own lesson, checks that you have a credit, and only then takes the slot and writes minus one to the ledger. So if two students tap Book at the same moment, exactly one of them gets the lesson. Back in the app, the lesson appears under My lessons, and one credit leaves the wallet.',
      '4. Becoming a teacher. Becoming a teacher takes one screen. Choose a skill, say how well you know it, describe the lesson, and add the weekly times you’re free. Before anything is sent, the screen checks the form: a skill, a description, and at least one time. Then the app sends the offer and all of its time slots in one request, and the server saves them together, or not at all. The new listing reaches every phone through a live update.',
      '5. Lesson verification and credits. A time bank only works if credits are earned honestly. So a lesson is not finished until both people actually meet. Each booking has a secret four-digit code. Only the teacher’s phone receives it, shown as digits and as a QR code. Then the server compares the code. If it matches, the lesson is marked done and the teacher earns one credit, in the same transaction. The teacher’s phone hears about it over a live connection, and the coin flies into the wallet.',
      '6. Why credits connect different students. Here is why credits matter. Aziza teaches Python to Dilnoza, and earns a credit. She spends it learning Figma from Bobur. Bobur spends his learning photography from Dilnoza. Nobody in this circle swapped directly with anyone else. You teach one person, and learn from another. No perfect one-to-one match is required.',
      '7. Inside SkillSwap. Inside, the app is written in Kotlin with Jetpack Compose, and follows one clear path. Screens talk to a ViewModel. The ViewModel talks to one repository. The repository is the only place that touches data. The server and its PostgreSQL database are the source of truth, shared with the SkillSwap website. On the phone, a Room database is a cache. Each sync replaces six tables in one transaction, so a screen never sees half-updated data. Screens read that cache as live flows, so they open instantly and update by themselves. A server-sent event stream tells every phone when something changed. The session token is encrypted with a key held in the Android Keystore, and the app contains no database passwords or API keys. Twelve screens, three languages, and unit tests on the core logic. That separation is what keeps the project maintainable as it grows.',
      '8. Campus pilot proposal. What we don’t have yet is evidence at scale. So our next step is a proposal: a pilot on one campus. It is not an existing partnership. It is a test we would like to run. We would measure how many students join, first completed lessons, repeat bookings, credits earned and spent, active teaching offers, completion rates, and the variety of skills exchanged. Together, those numbers would show whether a time bank has the liquidity and engagement to work in a university.',
      'Closing. SkillSwap turns what students know into opportunities to learn what they don’t. We’re proposing a campus pilot. Let’s test it together.',
    ],
    poster: '/media/skillswap-poster.webp', // frame at 0:28, the SkillSwap tagline, with no caption bar
  },
};

/** Design-review builds may preview a video without editing this file (never honoured in production). */
const test = import.meta.env.KB_SHOW_PLACEHOLDERS === 'true' ? import.meta.env.KB_TEST_VIDEO_URL : undefined;

export type VideoSource =
  | { kind: 'youtube'; id: string; watch: string }
  | { kind: 'vimeo'; id: string; watch: string }
  | { kind: 'mp4'; src: string };

/** Understands only the URL shapes below; anything else returns undefined and the section stays hidden. */
export function parseVideoUrl(raw: string | undefined): VideoSource | undefined {
  if (!raw) return undefined;
  if (raw.startsWith('/') && /\.(mp4|webm)$/i.test(raw)) return { kind: 'mp4', src: raw };
  let u: URL;
  try { u = new URL(raw); } catch { return undefined; }
  if (u.protocol !== 'https:') return undefined;
  const h = u.hostname.replace(/^www\./, '');
  if (h === 'youtu.be') { const id = u.pathname.slice(1); return /^[\w-]{6,20}$/.test(id) ? { kind: 'youtube', id, watch: `https://www.youtube.com/watch?v=${id}` } : undefined; }
  if (h === 'youtube.com' || h === 'm.youtube.com') {
    const id = u.searchParams.get('v') ?? u.pathname.match(/^\/(?:embed|shorts)\/([\w-]{6,20})/)?.[1] ?? '';
    return /^[\w-]{6,20}$/.test(id) ? { kind: 'youtube', id, watch: `https://www.youtube.com/watch?v=${id}` } : undefined;
  }
  if (h === 'vimeo.com') { const id = u.pathname.match(/^\/(\d{5,12})/)?.[1]; return id ? { kind: 'vimeo', id, watch: `https://vimeo.com/${id}` } : undefined; }
  return undefined;
}

export function getVideo(key: string) {
  const cfg = videos[key];
  if (!cfg) return undefined;
  const source = parseVideoUrl(test ?? cfg.url);
  return { cfg, source };
}
