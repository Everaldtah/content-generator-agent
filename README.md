# Content Generator Agent 📝🤖

AI-powered content generator that creates social media posts, blog ideas, and marketing copy from topics and keywords.

## Features

- 📱 **Social Media Posts** - Generate posts for Twitter, LinkedIn, Instagram
- 📝 **Blog Ideas** - Generate headlines, outlines, and full articles
- 🎯 **Marketing Copy** - Create ads, email subject lines, CTAs
- 🔄 **Content Repurposing** - Transform one piece into multiple formats
- 📊 **Tone Customization** - Professional, casual, humorous, urgent

## Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS
- **AI:** OpenAI GPT-4
- **Database:** PostgreSQL + Prisma

## Quick Start

```bash
git clone https://github.com/Everaldtah/content-generator-agent.git
cd content-generator-agent
npm install
cp .env.example .env
npm run dev
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/generate/social` | POST | Generate social media posts |
| `/api/generate/blog` | POST | Generate blog content |
| `/api/generate/copy` | POST | Generate marketing copy |

## License

MIT
