import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import company from '@/config/company';

export const metadata: Metadata = {
  title: 'About Trinetra Fire Solutions',
  description: 'About Trinetra Fire Solutions — professional fire protection engineering company in Secunderabad, Telangana. Founded by a veteran with 30 years of Indian Army service.',
};

export default function AboutPage() {
  return (
    <div className="tfs-atm-medium tfs-grid-overlay pt-24 pb-32 min-h-screen relative">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 radial-fire-bottom opacity-20 pointer-events-none" aria-hidden="true"/>
        <div className="container-trinetra relative text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-fire-red/40"/>
            <span className="text-xs tracking-[0.5em] uppercase text-fire-red/70 font-mono">About Us</span>
            <span className="h-px w-12 bg-fire-red/40"/>
          </div>
          <h1 className="font-display text-cinematic-lg text-white mb-4">
            TRINETRA<br/><span className="text-fire-red">FIRE SOLUTIONS</span>
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
            Professional fire protection engineering, rooted in military discipline and driven by a single purpose: keeping people and property safe.
          </p>
        </div>
      </section>

      <div className="container-trinetra space-y-20">

        {/* Philosophy */}
        <section aria-labelledby="philosophy-heading">
          <div className="text-center mb-12">
            <h2 id="philosophy-heading" className="font-display text-4xl text-white mb-4">OUR PHILOSOPHY</h2>
            <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
              Fire protection is not a commodity. It is an engineering discipline that demands precision, discipline and commitment at every stage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { word: 'PREDICT', color: '#C41E3A', desc: 'Understanding risk before it becomes reality — through professional site inspection, hazard assessment and system design.' },
              { word: 'PREVENT', color: '#FF5722', desc: 'Installing and commissioning fire protection systems that are engineered to perform when they are needed most.' },
              { word: 'PROTECT', color: '#D4A017', desc: 'Ensuring fire protection systems remain fully operational at all times through maintenance, AMC and 24×7 support.' },
            ].map(p => (
              <div key={p.word} className="glass border border-white/[0.06] rounded-2xl p-7">
                <div className="font-display text-5xl mb-4 leading-none" style={{ color: p.color }}>{p.word}</div>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOUNDER SECTION ────────────────────────────── */}
        <section
          className="relative overflow-hidden rounded-3xl"
          aria-labelledby="founder-heading"
          style={{ background: 'linear-gradient(135deg, #07090B 0%, #0d1117 60%, #0B0D10 100%)' }}
        >
          {/* Atmosphere */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-0 w-[55%] h-full"
              style={{ background: 'radial-gradient(ellipse 80% 80% at 30% 50%, rgba(212,160,23,0.06) 0%, transparent 70%)' }}/>
            <div className="absolute bottom-0 right-0 w-[40%] h-[40%]"
              style={{ background: 'radial-gradient(ellipse at bottom right, rgba(196,30,58,0.06) 0%, transparent 70%)' }}/>
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.25), transparent)' }}/>
          </div>

          <div className="relative p-8 md:p-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 xl:gap-16 items-center">

              {/* Portrait */}
              <div className="flex justify-center md:justify-start">
                <div className="relative">
                  {/* Gold frame */}
                  <div
                    className="absolute -inset-[3px] rounded-[24px]"
                    style={{ background: 'linear-gradient(135deg, rgba(212,160,23,0.65) 0%, rgba(212,160,23,0.15) 40%, rgba(196,30,58,0.2) 70%, rgba(212,160,23,0.45) 100%)' }}
                    aria-hidden="true"
                  />
                  {/* Image */}
                  <div
                    className="relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
                    style={{ borderRadius: '22px', boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 0 40px rgba(212,160,23,0.07)' }}
                  >
                    <Image
                      src="/images/founder/nimmakayala-venkatesh.jpg"
                      alt="Founder and Director of Trinetra Fire Solutions"
                      width={360}
                      height={480}
                      className="block object-cover"
                      style={{ width: 'min(340px, 80vw)', height: 'auto' }}
                      loading="lazy"
                      sizes="(max-width: 768px) 80vw, 360px"
                      quality={90}
                    />
                    {/* Vignette */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(5,5,5,0.32) 100%)' }}
                      aria-hidden="true"
                    />
                  </div>
                  {/* Floating credential badge */}
                  <div
                    className="absolute -bottom-4 -right-3 md:-right-5 px-4 py-2.5 rounded-xl border border-gold/20 backdrop-blur-md"
                    style={{ background: 'rgba(8,8,8,0.92)' }}
                  >
                    <div className="text-[9px] tracking-[0.4em] text-gold/50 uppercase font-mono mb-0.5">Service</div>
                    <div className="font-display text-lg text-gold leading-none">~30 YEARS</div>
                    <div className="text-[10px] text-white/35 mt-0.5">Indian Army</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #D4A017)' }}/>
                  <span className="text-xs tracking-[0.5em] uppercase font-mono" style={{ color: 'rgba(212,160,23,0.65)' }}>
                    Meet Our Founder
                  </span>
                </div>

                <h2
                  id="founder-heading"
                  className="font-display text-white mb-2 leading-none"
                  style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', letterSpacing: '0.06em' }}
                >
                  {company.founder.name.toUpperCase()}
                </h2>
                <div className="text-xs tracking-widest uppercase mb-7 font-medium" style={{ color: '#C41E3A' }}>
                  Founder &amp; Director — Trinetra Fire Solutions
                </div>

                <div className="flex flex-wrap gap-2.5 mb-8">
                  {[
                    { label: 'Branch', value: company.founder.serviceBranch },
                    { label: 'Rank', value: company.founder.serviceRank },
                    { label: 'Service', value: company.founder.service },
                  ].map(c => (
                    <span
                      key={c.label}
                      className="px-3.5 py-1.5 rounded-lg border text-xs"
                      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(212,160,23,0.18)', color: 'rgba(245,240,232,0.65)' }}
                    >
                      <span style={{ color: 'rgba(212,160,23,0.6)' }}>{c.label}:</span>{' '}
                      <span className="font-semibold">{c.value}</span>
                    </span>
                  ))}
                </div>

                <p className="leading-relaxed mb-4" style={{ color: 'rgba(245,240,232,0.82)', fontSize: '1.02rem' }}>
                  Experienced Fire &amp; Safety Professional dedicated to protecting lives, property and businesses through advanced fire safety solutions and uncompromising service standards.
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(245,240,232,0.48)' }}>
                  After approximately {company.founder.service} of distinguished service in the Indian Army as a {company.founder.serviceRank}, {company.founder.shortName} founded Trinetra Fire Solutions on a simple conviction: fire protection is not a commodity — it is an engineering discipline that demands the same precision and commitment that define military service.
                </p>
                <p className="text-sm leading-relaxed mb-9" style={{ color: 'rgba(245,240,232,0.48)' }}>
                  Fire protection systems are life-safety infrastructure. They must be right the first time, and maintained to remain right. That is the standard we hold.
                </p>

                <div className="flex items-center gap-4 mb-9">
                  <div className="h-px flex-1" style={{ background: 'rgba(212,160,23,0.2)' }}/>
                  <span className="text-[10px] tracking-[0.5em] font-mono" style={{ color: 'rgba(212,160,23,0.45)' }}>
                    PREDICT · PREVENT · PROTECT
                  </span>
                  <div className="h-px flex-1" style={{ background: 'rgba(212,160,23,0.2)' }}/>
                </div>

                <Link
                  href="/contact"
                  id="about-founder-cta"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #8E1027, #C41E3A)', boxShadow: '0 4px 20px rgba(196,30,58,0.30)' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                  </svg>
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Company facts */}
        <section aria-labelledby="facts-heading">
          <h2 id="facts-heading" className="font-display text-3xl text-white text-center mb-12">COMPANY FACTS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: 'Registered Business', value: 'GST Reg.', sub: company.gst, color: '#D4A017' },
              { label: 'Headquarters', value: 'Secunderabad', sub: 'Telangana, India', color: '#C41E3A' },
              { label: 'Emergency Support', value: '24×7', sub: 'Round-the-clock', color: '#FF5722' },
              { label: 'Standards', value: 'IS / NBC', sub: 'Systems designed per Indian Standards & NBC', color: '#7C3AED' },
            ].map(fact => (
              <div key={fact.label} className="glass border border-white/[0.06] rounded-2xl p-6 text-center">
                <div className="font-display text-3xl mb-1" style={{ color: fact.color }}>{fact.value}</div>
                <div className="text-white text-sm font-semibold mb-2">{fact.label}</div>
                <div className="text-white/35 text-xs leading-relaxed">{fact.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Location & contact */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8" aria-labelledby="location-heading">
          <div className="glass border border-white/[0.06] rounded-2xl p-8">
            <h2 id="location-heading" className="font-display text-2xl text-white mb-5">LOCATION</h2>
            <address className="not-italic text-white/60 leading-relaxed text-sm mb-6">
              {company.address.line1}<br/>
              {company.address.line2}<br/>
              {company.address.area}<br/>
              {company.address.locality}, {company.address.city}<br/>
              {company.address.state} – {company.address.pincode}
            </address>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(company.address.compact)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-fire-red/70 hover:text-fire-red transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
              Open in Maps
            </a>
          </div>

          <div className="glass border border-white/[0.06] rounded-2xl p-8">
            <h2 className="font-display text-2xl text-white mb-5">CONTACT</h2>
            <div className="space-y-4">
              {[
                { label: 'Primary', value: company.contact.primaryPhone, href: company.contact.primaryPhoneTel },
                { label: 'Secondary', value: company.contact.secondaryPhone, href: company.contact.secondaryPhoneTel },
                { label: 'WhatsApp', value: company.contact.whatsapp, href: company.whatsapp.generic() },
                { label: 'Email', value: company.contact.email, href: company.contact.emailHref },
              ].map(c => (
                <div key={c.label} className="flex items-center justify-between gap-4">
                  <span className="text-xs text-white/25 uppercase tracking-widest w-20 flex-shrink-0">{c.label}</span>
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-white transition-colors truncate">{c.value}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link href="/request-quote"
            className="inline-flex items-center gap-3 px-10 py-4 bg-fire-red text-white font-bold text-sm rounded-xl btn-shadow-fire hover:bg-fire-red-light transition-all hover:scale-[1.02]">
            Request a Quotation
          </Link>
        </div>

      </div>
    </div>
  );
}
