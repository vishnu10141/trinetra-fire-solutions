import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const SERVICES: Record<string, {
  title: string; subtitle: string; color: string; description: string; points: string[];
}> = {
  'fire-protection-systems': {
    title: 'Fire Protection Systems', subtitle: 'Hydrant & Sprinkler Engineering', color: '#C41E3A',
    description: 'Complete design, supply, installation and commissioning of fire hydrant systems and automatic sprinkler systems for industrial, commercial and institutional facilities.',
    points: ['Fire hydrant system design and installation per IS 3844 and NBC', 'Automatic sprinkler system design per IS 15105', 'Pump room design: main pump, jockey pump, diesel backup', 'Underground and overhead water mains', 'Landing valves, hose reels and yard hydrant points', 'Commissioning, pressure testing and fire authority approvals'],
  },
  'fire-detection-alarm': {
    title: 'Fire Detection & Alarm', subtitle: 'Early Warning Systems', color: '#FF6B35',
    description: 'Design and installation of intelligent fire alarm systems that provide early warning, precise zone detection and automatic emergency response integration.',
    points: ['Addressable fire alarm control panels (FACP)', 'Smoke, heat and multi-sensor detectors', 'Manual call points at all exit routes', 'Sounders, strobes and voice evacuation systems', 'Integration with building management systems', 'Compliance with IS 2189 and NBC requirements'],
  },
  'extinguisher-services': {
    title: 'Extinguisher Services', subtitle: 'Supply, Installation & Servicing', color: '#D4A017',
    description: 'Complete portable fire extinguisher services including supply, installation, refilling, annual servicing and pressure testing for all types and capacities.',
    points: ['ABC dry chemical powder extinguishers', 'CO2 extinguishers for electrical and server areas', 'Foam and water mist extinguishers', 'Wet chemical extinguishers for commercial kitchens', 'Annual servicing and IS pressure testing', 'Compliance with IS 2190 and IS 15683'],
  },
  'maintenance': {
    title: 'Maintenance & AMC', subtitle: 'Annual Maintenance Contracts', color: '#C41E3A',
    description: 'Structured annual maintenance contracts ensuring all fire protection systems remain fully operational, compliant and ready for immediate deployment.',
    points: ['Quarterly, bi-annual and annual inspection schedules', 'Hydrant and hose reel flow testing', 'Sprinkler head and alarm panel testing', 'Portable extinguisher servicing and refilling', 'Detailed service reports for compliance records', 'Fire NOC renewal support documentation'],
  },
  'engineering-compliance': {
    title: 'Engineering & Compliance', subtitle: 'Design, Documentation & NOC', color: '#D4A017',
    description: 'Professional fire protection engineering covering system design, drawing preparation, statutory approvals and compliance documentation for all facility types.',
    points: ['Fire protection system design drawings', 'NBC and IS compliance documentation', 'Fire NOC application support', 'Factory licence fire safety compliance', 'Risk assessment and gap analysis', 'Coordination with fire authority inspections'],
  },
  'fire-hydrant-systems': {
    title: 'Fire Hydrant Systems', subtitle: 'Water Distribution & Suppression', color: '#C41E3A',
    description: 'Pressurised water supply systems for active fire fighting, designed for industrial plants, warehouses, hospitals and large commercial buildings.',
    points: ['IS 3844 compliant system design', 'Pump sets with diesel backup', 'Yard hydrants and internal landing valves', 'Hose reels and fire hose cabinets', 'System commissioning and pressure testing', 'NOC support and documentation'],
  },
  'fire-alarm-systems': {
    title: 'Fire Alarm Systems', subtitle: 'Detection & Early Warning', color: '#FF6B35',
    description: 'Intelligent fire alarm and detection systems providing reliable early warning for all building types and occupancies.',
    points: ['Addressable and conventional systems', 'Smoke and heat detector selection per IS 2189', 'Manual call points and sounders', 'IS 2189 compliant installation', 'Integration with evacuation and BMS systems', 'Annual testing and compliance certification'],
  },
  'sprinkler-systems': {
    title: 'Sprinkler Systems', subtitle: 'Automatic Suppression', color: '#D4A017',
    description: 'Automatic sprinkler systems designed to detect and suppress fires at the earliest stage, protecting life and property before fire brigade arrival.',
    points: ['Wet pipe and dry pipe sprinkler systems', 'Pre-action systems for sensitive areas', 'IS 15105 compliant design', 'Sprinkler head selection per hazard classification', 'System commissioning and flow testing', 'Annual inspection and head replacement'],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.title} | Trinetra Fire Solutions`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) notFound();

  return (
    <div className="tfs-atm-full min-h-screen" style={{ paddingTop: 88 }}>
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: [
          `radial-gradient(ellipse 80% 50% at 50% 0%, ${service.color}18 0%, transparent 60%)`,
          'radial-gradient(ellipse 60% 40% at 80% 60%, rgba(212,160,23,0.07) 0%, transparent 55%)',
        ].join(', '),
      }}/>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: 'clamp(32px,5vw,64px) clamp(16px,4vw,48px) 80px' }}>
        <Link href="/services" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: 'rgba(245,240,232,0.38)', fontSize: '0.82rem',
          letterSpacing: '0.08em', textDecoration: 'none', marginBottom: 40,
          transition: 'color 0.2s',
        }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
            <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All Services
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{
            padding: '4px 12px', borderRadius: 20, fontSize: '0.70rem', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: service.color, border: `1px solid ${service.color}35`, background: `${service.color}14`,
          }}>{service.subtitle}</span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.5rem)',
          color: 'rgba(245,240,232,0.96)', lineHeight: 1.05,
          marginBottom: 24, letterSpacing: '-0.01em',
        }}>{service.title.toUpperCase()}</h1>

        <div style={{ height: 2, background: `linear-gradient(90deg, ${service.color}, transparent)`, marginBottom: 36 }}/>

        <p style={{ color: 'rgba(245,240,232,0.62)', fontSize: '1.08rem', lineHeight: 1.88, marginBottom: 48 }}>
          {service.description}
        </p>

        <div style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16, padding: 'clamp(24px,4vw,40px)', marginBottom: 48,
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '0.78rem', letterSpacing: '0.4em',
            textTransform: 'uppercase', color: service.color, marginBottom: 28,
          }}>What We Provide</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {service.points.map((point, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <span style={{ flexShrink: 0, width: 6, height: 6, borderRadius: '50%', background: service.color, marginTop: 8 }}/>
                <span style={{ color: 'rgba(245,240,232,0.68)', fontSize: '0.97rem', lineHeight: 1.65 }}>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/request-quote" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: service.color, color: '#fff',
            padding: '14px 32px', borderRadius: 8,
            fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none',
          }}>Get a Quote</Link>
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.05)', color: 'rgba(245,240,232,0.78)',
            border: '1px solid rgba(255,255,255,0.10)',
            padding: '14px 32px', borderRadius: 8,
            fontWeight: 500, fontSize: '0.92rem', textDecoration: 'none',
          }}>Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
