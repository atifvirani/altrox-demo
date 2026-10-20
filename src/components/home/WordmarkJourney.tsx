'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import AltroxWebGLStage from '@/components/canvas/AltroxWebGLStage';
import StudioCta from '@/components/ui/StudioCta';

export default function WordmarkJourney() {
  const stageRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  // Scene content container refs for smooth opacity & parallax transitions
  const heroContentRef = useRef<HTMLDivElement>(null);
  const statementContentRef = useRef<HTMLDivElement>(null);
  const capHeaderContentRef = useRef<HTMLDivElement>(null);

  // Parallax floating words refs
  const floatCreateRef = useRef<HTMLDivElement>(null);
  const floatDesignRef = useRef<HTMLDivElement>(null);
  const floatMotionRef = useRef<HTMLDivElement>(null);
  const floatStoriesRef = useRef<HTMLDivElement>(null);
  const floatCraftRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeCapability, setActiveCapability] = useState<number>(0);

  // 7 Primary Studio Disciplines
  const editorialDisciplines = [
    {
      num: '01',
      name: 'Spatial 3D Web & Three.js Architecture',
      slug: 'web-development',
      category: 'Deep Tech & Engineering',
      tags: ['Three.js', 'WebGL 2.0', 'Next.js 15', 'GLSL Shaders', 'Sub-1.2s LCP'],
      starting: '$2,500',
      description: 'Architectural web platforms engineered for 60FPS across all devices. We build digital monuments that turn casual visitors into enterprise believers.',
    },
    {
      num: '02',
      name: 'Hollywood-Grade VFX & 3D CGI',
      slug: 'vfx-and-cgi',
      category: 'Visual Craft',
      tags: ['Houdini', 'Blender', 'Unreal Engine 5', 'Octane', 'Photoreal Simulation'],
      starting: '$1,200',
      description: 'Cinema-grade visual effects, complex physics simulations, and bespoke 3D character design directed by our character triad.',
    },
    {
      num: '03',
      name: 'High-Retention Video & Reels Editing',
      slug: 'reel-editing',
      category: 'Viral Media',
      tags: ['Premiere Pro', 'DaVinci Resolve', 'Sound Design', 'Pacing Architecture', '35%+ Retention'],
      starting: '$600',
      description: 'Algorithmic short-form video engineered to capture immediate attention within 1.5 seconds and sustain high watch times.',
    },
    {
      num: '04',
      name: 'Editorial Poster & Brand Identity',
      slug: 'poster-design',
      category: 'Typography & Design',
      tags: ['Swiss Typography', 'Custom Vectors', 'Editorial Grids', 'Print & Spatial'],
      starting: '$400',
      description: 'Distinctive visual identities and art-directed editorial posters with disciplined typography, negative space, and timeless hierarchy.',
    },
    {
      num: '05',
      name: 'AI Video Pipelines & Automation',
      slug: 'ai-automation',
      category: 'Systems & Intelligence',
      tags: ['Sora', 'Runway Gen-3', 'ComfyUI Pipelines', 'Autonomous Agents', 'REA Protocol'],
      starting: '$1,800',
      description: 'Custom generative video workflows and autonomous workflow automation integrated with the local REA reverse-engineering suite.',
    },
    {
      num: '06',
      name: 'High-Conversion Thumbnail Systems',
      slug: 'thumbnail-design',
      category: 'Visual Strategy',
      tags: ['CTR Optimization', 'Color Grading', 'Facial Dynamics', 'Multi-variant Testing'],
      starting: '$300',
      description: 'High-impact YouTube and streaming thumbnails constructed with psychological contrast and precision composition.',
    },
    {
      num: '07',
      name: 'Creative Direction & Campaign Stories',
      slug: 'video-editing',
      category: 'Narrative Architecture',
      tags: ['Brand Narrative', 'Keynote Direction', 'Launch Films', 'Cross-Platform'],
      starting: '$1,500',
      description: 'End-to-end creative direction for high-stakes tech launches, investor keynotes, and category-defining brand narratives.',
    },
  ];

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    if (motionQuery.matches) return;

    let animId: number;

    const renderFrame = () => {
      try {
        const stage = stageRef.current;
        const wordmark = wordmarkRef.current;
        if (!stage || !wordmark) {
          animId = requestAnimationFrame(renderFrame);
          return;
        }

        const rect = stage.getBoundingClientRect();
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const totalScrollable = rect.height - winH;

        // Normalized scroll progress p in [0, 1] through the 3-scene stage
        const p = Math.min(Math.max(-rect.top / Math.max(totalScrollable, 1), 0), 1);

        // Responsive Keyframe Coordinates
        const isMobile = winW < 640;
        const isTablet = winW >= 640 && winW < 1024;

        // 1. Scene 1 Navbar position: aligned with top navbar logo
        const navSlot = document.getElementById('nav-logo-slot');
        const navRect = navSlot ? navSlot.getBoundingClientRect() : null;
        const navLeft = navRect && navRect.left > 0 ? navRect.left : (isMobile ? 32 : Math.max((winW - 1280) / 2 + 36, 40));
        const navTop = navRect && navRect.top > 0 ? navRect.top : 22;
        const navSize = navRect && navRect.height > 0 ? navRect.height * 0.95 : (isMobile ? 20 : 24);

        // 2. Scene 2 Hero position: dominant architectural centerpiece in upper-middle viewport
        const heroLeft = isMobile ? 24 : Math.max((winW - 1280) / 2 + 32, 48);
        const heroTop = isMobile ? winH * 0.22 : winH * 0.24;
        const heroSize = isMobile ? 56 : (isTablet ? 90 : 124);

        // 3. Scene 3 Statement position: leading the headline "TURNS IDEAS INTO..."
        const statementLeft = isMobile ? 24 : Math.max((winW - 1280) / 2 + 32, 48);
        const statementTop = isMobile ? winH * 0.28 : winH * 0.28;
        const statementSize = isMobile ? 34 : (isTablet ? 52 : 72);

        // 4. Section 3 Capabilities position: leading the capabilities header
        const capLeft = isMobile ? 24 : Math.max((winW - 1280) / 2 + 32, 48);
        const capTop = isMobile ? winH * 0.18 : winH * 0.18;
        const capSize = isMobile ? 28 : (isTablet ? 40 : 48);

        // Dynamic interpolation
        let currentX = navLeft;
        let currentY = navTop;
        let currentSize = navSize;
        let color = '#F2F2EC';

        // Scene opacities
        let heroOpacity = 1;
        let statementOpacity = 0;
        let capHeaderOpacity = 0;

        if (p <= 0.25) {
          // Phase 1: Detach from navbar and expand into Hero centerpiece
          const t = p / 0.25;
          const ease = 1 - Math.pow(1 - t, 3); // cubic ease out

          currentX = navLeft + (heroLeft - navLeft) * ease;
          currentY = navTop + (heroTop - navTop) * ease;
          currentSize = navSize + (heroSize - navSize) * ease;
          color = '#F2F2EC';

          heroOpacity = 1;
          statementOpacity = 0;
          capHeaderOpacity = 0;
        } else if (p > 0.25 && p <= 0.40) {
          // Phase 2: Steady state in Hero Centerpiece
          currentX = heroLeft;
          currentY = heroTop;
          currentSize = heroSize;
          color = '#F2F2EC';

          heroOpacity = 1;
          statementOpacity = 0;
          capHeaderOpacity = 0;
        } else if (p > 0.40 && p <= 0.65) {
          // Phase 3: Travel from Hero into Statement headline
          const t = (p - 0.40) / 0.25;
          const ease = -(Math.cos(Math.PI * t) - 1) / 2; // sine ease in-out

          currentX = heroLeft + (statementLeft - heroLeft) * ease;
          currentY = heroTop + (statementTop - heroTop) * ease;
          currentSize = heroSize + (statementSize - heroSize) * ease;
          // Smooth transition to soft moss green as it integrates into the sentence
          color = t > 0.5 ? '#72977A' : '#F2F2EC';

          heroOpacity = Math.max(1 - t * 2, 0);
          statementOpacity = Math.min(Math.max((t - 0.3) * 2, 0), 1);
          capHeaderOpacity = 0;
        } else if (p > 0.65 && p <= 0.78) {
          // Phase 4: Sits seamlessly inside Statement headline
          currentX = statementLeft;
          currentY = statementTop;
          currentSize = statementSize;
          color = '#72977A';

          heroOpacity = 0;
          statementOpacity = 1;
          capHeaderOpacity = 0;
        } else if (p > 0.78 && p <= 0.94) {
          // Phase 5: Travel from Statement into Section 3 Capabilities header
          const t = (p - 0.78) / 0.16;
          const ease = -(Math.cos(Math.PI * t) - 1) / 2;

          currentX = statementLeft + (capLeft - statementLeft) * ease;
          currentY = statementTop + (capTop - statementTop) * ease;
          currentSize = statementSize + (capSize - statementSize) * ease;
          color = t > 0.5 ? '#F2F2EC' : '#72977A';

          heroOpacity = 0;
          statementOpacity = Math.max(1 - t * 2, 0);
          capHeaderOpacity = Math.min(Math.max((t - 0.3) * 2, 0), 1);
        } else {
          // Phase 6: Settled in Capabilities header (p > 0.94)
          currentX = capLeft;
          currentY = capTop;
          currentSize = capSize;
          color = '#F2F2EC';

          heroOpacity = 0;
          statementOpacity = 0;
          capHeaderOpacity = 1;
        }

        // Apply hardware-accelerated transform & styles
        wordmark.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0px)`;
        wordmark.style.fontSize = `${currentSize.toFixed(1)}px`;
        wordmark.style.color = color;
        wordmark.style.opacity = '1';

        // Scene content opacity updates
        if (heroContentRef.current) heroContentRef.current.style.opacity = `${heroOpacity}`;
        if (statementContentRef.current) statementContentRef.current.style.opacity = `${statementOpacity}`;
        if (capHeaderContentRef.current) capHeaderContentRef.current.style.opacity = `${capHeaderOpacity}`;

        // Multi-speed parallax floating words
        if (floatCreateRef.current) {
          floatCreateRef.current.style.transform = `translate3d(0px, ${(p * 180).toFixed(1)}px, 0px)`;
        }
        if (floatDesignRef.current) {
          floatDesignRef.current.style.transform = `translate3d(0px, ${(-p * 120).toFixed(1)}px, 0px)`;
        }
        if (floatMotionRef.current) {
          floatMotionRef.current.style.transform = `translate3d(0px, ${(p * 240).toFixed(1)}px, 0px)`;
        }
        if (floatStoriesRef.current) {
          floatStoriesRef.current.style.transform = `translate3d(${(-p * 80).toFixed(1)}px, ${(p * 140).toFixed(1)}px, 0px)`;
        }
        if (floatCraftRef.current) {
          floatCraftRef.current.style.transform = `translate3d(${(p * 90).toFixed(1)}px, 0px, 0px)`;
        }
      } catch (err) {
        console.error('Wordmark animation frame error:', err);
      }

      animId = requestAnimationFrame(renderFrame);
    };

    animId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animId);
      motionQuery.removeEventListener('change', motionListener);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* ==============================================================================
          THE SIGNATURE 3-SCENE SCROLL STAGE (Height: 300vh)
          Native document scrolling drives a sticky viewport stage without hijacking scroll.
          ============================================================================== */}
      {!reducedMotion ? (
        <div ref={stageRef} className="relative h-[300vh] w-full">
          {/* Sticky 100vh Viewport */}
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#090B09] flex flex-col justify-between">
            {/* Background 3D Multi-Scene WebGL Engine (Wireframe, Pointcloud, Aurora, World) */}
            <AltroxWebGLStage allowSceneSwitching={true} autoScrollTransition={true} />

            {/* Subtle Watermark Typography */}
            <div
              className="absolute right-4 top-1/3 text-watermark text-[16vw] font-black font-editorial opacity-[0.025] select-none pointer-events-none"
              aria-hidden="true"
            >
              CRAFT
            </div>

            {/* ==========================================================================
                THE CONTINUOUS TRAVELLING WORDMARK
                Single physical element travelling through Scenes 1, 2, and 3
                ========================================================================== */}
            <div
              ref={wordmarkRef}
              className="fixed top-0 left-0 origin-top-left font-black font-editorial tracking-tighter select-none will-change-transform z-40 whitespace-nowrap leading-none"
              style={{
                fontSize: '24px',
                color: '#F2F2EC',
                opacity: 0,
              }}
            >
              ALTROX
            </div>

            {/* Parallax Floating Words Layer */}
            <div
              ref={floatCreateRef}
              className="absolute top-28 right-8 sm:right-16 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#72977A]/70 uppercase select-none pointer-events-none z-20"
            >
              // CREATE
            </div>
            <div
              ref={floatDesignRef}
              className="absolute top-1/2 left-4 sm:left-8 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[#92968F]/60 uppercase select-none pointer-events-none z-20"
            >
              [ DESIGN ]
            </div>
            <div
              ref={floatMotionRef}
              className="absolute bottom-28 right-12 sm:right-24 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[#92968F]/60 uppercase select-none pointer-events-none z-20"
            >
              • MOTION
            </div>
            <div
              ref={floatStoriesRef}
              className="absolute top-1/3 left-1/3 text-[10px] font-mono tracking-[0.25em] text-[#72977A]/40 uppercase select-none pointer-events-none z-20"
            >
              // STORIES
            </div>
            <div
              ref={floatCraftRef}
              className="absolute bottom-20 left-12 text-[10px] font-mono tracking-[0.2em] text-[#92968F]/50 uppercase select-none pointer-events-none z-20"
            >
              [ DIGITAL CRAFT ]
            </div>

            {/* Top Navigation Spacer Bar */}
            <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20">
              <div className="flex items-center justify-between border-b border-[#1C221D] pb-3 text-xs font-mono">
                <div className="flex items-center space-x-2 text-[#72977A]">
                  <span className="w-2 h-2 rounded-full bg-[#72977A]" />
                  <span className="tracking-widest uppercase font-semibold">
                    Independent Creative Technology Studio
                  </span>
                </div>
                <div className="hidden sm:block text-[#92968F] tracking-wide">
                  DELHI · MUMBAI · DHAKA · KATHMANDU
                </div>
              </div>
            </div>

            {/* ==========================================================================
                SCENE 2 COMPOSITION LAYER (HERO STATEMENT & CTAS)
                ========================================================================== */}
            <div
              ref={heroContentRef}
              className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto transition-opacity duration-150"
            >
              <div className="max-w-4xl pt-24 sm:pt-36">
                <div className="text-xs sm:text-sm font-mono text-[#72977A] uppercase tracking-widest mb-3 font-semibold">
                  / Creative Studio · Digital Platform · Creator Education
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-editorial tracking-tight text-[#F2F2EC] leading-tight">
                  CREATE MORE. LEARN FASTER. BUILD WHAT’S NEXT.
                </h1>
                <p className="mt-6 text-sm sm:text-base text-[#92968F] max-w-2xl font-normal leading-relaxed">
                  ALTROX is a creative digital platform for content, design, video production, AI-powered workflows, web development, and digital learning.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4 pointer-events-auto">
                  <StudioCta href="/services" variant="primary">
                    EXPLORE SERVICES
                  </StudioCta>
                  <StudioCta href="/content" variant="secondary">
                    EXPLORE CONTENT
                  </StudioCta>
                </div>
              </div>
            </div>

            {/* ==========================================================================
                SCENE 3 COMPOSITION LAYER (BRAND STATEMENT HEADLINE & PHILOSOPHY)
                ========================================================================== */}
            <div
              ref={statementContentRef}
              className="absolute inset-0 z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pointer-events-none transition-opacity duration-150"
              style={{ opacity: 0 }}
            >
              <div className="max-w-5xl">
                <div className="text-xs font-mono text-[#72977A] uppercase tracking-widest mb-4 font-semibold">
                  / 02 — Editorial Philosophy
                </div>

                {/* The Headline slot where ALTROX travels into */}
                <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black font-editorial tracking-tight leading-[1.05] text-[#F2F2EC]">
                  <span className="invisible inline-block mr-3 sm:mr-5">ALTROX</span>
                  <span>TURNS IDEAS INTO THINGS PEOPLE REMEMBER.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-8 mt-8 border-t border-[#1C221D]">
                  <div className="md:col-span-5 text-sm sm:text-base text-[#F2F2EC] font-medium leading-relaxed">
                    In a digital landscape flooded with generic templates and disposable content, true distinction is rare.
                  </div>
                  <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-[#92968F] leading-relaxed">
                    <p>
                      At ALTROX, we integrate three disciplines under one roof: mathematical systems engineering, Hollywood-standard visual effects, and high-frequency viral storytelling. We build digital monuments that command respect.
                    </p>
                    <div className="grid grid-cols-3 gap-4 pt-2 font-mono">
                      <div>
                        <div className="text-xl font-bold text-[#72977A]">60 FPS</div>
                        <div className="text-[10px] text-[#92968F] mt-0.5">Spatial WebGL</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-[#72977A]">&lt; 1.2s</div>
                        <div className="text-[10px] text-[#92968F] mt-0.5">Core Web Vitals</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-[#72977A]">13 Crafts</div>
                        <div className="text-[10px] text-[#92968F] mt-0.5">Unified Studio</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ==========================================================================
                SCENE 4 TRANSITION LAYER (CAPABILITIES HEADER SETTLE)
                ========================================================================== */}
            <div
              ref={capHeaderContentRef}
              className="absolute inset-0 z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pointer-events-none transition-opacity duration-150"
              style={{ opacity: 0 }}
            >
              <div className="max-w-4xl">
                <div className="text-xs font-mono text-[#72977A] uppercase tracking-widest mb-3 font-semibold">
                  / 03 — Creative Capabilities
                </div>
                <h2 className="text-3xl sm:text-5xl font-black font-editorial tracking-tight text-[#F2F2EC] flex items-baseline flex-wrap">
                  <span className="invisible inline-block mr-3">ALTROX</span>
                  <span>DISCIPLINES & CAPABILITIES</span>
                </h2>
                <p className="mt-4 text-xs sm:text-sm text-[#92968F] max-w-xl font-mono leading-relaxed">
                  Scroll down to explore all 13 specialized disciplines, deliverables scopes, and pricing architectures.
                </p>
              </div>
            </div>

            {/* Bottom Coordinates Strip */}
            <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-[#1C221D] text-xs font-mono">
                <div>
                  <div className="text-[#92968F] uppercase">RUNTIME</div>
                  <div className="text-[#F2F2EC] font-medium mt-0.5">Three.js WebGL + REA</div>
                </div>
                <div>
                  <div className="text-[#92968F] uppercase">SPEED</div>
                  <div className="text-[#72977A] font-semibold mt-0.5">60 FPS // Sub-1.2s LCP</div>
                </div>
                <div>
                  <div className="text-[#92968F] uppercase">SCOPE</div>
                  <div className="text-[#F2F2EC] font-medium mt-0.5">13 Integrated Crafts</div>
                </div>
                <div>
                  <div className="text-[#92968F] uppercase">TRIAD</div>
                  <div className="text-[#F2F2EC] font-medium mt-0.5">Altrox · Thamos · Chutki</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Reduced Motion Fallback: Clean, Static Editorial Presentation */
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
          <div>
            <div className="text-5xl sm:text-7xl font-black font-editorial text-[#F2F2EC] tracking-tighter">
              ALTROX
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-editorial text-[#F2F2EC] mt-3">
              CREATE MORE. LEARN FASTER. BUILD WHAT’S NEXT.
            </h1>
            <p className="mt-4 text-[#92968F] max-w-2xl leading-relaxed">
              ALTROX is a creative digital platform for content, design, video production, AI-powered workflows, web development, and digital learning.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <StudioCta href="/services" variant="primary">
                EXPLORE SERVICES
              </StudioCta>
              <StudioCta href="/content" variant="secondary">
                EXPLORE CONTENT
              </StudioCta>
            </div>
          </div>
          <div className="border-t border-[#1C221D] pt-12">
            <h2 className="text-3xl sm:text-5xl font-black font-editorial text-[#72977A]">
              ESTABLISHED DIGITAL CREATOR BRAND & CREATIVE STUDIO.
            </h2>
          </div>
        </section>
      )}

      {/* ==============================================================================
          SECTION 3: CREATIVE CAPABILITIES & DISCIPLINES INDEX
          Background: Refined Moss Charcoal (#101411)
          Typographic index replacing generic rounded cards.
          ============================================================================== */}
      <section className="relative py-28 sm:py-36 bg-[#101411] border-t border-[#1C221D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#1C221D] gap-6">
            <div>
              <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
                / 03 — Disciplines Index
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-editorial tracking-tight text-[#F2F2EC] mt-3">
                <span className="text-[#72977A]">ALTROX</span> DISCIPLINES & CAPABILITIES
              </h2>
            </div>
            <Link
              href="/services"
              className="flex items-center space-x-1.5 font-mono text-xs text-[#72977A] hover:text-[#94B59B] transition-colors"
            >
              <span>VIEW FULL 13-SERVICE CATALOGUE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="dim-blur-container divide-y divide-[#1C221D] border-b border-[#1C221D]">
            {editorialDisciplines.map((item, index) => {
              const isSelected = activeCapability === index;
              return (
                <div
                  key={item.num}
                  onMouseEnter={() => setActiveCapability(index)}
                  className={`dim-blur-card group py-8 px-3 rounded-lg transition-all duration-500 ${
                    isSelected ? 'bg-[#141A15]/60' : 'hover:bg-[#141A15]/30'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-6 flex items-baseline space-x-6">
                      <span className="font-mono text-xs text-[#72977A] font-bold">
                        {item.num} //
                      </span>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F2F2EC] group-hover:text-[#72977A] transition-[color,transform] duration-[1.2s] ease-[cubic-bezier(.18,1,.32,1)] group-hover:translate-x-[15px]">
                          <Link href={`/services/${item.slug}`} className="studio-underline">
                            {item.name}
                          </Link>
                        </h3>
                        <div className="text-xs font-mono text-[#92968F] mt-1 transition-transform duration-[1.2s] ease-[cubic-bezier(.18,1,.32,1)] group-hover:translate-x-[15px]">
                          {item.category}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-[#090B09]/80 border border-[#1C221D] text-[11px] font-mono text-[#92968F] rounded group-hover:border-[#72977A]/40 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="lg:col-span-2 flex items-center justify-between lg:justify-end space-x-4">
                      <div className="text-left lg:text-right font-mono">
                        <div className="text-[10px] text-[#92968F] uppercase">Starting</div>
                        <div className="text-sm font-bold text-[#F2F2EC]">{item.starting}</div>
                      </div>
                      <Link
                        href={`/services/${item.slug}`}
                        className="w-9 h-9 rounded-full bg-[#1A221C] group-hover:bg-[#72977A] group-hover:text-[#090B09] text-[#F2F2EC] flex items-center justify-center transition-all duration-300 shrink-0"
                        aria-label={`View ${item.name}`}
                      >
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:scale-110" />
                      </Link>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-[#1C221D]/50 lg:ml-12 text-xs sm:text-sm text-[#92968F] max-w-3xl leading-relaxed">
                      {item.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
