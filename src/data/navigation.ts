export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Navigation order: Home → About → Knowledge → Products → Services
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Knowledge', href: '/fire-knowledge' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Fire Extinguishers',    href: '/products?category=fire-extinguishers' },
      { label: 'Hydrant Equipment',     href: '/products?category=hydrant-equipment' },
      { label: 'Sprinkler Components',  href: '/products?category=sprinkler-system-components' },
      { label: 'Fire Pumps',            href: '/products?category=fire-pump-equipment' },
      { label: 'Fire Alarm & Detection',href: '/products?category=fire-alarm-detection' },
      { label: 'Safety Equipment',      href: '/products?category=safety-equipment' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Fire Protection Systems',   href: '/services#fire-protection-systems' },
      { label: 'Fire Detection & Alarm',    href: '/services#fire-detection-alarm' },
      { label: 'Extinguisher Services',     href: '/services#extinguisher-services' },
      { label: 'Maintenance & AMC',         href: '/services#maintenance' },
      { label: 'Engineering & Compliance',  href: '/services#engineering-compliance' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export const primaryCTA = { label: 'Get a Quote', href: '/request-quote' };
