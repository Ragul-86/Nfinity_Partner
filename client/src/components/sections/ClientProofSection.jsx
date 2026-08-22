/**
 * ClientProofSection — "Before Nfinity → After Nfinity" premium proof section.
 *
 * Screenshot mapping (files in /public/assets/proof/):
 *   Client 01  before → Deepa boutique 03 before.png
 *   Client 01  after  → Deepa boutique 01 after.png
 *   Client 02  before → Temple1 before.png
 *   Client 02  after  → Temple2 after.png
 *   Client 03  before → klin space 01 before.png
 *   Client 03  after  → klin space 04 after.png
 *   Client 04  before → Thugiil 03 before.png
 *   Client 04  after  → Thugiil 02 after.png
 *
 * Growth values calculated from actual numbers only. No invented data.
 * Conversion rate growth expressed in percentage points (pp), not ratio %.
 */

import { GlassCard } from '../ui/GlassCard.jsx';

/* ─── Screenshot grid ─────────────────────────────────────────────────────────
   Supports 1 or 2 screenshots. 2 → side-by-side on sm+. 1 → full width.     */
function ScreenshotGrid({ screenshots, altPrefix, eager }) {
  if (!screenshots?.length) return null;
  const multi = screenshots.length > 1;
  return (
    <div className={multi ? 'grid grid-cols-1 gap-4 sm:grid-cols-2' : 'w-full'}>
      {screenshots.map((src, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-glass-border bg-navy-900 shadow-glow"
        >
          <img
            src={src}
            alt={`${altPrefix} ${i + 1}`}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className="block h-auto w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

/* ─── Divider with centred label ─────────────────────────────────────────────  */
function Divider({ children, accent = false }) {
  const line = accent ? 'bg-electric-blue-400/20' : 'bg-glass-border';
  const text = accent ? 'text-cyan-glow-400' : 'text-slate-500';
  return (
    <div className="flex items-center gap-4">
      <span className={`block h-px flex-1 ${line}`} />
      <span className={`text-[9px] font-black uppercase tracking-[0.25em] ${text}`}>
        {children}
      </span>
      <span className={`block h-px flex-1 ${line}`} />
    </div>
  );
}

/* ─── Transformation connector ───────────────────────────────────────────────  */
function TransformationBridge() {
  return (
    <div className="flex flex-col items-center gap-0 py-8">
      <div className="h-8 w-px bg-gradient-to-b from-transparent to-electric-blue-400/30" />
      <div className="flex items-center gap-5 rounded-full border border-electric-blue-400/15 bg-navy-950/80 px-8 py-3.5 backdrop-blur-sm">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-glow-400">
          Nfinity Partner
        </span>
        <span className="text-electric-blue-400/25">|</span>
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-widest text-slate-500">
          <span>Strategy</span>
          <span className="text-electric-blue-400/25">·</span>
          <span>Execution</span>
          <span className="text-electric-blue-400/25">·</span>
          <span>Optimization</span>
        </div>
      </div>
      <div className="h-8 w-px bg-gradient-to-b from-electric-blue-400/30 to-transparent" />
    </div>
  );
}

/* ─── Metric card ─────────────────────────────────────────────────────────────
   growth strings that start with '+' → green, '-' → red, else → slate.
   isRate = true → shows "percentage points" sub-label (except "Unchanged").   */
function MetricCard({ label, before, after, growth, isRate = false }) {
  const isPos = growth.startsWith('+');
  const isNeg = growth.startsWith('-');
  const growthColor = isPos
    ? 'text-emerald-400'
    : isNeg
    ? 'text-rose-400'
    : 'text-slate-400';

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-glass-border bg-navy-900/60 p-5">
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <div className="mt-1 flex flex-col gap-0.5">
        <span className="text-xs text-slate-500">{before}</span>
        <span className="text-[9px] text-electric-blue-400/50">↓</span>
        <span className="text-sm font-bold text-white-100">{after}</span>
      </div>
      <div className={`mt-2 text-base font-black leading-tight ${growthColor}`}>
        {growth}
      </div>
      {isRate && growth !== 'Unchanged' && (
        <p className="-mt-1 text-[9px] text-slate-600">percentage points</p>
      )}
    </div>
  );
}

/* ─── Single client proof card ───────────────────────────────────────────────  */
function ClientCard({ proof, eager }) {
  return (
    <div className="flex flex-col gap-8">

      {/* 1. Client header */}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-2xl font-black tracking-tight text-white-100">
          {proof.clientName}
        </h3>
        {proof.measurementPeriod && (
          <p className="text-xs text-slate-500">{proof.measurementPeriod}</p>
        )}
      </div>

      {/* 2. Before Nfinity */}
      <div className="flex flex-col gap-4">
        <Divider>Before Nfinity</Divider>
        {proof.before?.period && (
          <p className="text-center text-[10px] text-slate-600">{proof.before.period}</p>
        )}
        <ScreenshotGrid
          screenshots={proof.before?.screenshots}
          altPrefix={`${proof.clientName} before Nfinity`}
          eager={eager}
        />
      </div>

      {/* 3. Transformation connector */}
      <TransformationBridge />

      {/* 4. After Nfinity */}
      <div className="flex flex-col gap-4">
        <Divider accent>After Nfinity</Divider>
        {proof.after?.period && (
          <p className="text-center text-[10px] text-slate-600">{proof.after.period}</p>
        )}
        <ScreenshotGrid
          screenshots={proof.after?.screenshots}
          altPrefix={`${proof.clientName} after Nfinity`}
          eager={false}
        />
      </div>

      {/* 5. Impact metrics */}
      {proof.metrics?.length > 0 && (
        <div className="flex flex-col gap-5 pt-2">
          <Divider>The Impact</Divider>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {proof.metrics.map((m, i) => (
              <MetricCard key={i} {...m} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

/* ─── Client proof data ───────────────────────────────────────────────────────
   Screenshots use URL-encoded filenames (spaces → %20).
   All growth values verified. CR growth in pp, not ratio %.                   */
const CLIENT_PROOFS = [

  /* ── Client 01 — YoY Jan–Aug 2025 vs 2026 ──────────────────────────────── */
  {
    id: 'client-1',
    clientName: 'Client 01',
    measurementPeriod: 'Before: Jan 1 – Aug 18, 2025  ·  After: Jan 1 – Aug 18, 2026',
    before: {
      screenshots: ['/assets/proof/Deepa%20boutique%2003%20before.png'],
      period: 'Jan 1 – Aug 18, 2025',
    },
    after: {
      screenshots: ['/assets/proof/Deepa%20boutique%2001%20after.png'],
      period: 'Jan 1 – Aug 18, 2026',
    },
    metrics: [
      {
        label: 'Revenue',
        before: '₹1,73,927',
        after: '₹1,12,02,486',
        growth: '+6,341%',          // (11202486 − 173927) / 173927 × 100
      },
      {
        label: 'Orders',
        before: '90',
        after: '4,130',
        growth: '+4,489%',          // (4130 − 90) / 90 × 100
      },
      {
        label: 'Sessions',
        before: '16,700',
        after: '7,32,300',
        growth: '+4,284%',          // (732300 − 16700) / 16700 × 100
      },
      {
        label: 'Conversion Rate',
        before: '0.51%',
        after: '0.55%',
        growth: '+0.04 pp',         // 0.55 − 0.51 = +0.04 percentage points
        isRate: true,
      },
    ],
  },

  /* ── Client 02 — MoM Jun vs Jul 2026 ───────────────────────────────────── */
  {
    id: 'client-2',
    clientName: 'Client 02',
    measurementPeriod: 'Before: Jun 2026  ·  After: Jul 2026',
    before: {
      screenshots: ['/assets/proof/Temple1%20before.png'],
      period: 'Jun 1–30, 2026',
    },
    after: {
      screenshots: ['/assets/proof/Temple2%20after.png'],
      period: 'Jul 1–31, 2026',
    },
    metrics: [
      {
        label: 'Revenue',
        before: '₹36,78,094',
        after: '₹40,57,760',
        growth: '+10.3%',           // (4057760 − 3678094) / 3678094 × 100
      },
      {
        label: 'Orders',
        before: '1,731',
        after: '2,221',
        growth: '+28.3%',           // (2221 − 1731) / 1731 × 100
      },
      {
        label: 'Sessions',
        before: '1,80,500',
        after: '2,12,800',
        growth: '+17.9%',           // (212800 − 180500) / 180500 × 100
      },
      {
        label: 'Conversion Rate',
        before: '0.05%',
        after: '0.05%',
        growth: 'Unchanged',
        isRate: true,
      },
    ],
  },

  /* ── Client 03 ──────────────────────────────────────────────────────────── */
  {
    id: 'client-3',
    clientName: 'Client 03',
    before: {
      screenshots: ['/assets/proof/klin%20space%2001%20before.png'],
    },
    after: {
      screenshots: ['/assets/proof/klin%20space%2004%20after.png'],
    },
    metrics: [
      {
        label: 'Revenue',
        before: '₹1,28,336',
        after: '₹4,31,540',
        growth: '+236%',            // (431540 − 128336) / 128336 × 100
      },
      {
        label: 'Orders',
        before: '254',
        after: '682',
        growth: '+169%',            // (682 − 254) / 254 × 100
      },
      {
        label: 'Sessions',
        before: '9,228',
        after: '14,500',
        growth: '+57%',             // (14500 − 9228) / 9228 × 100
      },
      {
        label: 'Conversion Rate',
        before: '2.54%',
        after: '3.94%',
        growth: '+1.40 pp',         // 3.94 − 2.54 = +1.40 percentage points
        isRate: true,
      },
    ],
  },

  /* ── Client 04 — Apr–Jun 2026 vs Jul–Aug 2026 ───────────────────────────── */
  {
    id: 'client-4',
    clientName: 'Client 04',
    measurementPeriod: 'Before: Apr 1 – Jun 30, 2026  ·  After: Jul 1 – Aug 19, 2026',
    before: {
      screenshots: ['/assets/proof/Thugiil%2003%20before.png'],
      period: 'Apr 1 – Jun 30, 2026',
    },
    after: {
      screenshots: ['/assets/proof/Thugiil%2002%20after.png'],
      period: 'Jul 1 – Aug 19, 2026',
    },
    metrics: [
      {
        label: 'Revenue',
        before: '₹10,62,473',
        after: '₹20,44,951',
        growth: '+92.5%',           // (2044951 − 1062473) / 1062473 × 100
      },
      {
        label: 'Orders',
        before: '722',
        after: '1,386',
        growth: '+92.0%',           // (1386 − 722) / 722 × 100
      },
      {
        label: 'Sessions',
        before: '78,800',
        after: '1,04,700',
        growth: '+32.9%',           // (104700 − 78800) / 78800 × 100
      },
      {
        label: 'Conversion Rate',
        before: '0.34%',
        after: '0%',
        growth: '-0.34 pp',         // 0 − 0.34 = −0.34 percentage points
        isRate: true,
      },
    ],
  },
];

/* ─── Main export ─────────────────────────────────────────────────────────────  */
export function ClientProofSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="mb-20 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-electric-blue-400">
            Client Proof
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight text-white-100 sm:text-4xl lg:text-5xl">
            Before &amp; After Nfinity
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-slate-400">
            Real Shopify dashboards. Actual numbers. No filters — just the transformation that
            happens when strategy, execution, and optimization work in sync.
          </p>
        </div>

        {/* One card per client */}
        <div className="flex flex-col gap-16">
          {CLIENT_PROOFS.map((proof, i) => (
            <GlassCard key={proof.id} className="overflow-hidden p-8 sm:p-10 lg:p-14">
              <ClientCard proof={proof} eager={i === 0} />
            </GlassCard>
          ))}
        </div>

      </div>
    </section>
  );
}
