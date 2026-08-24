import type { Metadata } from 'next';
import Link from 'next/link';
import company from '@/config/company';
import { industries } from '@/data/industries';

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description: 'Fire protection engineering for pharmaceutical, manufacturing, healthcare, commercial, hospitality, warehouse, educational, IT parks, residential and government sectors.',
};

export default function IndustriesPage() {
  return (
    <div className="tfs-atm-medium tfs-grid-overlay pt-24 pb-32 min-h-screen">
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 radial-fire-bottom opacity-20 pointer-events-none" aria-hidden="true"/>
        <div className="container-trinetra relative text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-gold/40"/>
            <span className="text-xs tracking-[0.5em] uppercase text-gold/70 font-mono">Sectors</span>
            <span className="h-px w-12 bg-gold/40"/>
          </div>
          <h1 className="font-display text-cinematic-lg text-white mb-4">
            INDUSTRIES<br/><span className="gold-shine">WE SERVE</span>
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
            Fire protection requirements differ by facility type, occupancy and hazard profile. We engineer solutions that address the specific risks of your industry.
          </p>
        </div>
      </section>

      <div className="container-trinetra">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group relative glass border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-400 hover:-translate-y-1 hover:shadow-2xl"
              style={{ '--hover-color': industry.accentColor } as React.CSSProperties}
            >
              {/* Accent top bar */}
              <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: industry.accentColor }} aria-hidden="true"/>

              <div className="p-7">
                <div className="text-xs font-mono tracking-widest mb-4 opacity-40" style={{ color: industry.accentColor }}>
                  #{String(industry.priority).padStart(2, '0')}
                </div>
                <h2 className="font-display text-2xl text-white mb-3 group-hover:text-opacity-90 transition-colors">
                  {industry.name.toUpperCase()}
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{industry.shortDescription}</p>

                {/* Fire risks */}
                <div className="mb-5">
                  <div className="text-[10px] tracking-widest text-white/25 uppercase mb-2">Key Fire Risks</div>
                  <div className="flex flex-wrap gap-1.5">
                    {industry.fireRisks.slice(0, 3).map(risk => (
                      <span key={risk} className="px-2 py-1 rounded-md text-[10px] text-white/40 border border-white/[0.06] bg-white/[0.02]">
                        {risk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold transition-colors duration-300" style={{ color: `${industry.accentColor}80` }}>
                  <span className="group-hover:opacity-100 opacity-70 transition-opacity">View solutions</span>
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Enquiry panel */}
        <div className="mt-20 glass border border-white/[0.06] rounded-3xl p-12 text-center">
          <h2 className="font-display text-3xl text-white mb-4">DON&apos;T SEE YOUR INDUSTRY?</h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">We serve all facility types. Contact us to discuss your specific fire protection requirements.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-fire-red text-white font-semibold text-sm rounded-xl btn-shadow-fire hover:bg-fire-red-light transition-colors">Contact Us</Link>
            <a href={company.whatsapp.generic()} target="_blank" rel="noopener noreferrer" className="px-8 py-4 glass border border-white/10 text-white/80 font-semibold text-sm rounded-xl hover:border-fire-red/20 transition-colors">WhatsApp Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
