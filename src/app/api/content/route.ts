import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/supabase';

const contentSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Title is required'),
  slug: z.string().optional(),
  type: z.enum(['blog', 'reel', 'video', 'tutorial', 'skit', 'landing']).optional(),
  status: z.enum(['draft', 'scheduled', 'published', 'archived']).optional(),
  excerpt: z.string().optional(),
  body: z.string().min(1, 'Body content is required'),
  featured_image: z.string().optional(),
  reading_time: z.string().optional(),
  duration_seconds: z.number().optional(),
  aspect_ratio: z.enum(['16:9', '9:16', '1:1']).optional(),
  video_url: z.string().optional(),
  character_featured: z.enum(['altrox', 'thamos', 'chutki', 'ensemble']).optional(),
  is_featured: z.boolean().optional(),
  scheduled_for: z.string().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || undefined;
  const all = searchParams.get('all') === 'true';

  const items = all ? db.getAllContent() : db.getContent(type);
  return NextResponse.json({ success: true, items });
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validated = contentSchema.parse(json);

    const saved = db.saveContent(validated);
    return NextResponse.json({ success: true, item: saved });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Server error saving content' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
  }

  const deleted = db.deleteContent(id);
  return NextResponse.json({ success: deleted });
}
