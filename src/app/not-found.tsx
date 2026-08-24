import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found — 404',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 radial-fire-bottom opacity-20 pointer-events-none" aria-hidden="true"/>
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true"/>

      <div className="container-trinetra relative text-center py-32">
        {/* Extinguished ember visual */}
        <div className="relative inline-block mb-12">
          <div className="font-display text-[14rem] leading-none" style={{ color: '#1a1a1a', textShadow: '0 0 80px rgba(196,30,58,0.1)' }}>
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="w-32 h-32 rounded-full border border-fire-red/10 flex items-center justify-center">
              <svg className="w-16 h-16 text-fire-red/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-fire-red/30"/>
          <span className="text-xs tracking-[0.5em] uppercase text-fire-red/50 font-mono">Page Not Found</span>
          <span className="h-px w-8 bg-fire-red/30"/>
        </div>

        <h1 className="font-display text-5xl text-white mb-4">THE FIRE HAS GONE OUT</h1>
        <p className="text-white/50 text-lg mb-12 max-w-md mx-auto leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved. Let&rsquo;s get you back on track.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="px-8 py-4 bg-fire-red text-white font-semibold text-sm rounded-xl btn-shadow-fire hover:bg-fire-red-light transition-colors">
            Return Home
          </Link>
          <Link href="/services" className="px-8 py-4 glass border border-white/[0.08] text-white/80 font-semibold text-sm rounded-xl hover:border-fire-red/20 transition-colors">
            Our Services
          </Link>
          <Link href="/contact" className="px-8 py-4 glass border border-white/[0.08] text-white/80 font-semibold text-sm rounded-xl hover:border-fire-red/20 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
