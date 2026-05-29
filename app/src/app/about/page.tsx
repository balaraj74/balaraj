import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { breadcrumbSchema, buildMetadata, safeJsonLd, staticSeo } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(staticSeo.about);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050d1a] text-white py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "AboutPage",
                name: staticSeo.about.title,
                url: "https://balaraj.vercel.app/about",
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
      <h1 className="text-4xl font-bold mb-4">About Me</h1>
      <p className="text-lg text-white/70 mb-8 max-w-2xl text-center">
        I am Balaraj R, an AI/ML Engineer and Full Stack Developer. This page is currently under construction but will contain more details about my background and experience soon.
      </p>
      <Link href="/" className="text-cyan-400 hover:underline inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back Home
      </Link>
    </div>
  );
}
