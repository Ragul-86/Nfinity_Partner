import { useEffect } from 'react';

const SITE_NAME = 'Nfinity Partner';

function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Lightweight, dependency-free stand-in for react-helmet-async. Sets
 * document title + meta description/OG tags on mount. Since this is a CSR
 * SPA (no build-time prerendering in this MVP phase), these tags update
 * after JS executes — fine for browsers/social previews that run JS, a
 * known limitation for raw crawlers until a prerender step is added later.
 */
export function useSEO({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    setMeta('description', description);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
  }, [title, description]);
}
