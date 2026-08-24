export interface EnquiryFormData {
  fullName: string;
  companyName?: string;
  designation?: string;
  email: string;
  mobile: string;
  projectLocation?: string;
  city?: string;
  serviceRequired?: string;
  productRequired?: string;
  projectDescription?: string;
  sourcePage?: string;
  sourceProduct?: string;
}

export interface EnquiryResponse {
  success: boolean;
  referenceNumber?: string;
  message: string;
  error?: string;
}

export type EnquiryStatus = 'PENDING' | 'REVIEWING' | 'QUOTED' | 'WON' | 'LOST' | 'CANCELLED';

export interface QuoteDrawerProduct {
  id: string;
  name: string;
  category: string;
  image?: string;
}

export type PerformanceTier = 'high' | 'medium' | 'low';

export type NavigationState = 'hidden' | 'transparent' | 'scrolled';

export interface FireTriangleState {
  heat: boolean;
  fuel: boolean;
  oxygen: boolean;
}

export interface SelectorStep {
  id: string;
  question: string;
  options: SelectorOption[];
}

export interface SelectorOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface SelectorResult {
  services: string[];
  products: string[];
  recommendation: string;
  cta: string;
}
