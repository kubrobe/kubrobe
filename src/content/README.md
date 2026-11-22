# Content

Each folder is a collection of **entries** (schemas in `src/content.config.ts`).

- `work/`: projects and case studies, numbers 101–199
- `writing/`: notes and articles, numbers 201–299
- `certifications/`: the credentials ledger, numbers 301–399

Files starting with `placeholder-` are design-review fixtures with `placeholder: true`.
They never appear in a normal build. Run `npm run dev:placeholders` to see them.
Delete them once real entries exist.

Personal details (statement, role, about, now, interests, email, links) live in
`src/data/profile.ts`. Anything left empty is hidden on the site.
