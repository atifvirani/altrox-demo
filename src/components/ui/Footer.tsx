'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { SEED_SITE_SETTINGS } from '@/data/seed';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const socials = SEED_SITE_SETTINGS.social_links;

  return (
    <footer className="w-full bg-[#090B09] border-t border-[#1C221D] pt-20 pb-12 text-[#F2F2EC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Massive Call To Action Header */}
        <div className="pb-16 border-b border-[#1C221D]">
          <div className="text-xs font-mono text-[#72977A] tracking-widest uppercase mb-4 font-semibold">
            / Have a vision that demands excellence?
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-editorial tracking-tight leading-none text-[#F2F2EC]">
                CREATE MORE. <br />
                <span className="text-[#72977A]">BUILD WHAT’S NEXT.</span>
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-[#92968F] font-mono max-w-xl leading-relaxed">
                ALTROX is a creative digital platform for content, design, video production, AI-powered workflows, web development, and digital learning.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-[#72977A] hover:bg-[#55725C] text-[#090B09] font-mono font-bold text-sm tracking-wider uppercase rounded transition-all duration-300 w-fit shrink-0"
            >
              <span>DISCUSS YOUR PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Official Platforms & Social Channels Matrix */}
        <div className="py-12 border-b border-[#1C221D]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <span className="text-xs font-mono text-[#72977A] uppercase tracking-widest font-semibold">
              / Official ALTROX Platforms & Community Hubs
            </span>
            <div className="text-xs font-mono text-[#92968F]">
              Direct Contact: <a href="mailto:ag1152409@gmail.com" className="text-[#F2F2EC] hover:underline">ag1152409@gmail.com</a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs font-mono">
            <a
              href={socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/50 rounded flex items-center justify-between group transition-colors"
            >
              <span className="text-[#F2F2EC] group-hover:text-[#72977A]">YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#92968F] group-hover:text-[#72977A]" />
            </a>
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/50 rounded flex items-center justify-between group transition-colors"
            >
              <span className="text-[#F2F2EC] group-hover:text-[#72977A]">Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#92968F] group-hover:text-[#72977A]" />
            </a>
            <a
              href={socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/50 rounded flex items-center justify-between group transition-colors"
            >
              <span className="text-[#F2F2EC] group-hover:text-[#72977A]">Facebook</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#92968F] group-hover:text-[#72977A]" />
            </a>
            <a
              href={socials.threads}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/50 rounded flex items-center justify-between group transition-colors"
            >
              <span className="text-[#F2F2EC] group-hover:text-[#72977A]">Threads</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#92968F] group-hover:text-[#72977A]" />
            </a>
            <a
              href={socials.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/50 rounded flex items-center justify-between group transition-colors"
            >
              <span className="text-[#F2F2EC] group-hover:text-[#72977A]">Pinterest</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#92968F] group-hover:text-[#72977A]" />
            </a>
            <a
              href={socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/50 rounded flex items-center justify-between group transition-colors"
            >
              <span className="text-[#F2F2EC] group-hover:text-[#72977A]">Telegram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#92968F] group-hover:text-[#72977A]" />
            </a>
            <a
              href={socials.discord_directory}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/50 rounded flex items-center justify-between group transition-colors"
            >
              <span className="text-[#F2F2EC] group-hover:text-[#72977A]">Discord</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#92968F] group-hover:text-[#72977A]" />
            </a>
          </div>
        </div>

        {/* Main Footer Navigation & Character Badges */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-16 border-b border-[#1C221D]">
          {/* Brand & Newsletter Column */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-1.5 focus:outline-none">
              <span className="font-mono text-2xl font-bold text-[#72977A]">/</span>
              <span className="font-sans text-2xl font-black text-[#F2F2EC]">ALTROX</span>
              <span className="text-[10px] font-mono text-[#92968F]">®</span>
            </Link>
            <p className="text-xs text-[#92968F] leading-relaxed max-w-sm">
              Established digital creator brand, creative studio, and digital business platform serving young audiences across India, Pakistan, Bangladesh, and Nepal.
            </p>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <div className="text-xs font-mono text-[#F2F2EC] uppercase tracking-wider">
                Subscribe to /altrox.dispatch
              </div>
              <div className="flex max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  required
                  className="flex-1 bg-[#121613] border border-[#1C221D] px-3.5 py-2.5 text-xs text-[#F2F2EC] placeholder-[#666] focus:outline-none focus:border-[#72977A] font-mono rounded-l"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#1A221C] hover:bg-[#72977A] text-[#72977A] hover:text-[#090B09] font-mono text-xs font-bold rounded-r border-y border-r border-[#1C221D] transition-colors"
                >
                  JOIN
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center space-x-1 text-xs text-[#72977A] font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed to ALTROX dispatch.</span>
                </div>
              )}
            </form>
          </div>

          {/* Links: Services */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#72977A] uppercase tracking-wider">Services</div>
            <ul className="space-y-2 text-xs font-mono text-[#92968F]">
              <li><Link href="/services#graphic-design" className="hover:text-[#F2F2EC] transition-colors">Graphic Design</Link></li>
              <li><Link href="/services/poster-design" className="hover:text-[#F2F2EC] transition-colors">Poster & Banner Design</Link></li>
              <li><Link href="/services/logo-design" className="hover:text-[#F2F2EC] transition-colors">Logo & Brand Identity</Link></li>
              <li><Link href="/services/thumbnail-design" className="hover:text-[#F2F2EC] transition-colors">YouTube Thumbnails</Link></li>
              <li><Link href="/services#video-production" className="hover:text-[#F2F2EC] transition-colors">Reels, Shorts & Video</Link></li>
              <li><Link href="/services/vfx-and-cgi" className="hover:text-[#F2F2EC] transition-colors">VFX, CGI & AI Video</Link></li>
              <li><Link href="/services#marketing-tech" className="hover:text-[#F2F2EC] transition-colors">Meta Ads & AI Automation</Link></li>
              <li><Link href="/services/web-development" className="hover:text-[#F2F2EC] transition-colors">Web Development</Link></li>
            </ul>
          </div>

          {/* Links: Explore */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#72977A] uppercase tracking-wider">Explore</div>
            <ul className="space-y-2 text-xs font-mono text-[#92968F]">
              <li><Link href="/about" className="hover:text-[#F2F2EC] transition-colors">About ALTROX</Link></li>
              <li><Link href="/portfolio" className="hover:text-[#F2F2EC] transition-colors">Selected Work</Link></li>
              <li><Link href="/content" className="hover:text-[#F2F2EC] transition-colors">Content & Skits</Link></li>
              <li><Link href="/learning" className="hover:text-[#F2F2EC] transition-colors">Courses & Classes</Link></li>
              <li><Link href="/store" className="hover:text-[#F2F2EC] transition-colors">P-Courses, E-books, D-Products</Link></li>
              <li><a href="https://sites.google.com/view/altroxreal/home" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2F2EC] transition-colors">Original Google Site ↗</a></li>
            </ul>
          </div>

          {/* Brand Characters & CMS */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#72977A] uppercase tracking-wider">Brand Collective</div>
            <ul className="space-y-2 text-xs font-mono text-[#92968F]">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#72977A]" />
                <span className="text-[#F2F2EC]">Altrox</span>
                <span className="text-[10px] text-[#92968F]/60">(Tech & Systems)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#72977A]" />
                <span className="text-[#F2F2EC]">Thamos</span>
                <span className="text-[10px] text-[#92968F]/60">(3D & VFX)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#72977A]" />
                <span className="text-[#F2F2EC]">Chutki</span>
                <span className="text-[10px] text-[#92968F]/60">(Viral Narrative)</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-[#1C221D]">
              <Link
                href="/admin"
                className="flex items-center space-x-1.5 text-[11px] font-mono text-[#92968F] hover:text-[#72977A] transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Control Room CMS</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#92968F] gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-1">
            <span>© 2026 ALTROX ®. All rights reserved.</span>
            <span className="hidden sm:inline text-[#1C221D]">|</span>
            <span className="text-[#72977A] font-semibold">Engineered / Made by Mohammed Atif</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-[#F2F2EC]">About</Link>
            <Link href="/contact" className="hover:text-[#F2F2EC]">Contact</Link>
            <Link href="/privacy" className="hover:text-[#F2F2EC]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#F2F2EC]">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-[#F2F2EC]">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
