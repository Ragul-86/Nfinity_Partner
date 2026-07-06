import { useParams, Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO.js';
import { useFetch } from '../hooks/useFetch.js';
import { apiClient } from '../lib/apiClient.js';
import { JsonLd, breadcrumbSchema } from '../components/shared/JsonLd.jsx';
import { LoadingState, ErrorState } from '../components/shared/PageState.jsx';

import { Badge } from '../components/ui/Badge.jsx';
import { GlassCard } from '../components/ui/GlassCard.jsx';
import { FrameworkSteps } from '../components/sections/FrameworkSteps.jsx';
import { MoreFashionWins } from '../components/sections/MoreFashionWins.jsx';
import { CTASection } from '../components/sections/CTASection.jsx';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const { data: caseStudy, loading, error } = useFetch(() => apiClient.get(`/case-studies/${slug}`), [slug]);

  useSEO({
    title: caseStudy?.seo?.title || caseStudy?.title || 'Case Study',
    description: caseStudy?.seo?.description || caseStudy?.summary,
  });

  if (loading) return <LoadingState label="Loading case study..." />;
  if (error || !caseStudy) {
    return (
      <div className="py-32 text-center">
        <ErrorState message="We couldn't find that case study." />
        <Link to="/case-studies" className="mt-4 inline-block text-sm font-medium text-electric-blue-400 hover:text-cyan-glow-400">
          ← Back to all case studies
        </Link>
      </div>
    );
  }

  const sections = [
    { heading: 'Challenge', body: caseStudy.challenge, order: 1 },
    { heading: 'Strategy', body: caseStudy.strategy, order: 2 },
    { heading: 'Execution', body: caseStudy.execution, order: 3 },
    { heading: 'Results', body: caseStudy.results, order: 4 },
  ];

  return (
    <>
      <JsonLd
        id="case-study-breadcrumb"
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Case Studies', url: '/case-studies' },
          { name: caseStudy.clientName, url: `/case-studies/${caseStudy.slug}` },
        ])}
      />

      <section className="relative overflow-hidden bg-gradient-black">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-electric-blue-500/20 blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center lg:px-8 lg:py-32">
          <Badge>{caseStudy.industry}</Badge>
          <p className="mt-6 font-display font-tabular text-5xl font-extrabold text-gradient-accent sm:text-6xl">
            {caseStudy.heroMetric}
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold text-white-100 sm:text-4xl">{caseStudy.clientName}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-slate-400">{caseStudy.summary}</p>
        </div>
      </section>

      <FrameworkSteps sections={sections} />

      {caseStudy.metrics?.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudy.metrics.map((m) => (
              <GlassCard key={m.label} className="p-6 text-center">
                <p className="text-xs uppercase tracking-wide text-slate-400">{m.label}</p>
                <p className="mt-3 font-display text-2xl font-bold text-white-100">
                  {m.before && <span className="text-slate-400 line-through">{m.before}</span>}
                  {m.before && ' → '}
                  <span className="text-gradient-accent">{m.after}</span>
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      )}

      {caseStudy.slug === 'fashion-maternity-wear' && <MoreFashionWins />}

      <CTASection
        headline={`Want A Result Like ${caseStudy.heroMetric.split(' ')[0]} For Your Brand?`}
        body="Book your free profit audit and find out what a profit-first system looks like for your numbers."
        cta={{ label: 'Book Your Free Profit Audit', href: '/contact' }}
      />

      <div className="pb-16 text-center">
        <Link to="/case-studies" className="text-sm font-medium text-electric-blue-400 hover:text-cyan-glow-400">
          ← Back to all case studies
        </Link>
      </div>
    </>
  );
}
