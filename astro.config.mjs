// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync } from 'node:fs';

// Sections with no published entries stay reachable but are not advertised in the sitemap.
/** @param {string} dir */
const published = (dir) => {
  try {
    return readdirSync(`src/content/${dir}`).filter((f) => {
      const t = readFileSync(`src/content/${dir}/${f}`, 'utf8');
      return !/^draft:\s*true/m.test(t) && !/^placeholder:\s*true/m.test(t);
    }).length;
  } catch { return 0; }
};
const empty = ['writing', 'certifications'].filter((d) => published(d) === 0);

// The public URL is not decided yet. Set SITE_URL when a domain exists;
// on Vercel the production URL is picked up automatically.
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321');

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !/\/404\/?$/.test(page) && !empty.some((d) => new URL(page).pathname.startsWith(`/${d}`)) })],
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: 'auto' },
});
