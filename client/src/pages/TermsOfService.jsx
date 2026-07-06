import { useSEO } from '../hooks/useSEO.js';
import { CONTACT } from '../lib/constants.js';

export default function TermsOfService() {
  useSEO({ title: 'Terms Of Service', description: "Nfinity Partner's terms of service." });

  return (
    <article className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-white-100 sm:text-4xl">Terms Of Service</h1>
      <p className="mt-3 text-sm text-slate-400">Last updated: January 2026</p>

      <div className="mt-10 flex flex-col gap-8 text-slate-400">
        <section>
          <h2 className="font-display text-lg font-semibold text-white-100">Use Of This Website</h2>
          <p className="mt-2">
            This website is provided by Nfinity Partner for the purpose of sharing information about our services
            and enabling prospective clients to get in touch. By using this site, you agree not to misuse it or
            attempt to disrupt its normal operation.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-white-100">No Guarantee Of Results</h2>
          <p className="mt-2">
            Case studies and results shared on this website reflect outcomes achieved for specific clients under
            specific conditions. Past performance does not guarantee future results for any other business.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-white-100">Engagement Terms</h2>
          <p className="mt-2">
            Specific terms of engagement, scope of work, and fees are agreed separately in writing once a strategy
            call confirms fit between your business and our services.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-white-100">Intellectual Property</h2>
          <p className="mt-2">
            All content on this website, including copy, design, and branding, is the property of Nfinity Partner
            and may not be reproduced without permission.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-white-100">Contact Us</h2>
          <p className="mt-2">
            Questions about these terms can be sent to{' '}
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
