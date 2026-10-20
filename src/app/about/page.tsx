import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Sparkles, Smartphone, Video, Code, Bot, BookOpen, Users } from 'lucide-react';
import { SEED_CHARACTERS, SEED_SITE_SETTINGS } from '@/data/seed';
import StudioCta from '@/components/ui/StudioCta';

export const metadata = {
  title: 'About ALTROX | Mission, Creative Direction & Brand Collective',
  description: 'ALTROX is a creative digital platform and studio for content creation, video production, AI workflows, web development, and digital learning across South Asia.',
};

export default function AboutPage() {
  const socials = SEED_SITE_SETTINGS.social_links;

  return (
    <div className="bg-[#090B09] text-[#F2F2EC] min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1C221D] pb-12 mb-16">
        <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
          / Who We Are & What We Build
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-editorial tracking-tight text-[#F2F2EC] mt-3">
          CREATIVE CRAFT. <br />
          <span className="text-[#72977A]">FOR THE NEXT GENERATION.</span>
        </h1>
        <p className="mt-6 text-sm sm:text-base text-[#92968F] max-w-3xl font-normal leading-relaxed">
          ALTROX is not just a portfolio—it is an established digital creator brand, creative production studio, and educational platform built for ambitious 18–30 creators and digital businesses across India, Pakistan, Bangladesh, and Nepal.
        </p>
      </div>

      {/* Brand Mission & Core Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs font-mono text-[#72977A] uppercase tracking-wider font-semibold">
            / Mission Statement
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#F2F2EC]">
            Create More. Learn Faster. Build What’s Next.
          </h2>
          <p className="text-xs sm:text-sm text-[#92968F] leading-relaxed">
            The digital world moves fast. For young creators, having basic smartphone and laptop skills is the starting point—but mastering high-retention storytelling, AI-assisted workflows, and modern web presence is what turns an idea into a real digital business.
          </p>
          <p className="text-xs sm:text-sm text-[#92968F] leading-relaxed">
            We don’t believe in false promises of effortless riches or overnight algorithms. We believe in practical craft: editing that respects the viewer’s time, design that commands attention, and technical systems that actually perform on low-bandwidth mobile connections.
          </p>

          <div className="pt-4 border-t border-[#1C221D] text-xs font-mono text-[#72977A]">
            Engineered / Made by Mohammed Atif
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 bg-[#0E1310] border border-[#1C221D] rounded-lg space-y-3">
            <div className="w-9 h-9 rounded bg-[#17221A] text-[#72977A] flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-[#F2F2EC]">Short & Long-Form Content</h3>
            <p className="text-xs text-[#92968F] leading-relaxed">
              From 60-second Reels & Shorts with custom Foley sound design to 10-minute cinematic essays and original comedic sketches.
            </p>
          </div>

          <div className="p-6 bg-[#0E1310] border border-[#1C221D] rounded-lg space-y-3">
            <div className="w-9 h-9 rounded bg-[#17221A] text-[#72977A] flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-[#F2F2EC]">Creative Production & VFX</h3>
            <p className="text-xs text-[#92968F] leading-relaxed">
              Cinema 4D and Blender 3D lighting, camera tracking, particle simulation, and AI video synthesis crafted with human editorial taste.
            </p>
          </div>

          <div className="p-6 bg-[#0E1310] border border-[#1C221D] rounded-lg space-y-3">
            <div className="w-9 h-9 rounded bg-[#17221A] text-[#72977A] flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-[#F2F2EC]">AI Workflows & Automation</h3>
            <p className="text-xs text-[#92968F] leading-relaxed">
              Deploying autonomous LLM agents, local Model Context Protocol tools, and batch render pipelines to cut manual toil.
            </p>
          </div>

          <div className="p-6 bg-[#0E1310] border border-[#1C221D] rounded-lg space-y-3">
            <div className="w-9 h-9 rounded bg-[#17221A] text-[#72977A] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-[#F2F2EC]">Learning & Digital Products</h3>
            <p className="text-xs text-[#92968F] leading-relaxed">
              Practical P-Courses, E-books, and D-products tailored for creators learning Premiere, CapCut, Blender, Next.js, and Meta Ads.
            </p>
          </div>
        </div>
      </div>

      {/* Brand Characters Triad */}
      <div className="border-t border-[#1C221D] pt-16 mb-20">
        <div className="mb-12">
          <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
            / Creative Identity & Characters
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-editorial tracking-tight text-[#F2F2EC] mt-2">
            MEET THE ALTROX CHARACTERS
          </h2>
          <p className="font-mono text-xs text-[#92968F] max-w-2xl mt-2 leading-relaxed">
            Altrox, Thamos, and Chutki represent three creative lenses that appear across our sketches, educational videos, voiceovers, and production workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SEED_CHARACTERS.map((char) => (
            <div
              key={char.id}
              className="p-6 bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/40 rounded-xl space-y-5 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={char.avatar}
                  alt={char.name}
                  className="w-16 h-16 rounded-lg object-cover border border-[#1C221D]"
                />
                <div>
                  <h3 className="text-xl font-bold text-[#F2F2EC]">{char.name}</h3>
                  <div className="text-xs font-mono text-[#72977A]">{char.role}</div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="font-mono text-[#92968F] uppercase text-[10px]">Personality</div>
                  <div className="text-[#F2F2EC] mt-0.5">{char.personality}</div>
                </div>

                <div>
                  <div className="font-mono text-[#92968F] uppercase text-[10px]">Voice Style</div>
                  <div className="text-[#F2F2EC] mt-0.5">{char.voice_style}</div>
                </div>

                <div className="p-3 bg-[#080B09] rounded border border-[#1C221D] font-mono text-[11px] text-[#92968F] italic">
                  &ldquo;{char.dialogue_sample}&rdquo;
                </div>

                <div>
                  <div className="font-mono text-[#92968F] uppercase text-[10px]">Specialty</div>
                  <div className="text-[#72977A] mt-0.5">{char.specialty}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community & Official Destinations */}
      <div className="border-t border-[#1C221D] pt-16">
        <div className="p-8 sm:p-12 bg-[#0E1511] border border-[#1C221D] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
              / Connect With The Collective
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#F2F2EC]">
              Join the ALTROX Creator Community
            </h3>
            <p className="text-xs sm:text-sm text-[#92968F] leading-relaxed">
              Connect with thousands of young digital creators, video editors, and developers across South Asia. Join our Discord community or subscribe to our official channels.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={socials.discord_invite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#72977A] hover:bg-[#55725C] text-[#090B09] font-mono font-bold text-xs uppercase tracking-wider rounded transition-all"
            >
              <span>JOIN DISCORD INVITE</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#17221A] hover:bg-[#202E24] text-[#72977A] border border-[#1C221D] font-mono font-bold text-xs uppercase tracking-wider rounded transition-all"
            >
              <span>TELEGRAM CHANNEL</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
