export interface Industry {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  fireRisks: string[];
  relevantServices: string[];
  accentColor: string;
  priority: number;
}

export const industries: Industry[] = [
  {
    id: 'pharmaceutical',
    slug: 'pharmaceutical',
    name: 'Pharmaceutical Industries',
    shortName: 'Pharmaceutical',
    description: 'Pharmaceutical manufacturing and storage facilities present specific fire risks associated with flammable solvents, chemical processes and temperature-sensitive materials requiring specialist fire protection engineering.',
    shortDescription: 'Fire protection for pharma manufacturing, storage and research facilities.',
    icon: 'flask-conical',
    image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fireRisks: ['Flammable solvent storage', 'Chemical process areas', 'Clean room protection', 'Warehouse and cold storage'],
    relevantServices: ['fire-hydrant-systems', 'fire-sprinkler-systems', 'fire-alarm-systems', 'fire-safety-audits', 'annual-maintenance-contracts'],
    accentColor: '#7C3AED',
    priority: 1,
  },
  {
    id: 'manufacturing',
    slug: 'manufacturing',
    name: 'Manufacturing Industries',
    shortName: 'Manufacturing',
    description: 'Manufacturing facilities contain diverse fire hazards including machinery, electrical systems, flammable materials and storage areas requiring comprehensive fire protection across all zones.',
    shortDescription: 'Fire protection for factories, process plants and manufacturing facilities.',
    icon: 'factory',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fireRisks: ['Process equipment and machinery', 'Raw material and finished goods storage', 'Electrical systems', 'Flammable material handling'],
    relevantServices: ['fire-hydrant-systems', 'fire-sprinkler-systems', 'fire-alarm-systems', 'fire-pump-systems', 'fire-safety-audits'],
    accentColor: '#EA580C',
    priority: 2,
  },
  {
    id: 'healthcare',
    slug: 'healthcare',
    name: 'Hospitals & Healthcare',
    shortName: 'Healthcare',
    description: 'Healthcare facilities require life-safety focused fire protection addressing patient evacuation requirements, medical gas systems and protection of critical equipment.',
    shortDescription: 'Life-safety focused fire protection for hospitals and healthcare facilities.',
    icon: 'heart-pulse',
    image: 'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fireRisks: ['Patient evacuation complexity', 'Medical gas systems', 'Electrical and data systems', 'Kitchen and laundry areas'],
    relevantServices: ['fire-alarm-systems', 'fire-detection-systems', 'fire-hydrant-systems', 'portable-fire-extinguishers', 'fire-safety-audits'],
    accentColor: '#DC2626',
    priority: 3,
  },
  {
    id: 'commercial',
    slug: 'commercial',
    name: 'Commercial Buildings',
    shortName: 'Commercial',
    description: 'Commercial buildings including office complexes and mixed-use developments require integrated fire protection covering all occupancies, common areas and car parking.',
    shortDescription: 'Integrated fire protection for offices, retail and mixed-use buildings.',
    icon: 'building-2',
    image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fireRisks: ['High occupancy areas', 'Electrical systems and data rooms', 'Kitchen areas', 'Parking structures'],
    relevantServices: ['fire-alarm-systems', 'fire-sprinkler-systems', 'fire-hydrant-systems', 'portable-fire-extinguishers', 'annual-maintenance-contracts'],
    accentColor: '#0891B2',
    priority: 4,
  },
  {
    id: 'hospitality',
    slug: 'hospitality',
    name: 'Hotels & Hospitality',
    shortName: 'Hospitality',
    description: 'Hotels require fire protection addressing guest room coverage, kitchen hazards, high-rise protection and systems that operate with minimal disruption to guests.',
    shortDescription: 'Fire protection for hotels, resorts and hospitality facilities.',
    icon: 'hotel',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fireRisks: ['Kitchen fire hazards', 'Guest room coverage', 'High-rise protection', 'Banquet and event areas'],
    relevantServices: ['fire-sprinkler-systems', 'fire-alarm-systems', 'fire-hydrant-systems', 'portable-fire-extinguishers', 'annual-maintenance-contracts'],
    accentColor: '#D4A017',
    priority: 5,
  },
  {
    id: 'warehouses',
    slug: 'warehouses',
    name: 'Warehouses & Logistics',
    shortName: 'Warehouses',
    description: 'Warehouses present significant fire challenges from high rack storage, large open areas and diverse commodities. Sprinkler and hydrant systems are the primary protection approach.',
    shortDescription: 'Sprinkler and hydrant systems for warehouses and logistics facilities.',
    icon: 'warehouse',
    image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fireRisks: ['High rack storage fire propagation', 'Large open areas', 'Diverse commodity storage', 'Loading dock areas'],
    relevantServices: ['fire-sprinkler-systems', 'fire-hydrant-systems', 'fire-pump-systems', 'fire-alarm-systems'],
    accentColor: '#16A34A',
    priority: 6,
  },
  {
    id: 'educational',
    slug: 'educational',
    name: 'Educational Institutions',
    shortName: 'Educational',
    description: 'Schools, colleges and universities require fire protection appropriate for high occupancy, varied facility types and the specific life-safety requirements for student populations.',
    shortDescription: 'Fire protection for schools, colleges and university facilities.',
    icon: 'graduation-cap',
    image: 'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fireRisks: ['High student occupancy', 'Laboratory hazards', 'Kitchen and canteen areas', 'Library and document storage'],
    relevantServices: ['fire-alarm-systems', 'portable-fire-extinguishers', 'fire-hydrant-systems', 'fire-safety-audits'],
    accentColor: '#0891B2',
    priority: 7,
  },
  {
    id: 'it-parks',
    slug: 'it-parks',
    name: 'IT Parks & Data Centres',
    shortName: 'IT Parks',
    description: 'IT parks and data centres require precision fire protection addressing high-value electronic equipment, continuous uptime requirements and high-density electrical installations.',
    shortDescription: 'Clean agent and precision fire protection for IT and data centre environments.',
    icon: 'server',
    image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fireRisks: ['High-density electrical systems', 'Server room and data storage', 'Continuous uptime requirements', 'Cable management areas'],
    relevantServices: ['fire-alarm-systems', 'fire-detection-systems', 'fire-safety-audits'],
    accentColor: '#1E40AF',
    priority: 8,
  },
  {
    id: 'residential',
    slug: 'residential',
    name: 'Residential Apartments',
    shortName: 'Residential',
    description: 'Residential apartment buildings require fire protection systems covering common areas, stairwells, parking and individual flats, ensuring life safety for all residents.',
    shortDescription: 'Life-safety fire protection for residential apartments and housing complexes.',
    icon: 'home',
    image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fireRisks: ['Common area and stairwell protection', 'Kitchen fire hazards', 'Parking area protection', 'High-rise evacuation'],
    relevantServices: ['fire-hydrant-systems', 'fire-alarm-systems', 'portable-fire-extinguishers', 'annual-maintenance-contracts'],
    accentColor: '#16A34A',
    priority: 9,
  },
  {
    id: 'government',
    slug: 'government',
    name: 'Government Buildings',
    shortName: 'Government',
    description: 'Government offices and public buildings require code-compliant fire protection that protects public servants and visitors and safeguards documents and records.',
    shortDescription: 'Code-compliant fire protection for government offices and public buildings.',
    icon: 'landmark',
    image: 'https://images.pexels.com/photos/1098922/pexels-photo-1098922.jpeg?auto=compress&cs=tinysrgb&w=1200',
    fireRisks: ['Document and record storage', 'High public occupancy', 'Electrical and server rooms', 'Heritage building constraints'],
    relevantServices: ['fire-alarm-systems', 'fire-hydrant-systems', 'portable-fire-extinguishers', 'fire-safety-audits'],
    accentColor: '#1E40AF',
    priority: 10,
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find(i => i.slug === slug);
}

export const featuredIndustries = industries.filter(i => i.priority <= 6);
