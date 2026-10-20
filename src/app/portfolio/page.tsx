import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SEED_PORTFOLIO } from '@/data/seed';
import ParallaxMedia from '@/components/ui/ParallaxMedia';
import StudioCta from '@/components/ui/StudioCta';

export const metadata = {
  title: 'Selected Work & Case Studies | ALTROX Studio',
  description: 'Explore award-winning digital experiences, 3D WebGL platforms, and cinematic VFX projects crafted by ALTROX.',
};

export default function PortfolioPage() {
  return (
    <div className="bg-[#090B09] text-[#F2F2EC] min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1C221D] pb-12 mb-16">
        <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
          / Work & Impact
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-editorial tracking-tight text-[#F2F2EC] mt-3">
          WHAT WE BUILD FOR <br />
          <span className="text-[#72977A]">CATEGORY LEADERS.</span>
        </h1>
        <p className="mt-6 text-sm sm:text-base text-[#92968F] max-w-2xl font-normal leading-relaxed">
          From fast-growing fintechs in São Paulo and Mumbai to global retail icons. Every project is measured by concrete business metrics, award recognition, and cultural resonance.
        </p>
      </div>

      {/* nk.studio Sibling Dim-Blur Grid */}
      <div className="dim-blur-container grid grid-cols-1 md:grid-cols-2 gap-10">
        {SEED_PORTFOLIO.map((project) => (
          <Link
            key={project.id}
            href={`/portfolio/${project.slug}`}
            className="dim-blur-card group block bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/50 rounded-xl overflow-hidden transition-all duration-500 flex flex-col justify-between"
          >
            {/* Parallax Media Stage with nk.studio Edge Fade */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#070908]">
              <ParallaxMedia
                src={project.hero_image}
                alt={project.title}
                parallaxSpeed={0.12}
                aspectRatio="aspect-video"
                filterMode="cinematic"
              />
              <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-[#090B09]/85 backdrop-blur-md border border-[#1C221D] rounded-full text-[11px] font-mono text-[#72977A]">
                {project.category}
              </div>
              <div className="absolute top-4 right-4 z-20 px-2.5 py-1 bg-[#090B09]/85 backdrop-blur-md border border-[#1C221D] rounded-full text-[11px] font-mono text-[#92968F]">
                {project.year}
              </div>
            </div>

            <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-[#72977A] uppercase">{project.client_name}</div>
                <h2 className="text-2xl font-bold tracking-tight text-[#F2F2EC] group-hover:text-[#72977A] transition-[color,transform] duration-[1.2s] ease-[cubic-bezier(.18,1,.32,1)] group-hover:translate-x-[15px] mt-1">
                  {project.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#92968F] leading-relaxed mt-3 line-clamp-2">
                  {project.challenge}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="pt-4 border-t border-[#1C221D] grid grid-cols-3 gap-2 font-mono">
                {project.results.map((res, i) => (
                  <div key={i}>
                    <div className="text-lg font-black text-[#72977A]">{res.value}</div>
                    <div className="text-[10px] text-[#92968F]">{res.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#F2F2EC] group-hover:text-[#72977A]">
                <span className="studio-underline">VIEW COMPLETE CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Callout */}
      <div className="mt-20 pt-12 border-t border-[#1C221D] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold font-editorial text-[#F2F2EC]">Ready to engineer a category-defining experience?</h3>
          <p className="text-xs font-mono text-[#92968F] mt-1">We take on 3 select enterprise & ambitious startup partnerships per quarter.</p>
        </div>
        <StudioCta href="/contact" variant="primary">
          INITIATE DISCOVERY BRIEF
        </StudioCta>
      </div>
    </div>
  );
}
