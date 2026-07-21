import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, Suspense } from 'react';
import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer.jsx';
import { WhatsAppButton } from './WhatsAppButton.jsx';
import { InstagramButton } from './InstagramButton.jsx';

/**
 * Minimal fallback shown while a lazy page chunk is downloading.
 * Matches the site's background colour so there's no visible flash.
 * Height matches main content area (viewport − 72px navbar − footer).
 * aria-hidden prevents screen readers from announcing it.
 */
function PageShell() {
  return (
    <div
      className="min-h-[calc(100vh-72px)] bg-navy-950"
      aria-hidden="true"
      role="presentation"
    />
  );
}

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="flex min-h-screen flex-col bg-navy-950">
      <Navbar />
      {/*
       * Suspense boundary sits here — inside Layout but outside the page components —
       * so Navbar and Footer remain mounted and visible while a lazy page chunk loads.
       * PageShell holds layout height so CLS is 0 during the loading transition.
       */}
      <main className="flex-1 pt-[72px]">
        <Suspense fallback={<PageShell />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <InstagramButton />
    </div>
  );
}
