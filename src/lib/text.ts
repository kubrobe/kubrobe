const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c);

/** Escapes text, then sets the first *word* in Instrument Serif italic. */
export const emphasize = (s: string) => esc(s).replace(/\*([^*]+)\*/, '<em class="kb-em">$1</em>');
