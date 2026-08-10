import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

/**
 * StickyCTA — scroll-triggered fixed bottom bar.
 *
 * Rules:
 *  • Hidden on first load; appears after user scrolls past SCROLL_THRESHOLD.
 *  • Slides up + fades in on reveal; reverses when user scrolls back to top.
 *  • × button permanently hides it for the current browser session
 *    (stored in sessionStorage — cleared when tab is closed).
 *  • Rendered ONLY inside the Home page component — never in global layout.
 *  • Uses a passive scroll listener cleaned up on unmount.
 *  • pointer-events: none when invisible → no click-blocking over page content.
 */

const SCROLL_THRESHOLD = 400; // px — threshold to show the CTA
const SESSION_KEY = 'nfinity_sticky_cta_dismissed';

export function StickyCTA() {
  // Lazy-initialize from sessionStorage so dismissed state survives page
  // navigations within the same tab session.
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Evaluate immediately — handles restored scroll positions on back navigation.
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    sessionStorage.setItem(SESSION_KEY, '1');
  }, []);

  // Once dismissed, remove from DOM entirely — zero overhead.
  if (dismissed) return null;

  return (
    <div
      aria-hidden={!visible}
      style={{
        position:      'fixed',
        bottom:        '1.5rem',
        left:          '50%',
        width:         'calc(100% - 2rem)',
        maxWidth:      '42rem',
        // Combine centering and slide with a single transform so Tailwind
        // transform utilities on sibling elements are never touched.
        transform:     `translateX(-50%) translateY(${visible ? '0px' : '24px'})`,
        opacity:        visible ? 1 : 0,
        // Invisible state must not block clicks on underlying content.
        pointerEvents:  visible ? 'auto' : 'none',
        transition:    'transform 420ms cubic-bezier(0.22,1,0.36,1), opacity 360ms ease',
        zIndex:         40,
      }}
      className="rounded-2xl border border-[rgba(77,235,255,0.22)] bg-[rgba(8,16,34,0.93)] shadow-[0_8px_40px_rgba(0,0,0,0.45),0_0_28px_rgba(63,224,224,0.10)] backdrop-blur-xl"
    >
      <div className="relative flex flex-col gap-3 px-5 py-4 pr-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-7 sm:pr-16">

        {/* ── Text ──────────────────────────────────────────────────────── */}
        <div className="min-w-0">
          <p className="font-display font-bold leading-snug text-white-100 text-[15px] sm:text-[17px]">
            Ready to Scale Your Business?
          </p>
          <p className="mt-0.5 text-sm leading-snug text-slate-400">
            Let's Build Your Growth Strategy
          </p>
        </div>

        {/* ── CTA button — reuses the site's existing contact route ───── */}
        <Link
          to="/contact"
          tabIndex={visible ? 0 : -1}
          className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold text-navy-950 transition-all duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow-400"
          style={{
            background: 'linear-gradient(90deg, #2F6FFF 0%, #3FE0E0 100%)',
            boxShadow:  '0 0 18px rgba(63,224,224,0.20)',
          }}
        >
          Book A Free Strategy Call →
        </Link>

        {/* ── Dismiss ───────────────────────────────────────────────────── */}
        <button
          onClick={handleDismiss}
          tabIndex={visible ? 0 : -1}
          aria-label="Dismiss"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/[0.07] hover:text-white-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-glow-400"
        >
          <X size={13} strokeWidth={2.5} />
        </button>

      </div>
    </div>
  );
}
