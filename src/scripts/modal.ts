/**
 * Behaviour for every <dialog class="kb-modal"> (see Modal.astro). One listener set for the whole page.
 *
 *   open      click on [data-modal-open="id"], or a #id in the URL (deep link, also on hashchange)
 *   close     Close buttons, Esc, a click outside the panel; animated unless reduced motion is on
 *   swap      opening a modal from inside another replaces it without a second backdrop fade
 *   focus     moves to the Close button on open; returns to the element that opened it
 *   scroll    the page is locked by CSS (html:has(.kb-modal[open])); the panel body scrolls instead
 */
const SEL = 'dialog.kb-modal';
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const isModal = (el: unknown): el is HTMLDialogElement => el instanceof HTMLDialogElement && el.classList.contains('kb-modal');
const current = () => document.querySelector<HTMLDialogElement>(`${SEL}[open]`);

let opener: HTMLElement | null = null;
let downOnBackdrop = false;

function setHash(id: string | null) {
  try {
    const url = id ? `#${id}` : location.pathname + location.search;
    history.replaceState(history.state, '', url);
  } catch { /* file:// or sandboxed */ }
}

export function openModal(id: string, trigger?: HTMLElement | null): boolean {
  const d = document.getElementById(id);
  if (!isModal(d)) return false;
  const prev = current();
  if (prev === d) return true;
  if (prev) {
    prev.dataset['swap'] = '';
    prev.close();
    delete prev.dataset['closing'];
    d.dataset['swapIn'] = '';
  } else {
    opener = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
  }
  d.showModal();
  d.querySelector('.kb-modal-body')?.scrollTo(0, 0);
  d.querySelector<HTMLElement>('.kb-modal-close')?.focus({ preventScroll: true });
  setHash(id);
  return true;
}

export function closeModal(d: HTMLDialogElement) {
  if (!d.open || d.dataset['closing'] !== undefined) return;
  if (reduced()) { d.close(); return; }
  d.dataset['closing'] = '';
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    delete d.dataset['closing'];
    d.close();
  };
  d.querySelector('.kb-modal-panel')?.addEventListener('animationend', finish, { once: true });
  window.setTimeout(finish, 360);
}

function init() {
  // Give the no-JS links button semantics now that they open a dialog.
  document.querySelectorAll<HTMLElement>('a[data-modal-open], a[data-modal-close]').forEach((a) => a.setAttribute('role', 'button'));

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const t = e.target as Element;
    const openEl = t.closest?.<HTMLElement>('[data-modal-open]');
    if (openEl) {
      if (openModal(openEl.dataset['modalOpen'] ?? '', openEl)) e.preventDefault();
      return;
    }
    const closeEl = t.closest?.<HTMLElement>('[data-modal-close]');
    if (closeEl) {
      const d = closeEl.closest('dialog');
      if (isModal(d)) { e.preventDefault(); closeModal(d); }
      return;
    }
    // A click on the dialog box itself is a click outside the panel. Only when the press also began there,
    // so selecting text inside and releasing outside does not close it.
    if (isModal(t) && downOnBackdrop) closeModal(t);
  });
  document.addEventListener('pointerdown', (e) => { downOnBackdrop = isModal(e.target); });

  // Space activates the role="button" links, as it would a real button.
  document.addEventListener('keydown', (e) => {
    if (e.key !== ' ') return;
    const t = e.target as HTMLElement;
    if (t.matches?.('a[data-modal-open], a[data-modal-close]')) { e.preventDefault(); t.click(); }
  });

  // Esc: animate out instead of the instant native close.
  document.addEventListener('cancel', (e) => {
    if (!isModal(e.target)) return;
    e.preventDefault();
    closeModal(e.target);
  }, true);

  document.addEventListener('close', (e) => {
    const d = e.target;
    if (!isModal(d)) return;
    delete d.dataset['swapIn'];
    if (d.dataset['swap'] !== undefined) { delete d.dataset['swap']; return; }
    if (location.hash === `#${d.id}`) setHash(null);
    const o = opener;
    opener = null;
    if (o?.isConnected) o.focus({ preventScroll: true });
  }, true);

  const fromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id && isModal(document.getElementById(id))) openModal(id);
  };
  window.addEventListener('hashchange', fromHash);
  fromHash();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();
