import type { Metadata } from 'next';
import Link from 'next/link';
import company from '@/config/company';

export const metadata: Metadata = {
  title: 'Annual Maintenance Contract (AMC)',
  description: 'Annual maintenance contracts for fire protection systems — fire hydrant, sprinkler, alarm, extinguishers and more. Keep your fire systems fully operational with Trinetra Fire Solutions.',
};

const systems = [
  'Fire Hydrant Systems',
  'Sprinkler Systems',
  'Fire Alarm Systems',
  'Fire Extinguishers',
  'Fire Pump Sets',
  'Emergency Lighting & Exit Signs',
  'Clean Agent Suppression Systems',
  'Kitchen Suppression Systems',
];

const amcIncludes = [
  { title: 'Scheduled Preventive Maintenance', desc: 'Regular visits as per IS/NBC schedules and manufacturer recommendations.' },
  { title: 'Functional Testing', desc: 'Testing of all system components to verify operational readiness.' },
  { title: 'Pressure Testing', desc: 'Hydraulic pressure tests for hydrant and sprinkler systems.' },
  { title: 'Alarm Testing', desc: 'End-to-end fire alarm system tests including panel, detectors, and sounders.' },
  { title: 'Extinguisher Refilling', desc: 'Refilling and recharging of portable fire extinguishers as required.' },
  { title: 'Defect Reporting', desc: 'Detailed service reports with findings and recommended remedial actions.' },
  { title: 'Priority Response', desc: 'Priority response for AMC clients during breakdowns or emergency calls.' },
  { title: 'Compliance Documentation', desc: 'Maintenance records for regulatory compliance and insurance requirements.' },
];

export default function AMCPage() {
  return (
    <div className="tfs-atm-medium tfs-grid-overlay pt-24 pb-32 min-h-screen">
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 radial-fire-bottom opacity-20 pointer-events-none" aria-hidden="true"/>
        <div className="container-trinetra relative text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-green-500/40"/>
            <span className="text-xs tracking-[0.5em] uppercase text-green-500/70 font-mono">Maintenance</span>
            <span className="h-px w-12 bg-green-500/40"/>
          </div>
          <h1 className="font-display text-cinematic-lg text-white mb-4">ANNUAL MAINTENANCE<br/><span style={{color:'#16A34A'}}>CONTRACTS</span></h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">A fire system that is not maintained is a liability. Our AMC programmes keep your fire protection systems operational, compliant and ready at all times.</p>
        </div>
      </section>

      <div className="container-trinetra space-y-20">
        {/* Systems covered */}
        <section aria-labelledby="systems-heading">
          <h2 id="systems-heading" className="font-display text-3xl text-white mb-8 text-center">SYSTEMS COVERED UNDER AMC</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {systems.map(s => (
              <div key={s} className="glass border border-white/[0.06] rounded-xl p-5 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500/60 flex-shrink-0"/>
                <span className="text-sm text-white/70">{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* AMC inclusions */}
        <section aria-labelledby="inclusions-heading">
          <h2 id="inclusions-heading" className="font-display text-3xl text-white mb-8 text-center">WHAT&rsquo;S INCLUDED</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {amcIncludes.map(item => (
              <div key={item.title} className="glass border border-white/[0.06] rounded-xl p-6 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                  <div className="text-white/50 text-xs leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass border border-white/[0.06] rounded-3xl p-12 text-center">
          <h2 className="font-display text-3xl text-white mb-4">GET AN AMC PROPOSAL</h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">Contact us with details of your facility and existing fire protection systems for a customised AMC proposal.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/request-quote" className="px-8 py-4 bg-fire-red text-white font-semibold text-sm rounded-xl btn-shadow-fire hover:bg-fire-red-light transition-colors">Request AMC Proposal</Link>
            <a href={company.whatsapp.amc()} target="_blank" rel="noopener noreferrer" className="px-8 py-4 glass border border-white/10 text-white/80 font-semibold text-sm rounded-xl hover:border-green-500/20 transition-colors">WhatsApp for AMC</a>
          </div>
        </div>
      </div>
    </div>
  );
}
