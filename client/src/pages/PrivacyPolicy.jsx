import { useSEO } from '../hooks/useSEO.js';
import { CONTACT } from '../lib/constants.js';

export default function PrivacyPolicy() {
  useSEO({ title: 'Privacy Policy', description: "Nfinity Partner's privacy policy." });

  return (
    <article className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-slate-400">Last updated: January 2026</p>

      <div className="mt-10 flex flex-col gap-8 text-slate-400">
        <section>
          <h2 className="font-display text-lg font-semibold text-white-100">Information We Collect</h2>
          <p className="mt-2">
            When you submit a form on this website, we collect your name, brand name, email address, phone number,
            and any information you share about your business (such as revenue range and growth bottlenecks). We
            use this information solely to respond to your enquiry and evaluate fit for our services.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-white-100">How We Use Your Information</h2>
          <p className="mt-2">
            We use the information you provide to contact you about your enquiry, prepare a strategy call, and, if
            you become a client, to deliver our services. We do not sell your personal information to third
            parties.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-white-100">Data Storage</h2>
          <p className="mt-2">
            Form submissions are stored securely in our database and are accessible only to authorized members of
            the Nfinity Partner team.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-white-100">Cookies</h2>
          <p className="mt-2">
            This website may use basic analytics and tracking technologies (such as the Meta Pixel and Google Tag
            Manager) to understand site usage and measure campaign performance.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-white-100">Contact Us</h2>
          <p className="mt-2">
            For any privacy-related questions, reach us at{' '}
            <a href={`mailto:${CONTACT.email}`} className="text-cyan-glow-400 hover:underline">
              {CONTACT.email}
            </a>{' '}
            or {CONTACT.phone}.
          </p>
        </section>
      </div>
    </article>
  );
}
