import { MetadataRoute } from 'next';
import { SEED_SERVICES, SEED_PORTFOLIO, SEED_CONTENT, SEED_COURSES, SEED_PRODUCTS } from '@/data/seed';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://altrox.studio';
  const now = new Date();

  // Core Public Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/content`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/learning`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/store`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Dynamic Service Routes (13 services)
  const serviceRoutes: MetadataRoute.Sitemap = SEED_SERVICES.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Portfolio Routes
  const portfolioRoutes: MetadataRoute.Sitemap = SEED_PORTFOLIO.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic Course Routes
  const courseRoutes: MetadataRoute.Sitemap = SEED_COURSES.map((c) => ({
    url: `${baseUrl}/learning/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  // Dynamic Product Routes
  const productRoutes: MetadataRoute.Sitemap = SEED_PRODUCTS.map((prod) => ({
    url: `${baseUrl}/store/${prod.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  // Dynamic Blog Routes (only published items)
  const blogRoutes: MetadataRoute.Sitemap = SEED_CONTENT
    .filter((c) => c.type === 'blog' && c.status === 'published')
    .map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b.updated_at || b.published_at || now),
      changeFrequency: 'monthly',
      priority: 0.75,
    }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...portfolioRoutes,
    ...courseRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];
}
