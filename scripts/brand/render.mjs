import { createRequire } from 'node:module'; const { chromium } = createRequire(import.meta.url)('playwright');
const dir = process.argv[2], out = process.argv[3];
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto('file://' + dir + '/og.html'); await p.evaluate(() => document.fonts.ready);
const w = await p.evaluate(() => document.getElementById('wm').getBoundingClientRect().width); console.log('wm width', w);
await p.screenshot({ path: out + '/og.png' });
for (const [f, s, n] of [['favicon.svg', 32, 'favicon-32.png'], ['touch.svg', 180, 'apple-touch-icon.png']]) {
  await p.setViewportSize({ width: s, height: s });
  await p.goto('file://' + dir + '/' + f); await p.screenshot({ path: out + '/' + n });
}
await b.close();
