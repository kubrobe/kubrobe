// Reports gzipped JS shipped by each built HTML page and fails if the homepage exceeds 50 KB.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const dist = 'dist';
const BUDGET = 50 * 1024;
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const pages = walk(dist).filter((f) => f.endsWith('.html'));
let fail = false;
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
  const external = [...html.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)].map((m) => readFileSync(join(dist, m[1]), 'utf8')).join('\n');
  const total = gzipSync(inline + external).length;
  const isHome = page === join(dist, 'index.html');
  if (isHome && total > BUDGET) fail = true;
  console.log(`${(total / 1024).toFixed(2).padStart(7)} KB gz  ${page}${isHome ? `  (budget ${BUDGET / 1024} KB)` : ''}`);
}
process.exit(fail ? 1 : 0);
