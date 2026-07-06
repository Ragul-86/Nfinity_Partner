/** { title, subtitle, steps: [{ heading, body }] } — connected-node framework visual */
export function ApproachSteps({ title = 'Our Approach', subtitle, steps = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-4 text-slate-400">{subtitle}</p>}
      </div>

      <div className="mt-14 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div key={step.heading} className="relative flex flex-col gap-3 px-4 py-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-accent font-display text-sm font-bold text-navy-950">
                {i + 1}
              </span>
              {i < steps.length - 1 && (
                <span className="hidden h-px flex-1 bg-glass-border lg:block" aria-hidden="true" />
              )}
            </div>
            <h3 className="font-display font-semibold text-white-100">{step.heading}</h3>
            <p className="text-sm text-slate-400">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
