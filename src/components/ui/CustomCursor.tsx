'use client';
/**
 * CustomCursor — Premium dual-layer cursor
 * ─────────────────────────────────────────────────────────────────
 * DESKTOP ONLY — never renders on touch/pointer:coarse devices.
 *
 * Layers:
 *   Inner: 8px ember dot (#FF5722) — follows pointer exactly at 1:1
 *   Outer: 36px translucent ring — lags behind at lerp 0.12
 *
 * States (via data-cursor attribute on target elements):
 *   view     → ring expands to 58px + "VIEW" label
 *   quote    → ring turns fire-red
 *   contact  → ring turns green
 *   drag     → ring elongates + "DRAG"
 *   default  → standard behavior
 *
 * Performance: single RAF loop, transform only, no layout thrashing.
 */
import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'view' | 'quote' | 'contact' | 'drag' | 'link';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const pos     = useRef({ x: -120, y: -120 });
  const ring    = useRef({ x: -120, y: -120 });
  const rafRef  = useRef<number>(0);
  const stateRef = useRef<CursorState>('default');
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    // Never show on touch devices
    const fine = window.matchMedia('(pointer: fine)').matches;
    setIsPointerFine(fine);
    if (!fine) return;

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const handleEnter = (evt: Event) => {
      const e = evt as MouseEvent;
      const target = e.target as HTMLElement;
      const el = target.closest('[data-cursor]') as HTMLElement | null;
      stateRef.current = (el?.dataset.cursor as CursorState) || 'link';
      applyState(stateRef.current);
    };

    const handleLeave = (_evt: Event) => {
      stateRef.current = 'default';
      applyState('default');
    };

    const applyState = (s: CursorState) => {
      const r = ringRef.current;
      const d = dotRef.current;
      const l = labelRef.current;
      if (!r || !d || !l) return;

      // Reset
      r.style.width  = '36px';
      r.style.height = '36px';
      r.style.borderColor = 'rgba(196,30,58,0.45)';
      r.style.mixBlendMode = 'normal';
      d.style.width  = '8px';
      d.style.height = '8px';
      d.style.background = '#FF5722';
      l.style.opacity = '0';
      l.textContent = '';

      switch (s) {
        case 'view':
          r.style.width  = '58px';
          r.style.height = '58px';
          r.style.borderColor = 'rgba(255,87,34,0.55)';
          l.textContent = 'VIEW';
          l.style.opacity = '1';
          break;
        case 'quote':
          r.style.width  = '50px';
          r.style.height = '50px';
          r.style.borderColor = 'rgba(196,30,58,0.7)';
          l.textContent = 'QUOTE';
          l.style.opacity = '1';
          d.style.background = '#C41E3A';
          break;
        case 'contact':
          r.style.borderColor = 'rgba(37,211,102,0.6)';
          l.textContent = 'GO';
          l.style.opacity = '1';
          d.style.background = '#25D366';
          break;
        case 'drag':
          r.style.width  = '60px';
          r.style.height = '40px';
          r.style.borderColor = 'rgba(212,160,23,0.5)';
          l.textContent = 'DRAG';
          l.style.opacity = '1';
          break;
        case 'link':
          r.style.width  = '46px';
          r.style.height = '46px';
          r.style.borderColor = 'rgba(196,30,58,0.6)';
          d.style.width  = '4px';
          d.style.height = '4px';
          break;
      }
    };

    // RAF animation loop
    const animate = () => {
      const { x, y } = pos.current;
      const rp = ring.current;

      // Dot follows instantly
      if (dotRef.current) {
        const dw = parseInt(dotRef.current.style.width || '8');
        dotRef.current.style.transform = `translate3d(${x - dw/2}px, ${y - dw/2}px, 0)`;
      }

      // Ring interpolates at 0.12 lerp (feels weighty but responsive)
      rp.x += (x - rp.x) * 0.12;
      rp.y += (y - rp.y) * 0.12;

      if (ringRef.current) {
        const rw = parseInt(ringRef.current.style.width || '36');
        const rh = parseInt(ringRef.current.style.height || '36');
        ringRef.current.style.transform = `translate3d(${rp.x - rw/2}px, ${rp.y - rh/2}px, 0)`;
      }
      if (labelRef.current && labelRef.current.style.opacity === '1') {
        const rw = parseInt(ringRef.current?.style.width || '36');
        const rh = parseInt(ringRef.current?.style.height || '36');
        labelRef.current.style.transform = `translate3d(${rp.x - rw/2}px, ${rp.y - rh/2}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Hide on mouse leave window
    const handleLeaveWindow = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };
    const handleEnterWindow = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    document.addEventListener('mousemove',  handleMove,  { passive: true });
    document.addEventListener('mouseleave', handleLeaveWindow);
    document.addEventListener('mouseenter', handleEnterWindow);

    // Delegate state detection to all interactive elements
    const updateDelegation = () => {
      document.querySelectorAll('a,button,[data-cursor],[role="button"],input,textarea,select').forEach(el => {
        el.addEventListener('mouseenter', handleEnter as EventListener);
        el.addEventListener('mouseleave', handleLeave as EventListener);
      });
    };
    updateDelegation();

    const mo = new MutationObserver(updateDelegation);
    mo.observe(document.body, { childList: true, subtree: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove',  handleMove);
      document.removeEventListener('mouseleave', handleLeaveWindow);
      document.removeEventListener('mouseenter', handleEnterWindow);
      mo.disconnect();
    };
  }, []);

  if (!isPointerFine) return null;

  const shared: React.CSSProperties = {
    position:       'fixed',
    top:            0,
    left:           0,
    borderRadius:   '50%',
    pointerEvents:  'none',
    zIndex:         999999,
    willChange:     'transform',
  };

  return (
    <>
      {/* Inner ember dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          ...shared,
          width:      8,
          height:     8,
          background: '#FF5722',
          boxShadow:  '0 0 6px rgba(255,87,34,0.8), 0 0 12px rgba(255,87,34,0.4)',
          transition: 'width 200ms cubic-bezier(0.34,1.56,0.64,1), height 200ms cubic-bezier(0.34,1.56,0.64,1), background 200ms ease',
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          ...shared,
          width:        36,
          height:       36,
          border:       '1.5px solid rgba(196,30,58,0.45)',
          background:   'transparent',
          transition:   'width 300ms cubic-bezier(0.34,1.56,0.64,1), height 300ms cubic-bezier(0.34,1.56,0.64,1), border-color 200ms ease, border-radius 300ms ease',
        }}
      />

      {/* State label (VIEW / QUOTE etc) */}
      <div
        ref={labelRef}
        aria-hidden="true"
        style={{
          ...shared,
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width:      36,
          height:     36,
          fontSize:   '0.48rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.18em',
          color:      'rgba(255,255,255,0.9)',
          opacity:    0,
          transition: 'opacity 200ms ease',
          zIndex:     1000000,
        }}
      />
    </>
  );
}
