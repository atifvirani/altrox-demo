'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Layers, Video, Code, MessageSquare, Sparkles, Filter } from 'lucide-react';
import { SEED_SERVICES } from '@/data/seed';
import StudioCta from '@/components/ui/StudioCta';

export default function ServicesPage() {
  const [activeGroup, setActiveGroup] = useState<'all' | 'graphic-design' | 'video-production' | 'marketing-tech'>('all');

  const filteredServices = activeGroup === 'all'
    ? SEED_SERVICES
    : SEED_SERVICES.filter((s) => s.service_group === activeGroup);

  const GROUPS = [
    { id: 'all', label: 'All Services (13)', icon: Sparkles },
    { id: 'graphic-design', label: 'Graphic Design (5)', icon: Layers },
    { id: 'video-production', label: 'Video Production (5)', icon: Video },
    { id: 'marketing-tech', label: 'Digital Marketing & Tech (3)', icon: Code },
  ];

  return (
    <div className="bg-[#090B09] text-[#F2F2EC] min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1C221D] pb-12 mb-12">
        <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
          / Studio Capabilities Matrix
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-editorial tracking-tight text-[#F2F2EC] mt-3">
          13 SPECIALIZED SERVICES. <br />
          <span className="text-[#72977A]">BUILT FOR AMBITIOUS BRANDS.</span>
        </h1>
        <p className="mt-6 text-sm sm:text-base text-[#92968F] max-w-2xl font-normal leading-relaxed">
          From pixel-perfect vector logo design and high-retention 60-second Reels to photorealistic 3D VFX, AI video synthesis, Meta ad creative, and fast Next.js web development.
        </p>
      </div>

      {/* Filter Tabs by Service Category */}
      <div className="flex flex-wrap gap-2 pb-8 border-b border-[#1C221D] mb-12 font-mono text-xs">
        {GROUPS.map((grp) => {
          const Icon = grp.icon;
          const isActive = activeGroup === grp.id;
          return (
            <button
              key={grp.id}
              onClick={() => setActiveGroup(grp.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded transition-all border ${
                isActive
                  ? 'bg-[#72977A] text-[#090B09] border-[#72977A] font-bold shadow-[0_0_15px_rgba(114,151,122,0.25)]'
                  : 'bg-[#0E1310] text-[#92968F] border-[#1C221D] hover:border-[#72977A]/40 hover:text-[#F2F2EC]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{grp.label}</span>
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((srv, index) => (
          <div
            key={srv.id}
            id={srv.slug}
            className="group bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/50 rounded-xl p-8 transition-all duration-300 flex flex-col justify-between space-y-6 scroll-mt-24"
          >
            <div>
              {/* Header Info */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#72977A] font-bold">
                  {(index + 1).toString().padStart(2, '0')} //
                </span>
                <span className="font-mono text-xs text-[#92968F]">
                  Starting: <strong className="text-[#F2F2EC]">{srv.pricing_starting_at}</strong>
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-[#F2F2EC] group-hover:text-[#72977A] transition-colors mt-4">
                {srv.name}
              </h2>
              <p className="font-mono text-xs text-[#72977A]/80 mt-1">{srv.tag_line}</p>
              <p className="text-xs text-[#92968F] leading-relaxed mt-3">
                {srv.description}
              </p>

              {/* What You Receive */}
              <div className="mt-6 pt-4 border-t border-[#1C221D] space-y-2">
                <div className="text-[10px] font-mono text-[#72977A] uppercase tracking-wider font-semibold">
                  What You Receive:
                </div>
                {srv.what_you_receive.map((item, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-[#F2F2EC]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72977A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Suitable For */}
              <div className="mt-4 pt-4 border-t border-[#1C221D]">
                <div className="text-[10px] font-mono text-[#92968F] uppercase tracking-wider font-semibold mb-1">
                  Suitable For:
                </div>
                <div className="text-xs text-[#92968F] leading-relaxed">
                  {srv.suitable_for}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-[#1C221D] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <Link
                href={`/contact?service=${encodeURIComponent(srv.name)}`}
                className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-[#72977A] hover:bg-[#55725C] text-[#090B09] font-mono font-bold text-xs uppercase tracking-wider rounded transition-colors text-center"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/services/${srv.slug}`}
                className="inline-flex items-center justify-center space-x-1 text-xs font-mono text-[#92968F] hover:text-[#72977A] transition-colors py-1 text-center"
              >
                <span>View Details ↗</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Project Discussion Banner */}
      <div className="mt-20 p-8 sm:p-12 bg-[#0E1511] border border-[#1C221D] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
            / Have a custom production requirement?
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#F2F2EC]">
            Discuss Your Project Directly
          </h3>
          <p className="text-xs sm:text-sm text-[#92968F] leading-relaxed">
            Need a dedicated creative engineering pod combining video editors, 3D artists, and web developers? We build custom retainers tailored for high-growth creator brands.
          </p>
        </div>

        <StudioCta href="/contact" variant="primary">
          DISCUSS YOUR PROJECT
        </StudioCta>
      </div>
    </div>
  );
}
