import { useSEO } from '../hooks/useSEO.js';
import { useFetch } from '../hooks/useFetch.js';
import { apiClient } from '../lib/apiClient.js';
import { JsonLd, organizationSchema } from '../components/shared/JsonLd.jsx';
import { LoadingState, ErrorState, EmptyState } from '../components/shared/PageState.jsx';

import { SectionHero } from '../components/sections/SectionHero.jsx';
import { ServicesGrid } from '../components/sections/ServicesGrid.jsx';
import { CTASection } from '../components/sections/CTASection.jsx';

export default function Services() {
  useSEO({
    title: 'Services | Performance Marketing, SEO, Branding & More',
    description:
      'End-to-end growth systems for D2C and ecommerce brands — performance marketing, website development, SEO, social media marketing, branding, and software development.',
  });

  const { data: services, loading, error } = useFetch(() => apiClient.get('/services'), []);

  return (
    <>
      <JsonLd id="services-org" data={organizationSchema()} />

      <SectionHero
        eyebrow="What We Do"
        eyebrowClassName="border border-glass-border bg-glass-fill px-3 py-1 text-[1.5rem] leading-[2rem] font-medium tracking-wide text-cyan-glow-400"
        headline="End-To-End Growth Systems, Not One-Off Tactics."
        subheadline="Strategy, media buying, websites, branding, and software under one roof — every service measured against the same number: profit."
        primaryCta={{ label: 'Book A Free Strategy Call', href: '/contact' }}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {loading && <LoadingState label="Loading services..." />}
        {error && <ErrorState message="Couldn't load services right now." />}
        {!loading && !error && (!services || services.length === 0) && (
          <EmptyState message="Services coming soon." />
        )}
        {!loading && !error && services && services.length > 0 && <ServicesGrid services={services} />}
      </section>

      <CTASection
        headline="Not Sure Which Service You Need?"
        body="Book a free strategy call — we'll tell you honestly where your funnel is leaking profit."
        cta={{ label: 'Book Your Free Profit Audit', href: '/contact' }}
      />
    </>
  );
}
