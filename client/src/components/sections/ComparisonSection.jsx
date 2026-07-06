import { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge.jsx';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';

const COMPARISON_ROWS = [
  { category: 'Meta Advertising', nfinity: 'Profit-focused acquisition', agency: { icon: 'warning', text: 'Basic media buying' }, freelancer: 'Campaign execution only' },
  { category: 'Creative Systems', nfinity: 'Performance creatives', agency: { icon: 'warning', text: 'Limited testing' }, freelancer: 'Usually unavailable' },
  { category: 'CRO & Funnels', nfinity: 'Included', agency: { icon: 'warning', text: 'Rarely optimized' }, freelancer: 'Not included' },
  { category: 'Offer Strategy', nfinity: 'Conversion-focused offers', agency: { icon: 'cross', text: 'Usually ignored' }, freelancer: 'Not included' },
  { category: 'Retention Systems', nfinity: 'LTV growth systems', agency: { icon: 'warning', text: 'Partial support' }, freelancer: 'Not included' },
  { category: 'Profitability', nfinity: 'Profit-first decisions', agency: { icon: 'cross', text: 'ROAS focused' }, freelancer: 'No strategy' },
  { category: 'Founder Access', nfinity: 'Direct founder involvement', agency: { icon: 'warning', text: 'Account manager' }, freelancer: 'Limited communication' },
  { category: 'Strategic Guidance', nfinity: 'Growth consulting included', agency: { icon: 'warning', text: 'Generic recommendations' }, freelancer: 'Execution only' },
  { category: 'Primary Focus', nfinity: 'Profitability & scale', agency: { icon: 'warning', text: 'Vanity metrics' }, freelancer: 'Task completion' },
];

function StatusIcon({ type }) {
  if (type === 'warning') return <AlertTriangle size={17} className="shrink-0 text-yellow-400" />;
  if (type === 'cross') return <XCircle size={17} className="shrink-0 text-slate-500" />;
  return <CheckCircle2 size={17} className="shrink-0 text-success-green" />;
}

/**
 * One full table row as a SINGLE flex element spanning all four columns.
 * The divider (`border-b`) and the row's height live on this one wrapper —
 * not on the cells inside it — so every column is structurally guaranteed
 * to share the exact same height and the exact same divider line. The four
 * cells are plain flex children (`flex-[1.3]` / `flex-[1.2]` / `flex-1` /
 * `flex-1`, matching the table's column-width ratios) with no border, no
 * background, and no wrapper of their own, so nothing inside this row can
 * independently drift in height. The Nfinity Partner highlight is rendered
 * separately, behind every row, by the single backdrop panel in
 * ComparisonTable — not here — which is what lets the highlight span "the
 * column" as one piece without ever touching row height.
 */
function ComparisonRow({ row, index, hoveredRow, setHoveredRow, setNfinityHovered, isLast }) {
  const nfinityGlow = hoveredRow === index ? 'shadow-[0_0_24px_rgba(0,255,255,0.25)]' : '';
  return (
    <div
      onMouseEnter={() => setHoveredRow(index)}
      onMouseLeave={() => setHoveredRow(null)}
      style={{ transitionDelay: `${index * 60}ms` }}
      className={`row-reveal relative z-[1] flex h-[80px] items-stretch border-b border-glass-border/60 transition-colors duration-300 sm:h-[88px] ${
        hoveredRow === index ? 'bg-white/[0.06]' : ''
      } ${isLast ? 'rounded-b-[32px]' : ''}`}
    >
      <div className="flex flex-[1.3] items-center px-6 text-sm font-medium text-white-100 sm:text-base">
        {row.category}
      </div>
      <div
        onMouseEnter={() => setNfinityHovered(true)}
        onMouseLeave={() => setNfinityHovered(false)}
        className={`flex flex-[1.2] items-center justify-center gap-2 px-4 text-center text-sm font-medium text-white-100 transition-shadow duration-300 sm:text-base ${nfinityGlow}`}
      >
        <StatusIcon type="check" />
        <span>{row.nfinity}</span>
      </div>
      <div className="flex flex-1 items-center justify-center gap-2 px-4 text-center text-sm text-slate-300 sm:text-base">
        <StatusIcon type={row.agency.icon} />
        <span>{row.agency.text}</span>
      </div>
      <div className="flex flex-1 items-center justify-center gap-2 px-4 text-center text-sm text-slate-300 sm:text-base">
        <StatusIcon type="cross" />
        <span>{row.freelancer}</span>
      </div>
    </div>
  );
}

/**
 * The comparison table. Every row — header included — is one flex element
 * spanning all four columns (see ComparisonRow), so column heights and
 * divider lines are structurally guaranteed to match: there is no per-column
 * wrapper left that could independently add height to just one column.
 *
 * The Nfinity Partner highlight (gradient, inset border, glow, scale, hover
 * lift) is a single absolutely-positioned panel behind the rows — not a
 * wrapper around the Nfinity cells — sized to that column's exact track
 * (left 28.89%, width 26.67%, matching the 1.3 : 1.2 : 1 : 1 flex-basis
 * ratios used in every row/header cell below). Being purely decorative
 * (`pointer-events-none`, `-z-10`) it can never influence row layout, which
 * is exactly what "apply the highlight to the column container, not
 * individual cells" requires. Hovering any Nfinity cell (header or row)
 * flips `nfinityHovered`, which drives that panel's lift/glow/brighten state
 * — the panel can't receive hover itself since it sits behind the content.
 *
 * Sticky header note: only `lg:sticky lg:top-20` (active at desktop sizes).
 * Below `lg` the wrapper scrolls horizontally instead (`max-lg:overflow-x-auto`)
 * and sticky is switched off there — combining a horizontal-scroll container
 * with `position: sticky` on the same axis can make the header stick relative
 * to that scroll container instead of the viewport, so the two behaviors are
 * deliberately kept on separate breakpoints. Rounded corners are applied
 * directly to the header row and the last data row (not via `overflow-hidden`
 * on an ancestor) for the same reason — `overflow` other than `visible` on
 * any ancestor of a sticky element changes what it sticks relative to.
 */
function ComparisonTable() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [nfinityHovered, setNfinityHovered] = useState(false);
  const lastIndex = COMPARISON_ROWS.length - 1;

  return (
    <div className="relative rounded-[32px] border border-glass-border bg-glass-fill shadow-glow backdrop-blur-xl">
      <div className="max-lg:overflow-x-auto">
        <div className="relative min-w-[820px] lg:min-w-0">
          {/* Nfinity Partner column highlight — one continuous backdrop
              spanning the FULL height of the table: `inset-y-0` (top: 0,
              bottom: 0, height: 100%), no negative offsets, no extra height
              math. That's what makes the crisp inset-border layer line up
              exactly with the table's own top/bottom edges instead of
              poking out past them — only the soft blurred glow layers
              extend beyond the border, which is just how box-shadow blur
              naturally renders outside a box's edges. Hover keeps it at
              scale(1.01) with a touch more glow; there's no translateY lift
              here, since lifting the panel would immediately re-introduce
              the "floating outside the table" look this fixes. The border
              is an INSET box-shadow layer rather than a real `border`
              utility so it paints inside the panel without adding height. */}
          <div
            className={`pointer-events-none absolute inset-y-0 left-[28.89%] -z-10 w-[26.67%] rounded-2xl bg-[linear-gradient(180deg,rgba(0,255,255,0.07),rgba(0,120,255,0.02))] shadow-[inset_0_0_0_1px_rgba(77,235,255,0.35),0_0_25px_rgba(0,255,255,0.15),0_0_60px_rgba(0,255,255,0.08)] transition-all duration-[400ms] ease-out ${
              nfinityHovered
                ? 'scale-[1.01] bg-[linear-gradient(180deg,rgba(0,255,255,0.12),rgba(0,120,255,0.05))] shadow-[inset_0_0_0_1px_rgba(77,235,255,0.35),0_0_30px_rgba(0,255,255,0.2),0_0_70px_rgba(0,255,255,0.1)]'
                : ''
            }`}
            aria-hidden="true"
          />

          {/* Header row — one element spanning all four columns. */}
          <div className="relative z-[1] flex h-[56px] items-stretch rounded-t-[32px] border-b border-glass-border bg-navy-950/90 backdrop-blur-xl lg:sticky lg:top-20 lg:z-20">
            <div className="flex flex-[1.3] items-center px-6 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-sm">
              Category
            </div>
            <div
              onMouseEnter={() => setNfinityHovered(true)}
              onMouseLeave={() => setNfinityHovered(false)}
              className="flex flex-[1.2] items-center justify-center gap-1.5 px-4 text-xs font-bold uppercase tracking-wide text-cyan-glow-400 sm:text-sm"
            >
              <Sparkles size={14} className="shrink-0" />
              Nfinity Partner
            </div>
            <div className="flex flex-1 items-center justify-center px-4 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-sm">
              Traditional Agency
            </div>
            <div className="flex flex-1 items-center justify-center px-4 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-sm">
              Freelancer
            </div>
          </div>

          {/* Data rows — each one shared row structure (see ComparisonRow). */}
          {COMPARISON_ROWS.map((row, index) => (
            <ComparisonRow
              key={row.category}
              row={row}
              index={index}
              hoveredRow={hoveredRow}
              setHoveredRow={setHoveredRow}
              setNfinityHovered={setNfinityHovered}
              isLast={index === lastIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ComparisonSection() {
  const headerRevealRef = useScrollReveal({ threshold: 0.2 });
  const tableRevealRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
      {/* Soft ambient background glow — sized to stay clear of section edges
          rather than relying on overflow-hidden, which would otherwise break
          the table's viewport-relative sticky header (see ComparisonTable). */}
      <div
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-cyan-glow-400/10 blur-[120px]"
        style={{ animation: 'cardGlowPulse 7s ease-in-out infinite' }}
        aria-hidden="true"
      />

      <div ref={headerRevealRef} className="reveal mx-auto max-w-3xl text-center">
        <Badge className="text-[1.5rem] leading-[3rem]">How We Scale Profitability</Badge>
        <h2 className="mt-6 font-display text-3xl font-bold text-white-100 sm:text-4xl">
          Why founders choose Nfinity Partner.
        </h2>
        <p className="mt-4 text-slate-400">Most agencies optimize Results. We optimize profitability.</p>
      </div>

      <div ref={tableRevealRef} className="reveal mt-14">
        <ComparisonTable />
      </div>
    </section>
  );
}
