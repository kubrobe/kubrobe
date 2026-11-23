import type { APIRoute } from 'astro';
import { showPlaceholders } from '@/data/profile';

// Generated so the sitemap line always follows the configured site origin.
export const GET: APIRoute = ({ site }) => {
  const hasDomain = Boolean(site && !['localhost', '127.0.0.1'].includes(site.hostname));
  const lines = ['User-agent: *', showPlaceholders ? 'Disallow: /' : 'Allow: /'];
  if (hasDomain && site && !showPlaceholders) lines.push('', `Sitemap: ${new URL('/sitemap-index.xml', site)}`);
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
