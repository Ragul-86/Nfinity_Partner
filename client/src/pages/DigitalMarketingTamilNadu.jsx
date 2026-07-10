import * as Icons from 'lucide-react';
import { useSEO } from '../hooks/useSEO.js';
import { useFetch } from '../hooks/useFetch.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { apiClient } from '../lib/apiClient.js';
import { JsonLd, organizationSchema, faqSchema, breadcrumbSchema } from '../components/shared/JsonLd.jsx';
import { LoadingState, ErrorState } from '../components/shared/PageState.jsx';

import { SectionHero } from '../components/sections/SectionHero.jsx';
import { CaseStudyPreview } from '../components/sections/CaseStudyPreview.jsx';
import { FAQSection } from '../components/sections/FAQSection.jsx';
import { CTASection } from '../components/sections/CTASection.jsx';
import { GlassCard } from '../components/ui/GlassCard.jsx';
import { Button } from '../components/ui/Button.jsx';

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    name: 'Performance Marketing',
    slug: 'performance-marketing',
    icon: 'TrendingUp',
    desc: 'Profitable Meta Ads and Google Ads campaigns built around your margins. Every rupee of ad spend is tracked against real business outcomes — not just impressions.',
  },
  {
    name: 'Website Development',
    slug: 'website-development',
    icon: 'Globe',
    desc: 'High-performance websites and landing pages designed to convert visitors into leads — fast, mobile-first, and engineered to rank on search.',
  },
  {
    name: 'SEO',
    slug: 'seo',
    icon: 'Search',
    desc: 'Long-term organic growth strategies that build sustainable search traffic and steadily reduce your dependence on paid media over time.',
  },
  {
    name: 'Social Media Marketing',
    slug: 'social-media-marketing',
    icon: 'Share2',
    desc: 'Platform-specific content and paid campaigns that grow engaged communities and convert followers into paying customers consistently.',
  },
  {
    name: 'Personal Branding & Product Photography',
    slug: 'personal-branding-product-photography',
    icon: 'Camera',
    desc: 'Premium visuals and personal brand positioning that elevate your credibility, increase conversion rates, and build lasting trust with your audience.',
  },
  {
    name: 'Online Marketing',
    slug: 'online-marketing',
    icon: 'Megaphone',
    desc: 'Multi-channel online marketing systems that attract qualified prospects, nurture them with precision, and convert them into loyal customers.',
  },
  {
    name: 'Digital Branding',
    slug: 'digital-branding',
    icon: 'Palette',
    desc: 'Consistent, premium brand identity that differentiates your business and builds trust in a competitive digital landscape across every touchpoint.',
  },
  {
    name: 'Software & App Development',
    slug: 'software-app-development',
    icon: 'Code2',
    desc: 'Custom software and mobile applications built to solve real business problems, automate operations, and improve efficiency at every layer.',
  },
  {
    name: 'LinkedIn Automation',
    slug: 'linkedin-automation',
    icon: 'Linkedin',
    desc: 'Strategic LinkedIn outreach systems for B2B businesses building relationships and generating a consistent sales pipeline — on autopilot.',
  },
];

const WHY_ITEMS = [
  {
    icon: 'TrendingUp',
    title: 'Profit-First Approach',
    desc: 'Every strategy begins by understanding your margins. We optimise for contribution margin, ROAS, and CAC — never just for reach or impressions.',
  },
  {
    icon: 'UserCheck',
    title: 'Founder-Led Strategy',
    desc: 'Your account is reviewed personally by the founder. No junior hand-offs. No generic playbooks. Strategy shaped by real business experience.',
  },
  {
    icon: 'Layers',
    title: 'Full-Funnel Thinking',
    desc: 'From awareness to purchase to retention — we build systems that compound. Each investment makes the next one more effective.',
  },
  {
    icon: 'MapPin',
    title: 'Tamil Nadu Expertise',
    desc: 'Headquartered in Tiruppur, we understand the business landscape of Tamil Nadu across fashion, manufacturing, education, healthcare, and retail.',
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    icon: 'Compass',
    title: 'Discover',
    desc: 'We audit your current marketing, study your margins, and identify exactly where profit is leaking and where growth is waiting.',
  },
  {
    number: '02',
    icon: 'Target',
    title: 'Strategise',
    desc: 'We build a profit-first growth strategy tailored to your specific business model, market, stage, and goals.',
  },
  {
    number: '03',
    icon: 'Zap',
    title: 'Execute',
    desc: 'We deploy campaigns, creatives, and systems — moving fast while staying precise on the metrics that actually move the business.',
  },
  {
    number: '04',
    icon: 'BarChart2',
    title: 'Optimise & Scale',
    desc: 'Every lever is optimised continuously. As profitability improves, we scale what works and eliminate what doesn\'t.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Where is Nfinity Partner located?',
    a: 'Nfinity Partner is headquartered in Tiruppur, Tamil Nadu. We work with businesses across all major cities in Tamil Nadu including Chennai, Coimbatore, Madurai, Salem, Erode, Trichy, Vellore, Hosur, Tirunelveli, and Thanjavur.',
  },
  {
    q: 'What types of businesses does Nfinity Partner work with?',
    a: 'We work with D2C brands, ecommerce businesses, startups, SMEs, manufacturers, educational institutions, healthcare businesses, and local businesses across Tamil Nadu — at every stage of their growth.',
  },
  {
    q: 'What makes Nfinity Partner different from other digital marketing agencies in Tamil Nadu?',
    a: 'Our profit-first approach means we optimise for real business outcomes — contribution margin, customer acquisition cost, and customer lifetime value — rather than vanity metrics like impressions, reach, and follower counts.',
  },
  {
    q: 'Can Nfinity Partner handle both paid advertising and organic growth?',
    a: 'Yes. We manage performance marketing (Meta Ads, Google Ads), SEO, social media marketing, and content — building a balanced growth system that reduces dependence on any single channel.',
  },
  {
    q: 'Do you offer website development and software services alongside marketing?',
    a: 'Yes. We offer website development, mobile app development, and custom software — all built to support and accelerate your marketing outcomes.',
  },
  {
    q: 'How do I get started with Nfinity Partner?',
    a: 'Book a free strategy call through our website. We will review your current marketing, identify where profit is leaking, and share a clear plan for sustainable growth — no pressure, no obligation.',
  },
];

/* ─── Component ─────────────────────────────────────────────────────────────── */

export default function DigitalMarketingTamilNadu() {
  useSEO({
    title: 'Digital Marketing Agency in Tamil Nadu | Nfinity Partner — Tiruppur',
    description:
      'Nfinity Partner is a profit-first digital marketing agency in Tamil Nadu, headquartered in Tiruppur. We help D2C brands, ecommerce businesses, startups, SMEs, and local businesses across Chennai, Coimbatore, Madurai, and beyond scale profitably.',
  });

  const { data: caseStudies, loading: csLoading, error: csError } = useFetch(
    () => apiClient.get('/case-studies', { featured: true }),
    []
  );

  const servicesRevealRef  = useScrollReveal({ threshold: 0.05 });
  const whyRevealRef       = useScrollReveal({ threshold: 0.05 });
  const processRevealRef   = useScrollReveal({ threshold: 0.05 });

  return (
    <>
      <JsonLd id="dmtn-org" data={organizationSchema()} />
      <JsonLd id="dmtn-faq" data={faqSchema(FAQ_ITEMS)} />
      <JsonLd
        id="dmtn-breadcrumb"
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Digital Marketing Agency in Tamil Nadu', url: '/digital-marketing-agency-in-tamil-nadu' },
        ])}
      />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <SectionHero
        eyebrow="Tamil Nadu's Profit-First Growth Agency"
        eyebrowClassName="border border-glass-border bg-glass-fill px-3 py-1 text-sm leading-[2rem] font-medium tracking-wide text-cyan-glow-400 sm:text-[1.5rem]"
        headline="Digital Marketing Agency in Tamil Nadu."
        subheadline="Helping businesses across Tamil Nadu grow through profit-first digital marketing, branding, and technology solutions."
        primaryCta={{ label: 'Book Your Free Growth Strategy Call', href: '/contact' }}
      />

      {/* ── OUR SERVICES ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-glow-400">What We Do</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white-100 sm:text-4xl">Our Services.</h2>
          <p className="mt-4 text-slate-400">
            End-to-end digital marketing, branding, and technology — everything a growing business in Tamil Nadu
            needs, under one roof.
          </p>
        </div>

        <div ref={servicesRevealRef} className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = Icons[service.icon] || Icons.Sparkles;
            return (
              <div
                key={service.slug}
                className="row-reveal group"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <GlassCard className="flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-electric-blue-400/50 hover:shadow-glow-lg">
                  {/* Icon badge */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-electric-blue-500/10 transition-colors duration-300 group-hover:bg-electric-blue-500/20">
                    <Icon
                      size={24}
                      className="text-electric-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-glow-400"
                    />
                  </div>

                  <h3 className="font-display text-lg font-semibold text-white-100 transition-colors duration-300 group-hover:text-cyan-glow-400">
                    {service.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{service.desc}</p>

                  <div className="mt-5">
                    <Button
                      href={`/services/${service.slug}`}
                      variant="ghost"
                      size="md"
                      withArrow
                      className="!px-0 text-sm text-electric-blue-400 hover:text-cyan-glow-400"
                    >
                      Learn More
                    </Button>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── WHY CHOOSE NFINITY PARTNER ─────────────────────────────────────── */}
      <section className="bg-navy-900 py-14 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-glow-400">Why Us</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white-100 sm:text-4xl">
              Why Choose Nfinity Partner.
            </h2>
            <p className="mt-4 text-slate-400">
              Most agencies chase metrics. We chase profitability — because that's the only number that tells you
              whether your business is actually growing.
            </p>
          </div>

          <div ref={whyRevealRef} className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_ITEMS.map((item, i) => {
              const Icon = Icons[item.icon] || Icons.Sparkles;
              return (
                <div
                  key={item.title}
                  className="row-reveal group"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <GlassCard className="flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-electric-blue-400/50 hover:shadow-glow-lg">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent/10 transition-colors duration-300 group-hover:bg-gradient-accent/20">
                      <Icon
                        size={22}
                        className="text-cyan-glow-400 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="font-display text-base font-semibold text-white-100">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-glow-400">How We Work</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white-100 sm:text-4xl">Our Process.</h2>
          <p className="mt-4 text-slate-400">
            A clear four-stage framework that turns your marketing spend into a compounding profit system.
          </p>
        </div>

        <div ref={processRevealRef} className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = Icons[step.icon] || Icons.Sparkles;
            return (
              <div
                key={step.number}
                className="row-reveal group relative"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <GlassCard className="flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-electric-blue-400/50 hover:shadow-glow-lg">
                  {/* Large step number — decorative */}
                  <span className="font-display text-[3.5rem] font-extrabold leading-none text-gradient-accent opacity-15 transition-opacity duration-300 group-hover:opacity-30">
                    {step.number}
                  </span>

                  <div className="mt-2 mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-electric-blue-500/10 transition-colors duration-300 group-hover:bg-electric-blue-500/20">
                    <Icon
                      size={20}
                      className="text-electric-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-glow-400"
                    />
                  </div>

                  <h3 className="font-display text-base font-semibold text-white-100 transition-colors duration-300 group-hover:text-cyan-glow-400">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
                </GlassCard>

                {/* Connector line between steps on desktop */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute -right-3 top-14 hidden h-px w-6 bg-gradient-to-r from-electric-blue-500/40 to-transparent lg:block"
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CASE STUDIES PREVIEW ───────────────────────────────────────────── */}
      {csLoading && <LoadingState label="Loading case studies..." />}
      {csError && <ErrorState message="Couldn't load case studies right now." />}
      {!csLoading && !csError && (
        <CaseStudyPreview
          title="Real Results. Real Businesses."
          subtitle="Explore how we've helped businesses across Tamil Nadu grow profitably."
          caseStudies={caseStudies || []}
        />
      )}

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <FAQSection title="Frequently Asked Questions" items={FAQ_ITEMS} />

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <CTASection
        headline="Ready to Grow Your Business Profitably?"
        body="Book a free strategy call. We'll review your current marketing, identify where profit is leaking, and share a clear plan for sustainable growth — no pressure, no obligation."
        cta={{ label: 'Book Your Free Growth Strategy Call', href: '/contact' }}
      />
    </>
  );
}
