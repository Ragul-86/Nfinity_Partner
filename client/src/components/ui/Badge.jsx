export function Badge({ className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-glass-fill px-3 py-1 text-xs font-medium tracking-wide text-cyan-glow-400 uppercase ${className}`}
    >
      {children}
    </span>
  );
}
