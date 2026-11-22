/**
 * Build-time 1-bit figure for an entry: an ordered-dither "O" study seeded by the
 * entry number. It is generated art keyed to the catalogue ID, never a stand-in for a
 * real project image. Output is a single SVG path of horizontal runs, so it inherits
 * the theme's ink colour through currentColor and costs no client JavaScript.
 */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

export const FIG_W = 48;
export const FIG_H = 36;

export function ditherPath(seed: number, w = FIG_W, h = FIG_H): string {
  const rnd = (n: number) => {
    const x = Math.sin(seed * 9301 + n * 49297) * 233280;
    return x - Math.floor(x);
  };
  const cx = w * (0.32 + rnd(1) * 0.36);
  const cy = h * (0.32 + rnd(2) * 0.36);
  const r = Math.min(w, h) * (0.24 + rnd(3) * 0.18);
  const ring = r * (0.3 + rnd(4) * 0.3);
  const ang = rnd(5) * Math.PI * 2;
  let d = '';
  for (let y = 0; y < h; y++) {
    let run = -1;
    for (let x = 0; x <= w; x++) {
      let on = false;
      if (x < w) {
        const dist = Math.hypot(x - cx, y - cy);
        const band = 1 - Math.min(Math.abs(dist - r) / ring, 1);
        const sweep = 0.5 + 0.5 * Math.cos(Math.atan2(y - cy, x - cx) - ang);
        const v = band * (0.3 + 0.7 * sweep);
        on = v * 16 > (BAYER[(y % 4) * 4 + (x % 4)] ?? 0);
      }
      if (on && run < 0) run = x;
      if (!on && run >= 0) {
        d += `M${run} ${y}h${x - run}v1h-${x - run}z`;
        run = -1;
      }
    }
  }
  return d;
}
