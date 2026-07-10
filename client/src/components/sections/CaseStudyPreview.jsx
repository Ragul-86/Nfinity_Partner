import { Link } from 'react-router-dom';
import { CaseStudyCard } from './CaseStudyCard.jsx';
import { Button } from '../ui/Button.jsx';

/** { title, subtitle, caseStudies: [] } */
export function CaseStudyPreview({ title = 'Real Results, Real Brands', subtitle, caseStudies = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-4 text-slate-400">{subtitle}</p>}
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((cs) => (
          <CaseStudyCard key={cs.slug} caseStudy={cs} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button href="/case-studies" variant="secondary" withArrow>
          View All Case Studies
        </Button>
      </div>
    </section>
  );
}
