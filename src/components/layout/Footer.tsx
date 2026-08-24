'use client';
import Link from 'next/link';
import TrinetraLogo from '@/components/brand/TrinetraLogo';
import company from '@/config/company';
import { navItems } from '@/data/navigation';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-graphite border-t border-white/[0.05] pt-20 pb-8" role="contentinfo">
      {/* Top ambient glow */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire-red/40 to-transparent -mt-20 pointer-events-none" aria-hidden="true"/>

      <div className="container-trinetra">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <TrinetraLogo variant="footer" className="mb-6" />
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Professional fire protection engineering for industrial, commercial and institutional facilities across Hyderabad, Secunderabad and Telangana.
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="text-xs tracking-[0.3em] text-white/25 uppercase mb-2">GST Registered</div>
              <div className="font-mono text-xs text-fire-red/80 tracking-wider">{company.gst}</div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold tracking-[0.25em] uppercase text-white/40 mb-5">Services</h3>
            <ul className="space-y-3" role="list">
              {[
                { label: 'Fire Hydrant Systems', href: '/services/fire-protection-systems', id: 'hydrant' },
                { label: 'Fire Sprinkler Systems', href: '/services/fire-protection-systems#sprinklers', id: 'sprinkler' },
                { label: 'Fire Alarm Systems', href: '/services/fire-detection-alarm', id: 'alarm' },
                { label: 'Fire Extinguishers', href: '/services/extinguisher-services', id: 'extinguisher' },
                { label: 'AMC & Maintenance', href: '/services/maintenance', id: 'amc' },
                { label: 'Fire Safety Audits', href: '/services/engineering-compliance', id: 'audit' },
                { label: 'Site Inspections', href: '/request-inspection', id: 'inspection' },
              ].map(item => (
                <li key={item.id}>
                  <Link href={item.href} className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold tracking-[0.25em] uppercase text-white/40 mb-5">Quick Links</h3>
            <ul className="space-y-3" role="list">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Products', href: '/products' },
                { label: 'Industries', href: '/industries' },
                { label: 'Fire Knowledge', href: '/fire-knowledge' },
                { label: 'Request a Quote', href: '/request-quote' },
                { label: 'Fire Audit', href: '/fire-audit' },
                { label: 'Contact', href: '/contact' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-[0.25em] uppercase text-white/40 mb-5">Contact</h3>
            <address className="not-italic space-y-4">
              <div>
                <div className="text-xs text-white/30 uppercase tracking-widest mb-1.5">Address</div>
                <p className="text-sm text-white/60 leading-relaxed">
                  {company.address.line1}, {company.address.line2}<br/>
                  {company.address.area}<br/>
                  {company.address.locality}, {company.address.city}<br/>
                  {company.address.state} – {company.address.pincode}
                </p>
              </div>
              <div>
                <div className="text-xs text-white/30 uppercase tracking-widest mb-1.5">Phone</div>
                <a href={company.contact.primaryPhoneTel} className="block text-sm text-white/70 hover:text-white transition-colors">
                  {company.contact.primaryPhone}
                </a>
                <a href={company.contact.secondaryPhoneTel} className="block text-sm text-white/70 hover:text-white transition-colors">
                  {company.contact.secondaryPhone}
                </a>
              </div>
              <div>
                <div className="text-xs text-white/30 uppercase tracking-widest mb-1.5">Email</div>
                <a href={company.contact.emailHref} className="text-sm text-white/70 hover:text-white transition-colors break-all">
                  {company.contact.email}
                </a>
              </div>
              <div>
                <div className="text-xs text-white/30 uppercase tracking-widest mb-1.5">Support</div>
                <p className="text-sm text-white/60">{company.support.description}</p>
              </div>
            </address>
          </div>
        </div>

        {/* Emergency CTA bar */}
        <div className="glass-fire rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs tracking-[0.4em] text-fire-red uppercase mb-1">Emergency Fire System Support</div>
            <div className="text-white font-semibold">Available 24×7 — Call us immediately</div>
          </div>
          <div className="flex gap-3">
            <a
              href={company.contact.primaryPhoneTel}
              className="flex items-center gap-2 px-5 py-2.5 bg-fire-red text-white text-sm font-semibold rounded-xl btn-shadow-fire hover:bg-fire-red-light transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              {company.contact.primaryPhone}
            </a>
            <a
              href={company.whatsapp.generic()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 btn-whatsapp text-sm font-semibold rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.847L.044 24l6.324-1.653A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.938 0-3.754-.524-5.31-1.435l-.383-.226-3.752.981.999-3.655-.248-.396A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" fillRule="evenodd"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider-fire mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {year} {company.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-white/60 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
