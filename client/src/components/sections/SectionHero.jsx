import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';

/**
 * Partner trust card — Shopify / Meta / GoKwik, shown below the hero CTA
 * buttons (not beside the headline). Fixed-width (270px, within the
 * 260–280px spec) so a plain flex-wrap row reflows on its own: 3-in-a-row
 * once there's room for all of them, 2+1 once space drops below ~870px
 * (3 cards + 2 gaps), and one-per-row on narrow mobile — covering the
 * desktop/tablet/mobile spec without separate breakpoint classes.
 */
function PartnerCard({ logo }) {
  return (
    <div className="flex h-[120px] w-full max-w-[270px] flex-col items-center justify-center rounded-[20px] border border-[rgba(77,235,255,0.25)] bg-glass-fill px-4 shadow-[0_0_24px_rgba(77,235,255,0.18)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-[5px] hover:shadow-[0_0_36px_rgba(77,235,255,0.32)]">
      {/* Fixed-height logo slot: each brand mark has a different natural aspect
          ratio, so capping the <img> alone with max-h left shorter/wider logos
          sitting at a different vertical position than taller ones. Centering
          every image inside this same 40px-tall flex box gives all three cards
          an identical logo baseline regardless of each mark's own proportions. */}
      <div className="flex h-[40px] w-full items-center justify-center">
        <img
          src={logo.src}
          alt={logo.alt}
          loading="lazy"
          decoding="async"
          className="max-h-[40px] max-w-[150px] w-auto object-contain"
        />
      </div>
      <p
        className="text-center font-medium"
        style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.5px', marginTop: '14px' }}
      >
        {logo.alt} Partner
      </p>
    </div>
  );
}

/**
 * Reusable hero used across Home + all inner pages.
 * { eyebrow, headline, subheadline, primaryCta: {label, href}, secondaryCta, visual, size: 'lg'|'md' }
 */
export function SectionHero({
  eyebrow,
  positioningStatement,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  visual,
  partnerLogos,
  size = 'lg',
  eyebrowClassName = '',
  positioningStatementClassName = '',
  headlineClassName = '',
  headlineSizeClassName,
  containerClassName = 'max-w-4xl',
  wrapperMaxWidthClassName = 'max-w-7xl',
  subheadlineClassName = '',
}) {
  const headlineSizeClasses =
    headlineSizeClassName ?? (size === 'lg' ? 'text-4xl sm:text-5xl lg:text-7xl' : 'text-3xl sm:text-4xl lg:text-5xl');
  // If a custom headlineClassName/subheadlineClassName supplies its own top-margin utility,
  // drop the default so the two margins never collide in the compiled stylesheet (Tailwind
  // rule order is independent of className string order, so partial margin overrides aren't reliable).
  const headlineSpacingClass = headlineClassName.includes('mt-') ? '' : 'mt-6';
  const subheadlineSpacingClass = subheadlineClassName.includes('mt-') ? '' : 'mt-6';

  return (
    <section className="relative overflow-hidden bg-gradient-black">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-electric-blue-500/20 blur-[120px]"
        aria-hidden="true"
      />
      <div className={`relative mx-auto px-6 pt-16 pb-10 sm:pt-24 sm:pb-12 lg:px-8 lg:pt-36 lg:pb-12 ${wrapperMaxWidthClassName}`}>
        <div className={`mx-auto text-center ${containerClassName}`}>
          {eyebrow &&
            (eyebrowClassName ? (
              <span className={`inline-flex items-center gap-1.5 rounded-full uppercase ${eyebrowClassName}`}>
                {eyebrow}
              </span>
            ) : (
              <Badge>{eyebrow}</Badge>
            ))}
          {positioningStatement &&
            (positioningStatementClassName ? (
              <p className={positioningStatementClassName}>{positioningStatement}</p>
            ) : (
              <p className="mt-5 text-xl font-bold tracking-wide text-cyan-glow-400 sm:text-2xl">
                {positioningStatement}
              </p>
            ))}
          <h1 className={`${headlineSpacingClass} font-display font-extrabold tracking-tight text-white-100 ${headlineSizeClasses} ${headlineClassName}`}>
            {headline}
          </h1>
          {subheadline && (
            <p className={`mx-auto ${subheadlineSpacingClass} max-w-2xl text-lg text-slate-400 ${subheadlineClassName}`}>
              {subheadline}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {primaryCta && (
                <Button href={primaryCta.href} size="lg" withArrow>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="secondary" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
          {partnerLogos?.length > 0 && (
            <div className="mt-[60px] flex flex-wrap items-start justify-center gap-x-[30px] gap-y-[30px]">
              {partnerLogos.map((logo) => (
                <PartnerCard key={logo.src} logo={logo} />
              ))}
            </div>
          )}
        </div>
        {visual && <div className="mt-16">{visual}</div>}
      </div>
    </section>
  );
}
