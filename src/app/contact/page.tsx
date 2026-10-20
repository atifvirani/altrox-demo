import React from 'react';
import ContactForm from '@/components/ui/ContactForm';
import { Mail, Clock, MapPin, Send, Disc, ExternalLink, ArrowUpRight } from 'lucide-react';
import { SEED_SITE_SETTINGS } from '@/data/seed';

export const metadata = {
  title: 'Contact & Project Inquiries | ALTROX Studio',
  description: 'Initiate a creative collaboration with ALTROX. Email: ag1152409@gmail.com. Offices and hubs across New Delhi, Mumbai, Dhaka, and Kathmandu.',
};

export default function ContactPage() {
  const socials = SEED_SITE_SETTINGS.social_links;

  return (
    <div className="bg-[#090B09] text-[#F2F2EC] min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1C221D] pb-12 mb-16">
        <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
          / Direct Access & Inquiries
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-editorial tracking-tight text-[#F2F2EC] mt-3">
          LET’S TALK ABOUT <br />
          <span className="text-[#72977A]">WHAT YOU’RE BUILDING.</span>
        </h1>
        <p className="mt-6 text-sm sm:text-base text-[#92968F] max-w-2xl font-normal leading-relaxed">
          Whether you need high-retention video production, 3D CGI key art, AI-powered automation, or a complete digital brand upgrade. Fill in the briefing portal below or connect directly across our official platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Briefing Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Studio Direct Directory & Community Channels */}
        <div className="lg:col-span-5 space-y-6 font-mono text-xs">
          {/* Direct Lines */}
          <div className="p-8 bg-[#0E1310] border border-[#1C221D] rounded-xl space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#72977A]">
              Official Contact Lines
            </h3>

            <div className="space-y-4 text-[#92968F]">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#72977A] shrink-0" />
                <a href="mailto:ag1152409@gmail.com" className="text-[#F2F2EC] hover:underline font-bold">
                  ag1152409@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-[#72977A] shrink-0" />
                <span>Response Window: Within 4 Hours</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#72977A] shrink-0" />
                <span>Serving Creators Across South Asia</span>
              </div>
            </div>
          </div>

          {/* Connect Me Community Links */}
          <div className="p-8 bg-[#0E1310] border border-[#1C221D] rounded-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#72977A]">
              Community & Connect Me
            </h3>
            <p className="text-xs text-[#92968F] leading-relaxed">
              Join our active community discussions or reach out directly via Telegram and Discord.
            </p>

            <div className="space-y-2 pt-2">
              <a
                href={socials.discord_invite}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 bg-[#121613] hover:bg-[#1A221C] border border-[#1C221D] hover:border-[#72977A]/50 rounded transition-colors"
              >
                <span className="text-[#F2F2EC] font-bold">Discord Direct Invite</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#72977A]" />
              </a>

              <a
                href={socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 bg-[#121613] hover:bg-[#1A221C] border border-[#1C221D] hover:border-[#72977A]/50 rounded transition-colors"
              >
                <span className="text-[#F2F2EC] font-bold">Telegram Channel (@altrox1x)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#72977A]" />
              </a>

              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 bg-[#121613] hover:bg-[#1A221C] border border-[#1C221D] hover:border-[#72977A]/50 rounded transition-colors"
              >
                <span className="text-[#F2F2EC] font-bold">Instagram (@altroxreal)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#72977A]" />
              </a>
            </div>
          </div>

          {/* Regional Hubs & Credit */}
          <div className="p-6 bg-[#0E1310] border border-[#1C221D] rounded-xl space-y-3">
            <div className="text-[10px] text-[#72977A] uppercase font-bold tracking-wider">
              Regional Operations
            </div>
            <div className="text-xs text-[#F2F2EC]">
              New Delhi · Mumbai · Dhaka · Kathmandu
            </div>
            <div className="pt-3 border-t border-[#1C221D] text-[11px] text-[#92968F]">
              Engineered / Made by <strong className="text-[#F2F2EC]">Mohammed Atif</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
