import { useSEO } from '../hooks/useSEO.js';
import { useFetch } from '../hooks/useFetch.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { apiClient } from '../lib/apiClient.js';
import { STATS } from '../lib/constants.js';
import { JsonLd, organizationSchema } from '../components/shared/JsonLd.jsx';
import { LoadingState, ErrorState, EmptyState } from '../components/shared/PageState.jsx';

import { SectionHero } from '../components/sections/SectionHero.jsx';
import { ClientLogosSection } from '../components/sections/ClientLogosSection.jsx';
import { StatsSection } from '../components/sections/StatsSection.jsx';
import { ServicesGrid } from '../components/sections/ServicesGrid.jsx';
import { WhyNfinityEngineered } from '../components/sections/WhyNfinityEngineered.jsx';
import { ComparisonSection } from '../components/sections/ComparisonSection.jsx';
import { ApproachSteps } from '../components/sections/ApproachSteps.jsx';
import { CaseStudyPreview } from '../components/sections/CaseStudyPreview.jsx';
import { TestimonialSlider } from '../components/sections/TestimonialSlider.jsx';
import { FounderSection } from '../components/sections/FounderSection.jsx';
import { AwardsSection } from '../components/sections/AwardsSection.jsx';
import { CTASection } from '../components/sections/CTASection.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';

const APPROACH_STEPS = [
  { heading: 'Strategy', body: 'Identify growth opportunities.' },
  { heading: 'Execution', body: 'Deploy performance systems.' },
  { heading: 'Optimization', body: 'Improve every stage of the funnel.' },
  { heading: 'Scaling', body: 'Increase profit, not just spend.' },
];

const FOUNDER_STORY = `Suganya Swaminathan built Nfinity Partner — a Digital Marketing Agency in Tiruppur — around one belief: revenue means nothing if profitability doesn't grow with it. Every account is founder-reviewed — not handed to a junior media buyer.`;

const PLATFORM_LOGOS = [
  { src: '/assets/partners/shopify-mark.png', alt: 'Shopify' },
  { src: '/assets/partners/meta-mark.png', alt: 'Meta' },
  { src: '/assets/partners/gokwik-mark.png', alt: 'GoKwik' },
];

const CLIENT_LOGOS = [
  { src: '/assets/logos/58961872_477753086097998_8361855451872100352_n.png', alt: 'Fortune Innovatives' },
  { src: '/assets/logos/126201082_215104883316377_2352695808018771792_n.png', alt: 'JOPO' },
  { src: '/assets/logos/416611284_395346489552786_2840064139157330866_n.png', alt: "varnam" },
  { src: '/assets/logos/397284943_1086403345709987_4084707428464138765_n.png', alt: 'Client partner logo' },
  { src: '/assets/logos/473028016_1819839445437007_79829896382429459_n.png', alt: 'GK Naturals' },
  { src: '/assets/logos/491150893_24187371780852920_7792074825305866171_n.png', alt: 'Thugiil For Women' },
  { src: '/assets/logos/627165636_18052555652694983_5073613427572677048_n.png', alt: 'Eyal' },
  { src: '/assets/logos/274678130_295213222713075_6688730258676888690_n.png', alt: "Deepa's Boutique" },
  { src: '/assets/logos/we_2_b13f0ef2-b671-4241-9cd2-4c4a3eea8463_200x_2x.png', alt: 'Temple - The Designer Studio' },
  { src: '/assets/logos/658173288_17962831866069238_3547545128342012201_n.png', alt: 'Ritarya' },
  { src: '/assets/logos/cropped-Ramji-Logo-01-scaled-1-removebg-preview-1.png', alt: 'Ramji Cables & Networks' },
  { src: '/assets/logos/612073451_17915886513255770_1158315873142992727_n.png', alt: 'Klin Space' },
];

export default function Home() {
  useSEO({
    title: "Tirupur's #1 Profit-Focused D2C Marketing Agency",
    description:
      'Nfinity Partner helps D2C and ecommerce brands scale profitably through performance marketing, CRO, and retention systems. ₹50Cr+ revenue generated. Book a free profit audit.',
  });

  const { data: services, loading: servicesLoading, error: servicesError } = useFetch(
    () => apiClient.get('/services'),
    []
  );
  const { data: caseStudies, loading: caseStudiesLoading, error: caseStudiesError } = useFetch(
    () => apiClient.get('/case-studies', { featured: true }),
    []
  );
  const { data: testimonials, loading: testimonialsLoading, error: testimonialsError } = useFetch(
    () => apiClient.get('/testimonials', { featured: true }),
    []
  );

  const profitabilityRevealRef = useScrollReveal({ threshold: 0.2 });
  const moreThanMarketingRevealRef = useScrollReveal({ threshold: 0.2 });

  return (
    <>
      <JsonLd id="home-org" data={organizationSchema()} />

      <SectionHero
        eyebrow="Tirupur's #1 Profit-Focused D2C Marketing Agency"
        positioningStatement="Profit First → Revenue Second → ROAS Third"
        headline="Scaling Profitability Is The Game."
        subheadline="We help D2C brands increase profit, revenue, and customer lifetime value through performance marketing, CRO, and growth strategy."
        primaryCta={{ label: 'Book Your Free Profit Audit', href: '/contact' }}
        secondaryCta={{ label: 'See Our Case Studies', href: '/case-studies' }}
        eyebrowClassName="border border-[#4DEBFF] bg-[rgba(77,235,255,0.08)] px-5 py-2 text-[21px] font-bold tracking-[0.08em] text-[#4DEBFF] shadow-[0_0_24px_rgba(77,235,255,0.3)]"
        positioningStatementClassName="mt-6 text-[24px] font-semibold tracking-wide text-[#4DEBFF]"
        containerClassName="max-w-4xl lg:max-w-[1750px]"
        wrapperMaxWidthClassName="max-w-7xl lg:max-w-[1750px]"
        headlineSizeClassName="text-4xl sm:text-5xl lg:text-[clamp(42px,4.3vw,78px)]"
        headlineClassName="mt-5"
        subheadlineClassName="mt-8"
        partnerLogos={PLATFORM_LOGOS}
      />

      <ClientLogosSection
        eyebrow="Trusted by Businesses Across Tiruppur"
        title="Digital Marketing Agency in Tiruppur Trusted by Leading Brands"
        subtitle="Nfinity Partner is a Digital Marketing Agency in Tiruppur helping D2C brands, manufacturers, retailers, startups, educational institutions, and local businesses grow through performance marketing, branding, website development, SEO, and digital growth strategies."
        logos={CLIENT_LOGOS}
        cta={{ label: 'Book Your Free Profit Audit', href: '/contact' }}
      />

      {/* Stats */}
      <div>
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center lg:px-8 lg:pb-16">
          <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">
            The Numbers Behind Our Success.
          </h2>
        </div>
        <StatsSection stats={STATS} />
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center lg:px-8">
          <p className="text-lg font-light leading-[1.6] text-slate-400 sm:text-[24px]">
            From customer acquisition to repeat purchases, we help D2C and ecommerce brands grow revenue, improve
            margins, and scale with confidence.
          </p>
        </div>
      </div>

      {/* Built For Brands That Want More Than Sales */}
      <section className="mx-auto max-w-5xl px-6 py-14 text-center lg:px-8 lg:py-24">
        <div ref={profitabilityRevealRef} className="reveal">
          <Badge className="max-w-full whitespace-normal text-center text-[10px] leading-[2rem] sm:text-[1.6rem]">Built For Brands That Want More Than Sales</Badge>
          <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white-100 sm:text-5xl lg:text-[clamp(2px,6vw,60px)]">
            we don't chase roas.
            <br />
            we scale profitability.
          </h2>
          <p className="mx-auto mt-6 max-w-[760px] text-lg text-slate-400">
            Because growth isn't just about getting more customers.
            <br />
            It's about building a more profitable business.
            <br />
            We help D2C and ecommerce brands scale through performance marketing, CRO, and profit-first growth
            systems.
          </p>
          <div className="mt-10">
            <Button href="/contact" size="lg" withArrow>
              Book Your Call
            </Button>
          </div>

          <div ref={moreThanMarketingRevealRef} className="reveal mt-[60px]">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-glow-400 sm:text-base">
              More Than Performance Marketing
            </p>
            <p className="mx-auto mt-4 max-w-[700px] text-lg text-slate-400 sm:text-xl">
              We partner with founders to build strong offers, high conversion funnels, better retention, and
              profitable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">What We Do.</h2>
        </div>
        <div className="mt-14">
          {servicesLoading && <LoadingState label="Loading services..." />}
          {servicesError && <ErrorState message="Couldn't load services right now." />}
          {!servicesLoading && !servicesError && (!services || services.length === 0) && (
            <EmptyState message="Services coming soon." />
          )}
          {!servicesLoading && !servicesError && services && services.length > 0 && (
            <ServicesGrid services={services} />
          )}
        </div>
      </section>

      <WhyNfinityEngineered
        image={{
          src: '/assets/team/founder-suganya.png',
          alt: 'Suganya Swaminathan, Founder of Nfinity Partner',
        }}
      />

      <ComparisonSection />

      <ApproachSteps title="From Performance To Profit." steps={APPROACH_STEPS} />

      {/* Case Study Preview */}
      {caseStudiesLoading && <LoadingState label="Loading case studies..." />}
      {caseStudiesError && <ErrorState message="Couldn't load case studies right now." />}
      {!caseStudiesLoading && !caseStudiesError && (
        <CaseStudyPreview title="Results, Not Promises." caseStudies={caseStudies || []} />
      )}

      {/* Testimonials */}
      <div>
        <div className="mx-auto max-w-2xl px-6 pt-8 text-center lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">What Founders Say.</h2>
        </div>
        {testimonialsLoading && <LoadingState label="Loading testimonials..." />}
        {testimonialsError && <ErrorState message="Couldn't load testimonials right now." />}
        {!testimonialsLoading && !testimonialsError && testimonials && testimonials.length > 0 && (
          <TestimonialSlider testimonials={testimonials} />
        )}
      </div>

      {/* Founder Section */}
      <div>
        <div className="mx-auto max-w-3xl px-6 pt-8 text-center lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-glow-400">
            Founder &bull; Digital Marketing Agency in Tiruppur
          </p>
          <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">
            Led By A Founder Who's Been On The Other Side Of The Table.
          </h2>
        </div>
        <FounderSection story={FOUNDER_STORY} />
        <div className="-mt-12 text-center pb-4">
          <Button href="/about" variant="ghost" withArrow>
            Read Suganya's Story
          </Button>
        </div>
      </div>

      {/* Awards */}
      <div>
        <div className="mx-auto max-w-2xl px-6 pt-8 text-center lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">
            Recognized For Performance, Not Just Promises.
          </h2>
        </div>
        <AwardsSection
          awards={[{ name: 'Eagle Resilience Award', body: 'TN Digital Summit 2026' }]}
        />
      </div>

      {/* Final CTA */}
      <CTASection
        headline="Ready To Earn An Extra ₹2L+ In Revenue With The Same Ad Spend?"
        body="Book a free strategy call now — no pressure, just a clear look at where your profit is leaking."
        cta={{ label: 'Book Your Free Profit Audit', href: '/contact' }}
      />
      <p className="-mt-16 pb-16 text-center text-xs text-slate-400">
        Reviewed personally by the founder. Usually responds within 24 hours.
      </p>
    </>
  );
}
