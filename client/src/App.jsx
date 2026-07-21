import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout.jsx';

// ── Route-based code splitting ─────────────────────────────────────────────
// Each page becomes its own JS chunk that Vite/Rollup tree-shakes separately.
// The browser only downloads a page's chunk when the user navigates to it,
// cutting the initial JS payload from one monolithic bundle to ~30–40 KB
// (Layout + shared components + React runtime only).
// The Suspense boundary lives in Layout.jsx so Navbar/Footer stay visible
// during every page transition.
const Home                       = lazy(() => import('./pages/Home.jsx'));
const About                      = lazy(() => import('./pages/About.jsx'));
const CaseStudies                = lazy(() => import('./pages/CaseStudies.jsx'));
const CaseStudyDetail            = lazy(() => import('./pages/CaseStudyDetail.jsx'));
const Services                   = lazy(() => import('./pages/Services.jsx'));
const ServiceTemplate            = lazy(() => import('./pages/ServiceTemplate.jsx'));
const BlogPost                   = lazy(() => import('./pages/BlogPost.jsx'));
const DigitalMarketingTamilNadu  = lazy(() => import('./pages/DigitalMarketingTamilNadu.jsx'));
const Contact                    = lazy(() => import('./pages/Contact.jsx'));
const ThankYou                   = lazy(() => import('./pages/ThankYou.jsx'));
const PrivacyPolicy              = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const TermsOfService             = lazy(() => import('./pages/TermsOfService.jsx'));
const NotFound                   = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceTemplate />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/digital-marketing-agency-in-tamil-nadu" element={<DigitalMarketingTamilNadu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
