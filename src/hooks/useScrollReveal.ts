'use client';
/**
 * useScrollReveal — Intersection Observer based viewport entrance.
 *
 * Usage:
 *   const { ref, visible } = useScrollReveal({ threshold: 0.12 });
 *
 *   <div
 *     ref={ref}
 *     style={{
 *       opacity:   visible ? 1 : 0,
 *       transform: visible ? 'translateY(0)' : 'translateY(20px)',
 *       transition: 'opacity 600ms ease, transform 600ms ease',
 *     }}
 *   />
 *
 * Respects prefers-reduced-motion — returns visible: true immediately.
 */
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface Options {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal({ threshold = 0.10, rootMargin = '0px 0px -32px 0px', once = true }: Options = {}) {
  const prefersRM = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(prefersRM);

  useEffect(() => {
    if (prefersRM) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [prefersRM, threshold, rootMargin, once]);

  return { ref, visible };
}

/**
 * Stagger helper — returns index-based delay in ms.
 * Useful for card grids where each card entrance is offset.
 *
 * Usage:
 *   style={{ transitionDelay: staggerDelay(index, 80) + 'ms' }}
 */
export function staggerDelay(index: number, stepMs = 80, maxMs = 480): number {
  return Math.min(index * stepMs, maxMs);
}
