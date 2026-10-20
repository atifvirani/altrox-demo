import { createClient } from '@supabase/supabase-js';
import {
  SEED_SERVICES,
  SEED_PORTFOLIO,
  SEED_CONTENT,
  SEED_COURSES,
  SEED_PRODUCTS,
  SEED_INQUIRIES,
  SEED_SCRIPTS,
  SEED_SITE_SETTINGS,
} from '@/data/seed';
import {
  ServiceItem,
  PortfolioProject,
  ContentItem,
  CourseItem,
  ProductItem,
  ContactInquiry,
  VideoScript,
  SiteSettings,
} from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  !supabaseUrl.includes('your-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Universal In-Memory & Local Storage Store
 * Provides instantaneous fallback and admin session state persistence
 */
class AltroxDataStore {
  private services: ServiceItem[] = [...SEED_SERVICES];
  private portfolio: PortfolioProject[] = [...SEED_PORTFOLIO];
  private content: ContentItem[] = [...SEED_CONTENT];
  private courses: CourseItem[] = [...SEED_COURSES];
  private products: ProductItem[] = [...SEED_PRODUCTS];
  private inquiries: ContactInquiry[] = [...SEED_INQUIRIES];
  private scripts: VideoScript[] = [...SEED_SCRIPTS];
  private settings: SiteSettings = { ...SEED_SITE_SETTINGS };

  // Services
  getServices(): ServiceItem[] {
    return this.services.filter(s => s.is_active);
  }
  getAllServices(): ServiceItem[] {
    return [...this.services];
  }
  getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.services.find(s => s.slug === slug);
  }

  // Portfolio
  getPortfolio(): PortfolioProject[] {
    return [...this.portfolio];
  }
  getPortfolioBySlug(slug: string): PortfolioProject | undefined {
    return this.portfolio.find(p => p.slug === slug);
  }

  // Content (Blog, Videos, Reels, Skits)
  getContent(type?: string): ContentItem[] {
    const published = this.content.filter(c => c.status === 'published');
    if (type) {
      return published.filter(c => c.type === type);
    }
    return published;
  }
  getAllContent(): ContentItem[] {
    return [...this.content];
  }
  getContentBySlug(slug: string): ContentItem | undefined {
    return this.content.find(c => c.slug === slug);
  }
  saveContent(item: Partial<ContentItem> & { title: string; body: string }): ContentItem {
    const existingIndex = item.id ? this.content.findIndex(c => c.id === item.id) : -1;
    if (existingIndex >= 0) {
      const updated: ContentItem = {
        ...this.content[existingIndex],
        ...item,
        updated_at: new Date().toISOString(),
      };
      this.content[existingIndex] = updated;
      return updated;
    } else {
      const newContent: ContentItem = {
        id: `cnt-${Date.now()}`,
        title: item.title,
        slug: item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        type: item.type || 'blog',
        status: item.status || 'draft',
        excerpt: item.excerpt || item.body.slice(0, 160),
        body: item.body,
        featured_image: item.featured_image || '/assets/hero-3d-monolith.jpg',
        reading_time: item.reading_time || '4 min read',
        duration_seconds: item.duration_seconds,
        aspect_ratio: item.aspect_ratio || '16:9',
        video_url: item.video_url,
        character_featured: item.character_featured || 'altrox',
        is_featured: item.is_featured || false,
        published_at: item.status === 'published' ? new Date().toISOString() : undefined,
        scheduled_for: item.scheduled_for,
        seo_title: item.seo_title || item.title,
        seo_description: item.seo_description || item.excerpt,
        tags: item.tags || ['ALTROX', 'CreativeTech'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      this.content.unshift(newContent);
      return newContent;
    }
  }
  deleteContent(id: string): boolean {
    const initialLen = this.content.length;
    this.content = this.content.filter(c => c.id !== id);
    return this.content.length < initialLen;
  }

  // Courses
  getCourses(): CourseItem[] {
    return this.courses.filter(c => c.is_published);
  }
  getCourseBySlug(slug: string): CourseItem | undefined {
    return this.courses.find(c => c.slug === slug);
  }

  // Products
  getProducts(): ProductItem[] {
    return this.products.filter(p => p.is_published);
  }
  getProductBySlug(slug: string): ProductItem | undefined {
    return this.products.find(p => p.slug === slug);
  }

  // Inquiries
  getInquiries(): ContactInquiry[] {
    return [...this.inquiries];
  }
  addInquiry(data: Omit<ContactInquiry, 'id' | 'status' | 'is_spam' | 'created_at'>): ContactInquiry {
    const isSpam =
      data.message.includes('viagra') ||
      data.message.includes('crypto guarantee') ||
      data.email.endsWith('@tempmail.com');

    const newInquiry: ContactInquiry = {
      id: `inq-${Date.now()}`,
      ...data,
      status: 'new',
      is_spam: isSpam,
      created_at: new Date().toISOString(),
    };
    this.inquiries.unshift(newInquiry);
    return newInquiry;
  }
  updateInquiryStatus(id: string, status: ContactInquiry['status']): boolean {
    const item = this.inquiries.find(i => i.id === id);
    if (item) {
      item.status = status;
      return true;
    }
    return false;
  }

  // Scripts (Script Studio)
  getScripts(): VideoScript[] {
    return [...this.scripts];
  }
  saveScript(script: Partial<VideoScript> & { title: string }): VideoScript {
    const existingIndex = script.id ? this.scripts.findIndex(s => s.id === script.id) : -1;
    if (existingIndex >= 0) {
      const updated = {
        ...this.scripts[existingIndex],
        ...script,
        updated_at: new Date().toISOString(),
      };
      this.scripts[existingIndex] = updated;
      return updated;
    } else {
      const newScript: VideoScript = {
        id: `scp-${Date.now()}`,
        title: script.title,
        description: script.description || '',
        duration: script.duration || '1m',
        aspect_ratio: script.aspect_ratio || '9:16',
        language: script.language || 'Hinglish',
        character: script.character || 'Altrox',
        scene_breakdown: script.scene_breakdown || [],
        dialogue: script.dialogue || '',
        voiceover: script.voiceover || '',
        sound_effects: script.sound_effects || '',
        background_music: script.background_music || '',
        thumbnail_concept: script.thumbnail_concept || '',
        production_notes: script.production_notes || '',
        status: script.status || 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      this.scripts.unshift(newScript);
      return newScript;
    }
  }
  deleteScript(id: string): boolean {
    const len = this.scripts.length;
    this.scripts = this.scripts.filter(s => s.id !== id);
    return this.scripts.length < len;
  }

  // Settings
  getSettings(): SiteSettings {
    return { ...this.settings };
  }
  updateSettings(newSettings: Partial<SiteSettings>): SiteSettings {
    this.settings = { ...this.settings, ...newSettings };
    return { ...this.settings };
  }
}

// Global singleton instance
export const db = new AltroxDataStore();
