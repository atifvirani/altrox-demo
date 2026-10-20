import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';
import { SEED_CONTENT, SEED_CHARACTERS } from '@/data/seed';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEED_CONTENT.filter(c => c.type === 'blog').map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = SEED_CONTENT.find(c => c.slug === slug);
  if (!article) return { title: 'Article Not Found | ALTROX' };

  return {
    title: `${article.seo_title || article.title} | ALTROX Insights`,
    description: article.seo_description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.featured_image }],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = SEED_CONTENT.find(c => c.slug === slug);
  if (!article) notFound();

  const authorCharacter = SEED_CHARACTERS.find(c => c.id === article.character_featured) || SEED_CHARACTERS[0];

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: `https://altrox.studio${article.featured_image}`,
    author: {
      '@type': 'Person',
      name: authorCharacter.name,
      jobTitle: authorCharacter.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ALTROX Studio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://altrox.studio/assets/hero-3d-monolith.jpg',
      },
    },
    datePublished: article.published_at || article.created_at,
    dateModified: article.updated_at || article.created_at,
  };

  return (
    <article className="bg-[#080A09] text-[#F5F7F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center space-x-2 text-xs font-mono text-[#A2AAA4] hover:text-[#39FF78] mb-12 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO ALL INSIGHTS</span>
      </Link>

      {/* Header */}
      <div className="space-y-6 pb-8 border-b border-[#1A221C]">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#A2AAA4]">
          <span className="text-[#39FF78] uppercase font-semibold">/ Engineering Dispatch</span>
          <span>·</span>
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.reading_time || '5 min read'}</span>
          </span>
          <span>·</span>
          <span className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-editorial tracking-tight text-[#F5F7F5] leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-[#A2AAA4] font-normal leading-relaxed">
          {article.excerpt}
        </p>

        {/* Author Byline */}
        <div className="flex items-center space-x-4 pt-4">
          <img src={authorCharacter.avatar} alt={authorCharacter.name} className="w-12 h-12 rounded-full object-cover border border-[#1A221C]" />
          <div>
            <div className="font-bold text-sm text-[#F5F7F5]">{authorCharacter.name}</div>
            <div className="text-xs font-mono text-[#39FF78]">{authorCharacter.role}</div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="my-10 aspect-video w-full rounded-lg overflow-hidden border border-[#1A221C]">
        <img src={article.featured_image} alt={article.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Body */}
      <div className="prose prose-invert max-w-none text-[#F5F7F5] text-sm sm:text-base leading-relaxed space-y-6 font-sans">
        <div className="whitespace-pre-wrap leading-relaxed text-[#A2AAA4]">
          {article.body}
        </div>
      </div>

      {/* Tag Footer */}
      <div className="mt-16 pt-8 border-t border-[#1A221C] flex flex-wrap gap-2 font-mono text-xs">
        {article.tags?.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-[#0E1310] border border-[#1A221C] text-[#39FF78] rounded">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
