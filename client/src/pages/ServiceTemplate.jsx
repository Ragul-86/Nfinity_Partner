import { useParams, Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO.js';
import { useFetch } from '../hooks/useFetch.js';
import { apiClient } from '../lib/apiClient.js';
import { JsonLd, breadcrumbSchema, faqSchema } from '../components/shared/JsonLd.jsx';
import { LoadingState, ErrorState } from '../components/shared/PageState.jsx';

import { SectionHero } from '../components/sections/SectionHero.jsx';
import { FrameworkSteps } from '../components/sections/FrameworkSteps.jsx';
import { FAQSection } from '../components/sections/FAQSection.jsx';
import { CTASection } from '../components/sections/CTASection.jsx';

/* ─── Static SEO metadata per service slug ──────────────────────────────────
   Defined here — not read from the API — so titles and descriptions are
   always correct on first render, match the pattern used on every other page,
   and require no database changes or seed runs to update.
────────────────────────────────────────────────────────────────────────────── */
const SERVICE_SEO = {
  'performance-marketing': {
    fullTitle: 'Performance Marketing | Nfinity Partner',
    description:
      'Drive more leads and sales with data-driven performance marketing services, including Google Ads, Meta Ads and campaign optimization.',
  },
  'website-development': {
    fullTitle: 'Website Development | Nfinity Partner',
    description:
      'Build fast, responsive and SEO-friendly websites with custom web development solutions designed to grow your business online.',
  },
  seo: {
    fullTitle: 'SEO Services | Nfinity Partner',
    description:
      'Improve your Google rankings with expert SEO services, including on-page SEO, technical SEO, local SEO and link building.',
  },
  'social-media-marketing': {
    fullTitle: 'Social Media Marketing | Nfinity Partner',
    description:
      'Grow your brand with social media marketing services, creative content, paid ads and audience engagement across platforms.',
  },
  'personal-branding-product-photography': {
    fullTitle: 'Personal Branding & Photography | Nfinity Partner',
    description:
      'Enhance your brand with professional personal branding and product photography that builds trust and increases conversions.',
  },
  'online-marketing': {
    fullTitle: 'Online Marketing | Nfinity Partner',
    description:
      'Expand your online presence with digital marketing strategies, SEO, PPC, social media and lead generation services.',
  },
  'digital-branding': {
    fullTitle: 'Digital Branding | Nfinity Partner',
    description:
      'Create a memorable brand identity with digital branding services, logo design, brand strategy and visual communication.',
  },
  'software-app-development': {
    fullTitle: 'Software & App Development | Nfinity Partner',
    description:
      'Develop custom software and mobile apps with scalable, secure and user-friendly solutions for your business needs.',
  },
  'linkedin-automation': {
    fullTitle: 'LinkedIn Automation | Nfinity Partner',
    description:
      'Automate LinkedIn outreach, lead generation and engagement to connect with prospects and grow your professional network.',
  },
};

export default function ServiceTemplate() {
  const { slug } = useParams();
  const { data: service, loading, error } = useFetch(() => apiClient.get(`/services/${slug}`), [slug]);

  const pageSeo = SERVICE_SEO[slug] ?? {
    fullTitle: service?.name ? `${service.name} | Nfinity Partner` : 'Services | Nfinity Partner',
    description: service?.shortDescription,
  };

  useSEO({
    fullTitle: pageSeo.fullTitle,
    description: pageSeo.description,
  });

  if (loading) return <LoadingState label="Loading service..." />;
  if (error || !service) {
    return (
      <div className="py-32 text-center">
        <ErrorState message="We couldn't find that service." />
        <Link to="/services" className="mt-4 inline-block text-sm font-medium text-electric-blue-400 hover:text-cyan-glow-400">
          ← Back to all services
        </Link>
      </div>
    );
  }

  return (
    <>
      <JsonLd
        id="service-breadcrumb"
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: service.name, url: `/services/${service.slug}` },
        ])}
      />
      {service.faqs?.length > 0 && <JsonLd id="service-faq" data={faqSchema(service.faqs)} />}

      <SectionHero
        eyebrow={service.name}
        eyebrowClassName="border border-glass-border bg-glass-fill px-3 py-1 text-sm leading-[2rem] font-medium tracking-wide text-cyan-glow-400 sm:text-[1.5rem]"
        headline={service.heroHeadline}
        subheadline={service.heroSubheadline}
        primaryCta={{ label: 'Book A Free Strategy Call', href: '/contact' }}
      />

      <FrameworkSteps sections={service.sections} />

      <FAQSection title={`${service.name} - FAQs`} items={service.faqs} />

      <CTASection
        headline={service.finalCtaHeadline || `Ready To Scale With ${service.name}?`}
        body={service.finalCtaBody}
        cta={{ label: 'Book Your Free Profit Audit', href: '/contact' }}
      />

      <div className="pb-16 text-center">
        <Link to="/services" className="text-sm font-medium text-electric-blue-400 hover:text-cyan-glow-400">
          ← Back to all services
        </Link>
      </div>
    </>
  );
}
