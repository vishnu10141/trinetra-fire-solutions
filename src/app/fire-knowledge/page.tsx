import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fire Knowledge',
  description: 'Learn about fire protection systems, fire safety standards (IS, NBC), types of fire extinguishers, and best practices for fire safety in industrial and commercial facilities.',
};

const articles = [
  {
    slug: 'fire-classes-india',
    category: 'Fundamentals',
    title: 'Classes of Fire — Understanding the Fire Triangle',
    summary: 'Not all fires are the same. Understanding fire classes (A, B, C, D and K/F) is essential for selecting the correct suppression agent and response strategy.',
    readTime: '4 min read',
    color: '#C41E3A',
  },
  {
    slug: 'fire-extinguisher-types',
    category: 'Equipment',
    title: 'Types of Fire Extinguishers and When to Use Them',
    summary: 'ABC dry powder, CO₂, foam, water and clean agent extinguishers each have specific applications. This guide explains which type to use for different fire classes and environments.',
    readTime: '5 min read',
    color: '#FF5722',
  },
  {
    slug: 'fire-hydrant-system-overview',
    category: 'Systems',
    title: 'Fire Hydrant Systems — How They Work',
    summary: 'An overview of internal and external fire hydrant system design, components and operation as per IS 3844 and National Building Code requirements.',
    readTime: '6 min read',
    color: '#0891B2',
  },
  {
    slug: 'fire-sprinkler-system-overview',
    category: 'Systems',
    title: 'Automatic Sprinkler Systems — Design and Operation',
    summary: 'Understanding wet pipe, dry pipe and pre-action sprinkler systems — how they are designed, how individual sprinkler heads activate, and common misconceptions.',
    readTime: '7 min read',
    color: '#16A34A',
  },
  {
    slug: 'fire-alarm-system-guide',
    category: 'Systems',
    title: 'Fire Alarm Systems — Conventional vs Addressable',
    summary: 'Conventional and addressable fire alarm systems have different architectures and capabilities. This guide helps you understand the differences and which is appropriate for your facility.',
    readTime: '5 min read',
    color: '#7C3AED',
  },
  {
    slug: 'fire-safety-audit-guide',
    category: 'Compliance',
    title: 'What to Expect from a Fire Safety Audit',
    summary: 'A fire safety audit assesses your facility\'s fire protection status against IS codes and NBC requirements. This guide explains the process, scope and typical findings.',
    readTime: '5 min read',
    color: '#D4A017',
  },
  {
    slug: 'amc-importance',
    category: 'Maintenance',
    title: 'Why Fire System Maintenance is Non-Negotiable',
    summary: 'Fire protection systems that are not regularly maintained can fail silently. This article explains what maintenance involves, how frequently it should be done, and the consequences of neglect.',
    readTime: '4 min read',
    color: '#C41E3A',
  },
  {
    slug: 'nbc-is-compliance',
    category: 'Compliance',
    title: 'IS Codes & National Building Code — Fire Protection Requirements',
    summary: 'An overview of the key Indian Standards (IS) and National Building Code (NBC) provisions governing fire protection system design and installation in India.',
    readTime: '6 min read',
    color: '#0891B2',
  },
];

export default function FireKnowledgePage() {
  return (
    <div className="tfs-atm-medium tfs-grid-overlay pt-24 pb-32 min-h-screen relative">
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 radial-fire-bottom opacity-20 pointer-events-none" aria-hidden="true"/>
        <div className="container-trinetra relative text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-gold/40"/>
            <span className="text-xs tracking-[0.5em] uppercase text-gold/70 font-mono">Knowledge Centre</span>
            <span className="h-px w-12 bg-gold/40"/>
          </div>
          <h1 className="font-display text-cinematic-lg text-white mb-4">FIRE<br/><span className="gold-shine">KNOWLEDGE</span></h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
            Technical resources on fire protection systems, equipment, compliance and best practices — from the engineers at Trinetra Fire Solutions.
          </p>
        </div>
      </section>

      <div className="container-trinetra">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <Link
              key={article.slug}
              href={`/fire-knowledge/${article.slug}`}
              className="group glass border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
              style={{ textDecoration: 'none' }}
            >
              {/* Category accent bar */}
              <div className="h-1 w-0 group-hover:w-full transition-all duration-500 flex-shrink-0" style={{ background: article.color }} aria-hidden="true"/>

              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold border" style={{ color: article.color, borderColor: `${article.color}30`, background: `${article.color}10` }}>
                    {article.category}
                  </span>
                  <span className="text-white/25 text-xs">{article.readTime}</span>
                </div>

                <h2 className="font-display text-xl text-white mb-3 leading-tight flex-1">
                  {article.title.toUpperCase()}
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{article.summary}</p>

                <div className="flex items-center gap-2 text-xs font-semibold transition-colors duration-300 mt-auto group-hover:translate-x-0.5" style={{ color: article.color }}>
                  Read Article
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact for more */}
        <div className="mt-20 text-center glass border border-white/[0.06] rounded-3xl p-12">
          <h2 className="font-display text-3xl text-white mb-4">HAVE A TECHNICAL QUESTION?</h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Our team is happy to answer questions about fire protection systems, compliance requirements and equipment selection for your specific facility.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-fire-red text-white font-semibold text-sm rounded-xl btn-shadow-fire hover:bg-fire-red-light transition-colors">Contact Our Team</Link>
            <Link href="/request-quote" className="px-8 py-4 glass border border-white/10 text-white/80 font-semibold text-sm rounded-xl hover:border-fire-red/20 transition-colors">Request a Quotation</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
