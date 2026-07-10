import { Accordion } from '../ui/Accordion.jsx';

/** { title, items: [{ q, a }] } */
export function FAQSection({ title = 'Frequently Asked Questions', items = [] }) {
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-4xl px-6 py-14 lg:px-8 lg:py-24">
      <h2 className="text-center font-display text-3xl font-bold text-white-100 sm:text-4xl">{title}</h2>
      <div className="mt-12">
        <Accordion items={items} />
      </div>
    </section>
  );
}
