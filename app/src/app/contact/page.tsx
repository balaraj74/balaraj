import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { breadcrumbSchema, buildMetadata, safeJsonLd, staticSeo } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(staticSeo.contact);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] dark:bg-[#030712] text-slate-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ContactPage",
                name: staticSeo.contact.title,
                url: "https://balaraj.vercel.app/contact",
                description: staticSeo.contact.description,
              },
              breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Contact", path: "/contact" },
              ]),
            ],
          }),
        }}
      />
      <div className="max-w-2xl text-center space-y-6 glass-card p-8 sm:p-12 rounded-3xl border border-white/80 dark:border-white/10 shadow-xl">
        <h1 className="text-4xl sm:text-5xl font-serif italic font-medium">Get In <span className="gradient-text-cyan">Touch</span></h1>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          Open for high-impact AI systems engineering roles, startup technical architecture, hackathons, and research collaborations.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/#contact" className="btn-primary">
            Open Contact Form
          </Link>
          <a
            href="mailto:balarajr483@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all shadow-sm"
          >
            Email Directly
          </a>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 font-semibold text-sm transition-all">
            <ArrowLeft className="w-4 h-4" /> Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
