import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/supabase';

const scriptSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Title is required'),
  description: z.string().optional(),
  duration: z.enum(['1m', '10m', '60m']).default('1m'),
  aspect_ratio: z.enum(['16:9', '1:1', '9:16']).default('9:16'),
  language: z.string().default('Hinglish'),
  character: z.enum(['Altrox', 'Thamos', 'Chutki', 'Ensemble']).default('Altrox'),
  scene_breakdown: z.array(z.any()).optional(),
  dialogue: z.string().optional(),
  voiceover: z.string().optional(),
  sound_effects: z.string().optional(),
  background_music: z.string().optional(),
  thumbnail_concept: z.string().optional(),
  production_notes: z.string().optional(),
  status: z.enum(['draft', 'ready', 'produced']).default('draft'),
});

export async function GET() {
  const scripts = db.getScripts();
  return NextResponse.json({ success: true, scripts });
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validated = scriptSchema.parse(json);

    const saved = db.saveScript(validated);
    return NextResponse.json({ success: true, script: saved });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Server error saving script' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
  }

  const deleted = db.deleteScript(id);
  return NextResponse.json({ success: deleted });
}
