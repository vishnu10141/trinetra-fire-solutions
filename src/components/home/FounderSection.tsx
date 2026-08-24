'use client';
/**
 * FounderSection — Premium magazine-quality founder reveal
 * ─────────────────────────────────────────────────────────────────
 * Design philosophy:
 *   This section deliberately SLOWS the website down.
 *   No fire. No chaos. Pure graphite + gold + human story.
 *
 * Reveals:
 *   1. Section enters → background gold line draws across
 *   2. Portrait fades in through light (slow, 1.4s)
 *   3. Gold border draws clockwise around portrait
 *   4. Title + credentials appear (stagger, 200ms each)
 *   5. Bio text fades in (subtle, 0.9s)
 *   6. CTA appears last
 *
 * Mobile: portrait top, content below. Desktop: side-by-side.
 * No hover-dependent information.
 */
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CREDENTIALS = [
  { label: 'Branch',   value: 'Indian Army',   icon: '🎖' },
  { label: 'Rank',     value: 'Subedar / JCO', icon: '⭐' },
  { label: 'Service',  value: '~30 Years',     icon: '📅' },
  { label: 'Role',     value: 'Founder & Director', icon: '👤' },
];

export default function FounderSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase]   = useState(0); // reveal phase 0–5

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  // Stagger reveal phases when section becomes visible
  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 400),
      setTimeout(() => setPhase(3), 700),
      setTimeout(() => setPhase(4), 1000),
      setTimeout(() => setPhase(5), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #060810 0%, #07090C 60%, #050708 100%)',
        padding: 'clamp(72px,12vw,140px) 0',
      }}
      aria-label="Founder and Leadership"
    >
      {/* Gold engineering line — top divider that draws in */}
      <div
        aria-hidden="true"
        style={{
          position:        'absolute',
          top:             0,
          left:            0,
          right:           0,
          height:          '1px',
          background:      'linear-gradient(90deg, transparent 0%, rgba(212,160,23,0.5) 30%, rgba(212,160,23,0.8) 50%, rgba(212,160,23,0.5) 70%, transparent 100%)',
          transform:       phase >= 1 ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition:      'transform 1100ms cubic-bezier(0.4,0,0.2,1)',
        }}
      />

      {/* Subtle ambient glow — gold, not fire */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 35% 50%, rgba(212,160,23,0.04) 0%, transparent 70%)',
      }} />

      <div className="container-trinetra relative">

        {/* Section eyebrow */}
        <div
          className="flex items-center gap-4 mb-12"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transition: 'opacity 800ms ease 200ms',
          }}
        >
          <div style={{ height: '1px', width: '32px', background: 'rgba(212,160,23,0.5)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            letterSpacing: '0.5em', textTransform: 'uppercase',
            color: 'rgba(212,160,23,0.7)',
          }}>
            Leadership
          </span>
        </div>

        {/* Main grid — portrait + content */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >

          {/* Portrait column */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div
              className="relative"
              style={{
                width: 'min(320px, 85vw)',
                opacity:   phase >= 2 ? 1 : 0,
                transform: phase >= 2 ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(16px)',
                transition: 'opacity 1400ms cubic-bezier(0.16,1,0.3,1), transform 1400ms cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {/* Gold border — draws in clockwise via clip-path */}
              <div
                aria-hidden="true"
                style={{
                  position:     'absolute',
                  inset:        '-2px',
                  borderRadius: '16px',
                  border:       '1.5px solid rgba(212,160,23,0.4)',
                  clipPath:     phase >= 3
                    ? 'inset(-4px -4px -4px -4px)'
                    : 'inset(-4px 100% -4px -4px)',
                  transition:   'clip-path 1200ms cubic-bezier(0.4,0,0.2,1)',
                }}
              />
              {/* Soft inner glow on portrait */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0, borderRadius: 14,
                background: 'linear-gradient(180deg, rgba(212,160,23,0.04) 0%, transparent 50%)',
                zIndex: 1, pointerEvents: 'none',
              }} />

              {/* Portrait image */}
              <Image
                src="/images/founder/nimmakayala-venkatesh.jpg"
                alt="Nimmakayala Venkatesh — Founder & Director, Trinetra Fire Solutions"
                width={320}
                height={420}
                className="relative"
                style={{
                  width:        '100%',
                  height:       'auto',
                  borderRadius: 14,
                  display:      'block',
                  objectFit:    'cover',
                  filter:       phase >= 2
                    ? 'brightness(0.95) contrast(1.02)'
                    : 'brightness(0.3)',
                  transition:   'filter 1400ms cubic-bezier(0.16,1,0.3,1)',
                }}
                sizes="(max-width: 1024px) 85vw, 320px"
              />

              {/* Name plate at bottom */}
              <div
                style={{
                  position:   'absolute',
                  bottom:     0,
                  left:       0,
                  right:      0,
                  padding:    '1.5rem 1.25rem 1.25rem',
                  background: 'linear-gradient(to top, rgba(5,7,8,0.92) 0%, transparent 100%)',
                  borderRadius: '0 0 14px 14px',
                  opacity:    phase >= 4 ? 1 : 0,
                  transform:  phase >= 4 ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 800ms ease, transform 800ms ease',
                }}
              >
                <div className="font-display text-xl" style={{ color: 'rgba(245,240,232,0.95)', letterSpacing: '0.05em' }}>
                  Nimmakayala Venkatesh
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.3em', color: 'rgba(212,160,23,0.75)', textTransform: 'uppercase', marginTop: 4 }}>
                  Founder &amp; Director
                </div>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="lg:col-span-8">

            {/* Heading */}
            <div
              style={{
                overflow: 'hidden',
                marginBottom: '1.5rem',
              }}
            >
              <h2
                className="font-display"
                style={{
                  fontSize:   'clamp(2rem, 5vw, 3.5rem)',
                  color:      'rgba(245,240,232,0.95)',
                  lineHeight: 1.0,
                  clipPath:   phase >= 3 ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                  transform:  phase >= 3 ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'clip-path 900ms cubic-bezier(0.16,1,0.3,1) 200ms, transform 900ms cubic-bezier(0.16,1,0.3,1) 200ms',
                }}
              >
                30 YEARS OF<br />
                <span className="gold-shine">DISCIPLINE.</span><br />
                ONE MISSION.
              </h2>
            </div>

            {/* Gold separator line */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(212,160,23,0.5), transparent)',
              width:  phase >= 3 ? '200px' : '0px',
              marginBottom: '2rem',
              transition: 'width 900ms cubic-bezier(0.4,0,0.2,1) 400ms',
            }} />

            {/* Credentials grid */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
              style={{
                opacity:   phase >= 4 ? 1 : 0,
                transform: phase >= 4 ? 'none' : 'translateY(16px)',
                transition: 'opacity 700ms ease 400ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 400ms',
              }}
            >
              {CREDENTIALS.map((c, i) => (
                <div
                  key={c.label}
                  style={{
                    padding:    '1rem',
                    borderRadius: 12,
                    background: 'rgba(212,160,23,0.04)',
                    border:     '1px solid rgba(212,160,23,0.12)',
                    opacity:    phase >= 4 ? 1 : 0,
                    transform:  phase >= 4 ? 'none' : 'translateY(10px)',
                    transition: `opacity 600ms ease ${400 + i * 90}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${400 + i * 90}ms`,
                  }}
                >
                  <div style={{ fontSize: '1.1rem', marginBottom: 4 }}>{c.icon}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(212,160,23,0.65)', textTransform: 'uppercase', marginBottom: 4 }}>
                    {c.label}
                  </div>
                  <div style={{ color: 'rgba(245,240,232,0.88)', fontSize: '0.85rem', fontWeight: 600 }}>
                    {c.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div
              style={{
                opacity:   phase >= 4 ? 1 : 0,
                transform: phase >= 4 ? 'none' : 'translateY(12px)',
                transition: 'opacity 900ms ease 600ms, transform 900ms cubic-bezier(0.16,1,0.3,1) 600ms',
              }}
            >
              <p style={{ color: 'rgba(245,240,232,0.60)', lineHeight: 1.85, fontSize: '1rem', marginBottom: '1.25rem' }}>
                Nimmakayala Venkatesh founded Trinetra Fire Solutions drawing on nearly three decades of service with the Indian Army. That experience forged an unwavering discipline around safety, precision, and the understanding that the difference between adequate and excellent is measured in lives.
              </p>
              <p style={{ color: 'rgba(245,240,232,0.45)', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Today, that philosophy drives every system Trinetra designs, installs, and maintains — from industrial facilities in Hyderabad to pharmaceutical complexes requiring the most stringent compliance standards.
              </p>
            </div>

            {/* CTA */}
            <div
              style={{
                marginTop:  '2.5rem',
                opacity:    phase >= 5 ? 1 : 0,
                transform:  phase >= 5 ? 'none' : 'translateY(10px)',
                transition: 'opacity 700ms ease, transform 700ms cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <Link
                href="/about"
                className="tfs-btn-ghost inline-flex items-center gap-2 group"
                style={{ borderColor: 'rgba(212,160,23,0.25)' }}
              >
                <span style={{ color: 'rgba(212,160,23,0.85)' }}>Our Story</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                  style={{ color: 'rgba(212,160,23,0.7)' }}
                  fill="none" viewBox="0 0 16 16"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom gold divider */}
      <div
        aria-hidden="true"
        style={{
          position:        'absolute',
          bottom:          0,
          left:            0,
          right:           0,
          height:          '1px',
          background:      'linear-gradient(90deg, transparent, rgba(212,160,23,0.15), transparent)',
        }}
      />
    </section>
  );
}

