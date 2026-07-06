import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard.jsx';
import { Badge } from '../ui/Badge.jsx';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

// Verbatim content for the "More Fashion Wins" subsection — sits only on the
// Fashion case study detail page, directly below the main case study content.
const MORE_FASHION_WINS = [
  {
    category: 'Maternity Wear',
    result: '18X Peak Return',
    description:
      'A maternity-wear brand was running Meta Ads with inconsistent returns and no clear creative testing process. A structured creative-testing system and conversion-focused campaign architecture took peak return on ad spend to 18X.',
  },
  {
    category: 'Saree Brand',
    result: '10X Peak Return',
    description:
      'A saree brand struggled with inconsistent performance and low returns. Through structured creative testing and offer optimization, the brand achieved a peak return of 10X.',
  },
  {
    category: 'Saree Brand',
    result: '39X Peak Return',
    description:
      'A saree brand wanted profitable scaling without increasing acquisition costs. Through performance creatives, offer testing, and conversion-focused campaigns, the brand achieved a peak return of 39X.',
  },
  {
    category: 'Fashion Brand',
    result: '9X Peak Return',
    description:
      'A fashion brand improved campaign performance through creative optimization, audience refinement, and conversion-focused marketing, achieving a peak return of 9X.',
  },
];

/**
 * "One featured success story + multiple additional fashion wins."
 *
 * Reuses the existing card visual language (GlassCard + Badge + the same
 * hover scale/glow used on CaseStudyCard) and the same useScrollReveal
 * entrance animation used throughout the rest of the site. No new styles,
 * colors, or animations are introduced — only smaller versions of the
 * existing case-study card pattern.
 */
export function MoreFashionWins() {
  const revealRef = useScrollReveal({ threshold: 0.15 });

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
      <div ref={revealRef} className="reveal">
        <h2 className="text-center font-display text-2xl font-bold text-white-100 sm:text-3xl">
          More Fashion Wins
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {MORE_FASHION_WINS.map((win) => (
            <Link key={win.category + win.result} to="/case-studies" className="group block h-full">
              <GlassCard className="flex h-full flex-col gap-3 p-6 transition-all duration-200 group-hover:scale-[1.02] group-hover:border-electric-blue-400/50">
                <Badge>{win.category}</Badge>
                <p className="font-display font-tabular text-2xl font-extrabold text-gradient-accent">{win.result}</p>
                <p className="text-sm text-slate-400">{win.description}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-electric-blue-400 group-hover:text-cyan-glow-400">
                  Read the case study <ArrowUpRight size={16} />
                </span>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
