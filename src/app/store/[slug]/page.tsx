import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Download, ShieldCheck, Star } from 'lucide-react';
import PurchaseButton from '@/components/ui/PurchaseButton';
import { SEED_PRODUCTS } from '@/data/seed';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEED_PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const prod = SEED_PRODUCTS.find(p => p.slug === slug);
  if (!prod) return { title: 'Product Not Found | ALTROX' };

  return {
    title: `${prod.title} | ALTROX Digital Store`,
    description: prod.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const prod = SEED_PRODUCTS.find(p => p.slug === slug);
  if (!prod) notFound();

  return (
    <div className="bg-[#080A09] text-[#F5F7F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back Link */}
      <Link
        href="/store"
        className="inline-flex items-center space-x-2 text-xs font-mono text-[#A2AAA4] hover:text-[#39FF78] mb-12 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO STORE</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Visual Preview */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative aspect-video rounded-lg overflow-hidden border border-[#1A221C] bg-[#0E1310]">
            <img src={prod.cover_image} alt={prod.title} className="w-full h-full object-cover" />
          </div>

          <div className="bg-[#0E1310] border border-[#1A221C] rounded-lg p-8 space-y-4">
            <h2 className="text-xl font-bold font-editorial text-[#F5F7F5]">
              Package Inclusions & Deliverables
            </h2>
            <div className="space-y-3 pt-2">
              {prod.includes.map((inc, i) => (
                <div key={i} className="flex items-center space-x-3 text-sm text-[#F5F7F5]">
                  <CheckCircle2 className="w-4 h-4 text-[#39FF78] shrink-0" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#0E1410] border border-[#1A221C] rounded-lg p-8 space-y-6 sticky top-28 shadow-2xl">
            <div>
              <div className="px-2.5 py-1 bg-[#080A09] border border-[#1A221C] rounded text-[10px] font-mono text-[#39FF78] uppercase inline-block mb-3">
                {prod.type} · Instant Download
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5F7F5]">
                {prod.title}
              </h1>
              <p className="text-xs text-[#A2AAA4] leading-relaxed mt-3">
                {prod.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1A221C]">
              <div className="flex items-baseline space-x-3 font-mono">
                <span className="text-4xl font-black text-[#39FF78]">${prod.price}</span>
                <span className="text-base text-[#A2AAA4] line-through">${prod.original_price}</span>
              </div>
              <div className="text-[11px] font-mono text-[#A2AAA4] mt-1">
                One-time payment · Commercial license for unlimited projects
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#1A221C] text-xs font-mono text-[#F5F7F5]">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#39FF78]" />
                <span>100% Royalty Free Commercial License</span>
              </div>
              <div className="flex items-center space-x-2">
                <Download className="w-4 h-4 text-[#39FF78]" />
                <span>Instant high-speed ZIP archive delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                <span>Rated 4.9/5 by 1,400+ creators</span>
              </div>
            </div>

            <PurchaseButton title={prod.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
