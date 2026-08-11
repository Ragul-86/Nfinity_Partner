import { useState, useEffect, useRef, useCallback } from 'react';
import { useSEO } from '../hooks/useSEO.js';
import { useFetch } from '../hooks/useFetch.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { apiClient } from '../lib/apiClient.js';
import { STATS } from '../lib/constants.js';
import { JsonLd, organizationSchema } from '../components/shared/JsonLd.jsx';
import { LoadingState, ErrorState, EmptyState } from '../components/shared/PageState.jsx';

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
import { StickyCTA } from '../components/ui/StickyCTA.jsx';

const APPROACH_STEPS = [
  { heading: 'Strategy', body: 'Identify growth opportunities.' },
  { heading: 'Execution', body: 'Deploy performance systems.' },
  { heading: 'Optimization', body: 'Improve every stage of the funnel.' },
  { heading: 'Scaling', body: 'Increase profit, not just spend.' },
];

const FOUNDER_STORY = `Suganya Swaminathan built Nfinity Partner - a Digital Marketing Agency in Tiruppur - around one belief: revenue means nothing if profitability doesn't grow with it. Every account is founder-reviewed - not handed to a junior media buyer.`;

const PLATFORM_LOGOS = [
  { src: '/assets/partners/shopify-mark.png', alt: 'Shopify' },
  { src: '/assets/partners/meta-mark.png', alt: 'Meta' },
  { src: '/assets/partners/gokwik-mark.png', alt: 'GoKwik' },
];

const AWARD_IMAGES = [
  {
    src: '/assets/awards/img1.jpeg',
    alt: 'Nfinity Partner team receiving the Eagle Resilience Award on stage at TN Digital Summit 2026',
  },
  {
    src: '/assets/awards/img2.jpeg',
    alt: 'Nfinity Partner founder receiving the Eagle Resilience Award at TN Digital Summit 2026',
  },
  {
    src: '/assets/awards/img3.png',
    alt: 'Nfinity Partner team celebrating with Eagle Resilience Award trophies at TN Digital Summit 2026',
  },
];

function AwardCarousel() {
  const [idx, setIdx]       = useState(0);
  const [dimmed, setDimmed] = useState(false);
  const [ready, setReady]   = useState(false);
  const idxRef              = useRef(0);
  const pendingRef          = useRef(null);
  const HALF                = 220; // ms — overlay fade half-duration

  // Preload and fully decode all images before the carousel starts.
  // new Image() + decode() fills the browser's decoded image cache so that
  // every subsequent src swap on the single <img> paints immediately at
  // native pixel quality — no progressive-JPEG first-scan, no blur.
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      AWARD_IMAGES.map(({ src }) => {
        const img = new Image();
        img.src = src;
        return typeof img.decode === 'function'
          ? img.decode().catch(() => {})
          : new Promise((res) => { img.onload = res; img.onerror = res; });
      })
    ).then(() => { if (!cancelled) setReady(true); });
    return () => { cancelled = true; };
  }, []);

  const goTo = useCallback((next) => {
    if (next === idxRef.current) return;
    clearTimeout(pendingRef.current);
    setDimmed(true);
    pendingRef.current = setTimeout(() => {
      idxRef.current = next;
      setIdx(next);
      setDimmed(false);
    }, HALF);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-slide starts only after all images are fully decoded and cached.
  useEffect(() => {
    if (!ready) return;
    const timer = setInterval(() => {
      goTo((idxRef.current + 1) % AWARD_IMAGES.length);
    }, 4500);
    return () => { clearInterval(timer); clearTimeout(pendingRef.current); };
  }, [ready, goTo]);

  return (
    <div>
      <div style={{ position: 'relative' }}>
        {/* Carousel frame — aspect ratio matches About page (720/470 ≈ natural 3:2 ratio
            of the award photos). object-contain preserves the full composition without
            cropping; will-change:transform promotes to its own compositor layer so
            Chrome rasterises at display resolution after full decode. */}
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-electric-blue-500/30 bg-navy-900 shadow-[0_0_48px_rgba(63,224,224,0.12)]"
          style={{ aspectRatio: '720 / 470', willChange: 'transform' }}
        >
          <img
            src={AWARD_IMAGES[idx].src}
            alt={AWARD_IMAGES[idx].alt}
            fetchPriority="high"
            style={{
              position:  'absolute',
              inset:      0,
              width:     '100%',
              height:    '100%',
              objectFit: 'contain',
              display:   'block',
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy-950/60 to-transparent"
            aria-hidden="true"
            style={{ zIndex: 1 }}
          />
        </div>

        {/* Overlay — outside the frame's stacking context, handles visual fade */}
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            inset:          0,
            borderRadius:  '1rem',
            background:    '#0A1428',
            opacity:       dimmed ? 1 : 0,
            transition:    `opacity ${HALF}ms ease-in-out`,
            zIndex:         1,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Pagination dots */}
      <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Award images">
        {AWARD_IMAGES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === idx}
            aria-label={`Show image ${i + 1}`}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 focus:outline-none ${
              i === idx
                ? 'h-1.5 w-6 bg-cyan-glow-400'
                : 'h-1.5 w-1.5 bg-white/25 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const CLIENT_LOGOS = [
  { src: '/assets/logos/58961872_477753086097998_8361855451872100352_n.png', alt: 'Fortune Innovatives' },
  { src: '/assets/logos/126201082_215104883316377_2352695808018771792_n.png', alt: 'JOPO' },
  { src: '/assets/logos/416611284_395346489552786_2840064139157330866_n.png', alt: "varnam" },
  { src: '/assets/logos/397284943_1086403345709987_4084707428464138765_n.png', alt: 'Client partner logo' },
  { src: '/assets/logos/473028016_1819839445437007_79829896382429459_n.png', alt: 'GK Naturals' },
  { src: '/assets/logos/491150893_24187371780852920_7792074825305866171_n.png', alt: 'Thugiil For Women' },
  { src: '/assets/logos/627165636_18052555652694983_5073613427572677048_m.png', alt: 'Eyal' },
  { src: '/assets/logos/274678130_295213222713075_6688730258676888690_n.png', alt: "Deepa's Boutique" },
  { src: '/assets/logos/we_2_b13f0ef2-b671-4241-9cd2-4c4a3eea8463_200x_2x.png', alt: 'Temple - The Designer Studio' },
  { src: '/assets/logos/658173288_17962831866069238_3547545128342012201_n.png', alt: 'Ritarya' },
  { src: '/assets/logos/cropped-Ramji-Logo-01-scaled-1-removebg-preview-1.png', alt: 'Ramji Cables & Networks' },
  { src: '/assets/logos/612073451_17915886513255770_1158315873142992727_n.png', alt: 'Klin Space' },
];

export default function Home() {
  useSEO({
    title: 'Digital Marketing Agency in Tiruppur',
    description:
      'Grow your business with Nfinity Partner, a leading digital marketing agency in Tiruppur offering SEO, Google Ads, website development, social media marketing, branding, and performance marketing.',
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

      {/* ── Two-column Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-black">
        {/* Ambient glow — matches SectionHero */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-electric-blue-500/20 blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-10 sm:pt-14 sm:pb-12 lg:px-8 lg:pt-20 lg:pb-16">

          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">

            {/* ── LEFT — existing hero content ─────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Eyebrow badge — lg:text-[13px]/px-3 keeps it on one line inside the left column */}
              <span className="inline-flex items-center gap-1.5 rounded-full uppercase border border-[#4DEBFF] bg-[rgba(77,235,255,0.08)] px-5 py-2 lg:px-3 text-[15px] sm:text-[21px] lg:text-[13px] lg:whitespace-nowrap font-bold tracking-[0.08em] text-[#4DEBFF] shadow-[0_0_24px_rgba(77,235,255,0.3)]">
                Tirupur's #1 Profit-Focused D2C Marketing Agency
              </span>

              {/* Positioning statement */}
              <p className="mt-6 text-[20px] sm:text-[24px] font-semibold tracking-wide text-[#4DEBFF]">
                Profit First → Revenue Second → ROAS Third
              </p>

              {/* Headline */}
              <h1 className="mt-5 font-display font-extrabold tracking-tight text-white-100 text-4xl sm:text-5xl lg:text-[clamp(42px,4.3vw,72px)]">
                Scaling Profitability Is The Game.
              </h1>

              {/* Subheadline */}
              <p className="mt-8 max-w-xl text-lg text-slate-400">
                We help D2C brands increase profit, revenue, and customer lifetime value through performance marketing, CRO, and growth strategy.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href="/contact" size="lg" withArrow>
                  Book Your Free Profit Audit
                </Button>
                <Button href="/case-studies" variant="secondary" size="lg">
                  See Our Case Studies
                </Button>
              </div>

            </div>

            {/* ── RIGHT — award image carousel ─────────────────────────────── */}
            <div className="w-full lg:w-[46%] lg:shrink-0">
              <AwardCarousel />
            </div>

          </div>

          {/* Partner logo cards — compact group, centered via mx-auto */}
          <div className="mt-[60px] flex flex-col items-center gap-4 sm:flex-row sm:w-fit sm:mx-auto sm:gap-[18px]">
            {PLATFORM_LOGOS.map((logo) => (
              <div
                key={logo.src}
                className="flex h-[110px] w-full sm:w-[185px] sm:shrink-0 flex-col items-center justify-center rounded-[20px] border border-[rgba(77,235,255,0.25)] bg-glass-fill px-4 shadow-[0_0_24px_rgba(77,235,255,0.18)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-[5px] hover:shadow-[0_0_36px_rgba(77,235,255,0.32)]"
              >
                <div className="flex h-[40px] w-full items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="eager"
                    fetchpriority="low"
                    decoding="async"
                    width="150"
                    height="40"
                    className="max-h-[40px] max-w-[150px] w-auto object-contain"
                  />
                </div>
                <p
                  className="text-center font-medium"
                  style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.5px', marginTop: '12px' }}
                >
                  {logo.alt} Partner
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
        body="Book a free strategy call now - no pressure, just a clear look at where your profit is leaking."
        cta={{ label: 'Book Your Free Profit Audit', href: '/contact' }}
      />
      <p className="-mt-16 pb-16 text-center text-xs text-slate-400">
        Reviewed personally by the founder. Usually responds within 24 hours.
      </p>

      {/* Scroll-triggered sticky CTA — Home page only, never in global layout */}
      <StickyCTA />
    </>
  );
}
