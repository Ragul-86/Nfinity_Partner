import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useSEO } from '../hooks/useSEO.js';
import { apiClient, ApiClientError } from '../lib/apiClient.js';
import { CONTACT, REVENUE_RANGE_OPTIONS } from '../lib/constants.js';
import { JsonLd, organizationSchema, faqSchema } from '../components/shared/JsonLd.jsx';

import { GlassCard } from '../components/ui/GlassCard.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Input, Select, Textarea } from '../components/ui/Input.jsx';
import { FAQSection } from '../components/sections/FAQSection.jsx';

const FAQ_ITEMS = [
  {
    q: "What's the minimum ad spend to work with you?",
    a: "We're transparent on this during the strategy call — we'd rather tell you honestly if it's not the right fit yet than take budget that won't move the needle.",
  },
  {
    q: 'How fast will I hear back?',
    a: 'Every submission is reviewed personally by the founder. You can expect a response within 24 hours.',
  },
  {
    q: 'Will I be working with the founder or a junior account manager?',
    a: 'Every account is founder-reviewed. No black-box reporting, no junior hand-offs.',
  },
];

const initialForm = {
  name: '',
  brandName: '',
  revenueRange: '',
  phone: '',
  email: '',
  message: '',
};

function validateForm(form) {
  const errors = {};
  if (!form.name.trim() || form.name.trim().length < 2) errors.name = 'Enter your full name (min 2 characters).';
  if (!form.brandName.trim() || form.brandName.trim().length < 2) errors.brandName = 'Enter your business name.';
  if (!form.revenueRange) errors.revenueRange = 'Select your monthly revenue.';
  if (!form.phone.trim() || form.phone.trim().length < 7) errors.phone = 'Enter a valid phone number.';
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Enter a valid email address.';
  if (!form.message.trim() || form.message.trim().length < 10) errors.message = 'Please describe your challenge (min 10 characters).';
  return errors;
}

export default function Contact() {
  useSEO({
    fullTitle: 'Contact Nfinity Partner | Tiruppur',
    description:
      'Contact Nfinity Partner for SEO, Google Ads, website development, branding, software development, and digital marketing solutions in Tiruppur.',
  });

  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formErrors = validateForm(form);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError('');
    try {
      await apiClient.post('/leads', {
        name: form.name.trim(),
        brandName: form.brandName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        revenueRange: form.revenueRange,
        message: form.message.trim(),
        sourcePage: '/contact',
      });
      navigate('/thank-you');
    } catch (err) {
      if (err instanceof ApiClientError && Array.isArray(err.details) && err.details.length > 0) {
        const fieldErrors = {};
        err.details.forEach((d) => {
          fieldErrors[d.field] = d.message;
        });
        setErrors(fieldErrors);
        setSubmitError('Please fix the highlighted fields and try again.');
      } else {
        setSubmitError(err?.message || 'Something went wrong submitting the form. Please try again or WhatsApp us directly.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Exact coordinates confirmed from the live Nfinity Partner Google Maps listing:
  // https://www.google.com/maps/place/Nfinity+Partner/@11.1246455,77.3335776,17z
  // Using lat/lng instead of an address string guarantees a single precise pin
  // regardless of how Google's geocoder interprets the street address text.
  const OFFICE_NAME = 'Nfinity Partner';
  const OFFICE_ADDRESS =
    'No. 6B, 2nd Floor, Teachers Colony, Angeripalayam Main Rd, 2nd Street, Tiruppur, Tamil Nadu 641602';
  const OFFICE_LAT = 11.1246455;
  const OFFICE_LNG = 77.3335776;
  // q=lat,lng forces an exact coordinate pin; z=18 zooms to building level.
  const mapEmbedSrc = `https://maps.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&z=18&output=embed`;
  // Directions destination uses coordinates so the pin lands precisely on the office.
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${OFFICE_LAT},${OFFICE_LNG}`;

  return (
    <>
      <JsonLd id="contact-org" data={organizationSchema()} />
      <JsonLd id="contact-faq" data={faqSchema(FAQ_ITEMS)} />

      <section className="relative overflow-hidden bg-gradient-black">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-electric-blue-500/20 blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-white-100 sm:text-5xl">
            Let's Find Out Where Your Profit Is Leaking.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-slate-400">
            Book a free strategy call — no pressure, just a clear look at your numbers. Reviewed personally by the
            founder, usually within 24 hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Book Your Free Growth Strategy Call form */}
          <GlassCard className="p-5 sm:p-8 lg:p-10">
            <h2 className="font-display text-2xl font-bold text-white-100">Book Your Free Growth Strategy Call</h2>
            <p className="mt-2 text-sm text-slate-400">
              Tell us a bit about your brand and we'll be in touch within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col gap-5">
                <Input
                  label="Your Name *"
                  name="name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  error={errors.name}
                  placeholder="Suganya Swaminathan"
                />
                <Input
                  label="Business Name *"
                  name="brandName"
                  value={form.brandName}
                  onChange={(e) => update('brandName', e.target.value)}
                  error={errors.brandName}
                  placeholder="Your brand"
                />
                <Select
                  label="Monthly Revenue *"
                  name="revenueRange"
                  value={form.revenueRange}
                  onChange={(e) => update('revenueRange', e.target.value)}
                  error={errors.revenueRange}
                  placeholder="Select a range"
                  options={REVENUE_RANGE_OPTIONS}
                />
                <Input
                  label="Phone Number *"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  error={errors.phone}
                  placeholder="+91 98765 43210"
                />
                <Input
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  error={errors.email}
                  placeholder="you@brand.com"
                />
                <Textarea
                  label="Biggest Growth Challenge *"
                  name="message"
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  error={errors.message}
                  placeholder={`Tell us about your current marketing or business challenge...\n\nExamples:\n• Need more qualified leads\n• Low sales despite running ads\n• Need help scaling my business`}
                  rows={4}
                />
              </div>

              {submitError && <p className="mt-4 text-sm text-red-400">{submitError}</p>}

              <div className="mt-8">
                <Button type="submit" disabled={submitting} className={submitting ? 'opacity-70' : ''} withArrow>
                  {submitting ? 'Submitting...' : 'Continue to book a call'}
                </Button>
              </div>
            </form>
          </GlassCard>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <GlassCard className="flex flex-col gap-5 p-7">
              <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white-100 hover:text-cyan-glow-400">
                <MessageCircle size={20} className="text-success-green" /> WhatsApp Us Directly
              </a>
              <a href={CONTACT.phoneHref} className="flex items-center gap-3 text-white-100 hover:text-cyan-glow-400">
                <Phone size={20} className="text-electric-blue-400" /> {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-white-100 hover:text-cyan-glow-400">
                <Mail size={20} className="text-electric-blue-400" /> {CONTACT.email}
              </a>
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin size={20} className="mt-0.5 shrink-0 text-electric-blue-400" /> {CONTACT.address}
              </div>
            </GlassCard>

            {/*
              Map card: consistent padding throughout so nothing overlaps.
              Order: name → address (24px gap below) → map → button (24px gap above).
              The iframe lives inside its own overflow:hidden rounded wrapper so
              border-radius is applied cleanly and the map never bleeds into the
              address text or the card edges.
            */}
            <GlassCard className="p-5 sm:p-6">
              {/* Office name */}
              <p className="font-display font-semibold text-white-100">{OFFICE_NAME}</p>

              {/* Address — 3-line display, wraps naturally on narrow screens */}
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                No. 6B, 2nd Floor, Teachers Colony,
                <br />
                Angeripalayam Main Rd, 2nd Street,
                <br />
                Tiruppur, Tamil Nadu 641602
              </p>

              {/* Map — 24px gap from address, contained with rounded clip */}
              <div className="mt-6 overflow-hidden rounded-xl">
                <iframe
                  title="Nfinity Partner office location"
                  className="block h-60 w-full border-0 sm:h-72"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={mapEmbedSrc}
                />
              </div>

              {/* Directions button — 24px gap from map */}
              <div className="mt-6">
                <Button href={directionsHref} variant="secondary" withArrow>
                  Get Directions
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <FAQSection title="Frequently Asked Questions" items={FAQ_ITEMS} />
    </>
  );
}
