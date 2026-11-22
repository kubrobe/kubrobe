const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c);

/** Escapes text, then sets the first *word* in Instrument Serif italic. */
export const emphasize = (s: string) => esc(s).replace(/\*([^*]+)\*/, '<em class="kb-em">$1</em>');

/**
 * Splits text into words, each inside its own clipping mask, for the hero statement reveal.
 * Keeps the serif-italic *word*. Plain spaces stay between the words, so screen readers read it normally.
 */
export const revealWords = (s: string) => {
  let n = 0;
  const word = (w: string, em: boolean) => `<span class="kb-wd"><span style="--n:${n++}">${em ? `<em class="kb-em">${esc(w)}</em>` : esc(w)}</span></span>`;
  return s
    .split(/(\*[^*]+\*)/)
    .map((part) => {
      const em = part.length > 2 && part.startsWith('*') && part.endsWith('*');
      return (em ? part.slice(1, -1) : part)
        .split(/(\s+)/)
        .map((t) => (!t ? '' : /^\s+$/.test(t) ? ' ' : word(t, em)))
        .join('');
    })
    .join('');
};
