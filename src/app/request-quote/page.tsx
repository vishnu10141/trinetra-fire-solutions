'use client';
import { useState, useId } from 'react';
import Link from 'next/link';
import company from '@/config/company';

const serviceOptions = [
  'Fire Hydrant System',
  'Fire Sprinkler System',
  'Fire Alarm System',
  'Fire Extinguishers',
  'Clean Agent Suppression',
  'AMC / Maintenance',
  'Fire Safety Audit',
  'Site Inspection',
  'Emergency Lighting & Exit Signs',
  'Multiple Services',
  'Other / Not Sure',
];

interface FormState {
  fullName: string;
  companyName: string;
  designation: string;
  email: string;
  mobile: string;
  projectLocation: string;
  city: string;
  serviceRequired: string;
  projectDescription: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function RequestQuotePage() {
  const formId = useId();
  const [form, setForm] = useState<FormState>({
    fullName: '', companyName: '', designation: '', email: '',
    mobile: '', projectLocation: '', city: '', serviceRequired: '', projectDescription: '',
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sourcePage: 'request-quote' }),
      });
      const data = await res.json();

      if (data.success) {
        setReferenceNumber(data.referenceNumber);
        setStatus('success');
      } else {
        setErrorMessage(data.error || 'Something went wrong. Please call us directly.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Unable to submit. Please call us directly.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="tfs-atm-medium tfs-grid-overlay pt-24 pb-32 min-h-screen flex items-center">
        <div className="container-trinetra">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 rounded-full glass-fire border border-fire-red/20 flex items-center justify-center mx-auto mb-8">
              <svg className="w-8 h-8 text-fire-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1 className="font-display text-4xl text-white mb-4">ENQUIRY RECEIVED</h1>
            <p className="text-white/60 mb-6 leading-relaxed">
              Thank you for your enquiry. Our team will review your requirements and contact you shortly.
            </p>
            <div className="glass-fire border border-fire-red/15 rounded-xl px-8 py-5 mb-8 inline-block">
              <div className="text-xs text-white/30 tracking-widest uppercase mb-2">Your Reference Number</div>
              <div className="font-mono text-2xl text-fire-red tracking-wider">{referenceNumber}</div>
              <div className="text-xs text-white/30 mt-1">Please save this for your records</div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/" className="px-7 py-3.5 bg-fire-red text-white text-sm font-semibold rounded-xl btn-shadow-fire hover:bg-fire-red-light transition-colors">Back to Home</Link>
              <a href={company.whatsapp.quote()} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 glass border border-white/10 text-white text-sm font-semibold rounded-xl hover:border-fire-red/20 transition-colors">Follow up on WhatsApp</a>
            </div>
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
          <h1 className="font-display text-cinematic-md text-white mb-4">REQUEST A<br/><span className="gold-shine">QUOTATION</span></h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">Fill in your requirements and we will prepare a detailed proposal for your fire protection project.</p>
        </div>
      </section>

      <div className="container-trinetra">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="glass border border-white/[0.06] rounded-3xl p-8 md:p-12 space-y-6"
            aria-label="Quotation request form"
            id={`${formId}-form`}
            noValidate
          >
            {/* Contact info */}
            <div>
              <h2 className="font-display text-xl text-white mb-5 pb-3 border-b border-white/[0.05]">CONTACT INFORMATION</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor={`${formId}-fullName`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Full Name <span className="text-fire-red">*</span></label>
                  <input id={`${formId}-fullName`} name="fullName" type="text" value={form.fullName} onChange={handleChange} required autoComplete="name" className="form-input" placeholder="Your full name"/>
                </div>
                <div>
                  <label htmlFor={`${formId}-companyName`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Company / Organisation</label>
                  <input id={`${formId}-companyName`} name="companyName" type="text" value={form.companyName} onChange={handleChange} autoComplete="organization" className="form-input" placeholder="Company name (optional)"/>
                </div>
                <div>
                  <label htmlFor={`${formId}-designation`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Designation</label>
                  <input id={`${formId}-designation`} name="designation" type="text" value={form.designation} onChange={handleChange} className="form-input" placeholder="Your role (optional)"/>
                </div>
                <div>
                  <label htmlFor={`${formId}-email`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Email Address <span className="text-fire-red">*</span></label>
                  <input id={`${formId}-email`} name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" className="form-input" placeholder="your@email.com"/>
                </div>
                <div>
                  <label htmlFor={`${formId}-mobile`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Mobile Number <span className="text-fire-red">*</span></label>
                  <input id={`${formId}-mobile`} name="mobile" type="tel" value={form.mobile} onChange={handleChange} required autoComplete="tel" className="form-input" placeholder="+91 98765 43210"/>
                </div>
              </div>
            </div>

            {/* Project info */}
            <div>
              <h2 className="font-display text-xl text-white mb-5 pb-3 border-b border-white/[0.05]">PROJECT DETAILS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${formId}-projectLocation`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Project Location</label>
                  <input id={`${formId}-projectLocation`} name="projectLocation" type="text" value={form.projectLocation} onChange={handleChange} className="form-input" placeholder="Building / area address"/>
                </div>
                <div>
                  <label htmlFor={`${formId}-city`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">City</label>
                  <input id={`${formId}-city`} name="city" type="text" value={form.city} onChange={handleChange} className="form-input" placeholder="City"/>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${formId}-serviceRequired`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Service Required</label>
                  <select id={`${formId}-serviceRequired`} name="serviceRequired" value={form.serviceRequired} onChange={handleChange} className="form-input">
                    <option value="">Select a service...</option>
                    {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${formId}-projectDescription`} className="block text-xs text-white/50 tracking-widest uppercase mb-2">Project Description</label>
                  <textarea id={`${formId}-projectDescription`} name="projectDescription" value={form.projectDescription} onChange={handleChange} rows={5} className="form-input resize-none" placeholder="Describe your facility, current fire protection status, and your requirements in as much detail as possible..."/>
                  <div className="text-right text-xs text-white/20 mt-1">{form.projectDescription.length}/2000</div>
                </div>
              </div>
            </div>

            {/* Error */}
            {status === 'error' && (
              <div className="glass-fire border border-fire-red/20 rounded-xl p-4 text-fire-red text-sm" role="alert">
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                id="submit-quote-btn"
                disabled={status === 'loading'}
                className="group relative flex-1 py-4 bg-fire-red text-white font-bold text-sm tracking-wide rounded-xl btn-shadow-fire hover:bg-fire-red-light transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"/>
                <span className="relative">
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Submitting...
                    </span>
                  ) : 'Submit Quotation Request'}
                </span>
              </button>
              <a
                href={company.whatsapp.quote()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 btn-whatsapp rounded-xl text-sm font-semibold transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.847L.044 24l6.324-1.653A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.938 0-3.754-.524-5.31-1.435l-.383-.226-3.752.981.999-3.655-.248-.396A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Or WhatsApp
              </a>
            </div>

            <p className="text-xs text-white/25 text-center leading-relaxed">
              By submitting, you agree to Trinetra Fire Solutions contacting you regarding your enquiry. Your information is not shared with third parties.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
