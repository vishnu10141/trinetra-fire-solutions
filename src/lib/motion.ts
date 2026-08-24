/**
 * TRINETRA MOTION DESIGN SYSTEM
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for all animation values across the site.
 * Philosophy: FIRE IS CHAOTIC → TRINETRA IS CONTROL
 * Every motion should communicate either energy (fire/chaos) or
 * precision (engineering/control). Never generic.
 */

// ── Easing Curves ──────────────────────────────────────────────────
export const EASE = {
  /** Premium deceleration — content arriving from off-screen */
  out:        'cubic-bezier(0.16, 1, 0.3, 1)',
  /** Precision acceleration — engineering action */
  in:         'cubic-bezier(0.4, 0, 1, 1)',
  /** Smooth — balanced, most UI transitions */
  inOut:      'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Spring with overshoot — CTAs, logo hover */
  spring:     'cubic-bezier(0.34, 1.56, 0.64, 1)',
  /** Soft spring — cards, panels */
  softSpring: 'cubic-bezier(0.25, 1.3, 0.5, 1)',
  /** Fire — rapid start, long settle (like flame) */
  fire:       'cubic-bezier(0.22, 1, 0.36, 1)',
  /** Suppression — fast start, snap to rest (engineering control) */
  suppress:   'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

// ── Duration Tokens ────────────────────────────────────────────────
export const DUR = {
  /** Micro-interactions: clicks, focus rings */
  micro:      150,
  /** Fast UI: button hovers, dropdown open */
  fast:       250,
  /** Standard: most transitions */
  normal:     400,
  /** Emphasis: card lifts, modal entrances */
  emphasis:   600,
  /** Reveal: section entrances, mask reveals */
  reveal:     800,
  /** Cinematic: hero sequences, founder reveal */
  cinematic:  1200,
  /** Epic: intro, page transitions */
  epic:       2000,
} as const;

// ── Delay Tokens ───────────────────────────────────────────────────
export const DELAY = {
  /** Between staggered children */
  stagger:    80,
  /** Word-by-word text reveal */
  word:       60,
  /** Character-by-character */
  char:       30,
  /** Section children cascade */
  cascade:    120,
} as const;

// ── Spring Physics Configs (for GSAP) ──────────────────────────────
export const SPRING = {
  /** Button hover / CTA */
  button:   { stiffness: 400, damping: 28, mass: 0.8 },
  /** Card lift */
  card:     { stiffness: 260, damping: 20, mass: 1 },
  /** Logo parallax */
  logo:     { stiffness: 180, damping: 30, mass: 1.2 },
  /** Cursor inner */
  cursor:   { stiffness: 800, damping: 40, mass: 0.5 },
  /** Cursor ring */
  ring:     { stiffness: 200, damping: 28, mass: 1 },
  /** Page panel */
  page:     { stiffness: 300, damping: 35, mass: 1 },
} as const;

// ── Animation Presets ──────────────────────────────────────────────
/**
 * CSS variables consumed in globals.css and components via style prop.
 * Each preset returns an object suitable for React inline style or
 * a starting/ending state for GSAP.
 */

export type RevealState = 'hidden' | 'visible';

/** Clip-path mask reveal — premium heading entrance */
export function maskReveal(state: RevealState) {
  return {
    clipPath: state === 'hidden' ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)',
    transition: `clip-path ${DUR.reveal}ms ${EASE.out}`,
    willChange: 'clip-path',
  };
}

/** Vertical slide-up fade — body copy, supporting elements */
export function fadeUp(state: RevealState, delay = 0) {
  return {
    opacity: state === 'hidden' ? 0 : 1,
    transform: state === 'hidden' ? 'translateY(24px)' : 'translateY(0)',
    transition: `opacity ${DUR.emphasis}ms ${EASE.out} ${delay}ms, transform ${DUR.emphasis}ms ${EASE.out} ${delay}ms`,
    willChange: 'opacity, transform',
  };
}

/** Scale from slightly small — cards, images */
export function scaleReveal(state: RevealState, delay = 0) {
  return {
    opacity: state === 'hidden' ? 0 : 1,
    transform: state === 'hidden' ? 'scale(0.96)' : 'scale(1)',
    transition: `opacity ${DUR.reveal}ms ${EASE.out} ${delay}ms, transform ${DUR.reveal}ms ${EASE.out} ${delay}ms`,
    willChange: 'opacity, transform',
  };
}

/** Engineering line draw — horizontal rule, border */
export function lineDraw(state: RevealState, delay = 0) {
  return {
    transform: state === 'hidden' ? 'scaleX(0)' : 'scaleX(1)',
    transformOrigin: 'left center',
    transition: `transform ${DUR.reveal}ms ${EASE.suppress} ${delay}ms`,
    willChange: 'transform',
  };
}

/** Logo metallic parallax — pointer-reactive */
export function logoParallax(mx: number, my: number, intensity = 1) {
  const rx = (my - 0.5) * 6 * intensity;   // tilt on X axis
  const ry = (mx - 0.5) * -6 * intensity;  // tilt on Y axis
  return {
    transform: `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`,
    transition: `transform 120ms linear`,
    willChange: 'transform',
  };
}

/** Card physical lift — hover state */
export function cardLift(active: boolean) {
  return {
    transform: active ? 'translateY(-10px) scale(1.015)' : 'translateY(0) scale(1)',
    boxShadow: active
      ? '0 24px 60px rgba(0,0,0,0.55), 0 0 40px rgba(196,30,58,0.10)'
      : '0 4px 20px rgba(0,0,0,0.30)',
    transition: `transform ${DUR.emphasis}ms ${EASE.softSpring}, box-shadow ${DUR.emphasis}ms ${EASE.out}`,
    willChange: 'transform, box-shadow',
  };
}

/** Button magnetic — press + spring release */
export function buttonPress(pressed: boolean) {
  return {
    transform: pressed ? 'scale(0.96)' : 'scale(1)',
    transition: pressed
      ? `transform ${DUR.micro}ms ${EASE.suppress}`
      : `transform ${DUR.fast}ms ${EASE.spring}`,
    willChange: 'transform',
  };
}

/** Founder section reveal — calm, magazine-quality */
export function founderReveal(state: RevealState, delay = 0) {
  return {
    opacity: state === 'hidden' ? 0 : 1,
    transform: state === 'hidden' ? 'translateY(16px) scale(0.99)' : 'translateY(0) scale(1)',
    transition: `opacity ${DUR.cinematic}ms ${EASE.out} ${delay}ms, transform ${DUR.cinematic}ms ${EASE.out} ${delay}ms`,
    willChange: 'opacity, transform',
  };
}

/** Smoke drift — background particle */
export function smokeDrift(progress: number, startX: number, amplitude: number) {
  const x = startX + Math.sin(progress * Math.PI * 2) * amplitude;
  const y = -progress * 100;
  const opacity = progress < 0.3
    ? progress / 0.3 * 0.12
    : progress > 0.7
    ? (1 - (progress - 0.7) / 0.3) * 0.12
    : 0.12;
  return { x, y, opacity };
}

// ── GSAP Defaults (pass to gsap.to / gsap.from) ───────────────────
export const GSAP = {
  heroReveal: {
    duration: 1.2,
    ease: 'power3.out',
    y: 0,
    opacity: 1,
    clipPath: 'inset(0 0% 0 0)',
  },
  sectionReveal: {
    duration: 0.8,
    ease: 'power2.out',
    y: 0,
    opacity: 1,
    stagger: 0.12,
  },
  pageTransition: {
    duration: 0.4,
    ease: 'power2.inOut',
  },
  engineeringLine: {
    duration: 0.9,
    ease: 'power3.inOut',
    scaleX: 1,
  },
} as const;

// ── Colour Tokens (matches tailwind config) ────────────────────────
export const COLOR = {
  fireRed:    '#C41E3A',
  fireLight:  '#E5293E',
  ember:      '#FF5722',
  gold:       '#D4A017',
  goldDark:   '#8B6914',
  graphite:   '#0E1012',
  void:       '#050708',
  smoke:      'rgba(200,200,200,0.04)',
} as const;
