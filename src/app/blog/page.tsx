import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, Tag } from 'lucide-react';
import { SEED_CONTENT } from '@/data/seed';

export const metadata = {
  title: 'Insights, Technical Analysis & Perspectives | ALTROX Studio',
  description: 'Articles on creative engineering, Three.js WebGL performance, viral video editing frameworks, and REA reverse engineering by ALTROX.',
};

export default function BlogListingPage() {
  const articles = SEED_CONTENT.filter(c => c.type === 'blog' && c.status === 'published');

  return (
    <div className="bg-[#080A09] text-[#F5F7F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1A221C] pb-12 mb-16">
        <span className="font-mono text-xs text-[#39FF78] uppercase tracking-widest font-semibold">
          / Insights & Research
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-editorial tracking-tight text-[#F5F7F5] mt-3">
          IDEAS, BLUEPRINTS <br />
          <span className="text-[#39FF78]">& TECHNICAL DISPATCHES.</span>
        </h1>
        <p className="mt-6 text-sm sm:text-base text-[#A2AAA4] max-w-2xl font-normal leading-relaxed">
          Behind-the-scenes breakdowns of real client builds, WebGL shaders, viral editing psychology, and local REA reverse-engineering workflows.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {articles.map((art) => (
          <Link
            key={art.id}
            href={`/blog/${art.slug}`}
            className="group block bg-[#0E1310] border border-[#1A221C] hover:border-[#39FF78]/40 rounded-lg overflow-hidden transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-[#070908]">
              <img
                src={art.featured_image}
                alt={art.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-2.5 py-1 bg-[#080A09]/80 backdrop-blur border border-[#1A221C] rounded font-mono text-[10px] text-[#39FF78] uppercase">
                By {art.character_featured?.toUpperCase()}
              </div>
            </div>

            <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 text-xs font-mono text-[#A2AAA4]">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#39FF78]" />
                    <span>{art.reading_time || '5 min read'}</span>
                  </span>
                  <span>·</span>
                  <span>{new Date(art.published_at || art.created_at).toLocaleDateString()}</span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-[#F5F7F5] group-hover:text-[#39FF78] transition-colors mt-2">
                  {art.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#A2AAA4] leading-relaxed mt-2 line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1A221C] flex items-center justify-between text-xs font-mono text-[#F5F7F5] group-hover:text-[#39FF78]">
                <span>READ ARTICLE</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
