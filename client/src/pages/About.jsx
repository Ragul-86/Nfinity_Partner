import { useState } from 'react';
import { Target, Eye } from 'lucide-react';
import { useSEO } from '../hooks/useSEO.js';
import { COMPANY_VALUES, FOUNDER } from '../lib/constants.js';
import { JsonLd, organizationSchema, faqSchema } from '../components/shared/JsonLd.jsx';

import { SectionHero } from '../components/sections/SectionHero.jsx';
import { WhyNfinity } from '../components/sections/WhyNfinity.jsx';
import { AwardsSection } from '../components/sections/AwardsSection.jsx';
import { FAQSection } from '../components/sections/FAQSection.jsx';
import { CTASection } from '../components/sections/CTASection.jsx';
import { GlassCard } from '../components/ui/GlassCard.jsx';

const FAQ_ITEMS = [
  {
    q: 'Will I actually work with Suganya, or get handed to a team?',
    a: 'Every account is founder-reviewed; strategy and reporting go through Suganya directly.',
  },
  {
    q: 'What industries does Nfinity Partner specialize in?',
    a: 'D2C and ecommerce brands are the core focus — fashion, retail, education, and select B2B/service brands running LinkedIn outreach.',
  },
  {
    q: 'Why "profit first" instead of the usual growth metrics?',
    a: "Because revenue and Results can both go up while a business gets less healthy. Profit is the metric that can't lie.",
  },
];

export default function About() {
  const [avatarError, setAvatarError] = useState(false);

  useSEO({
    title: 'About Nfinity Partner | Founder-Led, Profit-First D2C Growth Agency',
    description:
      'Meet the founder behind Nfinity Partner and the profit-first philosophy driving ₹50Cr+ in client revenue. Founder-led execution, no junior hand-offs.',
  });

  return (
    <>
      <JsonLd id="about-org" data={organizationSchema()} />
      <JsonLd id="about-faq" data={faqSchema(FAQ_ITEMS)} />

      <SectionHero
        eyebrow="ABOUT NFINITY PARTNER"
        eyebrowClassName="border border-glass-border bg-glass-fill px-3 py-1 text-sm leading-[2rem] font-medium tracking-wide text-cyan-glow-400 sm:text-[1.5rem]"
        headline="Every Business Has A Story. So Does Nfinity."
        subheadline="Nfinity Partner was built on resilience, continuous learning, and a simple belief that businesses deserve growth built on profitability—not just marketing metrics."
        primaryCta={{ label: 'Book A Free Strategy Call', href: '/contact' }}
      />

      {/* Our Story */}
      <section className="mx-auto max-w-4xl px-6 py-14 lg:px-8 lg:py-24">
        <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">Why Nfinity Partner Exists.</h2>
        <div className="mt-6 space-y-5 text-slate-400">
          <p>
            Nfinity Partner was built on a simple belief: businesses deserve more than campaign
            management—they deserve a growth partner.
          </p>
          <p>
            After working with founders across different industries, we realized that many businesses weren't
            struggling because they lacked advertising. They were struggling because marketing decisions were
            disconnected from business outcomes.
          </p>
          <p>
            That's why Nfinity Partner focuses on building profitable growth systems that combine strategy,
            performance marketing, conversion optimization, and data-driven decision making to help brands scale
            with confidence.
          </p>
        </div>
      </section>

      {/* Why Profit First */}
      <section className="bg-navy-900 py-14 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">
            Why We Lead With Profit, Not Results.
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-slate-400">
            <p>
              Many agencies celebrate clicks, impressions, and ROAS. While those metrics are important, they don't
              always reflect the health of a business.
            </p>
            <p>
              At Nfinity Partner, every strategy begins with one question: "Will this improve profitability?" We
              believe sustainable growth comes from increasing profit, improving customer lifetime value, reducing
              acquisition costs, and building systems that continue to perform long after a campaign ends.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Journey */}
      <section className="mx-auto max-w-4xl px-6 py-14 lg:px-8 lg:py-24">
        <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">
          From A Pattern She Couldn't Ignore To A Company Built To Fix It.
        </h2>
        <div className="mt-6 space-y-5 text-slate-400">
          <p>
            Like many women, my career took a pause after becoming a mother of two. During that phase, I wasn't
            looking to build an agency—I was simply looking for an opportunity to rebuild my career.
          </p>
          <p>
            When I entered digital marketing during the COVID period, I started with almost no technical knowledge.
            Even operating a laptop confidently was new to me. But I had something more valuable than experience:
            the willingness to learn.
          </p>
          <p>
            After completing my digital marketing training, opportunities didn't come easily. Instead of waiting for
            the perfect job, I chose to learn by doing. I worked as an intern, took on every challenge, asked
            questions, made mistakes, and gained hands-on experience by working with real businesses.
          </p>
          <p>
            While working closely with founders, Suganya noticed the same challenge repeated across businesses.
          </p>
          <p>
            Marketing agencies were reporting campaign success, yet founders were still struggling with shrinking
            margins, rising customer acquisition costs, and inconsistent growth.
          </p>
          <p>
            That pattern couldn't be ignored. Instead of becoming another agency focused only on advertising, she
            built Nfinity Partner to solve the real business problem—creating profitable, scalable growth through
            strategy, execution, and continuous optimization.
          </p>
          <p>
            My journey taught me that success doesn't come from where you start. It comes from the courage to keep
            learning, the discipline to keep improving, and the determination to create something meaningful. That
            is the mindset we bring to every founder and every brand we work with.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-4 rounded-2xl border border-glass-border bg-glass-fill p-6">
          {FOUNDER.avatar && !avatarError ? (
            <img
              src={FOUNDER.avatar}
              alt={FOUNDER.name}
              loading="lazy"
              decoding="async"
              onError={() => setAvatarError(true)}
              className="h-14 w-14 shrink-0 rounded-full border-2 border-cyan-glow-400/50 object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-accent font-display text-lg font-bold text-navy-950">
              {FOUNDER.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
          )}
          <div>
            <p className="font-display font-semibold text-white-100">{FOUNDER.name}</p>
            <p className="text-sm text-slate-400">{FOUNDER.role}</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2">
          <GlassCard className="p-8">
            <div className="flex items-center gap-3">
              <Target size={28} className="shrink-0 text-cyan-glow-400" aria-hidden="true" />
              <h3 className="font-display text-[2.125rem] font-extrabold tracking-wide text-gradient-accent">
                Mission
              </h3>
            </div>
            <span
              className="mt-3 block h-[3px] w-12 rounded-full bg-gradient-accent shadow-[0_0_10px_rgba(63,224,224,0.55)]"
              aria-hidden="true"
            />
            <p className="mt-4 text-slate-400">
              Help D2C and ecommerce brands increase profitability through performance marketing, CRO, SEO,
              branding, and growth systems.
            </p>
          </GlassCard>
          <GlassCard className="p-8">
            <div className="flex items-center gap-3">
              <Eye size={28} className="shrink-0 text-cyan-glow-400" aria-hidden="true" />
              <h3 className="font-display text-[2.125rem] font-extrabold tracking-wide text-gradient-accent">
                Vision
              </h3>
            </div>
            <span
              className="mt-3 block h-[3px] w-12 rounded-full bg-gradient-accent shadow-[0_0_10px_rgba(63,224,224,0.55)]"
              aria-hidden="true"
            />
            <p className="mt-4 text-slate-400">
              To become India's most trusted profit-first growth partner for ambitious D2C and ecommerce brands —
              proving that scaling responsibly and scaling fast aren't opposites.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Values */}
      <WhyNfinity title="What We Value." items={COMPANY_VALUES} />

      {/* Awards */}
      <div>
        <div className="mx-auto max-w-2xl px-6 pt-8 text-center lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">Recognized Along The Way.</h2>
        </div>
        <AwardsSection
          awards={[
            {
              name: 'Eagle Resilience Award — TN Digital Summit 2026',
              body: 'Recognized for consistent effort, performance excellence, and contribution to digital growth.',
            },
          ]}
          featuredImages={[
            {
              src: '/assets/awards/img1.jpeg',
              alt: 'Nfinity Partner team receiving the Eagle Resilience Award on stage at the TN Digital Summit 2026',
            },
            {
              src: '/assets/awards/img2.jpeg',
              alt: 'Nfinity Partner founder receiving the award during the TN Digital Summit 2026 ceremony',
            },
            {
              src: '/assets/awards/img3.png',
              alt: 'Nfinity Partner team celebrating with the Eagle Resilience Award trophies at TN Digital Summit 2026',
            },
          ]}
        />
      </div>

      <FAQSection title="Frequently Asked Questions" items={FAQ_ITEMS} />

      <CTASection
        headline="Profit First. Revenue Second. Growth Always."
        body="Scaling Profitability Is The Game."
        cta={{ label: 'Book Your Free Strategy Call', href: '/contact' }}
      />
    </>
  );
}
