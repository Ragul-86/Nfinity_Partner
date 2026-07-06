import { Award } from 'lucide-react';
import { FOUNDER } from '../../lib/constants.js';
import { GlassCard } from '../ui/GlassCard.jsx';

/** { story: string } */
export function FounderSection({ story }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <GlassCard className="grid gap-10 p-10 lg:grid-cols-[280px_1fr] lg:p-14">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="relative h-32 w-32">
            {/* Soft cyan glow behind the photo, same color language as the
                rest of the site's glow accents */}
            <div className="absolute inset-0 -z-10 rounded-full bg-cyan-glow-400/30 blur-xl" aria-hidden="true" />
            <img
              src={FOUNDER.avatar}
              alt={FOUNDER.name}
              loading="lazy"
              decoding="async"
              className="h-32 w-32 rounded-full border border-[rgba(77,235,255,0.3)] object-cover shadow-[0_0_30px_rgba(77,235,255,0.35)]"
            />
          </div>
          <p className="mt-5 font-display text-lg font-semibold text-white-100">{FOUNDER.name}</p>
          <p className="text-sm text-slate-400">{FOUNDER.role}</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-cyan-glow-400">
            <Award size={16} />
            <span>{FOUNDER.award}</span>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4 text-slate-400">
          {story.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
