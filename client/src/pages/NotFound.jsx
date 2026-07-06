import { useSEO } from '../hooks/useSEO.js';
import { Button } from '../components/ui/Button.jsx';

export default function NotFound() {
  useSEO({ title: '404 — Page Not Found', description: 'This page could not be found.' });

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center lg:px-8">
      <p className="font-display text-7xl font-extrabold text-gradient-accent">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white-100">Page Not Found.</h1>
      <p className="mt-3 text-slate-400">The page you're looking for doesn't exist or may have moved.</p>
      <Button href="/" className="mt-8" withArrow>
        Back To Home
      </Button>
    </section>
  );
}
