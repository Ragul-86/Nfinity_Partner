import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const VARIANTS = {
  primary:
    'bg-gradient-accent text-navy-950 font-semibold shadow-glow hover:shadow-glow-lg hover:scale-[1.02]',
  secondary:
    'bg-glass-fill border border-glass-border text-white-100 hover:border-electric-blue-400/60 hover:bg-white/[0.07]',
  ghost: 'text-white-100 hover:text-cyan-glow-400',
};

const SIZES = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

/**
 * Renders an <a>/<Link> when `href` is provided, otherwise a <button>.
 * { variant: 'primary'|'secondary'|'ghost', size: 'md'|'lg', withArrow }
 */
export const Button = forwardRef(function Button(
  { href, variant = 'primary', size = 'md', withArrow = false, className = '', children, ...props },
  ref
) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 ease-out whitespace-nowrap ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const content = (
    <>
      {children}
      {withArrow && <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />}
    </>
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
    if (isExternal) {
      return (
        <a ref={ref} href={href} className={`group ${classes}`} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} {...props}>
          {content}
        </a>
      );
    }
    return (
      <Link ref={ref} to={href} className={`group ${classes}`} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button ref={ref} className={`group ${classes}`} {...props}>
      {content}
    </button>
  );
});
