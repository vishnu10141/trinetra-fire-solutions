'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { featuredProducts } from '@/data/products';
import company from '@/config/company';

function ProductCard({ product, index }: { product: typeof featuredProducts[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={`/products/${product.slug}`}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      data-cursor="view"
      style={{
        background: hovered
          ? 'linear-gradient(145deg,rgba(255,87,34,0.05) 0%,rgba(12,10,8,0.97) 100%)'
          : 'rgba(255,255,255,0.024)',
        border: `1px solid ${hovered ? 'rgba(255,87,34,0.18)' : 'rgba(255,255,255,0.055)'}`,
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? 'translateY(-10px) scale(1.012)' : 'translateY(0) scale(1)')
          : 'translateY(28px) scale(0.97)',
        boxShadow: hovered
          ? '0 24px 56px rgba(0,0,0,0.55), 0 0 36px rgba(255,87,34,0.07)'
          : '0 4px 18px rgba(0,0,0,0.28)',
        transition: visible
          ? 'transform 480ms cubic-bezier(0.25,1.3,0.5,1),box-shadow 380ms ease,border-color 220ms ease,background 300ms ease,opacity 0ms'
          : `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${index * 55}ms,transform 600ms cubic-bezier(0.16,1,0.3,1) ${index * 55}ms`,
        willChange: 'transform',
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 500)}
    >
      {/* Image area — white bg so product photos display correctly */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        height: 'clamp(130px,16vw,168px)',
        background: hovered ? '#ffffff' : '#f5f5f5',
        transition: 'background 300ms ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0.5rem',
      }}>
        {/* Actual product image */}
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 500ms cubic-bezier(0.25,1.3,0.5,1)',
          }}
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
        />

        {/* Highlight sweep */}
        <div aria-hidden="true" style={{
          position:'absolute',inset:0,
          background:'linear-gradient(108deg,transparent 30%,rgba(255,255,255,0.5) 50%,transparent 70%)',
          transform: hovered ? 'translateX(140%)' : 'translateX(-140%)',
          transition: hovered ? 'transform 580ms cubic-bezier(0.16,1,0.3,1)' : 'none',
        }}/>

        {/* Bottom fade into card */}
        <div style={{
          position:'absolute',bottom:0,left:0,right:0,height:'40%',
          background:'linear-gradient(to top,rgba(8,10,13,0.5),transparent)',
          pointerEvents: 'none',
        }}/>

        {/* Badge */}
        {product.badge && (
          <div style={{
            position:'absolute',top:10,left:10,
            padding:'2px 9px',borderRadius:99,
            background:'rgba(196,30,58,0.85)',
            border:'1px solid rgba(196,30,58,0.5)',
            color:'#fff',fontSize:'0.58rem',fontWeight:700,letterSpacing:'0.07em',
          }}>
            {product.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex:1,padding:'1rem 1.1rem 1rem',display:'flex',flexDirection:'column' }}>
        <div style={{
          fontSize:'0.58rem',letterSpacing:'0.38em',textTransform:'uppercase',
          color:'rgba(255,255,255,0.22)',marginBottom:6,
        }}>
          {product.category}
        </div>

        <h3 style={{
          fontSize:'0.82rem',fontWeight:600,lineHeight:1.35,marginBottom:8,
          color: hovered ? 'rgba(255,87,34,0.92)' : 'rgba(245,240,232,0.87)',
          transition:'color 220ms ease',
          display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden',
        }}>
          {product.name}
        </h3>

        <p style={{
          fontSize:'0.72rem',color:'rgba(255,255,255,0.33)',lineHeight:1.6,
          display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden',
          flex:1,marginBottom:12,
        }}>
          {product.shortDescription}
        </p>

        {/* Footer row */}
        <div style={{
          display:'flex',alignItems:'center',justifyContent:'space-between',
          paddingTop:10,
          borderTop:`1px solid ${hovered ? 'rgba(255,87,34,0.1)' : 'rgba(255,255,255,0.04)'}`,
          transition:'border-color 220ms ease',
        }}>
          <div style={{ display:'flex',gap:5 }}>
            {(product.features || []).slice(0,3).map((_,i) => (
              <span key={i} style={{
                display:'block',width:5,height:5,borderRadius:'50%',
                background: hovered ? 'rgba(255,87,34,0.6)' : 'rgba(255,255,255,0.14)',
                transform: hovered ? 'scale(1.4)' : 'scale(1)',
                transition:`all 240ms cubic-bezier(0.34,1.56,0.64,1) ${i*32}ms`,
              }}/>
            ))}
          </div>
          <span style={{
            display:'flex',alignItems:'center',gap:3,
            fontSize:'0.68rem',fontFamily:'var(--font-mono)',
            color: hovered ? 'rgba(255,87,34,0.85)' : 'rgba(255,255,255,0.22)',
            transition:'color 220ms ease',
          }}>
            Details
            <svg style={{
              width:10,height:10,
              transform: hovered ? 'translateX(3px)' : 'none',
              transition:'transform 240ms cubic-bezier(0.34,1.56,0.64,1)',
            }} fill="none" viewBox="0 0 12 12">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedProducts() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [hv, setHv] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHv(true); io.disconnect(); } },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background:'linear-gradient(180deg,#060810 0%,#0A0C10 100%)', padding:'clamp(64px,10vw,128px) 0' }}
      aria-labelledby="products-heading"
    >
      {/* Ember glow top-right */}
      <div aria-hidden="true" style={{
        position:'absolute',top:0,right:0,width:'40%',height:'50%',pointerEvents:'none',
        background:'radial-gradient(ellipse at top right,rgba(255,87,34,0.04) 0%,transparent 65%)',
      }}/>
      <div aria-hidden="true" style={{
        position:'absolute',top:0,left:0,right:0,height:1,
        background:'linear-gradient(90deg,transparent,rgba(255,87,34,0.12),transparent)',
      }}/>

      <div className="container-trinetra relative">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:14 }}>
              <div style={{
                height:1,width:hv?28:0,
                background:'rgba(255,87,34,0.5)',
                transition:'width 700ms cubic-bezier(0.16,1,0.3,1)',
              }}/>
              <span style={{
                fontFamily:'var(--font-mono)',fontSize:'0.64rem',
                letterSpacing:'0.5em',textTransform:'uppercase',
                color:'rgba(255,87,34,0.68)',
                opacity:hv?1:0,transition:'opacity 600ms ease 200ms',
              }}>Equipment</span>
            </div>
            <h2
              id="products-heading"
              className="font-display text-cinematic-md"
              style={{
                color:'rgba(245,240,232,0.95)',
                opacity:hv?1:0,
                clipPath:hv?'inset(0 0% 0 0)':'inset(0 100% 0 0)',
                transition:'opacity 700ms ease 220ms,clip-path 700ms cubic-bezier(0.16,1,0.3,1) 220ms',
              }}
            >
              FIRE PROTECTION<br/><span style={{ color:'#FF5722' }}>EQUIPMENT</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="flex-shrink-0 text-sm flex items-center gap-2 group"
            style={{
              color:'rgba(255,255,255,0.45)',
              opacity:hv?1:0,transition:'opacity 600ms ease 400ms,color 200ms ease',
              textDecoration:'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.color='rgba(255,255,255,0.9)')}
            onMouseLeave={e => (e.currentTarget.style.color='rgba(255,255,255,0.45)')}
          >
            View all products
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Product grid — responsive auto-fill */}
        <div style={{
          display:'grid',gap:14,
          gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,210px),1fr))',
        }}>
          {featuredProducts.slice(0,8).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i}/>
          ))}
        </div>

        {/* WhatsApp enquiry */}
        <div className="mt-12 text-center">
          <a
            href={company.whatsapp.quote()}
            target="_blank"
            rel="noopener noreferrer"
            className="tfs-btn-ghost inline-flex items-center gap-3"
            data-cursor="contact"
          >
            <svg className="w-4 h-4 flex-shrink-0" style={{ color:'#25D366' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.847L.044 24l6.324-1.653A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.938 0-3.754-.524-5.31-1.435l-.383-.226-3.752.981.999-3.655-.248-.396A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Enquire on WhatsApp for pricing &amp; availability
          </a>
        </div>
      </div>
    </section>
  );
}
