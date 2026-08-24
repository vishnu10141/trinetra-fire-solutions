import type { Metadata } from 'next';
import { Bebas_Neue, Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/page-theme.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import MobileContactBar from '@/components/layout/MobileContactBar';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/layout/PageTransition';
import company from '@/config/company';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: company.seo.defaultTitle,
    template: company.seo.titleTemplate,
  },
  description: company.seo.defaultDescription,
  keywords: [...company.seo.keywords],
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: company.name,
    title: company.seo.defaultTitle,
    description: company.seo.defaultDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: company.seo.defaultTitle,
    description: company.seo.defaultDescription,
  },
  verification: {},
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: { canonical: '/' },
  icons: {
    icon: '/brand/trinetra-logo.png',
    shortcut: '/brand/trinetra-logo.png',
    apple: '/brand/trinetra-logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#050505" />
        <meta name="color-scheme" content="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/#organization`,
              name: company.name,
              description: company.seo.defaultDescription,
              url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              telephone: company.contact.primaryPhone,
              email: company.contact.email,
              vatID: company.gst,
              address: {
                '@type': 'PostalAddress',
                streetAddress: `${company.address.line1}, ${company.address.line2}, ${company.address.area}`,
                addressLocality: `${company.address.locality}, ${company.address.city}`,
                addressRegion: company.address.state,
                postalCode: company.address.pincode,
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '17.4399',
                longitude: '78.5111',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  opens: '09:00',
                  closes: '19:00',
                },
              ],
              areaServed: [
                { '@type': 'City', name: 'Hyderabad' },
                { '@type': 'City', name: 'Secunderabad' },
                { '@type': 'State', name: 'Telangana' },
              ],
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="font-body bg-void text-warm-white antialiased">
        <CustomCursor />
        <Navigation />
        <PageTransition>
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </PageTransition>
        <MobileContactBar />
      </body>
    </html>
  );
}
