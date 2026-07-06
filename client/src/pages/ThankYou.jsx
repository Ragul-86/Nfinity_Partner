import { CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO.js';
import { CONTACT } from '../lib/constants.js';
import { Button } from '../components/ui/Button.jsx';

export default function ThankYou() {
  useSEO({
    title: 'Thank You',
    description: 'Thanks for booking your free profit audit with Nfinity Partner.',
  });

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center lg:px-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-green/15">
        <CheckCircle2 size={32} className="text-success-green" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-bold text-white-100 sm:text-4xl">You're In.</h1>
      <p className="mt-4 text-slate-400">
        Thanks for reaching out — your submission has been sent straight to the founder. Expect a response within
        24 hours.
      </p>
      <p className="mt-2 text-sm text-slate-400">
        In a hurry? WhatsApp us directly at{' '}
        <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="text-cyan-glow-400 hover:underline">
          {CONTACT.phone}
        </a>
        .
      </p>
      <Button href="/" variant="secondary" className="mt-8" withArrow>
        Back To Home
      </Button>
    </section>
  );
}
