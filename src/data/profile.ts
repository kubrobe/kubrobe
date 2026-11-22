import { z } from 'astro/zod';

/**
 * Personal content. Every field is optional on purpose: anything left empty is hidden
 * on the site. Do not fill these with guesses. Mark one word in `statement` with
 * *asterisks* to set it in Instrument Serif italic.
 */
const schema = z.object({
  name: z.string().default('KUBROBE'),
  /** One sentence about what you build. */
  statement: z.string().optional(),
  role: z.string().optional(),
  currently: z.string().optional(),
  openTo: z.string().optional(),
  /** Short about text, one paragraph per item. */
  about: z.array(z.string()).default([]),
  /** What you are learning or working on right now. */
  now: z.array(z.string()).default([]),
  interests: z.array(z.object({ title: z.string(), note: z.string().optional() })).default([]),
  email: z.email().optional(),
  links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
  /** City shown in the metadata line. */
  city: z.string().optional(),
  /** IANA zone for the optional live clock, e.g. "Asia/Tashkent". */
  timeZone: z.string().optional(),
  /** The live clock is off unless you turn it on. */
  showLocalTime: z.boolean().default(false),
});

export type Profile = z.infer<typeof schema>;

// Verified by the owner on 2026-11-22. Add email and other links only when provided.
const real: z.input<typeof schema> = {
  statement: 'I explore technology, build digital products, and turn ideas into practical *experiments*.',
  role: 'IT-Business student, Ajou University in Tashkent',
  currently: 'Building Doran, a Korean-learning app',
  about: [
    'IT-Business student at Ajou University in Tashkent. Interested in software development, AI, data, business and human behavior.',
    'Working across technology, business and creativity, and building things independently.',
  ],
  interests: [
    { title: 'Software development' },
    { title: 'AI' },
    { title: 'Data' },
    { title: 'Business' },
    { title: 'Human behavior' },
  ],
  links: [{ label: 'GitHub', href: 'https://github.com/kubrobe' }],
  city: 'Tashkent',
};

const placeholder: z.input<typeof schema> = {
  statement: '[PLACEHOLDER: one sentence about what you build, with one *emphasised* word.]',
  role: '[PLACEHOLDER role]',
  currently: '[PLACEHOLDER topic]',
  openTo: '[PLACEHOLDER]',
  about: ['[PLACEHOLDER about paragraph. Replace with your own words.]'],
  now: ['[PLACEHOLDER: what you are learning now]'],
  interests: [
    { title: '[PLACEHOLDER interest]', note: '[one-line note]' },
    { title: '[PLACEHOLDER interest]', note: '[one-line note]' },
  ],
  email: 'placeholder@example.com',
  links: [{ label: '[PLACEHOLDER link]', href: 'https://example.com' }],
  city: '[CITY]',
};

export const showPlaceholders = import.meta.env.KB_SHOW_PLACEHOLDERS === 'true';

export const profile: Profile = schema.parse(showPlaceholders ? { ...placeholder, ...real } : real);
export const profileIsPlaceholder = (field: keyof Profile) =>
  showPlaceholders && real[field] === undefined && placeholder[field] !== undefined;
