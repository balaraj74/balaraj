'use client';

import { useState, useMemo } from 'react';
import { BlogHeroFeatured } from './BlogHeroFeatured';
import { BlogFilterBar } from './BlogFilterBar';
import { BlogCard } from './BlogCard';
import { BlogPostData, BlogCategory } from '@/types/blog';
import { BLOG_CATEGORIES } from '@/constants/blogs';
import { BookOpen, Sparkles, Inbox } from 'lucide-react';

export function BlogIndexClient({ initialPosts }: { initialPosts: BlogPostData[] }) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialPosts.length };
    BLOG_CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = initialPosts.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [initialPosts]);

  // Filter posts by category and search
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' || post.category === activeCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.keywords.some((k) => k.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, activeCategory, searchQuery]);

  // Featured post (first featured post, or first post overall if category is All and no search)
  const featuredPost = useMemo(() => {
    if (activeCategory !== 'All' || searchQuery.trim() !== '') {
      return null;
    }
    return initialPosts.find((p) => p.featured) || initialPosts[0];
  }, [initialPosts, activeCategory, searchQuery]);

  // Grid posts (excluding the hero post if shown in hero banner)
  const gridPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
  }, [filteredPosts, featuredPost]);

  return (
    <div>
      {/* Featured Flagship Story Hero Banner */}
      {featuredPost && <BlogHeroFeatured post={featuredPost} />}

      {/* Filter & Live Search Bar */}
      <BlogFilterBar
        categories={BLOG_CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryCounts={categoryCounts}
      />

      {/* Grid of Articles */}
      {filteredPosts.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              {activeCategory === 'All'
                ? searchQuery
                  ? `Search Results (${filteredPosts.length})`
                  : 'Latest Articles'
                : `${activeCategory} (${filteredPosts.length})`}
            </h3>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Showing {filteredPosts.length} of {initialPosts.length} articles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {gridPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-3xl glass-card border border-white/60 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 max-w-lg mx-auto my-12">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
            <Inbox className="w-7 h-7" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            No articles found
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            No articles matched &ldquo;{searchQuery}&rdquo; in {activeCategory}. Try searching for{' '}
            <span className="text-cyan-600 dark:text-cyan-400 font-mono">
              &apos;Gemini&apos;, &apos;GGUF&apos;, &apos;Darwin&apos;, or &apos;FastAPI&apos;
            </span>
            .
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
