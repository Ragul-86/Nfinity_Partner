import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="divide-y divide-glass-border rounded-2xl border border-glass-border bg-glass-fill">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q || i}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span className="font-medium text-white-100">{item.q}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-cyan-glow-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden px-6 transition-all duration-300 ${
                isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-slate-400">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
