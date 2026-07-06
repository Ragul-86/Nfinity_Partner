import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard.jsx';

function ServiceIcon({ name }) {
  const Icon = Icons[name] || Icons.Sparkles;
  return <Icon size={28} className="text-cyan-glow-400" />;
}

/** { services: [{ name, slug, icon, shortDescription }] } */
export function ServicesGrid({ services = [] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Link key={service.slug} to={`/services/${service.slug}`} className="group block h-full">
          <GlassCard className="flex h-full flex-col gap-4 p-7 transition-all duration-200 group-hover:scale-[1.02] group-hover:border-electric-blue-400/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric-blue-500/10">
              <ServiceIcon name={service.icon} />
            </div>
            <h3 className="font-display text-lg font-semibold text-white-100">{service.name}</h3>
            <p className="text-sm text-slate-400">{service.shortDescription}</p>
            <span className="mt-auto text-sm font-medium text-electric-blue-400 group-hover:text-cyan-glow-400">
              Learn more →
            </span>
          </GlassCard>
        </Link>
      ))}
    </div>
  );
}
