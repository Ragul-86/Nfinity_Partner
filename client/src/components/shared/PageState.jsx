import { Loader2, AlertTriangle } from 'lucide-react';

export function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-32 text-slate-400">
      <Loader2 size={28} className="animate-spin text-cyan-glow-400" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function ErrorState({ message = "Something went wrong while loading this content." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-32 text-center text-slate-400">
      <AlertTriangle size={28} className="text-red-400" />
      <p className="max-w-md text-sm">{message}</p>
      <p className="text-xs text-slate-400/70">
        If you're running this locally, make sure the backend server is running and seeded.
      </p>
    </div>
  );
}

export function EmptyState({ message = 'Nothing here yet.' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-32 text-center text-slate-400">
      <p className="text-sm">{message}</p>
    </div>
  );
}
