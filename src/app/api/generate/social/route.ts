import { NextRequest, NextResponse } from 'next/server';
import { generateSocialPosts } from '@/lib/content-generator';

export async function POST(request: NextRequest) {
  const { topic, platform, tone } = await request.json();
  const result = await generateSocialPosts(topic, platform, tone);
  return NextResponse.json(result);
}
