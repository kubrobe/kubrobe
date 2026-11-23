/**
 * Central media configuration.
 *
 * To add the SkillSwap hackathon video, set `url` below. That is the only field you need.
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
  /** Shown on the poster. Measured from the supplied file: 5:56. */
  duration: string;
  /** One sentence of context under the player. */
  caption: string;
  /** Optional chapter list: start time in seconds and a label. Rendered as seek buttons under the player. */
  chapters?: { t: number; label: string }[] | undefined;
  /** Optional local poster image in public/media/ (a real frame from the video). */
  poster?: string | undefined;
  /** Optional local WebVTT captions in public/media/ (MP4 only). */
  captions?: string | undefined;
}

export const videos: Record<string, VideoConfig> = {
  skillswap: {
    url: undefined,
    title: 'SkillSwap: from idea to presentation',
    description: 'The presentation made for the hackathon: from the idea of a time bank, through booking and teaching, to the architecture behind it.',
    duration: '5:56',
    caption: 'A narrated walkthrough with on-screen captions. It uses the demo characters, some visuals are marked illustrative, and the closing chapter is a proposal for a campus pilot, not an existing deployment.',
    // Times are approximate (within a couple of seconds); labels are the video's own chapter titles.
    chapters: [
      { t: 0, label: 'Students have skills worth sharing' },
      { t: 30, label: 'The time-bank economy' },
      { t: 65, label: 'Discovering skills and booking lessons' },
      { t: 131, label: 'Becoming a teacher' },
      { t: 164, label: 'Lesson verification and credits' },
      { t: 213, label: 'Why credits connect different students' },
      { t: 237, label: 'Inside SkillSwap' },
      { t: 308, label: 'Campus pilot proposal' },
    ],
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
