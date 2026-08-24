'use client';
/**
 * TrinetraLogo — Single source of truth for the Trinetra brand mark.
 *
 * LOGO FIX: The original PNG has a dark/black background baked in.
 * We use CSS mix-blend-mode: lighten so the black background
 * disappears on dark site backgrounds, leaving only the visible
 * logo elements (gold shield, red, white text).
 *
 * On hover: subtle drop-shadow glow around the logo itself only.
 * NO rectangular box, NO visible border, NO card appearance.
 */
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TrinetraLogoProps {
  variant?: 'nav' | 'footer' | 'full' | 'mark';
  className?: string;
  glowing?: boolean;
  animated?: boolean;
}

export default function TrinetraLogo({
  variant = 'nav',
  className,
  glowing = false,
}: TrinetraLogoProps) {
  // mix-blend-mode: lighten makes pure black transparent on dark backgrounds
  // drop-shadow applies to the visible logo pixels only, NOT the container box
  const baseImageStyle: React.CSSProperties = {
    mixBlendMode: 'lighten',
    display: 'block',
    objectFit: 'contain',
  };

  const glowFilter = glowing
    ? 'drop-shadow(0 0 10px rgba(212,160,23,0.4)) drop-shadow(0 0 4px rgba(196,30,58,0.3))'
    : 'drop-shadow(0 0 6px rgba(212,160,23,0.15))';

  // Shared container — no background, no border, no box
  const containerBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    background: 'transparent',
    border: 'none',
    padding: 0,
    transition: 'filter 300ms ease, transform 300ms cubic-bezier(0.34,1.56,0.64,1)',
    filter: glowFilter,
  };

  if (variant === 'nav') {
    return (
      <div
        className={cn('transition-all duration-300 hover:scale-[1.04]', className)}
        style={containerBase}
      >
        <Image
          src="/brand/trinetra-logo.png"
          alt="Trinetra Fire Solutions"
          width={160}
          height={56}
          priority
          style={{
            ...baseImageStyle,
            height: 'clamp(44px, 6vw, 56px)',
            width: 'auto',
            maxWidth: 180,
          }}
          sizes="160px"
        />
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div
        className={cn('transition-all duration-300 hover:scale-[1.02]', className)}
        style={containerBase}
      >
        <Image
          src="/brand/trinetra-logo.png"
          alt="Trinetra Fire Solutions"
          width={200}
          height={70}
          style={{
            ...baseImageStyle,
            height: 58,
            width: 'auto',
          }}
          sizes="200px"
        />
      </div>
    );
  }

  if (variant === 'mark') {
    // Small icon — show only the shield portion by clipping
    return (
      <div
        className={cn('transition-all duration-300 hover:scale-[1.05]', className)}
        style={{
          ...containerBase,
          width: 44,
          height: 44,
          overflow: 'hidden',
        }}
      >
        <Image
          src="/brand/trinetra-logo.png"
          alt="Trinetra"
          width={88}
          height={88}
          style={{
            ...baseImageStyle,
            width: 88,
            height: 'auto',
            marginLeft: -4,
            marginTop: -4,
          }}
          sizes="44px"
        />
      </div>
    );
  }

  // 'full' variant — hero / intro / large displays
  return (
    <div
      className={cn('transition-all duration-500 hover:scale-[1.02]', className)}
      style={containerBase}
    >
      <Image
        src="/brand/trinetra-logo.png"
        alt="Trinetra Fire Solutions — Predict. Prevent. Protect."
        width={320}
        height={112}
        priority
        style={{
          ...baseImageStyle,
          width: '100%',
          maxWidth: 320,
          height: 'auto',
        }}
        sizes="(max-width: 768px) 240px, 320px"
      />
    </div>
  );
}
