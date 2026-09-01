import Link from 'next/link';
import { ArrowLeft, BookOpen, Sparkles, Terminal, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import {
  blogSchema,
  breadcrumbSchema,
  buildMetadata,
  safeJsonLd,
  staticSeo,
} from '@/lib/seo';
import { BlogIndexClient } from '@/components/blog/BlogIndexClient';
import { BLOG_POSTS } from '@/constants/blogs';

export const metadata: Metadata = buildMetadata(staticSeo.blogs);

export default function BlogsIndex() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] dark:bg-[#030712] text-slate-900 dark:text-white pt-16 pb-28 px-4 sm:px-6 lg:px-8 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@graph": [
              blogSchema(),
              breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Blogs", path: "/blogs" },
              ]),
            ],
          }),
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20">
            <Terminal className="w-3.5 h-3.5" />
            <span>ai_systems.log</span>
          </div>
        </div>

        {/* Hero Publication Header */}
        <div className="mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-black/5 dark:border-white/5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            Engineering Publications & Essays
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-5">
            Architecting Real-World <span className="italic font-serif text-cyan-700 dark:text-cyan-400">AI Systems.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mb-6 font-sans">
            Technical breakdowns, production architecture blueprints, on-device Edge AI benchmarks, and lessons from building scalable systems for healthcare, agriculture, and venture validation.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200/80 dark:border-white/10">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              {BLOG_POSTS.length} Technical Articles
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Peer-Reviewed Hackathon Case Studies
            </span>
            <span>&bull;</span>
            <span>Zero AI-Fluff &bull; Real Production Code</span>
          </div>
        </div>

        {/* Client Interactive Blog Experience */}
        <BlogIndexClient initialPosts={BLOG_POSTS} />
      </div>
    </main>
  );
}
