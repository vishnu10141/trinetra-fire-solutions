import type { Metadata } from 'next';
import Link from 'next/link';
import company from '@/config/company';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Trinetra Fire Solutions — fire protection engineering company in Secunderabad, Telangana. Call, WhatsApp or email us for quotations, inspections, audits and AMC.',
};

export default function ContactPage() {
  return (
    <div className="tfs-atm-medium tfs-grid-overlay pt-24 pb-32 min-h-screen relative">
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 radial-fire-bottom opacity-20 pointer-events-none" aria-hidden="true"/>
        <div className="container-trinetra relative text-center">
          <h1 className="font-display text-cinematic-lg text-white mb-4">CONTACT<br/><span className="gold-shine">TRINETRA</span></h1>
          <p className="text-white/50 text-xl max-w-xl mx-auto">Get in touch for quotations, inspections, audits, AMC enquiries or any fire protection requirement.</p>
        </div>
      </section>

      <div className="container-trinetra">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

          {/* Contact methods */}
          <div className="space-y-5">
            <h2 className="font-display text-2xl text-white mb-6">GET IN TOUCH</h2>

            {[
              {
                label: 'Primary Phone',
                value: company.contact.primaryPhone,
                href: company.contact.primaryPhoneTel,
                icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>,
                color: '#C41E3A',
                note: 'Business hours: Mon–Sat, 9AM–7PM',
              },
              {
                label: 'Secondary Phone',
                value: company.contact.secondaryPhone,
                href: company.contact.secondaryPhoneTel,
                icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>,
                color: '#C41E3A',
                note: 'Also available on WhatsApp',
              },
              {
                label: 'WhatsApp',
                value: company.contact.whatsapp,
                href: company.whatsapp.generic(),
                icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.847L.044 24l6.324-1.653A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.938 0-3.754-.524-5.31-1.435l-.383-.226-3.752.981.999-3.655-.248-.396A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>,
                color: '#25D366',
                note: '24×7 for urgent requirements',
              },
              {
                label: 'Email',
                value: company.contact.email,
                href: company.contact.emailHref,
                icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>,
                color: '#D4A017',
                note: 'We respond within one business day',
              },
            ].map(c => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-4 glass border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110" style={{ background: `${c.color}15`, color: c.color }}>
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs text-white/30 tracking-widest uppercase mb-1">{c.label}</div>
                  <div className="text-white font-semibold mb-0.5 group-hover:text-opacity-90">{c.value}</div>
                  <div className="text-white/40 text-xs">{c.note}</div>
                </div>
              </a>
            ))}

            {/* Address */}
            <div className="glass border border-white/[0.06] rounded-xl p-5">
              <div className="text-xs text-white/30 tracking-widest uppercase mb-3">Office Address</div>
              <address className="not-italic text-white/60 text-sm leading-relaxed">
                {company.address.compact}
              </address>
              <a
                href={`https://maps.app.goo.gl/Mp1Ke4HSzpZj83848`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-fire-red/60 hover:text-fire-red mt-3 transition-colors"
              >
                View on Google Maps
                <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </a>
            </div>
          </div>

          {/* Quick action panel */}
          <div>
            <h2 className="font-display text-2xl text-white mb-6">WHAT DO YOU NEED?</h2>
            <div className="space-y-3">
              {[
                { title: 'Request a Quotation', desc: 'Get a price for systems, equipment or services', href: '/request-quote', color: '#C41E3A' },
                { title: 'Site Inspection', desc: 'Have our team assess your facility', href: '/request-inspection', color: '#FF5722' },
                { title: 'Fire Safety Audit', desc: 'Structured audit of your current fire protection', href: '/fire-audit', color: '#7C3AED' },
                { title: 'AMC Proposal', desc: 'Annual maintenance contract for your systems', href: '/amc', color: '#16A34A' },
                { title: 'General Enquiry', desc: 'Any other fire protection requirement', href: company.whatsapp.generic(), color: '#D4A017', external: true },
              ].map(action => (
                <Link
                  key={action.title}
                  href={action.href}
                  target={action.external ? '_blank' : undefined}
                  rel={action.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 glass border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all duration-300 group hover:-translate-y-0.5"
                >
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-125" style={{ background: action.color }}/>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm mb-0.5">{action.title}</div>
                    <div className="text-white/40 text-xs">{action.desc}</div>
                  </div>
                  <svg className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ))}
            </div>

            {/* Business hours */}
            <div className="mt-6 glass border border-white/[0.06] rounded-xl p-5">
              <div className="text-xs text-white/30 tracking-widest uppercase mb-3">Business Hours</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">{company.businessHours.weekdays}</span>
                  <span className="text-white">{company.businessHours.hours}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Emergency Support</span>
                  <span className="text-fire-red">{company.businessHours.emergency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
