'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import company from '@/config/company';

// Official Google Maps destination — do not change this to a generic search
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/Mp1Ke4HSzpZj83848';

const WA_SVG = (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.847L.044 24l6.324-1.653A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.938 0-3.754-.524-5.31-1.435l-.383-.226-3.752.981.999-3.655-.248-.396A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const ts = [
      setTimeout(() => setPhase(1), 80),
      setTimeout(() => setPhase(2), 260),
      setTimeout(() => setPhase(3), 480),
      setTimeout(() => setPhase(4), 700),
    ];
    return () => ts.forEach(clearTimeout);
  }, [visible]);

  const fadeIn = (p: number, delay = 0, extraStyle: React.CSSProperties = {}): React.CSSProperties => ({
    opacity:   phase >= p ? 1 : 0,
    transform: phase >= p ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    ...extraStyle,
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#050708 0%,#040507 100%)', padding: 'clamp(72px,12vw,140px) 0' }}
      aria-labelledby="contact-cta-heading"
    >
      {/* Background layers */}
      <div aria-hidden="true" style={{ position:'absolute',inset:0,pointerEvents:'none',
        background:'radial-gradient(ellipse 70% 55% at 50% 100%, rgba(196,30,58,0.12) 0%, transparent 70%)' }} />
      <div aria-hidden="true" style={{ position:'absolute',inset:0,pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',
        backgroundSize:'60px 60px', opacity: 0.6 }} />
      {/* Top engineering line — draws across */}
      <div aria-hidden="true" style={{
        position:'absolute',top:0,left:0,right:0,height:1,
        background:'linear-gradient(90deg,transparent,rgba(196,30,58,0.35),rgba(212,160,23,0.25),transparent)',
        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin:'left',
        transition:'transform 1000ms cubic-bezier(0.4,0,0.2,1)',
      }}/>

      <div className="container-trinetra relative">
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow */}
          <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:16,marginBottom:20,
            ...fadeIn(1, 0) }}>
            <div style={{ height:1,width: phase>=1?48:0, background:'rgba(196,30,58,0.5)', transition:'width 700ms cubic-bezier(0.16,1,0.3,1)' }}/>
            <span style={{ fontFamily:'var(--font-mono)',fontSize:'0.62rem',letterSpacing:'0.5em',textTransform:'uppercase',color:'rgba(196,30,58,0.7)' }}>
              Ready Before It Matters
            </span>
            <div style={{ height:1,width: phase>=1?48:0, background:'rgba(196,30,58,0.5)', transition:'width 700ms cubic-bezier(0.16,1,0.3,1) 100ms' }}/>
          </div>

          {/* Headline */}
          <h2
            id="contact-cta-heading"
            className="font-display text-cinematic-lg text-white mb-5"
            style={{
              clipPath: phase>=1 ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
              transition: 'clip-path 900ms cubic-bezier(0.16,1,0.3,1) 100ms',
            }}
          >
            PROTECT YOUR<br/>
            <span className="gold-shine">FACILITY TODAY</span>
          </h2>

          <p className="text-lg leading-relaxed mb-14 max-w-2xl mx-auto" style={{
            color:'rgba(245,240,232,0.48)',
            ...fadeIn(2, 200),
          }}>
            A fire system that works when it&rsquo;s needed is the result of engineering done right
            — and maintained with discipline. Let us build and keep that assurance for you.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-wrap gap-3 justify-center mb-16" style={fadeIn(2, 300)}>
            <Link
              href="/request-quote"
              id="cta-section-quote-btn"
              className="tfs-btn-primary group"
              data-cursor="quote"
            >
              <span className="tfs-btn-shine"/>
              <span className="relative flex items-center gap-2">
                Get a Quotation
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>

            <a
              href={company.whatsapp.quote()}
              target="_blank"
              rel="noopener noreferrer"
              className="tfs-btn-whatsapp flex items-center gap-2"
              data-cursor="contact"
            >
              {WA_SVG}
              WhatsApp Enquiry
            </a>

            <a
              href={company.contact.primaryPhoneTel}
              className="tfs-btn-ghost flex items-center gap-2"
              aria-label={`Call ${company.contact.primaryPhone}`}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Call Now
            </a>
          </div>

          {/* Contact detail row */}
          <div style={{ height:1,background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)',marginBottom:36 }}/>

          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            style={fadeIn(3, 300)}
          >
            {/* Phone */}
            <div style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-mono)',fontSize:'0.58rem',letterSpacing:'0.4em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:10 }}>
                Call Direct
              </div>
              <a
                href={company.contact.primaryPhoneTel}
                className="font-display text-2xl hover:text-fire-red transition-colors duration-200"
                style={{ color:'rgba(245,240,232,0.9)', textDecoration:'none' }}
              >
                {company.contact.primaryPhone}
              </a>
              <div style={{ marginTop:4, fontSize:'0.72rem', color:'rgba(255,255,255,0.2)' }}>
                {company.contact.secondaryPhone}
              </div>
            </div>

            {/* WhatsApp */}
            <div style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-mono)',fontSize:'0.58rem',letterSpacing:'0.4em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:10 }}>
                WhatsApp
              </div>
              <a
                href={company.whatsapp.generic()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl transition-colors duration-200"
                style={{ color:'#25D366', textDecoration:'none' }}
              >
                {company.contact.whatsapp}
              </a>
              <div style={{ marginTop:4,fontSize:'0.72rem',color:'rgba(255,255,255,0.2)' }}>
                Message anytime
              </div>
            </div>

            {/* Email */}
            <div style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-mono)',fontSize:'0.58rem',letterSpacing:'0.4em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:10 }}>
                Email
              </div>
              <a
                href={company.contact.emailHref}
                className="font-display text-lg transition-colors duration-200 hover:text-white"
                style={{ color:'rgba(245,240,232,0.65)', textDecoration:'none', wordBreak:'break-all' }}
              >
                {company.contact.email}
              </a>
              <div style={{ marginTop:4,fontSize:'0.72rem',color:'rgba(255,255,255,0.2)' }}>
                Responds within 24h
              </div>
            </div>
          </div>

          {/* Google Maps / Location CTA */}
          <div style={{ marginTop:40, ...fadeIn(4, 200) }}>
            <div style={{ height:1,background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)',marginBottom:28 }}/>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 rounded-2xl group"
              style={{
                background:'rgba(255,255,255,0.025)',
                border:'1px solid rgba(255,255,255,0.06)',
                padding:'1rem 1.5rem',
                textDecoration:'none',
                transition:'border-color 300ms ease,background 300ms ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,160,23,0.25)';
                (e.currentTarget as HTMLElement).style.background  = 'rgba(212,160,23,0.04)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLElement).style.background  = 'rgba(255,255,255,0.025)';
              }}
              data-cursor="view"
            >
              {/* Map pin icon */}
              <div style={{
                width:40,height:40,borderRadius:'50%',
                background:'rgba(212,160,23,0.08)',
                border:'1px solid rgba(212,160,23,0.18)',
                display:'flex',alignItems:'center',justifyContent:'center',
                flexShrink:0,
              }}>
                <svg className="w-5 h-5" style={{ color:'rgba(212,160,23,0.8)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                </svg>
              </div>

              <div style={{ textAlign:'left', flex:1 }}>
                <div style={{ fontSize:'0.68rem',fontFamily:'var(--font-mono)',letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(212,160,23,0.65)',marginBottom:4 }}>
                  Visit Trinetra
                </div>
                <address className="not-italic" style={{ fontSize:'0.82rem',color:'rgba(245,240,232,0.6)',lineHeight:1.45 }}>
                  {company.address.compact}
                </address>
              </div>

              <div style={{ display:'flex',alignItems:'center',gap:4,color:'rgba(212,160,23,0.7)',flexShrink:0 }}>
                <span style={{ fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.05em' }}>
                  Directions
                </span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
