import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsClient from '@/components/products/ProductsClient';

export const metadata: Metadata = {
  title: 'Fire Protection Products',
  description: 'Fire extinguishers, hydrant equipment, sprinkler components, fire pumps, alarm & detection systems — supply of fire protection equipment in Hyderabad and Telangana.',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div style={{ paddingTop: 88, minHeight: '100vh', background: '#0A0608', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'rgba(245,240,232,0.3)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.15em' }}>LOADING PRODUCTS...</div>
      </div>
    }>
      <ProductsClient />
    </Suspense>
  );
}
