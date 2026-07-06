// Static brand content (Section 0 of the master document) that isn't modeled
// as database content — founder bio, company stats, awards, nav structure,
// contact details. Services/CaseStudies/BlogPosts/Testimonials come from the API.

export const BRAND = {
  name: 'Nfinity Partner',
  positioning: "Tirupur's #1 Profit-Focused D2C Marketing Agency",
  tagline: 'Scaling Profitability Is The Game.',
  philosophy: 'Profit First → Revenue Second → ROAS Third',
};

export const STATS = [
  { value: 50, suffix: 'Cr+', prefix: '₹', label: 'Client Revenue Generated' },
  { value: 2, suffix: 'Cr+', prefix: '₹', label: 'Ad Spend Managed' },
  { value: 50, suffix: '+', prefix: '', label: 'Brands Scaled' },
];

export const CONTACT = {
  address: 'No.6, 2nd Floor, Angeripalayam Road, Tirupur – 641602',
  phone: '+91 95666 37111',
  phoneHref: 'tel:+919566637111',
  whatsappHref: 'https://wa.me/919566637111',
  email: 'suganya.nfinitypartner@gmail.com',
  website: 'nfinitypartner.com',
};

export const FOUNDER = {
  name: 'Suganya Swaminathan',
  role: 'Founder & CEO',
  award: 'Eagle Resilience Award — TN Digital Summit 2026',
  avatar: '/assets/team/founder-suganya.png',
};

export const SERVICES_NAV = [
  { name: 'Performance Marketing', slug: 'performance-marketing' },
  { name: 'Website Development', slug: 'website-development' },
  { name: 'SEO', slug: 'seo' },
  { name: 'Social Media Marketing', slug: 'social-media-marketing' },
  { name: 'Personal Branding & Product Photography', slug: 'personal-branding-product-photography' },
  { name: 'Online Marketing', slug: 'online-marketing' },
  { name: 'Digital Branding', slug: 'digital-branding' },
  { name: 'Software & App Development', slug: 'software-app-development' },
  { name: 'LinkedIn Automation', slug: 'linkedin-automation' },
];

export const PRIMARY_NAV = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const REVENUE_RANGE_OPTIONS = [
  { value: '<10L', label: 'Under ₹10L / month' },
  { value: '10L-50L', label: '₹10L – ₹50L / month' },
  { value: '50L-2Cr', label: '₹50L – ₹2Cr / month' },
  { value: '2Cr+', label: '₹2Cr+ / month' },
];

export const BOTTLENECK_OPTIONS = [
  { value: 'acquisition', label: 'Getting new customers (acquisition)' },
  { value: 'conversion', label: 'Turning traffic into sales (conversion)' },
  { value: 'retention', label: 'Getting customers to buy again (retention)' },
  { value: 'tracking', label: "I can't tell what's actually working (tracking)" },
  { value: 'not_sure', label: "Not sure — that's what I want to find out" },
];

export const COMPANY_VALUES = [
  {
    title: 'Profit First',
    description: 'Every decision is measured against contribution margin, never against Results or spend alone.',
  },
  {
    title: 'Founder-Led',
    description: 'Every account is shaped by people who have run the framework themselves, not a junior account manager.',
  },
  {
    title: 'Radically Transparent',
    description: 'No vanity metrics, no locked-in contracts disguised as "partnership" — just honest reporting.',
  },
  {
    title: 'Systems Over Guesswork',
    description: 'A repeatable framework — Meta Ads → Creatives → Offers → CRO → Retention → Profitability → Scaling — beats one-off tactics.',
  },
];
