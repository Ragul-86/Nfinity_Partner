import { Button } from '../ui/Button.jsx';

/** { headline, body, cta: { label, href }, variant: 'band'|'inline' } */
export function CTASection({ headline, body, cta = { label: 'Get A Free Audit', href: '/contact' } }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-accent px-5 py-10 text-center sm:px-8 sm:py-16 lg:px-16">
        <h2 className="font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">{headline}</h2>
        {body && <p className="mx-auto mt-4 max-w-xl text-navy-900/80">{body}</p>}
        <div className="mt-8">
          <Button href={cta.href} variant="secondary" size="lg" withArrow className="!bg-navy-950 !border-navy-950 !text-white-100 hover:!bg-navy-900">
            {cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
