'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Layers, Sparkles, Star, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import { SEED_PRODUCTS } from '@/data/seed';
import StudioCta from '@/components/ui/StudioCta';

export default function DigitalProductsPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'p-courses' | 'ebooks' | 'd-products'>('all');

  const filteredProducts = activeCategory === 'all'
    ? SEED_PRODUCTS
    : SEED_PRODUCTS.filter((p) => p.product_category === activeCategory);

  const CATEGORIES = [
    { id: 'all', label: 'All Digital Products', icon: Sparkles },
    { id: 'p-courses', label: 'P-Courses', icon: BookOpen },
    { id: 'ebooks', label: 'E-books', icon: BookOpen },
    { id: 'd-products', label: 'D-products', icon: Layers },
  ];

  return (
    <div className="bg-[#090B09] text-[#F2F2EC] min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1C221D] pb-12 mb-12">
        <span className="font-mono text-xs text-[#72977A] uppercase tracking-widest font-semibold">
          / Digital Products & Learning Assets
        </span>
        <h1 className="text-4xl sm:text-6xl font-black font-editorial tracking-tight text-[#F2F2EC] mt-3">
          DIGITAL PRODUCTS, <br />
          <span className="text-[#72977A]">P-COURSES & E-BOOKS.</span>
        </h1>
        <p className="mt-6 text-sm sm:text-base text-[#92968F] max-w-2xl font-normal leading-relaxed">
          Structured digital tools built for young creators, editors, and digital agencies across South Asia. Products are available via direct enquiry, preview, or pre-registration.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 pb-8 border-b border-[#1C221D] mb-12 font-mono text-xs">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded transition-all border ${
                isActive
                  ? 'bg-[#72977A] text-[#090B09] border-[#72977A] font-bold shadow-[0_0_15px_rgba(114,151,122,0.25)]'
                  : 'bg-[#0E1310] text-[#92968F] border-[#1C221D] hover:border-[#72977A]/40 hover:text-[#F2F2EC]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="group bg-[#0E1310] border border-[#1C221D] hover:border-[#72977A]/50 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Product Cover Preview */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#070908]">
                <img
                  src={prod.cover_image}
                  alt={prod.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#090B09]/85 backdrop-blur border border-[#1C221D] rounded font-mono text-[10px] text-[#72977A] uppercase font-semibold">
                  {prod.product_category === 'p-courses' ? 'P-Course' : prod.product_category === 'ebooks' ? 'E-book' : 'D-Product'}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#090B09]/85 backdrop-blur border border-[#1C221D] rounded font-mono text-[10px] text-[#F2F2EC]">
                  {prod.status_label || 'Available'}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#92968F]">
                  <span className="flex items-center text-[#72977A]">
                    <Star className="w-3.5 h-3.5 fill-current mr-1 text-amber-400" />
                    <span>{prod.rating || 4.9}</span>
                  </span>
                  <span>{prod.download_count}+ students & users</span>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-[#F2F2EC] group-hover:text-[#72977A] transition-colors">
                  {prod.title}
                </h2>
                <p className="text-xs text-[#92968F] leading-relaxed line-clamp-3">
                  {prod.description}
                </p>

                {/* Inclusions */}
                <div className="pt-3 border-t border-[#1C221D] space-y-1.5">
                  <div className="text-[10px] font-mono text-[#72977A] uppercase font-semibold">
                    Product Inclusions:
                  </div>
                  {prod.includes.map((inc, i) => (
                    <div key={i} className="flex items-start space-x-1.5 text-xs text-[#92968F]">
                      <CheckCircle2 className="w-3 h-3 text-[#72977A] shrink-0 mt-0.5" />
                      <span className="truncate">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Honest Action Button (Enquiry / Request Access / Early State) */}
            <div className="p-6 pt-0">
              <div className="pt-4 border-t border-[#1C221D] flex items-center justify-between">
                <div className="text-xs font-mono text-[#72977A]">
                  Direct Access
                </div>
                <Link
                  href={`/contact?service=${encodeURIComponent(prod.title)}`}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#72977A] hover:bg-[#55725C] text-[#090B09] font-mono font-bold text-xs uppercase tracking-wider rounded transition-colors"
                >
                  <span>REQUEST ACCESS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notice on Digital Products & Delivery */}
      <div className="mt-16 p-6 bg-[#0E1310] border border-[#1C221D] rounded-lg text-center font-mono text-xs text-[#92968F] max-w-3xl mx-auto space-y-2">
        <div className="text-[#72977A] font-bold uppercase tracking-wider">
          Transparent Product Delivery & Access Policy
        </div>
        <p className="leading-relaxed">
          ALTROX provides access to courses, e-books, and digital presets directly to learners via email and private community links upon confirmation. We do not use automated third-party paywalls that fail on South Asian payment gateways.
        </p>
      </div>
    </div>
  );
}
