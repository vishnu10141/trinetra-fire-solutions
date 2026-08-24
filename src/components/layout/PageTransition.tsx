'use client';
/**
 * PageTransition — Engineering line sweep
 * ─────────────────────────────────────────────────────────────────
 * On route change:
 *   1. Thin crimson→gold engineering line sweeps left→right (300ms)
 *   2. Content slides in from slight translateY
 *   3. Line fades out
 *
 * Fast enough to never feel like a delay.
 * Cinematic enough to feel intentional.
 */
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [barWidth, setBarWidth] = useState(0);
  const [contentKey, setContentKey] = useState(pathname);
  const [contentVisible, setContentVisible] = useState(true);
  const prevPath = useRef(pathname);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    // 1. Slide bar across
    setContentVisible(false);
    setBarWidth(0);

    const t1 = setTimeout(() => setBarWidth(100), 20);
    const t2 = setTimeout(() => {
      setContentKey(pathname);
      setContentVisible(true);
      setBarWidth(0);
    }, 380);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return (
    <>
      {/* Engineering transition bar */}
      <div
        aria-hidden="true"
        style={{
          position:   'fixed',
          top:        0,
          left:       0,
          height:     '2px',
          width:      `${barWidth}%`,
          background: 'linear-gradient(90deg, #C41E3A 0%, #FF5722 50%, #D4A017 100%)',
          boxShadow:  '0 0 8px rgba(196,30,58,0.6), 0 0 20px rgba(196,30,58,0.3)',
          zIndex:     99998,
          transition: barWidth === 100
            ? 'width 340ms cubic-bezier(0.4,0,0.2,1)'
            : 'none',
          transformOrigin: 'left',
        }}
      />

      {/* Page content */}
      <div
        key={contentKey}
        style={{
          opacity:   contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(6px)',
          transition: contentVisible
            ? 'opacity 320ms cubic-bezier(0.16,1,0.3,1) 60ms, transform 320ms cubic-bezier(0.16,1,0.3,1) 60ms'
            : 'none',
        }}
      >
        {children}
      </div>
    </>
  );
}
