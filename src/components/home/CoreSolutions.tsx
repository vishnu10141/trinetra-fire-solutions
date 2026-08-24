'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { serviceCategories } from '@/data/services';
import company from '@/config/company';

// Per-service animated SVG icons
function ServiceIcon({ icon, hovered }: { icon: string; hovered: boolean }) {
  const t = 'transition-all duration-300';
  switch (icon) {
    case 'droplets':
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 3v6m0 0H6a2 2 0 00-2 2v4m8-6h6a2 2 0 012 2v4M4 15h16"
            style={{
              strokeDasharray: 200,
              strokeDashoffset: hovered ? 0 : 200,
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
          <circle cx="4" cy="15" r="1.5" fill="currentColor"
            style={{ opacity: hovered ? 1 : 0.3, transition: 'opacity 0.4s ease 0.6s' }} />
          <circle cx="20" cy="15" r="1.5" fill="currentColor"
            style={{ opacity: hovered ? 1 : 0.3, transition: 'opacity 0.4s ease 0.7s' }} />
        </svg>
      );
    case 'siren':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth={1.4} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9a6 6 0 00-12 0v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          {/* Pulse rings */}
          {[0, 1].map(i => (
            <circle key={i} cx="12" cy="9" r="2" fill="none" stroke="currentColor" strokeWidth="1"
              style={{
                transformOrigin: '12px 9px',
                animation: hovered ? `signal-pulse 1s cubic-bezier(0.16,1,0.3,1) ${i * 330}ms infinite` : 'none',
                opacity: hovered ? 1 : 0,
              }}
            />
          ))}
          <style>{`@keyframes signal-pulse{0%{transform:scale(0.6);opacity:0.9}100%{transform:scale(2.4);opacity:0}}`}</style>
        </svg>
      );
    case 'flame':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth={1.4} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          {/* Pressure arc */}
          <path strokeLinecap="round"
            d="M9 15 a3 3 0 0 1 6 0"
            style={{
              strokeDasharray: 10,
              strokeDashoffset: hovered ? 0 : 10,
              transition: 'stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        </svg>
      );
    case 'wrench':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth={1.4} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
          {['M9 12l2 2 4-4', 'M9 15.5l1.5 1.5 3-3'].map((d, i) => (
            <path key={i} strokeLinecap="round" strokeLinejoin="round" d={d}
              style={{
                strokeDasharray: 14,
                strokeDashoffset: hovered ? 0 : 14,
                transition: `stroke-dashoffset 0.3s ease ${0.1 + i * 0.2}s`,
              }}
            />
          ))}
        </svg>
      );
    case 'clipboard-check':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth={1.4} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375" />
          {['M9 12l2 2 4-4', 'M9 15.5l2 2 4-4'].map((d, i) => (
            <path key={i} strokeLinecap="round" strokeLinejoin="round" d={d}
              style={{
                strokeDasharray: 20,
                strokeDashoffset: hovered ? 0 : 20,
                transition: `stroke-dashoffset 0.35s ease ${0.1 + i * 0.22}s`,
              }}
            />
          ))}
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth={1.4} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          <rect x="9" y="9" width="6" height="6" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1)' : 'scale(0.7)',
              transformOrigin: '12px 12px',
              transition: 'all 0.5s cubic-bezier(0.25,1.3,0.5,1)',
            }}
          />
        </svg>
      );
  }
}

const ACCENT: Record<string, string> = {
  'fire-protection-systems': 'rgba(196,30,58,',
  'fire-detection-alarm':    'rgba(255,87,34,',
  'extinguisher-services':   'rgba(212,160,23,',
  'maintenance':             'rgba(100,160,255,',
  'engineering-compliance':  'rgba(100,200,120,',
};

function ServiceCard({ cat, index }: { cat: typeof serviceCategories[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const accent = ACCENT[cat.slug] || 'rgba(196,30,58,';

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

  return (
    <Link
      ref={ref}
      href={`/services/${cat.slug}`}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      data-cursor="view"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? `${accent}0.18)` : 'rgba(255,255,255,0.055)'}`,
        opacity:   visible ? 1 : 0,
        transform: visible
          ? (hovered ? 'translateY(-10px) scale(1.012)' : 'translateY(0) scale(1)')
          : 'translateY(26px)',
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.5), 0 0 30px ${accent}0.07)` : '0 4px 16px rgba(0,0,0,0.25)',
        transition: visible
          ? 'opacity 0ms, transform 480ms cubic-bezier(0.25,1.3,0.5,1), box-shadow 350ms ease, border-color 200ms ease'
          : `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${index * 85}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${index * 85}ms`,
        willChange: 'transform',
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit',
        background: `radial-gradient(ellipse at 25% 85%, ${accent}0.09) 0%, transparent 65%)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 350ms ease', pointerEvents: 'none',
      }} />
      {/* Top accent line draws on hover */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${accent}0.75), ${accent}0.75), transparent)`,
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 420ms cubic-bezier(0.16,1,0.3,1)',
      }} />
      {/* Highlight sheen */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit',
        background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
        opacity: hovered ? 1 : 0, transition: 'opacity 300ms ease', pointerEvents: 'none',
      }} />

      <div className="p-7 flex flex-col h-full">
        {/* Icon box */}
        <div style={{
          marginBottom: 20,
          width: 52, height: 52,
          borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: hovered ? `${accent}0.12)` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hovered ? `${accent}0.30)` : 'rgba(255,255,255,0.07)'}`,
          color: hovered ? `${accent}1)` : 'rgba(255,255,255,0.55)',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 350ms cubic-bezier(0.25,1.3,0.5,1)',
        }}>
          <ServiceIcon icon={cat.icon} hovered={hovered} />
        </div>

        <h3 className="font-display text-xl mb-3" style={{
          color: hovered ? `${accent}0.95)` : 'rgba(245,240,232,0.92)',
          transition: 'color 220ms ease',
          lineHeight: 1.1,
        }}>
          {cat.title.toUpperCase()}
        </h3>

        <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(245,240,232,0.42)', marginBottom: 20 }}>
          {cat.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {cat.services.slice(0, 4).map((_, j) => (
              <span key={j} style={{
                display: 'block', width: 6, height: 6, borderRadius: '50%',
                background: hovered ? `${accent}0.7)` : 'rgba(255,255,255,0.15)',
                transform: hovered ? 'scale(1.35)' : 'scale(1)',
                transition: `all 250ms cubic-bezier(0.34,1.56,0.64,1) ${j * 40}ms`,
              }} />
            ))}
          </div>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
            color: hovered ? `${accent}0.8)` : 'rgba(255,255,255,0.22)',
            transition: 'color 220ms ease',
          }}>
            {cat.services.length} services
            <svg style={{ width: 10, height: 10, transform: hovered ? 'translateX(3px)' : 'none', transition: 'transform 250ms cubic-bezier(0.34,1.56,0.64,1)' }} fill="none" viewBox="0 0 12 12">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CoreSolutions() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [hv, setHv] = useState(false); // header visible

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHv(true); io.disconnect(); } },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#050708 0%,#080B0E 60%,#060810 100%)', padding: 'clamp(64px,10vw,128px) 0' }}
      aria-labelledby="services-heading"
    >
      {/* Dividers */}
      {[{ top: 0 }, { bottom: 0 }].map((pos, i) => (
        <div key={i} aria-hidden="true" style={{
          position: 'absolute', left: 0, right: 0, height: 1, ...pos,
          background: i === 0
            ? 'linear-gradient(90deg,transparent,rgba(196,30,58,0.14),rgba(212,160,23,0.09),transparent)'
            : 'linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)',
        }} />
      ))}
      {/* Blueprint corner marks */}
      {[[{top:20,left:20},{borderTop:'1px solid rgba(196,30,58,0.12)',borderLeft:'1px solid rgba(196,30,58,0.12)'}],
        [{top:20,right:20},{borderTop:'1px solid rgba(196,30,58,0.12)',borderRight:'1px solid rgba(196,30,58,0.12)'}]
      ].map(([pos, border], i) => (
        <div key={i} aria-hidden="true" style={{ position:'absolute',width:36,height:36,...pos as object,...border as object }} />
      ))}

      <div className="container-trinetra relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:20 }}>
            {[{ from:'transparent', to:'rgba(196,30,58,0.55)', delay:0 },
              { from:'rgba(196,30,58,0.55)', to:'transparent', delay:100 }
            ].map((g, i) => (
              <div key={i} style={{
                height:1, width: hv ? 48 : 0,
                background: `linear-gradient(90deg,${g.from},${g.to})`,
                transition: `width 800ms cubic-bezier(0.16,1,0.3,1) ${g.delay}ms`,
              }} />
            ))}
            <span style={{
              fontFamily:'var(--font-mono)',fontSize:'0.65rem',letterSpacing:'0.5em',
              textTransform:'uppercase',color:'rgba(196,30,58,0.72)',
              opacity:hv?1:0,transition:'opacity 600ms ease 200ms',
            }}>What We Do</span>
          </div>

          <h2
            id="services-heading"
            className="font-display text-cinematic-md mb-4"
            style={{
              color:'rgba(245,240,232,0.95)',
              opacity:hv?1:0,
              clipPath:hv?'inset(0 0% 0 0)':'inset(0 100% 0 0)',
              transition:'opacity 800ms ease 250ms,clip-path 800ms cubic-bezier(0.16,1,0.3,1) 250ms',
            }}
          >
            FIRE PROTECTION<br/>
            <span className="gold-shine">ENGINEERING</span> SERVICES
          </h2>

          <p style={{
            color:'rgba(245,240,232,0.42)',fontSize:'1rem',maxWidth:540,margin:'0 auto',lineHeight:1.75,
            opacity:hv?1:0,transform:hv?'none':'translateY(12px)',
            transition:'opacity 700ms ease 400ms,transform 700ms cubic-bezier(0.16,1,0.3,1) 400ms',
          }}>
            End-to-end fire protection — from design and supply through to installation, commissioning, maintenance and compliance.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {serviceCategories.map((cat, i) => (
            <ServiceCard key={cat.slug} cat={cat} index={i} />
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link href="/services" className="tfs-btn-primary group" data-cursor="view">
            <span className="tfs-btn-shine"/>
            <span className="relative flex items-center gap-2">
              View All Services
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
          <a href={company.whatsapp.inspection()} target="_blank" rel="noopener noreferrer"
            className="tfs-btn-ghost" data-cursor="contact">
            Request Site Inspection
          </a>
        </div>
      </div>
    </section>
  );
}
