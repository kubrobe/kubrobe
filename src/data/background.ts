/**
 * PERSONAL BACKGROUND — shown in the "Get to know me" window.
 *
 * Only verified facts. A section whose `body` is empty is not shown, so `goals` and `ambitions`
 * stay hidden until I write them. Keep private details (family, address, age) out of this file.
 */

export interface BackgroundSection {
  id: string;
  title: string;
  body: string[];
  /** Optional links to other windows (modal ids) or pages. */
  links?: { label: string; modal?: string; href?: string }[];
}

export const background: BackgroundSection[] = [
  {
    id: 'background',
    title: 'Background',
    body: ['I live in Tashkent, Uzbekistan, and work across technology, business and creativity, building things independently.'],
  },
  {
    id: 'academic',
    title: 'Academic journey',
    body: ['I study IT-Business at Ajou University in Tashkent. SkillSwap began there as a course project.'],
    links: [{ label: 'Education', modal: 'm-education' }],
  },
  {
    id: 'building',
    title: 'What I build',
    body: [
      'Digital products and practical experiments. In 2026 that meant SkillSwap, a skill exchange for students built in a team of three, and Doran, an offline Korean course for Android that I am building on my own.',
    ],
    links: [{ label: 'Selected work', href: '/work/' }, { label: 'Skills', modal: 'm-skills' }],
  },
  {
    id: 'learning',
    title: 'Languages and learning',
    body: ['I study several languages alongside my degree, and language learning is one of my steady interests.'],
    links: [{ label: 'Languages', modal: 'm-languages' }, { label: 'Doran', modal: 'm-project-doran' }],
  },
  {
    id: 'creative',
    title: 'Creative interests',
    body: ['Photography and visual storytelling, next to an interest in psychology, philosophy and how people behave.'],
    links: [{ label: 'Interests', modal: 'm-interests' }],
  },
  {
    id: 'now',
    title: 'Right now',
    body: ['Building Doran, a Korean-learning app.'],
  },
  // Written by me when ready; hidden while empty.
  { id: 'goals', title: 'Current goals', body: [] },
  { id: 'ambitions', title: 'Future ambitions', body: [] },
];

export const backgroundIntro = {
  title: 'Get to know me',
  lede: 'The person behind KUBROBE, in a few short parts.',
};
