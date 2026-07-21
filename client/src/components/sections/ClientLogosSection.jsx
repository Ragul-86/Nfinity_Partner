import { Button } from '../ui/Button.jsx';

/**
 * "Trusted Growth Partners" — premium two-column client showcase.
 * Left: logo grid (3/row desktop). Right: eyebrow + title + description + CTA,
 * vertically centered against the grid. Stacks on mobile with logos first, content second.
 * { eyebrow, title, subtitle, logos: [{ src, alt }], cta: { label, href } }
 */
export function ClientLogosSection({ eyebrow, title, subtitle, logos = [], cta }) {
  return (
    <section
      aria-label="Brands served by Nfinity Partner, Digital Marketing Agency in Tiruppur"
      className="border-b border-glass-border bg-navy-950"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Logo grid */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {logos.map((logo) => (
              <div
                key={logo.src}
                className="flex h-24 items-center justify-center rounded-2xl bg-[#F5F5F5] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out hover:scale-[1.03] sm:h-28"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="text-left">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-glow-400">
                {eyebrow}
              </p>
            )}
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-white-100 sm:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-5 max-w-md text-base text-slate-400 sm:text-lg">{subtitle}</p>
            )}
            {cta && (
              <div className="mt-8">
                <Button href={cta.href} size="lg" withArrow>
                  {cta.label}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
