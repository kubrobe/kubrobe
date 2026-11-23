/**
 * Site-level settings: metadata wording and contact channels.
 * Copy and channels approved by the owner on 2026-11-23 (V3 master brief).
 * English only for now; translations arrive with the locale dictionaries.
 *
 * Contact: a channel set to `null` is hidden everywhere (footer, About, JSON-LD).
 * Never put a guessed or placeholder address here.
 */

export interface Channel {
  label: string;
  /** Text shown for the channel, e.g. the handle. */
  handle: string;
  href: string;
  /** Opens another site; shown with ↗ and rel="me noopener". */
  external: boolean;
}

const email: string | null = 'najmiddinkurganov@gmail.com';
const github: string | null = 'https://github.com/kubrobe';
const telegram: string | null = 'https://t.me/kubrobe';
/** Not provided yet. Add the exact profile URL to publish it. */
const linkedin: string | null = null;

const handleOf = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export const contact = {
  email,
  github,
  telegram,
  linkedin,
  /** Ordered channel list for display. Email first: it is the main way in. */
  channels: [
    email && { label: 'Email', handle: email, href: `mailto:${email}`, external: false },
    github && { label: 'GitHub', handle: handleOf(github), href: github, external: true },
    telegram && { label: 'Telegram', handle: handleOf(telegram), href: telegram, external: true },
    linkedin && { label: 'LinkedIn', handle: handleOf(linkedin), href: linkedin, external: true },
  ].filter((c): c is Channel => Boolean(c)),
  /** Profiles for JSON-LD `sameAs`. */
  get sameAs() {
    return [github, telegram, linkedin].filter((u): u is string => Boolean(u));
  },
};

export const site = {
  brand: 'KUBROBE',
  /** Home <title>. Other pages use "Page · KUBROBE". */
  homeTitle: 'KUBROBE · Najmiddin Kurganov',
  /** Home meta and social description: the approved supporting introduction, verbatim. */
  homeDescription:
    "I'm Najmiddin Kurganov, an IT-Business student interested in technology, business and creative problem-solving. I explore ideas, build projects and document what I learn along the way.",
  /** Describes public/og.png (regenerate with scripts/brand when the wording changes). */
  ogImageAlt: 'KUBROBE wordmark in off-white on black, with the line “A curious mind, building across disciplines.”',
} as const;
