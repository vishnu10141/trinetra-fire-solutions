import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Completed fire protection projects by Trinetra Fire Solutions — industrial, commercial and institutional fire safety installations across Telangana.',
};

export default function ProjectsPage() {
  return (
    <div className="tfs-atm-medium tfs-grid-overlay min-h-screen flex items-center justify-center" style={{ paddingTop: 88 }}>
      {/* Ambient fire glow */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(196,30,58,0.10) 0%, transparent 65%)',
      }}/>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,40px)' }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
          <span style={{ height: 1, width: 40, background: 'rgba(212,160,23,0.4)' }}/>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.60rem', letterSpacing: '0.55em', textTransform: 'uppercase', color: 'rgba(212,160,23,0.65)' }}>
            Portfolio
          </span>
          <span style={{ height: 1, width: 40, background: 'rgba(212,160,23,0.4)' }}/>
        </div>

        {/* Heading */}
        <h1
          className="font-display"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.9, color: 'rgba(245,240,232,0.95)', marginBottom: 24 }}
        >
          OUR<br/>
          <span className="gold-shine">PROJECTS</span>
        </h1>

        {/* Divider */}
        <div style={{ height: 1, maxWidth: 240, margin: '0 auto 32px', background: 'linear-gradient(90deg, transparent, rgba(196,30,58,0.5), transparent)' }}/>

        <p style={{ color: 'rgba(245,240,232,0.45)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 480, margin: '0 auto 40px' }}>
          We are documenting our completed fire protection installations across
          Telangana. This page will showcase our project portfolio — fire hydrant
          systems, sprinkler installations, alarm systems, audits and more.
        </p>

        {/* Coming soon badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '10px 24px', borderRadius: 999,
          background: 'rgba(212,160,23,0.07)',
          border: '1px solid rgba(212,160,23,0.20)',
          marginBottom: 48,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4A017', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }}/>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(212,160,23,0.75)' }}>
            Coming Soon
          </span>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/request-quote"
            className="tfs-btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <span className="tfs-btn-shine"/>
            <span className="relative">Get a Quotation</span>
          </Link>
          <Link
            href="/contact"
            className="tfs-btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
