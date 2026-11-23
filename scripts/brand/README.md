# Brand assets

Generates `public/favicon.svg`, `public/favicon-32.png`, `public/apple-touch-icon.png` and `public/og.png`
from the Geist variable font at the wordmark weight (640). One palette: `#080808` surface, `#F2F2F0` ink,
`#63B393` jade (one short rule on the social image). Typography only, no illustration.

These are one-off developer tools, not part of the build, and they add no dependency to the site.

1. `favicon.svg` and `touch.svg` hold the K glyph as an outlined path (no font needed to display them).
   To regenerate the outline: `pip install fonttools brotli`, then
   `python3 glyphs.py ../../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2 640 K 0`
   and paste the `d` path into both SVGs.
2. `og.html` is the 1200×630 social card. Edit its wording here and in `src/data/site.ts` (`ogImageAlt`) together.
3. Render the PNGs with a local Playwright install (`npm i -g playwright` or any copy on the machine):
   `node render.mjs "$PWD" "$PWD/out"`, then copy `out/*.png` and `favicon.svg` into `public/`.
