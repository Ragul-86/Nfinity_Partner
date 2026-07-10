import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard.jsx';

/** { testimonials: [{ clientName, role, brandName, quote }] } */
export function TestimonialSlider({ testimonials = [] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [paused, testimonials.length]);

  if (testimonials.length === 0) return null;
  const current = testimonials[index];

  return (
    <section className="mx-auto max-w-4xl px-6 py-14 lg:px-8 lg:py-24">
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
          setPaused(true);
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(dx) < 40) return; // ignore micro-taps
          if (dx < 0) setIndex((i) => (i + 1) % testimonials.length);
          else setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
          setPaused(false);
        }}
      >
        <GlassCard className="p-6 text-center sm:p-10">
          <Quote size={32} className="mx-auto text-cyan-glow-400" />
          <p className="mt-6 text-lg text-white-100">"{current.quote}"</p>
          <p className="mt-6 font-display font-semibold text-white-100">{current.clientName}</p>
          <p className="text-sm text-slate-400">
            {current.role}, {current.brandName}
          </p>
        </GlassCard>

        {testimonials.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              aria-label="Previous testimonial"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="rounded-full border border-glass-border p-2 text-white-100 hover:text-cyan-glow-400"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.clientName + i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === index ? 'bg-cyan-glow-400' : 'bg-glass-border'
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next testimonial"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="rounded-full border border-glass-border p-2 text-white-100 hover:text-cyan-glow-400"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
