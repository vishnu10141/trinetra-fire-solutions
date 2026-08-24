'use client';
/**
 * TrinetraAtmosphere — Global background engine
 * ─────────────────────────────────────────────────────────────────
 * Canvas-based living background. Never static. Never flat black.
 *
 * Layer stack (back to front):
 *   1. Deep gradient — page-specific warm graphite
 *   2. Engineering grid — 1px technical lines, 2% opacity
 *   3. Slow smoke columns — 3-5 tendrils drifting upward
 *   4. Ambient ember particles — 8-12 slow risers
 *   5. Cursor-reactive soft illumination — 280px radius follow
 *   6. Edge vignette — depth perception
 *
 * All animated values paused via IntersectionObserver off-screen.
 */
import { useEffect, useRef } from 'react';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type AtmosphereVariant =
  | 'home'       // red base — fire energy
  | 'services'   // steel blue — engineering blueprint
  | 'products'   // warm steel — industrial
  | 'about'      // gold — founder gravitas
  | 'knowledge'  // amber — warm ember
  | 'contact'    // calm graphite — resolution
  | 'default';   // neutral graphite

interface Props {
  variant?: AtmosphereVariant;
  intensity?: 'full' | 'medium' | 'minimal';
  className?: string;
}

// Colour palette per variant
const VARIANT_COLORS: Record<AtmosphereVariant, {
  glow1: string; glow2: string; grid: string; ember: string;
}> = {
  home:     { glow1:'rgba(196,30,58,0.07)',    glow2:'rgba(255,87,34,0.04)',  grid:'rgba(180,40,40,0.025)',  ember:'#FF5722' },
  services: { glow1:'rgba(40,80,140,0.06)',    glow2:'rgba(80,120,200,0.03)', grid:'rgba(60,100,180,0.03)',  ember:'#6090E0' },
  products: { glow1:'rgba(120,100,60,0.06)',   glow2:'rgba(196,30,58,0.03)', grid:'rgba(150,120,60,0.025)', ember:'#D4A017' },
  about:    { glow1:'rgba(212,160,23,0.06)',   glow2:'rgba(196,30,58,0.03)', grid:'rgba(212,160,23,0.025)', ember:'#D4A017' },
  knowledge:{ glow1:'rgba(220,100,30,0.06)',   glow2:'rgba(212,160,23,0.04)', grid:'rgba(220,120,40,0.025)', ember:'#FF7043' },
  contact:  { glow1:'rgba(50,55,65,0.08)',     glow2:'rgba(30,35,45,0.05)',  grid:'rgba(100,110,130,0.02)', ember:'#8090B0' },
  default:  { glow1:'rgba(30,30,35,0.06)',     glow2:'rgba(20,20,25,0.04)',  grid:'rgba(80,80,90,0.02)',    ember:'#808090' },
};

export default function TrinetraAtmosphere({
  variant  = 'default',
  intensity = 'medium',
  className = '',
}: Props) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const mouseRef   = useRef({ x: -1, y: -1 });
  const rafRef     = useRef<number>(0);
  const activeRef  = useRef(false);
  const tier       = useDevicePerformance();
  const prefersRM  = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    activeRef.current = true;

    const col        = VARIANT_COLORS[variant];
    const intMult    = intensity === 'full' ? 1 : intensity === 'medium' ? 0.7 : 0.4;
    const MAX_SMOKE  = tier === 'high' ? 6  : tier === 'medium' ? 4  : 2;
    const MAX_EMBER  = prefersRM ? 0 : tier === 'high' ? 12 : tier === 'medium' ? 6 : 3;
    const GRID_ALPHA = intensity === 'minimal' ? 0.012 : 0.022;
    const CELL_SIZE  = tier === 'high' ? 60 : 80;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Particles ───────────────────────────────────────────────
    interface SmokeP { x:number;y:number;vx:number;vy:number;size:number;life:number;maxLife:number;rotation:number;rotSpeed:number; }
    interface EmberP  { x:number;y:number;vx:number;vy:number;size:number;life:number;maxLife:number; }

    const smokes: SmokeP[] = [];
    const embers: EmberP[] = [];

    const spawnSmoke = () => {
      if (smokes.length >= MAX_SMOKE) return;
      const W = canvas.width, H = canvas.height;
      smokes.push({
        x:       Math.random()*W,
        y:       H + 20,
        vx:      (Math.random()-0.5)*0.35,
        vy:      -(Math.random()*0.5+0.2),
        size:    Math.random()*70+40,
        life:    0,
        maxLife: Math.random()*600+400,
        rotation: Math.random()*Math.PI*2,
        rotSpeed: (Math.random()-0.5)*0.004,
      });
    };

    const spawnEmber = () => {
      if (embers.length >= MAX_EMBER) return;
      const W = canvas.width, H = canvas.height;
      embers.push({
        x: Math.random()*W,
        y: H + 8,
        vx:(Math.random()-0.5)*0.7,
        vy:-(Math.random()*0.9+0.35),
        size: Math.random()*2+0.8,
        life: 0,
        maxLife: Math.random()*400+250,
      });
    };

    // Pre-seed
    for (let i=0; i<Math.floor(MAX_SMOKE*0.7); i++) {
      spawnSmoke();
      smokes[smokes.length-1].y = Math.random()*canvas.height;
      smokes[smokes.length-1].life = Math.random()*smokes[smokes.length-1].maxLife*0.5;
    }
    for (let i=0; i<Math.floor(MAX_EMBER*0.8); i++) {
      spawnEmber();
      embers[embers.length-1].y = Math.random()*canvas.height;
      embers[embers.length-1].life = Math.random()*embers[embers.length-1].maxLife*0.4;
    }

    // Smooth cursor target
    const cursor = { tx: -1, ty: -1, cx: -1, cy: -1 };

    let frame = 0;
    const render = () => {
      if (!activeRef.current) return;
      frame++;

      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // 1. Base gradient ─────────────────────────────────────
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0,   '#050708');
      bg.addColorStop(0.5, '#060810');
      bg.addColorStop(1,   '#040608');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Variant glow (bottom-left warmth)
      const vg1 = ctx.createRadialGradient(W*0.15, H*0.85, 0, W*0.15, H*0.85, H*0.7);
      vg1.addColorStop(0, col.glow1);
      vg1.addColorStop(1, 'transparent');
      ctx.fillStyle = vg1;
      ctx.fillRect(0, 0, W, H);

      // Secondary (top-right)
      const vg2 = ctx.createRadialGradient(W*0.85, H*0.15, 0, W*0.85, H*0.15, H*0.5);
      vg2.addColorStop(0, col.glow2);
      vg2.addColorStop(1, 'transparent');
      ctx.fillStyle = vg2;
      ctx.fillRect(0, 0, W, H);

      // 2. Engineering grid ──────────────────────────────────
      if (tier !== 'low' && intensity !== 'minimal') {
        ctx.strokeStyle = col.grid;
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        for (let x=0; x<W; x+=CELL_SIZE) { ctx.moveTo(x,0); ctx.lineTo(x,H); }
        for (let y=0; y<H; y+=CELL_SIZE) { ctx.moveTo(0,y); ctx.lineTo(W,y); }
        ctx.globalAlpha = GRID_ALPHA * intMult;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // 3. Smoke tendrils ─────────────────────────────────────
      if (!prefersRM) {
        if (frame % 120 === 0) spawnSmoke();

        for (let i=smokes.length-1; i>=0; i--) {
          const s = smokes[i];
          s.life++;
          if (s.life >= s.maxLife) { smokes.splice(i,1); continue; }
          s.x += s.vx; s.y += s.vy; s.rotation += s.rotSpeed; s.size *= 1.0018;
          const lr    = s.life/s.maxLife;
          const alpha = (lr<0.2 ? lr/0.2 : lr>0.75 ? (1-lr)/0.25 : 1) * 0.055 * intMult;
          if (alpha < 0.002) continue;

          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.rotation);
          const sg = ctx.createRadialGradient(0,0,0, 0,0, s.size);
          sg.addColorStop(0,   `rgba(200,200,210,${alpha})`);
          sg.addColorStop(0.5, `rgba(170,170,180,${alpha*0.5})`);
          sg.addColorStop(1,   'rgba(150,150,160,0)');
          ctx.fillStyle = sg;
          ctx.beginPath();
          ctx.ellipse(0, 0, s.size, s.size*0.6, 0, 0, Math.PI*2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 4. Ambient embers ─────────────────────────────────────
      if (!prefersRM && MAX_EMBER > 0) {
        if (frame % 40 === 0) spawnEmber();

        for (let i=embers.length-1; i>=0; i--) {
          const e = embers[i];
          e.life++;
          if (e.life >= e.maxLife || e.y < -10) { embers.splice(i,1); continue; }
          e.x += e.vx + Math.sin(e.life*0.04)*0.2;
          e.y += e.vy;
          const lr    = e.life/e.maxLife;
          const alpha = (lr<0.15 ? lr/0.15 : lr>0.8 ? (1-lr)/0.2 : 1) * 0.55 * intMult;

          const glow = ctx.createRadialGradient(e.x,e.y,0, e.x,e.y, e.size*5);
          glow.addColorStop(0,   col.ember + Math.floor(alpha*0.8*255).toString(16).padStart(2,'0'));
          glow.addColorStop(1,   col.ember + '00');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size*5, 0, Math.PI*2);
          ctx.fill();
          // Core
          ctx.fillStyle = `rgba(255,230,180,${alpha*0.85})`;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size*0.8, 0, Math.PI*2);
          ctx.fill();
        }
      }

      // 5. Cursor illumination ────────────────────────────────
      if (!prefersRM && tier !== 'low' && mouseRef.current.x > 0) {
        cursor.tx = mouseRef.current.x;
        cursor.ty = mouseRef.current.y;
        cursor.cx += (cursor.tx - cursor.cx) * 0.07;
        cursor.cy += (cursor.ty - cursor.cy) * 0.07;

        const cr = ctx.createRadialGradient(cursor.cx,cursor.cy,0, cursor.cx,cursor.cy, 260);
        cr.addColorStop(0,   'rgba(255,255,255,0.025)');
        cr.addColorStop(0.5, 'rgba(200,150,80,0.012)');
        cr.addColorStop(1,   'transparent');
        ctx.fillStyle = cr;
        ctx.fillRect(0, 0, W, H);
      }

      // 6. Edge vignette ──────────────────────────────────────
      const vig = ctx.createRadialGradient(W/2,H/2, H*0.3, W/2,H/2, H*0.85);
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(1, 'rgba(0,0,0,0.45)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(render);
    };

    // Pointer tracking
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    // Pause when off-screen
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      } else if (activeRef.current && !rafRef.current) {
        rafRef.current = requestAnimationFrame(render);
      }
    }, { threshold: 0.01 });
    io.observe(canvas);

    rafRef.current = requestAnimationFrame(render);

    return () => {
      activeRef.current = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouse);
      ro.disconnect();
      io.disconnect();
    };
  }, [variant, intensity, tier, prefersRM]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
