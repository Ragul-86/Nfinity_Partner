import { useEffect, useRef } from 'react';

/**
 * Adds the `reveal` base class behaviour: attach the returned ref to any
 * element with className="reveal ..." and it gets `is-visible` appended
 * once it scrolls into the viewport (see .reveal / .is-visible in index.css).
 */
export function useScrollReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
