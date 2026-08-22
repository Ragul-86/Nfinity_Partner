/**
 * pixel.js — safe Meta Pixel event helpers.
 *
 * All calls are no-ops if window.fbq is not defined (ad blocker, slow load).
 * Never throws. Never initialises the Pixel (init lives only in index.html).
 */

/**
 * Fire a standard Meta Pixel event.
 * @param {string} event   — e.g. 'Lead', 'Contact', 'PageView'
 * @param {object} [params] — optional extra parameters
 */
export function pixelTrack(event, params) {
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('track', event, params);
    }
  } catch (_) {
    // silently swallow — ad blockers can throw on fbq access
  }
}

/** Shorthand for fbq('track', 'PageView') */
export function pixelPageView() {
  pixelTrack('PageView');
}
