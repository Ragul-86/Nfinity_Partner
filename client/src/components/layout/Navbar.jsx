import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { PRIMARY_NAV, SERVICES_NAV } from '../../lib/constants.js';
import { Button } from '../ui/Button.jsx';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-navy-950/85 backdrop-blur-xl border-b border-glass-border' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/assets/brand/icon-mono.svg" alt="" className="h-11 w-auto shrink-0" />
          <span className="font-display text-lg leading-none tracking-tight">
            <span className="font-extrabold text-white-100">Nfinity</span>
            <span className="font-extrabold text-white-100"> Partner</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {PRIMARY_NAV.map((item) =>
            item.name === 'Services' ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-white-100 transition-colors hover:text-cyan-glow-400">
                  Services <ChevronDown size={14} />
                </button>
                {servicesOpen && (
                  <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3">
                    <div className="rounded-2xl border border-glass-border bg-navy-900/95 backdrop-blur-xl p-2 shadow-glow-lg">
                      <Link
                        to="/services"
                        className="block rounded-lg px-4 py-2 text-sm font-semibold text-cyan-glow-400 hover:bg-white/5"
                      >
                        All Services
                      </Link>
                      <div className="my-1 border-t border-glass-border" />
                      {SERVICES_NAV.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          className="block rounded-lg px-4 py-2 text-sm text-white-100 hover:bg-white/5 hover:text-cyan-glow-400"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-cyan-glow-400 ${
                    isActive ? 'text-cyan-glow-400' : 'text-white-100'
                  }`
                }
              >
                {item.name}
              </NavLink>
            )
          )}
        </div>

        <div className="hidden lg:block">
          <Button href="/contact" size="md">
          Book A Call
          </Button>
        </div>

        <button
          className="text-white-100 lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-glass-border bg-navy-950 px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {PRIMARY_NAV.map((item) =>
              item.name === 'Services' ? (
                <div key={item.name} className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-slate-400">Services</span>
                  <Link to="/services" className="pl-3 text-white-100">
                    All Services
                  </Link>
                  {SERVICES_NAV.map((s) => (
                    <Link key={s.slug} to={`/services/${s.slug}`} className="pl-3 text-white-100">
                      {s.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={item.name} to={item.href} className="text-white-100">
                  {item.name}
                </Link>
              )
            )}
            <Button href="/contact" className="mt-2 justify-center">
              Book A Call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
