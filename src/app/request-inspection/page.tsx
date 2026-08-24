'use client';
import { useState, useId } from 'react';
import Link from 'next/link';
import company from '@/config/company';

interface FormState {
  fullName: string; companyName: string; mobile: string; email: string;
  projectLocation: string; city: string; facilityType: string; preferredDate: string; notes: string;
}
type Status = 'idle' | 'loading' | 'success' | 'error';

export default function RequestInspectionPage() {
  const id = useId();
  const [form, setForm] = useState<FormState>({ fullName: '', companyName: '', mobile: '', email: '', projectLocation: '', city: '', facilityType: '', preferredDate: '', notes: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [ref, setRef] = useState('');
  const [err, setErr] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading'); setErr('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: form.fullName, companyName: form.companyName, mobile: form.mobile, email: form.email, projectLocation: form.projectLocation, city: form.city, serviceRequired: 'Site Inspection', projectDescription: `Facility Type: ${form.facilityType}\nPreferred Date: ${form.preferredDate}\nNotes: ${form.notes}`, sourcePage: 'request-inspection' }),
      });
      const data = await res.json();
      if (data.success) { setRef(data.referenceNumber); setStatus('success'); }
      else { setErr(data.error || 'Submission failed.'); setStatus('error'); }
    } catch { setErr('Unable to submit. Please call us directly.'); setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div className="tfs-atm-medium tfs-grid-overlay pt-24 pb-32 min-h-screen flex items-center">
        <div className="container-trinetra text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full glass-fire border border-fire-red/20 flex items-center justify-center mx-auto mb-8">
            <svg className="w-8 h-8 text-fire-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h1 className="font-display text-4xl text-white mb-4">INSPECTION REQUESTED</h1>
          <p className="text-white/60 mb-6">Our team will contact you to confirm the inspection date and details.</p>
          <div className="glass-fire border border-fire-red/15 rounded-xl px-8 py-5 mb-8 inline-block">
            <div className="text-xs text-white/30 tracking-widest uppercase mb-2">Reference Number</div>
            <div className="font-mono text-2xl text-fire-red tracking-wider">{ref}</div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="px-7 py-3.5 bg-fire-red text-white text-sm font-semibold rounded-xl btn-shadow-fire hover:bg-fire-red-light transition-colors">Back to Home</Link>
            <a href={company.whatsapp.inspection()} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 glass border border-white/10 text-white text-sm font-semibold rounded-xl hover:border-fire-red/20 transition-colors">Follow up on WhatsApp</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tfs-atm-medium tfs-grid-overlay pt-24 pb-32 min-h-screen">
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 radial-fire-bottom opacity-20 pointer-events-none" aria-hidden="true"/>
        <div className="container-trinetra relative text-center">
          <h1 className="font-display text-cinematic-md text-white mb-4">REQUEST A<br/><span className="text-fire-red">SITE INSPECTION</span></h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">Our team will visit your facility, assess your fire protection requirements and provide recommendations and a quotation.</p>
        </div>
      </section>

      <div className="container-trinetra">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={onSubmit} className="glass border border-white/[0.06] rounded-3xl p-8 md:p-12 space-y-5" noValidate>
            <h2 className="font-display text-xl text-white pb-3 border-b border-white/[0.05]">YOUR DETAILS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-fullName`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Full Name <span className="text-fire-red">*</span></label>
                <input id={`${id}-fullName`} name="fullName" type="text" value={form.fullName} onChange={onChange} required className="form-input" placeholder="Your full name"/>
              </div>
              <div>
                <label htmlFor={`${id}-companyName`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Company</label>
                <input id={`${id}-companyName`} name="companyName" type="text" value={form.companyName} onChange={onChange} className="form-input" placeholder="Company (optional)"/>
              </div>
              <div>
                <label htmlFor={`${id}-facilityType`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Facility Type</label>
                <select id={`${id}-facilityType`} name="facilityType" value={form.facilityType} onChange={onChange} className="form-input">
                  <option value="">Select type...</option>
                  {['Manufacturing Plant', 'Pharmaceutical Facility', 'Hospital / Healthcare', 'Office Building', 'Warehouse / Logistics', 'Hotel / Hospitality', 'Educational Institution', 'Residential Apartment', 'Government Building', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor={`${id}-mobile`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Mobile <span className="text-fire-red">*</span></label>
                <input id={`${id}-mobile`} name="mobile" type="tel" value={form.mobile} onChange={onChange} required className="form-input" placeholder="+91 98765 43210"/>
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Email <span className="text-fire-red">*</span></label>
                <input id={`${id}-email`} name="email" type="email" value={form.email} onChange={onChange} required className="form-input" placeholder="your@email.com"/>
              </div>
              <div>
                <label htmlFor={`${id}-projectLocation`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Facility Address</label>
                <input id={`${id}-projectLocation`} name="projectLocation" type="text" value={form.projectLocation} onChange={onChange} className="form-input" placeholder="Facility location"/>
              </div>
              <div>
                <label htmlFor={`${id}-city`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">City</label>
                <input id={`${id}-city`} name="city" type="text" value={form.city} onChange={onChange} className="form-input" placeholder="City"/>
              </div>
              <div>
                <label htmlFor={`${id}-preferredDate`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Preferred Date</label>
                <input id={`${id}-preferredDate`} name="preferredDate" type="date" value={form.preferredDate} onChange={onChange} className="form-input"/>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-notes`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Additional Notes</label>
                <textarea id={`${id}-notes`} name="notes" value={form.notes} onChange={onChange} rows={4} className="form-input resize-none" placeholder="Describe your facility, existing fire systems and any specific concerns..."/>
              </div>
            </div>

            {status === 'error' && <div className="glass-fire border border-fire-red/20 rounded-xl p-4 text-fire-red text-sm" role="alert">{err}</div>}

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button type="submit" id="submit-inspection-btn" disabled={status === 'loading'} className="flex-1 py-4 bg-fire-red text-white font-bold text-sm rounded-xl btn-shadow-fire hover:bg-fire-red-light transition-all disabled:opacity-60">
                {status === 'loading' ? 'Submitting...' : 'Request Site Inspection'}
              </button>
              <a href={company.whatsapp.inspection()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-4 btn-whatsapp rounded-xl text-sm font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.847L.044 24l6.324-1.653A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.938 0-3.754-.524-5.31-1.435l-.383-.226-3.752.981.999-3.655-.248-.396A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Or WhatsApp
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
