import { useEffect, useRef, useState } from 'react';
import { Award } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard.jsx';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

/**
 * Simple floating award photo card — used by the fallback (no featuredImages) layout.
 * Float animation on outer wrapper, hover scale on inner so neither fights the other's
 * transform property.
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
 * Unified crossfade image frame — active on ALL screen sizes.
 *
 * All images are absolutely-stacked inside a fixed-ratio container.
 * `activeIndex` drives which photo is visible via inline opacity/transform.
 * Three separate wrapper nodes keep concerns isolated:
 *   1. outer  → `.award-image-reveal` entrance (slide-from-right, fires once)
 *   2. middle → continuous `cardFloat` keyframe animation
 *   3. inner  → `position: relative; aspect-ratio` crop/layout frame
 *   4. <img>  → per-image crossfade (opacity + scale + translateY, 500ms)
 * No two animated properties ever share the same DOM node.
 */
function AwardCrossfadeImage({ images, activeIndex }) {
  const revealRef = useScrollReveal({ threshold: 0.15 });
  return (
    <div
      ref={revealRef}
      className="award-image-reveal w-full max-w-[calc(100vw-48px)] lg:max-w-[720px]"
    >
      <div className="w-full" style={{ animation: 'cardFloat 6s ease-in-out infinite' }}>
        <div className="relative aspect-[720/470] w-full overflow-hidden rounded-[24px] border border-[rgba(77,235,255,0.3)] bg-navy-950/40 shadow-[0_0_50px_rgba(77,235,255,0.25),0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-md">
          {images.map((image, idx) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain"
              style={{
                opacity: idx === activeIndex ? 1 : 0,
                transform:
                  idx === activeIndex
                    ? 'scale(1) translateY(0px)'
                    : 'scale(0.98) translateY(16px)',
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                willChange: 'opacity, transform',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Mobile-only scroll-progress indicator (lg:hidden).
 * Pill dots: active dot widens to 24px, inactive dots are 6px circles.
 * Gives users a visual cue that scrolling advances the image.
 */
function ImageProgressDots({ count, activeIndex }) {
  return (
    <div className="flex items-center justify-center gap-2 pt-1 lg:hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="block h-1.5 rounded-full transition-all duration-500 ease-out"
          style={{
            width: i === activeIndex ? '24px' : '6px',
            backgroundColor:
              i === activeIndex
                ? 'rgba(77,235,255,0.9)'
                : 'rgba(77,235,255,0.25)',
          }}
        />
      ))}
    </div>
  );
}

function SpotlightAwardCard({ award }) {
  return (
    <GlassCard className="flex flex-col items-center gap-3 p-5 text-center sm:flex-row sm:items-start sm:p-6 sm:text-left">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric-blue-500/10 sm:h-12 sm:w-12">
        <Award size={20} className="text-cyan-glow-400" />
      </div>
      <div>
        <h3 className="font-display text-sm font-semibold text-white-100 sm:text-base">
          {award.name}
        </h3>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm">{award.body}</p>
      </div>
    </GlassCard>
  );
}

/** Award text column — vertically centered, fades up once on scroll. */
function SpotlightContent({ awards }) {
  const ref = useScrollReveal({ threshold: 0.2 });
  return (
    <div ref={ref} className="reveal flex w-full flex-col justify-center gap-4 lg:max-w-md lg:gap-6">
      {awards.map((award) => (
        <SpotlightAwardCard key={award.name} award={award} />
      ))}
    </div>
  );
}

/**
 * SpotlightLayout — premium scroll-storytelling on EVERY screen size.
 *
 * ─── How it works (mobile AND desktop) ────────────────────────────────────
 * Section height = (count + 1) × 100vh.
 *   scrollableDistance = count × 100vh
 *   → each of `count` images gets exactly 1 full viewport of scroll time.
 *
 * `position: sticky; top: 0` pins the visible stage (text + image) while
 * the oversized section scrolls beneath it. A rAF-throttled scroll listener
 * maps progress 0→1 to imageIndex 0→(count−1) via Math.floor; the 500ms
 * CSS transitions on each <img> produce the smooth crossfade.
 *
 * Sticky math: the sticky element releases when its bottom (top=0 + h-screen)
 * reaches the section's bottom. With section = (count+1)×100vh and
 * h-screen = 100vh, this happens at exactly count×100vh of scroll — the
 * same moment progress hits 1.0. No blank gap before the FAQ.
 *
 * ─── Mobile layout within the sticky viewport ─────────────────────────────
 * flex-col: award text card (compact) → full-width crossfade image → dots.
 * Total content on 320px × 568px ≈ 330px → fits with 238px to spare.
 * `overflow: hidden` on the sticky container prevents any edge-case spillover.
 */
function SpotlightLayout({ awards, featuredImages }) {
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = featuredImages.length;
  const pinned = count > 1;
  const stageCount = count + 1; // 1 full viewport of scroll per image

  useEffect(() => {
    if (!pinned) return undefined;

    let ticking = false;

    const computeActiveIndex = () => {
      ticking = false;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const scrollableDistance = Math.max(1, rect.height - vh);
      const scrolledIn = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolledIn / scrollableDistance));
      const index = Math.min(count - 1, Math.floor(progress * count));
      setActiveIndex(index);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(computeActiveIndex);
    };

    computeActiveIndex();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pinned, count]);

  return (
    <section
      ref={wrapperRef}
      className={`relative mx-auto max-w-7xl px-6 lg:px-8 ${
        pinned
          ? 'h-[calc(100vh*var(--stage-count))] py-0'
          : 'py-14 lg:py-24'
      }`}
      style={pinned ? { '--stage-count': stageCount } : undefined}
    >
      {/* Sticky stage — active on ALL breakpoints when pinned */}
      <div
        className={
          pinned
            ? 'sticky top-0 flex h-screen items-center overflow-hidden'
            : undefined
        }
      >
        {/*
         * Mobile  (flex-col): SpotlightContent → AwardCrossfadeImage → dots
         * Desktop (flex-row): SpotlightContent ← gap → AwardCrossfadeImage
         */}
        <div className="flex w-full flex-col items-center gap-5 sm:gap-7 lg:flex-row lg:items-center lg:justify-center lg:gap-[60px]">
          <SpotlightContent awards={awards} />
          <AwardCrossfadeImage images={featuredImages} activeIndex={activeIndex} />
          {pinned && <ImageProgressDots count={count} activeIndex={activeIndex} />}
        </div>
      </div>
    </section>
  );
}

/** Public export — spotlight layout when `featuredImages` is provided, basic otherwise. */
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
