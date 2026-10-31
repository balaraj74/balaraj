import Link from 'next/link';
import Footer from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import type { Metadata } from 'next';
import { absoluteUrl, breadcrumbSchema, buildMetadata, safeJsonLd, staticSeo } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(staticSeo.about);

export default function AboutPage() {
  return (
    <>
    <Navigation />
    <main className="min-h-screen bg-[#F7F4EE] dark:bg-[#0c0a09] text-stone-900 dark:text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center transition-colors">
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
      <article className="hero-rise max-w-3xl w-full">
        <p className="section-label">About</p>
        <h1 className="text-4xl sm:text-6xl font-serif italic font-medium tracking-tight">
          About <span className="gradient-text-cyan">Balaraj R</span>
        </h1>
        <div className="mt-8 space-y-5 text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
          <p>
            Balaraj R (Balu) is an AI/ML engineer and 3rd-year B.Tech CSE student specializing in AI &amp; ML at <strong className="text-stone-900 dark:text-white">PES University</strong>, based in Bengaluru. He builds production-grade agentic frameworks, offline-first clinical models, and distributed software systems.
          </p>
          <p>
            His projects include <Link className="text-brand-700 dark:text-brand-400 font-semibold" href="/projects/career-lens">CareerLens</Link>, a 32-service platform of 40,000+ lines of code; <Link className="text-brand-700 dark:text-brand-400 font-semibold" href="/projects/agrisence">AgriSence</Link>, a GCP-based ML platform for farmers; <Link className="text-brand-700 dark:text-brand-400 font-semibold" href="/projects/vaidyos">VaidyaOS</Link>, offline healthcare AI; and <Link className="text-brand-700 dark:text-brand-400 font-semibold" href="/projects/darwin">Darwin</Link>, a multi-agent executive board for founders.
          </p>
          <p>
            He is a national-level hackathon winner with ₹2.75L+ in prizes, including a win in the Google GenAI Hackathon, and has merged open-source contributions to Ubuntu, Pandas, and NumPy.
          </p>
        </div>
        <h2 className="mt-12 text-2xl sm:text-3xl font-serif italic font-medium">What he works on</h2>
        <ul className="mt-5 grid sm:grid-cols-2 gap-3 text-sm sm:text-base">
          {[
            'Multi-agent workflows and LLM orchestration',
            'Full-stack AI apps with Next.js and real-time UI',
            'Cloud and MLOps on GCP with Docker',
            'AI security and adversarial thinking',
          ].map((item) => (
            <li key={item} className="glass-card rounded-2xl p-4 border border-white/80 dark:border-white/10">{item}</li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-4 pt-10">
          <Link href="/projects" className="btn-primary">See the Projects</Link>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-colors shadow-sm">
            Get in Touch
          </Link>
        </div>
      </article>
    </main>
    <Footer />
    </>
  );
}
