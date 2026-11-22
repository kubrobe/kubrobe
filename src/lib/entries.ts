import { getCollection, type CollectionEntry } from 'astro:content';
import { showPlaceholders } from '@/data/profile';

export type Status = 'complete' | 'in-progress' | 'planned';
export type Kind = 'work' | 'writing' | 'certifications';

export const glyph: Record<Status, string> = {
  complete: '●',
  'in-progress': '◐',
  planned: '○',
};

const labels: Record<Kind, Record<Status, string>> = {
  work: { complete: 'Shipped', 'in-progress': 'Ongoing', planned: 'Planned' },
  writing: { complete: 'Published', 'in-progress': 'Drafting', planned: 'Planned' },
  certifications: { complete: 'Completed', 'in-progress': 'In progress', planned: 'Planned' },
};
export const statusLabel = (kind: Kind, s: Status) => labels[kind][s];

export const workTypeLabel: Record<CollectionEntry<'work'>['data']['type'], string> = {
  'case-study': 'Case study',
  experiment: 'Experiment',
  tool: 'Tool',
  site: 'Site',
  study: 'Study',
};

/** KB—101 style catalogue code. Em dash is part of the identity. */
export const code = (n: number) => `KB—${String(n).padStart(3, '0')}`;

const visible = <T extends { data: { draft: boolean; placeholder: boolean } }>(e: T) =>
  !e.data.draft && (showPlaceholders || !e.data.placeholder);

export async function getWork() {
  const all = (await getCollection('work')).filter(visible);
  return all.sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year || a.data.number - b.data.number);
}

export async function getWriting() {
  const all = (await getCollection('writing')).filter(visible);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getCertifications() {
  const order: Record<Status, number> = { 'in-progress': 0, complete: 1, planned: 2 };
  const all = (await getCollection('certifications')).filter(visible);
  return all.sort((a, b) => order[a.data.status] - order[b.data.status] || a.data.number - b.data.number);
}

export async function getCounts() {
  const [work, writing, certifications] = await Promise.all([getWork(), getWriting(), getCertifications()]);
  return { work: work.length, writing: writing.length, certifications: certifications.length };
}

/** Most recent real date across entries, or undefined. Never the build time. */
export async function getLastUpdated() {
  const [writing, certs] = await Promise.all([getWriting(), getCertifications()]);
  const dates = [
    ...writing.flatMap((e) => [e.data.date, e.data.updated]),
    ...certs.map((e) => e.data.date),
  ].filter((d): d is Date => d instanceof Date);
  if (!dates.length) return undefined;
  return new Date(Math.max(...dates.map((d) => d.valueOf())));
}

export const readingMinutes = (body: string | undefined) =>
  Math.max(1, Math.round((body ?? '').trim().split(/\s+/).filter(Boolean).length / 225));

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
export const pad = (n: number, w = 2) => String(n).padStart(w, '0');
