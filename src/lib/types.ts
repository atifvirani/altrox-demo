export type ContentType = 'blog' | 'reel' | 'video' | 'tutorial' | 'skit' | 'landing';
export type PublishingStatus = 'draft' | 'scheduled' | 'published' | 'archived';
export type CharacterId = 'altrox' | 'thamos' | 'chutki' | 'ensemble';

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  role: 'admin' | 'editor' | 'creator';
  bio?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  alt_text?: string;
  file_name: string;
  file_url: string;
  mime_type?: string;
  file_size?: number;
  width?: number;
  height?: number;
  created_at: string;
}

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  status: PublishingStatus;
  excerpt: string;
  body: string;
  featured_image: string;
  category_id?: string;
  category_name?: string;
  reading_time?: string;
  duration_seconds?: number;
  format_category?: 'short_form' | 'video_film' | 'course_class';
  aspect_ratio?: '16:9' | '9:16' | '1:1';
  video_url?: string;
  character_featured?: CharacterId;
  scene_type?: 'Meme' | 'Reaction' | 'Act' | 'Recording';
  dialogue?: string;
  voiceover?: string;
  sfx_and_bgm?: string;
  connect_me?: {
    instagram?: string;
    telegram?: string;
    discord?: string;
  };
  is_featured?: boolean;
  published_at?: string;
  scheduled_for?: string;
  seo_title?: string;
  seo_description?: string;
  seo_canonical?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  service_group: 'graphic-design' | 'video-production' | 'marketing-tech';
  tag_line: string;
  description: string;
  icon: string;
  features: string[];
  what_you_receive: string[];
  suitable_for: string;
  pricing_starting_at: string;
  portfolio_highlights: string[];
  order_index: number;
  is_active: boolean;
}

export interface ProductItem {
  id: string;
  title: string;
  slug: string;
  type: 'ebook' | 'course' | 'preset' | 'template' | 'bundle';
  product_category: 'p-courses' | 'ebooks' | 'd-products';
  price?: number;
  original_price?: number;
  currency: string;
  description: string;
  file_url?: string;
  preview_url?: string;
  cover_image: string;
  includes: string[];
  is_published: boolean;
  is_inquiry_only?: boolean;
  status_label?: string;
  download_count: number;
  rating?: number;
}

export interface CourseItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration_hours: number;
  language: string;
  instructor_character: 'Altrox' | 'Thamos' | 'Chutki';
  price: number;
  original_price?: number;
  cover_image: string;
  is_published: boolean;
  enrollment_link?: string;
  lessons_count?: number;
  lessons?: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  course_id: string;
  title: string;
  slug: string;
  module_title: string;
  order_index: number;
  duration_minutes: number;
  video_url?: string;
  summary?: string;
  is_free_preview: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  category: string;
  service_slug: string;
  year: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  hero_image: string;
  gallery: string[];
  video_reel_url?: string;
  featured_character?: string;
  is_featured: boolean;
  order_index: number;
}

export interface ContactInquiry {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest: string;
  budget_range: string;
  message: string;
  status: 'new' | 'in_review' | 'responded' | 'archived';
  is_spam: boolean;
  created_at: string;
}

export interface VideoScript {
  id: string;
  title: string;
  description: string;
  duration: '1m' | '10m' | '60m';
  aspect_ratio: '16:9' | '1:1' | '9:16';
  language: string;
  character: 'Altrox' | 'Thamos' | 'Chutki' | 'Ensemble';
  scene_breakdown: { sceneNumber: number; sceneTitle: string; visual: string; audio: string; timing: string }[];
  dialogue: string;
  voiceover?: string;
  sound_effects?: string;
  background_music?: string;
  thumbnail_concept?: string;
  production_notes?: string;
  connected_content_id?: string;
  status: 'draft' | 'ready' | 'produced';
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  brand_name: string;
  tagline: string;
  contact_email: string;
  contact_phone: string;
  office_locations: string[];
  website_url: string;
  brand_credit: string;
  social_links: {
    instagram: string;
    youtube: string;
    facebook: string;
    threads: string;
    pinterest: string;
    telegram: string;
    discord_directory: string;
    discord_invite: string;
    fiverr?: string;
    cosmo_feed?: string;
  };
  featured_ticker: string[];
  hero_headline: string;
  hero_subheadline: string;
}
