import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import CaseStudies from './pages/CaseStudies.jsx';
import CaseStudyDetail from './pages/CaseStudyDetail.jsx';
import Services from './pages/Services.jsx';
import ServiceTemplate from './pages/ServiceTemplate.jsx';
import BlogPost from './pages/BlogPost.jsx';
import DigitalMarketingTamilNadu from './pages/DigitalMarketingTamilNadu.jsx';
import Contact from './pages/Contact.jsx';
import ThankYou from './pages/ThankYou.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import NotFound from './pages/NotFound.jsx';

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
