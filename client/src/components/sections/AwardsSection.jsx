import { useEffect, useRef, useState } from 'react';
import { Award } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard.jsx';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

/**
 * Simple stacked award photo card — used by the non-spotlight (no featuredImages) layout.
 * Continuous float keyframe on outer wrapper, hover scale on inner card, on separate
 * nodes so they never fight over the same transform property.
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
 * Mobile-only: one image inside a glass frame with its own IntersectionObserver
 * scroll-reveal (the `.reveal` CSS class: opacity 0→1, translateY 16px→0, 700ms
 * ease-out). Each `AwardMobileImage` instance watches its own element independently,
 * so images appear sequentially as the user scrolls — natural visual stagger, no
 * manual delay needed.
 */
function AwardMobileImage({ image, index }) {
  const revealRef = useScrollReveal({ threshold: 0.15 });
  return (
    <div
      ref={revealRef}
      className="reveal relative aspect-[720/470] w-full overflow-hidden rounded-[24px] border border-[rgba(77,235,255,0.3)] bg-navy-950/40 shadow-[0_0_50px_rgba(77,235,255,0.25),0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-md"
    >
      <img
        src={image.src}
        alt={image.alt}
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-contain"
      />
    </div>
  );
}

/**
 * Mobile layout (hidden at lg+): all award images rendered as vertically-stacked
 * glass cards, each with its own scroll-reveal entrance. Replaces the scroll-driven
 * crossfade approach on small screens where the section is too short relative to the
 * viewport for scroll-progress-based switching to feel natural.
 */
function AwardMobileStack({ images }) {
  return (
    <div className="flex w-full flex-col gap-6 lg:hidden">
      {images.map((image, i) => (
        <AwardMobileImage key={image.src} image={image} index={i} />
      ))}
    </div>
  );
}

/**
 * Desktop/tablet (hidden below lg): single fixed-aspect-ratio frame where all images
 * are stacked via `position: absolute`; `activeIndex` (driven by scroll progress in
 * SpotlightLayout) crossfades the visible photo with:
 *   • opacity 0 ↔ 1
 *   • scale 0.98 → 1
 *   • translateY 16px → 0
 *   • 500ms ease-out, will-change for GPU compositing
 *
 * The reveal-from-right entrance (.award-image-reveal CSS) and the continuous gentle
 * float live on two separate outer wrapper elements so neither ever contends with the
 * crossfade styles on the same node.
 */
function AwardSpotlightImage({ images, activeIndex }) {
  const revealRef = useScrollReveal({ threshold: 0.25 });
  return (
    <div ref={revealRef} className="award-image-reveal mx-auto hidden w-full max-w-[720px] lg:block">
      <div className="w-full" style={{ animation: 'cardFloat 6s ease-in-out infinite' }}>
        <div className="relative aspect-[720/470] w-full overflow-hidden rounded-[24px] border border-[rgba(77,235,255,0.3)] bg-navy-950/40 shadow-[0_0_50px_rgba(77,235,255,0.25),0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-md">
          {images.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain"
              style={{
                opacity: index === activeIndex ? 1 : 0,
                transform: index === activeIndex
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

/** Left column: award text card, vertically centered, fades up once on scroll. */
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
 * SpotlightLayout — premium scroll-storytelling container.
 *
 * ─── Desktop / Tablet (lg+) ────────────────────────────────────────────────
 * Section height = (count + 1) × 100vh.
 *   scrollableDistance = (count + 1 − 1) × 100vh = count × 100vh
 *   → each of the `count` images receives exactly 1 full viewport height of
 *     dedicated scroll time before the next crossfade fires.
 *
 * The sticky stage (text + image) is pinned to `top: 0` while the oversized
 * section scrolls beneath it. A rAF-throttled scroll listener maps progress
 * 0 → 1 to image index 0 → count−1 via Math.floor, and the 500ms CSS
 * transition on each image creates the smooth crossfade.
 *
 * Sticky math: the sticky element un-sticks when its bottom (sticky_top +
 * h-screen) reaches the containing section's bottom. With section height =
 * (count+1)×100vh and h-screen = 100vh, that happens at exactly
 * count×100vh of scroll — precisely when progress reaches 1.0. This means
 * the section ends at the same moment sticky releases: zero extra blank
 * space, the FAQ scrolls in immediately.
 *
 * ─── Mobile (below lg) ──────────────────────────────────────────────────────
 * No sticky pinning, no scroll-driven switching. The award card is shown
 * first; all three images follow as vertically-stacked cards, each with its
 * own IntersectionObserver scroll-reveal. Images appear sequentially as the
 * user scrolls — storytelling feel without scroll-jacking on touch screens.
 */
function SpotlightLayout({ awards, featuredImages }) {
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = featuredImages.length;
  const pinned = count > 1;

  // (count + 1) stages → 1 full viewport per image on desktop.
  const stageCount = count + 1;

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
      className={`relative mx-auto max-w-7xl px-6 pt-14 pb-0 lg:px-8 lg:py-24 ${
        pinned ? 'lg:h-[calc(100vh*var(--stage-count))] lg:py-0' : ''
      }`}
      style={pinned ? { '--stage-count': stageCount } : undefined}
    >
      <div className={pinned ? 'lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center' : ''}>
        <div className="flex w-full flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-[60px]">
          <SpotlightContent awards={awards} />
          {/* Desktop: scroll-driven crossfade — hidden on mobile */}
          <AwardSpotlightImage images={featuredImages} activeIndex={activeIndex} />
          {/* Mobile: all images stacked, each scroll-reveals independently */}
          <AwardMobileStack images={featuredImages} />
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
