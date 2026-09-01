import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { BlogPostData } from '@/types/blog';

const THEME_ACCENTS = {
  cyan: {
    border: 'hover:border-cyan-500/50',
    badge: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20',
    dot: 'bg-cyan-500',
    glow: 'from-cyan-500/10 to-blue-500/10',
  },
  purple: {
    border: 'hover:border-purple-500/50',
    badge: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
    dot: 'bg-purple-500',
    glow: 'from-purple-500/10 to-pink-500/10',
  },
  emerald: {
    border: 'hover:border-emerald-500/50',
    badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-500',
    glow: 'from-emerald-500/10 to-teal-500/10',
  },
  amber: {
    border: 'hover:border-amber-500/50',
    badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    dot: 'bg-amber-500',
    glow: 'from-amber-500/10 to-orange-500/10',
  },
  blue: {
    border: 'hover:border-blue-500/50',
    badge: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    dot: 'bg-blue-500',
    glow: 'from-blue-500/10 to-indigo-500/10',
  },
};

export function BlogCard({ post }: { post: BlogPostData }) {
  const theme = THEME_ACCENTS[post.gradientTheme] || THEME_ACCENTS.cyan;

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={`group flex flex-col justify-between rounded-2xl glass-card border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden ${theme.border}`}
    >
      {/* Subtle background ambient corner glow */}
      <div
        className={`absolute -top-16 -right-16 w-36 h-36 rounded-full bg-gradient-to-br ${theme.glow} blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`}
      />

      <div>
        {/* Top category & read time */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${theme.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
            {post.category}
          </span>
          <span className="text-slate-400 text-xs flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug mb-3">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3 mb-6 font-sans">
          {post.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2.5">
          <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="font-medium text-slate-700 dark:text-slate-300 font-mono">
            {post.displayDate}
          </span>
        </div>

        <span className="inline-flex items-center gap-1 font-semibold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
          Read <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
