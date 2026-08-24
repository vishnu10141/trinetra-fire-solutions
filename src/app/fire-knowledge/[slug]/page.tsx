import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const ARTICLES: Record<string, {
  title: string; category: string; readTime: string; color: string; content: string[];
}> = {
  'fire-classes-india': {
    title: 'Classes of Fire in India', category: 'Fundamentals', readTime: '5 min read', color: '#C41E3A',
    content: [
      'Fire is classified into classes based on the type of fuel involved. Understanding fire classes is essential for selecting the right extinguishing agent and designing effective suppression systems.',
      'Class A fires involve ordinary combustibles: wood, paper, cloth, rubber and most plastics. Water, foam or dry chemical agents control these effectively.',
      'Class B fires involve flammable liquids — petrol, diesel, kerosene, paint and lubricating oil. CO2, dry chemical powder and foam agents are used.',
      'Class C fires involve flammable gases: LPG, CNG, hydrogen and methane. Dry chemical powder is common. Gas supply must be shut off before suppression.',
      'Class D fires involve combustible metals: magnesium, titanium, potassium, sodium. Special dry powder agents are required. Never use water.',
      'Class E fires involve energised electrical equipment. CO2 and clean agent systems are preferred. Power isolation is the primary strategy.',
      'Class F fires involve cooking oils and fats at high temperatures — found in commercial kitchens. Wet chemical agents are specifically designed for Class F.',
      'Indian Standards IS 2190 and the National Building Code (NBC) provide guidance on fire class identification, agent selection and system design requirements.',
      'Trinetra Fire Solutions designs suppression systems appropriate for the specific fire classes present in each facility, ensuring compliance and practical safety.',
    ],
  },
  'fire-extinguisher-types': {
    title: 'Types of Fire Extinguishers', category: 'Equipment', readTime: '6 min read', color: '#D4A017',
    content: [
      'Fire extinguishers are the first line of defence against small fires. Selecting the correct type for each environment is critical to effective control and occupant safety.',
      'ABC Dry Chemical Powder (DCP) extinguishers are the most versatile type used in India. Effective against Class A, B and C fires — suitable for most industrial, commercial and institutional settings.',
      'CO2 extinguishers use carbon dioxide under high pressure. Ideal for electrical equipment, server rooms, laboratories and sensitive electronics. They leave no residue and cause no secondary damage.',
      'Water mist extinguishers use ultra-fine droplets to cool and suppress Class A fires. Modern water mist also provides limited protection against Class B and electrically energised fires.',
      'Foam extinguishers create a blanket over flammable liquid surfaces, cutting off oxygen. Effective for Class A and B fires — petrol stations, storage areas and warehouses.',
      'Wet chemical extinguishers are formulated specifically for Class F fires in commercial cooking environments. They react with hot oil to form a soapy foam that cools and seals the surface.',
      'Clean agent extinguishers use gases like FM-200 or NOVEC 1230 — they extinguish fire without residue or damage. Used in data centres, archives and areas with irreplaceable equipment.',
      'All extinguishers in India must comply with IS 2171 and IS 15683 and must be serviced annually by a qualified fire protection company. Trinetra offers comprehensive AMC services covering all extinguisher types.',
    ],
  },
  'fire-hydrant-system-overview': {
    title: 'Fire Hydrant System Overview', category: 'Systems', readTime: '7 min read', color: '#C41E3A',
    content: [
      'A fire hydrant system is a network of pressurised water distribution pipework designed to supply water quickly to any point within a facility for active fire fighting.',
      'The system includes a dedicated water storage tank, pump sets (main pump, jockey pump and diesel backup), distribution mains, hose reels, landing valves and yard hydrant points.',
      'The jockey pump maintains system pressure during standby. When a valve is opened, pressure drops and the main fire pump activates automatically to supply the required flow.',
      'The diesel backup pump ensures fire water supply continues even during a power failure — a critical requirement for high-risk and essential-service facilities.',
      'Indian Standards IS 3844 and IS 1648 govern the design and installation of fire hydrant systems. The NBC prescribes requirements for building height, occupancy type and required flow rates.',
      'Yard hydrants installed at intervals around the building perimeter allow fire brigade vehicles to connect and draw water rapidly. Their correct spacing and accessibility is a key compliance factor.',
      'Trinetra Fire Solutions designs, supplies, installs and commissions complete fire hydrant systems. Our engineering team ensures systems comply with all IS standards and NBC requirements.',
    ],
  },
  'fire-sprinkler-system-overview': {
    title: 'Fire Sprinkler System Overview', category: 'Systems', readTime: '7 min read', color: '#D4A017',
    content: [
      'An automatic fire sprinkler system is one of the most effective passive fire suppression technologies available. When properly designed and installed, sprinklers control or suppress over 96% of fires at the earliest stage.',
      'A sprinkler head contains a glass bulb filled with glycerin-based liquid. When ambient temperature rises to the rated level (typically 68°C for standard red bulbs), the liquid expands, the bulb shatters and water is released.',
      'Only the sprinkler heads directly above the fire activate — localised water application minimises water damage compared to a full system discharge.',
      'Wet pipe systems keep the distribution piping permanently filled with pressurised water. The most common type for temperature-controlled environments such as offices, hospitals and hotels.',
      'Dry pipe systems keep piping filled with pressurised air or nitrogen. When a sprinkler activates, air pressure drops and water fills the pipes. Suitable for cold storage and freezer areas.',
      'Pre-action systems require both a detection event and a sprinkler head activation before water releases — used in data centres and archives to prevent accidental discharge.',
      'IS 15105 and the NBC provide design standards for sprinkler systems in India. Hazard classification, coverage area, water supply duration and system type are all determined by facility occupancy.',
    ],
  },
  'fire-alarm-system-guide': {
    title: 'Fire Alarm System Guide', category: 'Detection', readTime: '6 min read', color: '#FF6B35',
    content: [
      'A fire alarm system provides early detection, alerts building occupants and initiates emergency response. Early warning is the most powerful single factor in fire survival outcomes.',
      'The Fire Alarm Control Panel (FACP) is the system hub. It receives signals from detectors, initiates alarms, controls other fire safety systems and provides continuous fault monitoring.',
      'Smoke detectors sense combustion products. Ionisation detectors respond quickly to fast-flaming fires. Photoelectric detectors excel with slow-smouldering fires. Multi-sensor detectors combine both.',
      'Heat detectors respond to temperature rise. Fixed temperature types activate at a set temperature. Rate-of-rise types respond to rapid increases — suited for dusty or steamy environments.',
      'Manual call points allow any person who discovers a fire to immediately activate the alarm. They must be located at exit routes and accessible at all times.',
      'Sounders, strobe lights and voice evacuation systems ensure all occupants are alerted. Visual alarms are essential for hearing-impaired occupants.',
      'IS 2189 governs fire detection and alarm systems in India. Addressable systems allow each device to be individually identified, making fault-finding, maintenance and zone management far more efficient.',
    ],
  },
  'fire-safety-audit-guide': {
    title: 'Fire Safety Audit Guide', category: 'Compliance', readTime: '8 min read', color: '#C41E3A',
    content: [
      'A fire safety audit is a systematic evaluation of a facility to assess the adequacy of fire prevention measures, protection systems, emergency procedures and overall regulatory compliance.',
      'The audit examines physical fire hazards: storage of combustibles, electrical installations, housekeeping practices and process-specific hazards unique to the facility type.',
      'All fire suppression and detection systems are inspected and tested — hydrant systems, sprinkler systems, alarm panels, portable extinguishers and emergency lighting.',
      'The audit verifies compliance with the National Building Code (NBC), relevant Indian Standards, local fire safety regulations and any industry-specific codes applicable to the facility.',
      'Emergency preparedness is reviewed: evacuation plans, fire drill records, emergency contact procedures, training records and availability of fire wardens and first-aiders.',
      'The audit report provides a gap analysis identifying deficiencies against applicable standards, with prioritised recommendations for rectification.',
      'Trinetra Fire Solutions conducts professional fire safety audits for industrial, commercial and institutional clients across Telangana and Andhra Pradesh. Our reports provide actionable compliance roadmaps.',
    ],
  },
  'amc-importance': {
    title: 'Why Annual Maintenance Contracts Matter', category: 'Maintenance', readTime: '5 min read', color: '#D4A017',
    content: [
      'Fire protection systems are passive safety investments. Rarely operated during normal business conditions, their reliability is unknown until critically needed — which is precisely why regular maintenance is non-negotiable.',
      'An Annual Maintenance Contract (AMC) ensures all fire protection systems are inspected, tested and serviced on a defined schedule throughout the year.',
      'A typical AMC schedule includes quarterly extinguisher inspections and visual system checks, bi-annual hydrant and hose reel flow tests, and annual comprehensive testing of all systems including pump sets and alarm panels.',
      'A properly maintained fire system significantly extends equipment service life, reducing capital expenditure on early replacements. AMC cost is a fraction of the cost of a system that fails during an emergency.',
      'Most fire insurance policies in India require evidence of maintained fire protection systems. A lapsed AMC can result in claim rejection following a fire loss event.',
      'The Fire Services Department in Hyderabad and most local authorities require valid maintenance records as part of the annual fire NOC (No Objection Certificate) renewal process.',
      'Trinetra Fire Solutions offers comprehensive AMC programs tailored to each facility. Our qualified engineers conduct scheduled visits, provide detailed service reports and manage regulatory compliance on your behalf.',
    ],
  },
  'nbc-is-compliance': {
    title: 'NBC and IS Compliance for Fire Safety', category: 'Compliance', readTime: '8 min read', color: '#FF6B35',
    content: [
      'Fire safety in India is governed by the National Building Code (NBC 2016), Bureau of Indian Standards (BIS) codes, state fire service acts and local municipal regulations.',
      'The NBC provides comprehensive requirements for fire safety design: occupancy classification, means of escape, fire compartmentation, detection, alarm and suppression system specifications.',
      'Key IS standards include IS 2190 (portable extinguishers), IS 3844 (hydrant systems), IS 15105 (sprinklers), IS 2189 (detection and alarm systems) and IS 1648 (building fire requirements).',
      'Fire NOC (No Objection Certificate) is required from the fire authority for new construction, change of use and annual renewal. NOC is issued only when systems meet required standards.',
      'Factory Licence requirements under the Factories Act 1948 include fire safety provisions. Pharmaceutical and chemical facilities have additional requirements from CDSCO and Pollution Control Boards.',
      'Non-compliance exposes facility owners to legal liability, insurance claim rejection, criminal prosecution following any fire-related casualty, and forced closure by regulatory authorities.',
      'Trinetra Fire Solutions provides complete NBC and IS compliance engineering — from initial design documentation and drawing preparation through installation, commissioning and NOC application support.',
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} | Trinetra Fire Knowledge`,
    description: article.content[0],
  };
}

export default async function KnowledgeArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  return (
    <div className="tfs-atm-minimal min-h-screen" style={{ paddingTop: 88 }}>
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(196,30,58,0.10) 0%, transparent 60%)',
      }}/>

      <article style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: 'clamp(32px,5vw,64px) clamp(16px,4vw,48px) 80px' }}>
        <Link href="/fire-knowledge" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: 'rgba(245,240,232,0.40)', fontSize: '0.82rem',
          letterSpacing: '0.08em', textDecoration: 'none', marginBottom: 40,
          transition: 'color 0.2s',
        }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
            <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Fire Knowledge
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{
            padding: '4px 12px', borderRadius: 20, fontSize: '0.70rem', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: article.color, border: `1px solid ${article.color}30`, background: `${article.color}12`,
          }}>{article.category}</span>
          <span style={{ color: 'rgba(245,240,232,0.28)', fontSize: '0.78rem' }}>{article.readTime}</span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)',
          color: 'rgba(245,240,232,0.96)', lineHeight: 1.1,
          marginBottom: 36, letterSpacing: '-0.01em',
        }}>{article.title.toUpperCase()}</h1>

        <div style={{ height: 1, background: `linear-gradient(90deg, ${article.color}60, transparent)`, marginBottom: 40 }}/>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {article.content.map((para, i) => (
            <p key={i} style={{
              color: i === 0 ? 'rgba(245,240,232,0.80)' : 'rgba(245,240,232,0.54)',
              fontSize: i === 0 ? '1.05rem' : '0.97rem',
              lineHeight: 1.88, fontWeight: i === 0 ? 400 : 300,
            }}>{para}</p>
          ))}
        </div>

        <div style={{
          marginTop: 64, padding: '32px 36px',
          background: 'rgba(196,30,58,0.07)', border: '1px solid rgba(196,30,58,0.18)', borderRadius: 16,
        }}>
          <p style={{ color: 'rgba(245,240,232,0.88)', fontSize: '1rem', fontWeight: 500, marginBottom: 8 }}>
            Need professional fire protection for your facility?
          </p>
          <p style={{ color: 'rgba(245,240,232,0.44)', fontSize: '0.88rem', marginBottom: 24 }}>
            Trinetra Fire Solutions provides expert engineering, installation and maintenance across Telangana.
          </p>
          <Link href="/request-quote" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#C41E3A', color: '#fff',
            padding: '12px 28px', borderRadius: 8,
            fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
          }}>Get a Free Quote</Link>
        </div>
      </article>
    </div>
  );
}
