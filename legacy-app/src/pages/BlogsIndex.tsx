import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, BookOpen } from 'lucide-react';

const blogs = [
  {
    slug: 'edge-ai-healthcare',
    title: 'Offline-First Edge AI in Healthcare',
    excerpt: 'How running LLMs locally on-device changes the game for privacy and latency in medical triage.',
    date: 'May 17, 2026',
    readTime: '5 min read'
  },
  {
    slug: 'event-driven-microservices-ai',
    title: 'Scaling AI with Event-Driven Microservices',
    excerpt: 'Lessons learned building a 32-microservice architecture for CareerLens using Gemini and GCP.',
    date: 'April 22, 2026',
    readTime: '8 min read'
  }
];

export default function BlogsIndex() {
  return (
    <div className="min-h-screen bg-[#050d1a] text-white py-20 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Engineering Blog | Balaraj R</title>
        <meta name="description" content="Read articles about Edge AI, Healthcare AI, Multi-agent workflows, and Full-Stack System Architecture by Balaraj R." />
        <meta name="keywords" content="AI Blog, Edge AI, Next.js, FastAPI, Microservices, Balaraj R" />
        <link rel="canonical" href="https://balaraj.vercel.app/blogs" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-black mb-4 flex Items-center gap-4">
          <BookOpen className="w-10 h-10 text-violet-400" /> Engineering Blog
        </h1>
        <p className="text-xl text-white/70 mb-12">Thoughts, tutorials, and deep-dives into AI systems architecture.</p>

        <div className="space-y-6">
          {blogs.map(blog => (
            <Link key={blog.slug} to={`/blogs/${blog.slug}`} className="block glass rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(6,182,212,0.1)] transition-all">
              <div className="flex Items-center gap-4 text-white/40 text-sm mb-3 font-mono">
                <span>{blog.date}</span>
                <span>&bull;</span>
                <span>{blog.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{blog.title}</h2>
              <p className="text-white/60 leading-relaxed">{blog.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
