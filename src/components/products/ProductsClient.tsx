'use client';
/**
 * ProductsClient — HYDRATION FIX
 * ────────────────────────────────────────────────────────────────
 * CRITICAL: The WhatsApp <a> must NOT be nested inside the card <Link>.
 * Architecture: card is a div, product name is a Link, WhatsApp is a
 * sibling <a> — never a child of another anchor.
 */
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import company from '@/config/company';
import { productCategories } from '@/data/products';
import type { Product } from '@/data/products';

// ── Product Card — no nested anchors ─────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 600)}
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible
          ? (hovered ? 'translateY(-8px) scale(1.012)' : 'translateY(0) scale(1)')
          : 'translateY(20px)',
        transition: 'opacity 500ms ease, transform 400ms cubic-bezier(0.25,1.3,0.5,1), box-shadow 300ms ease',
        boxShadow: hovered
          ? '0 20px 48px rgba(0,0,0,0.55), 0 0 28px rgba(255,87,34,0.08)'
          : '0 4px 16px rgba(0,0,0,0.3)',
        background: 'linear-gradient(160deg, rgba(30,20,15,0.95) 0%, rgba(20,12,8,0.98) 100%)',
        border: `1px solid ${hovered ? 'rgba(255,87,34,0.2)' : 'rgba(255,255,255,0.055)'}`,
        display: 'flex',
        flexDirection: 'column',
        willChange: 'transform',
      }}
    >
      {/* Image area — white background, product isolated */}
      <div style={{
        position: 'relative',
        background: hovered
          ? 'linear-gradient(135deg,#fff 0%,#f8f8f8 100%)'
          : 'linear-gradient(135deg,#fafafa 0%,#f2f2f2 100%)',
        height: 'clamp(140px,18vw,180px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        transition: 'background 300ms ease',
      }}>
        {/* Ambient fire glow behind product on hover */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 0,
          background: 'radial-gradient(ellipse at 50% 110%, rgba(255,87,34,0.12) 0%, transparent 60%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 400ms ease',
          pointerEvents: 'none',
        }} />

        {/* Product image */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '100%', height: '100%',
          padding: '0.75rem',
        }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 400ms cubic-bezier(0.25,1.3,0.5,1)',
            }}
            onError={(e) => {
              // Fallback: hide broken image, show nothing (white area)
              (e.target as HTMLImageElement).style.opacity = '0';
            }}
          />
        </div>

        {/* Highlight sweep on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(108deg,transparent 30%,rgba(255,255,255,0.55) 50%,transparent 70%)',
          transform: hovered ? 'translateX(200%)' : 'translateX(-200%)',
          transition: hovered ? 'transform 600ms cubic-bezier(0.16,1,0.3,1)' : 'none',
          pointerEvents: 'none',
        }} />

        {/* Bottom fade into card body */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
          background: 'linear-gradient(to top, rgba(20,12,8,0.15), transparent)',
          pointerEvents: 'none',
        }} />

        {product.badge && (
          <div style={{
            position: 'absolute', top: 10, left: 10,
            padding: '3px 10px', borderRadius: 99, fontSize: '0.6rem', fontWeight: 700,
            background: 'rgba(196,30,58,0.1)', border: '1px solid rgba(196,30,58,0.3)',
            color: '#C41E3A', letterSpacing: '0.06em',
          }}>
            {product.badge}
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '1rem 1.1rem 1.1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Category */}
        <div style={{
          fontSize: '0.58rem', letterSpacing: '0.38em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.22)', marginBottom: 6, fontFamily: 'var(--font-mono)',
        }}>
          {product.category}
        </div>

        {/* Product name — this Link is NOT inside another anchor */}
        <Link
          href={`/products/${product.slug}`}
          style={{
            fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.3,
            color: hovered ? 'rgba(255,87,34,0.95)' : 'rgba(245,240,232,0.9)',
            textDecoration: 'none',
            transition: 'color 200ms ease',
            display: 'block', marginBottom: 8,
          }}
        >
          {product.name}
        </Link>

        <p style={{
          fontSize: '0.72rem', color: 'rgba(255,255,255,0.32)', lineHeight: 1.65,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden', flex: 1, marginBottom: 12,
        }}>
          {product.shortDescription}
        </p>

        {/* Actions row — NOTE: these are siblings, NOT nested */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 10,
          borderTop: `1px solid ${hovered ? 'rgba(255,87,34,0.1)' : 'rgba(255,255,255,0.045)'}`,
          transition: 'border-color 200ms ease',
        }}>
          {/* WhatsApp — standalone <a>, NOT inside Link */}
          <a
            href={company.whatsapp.productEnquiry(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: '0.68rem', color: '#25D366',
              textDecoration: 'none', fontWeight: 600,
              padding: '4px 8px', borderRadius: 6,
              background: hovered ? 'rgba(37,211,102,0.08)' : 'transparent',
              transition: 'background 200ms ease',
            }}
          >
            <svg style={{ width: 12, height: 12, flexShrink: 0 }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.847L.044 24l6.324-1.653A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.938 0-3.754-.524-5.31-1.435l-.383-.226-3.752.981.999-3.655-.248-.396A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Enquire
          </a>

          {/* View details — standalone Link, NOT nested */}
          <Link
            href={`/products/${product.slug}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: '0.68rem', fontFamily: 'var(--font-mono)',
              color: hovered ? 'rgba(255,87,34,0.85)' : 'rgba(255,255,255,0.25)',
              textDecoration: 'none',
              transition: 'color 200ms ease',
            }}
          >
            Details
            <svg style={{
              width: 10, height: 10,
              transform: hovered ? 'translateX(3px)' : 'none',
              transition: 'transform 240ms cubic-bezier(0.34,1.56,0.64,1)',
            }} fill="none" viewBox="0 0 12 12">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Products page ─────────────────────────────────────────────────
export default function ProductsClient() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    return searchParams.get('category') ?? 'all';
  });

  // Sync category from URL whenever search params change
  useEffect(() => {
    const cat = searchParams.get('category');
    setActiveCategory(cat ?? 'all');
  }, [searchParams]);

  const filteredCategories = activeCategory === 'all'
    ? productCategories
    : productCategories.filter(c => c.slug === activeCategory);


  return (
    <div className="tfs-atm-medium tfs-grid-overlay relative" style={{
      paddingTop: 88,
      minHeight: '100vh',
    }}>
      {/* Hero */}
      <section style={{
        padding: 'clamp(48px,8vw,100px) 0 clamp(32px,5vw,56px)',
        position: 'relative', overflow: 'hidden', textAlign: 'center',
      }}>
        {/* Fire atmosphere */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(196,30,58,0.12) 0%, rgba(180,50,0,0.06) 40%, transparent 70%)',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

        <div className="container-trinetra relative">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:16 }}>
            <div style={{ height:1, width:40, background:'rgba(255,87,34,0.4)' }} />
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(255,87,34,0.65)' }}>
              Equipment Catalogue
            </span>
            <div style={{ height:1, width:40, background:'rgba(255,87,34,0.4)' }} />
          </div>
          <h1 className="font-display" style={{
            fontSize: 'clamp(2.5rem,8vw,5.5rem)', color:'rgba(245,240,232,0.95)',
            lineHeight:1, marginBottom:16,
          }}>
            FIRE PROTECTION<br/>
            <span style={{ color:'#FF5722' }}>EQUIPMENT</span>
          </h1>
          <p style={{ color:'rgba(245,240,232,0.45)', fontSize:'1rem', maxWidth:560, margin:'0 auto', lineHeight:1.75 }}>
            Supply of professional fire protection equipment — extinguishers, hydrant components,
            sprinklers, pumps, alarms and safety equipment.
          </p>
        </div>
      </section>

      {/* Category filter tabs */}
      <div className="container-trinetra" style={{ marginBottom: 48 }}>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center' }}>
          <button
            onClick={() => setActiveCategory('all')}
            style={{
              padding:'8px 20px', borderRadius:99, fontSize:'0.78rem',
              fontWeight:600, cursor:'pointer', border:'1px solid',
              background: activeCategory==='all' ? 'rgba(255,87,34,0.15)' : 'rgba(255,255,255,0.03)',
              borderColor: activeCategory==='all' ? 'rgba(255,87,34,0.4)' : 'rgba(255,255,255,0.08)',
              color: activeCategory==='all' ? 'rgba(255,87,34,0.95)' : 'rgba(255,255,255,0.5)',
              transition: 'all 200ms ease',
            }}
          >
            All Products
          </button>
          {productCategories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              style={{
                padding:'8px 20px', borderRadius:99, fontSize:'0.78rem',
                fontWeight:600, cursor:'pointer', border:'1px solid',
                background: activeCategory===cat.slug ? 'rgba(255,87,34,0.15)' : 'rgba(255,255,255,0.03)',
                borderColor: activeCategory===cat.slug ? 'rgba(255,87,34,0.4)' : 'rgba(255,255,255,0.08)',
                color: activeCategory===cat.slug ? 'rgba(255,87,34,0.95)' : 'rgba(255,255,255,0.5)',
                transition: 'all 200ms ease',
              }}
            >
              {cat.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Product categories */}
      <div className="container-trinetra" style={{ paddingBottom: 96, display:'flex', flexDirection:'column', gap:56 }}>
        {filteredCategories.map(cat => (
          <section key={cat.slug} id={cat.slug} aria-labelledby={`cat-${cat.slug}`}>
            <div style={{ marginBottom:24, paddingBottom:16, borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
              <h2
                id={`cat-${cat.slug}`}
                className="font-display"
                style={{ fontSize:'clamp(1.5rem,4vw,2.2rem)', color:'rgba(245,240,232,0.92)', marginBottom:6 }}
              >
                {cat.name.toUpperCase()}
              </h2>
              <p style={{ fontSize:'0.85rem', color:'rgba(245,240,232,0.35)' }}>{cat.description}</p>
            </div>

            <div style={{
              display:'grid', gap:16,
              gridTemplateColumns:'repeat(auto-fill, minmax(min(100%,220px),1fr))',
            }}>
              {cat.products.map(product => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
