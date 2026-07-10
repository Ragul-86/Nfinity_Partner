import { useEffect, useRef, useState } from 'react';
import { Award } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard.jsx';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

/* ─── Non-spotlight fallback (no featuredImages) ──────────────────────────── */

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

/* ─── Spotlight image components ──────────────────────────────────────────── */

/**
 * MOBILE-ONLY (lg:hidden).
 *
 * Renders ONE image at a time based on `activeIndex`. All images are
 * absolutely stacked inside a fixed-ratio crop box — opacity/transform
 * transitions handle the crossfade (0.5s ease-out, GPU-composited via
 * will-change). No entrance animation on this component: the sticky
 * section appearing is already the visual event; adding `.award-image-reveal`
 * here would start at opacity:0 and risk never resolving on certain mobile
 * WebViews.
 */
function AwardMobileSingleImage({ images, activeIndex }) {
  return (
    <div className="w-full lg:hidden">
      <div
        className="relative mx-auto w-full overflow-hidden rounded-[24px] border border-[rgba(77,235,255,0.3)] bg-navy-950/40 shadow-[0_0_50px_rgba(77,235,255,0.25),0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-md"
        style={{ aspectRatio: '720 / 470' }}
      >
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
                idx === activeIndex ? 'scale(1) translateY(0px)' : 'scale(0.98) translateY(14px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              willChange: 'opacity, transform',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * DESKTOP-ONLY (hidden lg:block).
 *
 * Same crossfade logic, plus:
 * • `.award-image-reveal` entrance (slide-from-right, once, via IOB)
 * • `cardFloat` continuous gentle float on a separate wrapper node so
 *   neither the entrance transform nor the float ever share a DOM node
 *   with the per-image crossfade transforms.
 */
function AwardSpotlightImage({ images, activeIndex }) {
  const revealRef = useScrollReveal({ threshold: 0.25 });
  return (
    <div ref={revealRef} className="award-image-reveal mx-auto hidden w-full max-w-[720px] lg:block">
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
                  idx === activeIndex ? 'scale(1) translateY(0px)' : 'scale(0.98) translateY(16px)',
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

/* ─── Supporting pieces ───────────────────────────────────────────────────── */

/**
 * Pill indicator (mobile only, lg:hidden).
 * Active dot expands to 24px; inactive dots are 6px circles.
 * Gives users a subtle cue that scrolling advances the image.
 */
function ImageProgressDots({ count, activeIndex }) {
  return (
    <div className="flex items-center justify-center gap-2 lg:hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block h-1.5 rounded-full transition-all duration-500 ease-out"
          style={{
            width: i === activeIndex ? '24px' : '6px',
            backgroundColor:
              i === activeIndex ? 'rgba(77,235,255,0.9)' : 'rgba(77,235,255,0.25)',
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

/* ─── SpotlightLayout ─────────────────────────────────────────────────────── */

/**
 * Premium scroll-storytelling for ALL screen sizes.
 *
 * ─── Mechanics ──────────────────────────────────────────────────────────────
 * Section height = (count + 1) × 100vh (applied via CSS custom property
 * --stage-count to keep the Tailwind arbitrary-value class stable).
 *
 *   scrollableDistance = section.height − viewport.height = count × 100vh
 *   → each of `count` images owns exactly 1 full viewport of scroll time.
 *
 * The sticky div (top:0, h-screen) pins the visible stage while the tall
 * section scrolls beneath it. A rAF-throttled scroll listener maps
 * scroll progress 0→1 to imageIndex 0→(count−1) via Math.floor, triggering
 * the 500ms CSS crossfade on each <img>.
 *
 * Sticky releases when section.bottom === viewport.bottom, i.e. at exactly
 * count×100vh of scroll — the same instant progress hits 1.0. So the FAQ
 * scrolls in immediately with no extra blank gap.
 *
 * ─── Why sticky works here ───────────────────────────────────────────────
 * index.css uses `overflow-x: clip` (not `hidden`) on html/body.
 * `overflow: hidden` creates a scroll container which causes sticky elements
 * to pin relative to that container (which can't scroll) — breaking sticky
 * on iOS Safari. `overflow: clip` visually clips content identically but
 * does NOT create a scroll container, so sticky still pins relative to
 * the window scroll as intended.
 *
 * ─── Mobile layout (flex-col, within viewport) ──────────────────────────
 * SpotlightContent (compact award card) → AwardMobileSingleImage → dots.
 * Estimated total height on 320×568 ≈ 320px — leaves 248px free. ✓
 */
function SpotlightLayout({ awards, featuredImages }) {
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = featuredImages.length;
  const pinned = count > 1;
  const stageCount = count + 1;

  useEffect(() => {
    if (!pinned) return undefined;

    let ticking = false;

    const computeIndex = () => {
      ticking = false;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const scrollable = Math.max(1, rect.height - vh);
      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / scrollable));
      setActiveIndex(Math.min(count - 1, Math.floor(progress * count)));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(computeIndex);
    };

    computeIndex();
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
        pinned ? 'h-[calc(100vh*var(--stage-count))] py-0' : 'py-14 lg:py-24'
      }`}
      style={pinned ? { '--stage-count': stageCount } : undefined}
    >
      {/* Sticky stage — all breakpoints */}
      <div className={pinned ? 'sticky top-0 flex h-screen items-center' : undefined}>
        {/*
         * Mobile  (default, flex-col): text card → mobile image → dots
         * Desktop (lg+, flex-row):     text card ← gap → desktop image
         * AwardMobileSingleImage is `lg:hidden`; AwardSpotlightImage is `hidden lg:block`
         * so only ONE image component is visible per breakpoint — no double-render.
         */}
        <div className="flex w-full flex-col items-center gap-5 sm:gap-7 lg:flex-row lg:items-center lg:justify-center lg:gap-[60px]">
          <SpotlightContent awards={awards} />

          {/* ── Desktop only ── */}
          <AwardSpotlightImage images={featuredImages} activeIndex={activeIndex} />

          {/* ── Mobile only ── */}
          <AwardMobileSingleImage images={featuredImages} activeIndex={activeIndex} />
          {pinned && <ImageProgressDots count={count} activeIndex={activeIndex} />}
        </div>
      </div>
    </section>
  );
}

/* ─── Public export ───────────────────────────────────────────────────────── */

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
