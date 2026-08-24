import type { Metadata } from 'next';
import company from '@/config/company';
import { serviceCategories } from '@/data/services';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fire Protection Services | Trinetra Fire Solutions',
  description: 'Complete fire protection engineering services — hydrant systems, sprinklers, fire alarms, extinguisher supply, AMC contracts, fire safety audits and site inspections in Hyderabad, Secunderabad, Telangana.',
};

const ICON_PATHS: Record<string, string> = {
  droplets: 'M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 18a.75.75 0 01-.75-.75v-6a.75.75 0 011.5 0v6A.75.75 0 0112 18zM12 8.25a.75.75 0 100 1.5.75.75 0 000-1.5z',
  siren: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0',
  flame: 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z',
  wrench: 'M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z',
  'clipboard-check': 'M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75',
};

const CAT_COLORS: Record<string, { accent: string; glow: string }> = {
  'fire-protection-systems': { accent: 'rgba(196,30,58,', glow: 'rgba(196,30,58,0.06)' },
  'fire-detection-alarm':    { accent: 'rgba(255,87,34,', glow: 'rgba(255,87,34,0.06)' },
  'extinguisher-services':   { accent: 'rgba(212,160,23,', glow: 'rgba(212,160,23,0.05)' },
  'maintenance':             { accent: 'rgba(100,160,255,', glow: 'rgba(100,160,255,0.05)' },
  'engineering-compliance':  { accent: 'rgba(100,200,120,', glow: 'rgba(100,200,120,0.05)' },
};

export default function ServicesPage() {
  return (
    <div className="tfs-atm-full tfs-grid-overlay relative" style={{
      paddingTop: 88, minHeight: '100vh',
    }}>
      {/* Hero */}
      <section style={{ padding: 'clamp(48px,8vw,100px) 0 clamp(32px,5vw,56px)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(196,30,58,0.14) 0%, rgba(120,20,20,0.06) 50%, transparent 75%)',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

        <div className="container-trinetra relative">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:16 }}>
            <div style={{ height:1, width:40, background:'rgba(196,30,58,0.45)' }}/>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(196,30,58,0.7)' }}>
              What We Do
            </span>
            <div style={{ height:1, width:40, background:'rgba(196,30,58,0.45)' }}/>
          </div>
          <h1 className="font-display" style={{ fontSize:'clamp(2.5rem,8vw,5.5rem)', color:'rgba(245,240,232,0.95)', lineHeight:1, marginBottom:16 }}>
            FIRE PROTECTION<br/>
            <span className="gold-shine">SERVICES</span>
          </h1>
          <p style={{ color:'rgba(245,240,232,0.45)', fontSize:'1rem', maxWidth:560, margin:'0 auto', lineHeight:1.75, marginBottom:32 }}>
            End-to-end fire protection engineering — from design and supply through to installation, commissioning, maintenance and compliance.
          </p>

          {/* Quick jump links */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center' }}>
            {serviceCategories.map(cat => (
              <a key={cat.slug} href={`#${cat.slug}`} style={{
                padding:'6px 16px', borderRadius:99,
                background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
                color:'rgba(255,255,255,0.55)', fontSize:'0.78rem', textDecoration:'none',
                transition:'all 200ms ease',
              }}>
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service categories — each with a unique ID matching the navigation hash */}
      <div className="container-trinetra" style={{ paddingBottom:96, display:'flex', flexDirection:'column', gap:72 }}>
        {serviceCategories.map((cat) => {
          const colors = CAT_COLORS[cat.slug] || { accent: 'rgba(196,30,58,', glow: 'rgba(196,30,58,0.06)' };
          return (
            <section
              key={cat.slug}
              id={cat.slug}
              aria-labelledby={`cat-${cat.slug}`}
              style={{ scrollMarginTop: 100 }}
            >
              {/* Category header */}
              <div style={{ display:'flex', alignItems:'flex-start', gap:20, marginBottom:28 }}>
                <div style={{
                  width:52, height:52, borderRadius:14, flexShrink:0,
                  background:`${colors.accent}0.08)`,
                  border:`1px solid ${colors.accent}0.2)`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <svg style={{ width:22, height:22, color:`${colors.accent}0.85)` }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS[cat.icon] || ICON_PATHS.flame}/>
                  </svg>
                </div>
                <div>
                  <h2 id={`cat-${cat.slug}`} className="font-display" style={{
                    fontSize:'clamp(1.6rem,4vw,2.4rem)',
                    color:'rgba(245,240,232,0.95)', marginBottom:6,
                  }}>
                    {cat.title.toUpperCase()}
                  </h2>
                  <p style={{ color:'rgba(245,240,232,0.4)', fontSize:'0.9rem' }}>{cat.description}</p>
                </div>
              </div>

              {/* Service cards — no Links to non-existent routes */}
              <div style={{
                display:'grid', gap:14,
                gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,280px),1fr))',
              }}>
                {cat.services.map(service => (
                  <div
                    key={service.slug}
                    style={{
                      borderRadius:18, overflow:'hidden',
                      background:'rgba(255,255,255,0.025)',
                      border:`1px solid rgba(255,255,255,0.06)`,
                      padding:'1.5rem',
                      display:'flex', flexDirection:'column',
                    }}
                  >
                    <h3 className="font-display" style={{
                      fontSize:'clamp(1rem,2.5vw,1.25rem)',
                      color:'rgba(245,240,232,0.92)', marginBottom:10, lineHeight:1.1,
                    }}>
                      {service.title.toUpperCase()}
                    </h3>
                    <p style={{ color:'rgba(245,240,232,0.4)', fontSize:'0.82rem', lineHeight:1.7, marginBottom:14, flex:1 }}>
                      {service.shortDescription}
                    </p>

                    {/* Features list */}
                    <ul style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:18 }}>
                      {service.features.slice(0, 3).map(f => (
                        <li key={f} style={{ display:'flex', alignItems:'flex-start', gap:8, fontSize:'0.75rem', color:'rgba(245,240,232,0.35)' }}>
                          <span style={{ width:4, height:4, borderRadius:'50%', background:`${colors.accent}0.6)`, flexShrink:0, marginTop:6 }}/>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA — WhatsApp for this service */}
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                      <a
                        href={company.whatsapp.generic(`Hello Trinetra Fire Solutions,\n\nI am interested in ${service.title}.\n\nName:\nCompany:\nLocation:\nRequirement:\n\nPlease contact me at your earliest convenience.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display:'flex', alignItems:'center', gap:6,
                          padding:'8px 16px', borderRadius:10,
                          background:'rgba(37,211,102,0.08)',
                          border:'1px solid rgba(37,211,102,0.2)',
                          color:'#25D366', fontSize:'0.75rem', fontWeight:600,
                          textDecoration:'none',
                        }}
                      >
                        <svg style={{ width:12, height:12, flexShrink:0 }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.847L.044 24l6.324-1.653A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.938 0-3.754-.524-5.31-1.435l-.383-.226-3.752.981.999-3.655-.248-.396A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                        </svg>
                        Enquire
                      </a>
                      <Link
                        href="/request-quote"
                        style={{
                          display:'flex', alignItems:'center', gap:6,
                          padding:'8px 16px', borderRadius:10,
                          background:`${colors.accent}0.08)`,
                          border:`1px solid ${colors.accent}0.2)`,
                          color:`${colors.accent}0.85)`, fontSize:'0.75rem', fontWeight:600,
                          textDecoration:'none',
                        }}
                      >
                        Get Quote
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="container-trinetra" style={{ paddingBottom:96 }}>
        <div style={{
          background:'linear-gradient(135deg,rgba(196,30,58,0.08),rgba(212,160,23,0.05))',
          border:'1px solid rgba(196,30,58,0.15)',
          borderRadius:24, padding:'clamp(2rem,6vw,4rem)', textAlign:'center',
        }}>
          <h2 className="font-display" style={{ fontSize:'clamp(1.5rem,4vw,2.5rem)', color:'rgba(245,240,232,0.95)', marginBottom:12 }}>
            READY TO PROTECT YOUR FACILITY?
          </h2>
          <p style={{ color:'rgba(245,240,232,0.45)', marginBottom:28, maxWidth:520, margin:'0 auto 28px' }}>
            Contact us for a site inspection or request a quotation. Our team will assess your requirements and provide a comprehensive proposal.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center' }}>
            <Link href="/request-quote" className="tfs-btn-primary">
              <span className="tfs-btn-shine"/>
              <span className="relative">Get a Quotation</span>
            </Link>
            <Link href="/request-inspection" className="tfs-btn-ghost">
              Request Site Inspection
            </Link>
            <a href={company.contact.primaryPhoneTel} className="tfs-btn-ghost" style={{ gap:8, display:'flex', alignItems:'center' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              {company.contact.primaryPhone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
