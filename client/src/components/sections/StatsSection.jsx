import { useCountUp } from '../../hooks/useCountUp.js';

function StatItem({ value, prefix = '', suffix = '', label }) {
  const [ref, count] = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <p className="font-display font-tabular text-4xl font-extrabold text-gradient-accent sm:text-5xl">
        {prefix}{count}{suffix}
      </p>
      <p className="mt-2 text-sm text-slate-400">{label}</p>
    </div>
  );
}

/** { stats: [{ value, prefix, suffix, label }] } */
export function StatsSection({ stats }) {
  return (
    <section className="border-y border-glass-border bg-navy-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-3 lg:px-8">
        {stats.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
