import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { productCategories, getProductBySlug, getRelatedProducts } from '@/data/products';
import company from '@/config/company';

export async function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  productCategories.forEach(cat => {
    cat.products.forEach(p => slugs.push({ slug: p.slug }));
  });
  return slugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} | Trinetra Fire Solutions`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="tfs-atm-medium tfs-grid-overlay" style={{ paddingTop: 88, minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div className="container-trinetra" style={{ paddingTop: 28, paddingBottom: 0 }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.73rem', fontFamily: 'var(--font-mono)', color: 'rgba(245,240,232,0.35)', letterSpacing: '0.06em' }}>
          <Link href="/products" style={{ color: 'rgba(245,240,232,0.35)', textDecoration: 'none' }}>PRODUCTS</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: 'rgba(245,240,232,0.6)', textTransform: 'uppercase' }}>{product.category}</span>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: 'rgba(245,240,232,0.9)' }}>{product.name}</span>
        </nav>
      </div>

      {/* Product hero */}
      <section style={{ padding: 'clamp(32px,5vw,64px) 0' }}>
        <div className="container-trinetra">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'start' }}>

            {/* Image */}
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', background: '#FFFFFF', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 1px rgba(255,255,255,0.08)' }}>
              <Image
                src={product.image}
                alt={product.name}
                width={480}
                height={480}
                style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                priority
              />
              {product.badge && (
                <div style={{ position: 'absolute', top: 14, right: 14, background: '#C41E3A', color: '#fff', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
                  {product.badge}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              {/* Category tag */}
              <div style={{ marginBottom: 14 }}>
                <Link
                  href={`/products?category=${product.categorySlug}`}
                  style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 99, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4A017', background: 'rgba(212,160,23,0.10)', border: '1px solid rgba(212,160,23,0.25)', textDecoration: 'none' }}
                >
                  {product.category}
                </Link>
              </div>

              <h1 className="font-display" style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', lineHeight: 1.05, color: 'rgba(245,240,232,0.95)', marginBottom: 16 }}>
                {product.name.toUpperCase()}
              </h1>

              <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(245,240,232,0.6)', marginBottom: 28 }}>
                {product.description}
              </p>

              {/* Features */}
              {product.features.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', color: 'rgba(245,240,232,0.3)', textTransform: 'uppercase', marginBottom: 12 }}>Key Features</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {product.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.88rem', color: 'rgba(245,240,232,0.65)', lineHeight: 1.55 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#C41E3A', flexShrink: 0, marginTop: 7 }}/>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {product.applications.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', color: 'rgba(245,240,232,0.3)', textTransform: 'uppercase', marginBottom: 12 }}>Applications</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {product.applications.map((a, i) => (
                      <span key={i} style={{ padding: '4px 12px', borderRadius: 99, fontSize: '0.75rem', color: 'rgba(245,240,232,0.55)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>{a}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical note */}
              {product.technicalNote && (
                <div style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.15)', marginBottom: 32 }}>
                  <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', color: '#D4A017', textTransform: 'uppercase', marginBottom: 6 }}>Technical Note</div>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.65, margin: 0 }}>{product.technicalNote}</p>
                </div>
              )}

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href={company.whatsapp.productEnquiry(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, background: '#C41E3A', color: '#fff', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.02em' }}
                >
                  <svg style={{ width: 14, height: 14 }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.847L.044 24l6.324-1.653A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.938 0-3.754-.524-5.31-1.435l-.383-.226-3.752.981.999-3.655-.248-.396A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Enquire on WhatsApp
                </a>
                <Link
                  href="/request-quote"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(245,240,232,0.8)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ padding: 'clamp(32px,5vw,56px) 0 72px' }}>
          <div className="container-trinetra">
            <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.3)', textTransform: 'uppercase', marginBottom: 24 }}>Related Products</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {related.map(rp => (
                <Link
                  key={rp.slug}
                  href={`/products/${rp.slug}`}
                  style={{ display: 'flex', flexDirection: 'column', borderRadius: 14, overflow: 'hidden', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', transition: 'border-color 200ms' }}
                >
                  <div style={{ background: '#FFFFFF', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
                    <Image src={rp.image} alt={rp.name} width={160} height={120} style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(245,240,232,0.85)', lineHeight: 1.4 }}>{rp.name}</div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(245,240,232,0.35)', marginTop: 4 }}>{rp.category}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA strip */}
      <div className="container-trinetra" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', padding: '24px 28px', borderRadius: 16, background: 'rgba(196,30,58,0.06)', border: '1px solid rgba(196,30,58,0.15)' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div className="font-display" style={{ fontSize: '1.1rem', color: 'rgba(245,240,232,0.9)', marginBottom: 4 }}>NEED INSTALLATION OR SERVICE?</div>
            <div style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.4)', lineHeight: 1.6 }}>Trinetra Fire Solutions supplies and installs complete fire protection systems.</div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/services" style={{ padding: '10px 20px', borderRadius: 9, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(245,240,232,0.7)', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>
              Our Services
            </Link>
            <Link href="/request-inspection" style={{ padding: '10px 20px', borderRadius: 9, background: '#C41E3A', color: '#fff', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}>
              Book Site Inspection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
