import { GlassCard } from '../ui/GlassCard.jsx';

/**
 * Renders a service page's `sections` array (heading/body, ordered) as a
 * vertical stack of glass cards — used by ServiceTemplate for the bulk of
 * each of the 6 service pages.
 */
export function FrameworkSteps({ sections = [] }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="flex flex-col gap-6">
        {sections
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((section, i) => (
            <GlassCard key={section.heading} className="flex gap-6 p-8">
              <span className="font-display font-tabular text-2xl font-bold text-gradient-accent shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-white-100">{section.heading}</h3>
                <p className="mt-3 text-slate-400">{section.body}</p>
              </div>
            </GlassCard>
          ))}
      </div>
    </section>
  );
}
