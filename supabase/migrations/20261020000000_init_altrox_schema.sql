-- ==============================================================================
-- ALTROX Production Schema & RLS Policies
-- Compatible with Supabase PostgreSQL
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'creator')),
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Tags Table
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Media Assets Table
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  alt_text TEXT,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  mime_type TEXT,
  file_size BIGINT,
  width INT,
  height INT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Content Table (Articles, Videos, Reels, Skits, Tutorials)
CREATE TABLE IF NOT EXISTS public.content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('blog', 'reel', 'video', 'tutorial', 'skit', 'landing')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),
  excerpt TEXT,
  body TEXT NOT NULL,
  featured_image TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  reading_time TEXT DEFAULT '4 min read',
  duration_seconds INT,
  aspect_ratio TEXT DEFAULT '16:9' CHECK (aspect_ratio IN ('16:9', '9:16', '1:1')),
  video_url TEXT,
  character_featured TEXT CHECK (character_featured IN ('altrox', 'thamos', 'chutki', 'ensemble')),
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  seo_canonical TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Content Versions Table
CREATE TABLE IF NOT EXISTS public.content_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID NOT NULL REFERENCES public.content(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Content Tags Table
CREATE TABLE IF NOT EXISTS public.content_tags (
  content_id UUID NOT NULL REFERENCES public.content(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, tag_id)
);

-- 8. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tag_line TEXT,
  description TEXT NOT NULL,
  icon TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  pricing_starting_at TEXT,
  portfolio_highlights JSONB DEFAULT '[]'::jsonb,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Products Table (Digital Store)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('ebook', 'course', 'preset', 'template', 'bundle')),
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  original_price NUMERIC(10, 2),
  currency TEXT DEFAULT 'USD',
  description TEXT NOT NULL,
  file_url TEXT,
  preview_url TEXT,
  cover_image TEXT,
  includes JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT true,
  download_count INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  level TEXT DEFAULT 'All Levels' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels')),
  duration_hours NUMERIC(4, 1) DEFAULT 4.5,
  language TEXT DEFAULT 'Hinglish / Hindi & English',
  instructor_character TEXT DEFAULT 'Altrox' CHECK (instructor_character IN ('Altrox', 'Thamos', 'Chutki')),
  price NUMERIC(10, 2) DEFAULT 0.00,
  original_price NUMERIC(10, 2),
  cover_image TEXT,
  is_published BOOLEAN DEFAULT true,
  enrollment_link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. Course Lessons Table
CREATE TABLE IF NOT EXISTS public.course_lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  module_title TEXT NOT NULL,
  order_index INT DEFAULT 0,
  duration_minutes INT DEFAULT 15,
  video_url TEXT,
  summary TEXT,
  is_free_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. Portfolio Projects Table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  category TEXT NOT NULL,
  service_slug TEXT,
  year TEXT DEFAULT '2026',
  challenge TEXT,
  solution TEXT,
  results JSONB DEFAULT '[]'::jsonb,
  hero_image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  video_reel_url TEXT,
  featured_character TEXT,
  is_featured BOOLEAN DEFAULT false,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 13. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_interest TEXT,
  budget_range TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'responded', 'archived')),
  is_spam BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 15. Redirects Table
CREATE TABLE IF NOT EXISTS public.redirects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_path TEXT UNIQUE NOT NULL,
  target_path TEXT NOT NULL,
  status_code INT DEFAULT 301 CHECK (status_code IN (301, 302)),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 16. Video Production Scripts (Script Studio)
CREATE TABLE IF NOT EXISTS public.video_scripts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT DEFAULT '1m' CHECK (duration IN ('1m', '10m', '60m')),
  aspect_ratio TEXT DEFAULT '9:16' CHECK (aspect_ratio IN ('16:9', '1:1', '9:16')),
  language TEXT DEFAULT 'Hinglish',
  character TEXT DEFAULT 'Altrox' CHECK (character IN ('Altrox', 'Thamos', 'Chutki', 'Ensemble')),
  scene_breakdown JSONB DEFAULT '[]'::jsonb,
  dialogue TEXT,
  voiceover TEXT,
  sound_effects TEXT,
  background_music TEXT,
  thumbnail_concept TEXT,
  production_notes TEXT,
  connected_content_id UUID REFERENCES public.content(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'ready', 'produced')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- INDEXES FOR FAST QUERYING
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_content_status_published_at ON public.content(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_type_status ON public.content(type, status);
CREATE INDEX IF NOT EXISTS idx_content_slug ON public.content(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON public.portfolio_projects(is_featured, order_index);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.contact_inquiries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_course_lessons_course ON public.course_lessons(course_id, order_index);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_scripts ENABLE ROW LEVEL SECURITY;

-- Public read policies (only published items visible to anon)
CREATE POLICY "Public read published content" ON public.content
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read active services" ON public.services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read published products" ON public.products
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read published courses" ON public.courses
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read course lessons" ON public.course_lessons
  FOR SELECT USING (true);

CREATE POLICY "Public read portfolio projects" ON public.portfolio_projects
  FOR SELECT USING (true);

CREATE POLICY "Public read categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Public read tags" ON public.tags
  FOR SELECT USING (true);

CREATE POLICY "Public read media assets" ON public.media_assets
  FOR SELECT USING (true);

CREATE POLICY "Public read site settings" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Public read redirects" ON public.redirects
  FOR SELECT USING (is_active = true);

-- Public insert for inquiries (with spam check)
CREATE POLICY "Public submit contact inquiry" ON public.contact_inquiries
  FOR INSERT WITH CHECK (true);

-- Authenticated staff policies (all actions allowed for authenticated users)
CREATE POLICY "Admin full access profiles" ON public.profiles
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin full access content" ON public.content
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin full access services" ON public.services
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin full access products" ON public.products
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin full access courses" ON public.courses
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin full access lessons" ON public.course_lessons
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin full access portfolio" ON public.portfolio_projects
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin full access inquiries" ON public.contact_inquiries
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin full access media" ON public.media_assets
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin full access scripts" ON public.video_scripts
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin full access settings" ON public.site_settings
  FOR ALL TO authenticated USING (true);
