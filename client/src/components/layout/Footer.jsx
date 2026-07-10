import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { BRAND, CONTACT, PRIMARY_NAV, SERVICES_NAV } from '../../lib/constants.js';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-glass-border bg-navy-950">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4 md:gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img src="/assets/brand/icon-mono.svg" alt="" className="h-8 w-auto shrink-0" />
              <p className="font-display text-lg leading-none tracking-tight">
                <span className="font-extrabold text-white-100">Nfinity</span>
                <span className="font-extrabold text-white-100"> Partner</span>
              </p>
            </div>
            <p className="mt-3 text-sm text-slate-400">{BRAND.positioning}</p>
            <p className="mt-4 text-sm font-medium text-cyan-glow-400">{BRAND.tagline}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white-100">Useful Links</p>
            <ul className="mt-4 space-y-2">
              {PRIMARY_NAV.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-slate-400 hover:text-cyan-glow-400">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="mt-3 border-t border-glass-border pt-3">
                <Link
                  to="/digital-marketing-agency-in-tamil-nadu"
                  className="text-sm text-slate-400 hover:text-cyan-glow-400"
                >
                  Digital Marketing Agency in Tamil Nadu
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white-100">Services</p>
            <ul className="mt-4 space-y-2">
              {SERVICES_NAV.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm text-slate-400 hover:text-cyan-glow-400">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white-100">Get In Touch</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-cyan-glow-400" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-cyan-glow-400" />
                <a href={CONTACT.phoneHref} className="hover:text-cyan-glow-400">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-cyan-glow-400" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-cyan-glow-400 break-all">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-glass-border pt-8 text-xs text-slate-400 md:flex-row">
          <p>© {year} {BRAND.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-cyan-glow-400">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-cyan-glow-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
