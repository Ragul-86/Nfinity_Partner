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

export default function ServiceTemplate() {
  const { slug } = useParams();
  const { data: service, loading, error } = useFetch(() => apiClient.get(`/services/${slug}`), [slug]);

  useSEO({
    title: service?.seo?.title || service?.name || 'Service',
    description: service?.seo?.description || service?.shortDescription,
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

      <FAQSection title={`${service.name} — FAQs`} items={service.faqs} />

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
