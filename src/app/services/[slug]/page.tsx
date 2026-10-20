import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles, Shield } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';
import { SEED_SERVICES } from '@/data/seed';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEED_SERVICES.map((srv) => ({
    slug: srv.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const srv = SEED_SERVICES.find(s => s.slug === slug);
  if (!srv) return { title: 'Service Not Found | ALTROX' };

  return {
    title: `${srv.name} | ALTROX Studio`,
    description: srv.tag_line,
    openGraph: {
      title: `${srv.name} — ALTROX Studio`,
      description: srv.tag_line,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const srv = SEED_SERVICES.find(s => s.slug === slug);
  if (!srv) notFound();

  return (
    <div className="bg-[#080A09] text-[#F5F7F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back Link */}
      <Link
        href="/services"
        className="inline-flex items-center space-x-2 text-xs font-mono text-[#A2AAA4] hover:text-[#39FF78] mb-12 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO ALL SERVICES</span>
      </Link>

      {/* Hero Header */}
      <div className="border-b border-[#1A221C] pb-12 mb-16">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#39FF78] uppercase tracking-widest font-semibold mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Discipline Specification</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black font-editorial tracking-tight text-[#F5F7F5]">
          {srv.name}
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-[#39FF78] font-mono font-medium max-w-3xl">
          {srv.tag_line}
        </p>
        <p className="mt-6 text-sm sm:text-base text-[#A2AAA4] max-w-3xl leading-relaxed">
          {srv.description}
        </p>
      </div>

      {/* Main Grid: Specifications & Briefing Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Deliverables & Highlights */}
        <div className="lg:col-span-7 space-y-10">
          <div className="bg-[#0E1310] border border-[#1A221C] rounded-lg p-8 space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-[#F5F7F5] border-b border-[#1A221C] pb-4">
              Execution Standards & Inclusions
            </h2>
            <div className="space-y-4">
              {srv.features.map((feat, i) => (
                <div key={i} className="flex items-start space-x-3 text-sm text-[#F5F7F5]">
                  <CheckCircle2 className="w-5 h-5 text-[#39FF78] shrink-0 mt-0.5" />
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Reference Highlights */}
          <div className="bg-[#0E1310] border border-[#1A221C] rounded-lg p-8 space-y-4">
            <h3 className="text-base font-bold text-[#F5F7F5] font-mono uppercase tracking-wider">
              Relevant Studio Showcases
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {srv.portfolio_highlights.map((item, i) => (
                <div key={i} className="p-4 bg-[#080B09] border border-[#1A221C] rounded font-mono text-xs">
                  <div className="text-[#39FF78] font-semibold">{item}</div>
                  <div className="text-[11px] text-[#A2AAA4] mt-1">Validated Client Outcome</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Guidance */}
          <div className="p-6 bg-[#0E1511] border border-[#223326] rounded-lg flex items-center justify-between font-mono">
            <div>
              <div className="text-xs text-[#A2AAA4] uppercase">Tier Benchmark</div>
              <div className="text-2xl font-black text-[#39FF78] mt-1">{srv.pricing_starting_at}</div>
            </div>
            <div className="text-right text-xs text-[#A2AAA4]">
              Includes all source files & revisions
            </div>
          </div>
        </div>

        {/* Right Column: Embedded Contact Form Preselected */}
        <div className="lg:col-span-5">
          <ContactForm defaultService={srv.name} />
        </div>
      </div>
    </div>
  );
}
