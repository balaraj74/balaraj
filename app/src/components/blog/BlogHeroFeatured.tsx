import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, Clock, Calendar, Cpu, Layers } from 'lucide-react';
import { BlogPostData } from '@/types/blog';

export function BlogHeroFeatured({ post }: { post: BlogPostData }) {
  return (
    <div className="relative overflow-hidden rounded-3xl glass-card border border-white/90 dark:border-white/10 bg-gradient-to-br from-white/90 via-slate-50/70 to-emerald-50/40 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-emerald-950/20 p-8 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl mb-16 group hover:border-emerald-500/40 transition-all duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-emerald-500/15 dark:bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-16 w-72 h-72 rounded-full bg-cyan-500/15 dark:bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          {/* Top meta strip */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide uppercase bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Featured Deep-Dive
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-black/5 dark:border-white/5">
              {post.category}
            </span>
          </div>

          {/* Headline */}
          <Link href={`/blogs/${post.slug}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-[1.15] mb-5">
              {post.title}
            </h2>
          </Link>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl font-sans">
            {post.description}
          </p>

          {/* Author & Read Time footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-3.5">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500/40 bg-slate-100 dark:bg-slate-800 shadow-md">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {post.author.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.displayDate}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={`/blogs/${post.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
            >
              Read Article <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right side technical highlight card */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="rounded-2xl p-6 bg-slate-900/90 dark:bg-black/60 border border-emerald-500/30 text-white shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Cpu className="w-4 h-4 text-emerald-400" />
                SYSTEM ARCHITECTURE
              </span>
              <span>15 GENKIT FLOWS</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-slate-300">Layer 1: Farmer Intelligence</span>
                <span className="text-emerald-400 font-bold">Multimodal Gemini</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-slate-300">Layer 2: Earth Intelligence</span>
                <span className="text-cyan-400 font-bold">Sentinel-2 + Landsat</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-slate-300">Layer 3: Financial Rails</span>
                <span className="text-purple-400 font-bold">Alternative Credit Scoring</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                State Winner @ Inferentia 2.0
              </span>
              <span className="text-emerald-400 font-semibold">434+ Commits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
