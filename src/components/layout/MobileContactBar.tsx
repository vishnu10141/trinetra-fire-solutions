'use client';
import Link from 'next/link';
import company from '@/config/company';

export default function MobileContactBar() {
  return (
    <div className="mobile-contact-bar lg:hidden" role="navigation" aria-label="Quick contact actions">
      <div className="flex items-stretch">
        <a
          href={company.contact.primaryPhoneTel}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-white/80 hover:text-white hover:bg-white/[0.04] transition-colors border-r border-white/[0.06]"
          aria-label={`Call ${company.contact.primaryPhone}`}
        >
          <svg className="w-5 h-5 text-fire-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <span className="text-[10px] tracking-widest uppercase font-medium">Call</span>
        </a>
        <a
          href={company.whatsapp.generic()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[#25D366]/80 hover:text-[#25D366] hover:bg-[#25D366]/[0.04] transition-colors border-r border-white/[0.06]"
          aria-label="Contact via WhatsApp"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.847L.044 24l6.324-1.653A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.938 0-3.754-.524-5.31-1.435l-.383-.226-3.752.981.999-3.655-.248-.396A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          <span className="text-[10px] tracking-widest uppercase font-medium">WhatsApp</span>
        </a>
        <Link
          href="/request-quote"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 bg-fire-red text-white hover:bg-fire-red-light transition-colors"
          aria-label="Request a quote"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span className="text-[10px] tracking-widest uppercase font-medium">Quote</span>
        </Link>
      </div>
    </div>
  );
}
