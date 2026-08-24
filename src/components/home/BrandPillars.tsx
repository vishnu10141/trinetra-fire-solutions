'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const pillars = [
  {
    word: 'PREDICT',
    color: 'rgba(245,240,232,0.95)',
    accentRgb: '245,240,232',
    number: '01',
    title: 'Early Detection',
    description: 'Identifying fire hazards and vulnerabilities before they become incidents. Fire safety audits, site inspections and system assessments keep you ahead of risk.',
    services: ['Fire Safety Audits', 'Site Inspections', 'Fire Detection Systems'],
    href: '/services/engineering-compliance',
    lineColor: 'rgba(245,240,232,0.25)',
  },
  {
    word: 'PREVENT',
    color: '#C41E3A',
    accentRgb: '196,30,58',
    number: '02',
    title: 'Active Protection',
    description: 'Installing and maintaining engineered fire suppression systems that actively intervene — hydrant networks, sprinkler systems, alarm systems and extinguishers.',
    services: ['Hydrant Systems', 'Sprinkler Systems', 'Fire Alarm Systems'],
    href: '/services/fire-protection-systems',
    lineColor: 'rgba(196,30,58,0.45)',
  },
  {
    word: 'PROTECT',
    color: '#D4A017',
    accentRgb: '212,160,23',
    number: '03',
    title: 'Ongoing Assurance',
    description: 'Ensuring your fire protection systems remain fully operational at all times through scheduled maintenance, AMC contracts and 24×7 emergency support.',
    services: ['AMC Contracts', 'Preventive Maintenance', '24×7 Emergency Support'],
    href: '/services/maintenance',
    lineColor: 'rgba(212,160,23,0.35)',
  },
];

function PillarCard({ p, index }: { p: typeof pillars[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={p.href}
      style={{
        display: 'block',
        padding: 'clamp(1.5rem,4vw,2.25rem)',
        borderRadius: 20,
        border: `1px solid rgba(${p.accentRgb},${hovered ? '0.22' : '0.08'})`,
        background: hovered
          ? `rgba(${p.accentRgb},0.04)`
          : 'rgba(255,255,255,0.02)',
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? 'translateY(-8px)' : 'translateY(0)')
          : 'translateY(30px)',
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.45), 0 0 30px rgba(${p.accentRgb},0.06)` : 'none',
        transition: visible
          ? `opacity 0ms, transform 440ms cubic-bezier(0.25,1.3,0.5,1),
             box-shadow 350ms ease, border-color 220ms ease, background 220ms ease`
          : `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${index * 120}ms,
             transform 700ms cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="view"
    >
      {/* Top accent line — draws on hover */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'center',
        transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
      }} />

      {/* Number */}
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
        letterSpacing: '0.4em', textTransform: 'uppercase',
        color: `rgba(${p.accentRgb},0.5)`,
        marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span>{p.number}</span>
        <span style={{
          flex: 1, height: 1,
          background: `linear-gradient(90deg, ${p.lineColor}, transparent)`,
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: `transform 900ms cubic-bezier(0.4,0,0.2,1) ${200 + index * 120}ms`,
        }} />
      </div>

      {/* Big word */}
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,5vw,3.5rem)',
        lineHeight: 1, marginBottom: 16, letterSpacing: '0.03em',
        color: p.color,
        textShadow: hovered ? `0 0 40px rgba(${p.accentRgb},0.3)` : 'none',
        transition: 'text-shadow 300ms ease',
      }}>
        {p.word}
      </div>

      {/* Title */}
      <div style={{
        fontSize: '0.95rem', fontWeight: 700,
        color: 'rgba(245,240,232,0.85)', marginBottom: 12,
      }}>
        {p.title}
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.875rem', lineHeight: 1.72,
        color: 'rgba(245,240,232,0.42)', marginBottom: 20,
      }}>
        {p.description}
      </p>

      {/* Service tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {p.services.map(s => (
          <span key={s} style={{
            padding: '3px 10px', borderRadius: 99, fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.05em',
            background: `rgba(${p.accentRgb},${hovered ? '0.1' : '0.05'})`,
            border: `1px solid rgba(${p.accentRgb},${hovered ? '0.25' : '0.12'})`,
            color: `rgba(${p.accentRgb},0.8)`,
            transition: 'all 220ms ease',
          }}>
            {s}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <div style={{
        marginTop: 20,
        display: 'flex', alignItems: 'center', gap: 6,
        color: `rgba(${p.accentRgb},${hovered ? '0.8' : '0.35'})`,
        fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em',
        transition: 'color 200ms ease',
      }}>
        <span>Learn more</span>
        <svg style={{ width: 12, height: 12, transform: hovered ? 'translateX(4px)' : 'none', transition: 'transform 250ms cubic-bezier(0.34,1.56,0.64,1)' }} fill="none" viewBox="0 0 12 12">
          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  );
}

export default function BrandPillars() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [hv, setHv] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHv(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg,#060810 0%,#040507 100%)',
        padding: 'clamp(64px,10vw,128px) 0',
      }}
      aria-labelledby="pillars-heading"
    >
      {/* Grid pattern */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      {/* Gold center bloom */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 35% at 50% 50%, rgba(212,160,23,0.035) 0%, transparent 70%)',
      }} />

      <div className="container-trinetra relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 16, marginBottom: 20,
            opacity: hv ? 1 : 0, transition: 'opacity 700ms ease',
          }}>
            <div style={{ height: 1, width: hv ? 48 : 0, background: 'rgba(212,160,23,0.4)', transition: 'width 800ms cubic-bezier(0.16,1,0.3,1)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(212,160,23,0.65)' }}>
              Our Philosophy
            </span>
            <div style={{ height: 1, width: hv ? 48 : 0, background: 'rgba(212,160,23,0.4)', transition: 'width 800ms cubic-bezier(0.16,1,0.3,1) 100ms' }} />
          </div>

          <h2
            id="pillars-heading"
            className="font-display text-cinematic-md"
            style={{
              color: 'rgba(245,240,232,0.95)',
              clipPath: hv ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
              transition: 'clip-path 900ms cubic-bezier(0.16,1,0.3,1) 150ms',
            }}
          >
            THREE PILLARS OF<br/>
            <span className="gold-shine">FIRE PROTECTION</span>
          </h2>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((p, i) => <PillarCard key={p.word} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
