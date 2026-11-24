/**
 * Site-level settings: metadata wording and contact channels. The only place contact details live.
 * Copy and channels approved by the owner on 2026-11-23 (V3 master brief).
 * English only for now; translations arrive with the locale dictionaries.
 *
 * Contact: a channel set to `null` is hidden everywhere (footer, About, JSON-LD).
 * Never put a guessed or placeholder address here.
 */

export type ChannelKind = 'email' | 'phone' | 'telegram' | 'github' | 'instagram' | 'threads' | 'linkedin';

export interface Channel {
  kind: ChannelKind;
  label: string;
  /** Text shown for the channel, e.g. the handle or the formatted number. */
  handle: string;
  href: string;
  /** Opens another site; shown with ↗ and rel="me noopener noreferrer", target _blank. */
  external: boolean;
  /** What the link does, for its accessible name, e.g. "Message on Telegram". */
  action: string;
}

/* Approved for public display by the owner (V3 Phase 2 brief, 2026-11-24). */
const email: string | null = 'najmiddinkurganov@gmail.com';
/** E.164, used for the tel: link and JSON-LD. */
const phone: string | null = '+998946414741';
/** How the number is shown. */
const phoneDisplay = '+998 94 641 47 41';
const telegram: string | null = 'https://t.me/kubrobe';
const github: string | null = 'https://github.com/kubrobe';
const instagram: string | null = 'https://instagram.com/kubrobe';
const threads: string | null = 'https://www.threads.net/@kubrobe';
/** Not provided. Add the exact profile URL to publish it; never a guess. */
const linkedin: string | null = null;

const handleOf = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const at = (url: string) => '@' + url.replace(/\/$/, '').split('/').pop()!.replace(/^@/, '');

const all: (Channel | null)[] = [
  email ? { kind: 'email', label: 'Email', handle: email, href: `mailto:${email}`, external: false, action: `Email ${email}` } : null,
  phone ? { kind: 'phone', label: 'Phone', handle: phoneDisplay, href: `tel:${phone}`, external: false, action: `Call ${phoneDisplay}` } : null,
  telegram ? { kind: 'telegram', label: 'Telegram', handle: at(telegram), href: telegram, external: true, action: 'Message on Telegram' } : null,
  github ? { kind: 'github', label: 'GitHub', handle: at(github), href: github, external: true, action: 'GitHub profile' } : null,
  instagram ? { kind: 'instagram', label: 'Instagram', handle: at(instagram), href: instagram, external: true, action: 'Instagram profile' } : null,
  threads ? { kind: 'threads', label: 'Threads', handle: at(threads), href: threads, external: true, action: 'Threads profile' } : null,
  linkedin ? { kind: 'linkedin', label: 'LinkedIn', handle: handleOf(linkedin), href: linkedin, external: true, action: 'LinkedIn profile' } : null,
];

/** Every contact channel in display order. A `null` above hides that channel everywhere. */
export const contact = {
  email,
  phone,
  phoneDisplay,
  channels: all.filter((c): c is Channel => c !== null),
  /** Direct lines: email and phone. */
  get direct() { return this.channels.filter((c) => !c.external); },
  /** Profiles on other sites. */
  get social() { return this.channels.filter((c) => c.external); },
  /** Profiles for JSON-LD `sameAs`. */
  get sameAs() { return this.social.map((c) => c.href); },
};

/** Attributes for any external link: new tab, no opener, no referrer, marked as the owner's profile. */
export const externalAttrs = { target: '_blank', rel: 'me noopener noreferrer' } as const;

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
