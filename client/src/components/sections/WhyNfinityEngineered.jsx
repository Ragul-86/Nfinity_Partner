import { CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

const FEATURE_POINTS = ['Profit-first strategy', 'Founder-led decisions', 'Better retention & LTV', 'Scalable acquisition systems'];

/**
 * Right column: large founder portrait card (~500x600px). A blurred cyan
 * glow sits behind the card on its own layer; the continuous subtle float
 * (CSS keyframe, 3-5px) and the scroll-triggered reveal+scale live on two
 * separate wrapper elements so they never fight over `transform` on the
 * same node (same pattern as AwardSpotlightImage). object-cover with a
 * top-biased focal point keeps the entire face in frame. Hover scale lives
 * on the innermost bordered card only.
 */
function FounderPortraitCard({ image }) {
  const revealRef = useScrollReveal({ threshold: 0.25 });
  return (
    <div ref={revealRef} className="why-engineered-image-reveal relative mx-auto w-full max-w-[500px]">
      {/* Subtle cyan glow behind the card */}
      <div className="absolute inset-6 -z-10 rounded-[28px] bg-cyan-glow-400/20 blur-3xl" aria-hidden="true" />

      <div className="w-full" style={{ animation: 'cardFloatSubtle 5s ease-in-out infinite' }}>
        <div className="relative aspect-[500/600] w-full overflow-hidden rounded-[28px] border border-[rgba(77,235,255,0.3)] bg-navy-950/40 shadow-[0_0_50px_rgba(77,235,255,0.25),0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-md transition-transform duration-300 ease-out hover:scale-[1.02]">
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />

          {/* Optional founder badge */}
          <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-navy-950/70 px-3 py-1 text-xs font-medium tracking-wide text-cyan-glow-400 uppercase backdrop-blur-md">
            Founder &bull; Nfinity Partner
          </span>
        </div>
      </div>
    </div>
  );
}

/** { image: { src, alt } } */
export function WhyNfinityEngineered({ image }) {
  const contentRef = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[13fr_12fr] lg:gap-20">
        <div ref={contentRef} className="reveal">
          <span className="relative inline-flex items-center overflow-hidden rounded-full border border-[rgba(0,255,255,0.35)] bg-[linear-gradient(135deg,rgba(0,255,255,0.08),rgba(0,120,255,0.05))] px-[28px] py-[14px] text-[clamp(18px,1.4vw,20px)] font-bold uppercase tracking-[1px] text-[#43F3FF] shadow-[0_0_20px_rgba(0,255,255,0.25),0_0_40px_rgba(0,255,255,0.10)] backdrop-blur-[12px]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{ animation: 'badgeGlowSweep 4.5s ease-in-out infinite' }}
            />
            <span className="relative">Why Nfinity Partner</span>
          </span>
          <h2 className="mt-5 font-display text-[44px] font-extrabold leading-[1.05] tracking-tight text-white-100 sm:text-[52px] sm:leading-[1.0] lg:text-[clamp(72px,6vw,88px)] lg:leading-[0.97]">
            Because Profit
            <br />
            Isn&apos;t Luck.
            <br />
            It&apos;s Engineered.
          </h2>
          <p className="mt-6 max-w-[600px] text-base text-slate-300 sm:text-lg lg:mt-10 lg:text-[28px]">
            We don&apos;t optimize for vanity metrics.
            <br />
            We build profitable growth systems that scale.
          </p>
          <ul className="mt-6 flex flex-col gap-4 sm:gap-7">
            {FEATURE_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-4 text-lg font-semibold leading-snug text-white-100 sm:text-2xl lg:text-[30px]">
                <CheckCircle2 size={26} className="shrink-0 text-cyan-glow-400" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <FounderPortraitCard image={image} />
      </div>
    </section>
  );
}
