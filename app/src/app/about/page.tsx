import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { absoluteUrl, breadcrumbSchema, buildMetadata, safeJsonLd, staticSeo } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(staticSeo.about);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] dark:bg-[#030712] text-slate-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "AboutPage",
                name: staticSeo.about.title,
                url: absoluteUrl("/about"),
                description: staticSeo.about.description,
              },
              breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
              ]),
            ],
          }),
        }}
      />
      <div className="max-w-2xl text-center space-y-6 glass-card p-8 sm:p-12 rounded-3xl border border-white/80 dark:border-white/10 shadow-xl">
        <h1 className="text-4xl sm:text-5xl font-serif italic font-medium">About <span className="gradient-text-cyan">Balaraj R</span></h1>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          Systems Architect &amp; AI Engineer at <strong>PES University</strong> (3rd Year B.Tech CSE · AI &amp; ML). Building production-grade agentic frameworks, offline-first clinical models, and distributed software systems.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/#about" className="btn-primary">
            Explore Full Profile
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
