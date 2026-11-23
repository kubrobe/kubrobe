/**
 * INTERESTS — shown on the home page (titles only) and in the Interests window (full profiles).
 *
 * `summary` says what the interest covers (drafted neutrally from the topic: rewrite it in your own words). `shows` lists verified places where it already shows up in
 * my work. `why`, `now` and `reading` are personal and are left for me to write: anything left
 * undefined is simply not shown.
 */

export interface Interest {
  id: string;
  title: string;
  /** Two or three words for the compact chip on the home page. */
  short?: string;
  summary: string;
  /** In my own words: why this interests me. */
  why?: string;
  /** What I am doing about it right now. */
  now?: string[];
  /** Verified places where it shows up in my work. */
  shows?: { text: string; project?: string }[];
  /** Books, courses, people or sites worth following. */
  reading?: { title: string; href?: string; note?: string }[];
}

export const interests: Interest[] = [
  {
    id: 'technology',
    title: 'Technology',
    summary: 'The tools themselves, and what they make possible for one person or a small team.',
    shows: [{ text: 'Two Android apps built in 2026, one in a team of three and one solo.' }],
  },
  {
    id: 'software',
    title: 'Software development',
    summary: 'Building products end to end: architecture, interface, testing and release.',
    shows: [
      { text: 'SkillSwap: the Android app and the website front end.', project: 'skillswap' },
      { text: 'Doran: an offline Korean course for Android, built solo.', project: 'doran' },
    ],
  },
  {
    id: 'ai',
    title: 'Artificial intelligence',
    short: 'AI',
    summary: 'Using AI as a working tool, and putting models to work inside products.',
    shows: [
      { text: 'Doran runs a speech recognition model on the phone to score pronunciation.', project: 'doran' },
      { text: 'Both apps were built largely in AI-assisted sessions.' },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    summary: 'Turning records into evidence: what happened, and whether an idea works.',
    shows: [{ text: 'SkillSwap’s credits are a ledger: every balance is the sum of traceable rows.', project: 'skillswap' }],
  },
  {
    id: 'business',
    title: 'Business and entrepreneurship',
    short: 'Business',
    summary: 'How products find the people who need them, and how ideas become something people use.',
    shows: [{ text: 'SkillSwap ends with a proposed campus pilot and the numbers it would measure.', project: 'skillswap' }],
  },
  {
    id: 'behavior',
    title: 'Human behaviour and psychology',
    short: 'Psychology',
    summary: 'Why people decide, learn and keep habits the way they do.',
    shows: [{ text: 'Doran’s learning loop: daily goal, streak, hearts and XP.', project: 'doran' }],
  },
  {
    id: 'philosophy',
    title: 'Philosophy',
    summary: 'Asking what is worth building, and why.',
  },
  {
    id: 'photography',
    title: 'Photography and visual storytelling',
    short: 'Photography',
    summary: 'Framing, light and sequence: telling something with pictures instead of words.',
  },
  {
    id: 'languages',
    title: 'Language learning',
    short: 'Languages',
    summary: 'Learning languages, and building tools that help others learn them.',
    shows: [{ text: 'Doran teaches Korean from Hangul to everyday exchange-student life.', project: 'doran' }],
  },
];

export const interestsIntro = {
  title: 'Interests',
  lede: 'What I keep coming back to, and where it already shows up in my work.',
};
