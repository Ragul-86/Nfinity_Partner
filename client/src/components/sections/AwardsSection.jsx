import { useEffect, useRef, useState } from 'react';
import { Award } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard.jsx';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

/**
 * Single stacked award photo: floats continuously (CSS keyframe on the outer
 * wrapper) and scales up on hover (Tailwind, on the inner card). The float
 * keyframe and the hover scale live on different elements so they never fight
 * over the same `transform` property on the same node. The image uses
 * object-contain (never cover) so the full, uncropped photo is always
 * visible, letterboxed against the glass background and centered via
 * object-fit's default centering.
 */
function AwardImageCard({ image, index }) {
  return (
    <div
      className="h-[150px] w-full sm:h-[160px]"
      style={{ animation: 'cardFloat 4.6s ease-in-out infinite', animationDelay: `${index * 0.5}s` }}
    >
      <div className="h-full w-full overflow-hidden rounded-[24px] border border-[rgba(77,235,255,0.25)] bg-white/5 p-4 shadow-[0_0_24px_rgba(77,235,255,0.18)] backdrop-blur-md transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_0_44px_rgba(77,235,255,0.45)]">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

/**
 * The premium award-photo card for the spotlight layout. Holds every
 * supplied photo stacked on top of each other inside one fixed 720×470
 * frame (capped fluidly below that via aspect-ratio); `activeIndex` (driven
 * by the parent's scroll-progress tracking, see SpotlightLayout) decides
 * which one is cross-dissolved into view. object-contain keeps every photo
 * fully visible, never cropped. The reveal-from-right entrance (opacity
 * 0→1, translateX 100px→0, scale 0.9→1, 1s, once) and the gentle continuous
 * float live on two separate wrapper elements so neither ever fights the
 * crossfade — or each other — over the same CSS property on the same node.
 */
function AwardSpotlightImage({ images, activeIndex }) {
  const revealRef = useScrollReveal({ threshold: 0.25 });
  return (
    <div ref={revealRef} className="award-image-reveal mx-auto w-full max-w-[720px]">
      <div className="w-full" style={{ animation: 'cardFloat 6s ease-in-out infinite' }}>
        <div className="relative aspect-[720/470] w-full overflow-hidden rounded-[24px] border border-[rgba(77,235,255,0.3)] bg-navy-950/40 shadow-[0_0_50px_rgba(77,235,255,0.25),0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-md">
          {images.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-out"
              style={{ opacity: index === activeIndex ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SpotlightAwardCard({ award }) {
  return (
    <GlassCard className="flex flex-col items-center gap-4 p-7 text-center sm:flex-row sm:items-start sm:text-left">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-electric-blue-500/10">
        <Award size={24} className="text-cyan-glow-400" />
      </div>
      <div>
        <h3 className="font-display font-semibold text-white-100">{award.name}</h3>
        <p className="mt-1 text-sm text-slate-400">{award.body}</p>
      </div>
    </GlassCard>
  );
}

/** Left column: award text, vertically centered, fades up once on scroll. */
function SpotlightContent({ awards }) {
  const ref = useScrollReveal({ threshold: 0.2 });
  return (
    <div ref={ref} className="reveal flex w-full flex-col justify-center gap-6 lg:max-w-md">
      {awards.map((award) => (
        <SpotlightAwardCard key={award.name} award={award} />
      ))}
    </div>
  );
}

/**
 * Desktop (lg+) only: the whole stage (text + image) is pinned to the
 * viewport (`lg:sticky lg:top-0`) inside a section that's made tall enough
 * — `100vh × number of photos` — to give scrolling room. While the user
 * scrolls through that extra height the stage doesn't move at all ("antha
 * edathula display scroll aaga koodathu"); a scroll listener only swaps
 * which photo is showing. Once the user has scrolled past all of them, the
 * section's own height runs out, the sticky stage naturally un-pins, and
 * the page continues straight into whatever comes next ("3 image scroll
 * aaye mudichathum next move aaganum") — no extra JS needed for that part,
 * it's just how `position: sticky` behaves once its container ends.
 * Below `lg`, none of this applies — plain stacked layout, content above
 * image, both in normal flow (no pinning, no scroll-jacking on small/touch
 * screens).
 */
function SpotlightLayout({ awards, featuredImages }) {
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = featuredImages.length;
  const pinned = count > 1;

  useEffect(() => {
    if (!pinned) return undefined;

    let ticking = false;

    const computeActiveIndex = () => {
      ticking = false;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollableDistance = Math.max(1, rect.height - viewportHeight);
      const scrolledIntoWrapper = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolledIntoWrapper / scrollableDistance));
      const index = Math.min(count - 1, Math.floor(progress * count));
      setActiveIndex(index);
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(computeActiveIndex);
    };

    computeActiveIndex();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pinned, count]);

  return (
    <section
      ref={wrapperRef}
      className={`relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-24 ${
        pinned ? 'lg:h-[calc(100vh*var(--stage-count))] lg:py-0' : ''
      }`}
      style={pinned ? { '--stage-count': count } : undefined}
    >
      <div className={pinned ? 'lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center' : ''}>
        <div className="flex w-full flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-[60px]">
          <SpotlightContent awards={awards} />
          <AwardSpotlightImage images={featuredImages} activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
}

/** { awards: [{ name, body }], images: [{ src, alt }], featuredImages: [{ src, alt }] } */
export function AwardsSection({ awards = [], images = [], featuredImages = [] }) {
  if (featuredImages.length > 0) {
    return <SpotlightLayout awards={awards} featuredImages={featuredImages} />;
  }

  const awardCards = awards.map((award) => (
    <GlassCard key={award.name} className="flex items-start gap-4 p-7">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-electric-blue-500/10">
        <Award size={24} className="text-cyan-glow-400" />
      </div>
      <div>
        <h3 className="font-display font-semibold text-white-100">{award.name}</h3>
        <p className="mt-1 text-sm text-slate-400">{award.body}</p>
      </div>
    </GlassCard>
  ));

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-24">
      {images.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-6">{awardCards}</div>
          <div className="flex flex-col gap-6">
            {images.map((image, index) => (
              <AwardImageCard key={image.src} image={image} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">{awardCards}</div>
      )}
    </section>
  );
}
