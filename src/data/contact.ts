/**
 * Contact channels, in one place. The footer, the home page and the About page all read from here,
 * so adding a channel never needs a layout change.
 *
 * TELEGRAM
 *   Put your username (without @) in TELEGRAM_USERNAME, e.g. 'kubrobe'. That is the only edit needed:
 *   the Telegram button switches from "pending" to a live https://t.me/<username> link everywhere.
 *   It can also be set without a code change through the PUBLIC_TELEGRAM_USERNAME environment variable
 *   (Vercel → Project → Settings → Environment Variables), which wins over the constant below.
 *   Until a valid username is set, no Telegram link is published.
 *
 * EMAIL / LINKEDIN
 *   Deliberately absent. Add them to `channels` only once the mailbox works / the profile URL exists.
 */
export const TELEGRAM_USERNAME: string = ''; // <- your Telegram username, without @

const fromEnv = (import.meta.env.PUBLIC_TELEGRAM_USERNAME as string | undefined)?.trim().replace(/^@/, '');
const telegram = fromEnv || TELEGRAM_USERNAME.trim().replace(/^@/, '');
/** Telegram usernames: 5–32 characters, letters, digits and underscores. Anything else is ignored. */
const telegramValid = /^[A-Za-z][A-Za-z0-9_]{3,30}[A-Za-z0-9]$/.test(telegram);

export interface Channel {
  id: string;
  label: string;
  /** Live link. Undefined means the channel is pending and is rendered as non-interactive. */
  href: string | undefined;
  /** Short handle shown next to the label. */
  handle?: string | undefined;
  /** One line under the label. */
  note?: string | undefined;
  primary?: boolean;
}

export const channels: Channel[] = [
  {
    id: 'telegram',
    label: 'Telegram',
    href: telegramValid ? `https://t.me/${telegram}` : undefined,
    handle: telegramValid ? `@${telegram}` : undefined,
    note: telegramValid ? 'The quickest way to reach me' : 'Link coming soon',
    primary: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/kubrobe',
    handle: 'kubrobe',
    note: 'Code for SkillSwap, Doran and this site',
  },
];

export const telegramConfigured = telegramValid;
