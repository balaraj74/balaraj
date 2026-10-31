import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Page Not Found | Balaraj R' },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] dark:bg-[#0c0a09] flex flex-col items-center justify-center text-center px-4 transition-colors">
      <p className="hero-rise section-label">404</p>
      <h1 className="hero-rise text-4xl sm:text-6xl font-serif italic font-medium text-stone-900 dark:text-white tracking-tight" style={{ animationDelay: '0.1s' }}>
        This route <span className="gradient-text-cyan">never shipped</span>
      </h1>
      <p className="hero-rise text-stone-700 dark:text-stone-300 mt-6 max-w-md" style={{ animationDelay: '0.2s' }}>
        The page you asked for does not exist. These ones do:
      </p>
      <nav aria-label="Suggested pages" className="hero-rise flex flex-wrap justify-center gap-3 mt-8" style={{ animationDelay: '0.3s' }}>
        <Link href="/" className="btn-primary">Home</Link>
        <Link href="/projects" className="btn-secondary">Projects</Link>
        <Link href="/blogs" className="btn-secondary">Blog</Link>
      </nav>
    </main>
  );
}
