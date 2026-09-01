import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, Share2, Sparkles, BookOpen } from 'lucide-react';
import { marked } from 'marked';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  blogPostingSchema,
  blogPosts,
  breadcrumbSchema,
  buildMetadata,
  safeJsonLd,
} from '@/lib/seo';
import { BLOG_POSTS } from '@/constants/blogs';
import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { AuthorBioCard } from '@/components/blog/AuthorBioCard';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const post =
    BLOG_POSTS.find((p) => p.slug === params.slug) ||
    blogPosts[params.slug as keyof typeof blogPosts];

  if (!post) return { title: 'Not Found | Balaraj R' };

  return buildMetadata({
    title: `${post.title} | Balaraj R Engineering Blog`,
    description: post.description,
    path: post.path,
    keywords: post.keywords,
    type: 'article',
    publishedTime: post.date,
  });
}

export async function generateStaticParams() {
  const slugs = new Set([
    ...Object.keys(blogPosts),
    ...BLOG_POSTS.map((p) => p.slug),
  ]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

function renderArticleHtml(rawMarkdown: string): string {
  // Convert {% embed https://youtu.be/... %} to responsive iframe
  const content = rawMarkdown.replace(
    /\{%\s*embed\s+(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)[^\s]*)\s*%\}/g,
    `<div class="my-8 aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
      <iframe class="w-full h-full" src="https://www.youtube.com/embed/$2" title="YouTube Video Embed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>`
  );

  // Parse markdown
  const parsed = marked.parse(content, { async: false }) as string;

  // Add id attributes to h2 and h3 for Table of Contents navigation
  const withIds = parsed.replace(
    /<(h[23])>(.*?)<\/\1>/g,
    (_match, tag, innerText) => {
      const plainText = innerText.replace(/<[^>]*>/g, '').trim();
      const id = plainText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return `<${tag} id="${id}">${innerText}</${tag}>`;
    }
  );

  return withIds;
}

export default async function BlogPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post =
    BLOG_POSTS.find((p) => p.slug === params.slug) ||
    blogPosts[params.slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  const postData = BLOG_POSTS.find((p) => p.slug === params.slug) || {
    ...post,
    category: 'System Architecture' as const,
    gradientTheme: 'cyan' as const,
    content: (post as { content?: string }).content || `# ${post.title}\n\n${post.description}`,
    author: {
      name: 'Balaraj R',
      role: 'AI Systems Architect & PES University',
      avatar: '/balaraj_hero.png',
      github: 'https://github.com/balaraj74',
      linkedin: 'https://www.linkedin.com/in/balaraj-r-209a67330/',
      twitter: 'https://x.com/Balaraj__r',
    },
  };

  const htmlContent = renderArticleHtml(postData.content);

  return (
    <main className="min-h-screen bg-[#F7F4EE] dark:bg-[#030712] text-slate-900 dark:text-white pt-16 pb-28 px-4 sm:px-6 lg:px-8 transition-colors relative">
      {/* Sticky top reading progress bar */}
      <ReadingProgressBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@graph": [
              blogPostingSchema(post),
              breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Blogs", path: "/blogs" },
                { name: post.title, path: post.path },
              ]),
            ],
          }),
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-10">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to All Articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-3 h-3" />
              {postData.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {postData.readTime}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {postData.displayDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
            {postData.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-3xl mb-8">
            {postData.description}
          </p>

          {/* Author Byline */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/30 bg-slate-100 dark:bg-slate-800 shadow-sm">
                <Image
                  src={postData.author.avatar}
                  alt={postData.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {postData.author.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                  {postData.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="hidden sm:inline">Engineering Deep-Dive</span>
              <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
        </header>

        {/* Main Content Layout with Sticky TOC Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Article Body */}
          <article className="lg:col-span-8 max-w-none">
            <div
              className="article-prose max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Author Bio Box */}
            <AuthorBioCard author={postData.author} />

            {/* Curated Related Posts */}
            <RelatedPosts currentSlug={params.slug} allPosts={BLOG_POSTS} />
          </article>

          {/* Sticky Sidebar on Desktop */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
            <TableOfContents content={postData.content} />

            <div className="p-5 rounded-2xl glass-card border border-white/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-3">
                <Share2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                Share Publication
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Found this technical deep-dive helpful? Share it with your engineering team and network.
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(postData.title)}&url=${encodeURIComponent(`https://balaraj.me${postData.path}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-center bg-slate-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  Share on X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://balaraj.me${postData.path}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-center bg-slate-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
