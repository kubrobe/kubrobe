import { showPlaceholders } from '@/data/profile';

/**
 * LANGUAGES — shown in the "Languages I know" window.
 *
 * Every field except `name` and `relation` is optional, and anything left out is simply not shown.
 * Only write what you can stand behind: a level you have been assessed at, a certificate you hold,
 * or your own honest description. Never a guessed score.
 *
 * To add a language, copy the commented example at the bottom into `languages` and fill it in.
 */

export type Ability = 'speaking' | 'listening' | 'reading' | 'writing';

export interface AbilityLevel {
  /** Your own words or a framework level, e.g. "B1", "Conversational", "Comfortable with menus and signs". */
  level: string;
  /**
   * Optional bar, 0–100. Only from a real assessment or a scale you define in `scale` below.
   * Leave out rather than estimate.
   */
  value?: number;
  note?: string;
}

export interface LanguageProfile {
  name: string;
  /** The language's own name for itself, e.g. "한국어". */
  nativeName?: string;
  /** How the language sits in your life. This is not a proficiency claim. */
  relation: 'native' | 'everyday' | 'studying' | 'paused';
  /** Overall level, in your own words or a framework (CEFR, TOPIK, IELTS…). */
  proficiency?: string;
  /** What the `value` bars mean, e.g. "CEFR A1 = 0, C2 = 100". Required if any bar is shown. */
  scale?: string;
  abilities?: Partial<Record<Ability, AbilityLevel>>;
  certificates?: { name: string; issuer?: string; date?: string; url?: string }[];
  /** Short dated notes, oldest first, e.g. "2024 · Started with Hangul". */
  history?: string[];
  goals?: string[];
  notes?: string;
  /** Slug of a related project in src/content/work, e.g. "doran". */
  relatedProject?: string;
  /** Design-review fixture. Never shown in a production build. */
  placeholder?: boolean;
}

export const relationLabel: Record<LanguageProfile['relation'], string> = {
  native: 'Native',
  everyday: 'Everyday use',
  studying: 'Studying',
  paused: 'Paused',
};

export const abilityOrder: Ability[] = ['speaking', 'listening', 'reading', 'writing'];

/** Verified, owner-supplied profiles. Empty until the owner provides names and levels. */
const real: LanguageProfile[] = [
  // {
  //   name: 'Korean',
  //   nativeName: '한국어',
  //   relation: 'studying',
  //   proficiency: 'TOPIK I, level 2',
  //   abilities: { reading: { level: 'Reads Hangul fluently' }, speaking: { level: 'Everyday phrases' } },
  //   certificates: [{ name: 'TOPIK I', issuer: 'NIIED', date: '2026', url: 'https://…' }],
  //   history: ['2025 · Started with Hangul'],
  //   goals: ['Hold a 10-minute conversation without switching to English'],
  //   relatedProject: 'doran',
  // },
];

/** Shown only in the placeholder build (KB_SHOW_PLACEHOLDERS=true) so the layout can be reviewed. */
const fixtures: LanguageProfile[] = [
  {
    name: '[Language A]',
    nativeName: '[native name]',
    relation: 'native',
    proficiency: '[overall level]',
    notes: '[One line about this language.]',
    placeholder: true,
  },
  {
    name: '[Language B]',
    relation: 'studying',
    proficiency: '[e.g. B1, self-assessed]',
    scale: '[What the bars mean, e.g. CEFR A1 = 0, C2 = 100]',
    abilities: {
      speaking: { level: '[level]', value: 45 },
      listening: { level: '[level]', value: 55 },
      reading: { level: '[level]', value: 60 },
      writing: { level: '[level]', value: 35 },
    },
    certificates: [{ name: '[Certificate]', issuer: '[Issuer]', date: '[Year]' }],
    history: ['[Year] · [How it started]', '[Year] · [A milestone]'],
    goals: ['[A concrete goal]'],
    relatedProject: 'doran',
    placeholder: true,
  },
];

export const languages: LanguageProfile[] = showPlaceholders ? [...real, ...fixtures] : real;

/** Verified context shown even before individual profiles exist. */
export const languagesIntro = {
  title: 'Languages I know',
  lede: 'Explore the languages I use, study, and continue developing.',
  /** Verified: the owner studies several languages (names and levels not yet supplied). */
  summary: 'I study several languages alongside my degree. Language learning is also one of my interests, and Doran, the Korean course I am building, lives close to it.',
};
