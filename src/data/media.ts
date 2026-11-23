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
  /** Shown on the poster. From the owner's own player: 3:58. */
  duration: string;
  /** One sentence of context under the player. */
  caption: string;
  /** Optional local poster image in public/media/ (a real frame from the video). */
  poster?: string | undefined;
  /** Optional local WebVTT captions in public/media/ (MP4 only). */
  captions?: string | undefined;
}

export const videos: Record<string, VideoConfig> = {
  skillswap: {
    url: undefined,
    title: 'SkillSwap: from idea to presentation',
    description: 'The short presentation made for the hackathon, walking through what SkillSwap is and how the website and the Android app work together.',
    duration: '3:58',
    caption: 'Recorded for the hackathon demo. It shows the demo data only; no real accounts appear.',
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
