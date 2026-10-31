'use client';

import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { BlogCategory } from '@/types/blog';

interface BlogFilterBarProps {
  categories: readonly BlogCategory[];
  activeCategory: BlogCategory;
  onSelectCategory: (cat: BlogCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  categoryCounts: Record<string, number>;
}

export function BlogFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  categoryCounts,
}: BlogFilterBarProps) {
  return (
    <div className="space-y-6 mb-12">
      {/* Search Bar */}
      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="search"
          aria-label="Search articles"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles (e.g. Gemini, Darwin, GGUF)"
          className="w-full pl-11 pr-10 py-3.5 rounded-2xl glass-card border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 text-stone-900 dark:text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {categories.map((category) => {
          const count = categoryCounts[category] || 0;
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`relative flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'text-stone-950'
                  : 'bg-white/60 dark:bg-stone-900/60 text-stone-600 dark:text-stone-400 border border-stone-200/80 dark:border-stone-800/80 hover:border-brand-500/40 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span layoutId="blog-filter" className="absolute inset-0 rounded-xl bg-brand-500 shadow-md" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              <span className="relative">{category}</span>
              <span
                className={`relative text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? 'bg-black/15 text-stone-950'
                    : 'bg-black/5 dark:bg-white/10 text-stone-600 dark:text-stone-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
