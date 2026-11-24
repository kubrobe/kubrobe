import { getCounts } from '@/lib/entries';
import { profile } from '@/data/profile';
import { contact } from '@/data/site';

/**
 * Primary destinations. Contact is a page and also closes every other page (footer).
 * A destination with no real entries is hidden rather than shown empty.
 */
export async function getNav() {
  const counts = await getCounts();
  const hasAbout = Boolean(profile.intro || profile.about.length || profile.now.length);
  return [
    { href: '/work/', label: 'Work', count: counts.work, show: counts.work > 0 },
    { href: '/writing/', label: 'Writing', count: counts.writing, show: counts.writing > 0 },
    { href: '/certifications/', label: 'Certifications', short: 'Certs', count: counts.certifications, show: counts.certifications > 0 },
    { href: '/about/', label: 'About', show: hasAbout },
    { href: '/contact/', label: 'Contact', show: contact.channels.length > 0 },
  ].filter((n) => n.show);
}
export type NavItem = Awaited<ReturnType<typeof getNav>>[number];
