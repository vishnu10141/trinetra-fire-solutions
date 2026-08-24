'use client';
/**
 * CinematicIntro — Trinetra Fire Solutions
 * ─────────────────────────────────────────────────────────────────
 * FINAL REFINED SEQUENCE — Total 7.5s (4.0s on low-tier devices)
 *
 * Phase 1 (0.0–0.8s)  DARKNESS     — deep charcoal, ambient heat shimmer
 * Phase 2 (0.8–3.0s)  FIRE         — controlled flame rises, embers drift upward
 * Phase 3 (3.0–4.5s)  SUPPRESSION  — blue-white wave sweeps left→right
 * Phase 4 (4.5–5.2s)  SILENCE      — dark pause, last embers settle, smoke clears
 * Phase 5 (5.2–7.5s)  LOGO REVEAL  — REAL Trinetra logo fades/scales in with amber bloom
 *
 * Logo reveal:
 *  - starts at scale 0.96, ends at 1.0 (no bounce, no spin)
 *  - opacity: 0 → 1 over ~1.2s
 *  - amber edge glow controlled by drop-shadow filter
 *  - stays fully visible for ~1.4s before onComplete fires
 *
 * The REAL logo at /brand/trinetra-logo.png is the FINAL visual focus.
 * mix-blend-mode: lighten removes the black PNG background on the dark canvas.
 */
import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';
import { useTransparentLogo } from '@/hooks/useTransparentLogo';

interface Props { onComplete: () => void; onSkip: () => void; }

export default function CinematicIntro({ onComplete, onSkip }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const startRef  = useRef<number>(-1);
  const activeRef = useRef(false);
  const prefersRM = useReducedMotion();
  const tier      = useDevicePerformance();
  // Canvas-processed logo — black pixels stripped, no visible rectangle
  const transparentLogo = useTransparentLogo('/brand/trinetra-logo-hd.png', 28);

  const TOTAL = tier === 'low' ? 7000 : 7500;

  const cleanup = useCallback(() => {
    activeRef.current = false;
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = 0; }
  }, []);

  const handleSkip = useCallback(() => { cleanup(); onSkip(); }, [cleanup, onSkip]);

  // Reduced-motion: skip immediately
  useEffect(() => {
    if (!prefersRM) return;
    const t = setTimeout(onComplete, 300);
    return () => clearTimeout(t);
  }, [prefersRM, onComplete]);

  useEffect(() => {
    if (prefersRM) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    activeRef.current = true;
    startRef.current  = -1;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const W = () => canvas.width;
    const H = () => canvas.height;

    // ── Particle pools ───────────────────────────────────────────
    const NE = tier === 'high' ? 100 : tier === 'medium' ? 60 : 30;
    const NS = tier === 'high' ? 50  : 25;
    const NK = tier === 'high' ? 25  : 12;

    interface Particle { x:number;y:number;vx:number;vy:number;size:number;life:number;maxLife:number;active:boolean;color:string; }
    interface Spark    { x:number;y:number;vx:number;vy:number;life:number;maxLife:number;active:boolean; }
    interface Smoke    { x:number;y:number;vx:number;vy:number;r:number;life:number;maxLife:number;active:boolean; }

    const embers: Particle[] = Array.from({length:NE}, () => ({x:0,y:0,vx:0,vy:0,size:0,life:0,maxLife:0,active:false,color:'#FF5722'}));
    const sparks:  Spark[]   = Array.from({length:NS}, () => ({x:0,y:0,vx:0,vy:0,life:0,maxLife:0,active:false}));
    const smokes:  Smoke[]   = Array.from({length:NK}, () => ({x:0,y:0,vx:0,vy:0,r:0,life:0,maxLife:0,active:false}));

    // Ambient floating particles — always present
    const NA = tier === 'high' ? 35 : 18;
    const atmos = Array.from({length:NA}, () => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.08),
      r: Math.random() * 1.2 + 0.3,
      op: Math.random() * 0.25 + 0.04,
    }));

    const spawnEmber = (cx: number, cy: number, spread: number, str: number) => {
      const e = embers.find(x => !x.active); if (!e) return;
      e.active = true;
      e.x = cx + (Math.random()-0.5)*spread;
      e.y = cy + Math.random()*16;
      e.vx = (Math.random()-0.5)*2.2*str;
      e.vy = -(Math.random()*4.5+1.8)*str;
      e.size = Math.random()*2.8+0.6;
      e.maxLife = Math.random()*160+70; e.life = e.maxLife;
      const r = Math.random();
      e.color = r > 0.55 ? '#FF5722' : r > 0.3 ? '#D4A017' : '#FF3D00';
    };

    const spawnSpark = (cx: number, cy: number, burst: number) => {
      const s = sparks.find(x => !x.active); if (!s) return;
      const ang = Math.random()*Math.PI*2, spd = Math.random()*burst+3;
      s.active = true; s.x = cx; s.y = cy;
      s.vx = Math.cos(ang)*spd; s.vy = Math.sin(ang)*spd - 5;
      s.maxLife = Math.random()*40+18; s.life = s.maxLife;
    };

    const spawnSmoke = (cx: number, cy: number, radius: number) => {
      const s = smokes.find(x => !x.active); if (!s) return;
      s.active = true;
      s.x = cx + (Math.random()-0.5)*radius; s.y = cy;
      s.vx = (Math.random()-0.5)*0.5; s.vy = -(Math.random()*0.8+0.3);
      s.r = Math.random()*70+35; s.maxLife = Math.random()*280+180; s.life = s.maxLife;
    };

    // ── Flame renderer ──────────────────────────────────────────
    const drawFlame = (cx: number, baseY: number, w: number, h: number, intensity: number, t: number, hueShift: number = 0) => {
      if (intensity < 0.02) return;
      const layers = tier === 'high' ? 7 : 5;
      for (let l = 0; l < layers; l++) {
        const lr   = l / layers;
        const fw   = w * (1 - lr * 0.38);
        const fh   = h * (1 - lr * 0.48);
        const wob  = Math.sin(t * 3.2 + l * 1.3) * fw * 0.13 + Math.sin(t * 6.5 + l * 0.8) * fw * 0.06;
        const alph = (0.88 - lr * 0.52) * intensity;
        const grn  = Math.floor(38 + (1-lr)*115 + Math.sin(t*3.8+l)*18 + hueShift);

        ctx.beginPath();
        ctx.moveTo(cx - fw*0.5, baseY);
        ctx.bezierCurveTo(cx-fw*0.38+wob, baseY-fh*0.32, cx-fw*0.10+wob*0.55, baseY-fh*0.76, cx+wob*0.32, baseY-fh);
        ctx.bezierCurveTo(cx+fw*0.10-wob*0.55, baseY-fh*0.76, cx+fw*0.38-wob, baseY-fh*0.32, cx+fw*0.5, baseY);
        ctx.closePath();

        const gr = ctx.createRadialGradient(cx, baseY-fh*0.32, fw*0.04, cx, baseY-fh*0.48, fw*0.88);
        gr.addColorStop(0,    `rgba(255,${Math.min(grn+65,255)},28,${alph})`);
        gr.addColorStop(0.33, `rgba(255,${grn},8,${alph*0.82})`);
        gr.addColorStop(0.72, `rgba(215,${Math.floor(grn*0.32)},0,${alph*0.42})`);
        gr.addColorStop(1,    'rgba(155,12,0,0)');
        ctx.fillStyle = gr;
        ctx.fill();
      }

      // Base heat bloom
      if (intensity > 0.22) {
        const bl = ctx.createRadialGradient(cx, baseY, 0, cx, baseY, w*0.68);
        bl.addColorStop(0,   `rgba(255,115,8,${0.20*intensity})`);
        bl.addColorStop(0.4, `rgba(195,28,0,${0.09*intensity})`);
        bl.addColorStop(1,   'rgba(140,0,0,0)');
        ctx.fillStyle = bl;
        ctx.beginPath();
        ctx.ellipse(cx, baseY, w*0.62, h*0.20, 0, 0, Math.PI*2);
        ctx.fill();
      }
    };

    // ── Suppression wave ─────────────────────────────────────────
    const drawSuppression = (progress: number) => {
      if (progress <= 0) return;
      const wW = W(); const wH = H();
      const waveX = -100 + progress * (wW + 200);

      const grad = ctx.createLinearGradient(waveX-90, 0, waveX+90, 0);
      grad.addColorStop(0,   'rgba(200,228,255,0)');
      grad.addColorStop(0.3, 'rgba(178,208,255,0.16)');
      grad.addColorStop(0.5, 'rgba(220,238,255,0.42)');
      grad.addColorStop(0.7, 'rgba(178,208,255,0.16)');
      grad.addColorStop(1,   'rgba(200,228,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, wW, wH);

      // Bright leading line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(waveX, 0);
      ctx.lineTo(waveX, wH);
      ctx.strokeStyle = 'rgba(195,232,255,0.82)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = 'rgba(140,205,255,0.9)';
      ctx.shadowBlur = 16;
      ctx.stroke();
      ctx.restore();
    };

    // ── Phase timing helpers ─────────────────────────────────────
    const PH = {
      fire:    [0.8,  3.0],
      supp:    [3.0,  4.5],
      silence: [4.5,  5.2],
      logo:    [5.2,  7.5],
    };

    const pct = (s: number, e: number, ms: number) =>
      Math.max(0, Math.min(1, (ms - s*1000) / ((e-s)*1000)));
    const eOut  = (x: number) => 1 - (1-x)**3;
    const smStep = (x: number) => x * x * (3 - 2 * x);

    const tick = (now: number) => {
      if (!activeRef.current) return;
      if (startRef.current < 0) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = elapsed / 1000;
      const wW = W(); const wH = H();
      const cx = wW / 2; const cy = wH / 2;
      const baseY = cy + wH * 0.20;

      // ── Background ───────────────────────────────────────────
      ctx.fillStyle = '#060407';
      ctx.fillRect(0, 0, wW, wH);

      const fireP = pct(PH.fire[0],  PH.fire[1],  elapsed);
      const suppP = pct(PH.supp[0],  PH.supp[1],  elapsed);
      const silP  = pct(PH.silence[0], PH.silence[1], elapsed);
      const logoP = pct(PH.logo[0],  PH.logo[1],  elapsed);

      // Fire heat glow
      let fireInt = 0;
      if (fireP > 0) fireInt = eOut(fireP);
      if (suppP > 0) fireInt = Math.max(0, 1 - eOut(suppP));

      if (fireInt > 0.02) {
        const bg = ctx.createRadialGradient(cx, baseY, 0, cx, baseY, wW*0.72);
        bg.addColorStop(0,   `rgba(175,48,8,${0.48*fireInt})`);
        bg.addColorStop(0.3, `rgba(115,28,4,${0.32*fireInt})`);
        bg.addColorStop(0.7, `rgba(55,10,2,${0.16*fireInt})`);
        bg.addColorStop(1,   'rgba(4,2,3,0)');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, wW, wH);
      }

      // Logo-phase amber bloom
      if (logoP > 0) {
        const amb = ctx.createRadialGradient(cx, cy, 0, cx, cy, wW*0.55);
        amb.addColorStop(0,   `rgba(210,138,8,${0.18*smStep(logoP)})`);
        amb.addColorStop(0.4, `rgba(175,65,8,${0.10*smStep(logoP)})`);
        amb.addColorStop(0.8, `rgba(110,25,4,${0.04*smStep(logoP)})`);
        amb.addColorStop(1,   'rgba(4,2,3,0)');
        ctx.fillStyle = amb;
        ctx.fillRect(0, 0, wW, wH);
      }

      // ── Ambient atmospheric dots ─────────────────────────────
      atmos.forEach(a => {
        a.x += a.vx; a.y += a.vy;
        if (a.y < -8) { a.y = wH + 8; a.x = Math.random()*wW; }
        const fade = logoP > 0.4 ? Math.max(0, 1 - (logoP - 0.4) / 0.6) : 1;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(175,78,18,${a.op * (0.25 + fireInt*0.75) * fade})`;
        ctx.fill();
      });

      // ── Fire ─────────────────────────────────────────────────
      if (fireInt > 0.02) {
        const fw = Math.min(wW * 0.26, 210) * fireInt;
        const fh = Math.min(wH * 0.48, 390) * fireInt;

        drawFlame(cx, baseY, fw, fh, fireInt, t, 0);

        // Side flames appear at peak intensity
        if (fireP > 0.45) {
          const sp = eOut(Math.max(0, (fireP - 0.45) / 0.55));
          if (suppP === 0) {
            drawFlame(cx - wW*0.13*sp, baseY+18, fw*0.62*sp, fh*0.72*sp, fireInt*0.7*sp, t+0.55, -8);
            drawFlame(cx + wW*0.13*sp, baseY+18, fw*0.62*sp, fh*0.72*sp, fireInt*0.7*sp, t+1.05, 4);
          }
        }
      }

      // ── Ember spawning ───────────────────────────────────────
      if (fireInt > 0.12) {
        const rate = Math.floor(fireInt * 3);
        for (let i = 0; i < rate; i++) spawnEmber(cx, baseY, 110*fireInt, fireInt);
        if (fireP > 0.4 && suppP < 0.1 && Math.random() < 0.35) {
          spawnSpark(cx + (Math.random()-0.5)*90, baseY - Math.min(wH*0.22,180), 11);
        }
        if (Math.random() < 0.12) spawnSmoke(cx, baseY, 75*fireInt);
      }

      // ── Smoke ────────────────────────────────────────────────
      smokes.forEach(s => {
        if (!s.active) return;
        s.x += s.vx; s.y += s.vy; s.life--;
        if (s.life <= 0) { s.active = false; return; }
        const lf = s.life / s.maxLife;
        const op = lf < 0.18 ? lf/0.18*0.10 : lf > 0.88 ? (1-lf)/0.12*0.10 : 0.10;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r*(1-lf*0.45), 0, Math.PI*2);
        ctx.fillStyle = `rgba(55,22,12,${op * Math.max(fireInt, 0.3)})`;
        ctx.fill();
      });

      // ── Embers ───────────────────────────────────────────────
      embers.forEach(e => {
        if (!e.active) return;
        e.x += e.vx; e.y += e.vy;
        e.vy += 0.055; e.vx *= 0.992; e.life--;
        if (e.life <= 0 || e.y < -25) { e.active = false; return; }
        const lf = e.life / e.maxLife;
        const fade = logoP > 0.25 ? Math.max(0, 1 - (logoP-0.25)/0.55) : 1;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size*lf, 0, Math.PI*2);
        ctx.fillStyle = e.color + Math.floor(lf*fade*255).toString(16).padStart(2,'0');
        ctx.shadowColor = e.color; ctx.shadowBlur = 3.5;
        ctx.fill(); ctx.shadowBlur = 0;
      });

      // ── Sparks ───────────────────────────────────────────────
      sparks.forEach(s => {
        if (!s.active) return;
        s.x += s.vx; s.y += s.vy;
        s.vy += 0.30; s.vx *= 0.97; s.life--;
        if (s.life <= 0) { s.active = false; return; }
        const lf = s.life / s.maxLife;
        const fade = logoP > 0 ? Math.max(0, 1 - logoP * 2.2) : 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx*1.8, s.y - s.vy*1.8);
        ctx.strokeStyle = `rgba(255,${Math.floor(110+lf*100)},18,${lf*fade})`;
        ctx.lineWidth = lf * 1.4;
        ctx.stroke();
      });

      // ── Suppression wave ─────────────────────────────────────
      if (suppP > 0 && suppP < 1) drawSuppression(eOut(suppP));

      // ── Logo phase glow rings ─────────────────────────────────
      if (logoP > 0.1) {
        const ga = smStep(Math.min((logoP-0.1)/0.55, 1));
        for (let r = 2; r >= 1; r--) {
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 130*r);
          g.addColorStop(0,   `rgba(210,155,20,${0.10*ga/r})`);
          g.addColorStop(0.45,`rgba(192,28,50,${0.04*ga/r})`);
          g.addColorStop(1,   'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.ellipse(cx, cy, 130*r, 130*r, 0, 0, Math.PI*2);
          ctx.fill();
        }
      }

      // ── Logo opacity + scale (drives DOM element) ─────────────
      const logoEl = document.getElementById('tfs-cinematic-logo') as HTMLElement | null;
      if (logoEl) {
        let op = 0, sc = 0.96;
        if (logoP > 0.08) {
          const p = Math.min((logoP - 0.08) / 0.52, 1);
          op = smStep(p);
          sc = 0.96 + 0.04 * smStep(p);
        }
        // Slight warmth pulse at peak
        if (logoP > 0.88) {
          const pulse = Math.sin((logoP-0.88)/0.12 * Math.PI) * 0.04;
          op = Math.min(1, op + pulse);
        }
        logoEl.style.opacity  = op.toFixed(4);
        logoEl.style.transform = `translate(-50%,-50%) scale(${sc.toFixed(4)})`;
      }

      // ── Skip hint ─────────────────────────────────────────────
      if (elapsed > 1200 && fireP > 0.1) {
        ctx.save();
        ctx.globalAlpha = 0.22;
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        ctx.fillStyle = '#F5F0E8';
        ctx.fillText('TAP TO SKIP', wW - 22, wH - 18);
        ctx.restore();
      }

      // ── Complete ──────────────────────────────────────────────
      if (elapsed >= TOTAL) { cleanup(); onComplete(); return; }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener('resize', resize); cleanup(); };
  }, [prefersRM, tier, TOTAL, cleanup, onComplete]);

  if (prefersRM) return null;

  return (
    <div
      style={{ position:'fixed', inset:0, zIndex:99999, background:'#060407' }}
      onClick={handleSkip}
      role="presentation"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ position:'absolute', inset:0, display:'block' }}
      />

      {/* REAL Trinetra logo — positioned with left/top 50% so transform:scale works from center */}
      <img
        src={transparentLogo || '/brand/trinetra-logo-hd.png'}
        alt="Trinetra Fire Solutions"
        id="tfs-cinematic-logo"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%) scale(0.96)',
          width: '40vw',
          height: 'auto',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 2,
          mixBlendMode: 'screen',
          filter: [
            'drop-shadow(0 0 28px rgba(212,155,18,0.60))',
            'drop-shadow(0 0 12px rgba(196,30,58,0.35))',
          ].join(' '),
          /* NO CSS transition — RAF drives opacity and scale per-frame */
        }}
      />
    </div>
  );
}
