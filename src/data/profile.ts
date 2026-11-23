/**
 * The person behind KUBROBE. One typed source for every personal fact on the site:
 * the home page, About, the footer, metadata and Person JSON-LD all read from here.
 *
 * Approved by the owner on 2026-11-23 (V3 master brief). Rules:
 *  - Only verified facts. Leave a field empty rather than guess; empty fields are hidden.
 *  - `age` is a plain number on purpose. Update it by hand: no birth date is stored.
 *  - Mark one word in `statement` with *asterisks* to set it in Instrument Serif italic.
 *
 * Contact channels live in `src/data/site.ts`.
 */

export interface Interest {
  title: string;
  /** Optional one-line note. Only facts, e.g. where the interest shows up in the work. */
  note?: string;
  /** Optional link to evidence on this site. */
  href?: string;
}

export interface InterestGroup {
  label: string;
  items: Interest[];
}

export interface ToolUse {
  /** Tools as named in the project repositories. */
  tools: string[];
  /** Where they were used. Project names link to their case studies. */
  where: { label: string; href?: string }[];
}

export interface NowItem {
  text: string;
  href?: string;
  /** Status glyph shared with work entries. */
  status?: 'in-progress' | 'complete' | 'planned';
}

export const profile = {
  name: 'Najmiddin Kurganov',
  givenName: 'Najmiddin',
  familyName: 'Kurganov',
  brand: 'KUBROBE',
  /** Update by hand. */
  age: 19 as number | undefined,

  location: {
    hometown: 'Bekobod',
    region: 'Tashkent Region',
    country: 'Uzbekistan',
    studyCity: 'Tashkent',
    /** Approved wording, verbatim. */
    display: 'From Bekobod, studying in Tashkent',
  },

  education: {
    institution: 'Ajou University in Tashkent',
    degree: "Bachelor's degree",
    major: 'IT-Business',
    year: 3 as number | undefined,
    expectedGraduation: 'May 2028',
  },

  /** Approved primary statement. */
  statement: 'A curious mind, building across *disciplines*.',
  /** Approved supporting introduction, verbatim. */
  intro:
    "I'm Najmiddin Kurganov, an IT-Business student interested in technology, business and creative problem-solving. I explore ideas, build projects and document what I learn along the way.",

  /**
   * About page, after the introduction. Facts only, written plainly.
   * Owner: rewrite these in your own words whenever you like.
   */
  about: [
    "I'm 19, from Bekobod in Tashkent Region, and in my third year of a bachelor's degree in IT-Business at Ajou University in Tashkent. I expect to graduate in May 2028.",
    'So far that has meant two projects: SkillSwap, a skill-exchange platform built with a university team, and Doran, a Korean-learning app I am building on my own. KUBROBE is where the work is filed, with what is finished kept apart from what is still in progress.',
  ],

  /** What is happening now. Verified activities only. */
  now: [
    { text: 'Building Doran, an offline Korean-learning app for Android, on my own.', href: '/work/doran/', status: 'in-progress' },
    { text: 'Working on SkillSwap, a peer-to-peer skill exchange, across its website and Android app with a university team.', href: '/work/skillswap/', status: 'in-progress' },
    { text: 'Third year of IT-Business at Ajou University in Tashkent.', status: 'in-progress' },
  ] as NowItem[],

  /** Grouped so they read as directions, not tags. Notes point to evidence only. */
  interests: [
    {
      label: 'Building',
      items: [
        { title: 'Software development', note: 'Android (Kotlin, Jetpack Compose) and the web', href: '/work/' },
        { title: 'Artificial intelligence', note: 'Doran scores pronunciation with on-device speech recognition', href: '/work/doran/' },
        { title: 'Product and application development', note: 'SkillSwap and Doran', href: '/work/' },
      ],
    },
    {
      label: 'Between fields',
      items: [
        { title: 'Business and technology', note: 'The subject of my degree, IT-Business' },
        { title: 'Language learning', note: 'Doran is an app for learning Korean', href: '/work/doran/' },
      ],
    },
    {
      label: 'Away from the screen',
      items: [{ title: 'Photography' }, { title: 'Badminton' }],
    },
  ] as InterestGroup[],

  /** Tools that appear in the project repositories, and where. Not a proficiency rating. */
  tools: [
    { tools: ['Kotlin', 'Jetpack Compose'], where: [{ label: 'Doran', href: '/work/doran/' }, { label: 'SkillSwap Android', href: '/work/skillswap/' }] },
    { tools: ['HTML', 'CSS', 'JavaScript'], where: [{ label: 'SkillSwap website', href: '/work/skillswap/' }] },
    { tools: ['Python'], where: [{ label: 'Doran course and audio tooling', href: '/work/doran/' }] },
    { tools: ['sherpa-onnx'], where: [{ label: 'Doran offline speech recognition', href: '/work/doran/' }] },
    { tools: ['GitHub Actions'], where: [{ label: 'Doran builds', href: '/work/doran/' }] },
  ] as ToolUse[],

  /** IANA zone, used for the optional local clock. */
  timeZone: 'Asia/Tashkent',
  /** The live clock is off unless turned on. */
  showLocalTime: false,
};

export type Profile = typeof profile;

/** "Third year" style label from the year number. */
export const yearLabel = (n: number | undefined) =>
  n ? `${['First', 'Second', 'Third', 'Fourth', 'Fifth'][n - 1] ?? `Year ${n}`} year` : undefined;

/** Placeholder fixtures (content collections) are shown only in the design-review build. */
export const showPlaceholders = import.meta.env.KB_SHOW_PLACEHOLDERS === 'true';
