import Link from 'next/link';
import { ArrowLeft, BookOpen, Sparkles, Terminal, ShieldCheck } from 'lucide-react';
import Footer from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
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
    <>
    <Navigation />
    <main className="min-h-screen bg-[#F7F4EE] dark:bg-[#0c0a09] text-stone-900 dark:text-white pt-28 pb-28 px-4 sm:px-6 lg:px-8 transition-colors">
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-brand-500/10 text-brand-700 dark:text-brand-400 border border-brand-500/20">
            <Terminal className="w-3.5 h-3.5" />
            <span>ai_systems.log</span>
          </div>
        </div>

        {/* Hero Publication Header */}
        <div className="mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-stone-700 dark:text-stone-300 border border-black/5 dark:border-white/5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            Engineering Publications & Essays
          </div>

          <h1 className="text-[clamp(2.6rem,7.5vw,6.5rem)] font-serif font-medium italic tracking-tight text-stone-900 dark:text-white leading-[1.08] mb-6">
            <span className="hero-line block overflow-hidden pb-[0.12em] -mb-[0.12em] pl-[0.08em] -ml-[0.08em]"><span>Architecting Real-World</span></span>{' '}
            <span className="hero-line block overflow-hidden pb-[0.12em] -mb-[0.12em] pl-[0.08em] -ml-[0.08em]">
              <span className="gradient-text-cyan w-fit pr-[0.1em]" style={{ animationDelay: '0.1s' }}>AI Systems.</span>
            </span>
          </h1>

          <p className="hero-rise text-lg sm:text-xl text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed mb-6 font-sans">
            Technical breakdowns, production architecture blueprints, on-device Edge AI benchmarks, and lessons from building scalable systems for healthcare, agriculture, and venture validation.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-600 dark:text-stone-400 pt-4 border-t border-stone-200/80 dark:border-white/10">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              {BLOG_POSTS.length} Technical Articles
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
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
    <Footer />
    </>
  );
}
