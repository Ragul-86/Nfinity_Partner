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
 * document title + meta description/OG tags on mount.
 *
 * Usage A — automatic site-name suffix:
 *   useSEO({ title: 'Page Name', description: '...' })
 *   → document.title = "Page Name | Nfinity Partner"
 *
 * Usage B — exact title override (no suffix appended):
 *   useSEO({ fullTitle: 'Exact Title Here', description: '...' })
 *   → document.title = "Exact Title Here"
 *
 * `fullTitle` takes precedence over `title` when both are supplied.
 */
export function useSEO({ title, fullTitle, description }) {
  useEffect(() => {
    const resolvedTitle = fullTitle || (title ? `${title} | ${SITE_NAME}` : SITE_NAME);
    document.title = resolvedTitle;

    setMeta('description', description);
    setMeta('og:title', resolvedTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('twitter:title', resolvedTitle);
    setMeta('twitter:description', description);
  }, [title, fullTitle, description]);
}
