import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/supabase';

const inquirySchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service_interest: z.string().min(1, 'Service interest is required'),
  budget_range: z.string().min(1, 'Budget is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validated = inquirySchema.parse(json);

    const saved = db.addInquiry({
      full_name: validated.full_name,
      email: validated.email,
      phone: validated.phone || '',
      company: validated.company || '',
      service_interest: validated.service_interest,
      budget_range: validated.budget_range,
      message: validated.message,
    });

    return NextResponse.json({ success: true, inquiry: saved }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Server error processing inquiry' }, { status: 500 });
  }
}

export async function GET() {
  const inquiries = db.getInquiries();
  return NextResponse.json({ success: true, inquiries });
}
