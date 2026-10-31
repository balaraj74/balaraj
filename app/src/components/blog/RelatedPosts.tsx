import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { BlogPostData } from '@/types/blog';

export function RelatedPosts({
  currentSlug,
  allPosts,
}: {
  currentSlug: string;
  allPosts: BlogPostData[];
}) {
  const currentPost = allPosts.find((p) => p.slug === currentSlug);
  const related = allPosts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize posts in the same category
      if (currentPost && a.category === currentPost.category && b.category !== currentPost.category) {
        return -1;
      }
      if (currentPost && b.category === currentPost.category && a.category !== currentPost.category) {
        return 1;
      }
      return 0;
    })
    .slice(0, 2);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-stone-200 dark:border-stone-800">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-white">
            Continue Reading
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Curated deep-dives in AI systems and engineering architecture.
          </p>
        </div>
        <Link
          href="/blogs"
          className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 flex items-center gap-1 group"
        >
          View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group block p-6 rounded-2xl glass-card border border-white/80 dark:border-white/10 bg-white/70 dark:bg-stone-900/70 hover:border-brand-500/40 hover:-translate-y-1 hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-brand-500/10 text-brand-700 dark:text-brand-400 border border-brand-500/20">
                {post.category}
              </span>
              <span className="text-stone-400 text-xs flex items-center gap-1 ml-auto">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed mb-4">
              {post.description}
            </p>
            <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 pt-3 border-t border-stone-100 dark:border-stone-800">
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3" /> {post.displayDate}
              </span>
              <span className="text-brand-600 dark:text-brand-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read Article &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
