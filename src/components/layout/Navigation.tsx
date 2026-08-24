'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems, primaryCTA } from '@/data/navigation';
import TrinetraLogo from '@/components/brand/TrinetraLogo';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { cn } from '@/lib/utils';
import company from '@/config/company';

export default function Navigation() {
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-[9000] transition-all duration-500',
          isScrolled
            ? 'bg-void/95 border-b border-white/[0.06] backdrop-blur-xl shadow-2xl shadow-black/50 py-2'
            : 'bg-transparent py-5',
        )}
        role="banner"
      >
        <div className="container-trinetra">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" aria-label="Trinetra Fire Solutions — Home">
              <TrinetraLogo variant="nav" glowing={!isScrolled} />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navItems.slice(0, 7).map(item => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200',
                      'after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[1px] after:bg-fire-red',
                      'after:scale-x-0 after:transition-transform after:duration-200',
                      'hover:text-white hover:after:scale-x-100',
                      isActive(item.href)
                        ? 'text-white after:scale-x-100'
                        : 'text-white/60',
                    )}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                    {item.children && (
                      <svg className="inline-block ml-1 w-2.5 h-2.5 opacity-50" fill="none" viewBox="0 0 10 6">
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[220px] glass-dark rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60"
                      onMouseEnter={() => handleDropdownEnter(item.label)}
                      onMouseLeave={handleDropdownLeave}
                      role="menu"
                    >
                      <div className="h-[1px] bg-gradient-to-r from-transparent via-fire-red to-transparent opacity-60 mb-1"/>
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'flex items-center gap-3 px-4 py-3 text-sm transition-all duration-150',
                            'hover:bg-white/[0.04] hover:text-white group',
                            isActive(child.href) ? 'text-white bg-fire-red/10' : 'text-white/60',
                          )}
                          role="menuitem"
                        >
                          <span className="w-1 h-1 rounded-full bg-fire-red opacity-0 group-hover:opacity-100 transition-opacity"/>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* WhatsApp quick link */}
              <a
                href={company.whatsapp.generic()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#25D366] border border-[#25D366]/25 rounded-full hover:bg-[#25D366]/10 transition-colors duration-200"
                aria-label="Contact via WhatsApp"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.847L.044 24l6.324-1.653A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.938 0-3.754-.524-5.31-1.435l-.383-.226-3.752.981.999-3.655-.248-.396A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" fillRule="evenodd"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              <Link
                href={primaryCTA.href}
                id="nav-get-quote-btn"
                className="btn-shadow-fire px-5 py-2.5 text-sm font-semibold tracking-wide text-white bg-fire-red rounded-lg hover:bg-fire-red-light transition-all duration-200 hover:scale-[1.02]"
              >
                {primaryCTA.label}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              <span className={cn('w-6 h-0.5 bg-white transition-all duration-300', mobileOpen && 'rotate-45 translate-y-2')}/>
              <span className={cn('w-4 h-0.5 bg-white transition-all duration-300', mobileOpen && 'opacity-0')}/>
              <span className={cn('w-6 h-0.5 bg-white transition-all duration-300', mobileOpen && '-rotate-45 -translate-y-2')}/>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[8999] lg:hidden transition-all duration-500',
          mobileOpen ? 'visible' : 'invisible',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Backdrop */}
        <div
          className={cn('absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500', mobileOpen ? 'opacity-100' : 'opacity-0')}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          className={cn(
            'absolute top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-graphite border-l border-white/[0.08] transition-transform duration-500 flex flex-col',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
            <TrinetraLogo variant="nav" />
            <button onClick={() => setMobileOpen(false)} className="p-2 text-white/50 hover:text-white" aria-label="Close menu">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto p-5 space-y-1" aria-label="Mobile navigation">
            {navItems.map(item => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.href) ? 'bg-fire-red/15 text-white border border-fire-red/20' : 'text-white/70 hover:text-white hover:bg-white/[0.04]',
                  )}
                  onClick={() => !item.children && setMobileOpen(false)}
                >
                  {item.label}
                  {item.children && (
                    <svg className="w-4 h-4 opacity-40" fill="none" viewBox="0 0 16 16">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l border-white/[0.06] pl-3">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-xs text-white/50 hover:text-white/80 transition-colors rounded-md hover:bg-white/[0.03]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="p-5 border-t border-white/[0.06] space-y-3">
            <Link
              href="/request-quote"
              className="block w-full text-center py-3.5 text-sm font-semibold text-white bg-fire-red rounded-xl btn-shadow-fire hover:bg-fire-red-light transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Get a Quote
            </Link>
            <a
              href={`tel:${company.contact.primaryPhoneRaw}`}
              className="block w-full text-center py-3 text-sm text-white/70 border border-white/10 rounded-xl hover:bg-white/[0.04] transition-colors"
            >
              {company.contact.primaryPhone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
