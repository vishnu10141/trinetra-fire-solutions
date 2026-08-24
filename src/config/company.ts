// SINGLE SOURCE OF TRUTH — All Trinetra Fire Solutions business information
// Import this file wherever company information is needed. Never hardcode these values.

export const companyConfig = {
  name: 'Trinetra Fire Solutions',
  tagline: 'Predict. Prevent. Protect.',
  shortTagline: 'Predict. Prevent. Protect.',
  category: 'Fire Protection Engineering',
  industry: 'Fire Protection & Life Safety',
  gst: '36AEIPV1600H1ZL',
  founded: 2026,
  domain: 'trinetrafiresolutions.com', // Update with confirmed domain

  founder: {
    name: 'Nimmakayala Venkatesh',
    shortName: 'N. Venkatesh',
    role: 'Founder',
    company: 'Trinetra Fire Solutions',
    background: 'Approximately 30 years of service in the Indian Army as Subedar / Junior Commissioned Officer (JCO)',
    service: '~30 Years',
    serviceBranch: 'Indian Army',
    serviceRank: 'Subedar / JCO',
  },

  address: {
    line1: 'Plot No. 96',
    line2: 'House No. 3-35-356',
    area: 'Sanjeevaiah Nagar',
    locality: 'East Marredpally',
    city: 'Secunderabad',
    state: 'Telangana',
    pincode: '500026',
    country: 'India',
    compact: 'Plot No. 96, H.No. 3-35-356, Sanjeevaiah Nagar, East Marredpally, Secunderabad, Telangana – 500026, India',
    full: 'Plot No. 96\nHouse No. 3-35-356\nSanjeevaiah Nagar\nEast Marredpally\nSecunderabad\nTelangana\nIndia – 500026',
  },

  contact: {
    primaryPhone: '+91 8332927131',
    primaryPhoneRaw: '918332927131',
    primaryPhoneTel: 'tel:+918332927131',
    secondaryPhone: '+91 7989813869',
    secondaryPhoneRaw: '917989813869',
    secondaryPhoneTel: 'tel:+917989813869',
    whatsapp: '+91 7989813869',
    whatsappNumber: '917989813869',
    email: 'trinetrafiresolutions@gmail.com',
    emailHref: 'mailto:trinetrafiresolutions@gmail.com',
  },

  support: {
    customerSupport: '24×7',
    emergencyAssistance: '24×7',
    description: 'Customer support and emergency assistance available 24×7',
  },

  // WhatsApp message generators — centralized encoding
  whatsapp: {
    base: 'https://wa.me/917989813869',
    generic(customText?: string): string {
      const msg = customText || 
        `Hello Trinetra Fire Solutions,\n\nI am contacting you through the official website.\n\nName:\nCompany:\nLocation:\nRequirement:\n\nPlease contact me regarding my fire protection requirement.`;
      return `https://wa.me/917989813869?text=${encodeURIComponent(msg)}`;
    },
    quote(productName?: string): string {
      const msg = `Hello Trinetra Fire Solutions,\n\nI would like to request a quotation.\n\nProduct/Service: ${productName || ''}\nName:\nCompany:\nLocation:\nRequirement:\n\nPlease contact me at your earliest convenience.`;
      return `https://wa.me/917989813869?text=${encodeURIComponent(msg)}`;
    },
    inspection(): string {
      const msg = `Hello Trinetra Fire Solutions,\n\nI would like to request a site inspection.\n\nName:\nCompany:\nFacility Type:\nLocation:\nPreferred Date:\n\nPlease contact me to schedule the inspection.`;
      return `https://wa.me/917989813869?text=${encodeURIComponent(msg)}`;
    },
    audit(): string {
      const msg = `Hello Trinetra Fire Solutions,\n\nI would like to book a Fire Safety Audit.\n\nName:\nCompany:\nFacility Type:\nLocation:\n\nPlease contact me to schedule the audit.`;
      return `https://wa.me/917989813869?text=${encodeURIComponent(msg)}`;
    },
    amc(): string {
      const msg = `Hello Trinetra Fire Solutions,\n\nI am interested in an Annual Maintenance Contract (AMC).\n\nName:\nCompany:\nLocation:\nEquipment/Systems:\n\nPlease send me an AMC proposal.`;
      return `https://wa.me/917989813869?text=${encodeURIComponent(msg)}`;
    },
    productEnquiry(product: string, quantity?: string): string {
      const msg = `TRINETRA FIRE SOLUTIONS\nPRODUCT ENQUIRY\n\nProduct: ${product}\nQuantity: ${quantity || ''}\nName:\nCompany:\nMobile:\nLocation:\nRequirement:\n\nSource: Official Trinetra Website`;
      return `https://wa.me/917989813869?text=${encodeURIComponent(msg)}`;
    },
  },

  socials: {
    // Add when profiles are created
    linkedin: '',
    facebook: '',
    instagram: '',
    youtube: '',
  },

  businessHours: {
    weekdays: 'Monday – Saturday',
    hours: '9:00 AM – 7:00 PM',
    emergency: '24×7',
    note: 'Emergency support available round the clock',
  },

  seo: {
    defaultTitle: 'Trinetra Fire Solutions — Predict. Prevent. Protect.',
    titleTemplate: '%s | Trinetra Fire Solutions',
    defaultDescription: 'Professional fire protection engineering company in Secunderabad, Telangana. Fire hydrant systems, sprinkler systems, fire alarm systems, extinguishers, AMC, safety audits and inspections.',
    keywords: [
      'fire protection company Hyderabad',
      'fire protection company Secunderabad',
      'fire extinguisher supplier Hyderabad',
      'fire hydrant system Hyderabad',
      'fire sprinkler system Hyderabad',
      'fire alarm system Hyderabad',
      'fire safety audit Hyderabad',
      'fire AMC Hyderabad',
      'fire protection engineering Telangana',
      'industrial fire protection Hyderabad',
      'commercial fire safety Hyderabad',
      'fire pump system',
      'Trinetra Fire Solutions',
    ],
  },
} as const;

export type CompanyConfig = typeof companyConfig;

export default companyConfig;

