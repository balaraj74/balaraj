'use client';

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
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles by title, topic, or keyword (e.g. Gemini, Darwin, GGUF)..."
          className="w-full pl-11 pr-10 py-3.5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
              className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-[1.02]'
                  : 'bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/40 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? 'bg-white/20 dark:bg-black/20 text-white dark:text-slate-900'
                    : 'bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-400'
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
