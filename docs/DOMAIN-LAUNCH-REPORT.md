# Domain integration: kubrobe.uz

Status: **repository ready; not deployed, DNS not configured, domain not verified live.** No Vercel project exists yet, there is no git remote, no `.vercel` folder and no Vercel CLI in the build environment, so nothing was connected, deployed or pushed.

## Inspected
`astro.config.mjs`, `package.json`, `vercel.json`, `.env.example`, `src/components/Seo.astro`, `src/pages/robots.txt.ts`, the sitemap integration, README and deployment docs, and every built page.

## Changed
- `astro.config.mjs`: `site` defaults to `https://kubrobe.uz` (optional `SITE_URL` override). Removed the localhost and `VERCEL_PROJECT_PRODUCTION_URL` fallbacks, which would have put a `*.vercel.app` address in canonicals.
- `vercel.json`: permanent redirect from `www.kubrobe.uz` to `https://kubrobe.uz/<path>` (host-matched, so it only applies once that host is attached to the project).
- `Seo.astro`, `robots.txt.ts`: comments updated; behaviour now always emits canonical, `og:url`, `og:image`, sitemap line.
- `.env.example`, README, `docs/PRODUCTION-DEPLOYMENT.md`, `docs/DECISIONS.md`, `docs/FINAL-CHECKLIST.md`.

## Results
| Check | Result |
|---|---|
| `astro check` | 0 errors, 0 warnings |
| `npm run build` | passes, 8 pages: `/`, `/about/`, `/work/`, `/work/doran/`, `/work/skillswap/`, `/writing/`, `/certifications/`, `404` |
| Canonical | one per indexable page, all `https://kubrobe.uz/...` with trailing slash (matches `trailingSlash: true`) |
| `og:url`, `og:image` | `https://kubrobe.uz/…`; `og.png` is 1200×630 |
| Sitemap | 5 URLs on kubrobe.uz; empty `/writing/` and `/certifications/` and 404 are excluded and `noindex` |
| `robots.txt` | `Allow: /` and `Sitemap: https://kubrobe.uz/sitemap-index.xml` |
| Internal links and assets | no broken href/src/poster; no localhost or vercel.app references |
| Placeholders | no placeholder email or `example.com` in the output |
| Secrets | none; the build needs no environment variables |
| Video section | hidden until the YouTube URL is set |

Not run: live checks of the domain (not deployed), Firefox/Safari.

## DNS records for Sayt.uz: UNVERIFIED against your Vercel project
I could not read Vercel's pages from here and there is no authenticated project, so these are the standard values Vercel commonly documents, not confirmed ones. The authoritative values appear in Vercel → Project → Settings → Domains after you add each domain; use those if they differ. Docs: https://vercel.com/docs/domains/set-up-custom-domain and https://vercel.com/docs/domains/working-with-dns

Required, if you keep Sayt.uz nameservers:
| Type | Host/Name | Value (standard, unverified) |
|---|---|---|
| A | `@` (kubrobe.uz) | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Optional: none needed. Vercel may show a project-specific CNAME or other values in the dashboard; prefer those. Do not change nameservers, MX or other existing records. If Sayt.uz shows existing `@` A or `www` records pointing elsewhere, replace only those two after checking what they serve, since a host cannot have a CNAME alongside other records. Propagation can take time; the domain is not live until Vercel shows "Valid Configuration" and the site loads over HTTPS.

## Manual actions
1. Create a GitHub repository and push (or deploy with the Vercel CLI); I have not done either.
2. Vercel: import project (framework Astro; `vercel.json` sets install/build/output), deploy, check the `*.vercel.app` URL.
3. Settings → Domains: add `kubrobe.uz` (set as primary) and `www.kubrobe.uz`.
4. Add the DNS records in Sayt.uz as Vercel displays them.
5. Wait for Vercel's verification and certificate, then test.

## Launch checklist
- ☐ Repo pushed, Vercel project deployed, build green
- ☐ Both domains added; records match what Vercel shows
- ☐ `https://kubrobe.uz` loads over HTTPS; `https://www.kubrobe.uz` redirects to the root (301)
- ☐ View source: canonical, `og:url`, `og:image` on kubrobe.uz; `/robots.txt` and `/sitemap-index.xml` load
- ☐ Submit the sitemap in Google Search Console; test an Open Graph preview
- ☐ Real contact details and links added (placeholders are hidden, not replaced)
- ☐ YouTube Unlisted URL set in `src/data/media.ts` when ready, and re-deploy
- ☐ Remaining items in `docs/FINAL-CHECKLIST.md`
