import type { Metadata } from 'next';
import Link from 'next/link';
import company from '@/config/company';

export const metadata: Metadata = {
  title: 'Fire Safety Audit',
  description: 'Professional fire safety audits to assess existing fire protection systems, identify deficiencies and ensure compliance with IS codes and NBC requirements.',
};

const auditScope = [
  'Review of existing fire protection system drawings and documentation',
  'Visual inspection of all fire hydrant, hose reel and valve installations',
  'Inspection of sprinkler heads, alarm valves and flow switches',
  'Fire alarm panel inspection and detector coverage assessment',
  'Portable fire extinguisher count, condition and placement review',
  'Fire pump set inspection and pressure testing assessment',
  'Emergency lighting and exit sign coverage review',
  'Access and egress route assessment',
  'Compliance assessment against IS codes and National Building Code (NBC)',
  'Detailed audit report with findings, risk grading and recommendations',
];

export default function FireAuditPage() {
  return (
    <div className="tfs-atm-medium tfs-grid-overlay pt-24 pb-32 min-h-screen">
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(124,58,237,0.12), transparent)' }} aria-hidden="true"/>
        <div className="container-trinetra relative text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-12" style={{ background: 'rgba(124,58,237,0.4)' }}/>
            <span className="text-xs tracking-[0.5em] uppercase font-mono" style={{ color: 'rgba(124,58,237,0.8)' }}>Compliance</span>
            <span className="h-px w-12" style={{ background: 'rgba(124,58,237,0.4)' }}/>
          </div>
          <h1 className="font-display text-cinematic-lg text-white mb-4">
            FIRE SAFETY<br/><span style={{ color: '#7C3AED' }}>AUDIT</span>
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
            A structured, independent assessment of your existing fire protection systems, infrastructure and procedures — identifying gaps before they become incidents.
          </p>
        </div>
      </section>

      <div className="container-trinetra space-y-20">
        {/* Why audit */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" aria-labelledby="why-audit-heading">
          <div>
            <h2 id="why-audit-heading" className="font-display text-3xl text-white mb-6">WHY CONDUCT A FIRE SAFETY AUDIT?</h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>Fire protection systems that are not regularly audited can degrade silently — components fail, coverage gaps develop and compliance standards are missed without anyone realising until an incident occurs.</p>
              <p>A fire safety audit provides an independent, objective assessment of your facility's fire protection status, identifying deficiencies and non-compliances before they become dangerous — or costly — problems.</p>
              <p>Regular audits also provide documentation for insurance purposes, regulatory compliance and due diligence for property transactions or business operations.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🛡️', title: 'Regulatory Compliance', desc: 'Verify alignment with IS codes and NBC' },
              { icon: '📋', title: 'Insurance Documentation', desc: 'Records for insurance and due diligence' },
              { icon: '🔍', title: 'Gap Identification', desc: 'Find deficiencies before incidents occur' },
              { icon: '📈', title: 'Risk Grading', desc: 'Prioritised remediation recommendations' },
            ].map(item => (
              <div key={item.title} className="glass border border-white/[0.06] rounded-xl p-5 text-center">
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                <div className="text-white/40 text-xs leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Audit scope */}
        <section aria-labelledby="scope-heading">
          <h2 id="scope-heading" className="font-display text-3xl text-white mb-8 text-center">AUDIT SCOPE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditScope.map((item, i) => (
              <div key={i} className="flex items-start gap-3 glass border border-white/[0.05] rounded-xl p-4">
                <span className="font-mono text-xs text-white/20 flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-white/60 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass border border-white/[0.06] rounded-3xl p-12 text-center">
          <h2 className="font-display text-3xl text-white mb-4">BOOK A FIRE SAFETY AUDIT</h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">Contact us to schedule a fire safety audit for your facility. Our team will assess your requirements and confirm scope and timeline.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/request-quote" className="px-8 py-4 bg-fire-red text-white font-semibold text-sm rounded-xl btn-shadow-fire hover:bg-fire-red-light transition-colors">Book Audit</Link>
            <a href={company.whatsapp.audit()} target="_blank" rel="noopener noreferrer" className="px-8 py-4 glass border border-white/10 text-white/80 font-semibold text-sm rounded-xl hover:border-fire-red/20 transition-colors">WhatsApp for Audit</a>
          </div>
        </div>
      </div>
    </div>
  );
}
