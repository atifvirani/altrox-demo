import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import WordmarkJourney from '@/components/home/WordmarkJourney';
import Ticker from '@/components/ui/Ticker';
import ReaTerminal from '@/components/ui/ReaTerminal';
import ContactForm from '@/components/ui/ContactForm';
import ParallaxMedia from '@/components/ui/ParallaxMedia';
import VideoFilterShowcase from '@/components/home/VideoFilterShowcase';
import StudioCta from '@/components/ui/StudioCta';
import { SEED_PORTFOLIO, SEED_CHARACTERS, SEED_COURSES, SEED_PRODUCTS, SEED_CONTENT } from '@/data/seed';

export default function HomePage() {
  const featuredWork = SEED_PORTFOLIO.filter((p) => p.is_featured).slice(0, 3);
  const featuredVideos = SEED_CONTENT.filter(
    (c) => c.type === 'video' || c.type === 'skit' || c.type === 'reel'
  ).slice(0, 3);

  return (
    <div className="relative bg-[#090B09] text-[#F2F2EC] overflow-hidden">
      {/* ==============================================================================
          1, 2, 3. THE SIGNATURE SCROLL EXPERIENCE: WORDMARK JOURNEY & 3D STAGE
          Scenes 1 (Arrival), 2 (Hero Statement), and 3 (Disciplines Index)
          Integrated with nk.studio 4-scene WebGL Stage & Travelling Wordmark
          ============================================================================== */}
      <WordmarkJourney />

      {/* ==============================================================================
          4. KINETIC EDITORIAL TICKER
          ============================================================================== */}
      <Ticker />

      {/* ==============================================================================
          5. THE COLLECTIVE: BRAND CHARACTERS (Altrox, Thamos, Chutki)
          With nk.studio Sibling Dim-Blur & Parallax Portrait Masks
          ============================================================================== */}
      <section className="py-28 bg-[#0C100D] border-y border-[#1C221D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1C221D] gap-4">
            <div>
              <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
                / 04 — The Creative Triad
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-editorial tracking-tight text-[#F2F2EC] mt-2">
                THE ALTROX COLLECTIVE
              </h2>
            </div>
            <p className="font-mono text-xs text-[#92968F] max-w-md leading-relaxed">
              Three specialized character perspectives directing every client engagement, spatial architecture, and cinematic production script.
            </p>
          </div>

          {/* nk.studio Sibling Dim-Blur Card Grid */}
          <div className="dim-blur-container grid grid-cols-1 md:grid-cols-3 gap-8">
            {SEED_CHARACTERS.map((char) => (
              <div
                key={char.id}
                className="dim-blur-card group relative bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/50 rounded-xl overflow-hidden transition-all duration-500 flex flex-col"
              >
                {/* Character Portrait with nk.studio Parallax Mask */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#070908]">
                  <ParallaxMedia
                    src={char.avatar}
                    alt={char.name}
                    parallaxSpeed={0.10}
                    aspectRatio="aspect-square"
                    filterMode="cinematic"
                  />
                  <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-[#090B09]/85 backdrop-blur-md border border-[#1C221D] rounded-full text-[11px] font-mono text-[#72977A]">
                    {char.role}
                  </div>
                </div>

                {/* Character Details with nk.studio Title Shift */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-[#F2F2EC] group-hover:text-[#72977A] transition-[color,transform] duration-[1.2s] ease-[cubic-bezier(.18,1,.32,1)] group-hover:translate-x-[12px]">
                      {char.name}
                    </h3>
                    <div className="text-xs font-mono text-[#92968F] mt-0.5">{char.title}</div>
                    <p className="text-xs text-[#92968F] leading-relaxed mt-3">
                      {char.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1C221D] space-y-2">
                    <div className="text-[11px] font-mono text-[#72977A]">
                      <span className="text-[#92968F]">Focus:</span> {char.specialty}
                    </div>
                    <div className="text-[11px] font-mono italic text-[#92968F]/80">
                      &ldquo;{char.tagline}&rdquo;
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================================
          6. FEATURED WORK / PORTFOLIO SHOWCASE
          With nk.studio Sibling Dim-Blur & Parallax Case Study Masks
          ============================================================================== */}
      <section className="py-28 bg-[#090B09] border-b border-[#1C221D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1C221D] gap-4">
            <div>
              <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
                / 05 — Selected Case Studies
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-editorial tracking-tight text-[#F2F2EC] mt-2">
                WHAT WE BUILD FOR THE AMBITIOUS
              </h2>
            </div>
            <StudioCta href="/portfolio" variant="underline">
              EXPLORE ALL CASE STUDIES
            </StudioCta>
          </div>

          {/* nk.studio Sibling Dim-Blur List Container */}
          <div className="dim-blur-container space-y-16">
            {featuredWork.map((project, idx) => (
              <div
                key={project.id}
                className="dim-blur-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#1C221D] pb-16 group"
              >
                {/* Media Stage with nk.studio Parallax & Edge Fade */}
                <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Link href={`/portfolio/${project.slug}`} className="block relative">
                    <ParallaxMedia
                      src={project.hero_image}
                      alt={project.title}
                      parallaxSpeed={0.12}
                      aspectRatio="aspect-video"
                      filterMode="cinematic"
                      className="shadow-2xl"
                    />
                    <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-2">
                      <span className="px-3 py-1 bg-[#090B09]/85 backdrop-blur-md border border-[#1C221D] text-[11px] font-mono text-[#72977A] rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Case Study Details with nk.studio Horizontal Title Shift */}
                <div className={`lg:col-span-5 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div>
                    <div className="font-mono text-xs text-[#92968F] uppercase tracking-wider">
                      {project.client_name} · {project.year}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F2F2EC] mt-1 transition-[color,transform] duration-[1.2s] ease-[cubic-bezier(.18,1,.32,1)] group-hover:translate-x-[15px] group-hover:text-[#72977A]">
                      <Link href={`/portfolio/${project.slug}`}>{project.title}</Link>
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#92968F] leading-relaxed">
                    {project.challenge}
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#1C221D]">
                    {project.results.map((res, i) => (
                      <div key={i} className="font-mono">
                        <div className="text-xl sm:text-2xl font-bold text-[#72977A]">{res.value}</div>
                        <div className="text-[10px] text-[#92968F] mt-0.5">{res.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <StudioCta href={`/portfolio/${project.slug}`} variant="underline">
                      VIEW FULL CASE STUDY
                    </StudioCta>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================================
          7. WHY ALTROX — CREATOR BRAND, CREATIVE STUDIO & PLATFORM
          Explaining the 6 pillars serving young audiences across South Asia
          ============================================================================== */}
      <section className="py-28 bg-[#0C100D] border-b border-[#1C221D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1C221D] gap-4">
            <div>
              <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
                / 06 — The Studio Advantage
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-editorial tracking-tight text-[#F2F2EC] mt-2">
                WHY ALTROX?
              </h2>
            </div>
            <p className="font-mono text-xs text-[#92968F] max-w-md leading-relaxed">
              We combine viral content creation, Hollywood-grade production, autonomous AI workflows, and digital learning into a single cohesive platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-[#0E1310] border border-[#1C221D] rounded-xl space-y-4">
              <div className="text-xs font-mono text-[#72977A] font-bold">01 // CREATIVE AGILITY</div>
              <h3 className="text-xl font-bold text-[#F2F2EC]">Short & Long-Form Mastery</h3>
              <p className="text-xs text-[#92968F] leading-relaxed">
                We craft 60-second micro-retention Reels and 10-minute cinematic documentaries designed specifically for 18–30 mobile audiences across South Asia.
              </p>
            </div>

            <div className="p-8 bg-[#0E1310] border border-[#1C221D] rounded-xl space-y-4">
              <div className="text-xs font-mono text-[#72977A] font-bold">02 // VISUAL SCIENCE</div>
              <h3 className="text-xl font-bold text-[#F2F2EC]">3D VFX & AI Video Synthesis</h3>
              <p className="text-xs text-[#92968F] leading-relaxed">
                Photorealistic Cinema 4D and Blender lighting combined with custom LoRA AI video pipelines. Zero uncanny valley, pure cinematic elegance.
              </p>
            </div>

            <div className="p-8 bg-[#0E1310] border border-[#1C221D] rounded-xl space-y-4">
              <div className="text-xs font-mono text-[#72977A] font-bold">03 // SPEED OBSESSION</div>
              <h3 className="text-xl font-bold text-[#F2F2EC]">Sub-Second Mobile Web</h3>
              <p className="text-xs text-[#92968F] leading-relaxed">
                Next.js and WebGL architectures optimized for 4G mobile connections. Rich spatial graphics without layout shifts or battery drain.
              </p>
            </div>

            <div className="p-8 bg-[#0E1310] border border-[#1C221D] rounded-xl space-y-4">
              <div className="text-xs font-mono text-[#72977A] font-bold">04 // SYSTEMS & AUTOMATION</div>
              <h3 className="text-xl font-bold text-[#F2F2EC]">AI Pipelines & Local MCP</h3>
              <p className="text-xs text-[#92968F] leading-relaxed">
                Integrated with our local REA engine, automated video rendering scripts, and CRM bots to eliminate hundreds of manual hours.
              </p>
            </div>

            <div className="p-8 bg-[#0E1310] border border-[#1C221D] rounded-xl space-y-4">
              <div className="text-xs font-mono text-[#72977A] font-bold">05 // PRACTICAL EDUCATION</div>
              <h3 className="text-xl font-bold text-[#F2F2EC]">P-Courses & E-books</h3>
              <p className="text-xs text-[#92968F] leading-relaxed">
                Real skills in Hinglish and simple English. Zero fake income claims or get-rich-quick scams—only actionable frameworks tested on real projects.
              </p>
            </div>

            <div className="p-8 bg-[#0E1310] border border-[#1C221D] rounded-xl space-y-4">
              <div className="text-xs font-mono text-[#72977A] font-bold">06 // COMMUNITY DRIVEN</div>
              <h3 className="text-xl font-bold text-[#F2F2EC]">Active Creator Hubs</h3>
              <p className="text-xs text-[#92968F] leading-relaxed">
                Join our Discord and Telegram collectives where editors, 3D artists, and developers collaborate, share project feedback, and grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================================
          8. THE REA INTELLIGENCE LAB (Local MCP Engine)
          ============================================================================== */}
      <section id="rea-lab" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="mb-12 pb-6 border-b border-[#1C221D]">
          <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
            / 06 — Deep Technology Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-editorial tracking-tight text-[#F2F2EC] mt-2">
            REA INTELLIGENCE LAB
          </h2>
          <p className="text-xs sm:text-sm text-[#92968F] max-w-2xl mt-3 font-mono leading-relaxed">
            ALTROX integrates the local REA (Reverse Engineer Anything) MCP engine to inspect client application bundles, identify memory leaks, and audit digital assets down to the binary level.
          </p>
        </div>

        <ReaTerminal />
      </section>

      {/* ==============================================================================
          8. nk.studio VIDEO FILTERS & MOTION CRAFT LAB
          Interactive video filter switcher, CRT scanlines, and high-retention reels
          ============================================================================== */}
      <VideoFilterShowcase />

      {/* ==============================================================================
          9. HIGH-RETENTION CONTENT & REELS SHOWCASE
          ============================================================================== */}
      <section className="py-28 bg-[#0A0E0B] border-y border-[#1C221D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1C221D] gap-4">
            <div>
              <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
                / 08 — Viral Short-Form Architecture
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-editorial tracking-tight text-[#F2F2EC] mt-2">
                REELS, SHORTS & SHORT FILMS
              </h2>
            </div>
            <StudioCta href="/content" variant="underline">
              VIEW ALL CONTENT
            </StudioCta>
          </div>

          <div className="dim-blur-container grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVideos.map((vid) => (
              <div
                key={vid.id}
                className="dim-blur-card group bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/40 rounded-xl overflow-hidden transition-all duration-500 flex flex-col justify-between"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <ParallaxMedia
                    src={vid.featured_image}
                    alt={vid.title}
                    parallaxSpeed={0.10}
                    aspectRatio="aspect-video"
                    filterMode="cinematic"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors pointer-events-none z-20">
                    <div className="w-12 h-12 rounded-full bg-[#72977A] text-[#090B09] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#090B09]/85 rounded font-mono text-[10px] text-[#72977A] z-20">
                    {vid.type.toUpperCase()} · {vid.reading_time || '60s'}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="text-[10px] font-mono text-[#92968F] uppercase">
                    Featuring {vid.character_featured?.toUpperCase()}
                  </div>
                  <h3 className="font-bold text-base text-[#F2F2EC] group-hover:text-[#72977A] transition-[color,transform] duration-[1.2s] ease-[cubic-bezier(.18,1,.32,1)] group-hover:translate-x-[12px] line-clamp-2">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-[#92968F] line-clamp-2 leading-relaxed">
                    {vid.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================================
          10. MASTERCLASSES & DIGITAL STORE PREVIEW
          ============================================================================== */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Learning Column */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1C221D]">
              <div>
                <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
                  / 09 — Masterclasses
                </span>
                <h3 className="text-2xl font-black text-[#F2F2EC] mt-1">Accelerate Your Skills</h3>
              </div>
              <StudioCta href="/learning" variant="underline">
                ALL COURSES
              </StudioCta>
            </div>

            <div className="space-y-4">
              {SEED_COURSES.map((course) => (
                <Link
                  key={course.id}
                  href={`/learning/${course.slug}`}
                  className="group p-4 bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/40 rounded-lg flex items-center justify-between transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={course.cover_image}
                      alt={course.title}
                      className="w-14 h-14 rounded object-cover border border-[#1C221D]"
                    />
                    <div>
                      <div className="font-bold text-sm text-[#F2F2EC] group-hover:text-[#72977A] transition-colors">
                        {course.title}
                      </div>
                      <div className="text-[11px] font-mono text-[#92968F] mt-0.5">
                        {course.language} · Instructor: {course.instructor_character}
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-[#72977A] font-bold text-sm">${course.price}</div>
                    <div className="text-[10px] text-[#92968F] line-through">${course.original_price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Digital Products Column */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1C221D]">
              <div>
                <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
                  / 10 — Digital Products
                </span>
                <h3 className="text-2xl font-black text-[#F2F2EC] mt-1">P-Courses, E-books & D-products</h3>
              </div>
              <StudioCta href="/store" variant="underline">
                EXPLORE ALL
              </StudioCta>
            </div>

            <div className="space-y-4">
              {SEED_PRODUCTS.map((prod) => (
                <Link
                  key={prod.id}
                  href={`/store`}
                  className="group p-4 bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/40 rounded-lg flex items-center justify-between transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={prod.cover_image}
                      alt={prod.title}
                      className="w-14 h-14 rounded object-cover border border-[#1C221D]"
                    />
                    <div>
                      <div className="font-bold text-sm text-[#F2F2EC] group-hover:text-[#72977A] transition-colors">
                        {prod.title}
                      </div>
                      <div className="text-[11px] font-mono text-[#92968F] mt-0.5">
                        {prod.product_category.toUpperCase()} · {prod.download_count}+ users
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-[#72977A] font-bold text-xs uppercase">{prod.status_label || 'Enquire'}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================================
          11. DIRECT CONTACT & CLIENT BRIEFING SECTION
          ============================================================================== */}
      <section id="contact" className="py-28 bg-[#0B0F0C] border-t border-[#1C221D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
