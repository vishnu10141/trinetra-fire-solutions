'use client';
/**
 * SplitReveal — Premium text mask reveal
 * ─────────────────────────────────────────────────────────────────
 * Reveals text using clip-path mask — word by word or line by line.
 * After reveal, optionally sweeps a metallic highlight across.
 *
 * No GSAP required — pure CSS transitions via IntersectionObserver.
 * Each word sits in an overflow:hidden wrapper with clip-path animation.
 */
import { useEffect, useRef, useState } from 'react';
import { EASE, DUR, DELAY } from '@/lib/motion';

interface Props {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;           // ms before animation starts
  stagger?: number;         // ms between words (default 60)
  mode?: 'word' | 'line';  // word = each word reveals; line = whole line
  once?: boolean;           // only animate once (default true)
  sweep?: boolean;          // light sweep after reveal
}

export default function SplitReveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  stagger = DELAY.word,
  mode = 'word',
  once = true,
  sweep = false,
}: Props) {
  const ref      = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const words = mode === 'word'
    ? children.split(' ').filter(Boolean)
    : [children];

  useEffect(() => {
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
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    // @ts-ignore — dynamic tag
    <Tag ref={ref} className={`inline ${className}`} aria-label={children}>
      {words.map((word, i) => {
        const wordDelay = delay + i * stagger;
        return (
          <span
            key={i}
            className="inline-block overflow-hidden"
            aria-hidden="true"
            style={{ marginRight: mode === 'word' ? '0.28em' : 0, verticalAlign: 'bottom' }}
          >
            <span
              style={{
                display:   'inline-block',
                clipPath:  visible ? 'inset(0 0% 0 0)' : 'inset(0 101% 0 0)',
                transform: visible ? 'translateY(0)' : 'translateY(14px)',
                transition: [
                  `clip-path ${DUR.reveal}ms ${EASE.out} ${wordDelay}ms`,
                  `transform  ${DUR.reveal}ms ${EASE.out} ${wordDelay}ms`,
                ].join(', '),
                willChange: 'clip-path, transform',
                position: 'relative',
              }}
            >
              {word}
              {/* Metallic highlight sweep */}
              {sweep && visible && (
                <span
                  style={{
                    position:   'absolute',
                    inset:      0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
                    transform:  'translateX(-110%)',
                    animation:  `sweep-highlight 0.7s ${EASE.out} ${wordDelay + DUR.reveal}ms forwards`,
                    pointerEvents: 'none',
                  }}
                  aria-hidden="true"
                />
              )}
            </span>
          </span>
        );
      })}
      <style>{`
        @keyframes sweep-highlight {
          from { transform: translateX(-110%); }
          to   { transform: translateX(110%);  }
        }
      `}</style>
    </Tag>
  );
}
