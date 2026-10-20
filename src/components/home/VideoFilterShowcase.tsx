'use client';

import React, { useState } from 'react';
import ParallaxMedia from '@/components/ui/ParallaxMedia';
import StudioCta from '@/components/ui/StudioCta';

interface ShowcaseReel {
  id: string;
  title: string;
  client: string;
  discipline: string;
  metrics: string;
  videoSrc: string;
  posterSrc: string;
  description: string;
}

const FEATURED_REELS: ShowcaseReel[] = [
  {
    id: 'pomelo-brand-motion',
    title: 'Financial Freedom in 3D Motion',
    client: 'Pomelo Fintech',
    discipline: '3D CGI / Brand Motion',
    metrics: '+440% Retention • 1.8M Reach',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-flying-cars-and-tall-buildings-42828-large.mp4',
    posterSrc: '/assets/portfolio/pomelo-fintech.jpg',
    description: 'Kinetic 3D product typography and fluid glass cards designed for high-conversion performance marketing.',
  },
  {
    id: 'untold-editorial-reel',
    title: 'Sonic Universe Global Launch',
    client: 'Untold Studios',
    discipline: 'Viral Reel / Sound FX',
    metrics: '94% Completion Rate • 3.2M Views',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-green-lights-movement-in-the-dark-48135-large.mp4',
    posterSrc: '/assets/portfolio/untold-global.jpg',
    description: '3-second hook velocity cutting with custom spatial audio design and desaturated cinematic grading.',
  },
  {
    id: 'vista-spatial-interface',
    title: 'Clean Energy Spatial Portal',
    client: 'Vista Energy',
    discipline: '3D WebGL / Interface',
    metrics: 'Awwwards SOTD Nominee',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-neon-lights-42829-large.mp4',
    posterSrc: '/assets/portfolio/vista-energy.jpg',
    description: 'Real-time telemetry particle stream and architectural data visualization built for institutional investors.',
  },
];

export default function VideoFilterShowcase() {
  const [globalFilter, setGlobalFilter] = useState<'cinematic' | 'mono' | 'editorial' | 'none'>('cinematic');
  const [scanlinesActive, setScanlinesActive] = useState<boolean>(true);

  return (
    <section className="relative w-full py-28 px-6 md:px-12 bg-[#090B09] border-t border-[#1C221D] overflow-hidden">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(114,151,122,0.06),transparent)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 text-[11px] font-mono tracking-widest text-[#72977A] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#72977A] animate-pulse" />
              <span>Motion Lab • Video Filters & CGI Engine</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#F2F2EC] font-editorial max-w-2xl leading-[1.05]">
              Cinematic Motion & Video Filters Engineered for Impossible Retention
            </h2>
          </div>

          {/* Interactive Global Video Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#121613] border border-[#1C221D] backdrop-blur-md">
            <span className="text-[10px] font-mono text-[#5C615A] uppercase px-2.5">Filter:</span>
            {(
              [
                { id: 'cinematic', label: 'Cinematic 35mm' },
                { id: 'mono', label: 'Noir Editorial' },
                { id: 'editorial', label: 'Warm Studio' },
                { id: 'none', label: 'Raw Bypass' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setGlobalFilter(filter.id)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-mono transition-all duration-300 ${
                  globalFilter === filter.id
                    ? 'bg-[#72977A] text-[#090B09] font-bold shadow-sm'
                    : 'text-[#92968F] hover:text-[#F2F2EC] hover:bg-white/5'
                }`}
              >
                {filter.label}
              </button>
            ))}

            <div className="h-4 w-px bg-[#1C221D] mx-1" />

            <button
              type="button"
              onClick={() => setScanlinesActive(!scanlinesActive)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-mono transition-all duration-300 ${
                scanlinesActive
                  ? 'bg-white/10 text-[#72977A] font-semibold border border-[#72977A]/30'
                  : 'text-[#5C615A] hover:text-[#92968F]'
              }`}
            >
              CRT Scanlines {scanlinesActive ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Sibling Dim-Blur Grid Container */}
        <div className="dim-blur-container grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_REELS.map((reel) => (
            <div
              key={reel.id}
              className="dim-blur-card flex flex-col group cursor-pointer"
            >
              {/* Parallax Video Media Stage */}
              <ParallaxMedia
                src={reel.videoSrc}
                poster={reel.posterSrc}
                alt={reel.title}
                type="video"
                parallaxSpeed={0.12}
                aspectRatio="aspect-[9/14]"
                filterMode={globalFilter}
                scanlines={scanlinesActive}
                showControls={true}
                className="mb-5 shadow-2xl"
              />

              {/* Editorial Metadata with Horizontal Title Shift */}
              <div className="flex items-center justify-between text-xs font-mono text-[#72977A] mb-2 uppercase tracking-wider">
                <span>{reel.client}</span>
                <span>{reel.discipline}</span>
              </div>

              <h3 className="text-lg font-light text-[#F2F2EC] mb-2 tracking-tight transition-transform duration-[1.2s] ease-[cubic-bezier(.18,1,.32,1)] group-hover:translate-x-[12px]">
                {reel.title}
              </h3>

              <p className="text-xs text-[#92968F] line-clamp-2 leading-relaxed mb-4">
                {reel.description}
              </p>

              <div className="mt-auto pt-3 border-t border-[#1C221D] flex items-center justify-between text-[11px] font-mono text-[#5C615A]">
                <span className="text-[#94B59B]">{reel.metrics}</span>
                <span className="text-[#72977A] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Inspect Reel →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-8 border-t border-[#1C221D] flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs font-mono text-[#5C615A] uppercase tracking-wider">
            All motion captures rendered in real-time with zero loss WebGL buffers & post-grain shaders.
          </p>

          <StudioCta href="/services/reel-editing" variant="primary">
            Explore All Video & CGI Services
          </StudioCta>
        </div>
      </div>
    </section>
  );
}
