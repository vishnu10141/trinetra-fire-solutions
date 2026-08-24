'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import company from '@/config/company';
import TrinetraAtmosphere from '@/components/background/TrinetraAtmosphere';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';
import { useTransparentLogo } from '@/hooks/useTransparentLogo';
import { EASE, DUR } from '@/lib/motion';

export default function Hero() {
  const prefersRM  = useReducedMotion();
  const tier       = useDevicePerformance();
  const logoSrc    = useTransparentLogo('/brand/trinetra-logo-hd.png', 22);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase(p => Math.max(p, 1)), 100),
      setTimeout(() => setPhase(p => Math.max(p, 2)), 240),
      setTimeout(() => setPhase(p => Math.max(p, 3)), 380),
      setTimeout(() => setPhase(p => Math.max(p, 4)), 520),
      setTimeout(() => setPhase(p => Math.max(p, 5)), 740),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);

  const lineIn = (p: number, delay: number): React.CSSProperties => ({
    display: 'block',
    clipPath:  phase >= p ? 'inset(0 0% 0 0)'  : 'inset(0 102% 0 0)',
    transform: phase >= p ? 'translateY(0)'     : 'translateY(14px)',
    transition: `clip-path ${DUR.reveal}ms ${EASE.out} ${delay}ms, transform ${DUR.reveal}ms ${EASE.out} ${delay}ms`,
  });

  const fadeIn = (p: number, delay: number): React.CSSProperties => ({
    opacity:   phase >= p ? 1 : 0,
    transform: phase >= p ? 'translateY(0)' : 'translateY(8px)',
    transition: `opacity ${DUR.emphasis}ms ${EASE.out} ${delay}ms, transform ${DUR.emphasis}ms ${EASE.out} ${delay}ms`,
  });

  return (
    <section
      className="relative overflow-hidden tfs-hero-section"
      style={{
        height:'100dvh', minHeight:560, maxHeight:1100,
        display:'flex', flexDirection:'column',
      }}
      aria-label="Trinetra Fire Solutions"
    >

      {/* ── BG LAYER A: deep navy left-side depth ── */}
      <div aria-hidden="true" style={{
        position:'absolute', inset:0, zIndex:1, pointerEvents:'none',
        background:[
          'radial-gradient(ellipse 65% 80% at 5% 50%,  rgba(6,8,22,0.72)  0%, transparent 70%)',
          'radial-gradient(ellipse 40% 55% at 0% 20%,  rgba(4,6,18,0.55)  0%, transparent 60%)',
          'radial-gradient(ellipse 50% 45% at 0% 85%,  rgba(4,5,16,0.50)  0%, transparent 60%)',
        ].join(','),
      }}/>

      {/* ── BG LAYER B: main amber cinematic glow — right side, behind logo ── */}
      <div aria-hidden="true" style={{
        position:'absolute', zIndex:2, pointerEvents:'none',
        right:0, top:0, bottom:0, width:'62%',
        background:[
          /* Core hot amber glow — logo focal point */
          'radial-gradient(ellipse 58% 62% at 65% 46%, rgba(210,108,14,0.42) 0%, rgba(170,70,10,0.24) 28%, rgba(110,36,4,0.10) 55%, transparent 75%)',
          /* Wider warm halo */
          'radial-gradient(ellipse 80% 75% at 58% 48%, rgba(170,65,8,0.22)  0%, rgba(100,28,4,0.10) 45%, transparent 70%)',
          /* Deep red-orange edge illumination top-right */
          'radial-gradient(ellipse 50% 35% at 100% 0%,  rgba(140,30,8,0.28)  0%, transparent 60%)',
          /* Deep red bottom-right edge */
          'radial-gradient(ellipse 55% 35% at 100% 100%, rgba(120,24,6,0.22) 0%, transparent 55%)',
        ].join(','),
        animation: 'tfs-glow-pulse 9s ease-in-out infinite',
      }}/>

      {/* ── BG LAYER C: secondary cooler amber + burnt-orange depth rings ── */}
      <div aria-hidden="true" style={{
        position:'absolute', zIndex:3, pointerEvents:'none',
        right:'2%', top:'10%', width:'55%', height:'80%',
        background:[
          'radial-gradient(ellipse 60% 58% at 60% 44%, rgba(180,82,12,0.18) 0%, rgba(140,52,8,0.08) 42%, transparent 68%)',
          'radial-gradient(ellipse 35% 40% at 62% 42%, rgba(220,130,20,0.12) 0%, rgba(180,90,12,0.06) 50%, transparent 72%)',
        ].join(','),
        animation: 'tfs-glow-pulse-slow 13s ease-in-out infinite 3s',
      }}/>

      {/* ── BG LAYER D: architectural shadow lines — suggests industrial depth ── */}
      <div aria-hidden="true" style={{
        position:'absolute', inset:0, zIndex:3, pointerEvents:'none',
        background:[
          /* Diagonal shadow suggesting beam / structure from top-right */
          'linear-gradient(148deg, transparent 0%, transparent 42%, rgba(0,0,0,0.18) 43%, rgba(0,0,0,0.06) 46%, transparent 50%)',
          /* Vertical shadow band mid-right */
          'linear-gradient(90deg, transparent 0%, transparent 56%, rgba(0,0,0,0.14) 60%, rgba(0,0,0,0.04) 65%, transparent 70%)',
          /* Subtle horizontal banding — industrial ceiling suggestion */
          'linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(0,0,0,0.10) 62%, transparent 72%)',
        ].join(','),
        opacity: 0.7,
      }}/>

      {/* ── BG LAYER E: fine SVG noise texture — breaks flat CSS look ── */}
      <div aria-hidden="true" style={{
        position:'absolute', inset:0, zIndex:4, pointerEvents:'none', opacity:0.045,
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize:'300px 300px',
        backgroundRepeat:'repeat',
      }}/>

      {/* ── BG LAYER F: edge vignette all sides ── */}
      <div aria-hidden="true" style={{
        position:'absolute', inset:0, zIndex:5, pointerEvents:'none',
        background:[
          'linear-gradient(to right,  rgba(0,0,0,0.55) 0%, transparent 25%, transparent 72%, rgba(0,0,0,0.45) 100%)',
          'linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, transparent 22%, transparent 72%, rgba(0,0,0,0.55) 100%)',
        ].join(','),
      }}/>

      {/* ── BG LAYER G: left text-protection overlay — text stays perfectly readable ── */}
      <div aria-hidden="true" style={{
        position:'absolute', inset:0, zIndex:6, pointerEvents:'none',
        background:'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.82) 12%, rgba(0,0,0,0.60) 22%, rgba(0,0,0,0.28) 30%, rgba(0,0,0,0.06) 36%, transparent 42%)',
      }}/>

      {/* Ember particles */}
      <TrinetraAtmosphere variant="home" intensity="full" />

      {/* Nav gradient */}
      <div aria-hidden="true" style={{
        position:'absolute', top:0, left:0, right:0,
        height:'13%', zIndex:5, pointerEvents:'none',
        background:'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)',
      }}/>

      {/* ═══════════════════════ CONTENT ═══════════════════════ */}
      <div
        className="flex-1 flex items-center"
        style={{ position:'relative', zIndex:10, paddingTop:'var(--nav-h, 76px)' }}
      >
        <div style={{
          width:'min(1760px, 92vw)',
          margin:'0 auto',
          display:'grid',
          gridTemplateColumns:'44fr 56fr',
          columnGap:'clamp(0.5rem, 2vw, 2.5rem)',
          alignItems:'center',
          paddingBottom:20,
        }}>

          {/* ── LEFT TEXT ── */}
          <div className="flex flex-col justify-center" style={{ position:'relative', zIndex:11, paddingLeft:'clamp(28px,4vw,72px)' }}>

            {/* Eyebrow */}
            <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom:'clamp(14px,2.4vh,28px)', ...fadeIn(1,30) }}>
              <span style={{
                display:'inline-block', height:1.5,
                width: phase >= 1 ? 22 : 0,
                background:'rgba(196,30,58,0.80)',
                transition:`width 500ms ${EASE.out}`,
              }}/>
              <span className="font-mono" style={{ fontSize:'0.56rem', letterSpacing:'0.44em', textTransform:'uppercase', color:'rgba(196,30,58,0.88)' }}>
                Fire Protection Engineering
              </span>
              <span className="font-mono hidden sm:inline" style={{ fontSize:'0.54rem', letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(245,240,232,0.28)' }}>
                Secunderabad · Telangana
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display" style={{ fontSize:'clamp(3.6rem,6.2vw,8.0rem)', lineHeight:0.84, marginBottom:'clamp(14px,2.2vh,26px)', letterSpacing:'-0.02em' }}>
              <span className="block overflow-hidden">
                <span style={{ ...lineIn(1,0), color:'rgba(248,244,240,0.96)', textShadow:'0 2px 24px rgba(0,0,0,0.90)' }}>FIRE IS</span>
              </span>
              <span className="block overflow-hidden">
                <span style={{ ...lineIn(2,90), color:'#C41E3A', textShadow:'0 0 40px rgba(196,30,58,0.50),0 2px 24px rgba(0,0,0,0.90)' }}>CHAOTIC.</span>
              </span>
              <span className="block overflow-hidden">
                <span className={phase >= 3 ? 'hero-trinetra-text' : ''} style={{ ...lineIn(3,180), color: phase >= 3 ? undefined : '#D4A017', textShadow:'0 2px 24px rgba(0,0,0,0.90)' }}>
                  TRINETRA
                </span>
              </span>
              <span className="block overflow-hidden">
                <span style={{ ...lineIn(4,270), color:'rgba(248,244,240,0.94)', textShadow:'0 2px 24px rgba(0,0,0,0.90)' }}>IS CONTROL.</span>
              </span>
            </h1>

            {/* PREDICT · PREVENT · PROTECT */}
            <div className="flex items-center flex-wrap" style={{ gap:'0 6px', marginBottom:'clamp(10px,1.6vh,18px)', ...fadeIn(5,420) }}>
              <span className="font-display" style={{ fontSize:'0.78rem', letterSpacing:'0.30em', color:'rgba(248,244,240,0.92)' }}>PREDICT</span>
              <span style={{ color:'rgba(255,255,255,0.38)', fontSize:'0.72rem', margin:'0 6px' }}>·</span>
              <span className="font-display" style={{ fontSize:'0.78rem', letterSpacing:'0.30em', color:'#E02040' }}>PREVENT</span>
              <span style={{ color:'rgba(255,255,255,0.38)', fontSize:'0.72rem', margin:'0 6px' }}>·</span>
              <span className="font-display" style={{ fontSize:'0.78rem', letterSpacing:'0.30em', color:'#D4A017' }}>PROTECT</span>
            </div>

            {/* Description */}
            <p style={{ fontSize:'0.84rem', lineHeight:1.82, color:'rgba(245,240,232,0.52)', maxWidth:400, marginBottom:'clamp(20px,2.8vh,34px)', ...fadeIn(5,540) }}>
              Professional fire protection engineering for industrial, commercial and
              institutional facilities. Fire hydrant systems, sprinklers, alarm systems,
              extinguishers, AMC and audits — engineered to protect what matters most.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 flex-wrap" style={fadeIn(5,660)}>
              <Link href="/request-quote" id="hero-cta-quote" className="tfs-btn-primary" style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
                <span className="tfs-btn-shine"/>
                <span className="relative flex items-center gap-2 text-sm font-semibold tracking-wide">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M4.5 19.5h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21z"/>
                  </svg>
                  Get a Quote
                </span>
              </Link>
              <a href={company.whatsapp.generic()} target="_blank" rel="noopener noreferrer" id="hero-cta-whatsapp" className="tfs-btn-whatsapp" style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.847L.044 24l6.324-1.653A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.938 0-3.754-.524-5.31-1.435l-.383-.226-3.752.981.999-3.655-.248-.396A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                <span className="text-sm font-semibold tracking-wide">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* ── RIGHT LOGO — transparent logo on lit wall background ── */}
          <div
            className="hidden lg:flex items-center justify-center"
            style={{ position:'relative', zIndex:11, minHeight:0 }}
            aria-hidden="true"
          >
            {/* Subtle amber glow BEHIND logo — no visible box, just atmosphere */}
            <div style={{
              position:'absolute',
              inset:'-10%',
              background:'radial-gradient(ellipse 70% 65% at 50% 46%, rgba(210,115,18,0.30) 0%, rgba(160,60,10,0.14) 35%, rgba(90,28,4,0.05) 62%, transparent 80%)',
              filter:'blur(18px)',
              pointerEvents:'none',
              zIndex:0,
            }}/>
            <div
              style={{
                position:'relative', zIndex:1,
                opacity:   phase >= 2 ? 1 : 0,
                transition:'opacity 1400ms ease 500ms',
                animation: prefersRM ? 'none' : 'tfs-logo-float 7s ease-in-out infinite',
                display:'flex', alignItems:'center', justifyContent:'center',
                width:'100%',
              }}
            >
              {/*
               * useTransparentLogo processes the PNG via canvas — black pixels become
               * true alpha=0 transparency. Falls back to mix-blend-mode:lighten if
               * the hook hasn't finished yet so there's never a visible black rectangle.
               */}
              <img
                src={logoSrc || '/brand/trinetra-logo-hd.png'}
                alt="Trinetra Fire Solutions"
                draggable={false}
                style={{
                  display:'block',
                  width:'min(520px, 90%)',
                  height:'auto',
                  objectFit:'contain',
                  mixBlendMode: logoSrc ? 'normal' : 'lighten',
                  imageRendering:'auto',
                  userSelect:'none',
                  background:'none',
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex:12, opacity: phase >= 5 ? 0.50 : 0, transition:`opacity 800ms ${EASE.out} 2200ms` }}
      >
        <span className="font-mono" style={{ fontSize:'0.48rem', letterSpacing:'0.55em', textTransform:'uppercase', color:'rgba(255,255,255,0.50)' }}>Scroll Down</span>
        <svg className="w-3.5 h-6" fill="none" viewBox="0 0 14 22" stroke="rgba(255,255,255,0.40)" strokeWidth="1.2">
          <rect x="1" y="1" width="12" height="16" rx="6"/>
          <line x1="7" y1="5" x2="7" y2="9" strokeWidth="1.6" strokeLinecap="round">
            <animate attributeName="y1" values="5;7.5;5" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="y2" values="9;11.5;9" dur="2s" repeatCount="indefinite"/>
          </line>
        </svg>
      </div>
    </section>
  );
}
