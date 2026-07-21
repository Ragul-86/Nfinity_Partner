import { useEffect, useRef } from 'react';

/**
 * Scroll-reveal hook — adds `is-visible` to the returned ref element once it
 * enters the viewport.  See `.reveal / .is-visible` in index.css for the
 * matching CSS transitions.
 *
 * Performance notes:
 *   • Each threshold bucket reuses one shared IntersectionObserver instance
 *     (stored in the module-level `_observers` Map). Creating a separate
 *     IOB per element is the most common IOB anti-pattern; a shared observer
 *     with a callback that inspects `entry.target` is equivalent and avoids
 *     O(n) observer overhead on pages with many reveal elements.
 *   • The observer disconnects itself from each element after the first
 *     intersection (one-shot), so there is zero ongoing observation cost
 *     once all elements have revealed.
 */

// Map<threshold → IntersectionObserver>
const _observers = new Map();

function getObserver(threshold) {
  if (_observers.has(threshold)) return _observers.get(threshold);

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold },
  );

  _observers.set(threshold, obs);
  return obs;
}

export function useScrollReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getObserver(threshold);
    observer.observe(el);

    return () => observer.unobserve(el);
  }, [threshold]);

  return ref;
}
