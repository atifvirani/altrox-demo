'use client';

import React, { useState } from 'react';
import { Play, Sparkles, Smartphone, Video, BookOpen, Layers, ArrowUpRight, Music, Mic, MessageSquare, ChevronDown, ChevronUp, Share2, ExternalLink } from 'lucide-react';
import { SEED_CONTENT, SEED_COURSES } from '@/data/seed';
import { ContentItem } from '@/lib/types';
import StudioCta from '@/components/ui/StudioCta';

export default function ContentShowcasePage() {
  const [activeFormat, setActiveFormat] = useState<'all' | 'short_form' | 'video_film' | 'course_class'>('all');
  const [activeSceneType, setActiveSceneType] = useState<string>('all');
  const [expandedMetadataId, setExpandedMetadataId] = useState<string | null>(null);

  const filteredContent = SEED_CONTENT.filter((item) => {
    const matchesFormat = activeFormat === 'all' || item.format_category === activeFormat;
    const matchesScene = activeSceneType === 'all' || item.scene_type === activeSceneType;
    return matchesFormat && matchesScene;
  });

  const toggleMetadata = (id: string) => {
    setExpandedMetadataId(expandedMetadataId === id ? null : id);
  };

  const FORMAT_TABS = [
    { id: 'all', label: 'All Content', icon: Sparkles },
    { id: 'short_form', label: 'Short-Form (1 Min · 9:16 Vertical)', icon: Smartphone },
    { id: 'video_film', label: 'Videos & Films (~10 Min · 16:9 / 1:1)', icon: Video },
    { id: 'course_class', label: 'Courses & Classes (~60 Min)', icon: BookOpen },
  ];

  const SCENE_TYPES = ['all', 'Meme', 'Reaction', 'Act', 'Recording'];

  return (
    <div className="bg-[#090B09] text-[#F2F2EC] min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1C221D] pb-12 mb-12">
        <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
          / Content Discovery & Video Architecture
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-editorial tracking-tight text-[#F2F2EC] mt-3">
          ORIGINAL CONTENT, <br />
          <span className="text-[#72977A]">REELS & SHORT FILMS.</span>
        </h1>
        <p className="mt-6 text-sm sm:text-base text-[#92968F] max-w-2xl font-normal leading-relaxed">
          Discover ALTROX’s 3 primary creative formats: 1-minute high-retention Reels & Shorts, ~10-minute cinematic videos & breakdowns, and ~60-minute structured masterclasses. Each piece features complete production metadata.
        </p>
      </div>

      {/* Primary Format Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-6 border-b border-[#1C221D] mb-6 font-mono text-xs">
        {FORMAT_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFormat === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFormat(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded transition-all border ${
                isActive
                  ? 'bg-[#72977A] text-[#090B09] border-[#72977A] font-bold shadow-[0_0_15px_rgba(114,151,122,0.25)]'
                  : 'bg-[#0E1310] text-[#92968F] border-[#1C221D] hover:border-[#72977A]/40 hover:text-[#F2F2EC]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Scene Type Filters */}
      <div className="flex items-center space-x-2 pb-8 mb-12 overflow-x-auto text-xs font-mono">
        <span className="text-[#92968F] pr-2">Scene Filter:</span>
        {SCENE_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setActiveSceneType(type)}
            className={`px-3 py-1 rounded border transition-colors ${
              activeSceneType === type
                ? 'bg-[#17221A] text-[#72977A] border-[#72977A]'
                : 'bg-[#0E1310] text-[#92968F] border-[#1C221D] hover:text-[#F2F2EC]'
            }`}
          >
            {type === 'all' ? 'All Types' : type}
          </button>
        ))}
      </div>

      {/* Dynamic Adaptive Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredContent.map((item) => {
          const is916 = item.aspect_ratio === '9:16';
          const isExpanded = expandedMetadataId === item.id;

          return (
            <div
              key={item.id}
              className={`group bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/40 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                is916 ? 'row-span-1' : ''
              }`}
            >
              {/* Responsive Aspect Ratio Media Container */}
              <div
                className={`relative w-full overflow-hidden bg-black ${
                  is916 ? 'aspect-[9/14] sm:aspect-[9/15]' : item.aspect_ratio === '1:1' ? 'aspect-square' : 'aspect-video'
                }`}
              >
                <img
                  src={item.featured_image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Play Action Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <a
                    href={item.video_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-[#72977A] text-[#090B09] flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110"
                    aria-label={`Play ${item.title}`}
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </a>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span className="px-2.5 py-1 bg-[#090B09]/85 backdrop-blur border border-[#1C221D] rounded font-mono text-[10px] text-[#72977A] uppercase">
                    {item.format_category === 'short_form' ? '1 Min' : item.format_category === 'video_film' ? '~10 Min' : '~60 Min'}
                  </span>
                  {item.scene_type && (
                    <span className="px-2.5 py-1 bg-[#090B09]/85 backdrop-blur border border-[#1C221D] rounded font-mono text-[10px] text-[#F2F2EC]">
                      {item.scene_type}
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#090B09]/85 backdrop-blur border border-[#1C221D] rounded font-mono text-[10px] text-[#92968F]">
                  Ratio: {item.aspect_ratio}
                </div>
              </div>

              {/* Content Description */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-[#92968F] uppercase">
                    <span>Featuring: <strong className="text-[#72977A]">{item.character_featured}</strong></span>
                    <span>·</span>
                    <span>{new Date(item.published_at || item.created_at).toLocaleDateString()}</span>
                  </div>

                  <h2 className="text-xl font-bold tracking-tight text-[#F2F2EC] group-hover:text-[#72977A] transition-colors mt-2">
                    {item.title}
                  </h2>
                  <p className="text-xs text-[#92968F] leading-relaxed mt-2 line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>

                {/* Production Metadata Toggle Button */}
                <div className="pt-4 border-t border-[#1C221D]">
                  <button
                    onClick={() => toggleMetadata(item.id)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-[#121613] hover:bg-[#1A221C] border border-[#1C221D] rounded text-xs font-mono text-[#72977A] transition-colors"
                  >
                    <span>{isExpanded ? 'Hide Production Metadata' : 'View Production Metadata'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {/* Expandable Reusable Metadata Drawer */}
                  {isExpanded && (
                    <div className="mt-4 p-4 bg-[#080B09] border border-[#1C221D] rounded-lg space-y-3.5 font-mono text-xs animate-in fade-in duration-200">
                      {item.dialogue && (
                        <div>
                          <div className="flex items-center space-x-1.5 text-[10px] text-[#72977A] uppercase font-bold">
                            <MessageSquare className="w-3 h-3" />
                            <span>Scripted Dialogue / Spoken Lines</span>
                          </div>
                          <div className="text-[11px] text-[#F2F2EC] mt-1 whitespace-pre-line bg-[#0E1310] p-2.5 rounded border border-[#1C221D]/60 leading-relaxed">
                            {item.dialogue}
                          </div>
                        </div>
                      )}

                      {item.voiceover && (
                        <div>
                          <div className="flex items-center space-x-1.5 text-[10px] text-[#72977A] uppercase font-bold">
                            <Mic className="w-3 h-3" />
                            <span>Voiceover Narration</span>
                          </div>
                          <div className="text-[11px] text-[#92968F] mt-1 bg-[#0E1310] p-2 rounded border border-[#1C221D]/60">
                            {item.voiceover}
                          </div>
                        </div>
                      )}

                      {item.sfx_and_bgm && (
                        <div>
                          <div className="flex items-center space-x-1.5 text-[10px] text-[#72977A] uppercase font-bold">
                            <Music className="w-3 h-3" />
                            <span>SFX & Background Music</span>
                          </div>
                          <div className="text-[11px] text-[#92968F] mt-1 bg-[#0E1310] p-2 rounded border border-[#1C221D]/60">
                            {item.sfx_and_bgm}
                          </div>
                        </div>
                      )}

                      {item.connect_me && (
                        <div className="pt-2 border-t border-[#1C221D]">
                          <div className="text-[10px] text-[#92968F] uppercase mb-1.5 font-bold">
                            Connect Me
                          </div>
                          <div className="flex flex-wrap gap-2 text-[11px]">
                            {item.connect_me.instagram && (
                              <a
                                href={item.connect_me.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 bg-[#17221A] text-[#72977A] hover:underline rounded flex items-center space-x-1"
                              >
                                <span>Instagram</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                            {item.connect_me.telegram && (
                              <a
                                href={item.connect_me.telegram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 bg-[#17221A] text-[#72977A] hover:underline rounded flex items-center space-x-1"
                              >
                                <span>Telegram</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                            {item.connect_me.discord && (
                              <a
                                href={item.connect_me.discord}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 bg-[#17221A] text-[#72977A] hover:underline rounded flex items-center space-x-1"
                              >
                                <span>Discord Invite</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {item.tags?.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-[#121613] text-[#92968F] rounded border border-[#1C221D]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Courses Callout Section */}
      <div className="mt-20 p-8 sm:p-12 bg-[#0E1511] border border-[#1C221D] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
            / Structured 60-Minute Learning
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#F2F2EC]">
            Looking for structured lessons?
          </h3>
          <p className="text-xs sm:text-sm text-[#92968F] leading-relaxed">
            Step beyond short-form clips. Explore full courses and classes covering video retention, Premiere/CapCut workflows, Blender 3D lighting, and Next.js web development.
          </p>
        </div>

        <StudioCta href="/learning" variant="primary">
          EXPLORE MASTERCLASSES
        </StudioCta>
      </div>
    </div>
  );
}
