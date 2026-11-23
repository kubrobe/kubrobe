/**
 * EDUCATION — shown in the Education window.
 * Leave a field undefined when it is not confirmed; it is then not shown. Never guess dates or grades.
 */

export interface Course {
  name: string;
  note?: string;
  /** Slug of a related project in src/content/work. */
  project?: string;
}

export interface EducationEntry {
  institution: string;
  location?: string;
  programme: string;
  /** e.g. "Bachelor of Science". Unknown for now. */
  degree?: string | undefined;
  major?: string | undefined;
  /** e.g. "2024 – 2028 (expected)". Unknown for now. */
  period?: string | undefined;
  status: 'current' | 'completed';
  summary?: string;
  coursework: Course[];
  projects: Course[];
  /** Exchange or international study plans, only if you choose to share them. */
  international?: string | undefined;
}

export const education: EducationEntry[] = [
  {
    institution: 'Ajou University in Tashkent',
    location: 'Tashkent, Uzbekistan',
    programme: 'IT-Business',
    degree: undefined, // e.g. 'Bachelor’s degree'
    period: undefined, // e.g. '2024 – present'
    status: 'current',
    summary: 'A programme that sits between technology and business, which is also where most of my own projects sit.',
    coursework: [
      { name: 'Big Data', note: 'SkillSwap began here, as a database-backed website for the course.', project: 'skillswap' },
      { name: 'IT Project Management', note: 'Includes a team capstone project. Its write-up is not published yet.' },
    ],
    projects: [
      { name: 'SkillSwap', note: 'A course project that the team extended for a university hackathon.', project: 'skillswap' },
    ],
    international: undefined,
  },
];

export const educationIntro = {
  title: 'Education',
  lede: 'Where I study, what I study, and the projects that came out of it.',
};
