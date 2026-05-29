import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import {
  blogPosts,
  blogSchema,
  breadcrumbSchema,
  buildMetadata,
  safeJsonLd,
  staticSeo,
} from '@/lib/seo';

export const metadata: Metadata = buildMetadata(staticSeo.blogs);

const blogs = Object.values(blogPosts).map((post) => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.description,
  date: post.displayDate,
  readTime: post.readTime,
}));

export default function BlogsIndex() {
  return (
    <div className="min-h-screen bg-[#050d1a] text-white py-20 px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-black mb-4 flex items-center gap-4">
          <BookOpen className="w-10 h-10 text-violet-400" /> Engineering Blog
        </h1>
        <p className="text-xl text-white/70 mb-12">Thoughts, tutorials, and deep-dives into AI systems architecture.</p>

        <div className="space-y-6">
          {blogs.map(blog => (
            <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="block glass rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(6,182,212,0.1)] transition-all group">
              <div className="flex items-center gap-4 text-white/40 text-sm mb-3 font-mono">
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
