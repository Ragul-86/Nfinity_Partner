export function Input({ label, error, className = '', id, ...props }) {
  const inputId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-400">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-xl border bg-glass-fill px-4 py-3 text-white-100 placeholder:text-slate-400/70 outline-none transition-colors focus:border-electric-blue-500 ${
          error ? 'border-red-500/60' : 'border-glass-border'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className = '', id, ...props }) {
  const inputId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-400">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={4}
        className={`w-full rounded-xl border bg-glass-fill px-4 py-3 text-white-100 placeholder:text-slate-400/70 outline-none transition-colors focus:border-electric-blue-500 ${
          error ? 'border-red-500/60' : 'border-glass-border'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Select({ label, error, options = [], placeholder, className = '', id, ...props }) {
  const inputId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-400">
          {label}
        </label>
      )}
      <select
        id={inputId}
        className={`w-full rounded-xl border bg-navy-900 px-4 py-3 text-white-100 outline-none transition-colors focus:border-electric-blue-500 ${
          error ? 'border-red-500/60' : 'border-glass-border'
        } ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
