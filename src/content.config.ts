import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Every item on the site is an "entry": it has a catalogue number, a type and a status.
 * Status is shared across collections and always rendered as a glyph:
 *   complete ●  in-progress ◐  planned ○
 *
 * `placeholder: true` marks design-review fixtures. They are excluded from every build
 * unless KB_SHOW_PLACEHOLDERS=true, and they are visibly labelled when shown.
 */
const status = z.enum(['complete', 'in-progress', 'planned']);

const base = {
  /** Catalogue number inside the collection's range, e.g. 101 for KB—101. */
  number: z.number().int().min(0).max(999),
  title: z.string().min(1),
  status,
  draft: z.boolean().default(false),
  placeholder: z.boolean().default(false),
};

const link = z.object({ label: z.string().min(1), href: z.url() });

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: ({ image }) => z.object({
    ...base,
    summary: z.string().min(1),
    type: z.enum(['case-study', 'app', 'experiment', 'tool', 'site', 'study']),
    year: z.number().int().min(1990).max(2100),
    featured: z.boolean().default(false),
    order: z.number().int().default(0),
    role: z.string().optional(),
    stack: z.array(z.string()).default([]),
    timeline: z.string().optional(),
    links: z.array(link).default([]),
    /**
     * Real screenshots only. Each needs alt text and a source note; never mock-ups
     * presented as a working product.
     */
    gallery: z
      .array(z.object({ src: image(), alt: z.string().min(1), caption: z.string().optional(), group: z.string().optional() }))
      .default([]),
    /** Where the screenshots come from, shown under the gallery. */
    /** How screens are composed on the home page and case study. `devices` frames them as phones. */
    presentation: z.enum(['board', 'devices', 'exhibit']).default('board'),
    gallerySource: z.string().optional(),
    /** Key into `videos` in src/data/media.ts. The section renders only when that entry has a real URL. */
    video: z.string().optional(),
    /** Verified headline numbers shown above the write-up. Each needs a source in `note`. */
    facts: z.array(z.object({ value: z.string(), label: z.string(), note: z.string().optional() })).default([]),
    /**
     * The "Explore project" window: a detailed preview of the case study. Every field is optional and is
     * hidden when empty. Write only what the case study (or the repository) can back up.
     */
    detail: z.object({
      overview: z.string().optional(),
      problem: z.string().optional(),
      solution: z.string().optional(),
      audience: z.string().optional(),
      responsibilities: z.array(z.string()).default([]),
      process: z.string().optional(),
      features: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
      decisions: z.array(z.string()).default([]),
      challenges: z.array(z.string()).default([]),
      /** Verified outcomes only. No invented users or metrics. */
      results: z.string().optional(),
      /** Slugs of other work entries. */
      related: z.array(z.string()).default([]),
    }).optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    ...base,
    status: status.default('complete'),
    description: z.string().min(1),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const certifications = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/certifications' }),
  schema: ({ image }) => z.object({
    /** Optional scan or image of the certificate (put the file in src/assets/certifications/). Viewable full size. */
    image: image().optional(),
    ...base,
    issuer: z.string().min(1),
    /** Date earned (complete) or started (in-progress). Leave out if unknown. */
    date: z.coerce.date().optional(),
    /** Real progress only, 0–100. Leave out rather than guess. */
    progress: z.number().min(0).max(100).optional(),
    credentialUrl: z.url().optional(),
    /** Credential or certificate ID, exactly as printed. */
    credentialId: z.string().optional(),
    note: z.string().optional(),
    /** Skills the certificate covers, shown as tags. */
    skills: z.array(z.string()).default([]),
  }),
});

export const collections = { work, writing, certifications };
