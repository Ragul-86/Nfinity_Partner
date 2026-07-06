import { CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard.jsx';

/** { title, subtitle, items: [{ title, description }] } */
export function WhyNfinity({ title = 'Why Nfinity', subtitle, items = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-4 text-slate-400">{subtitle}</p>}
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <GlassCard key={item.title} className="p-6">
            <CheckCircle2 size={22} className="text-success-green" />
            <h3 className="mt-4 font-display font-semibold text-white-100">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{item.description}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
