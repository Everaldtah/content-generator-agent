import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface SocialPost {
  platform: 'twitter' | 'linkedin' | 'instagram';
  content: string;
  hashtags: string[];
}

export async function generateSocialPosts(
  topic: string,
  platform: 'twitter' | 'linkedin' | 'instagram',
  tone: 'professional' | 'casual' | 'humorous' = 'professional'
): Promise<SocialPost> {
  const limits = { twitter: 280, linkedin: 3000, instagram: 2200 };
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are a social media expert. Create engaging ${tone} content for ${platform}. 
        Max ${limits[platform]} characters. Include relevant hashtags.`,
      },
      { role: 'user', content: `Topic: ${topic}` },
    ],
    temperature: 0.8,
    max_tokens: 500,
  });

  const text = response.choices[0].message.content || '';
  const hashtags = text.match(/#\w+/g) || [];

  return {
    platform,
    content: text.replace(/#\w+/g, '').trim(),
    hashtags,
  };
}

export async function generateBlogOutline(topic: string): Promise<string[]> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: 'Generate a blog post outline with 5-7 sections.' },
      { role: 'user', content: `Topic: ${topic}` },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  return (response.choices[0].message.content || '').split('\n').filter(Boolean);
}

export async function generateMarketingCopy(
  product: string,
  type: 'ad' | 'email-subject' | 'cta',
  audience?: string
): Promise<string> {
  const prompts = {
    'ad': `Create a compelling ad copy for: ${product}. Target: ${audience || 'general audience'}`,
    'email-subject': `Create 5 email subject lines for: ${product}`,
    'cta': `Create 3 call-to-action buttons for: ${product}`,
  };

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [{ role: 'user', content: prompts[type] }],
    temperature: 0.8,
    max_tokens: 300,
  });

  return response.choices[0].message.content || '';
}
