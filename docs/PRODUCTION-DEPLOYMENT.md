# Production deployment

Nothing has been deployed. These are the exact steps for the first release. No secrets are involved.

## Build facts

| Item | Value |
| --- | --- |
| Framework | Astro 7, static output |
| Node | 22.23.4 or newer (`.nvmrc`: 22) |
| Install | `npm ci` |
| Build | `npm run build` (runs `astro check`, then `astro build`) |
| Output directory | `dist` |
| Config | `vercel.json` (already sets all of the above, trailing slashes, headers, CSP, caching) |

## Environment variables

| Name | Required | Value |
| --- | --- | --- |
| `SITE_URL` | No | Overrides the canonical origin; default is `https://kubrobe.uz` (no trailing slash) |
| `KB_SHOW_PLACEHOLDERS` | No. **Must not be set** in production | `true` makes a noindex design-review build |
| `VERCEL_PROJECT_PRODUCTION_URL` and `VERCEL_GIT_COMMIT_SHA` | Set by Vercel | Fallback site URL; footer build id |

If `SITE_URL` is missing, `https://kubrobe.uz` is used. `vercel.json` redirects `www.kubrobe.uz` to the root with a permanent redirect.

## First release, in order

1. Resolve the owner items in `FINAL-CHECKLIST.md` section A (at minimum: domain, and confirm the GitHub repositories linked on the site are public).
2. Create an empty GitHub repository for KUBROBE (by the owner). Locally: `git remote add origin <url>` then `git push -u origin main`. The full history is preserved; the earlier bundle can restore it (`git clone kubrobe.bundle kubrobe`).
3. In Vercel: Add New Project, import the repository. Framework preset Astro. Leave the command fields at their defaults (they come from `vercel.json`). Add `SITE_URL` for Production (and Preview if wanted). Deploy.
4. Open the `*.vercel.app` URL and run the post-deploy checks below.
5. Domain: Project Settings, Domains, add the domain. Follow Vercel's DNS instructions: an apex domain gets an A record to the address Vercel shows; `www` gets a CNAME to `cname.vercel-dns.com` (use the exact values the dashboard shows). Pick one canonical host and let Vercel redirect the other. Wait for the certificate.
6. Set `SITE_URL` to the final domain and redeploy (canonical, sitemap and `og:*` bake in at build time).
7. Submit `https://your-domain/sitemap-index.xml` in Google Search Console (and Bing if wanted).

## Post-deploy checks

- `/robots.txt` allows crawling and lists the sitemap. `/sitemap-index.xml` lists `/`, `/about/`, `/work/`, `/work/skillswap/`, `/work/doran/`.
- View source on `/` and a case study: canonical, `og:url`, `og:image` use the real domain; the home page has `WebSite` JSON-LD.
- Response headers on `/`: `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`. `/_astro/*` returns `immutable` caching.
- A link-preview tool shows the KUBROBE card for `/` and `/work/skillswap/`.
- `/does-not-exist/` shows the custom 404.
- Lighthouse mobile and desktop on `/`, `/work/skillswap/`, `/work/doran/` (local results: 99 to 100).
- Safari, Firefox and a real phone: see `FINAL-CHECKLIST.md` section C.

## Notes

- The CSP allows inline scripts and styles because the theme script (which must run before first paint) and Astro's page scripts are inline. If a stricter CSP is wanted later, move them to hashed or external files.
- If a custom analytics or font host is ever added, extend the CSP first.
- Rollback: Vercel keeps every deployment; promote a previous one from the dashboard.
