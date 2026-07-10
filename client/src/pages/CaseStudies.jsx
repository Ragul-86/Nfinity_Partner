import { useSEO } from '../hooks/useSEO.js';
import { useFetch } from '../hooks/useFetch.js';
import { apiClient } from '../lib/apiClient.js';
import { STATS } from '../lib/constants.js';
import { JsonLd, organizationSchema, faqSchema } from '../components/shared/JsonLd.jsx';
import { LoadingState, ErrorState, EmptyState } from '../components/shared/PageState.jsx';

import { SectionHero } from '../components/sections/SectionHero.jsx';
import { StatsSection } from '../components/sections/StatsSection.jsx';
import { CaseStudyCard } from '../components/sections/CaseStudyCard.jsx';
import { BlogCard } from '../components/sections/BlogCard.jsx';
import { TestimonialSlider } from '../components/sections/TestimonialSlider.jsx';
import { FAQSection } from '../components/sections/FAQSection.jsx';
import { CTASection } from '../components/sections/CTASection.jsx';

const FAQ_ITEMS = [
  {
    q: 'Are these results typical, or best-case examples?',
    a: 'They reflect the same framework applied across every account — results vary by starting point, but the system is consistent.',
  },
  {
    q: 'Do you have case studies outside of D2C/fashion?',
    a: 'Yes — education and B2B/considered-purchase examples are included above, and the framework generalizes beyond D2C.',
  },
  {
    q: 'How long until I would see results like these?',
    a: 'Most of the case studies above show meaningful movement within the first 1–3 months, with continued scaling after.',
  },
];

export default function CaseStudies() {
  useSEO({
    title: 'Case Studies | Nfinity Partner — ₹50Cr+ Revenue Generated for D2C Brands',
    description:
      'See how Nfinity Partner scaled D2C, fashion, education, and B2B brands profitably — including an 18X peak return and a 39X ad campaign. Real numbers, no vanity metrics.',
  });

  const { data: caseStudies, loading, error } = useFetch(() => apiClient.get('/case-studies', { limit: 50 }), []);
  const { data: testimonials } = useFetch(() => apiClient.get('/testimonials', { featured: true }), []);
  const {
    data: blogPosts,
    loading: blogLoading,
    error: blogError,
  } = useFetch(() => apiClient.get('/blog', { limit: 50 }), []);

  return (
    <>
      <JsonLd id="case-studies-org" data={organizationSchema()} />
      <JsonLd id="case-studies-faq" data={faqSchema(FAQ_ITEMS)} />

      <SectionHero
        eyebrow="Case Studies"
        eyebrowClassName="border border-glass-border bg-glass-fill px-3 py-1 text-[1.5rem] leading-[2rem] font-medium tracking-wide text-cyan-glow-400"
        headline="Results, Not Promises."
        subheadline="From fashion to education to B2B, here's how the profit-first system performs across industries."
        primaryCta={{ label: 'Book A Free Strategy Call', href: '/contact' }}
      />

      <StatsSection stats={STATS} />

      {/* Case Study Grid */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">Featured Case Studies.</h2>
        </div>
        <div className="mt-14">
          {loading && <LoadingState label="Loading case studies..." />}
          {error && <ErrorState message="Couldn't load case studies right now." />}
          {!loading && !error && (!caseStudies || caseStudies.length === 0) && (
            <EmptyState message="Case studies coming soon." />
          )}
          {!loading && !error && caseStudies && caseStudies.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((cs) => (
                <CaseStudyCard key={cs.slug} caseStudy={cs} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Insights (Blog) */}
      <section id="latest-insights" className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">Latest Insights.</h2>
          <p className="mt-4 text-slate-400">
            Practical, profit-first breakdowns on performance marketing, CRO, and growth systems.
          </p>
        </div>
        <div className="mt-14">
          {blogLoading && <LoadingState label="Loading articles..." />}
          {blogError && <ErrorState message="Couldn't load articles right now." />}
          {!blogLoading && !blogError && (!blogPosts || blogPosts.length === 0) && (
            <EmptyState message="Articles coming soon." />
          )}
          {!blogLoading && !blogError && blogPosts && blogPosts.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {blogPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {testimonials && testimonials.length > 0 && (
        <div>
          <div className="mx-auto max-w-2xl px-6 pt-8 text-center lg:px-8">
            <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">What Founders Say.</h2>
          </div>
          <TestimonialSlider testimonials={testimonials} />
        </div>
      )}

      <FAQSection title="Frequently Asked Questions" items={FAQ_ITEMS} />

      <CTASection
        headline="Your Brand Could Be The Next Case Study."
        body="Book a free profit audit and find out what a profit-first system looks like for your numbers."
        cta={{ label: 'Book Your Free Profit Audit', href: '/contact' }}
      />
    </>
  );
}
