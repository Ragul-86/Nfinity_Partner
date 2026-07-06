import { useEffect } from 'react';

/**
 * Injects a <script type="application/ld+json"> tag for structured data
 * (Organization, Service, Article, FAQPage, BreadcrumbList schemas per
 * Section 4.11). Removes the tag on unmount/re-render to avoid duplicates.
 */
export function JsonLd({ id, data }) {
  useEffect(() => {
    if (!data) return;
    const scriptId = `jsonld-${id}`;
    let tag = document.getElementById(scriptId);
    if (!tag) {
      tag = document.createElement('script');
      tag.id = scriptId;
      tag.type = 'application/ld+json';
      document.head.appendChild(tag);
    }
    tag.textContent = JSON.stringify(data);

    return () => {
      tag?.remove();
    };
  }, [id, data]);

  return null;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nfinity Partner',
    url: 'https://nfinitypartner.com',
    description: "Tirupur's #1 Profit-Focused D2C Marketing Agency.",
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No.6, 2nd Floor, Angeripalayam Road',
      addressLocality: 'Tirupur',
      postalCode: '641602',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-95666-37111',
      email: 'suganya.nfinitypartner@gmail.com',
      contactType: 'customer service',
    },
  };
}

export function faqSchema(items = []) {
  if (!items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
