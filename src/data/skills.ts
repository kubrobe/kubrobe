/**
 * SKILLS — shown in the Skills window.
 *
 * Honesty rules for this file:
 *  - `using` means there is real work behind it, named in `evidence`.
 *  - `learning` means it is being studied or explored, with no shipped work to point at yet.
 *  - No proficiency levels or years unless you add them yourself in `experience`.
 *  - Team work is credited to the person who did it. In SkillSwap the backend (server, database, API)
 *    was the team leader's, so Node.js, Express and PostgreSQL are not listed as my skills.
 *
 * To add a skill, add an object to `skills`. To add a category, add it to `categories` first.
 */

export type SkillStatus = 'using' | 'learning';

export interface Skill {
  name: string;
  category: CategoryId;
  description: string;
  status: SkillStatus;
  /** Optional, your own words, e.g. "Since 2025" or "Two shipped apps". */
  experience?: string;
  /** Slugs of projects in src/content/work where this skill was used. */
  projects?: string[];
}

export const categories = [
  { id: 'programming', label: 'Programming', note: 'Languages I write code in.' },
  { id: 'mobile', label: 'Android development', note: 'Native apps, built with the current Android toolkit.' },
  { id: 'web', label: 'Web development', note: 'Front ends that work on a phone first.' },
  { id: 'engineering', label: 'Engineering practice', note: 'Testing, automation and version control.' },
  { id: 'ai', label: 'AI and productivity tools', note: 'Tools that change how fast one person can build.' },
  { id: 'data', label: 'Data and databases', note: 'Studied in my degree.' },
  { id: 'business', label: 'Business and management', note: 'The business half of IT-Business.' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];

export const statusLabel: Record<SkillStatus, string> = { using: 'Using in projects', learning: 'Learning' };

export const skills: Skill[] = [
  // Programming
  { name: 'Kotlin', category: 'programming', status: 'using', description: 'The language of both Android apps: SkillSwap’s client and Doran.', projects: ['skillswap', 'doran'] },
  { name: 'JavaScript', category: 'programming', status: 'using', description: 'Plain JavaScript for the SkillSwap website front end, with no framework.', projects: ['skillswap'] },
  { name: 'Python', category: 'programming', status: 'using', description: 'Tooling scripts: Doran’s course content is compiled to JSON and its audio is generated and checked by Python scripts.', projects: ['doran'] },

  // Android
  { name: 'Jetpack Compose', category: 'mobile', status: 'using', description: 'Every screen in SkillSwap’s app and in Doran, driven by ViewModel state.', projects: ['skillswap', 'doran'] },
  { name: 'App architecture (MVVM)', category: 'mobile', status: 'using', description: 'Screens talk to a ViewModel, the ViewModel to one repository, and only the repository touches data.', projects: ['skillswap'] },
  { name: 'Room', category: 'mobile', status: 'using', description: 'A local read cache in SkillSwap, refreshed from the server in one transaction so screens never see half-updated data.', projects: ['skillswap'] },
  { name: 'Android Keystore', category: 'mobile', status: 'using', description: 'SkillSwap’s session token is encrypted (AES-GCM) with a key held in the Keystore.', projects: ['skillswap'] },
  { name: 'WebRTC on Android', category: 'mobile', status: 'using', description: 'Video lessons in SkillSwap, driven by a small state machine and a foreground service.', projects: ['skillswap'] },
  { name: 'On-device speech recognition', category: 'mobile', status: 'using', description: 'Doran scores pronunciation offline with a Korean sherpa-onnx model running on the phone.', projects: ['doran'] },

  // Web
  { name: 'HTML and CSS', category: 'web', status: 'using', description: 'The SkillSwap website: mobile-first pages with self-hosted fonts and icons, so a strict content security policy is possible.', projects: ['skillswap'] },

  // Engineering practice
  { name: 'Unit testing', category: 'engineering', status: 'using', description: 'Doran generates every lesson with 40 random seeds in tests; SkillSwap’s app has unit tests on its core logic.', projects: ['doran', 'skillswap'] },
  { name: 'CI with GitHub Actions', category: 'engineering', status: 'using', description: 'Doran plays complete lessons on Android 14 and Android 8 emulators in CI; SkillSwap’s app is built there.', projects: ['doran', 'skillswap'] },
  { name: 'Git and GitHub', category: 'engineering', status: 'using', description: 'Every project lives in a public history on github.com/kubrobe.', projects: ['skillswap', 'doran'] },

  // AI
  { name: 'AI-assisted development', category: 'ai', status: 'using', description: 'Much of SkillSwap and Doran was written in AI-assisted sessions, and those commits are attributed in the history.', projects: ['skillswap', 'doran'] },

  // Learning
  { name: 'Databases and big data', category: 'data', status: 'learning', description: 'A Big Data course is where SkillSwap began, as a database-backed website.', projects: ['skillswap'] },
  { name: 'Data analysis', category: 'data', status: 'learning', description: 'An interest I am developing through my studies.' },
  { name: 'IT project management', category: 'business', status: 'learning', description: 'Studied as a course, with a team capstone project that is not yet written up here.' },
  { name: 'Business fundamentals', category: 'business', status: 'learning', description: 'Part of the IT-Business programme at Ajou University in Tashkent.' },
];

export const skillsIntro = {
  title: 'Skills',
  lede: 'What I use in real projects, and what I am still learning. Each skill points to the work behind it.',
};
