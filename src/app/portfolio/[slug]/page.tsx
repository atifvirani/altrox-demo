import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Play } from 'lucide-react';
import { SEED_PORTFOLIO } from '@/data/seed';

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEED_PORTFOLIO.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = SEED_PORTFOLIO.find(p => p.slug === slug);
  if (!project) return { title: 'Case Study Not Found | ALTROX' };

  return {
    title: `${project.title} — Case Study | ALTROX`,
    description: project.challenge,
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = SEED_PORTFOLIO.find(p => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="bg-[#080A09] text-[#F5F7F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back Link */}
      <Link
        href="/portfolio"
        className="inline-flex items-center space-x-2 text-xs font-mono text-[#A2AAA4] hover:text-[#39FF78] mb-12 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO ALL PROJECTS</span>
      </Link>

      {/* Hero Header */}
      <div className="border-b border-[#1A221C] pb-12 mb-16">
        <div className="flex items-center space-x-3 text-xs font-mono text-[#39FF78] uppercase mb-3">
          <span>{project.client_name}</span>
          <span>·</span>
          <span>{project.category}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black font-editorial tracking-tight text-[#F5F7F5]">
          {project.title}
        </h1>
      </div>

      {/* Hero Media Showcase */}
      <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-[#1A221C] mb-16 bg-[#0E1310]">
        <img
          src={project.hero_image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A09]/80 via-transparent to-transparent" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 bg-[#0E1310] border border-[#1A221C] rounded-lg mb-16 font-mono">
        {project.results.map((res, i) => (
          <div key={i} className="text-center sm:text-left border-b sm:border-b-0 sm:border-r last:border-0 border-[#1A221C] pb-4 sm:pb-0 sm:pr-4">
            <div className="text-3xl sm:text-4xl font-black text-[#39FF78]">{res.value}</div>
            <div className="text-xs text-[#A2AAA4] mt-1 uppercase">{res.label}</div>
          </div>
        ))}
      </div>

      {/* Two Column Narrative: Challenge & Solution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-b border-[#1A221C] pb-16 mb-16">
        <div className="space-y-4">
          <span className="font-mono text-xs text-[#39FF78] uppercase tracking-widest font-semibold">
            / The Strategic Problem
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F5F7F5]">The Challenge</h2>
          <p className="text-sm sm:text-base text-[#A2AAA4] leading-relaxed">
            {project.challenge}
          </p>
        </div>

        <div className="space-y-4">
          <span className="font-mono text-xs text-[#39FF78] uppercase tracking-widest font-semibold">
            / Engineering & Execution
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F5F7F5]">The Solution</h2>
          <p className="text-sm sm:text-base text-[#A2AAA4] leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Case Study CTA */}
      <div className="p-8 sm:p-12 bg-[#0E1511] border border-[#223326] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black text-[#F5F7F5]">Ready to build something iconic?</h3>
          <p className="text-xs text-[#A2AAA4] font-mono mt-1">Schedule a brief with the ALTROX creative team today.</p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3.5 bg-[#39FF78] hover:bg-[#20A04B] text-[#080A09] font-mono font-bold text-xs uppercase tracking-wider rounded transition-all shrink-0 flex items-center space-x-2"
        >
          <span>START YOUR PROJECT</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
