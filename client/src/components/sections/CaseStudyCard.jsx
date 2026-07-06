import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard.jsx';
import { Badge } from '../ui/Badge.jsx';

export function CaseStudyCard({ caseStudy }) {
  return (
    <Link to={`/case-studies/${caseStudy.slug}`} className="group block h-full">
      <GlassCard className="flex h-full flex-col gap-4 p-7 transition-all duration-200 group-hover:scale-[1.02] group-hover:border-electric-blue-400/50">
        <Badge>{caseStudy.industry}</Badge>
        <p className="font-display font-tabular text-3xl font-extrabold text-gradient-accent">
          {caseStudy.heroMetric}
        </p>
        <h3 className="font-display text-lg font-semibold text-white-100">{caseStudy.clientName}</h3>
        <p className="text-sm text-slate-400">{caseStudy.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-electric-blue-400 group-hover:text-cyan-glow-400">
          Read the case study <ArrowUpRight size={16} />
        </span>
      </GlassCard>
    </Link>
  );
}
