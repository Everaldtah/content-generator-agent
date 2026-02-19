'use client';

import { useState } from 'react';
import { Sparkles, Twitter, Linkedin, Instagram, FileText, Loader2 } from 'lucide-react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<'twitter' | 'linkedin' | 'instagram'>('twitter');
  const [tone, setTone] = useState<'professional' | 'casual' | 'humorous'>('professional');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platform, tone }),
      });
      setResult(await res.json());
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Content Generator Agent</h1>
          <p className="text-slate-400">Generate social posts, blogs & marketing copy</p>
        </header>

        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 mb-8">
          <textarea
            placeholder="Enter your topic or idea..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white h-32 mb-4"
          />

          <div className="flex gap-4 mb-4">
            <div className="flex gap-2">
              <button onClick={() => setPlatform('twitter')} className={`p-3 rounded-xl ${platform === 'twitter' ? 'bg-blue-500' : 'bg-slate-700'}`}><Twitter className="w-5 h-5 text-white" /></button>
              <button onClick={() => setPlatform('linkedin')} className={`p-3 rounded-xl ${platform === 'linkedin' ? 'bg-blue-600' : 'bg-slate-700'}`}><Linkedin className="w-5 h-5 text-white" /></button>
              <button onClick={() => setPlatform('instagram')} className={`p-3 rounded-xl ${platform === 'instagram' ? 'bg-pink-500' : 'bg-slate-700'}`}><Instagram className="w-5 h-5 text-white" /></button>
            </div>

            <select value={tone} onChange={(e) => setTone(e.target.value as any)} className="px-4 py-2 bg-slate-700 text-white rounded-xl">
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="humorous">Humorous</option>
            </select>

            <button onClick={generate} disabled={loading || !topic} className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 text-white rounded-xl">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              Generate
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Generated Content</h2>
            <p className="text-white mb-4">{result.content}</p>
            <div className="flex flex-wrap gap-2">
              {result.hashtags?.map((tag: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
