import { NextRequest, NextResponse } from 'next/server';
import { generateBlogOutline } from '@/lib/content-generator';

export async function POST(request: NextRequest) {
  const { topic } = await request.json();
  const outline = await generateBlogOutline(topic);
  return NextResponse.json({ outline });
}
