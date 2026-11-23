/**
 * Site-level metadata: the home page title, description and social-card wording.
 * Copy approved by the owner on 2026-11-23 (V3 master brief). English only for now;
 * translations arrive with the locale dictionaries.
 */
export const site = {
  brand: 'KUBROBE',
  /** Home <title>. Other pages use "Page · KUBROBE". */
  homeTitle: 'KUBROBE · Najmiddin Kurganov',
  /** Home meta and social description: the approved supporting introduction, verbatim. */
  homeDescription:
    "I'm Najmiddin Kurganov, an IT-Business student interested in technology, business and creative problem-solving. I explore ideas, build projects and document what I learn along the way.",
  /** Describes public/og.png (regenerate with scripts/brand when the wording changes). */
  ogImageAlt: 'KUBROBE wordmark in off-white on black, with the line “A curious mind, building across disciplines.”',
} as const;
