"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  Layers,
  Sparkles,
  X,
  Award,
  Rss,
  Github,
  Linkedin,
  Cpu,
  CornerDownLeft,
} from 'lucide-react';
import { FEATURED_PROJECTS, OTHER_PROJECTS } from '@/constants/projects';
import { BLOG_POSTS } from '@/constants/blogs';
import { projectSeo } from '@/lib/seo';

export interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Flagship Systems' | 'Case Studies' | 'Articles' | 'Navigation' | 'External Profiles';
  icon: React.ComponentType<{ className?: string }>;
  onSelect: () => void;
  badge?: string;
  shortcut?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Listen for Cmd+K / Ctrl+K and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            setQuery('');
            setSelectedIndex(0);
          }
          return !prev;
        });
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setQuery('');
      setSelectedIndex(0);
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  // Sync body scroll with modal visibility
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Build searchable index of items
  const allItems: CommandItem[] = useMemo(() => {
    const list: CommandItem[] = [];

    // 1. Flagship Projects & Repos
    [...FEATURED_PROJECTS, ...OTHER_PROJECTS].forEach((p) => {
      list.push({
        id: `proj-${p.title}`,
        title: `${p.emoji} ${p.title}`,
        subtitle: p.badge || p.thinking || p.description.slice(0, 70) + '...',
        category: 'Flagship Systems',
        badge: p.badge,
        icon: Cpu,
        onSelect: () => {
          if (p.demo && p.demo !== '#') window.open(p.demo, '_blank');
          else if (p.github && p.github !== '#') window.open(p.github, '_blank');
        },
      });
    });

    // 2. Case Studies (from projectSeo)
    Object.values(projectSeo).forEach((proj) => {
      list.push({
        id: `case-${proj.id}`,
        title: `${proj.displayTitle || proj.title} Case Study`,
        subtitle: proj.description.slice(0, 80) + '...',
        category: 'Case Studies',
        badge: 'Technical Breakdown',
        icon: Sparkles,
        onSelect: () => router.push(proj.path),
      });
    });

    // 3. Engineering Articles
    BLOG_POSTS.forEach((post) => {
      list.push({
        id: `blog-${post.slug}`,
        title: post.title,
        subtitle: `${post.readTime} • ${post.category} • ${post.displayDate}`,
        category: 'Articles',
        badge: post.category,
        icon: BookOpen,
        onSelect: () => router.push(post.path),
      });
    });

    // 4. Primary Site Navigation
    const navSections = [
      { name: 'Home — Overview', path: '/' },
      { name: 'About Balaraj — Bio & Credentials', path: '/about' },
      { name: 'Projects — Systems Portfolio', path: '/projects' },
      { name: 'Engineering Blog — Articles & Research', path: '/blogs' },
      { name: 'Honours & Awards — Hackathons', path: '/#achievements' },
      { name: 'Contact — Connect with Balaraj', path: '/contact' },
    ];
    navSections.forEach((s) => {
      list.push({
        id: `nav-${s.name}`,
        title: s.name,
        category: 'Navigation',
        icon: Layers,
        onSelect: () => router.push(s.path),
      });
    });

    // 5. External Profiles & Feeds
    list.push(
      {
        id: 'ext-gh',
        title: 'GitHub Profile (@balaraj74)',
        subtitle: '77 repositories • Multi-agent systems, Edge AI, and LangGraph',
        category: 'External Profiles',
        badge: 'GitHub',
        icon: Github,
        onSelect: () => window.open('https://github.com/balaraj74', '_blank'),
      },
      {
        id: 'ext-li',
        title: 'LinkedIn Profile (Balaraj R)',
        subtitle: 'Connect with Balaraj for engineering & research collaborations',
        category: 'External Profiles',
        badge: 'LinkedIn',
        icon: Linkedin,
        onSelect: () => window.open('https://www.linkedin.com/in/balaraj-r-209a67330/', '_blank'),
      },
      {
        id: 'ext-gs',
        title: 'Google Skills Profile (Gold League)',
        subtitle: '6,527 Points • 22+ Verified Cloud & AI Credentials',
        category: 'External Profiles',
        badge: 'Top 1%',
        icon: Award,
        onSelect: () => window.open('https://www.skills.google/public_profiles/7e29917e-8bd6-41e6-8149-0795ae63c97b', '_blank'),
      },
      {
        id: 'ext-rss',
        title: 'RSS Feed (/rss.xml)',
        subtitle: 'Subscribe to engineering articles in your RSS reader or Substack',
        category: 'External Profiles',
        badge: 'RSS 2.0',
        icon: Rss,
        onSelect: () => window.open('/rss.xml', '_blank'),
      }
    );

    return list;
  }, [router]);

  // Filter items matching query
  const filtered = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 12);
    const q = query.toLowerCase().trim();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        (item.badge && item.badge.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, allItems]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setSelectedIndex(0);
  };

  const handleSelect = useCallback(
    (index: number) => {
      const item = filtered[index];
      if (item) {
        item.onSelect();
        setIsOpen(false);
      }
    },
    [filtered]
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(selectedIndex);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/30">
              <Search className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 animate-pulse" />
              <input
                type="text"
                autoFocus
                placeholder="Search projects, articles, case studies, or type a command..."
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-sans"
              />
              {query && (
                <button
                  onClick={() => handleQueryChange('')}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors"
                  aria-label="Clear Search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 rounded-md bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[11px] font-mono font-medium text-slate-600 dark:text-slate-400">
                ESC
              </kbd>
            </div>

            {/* Scrollable Results List */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-3 divide-y divide-slate-100 dark:divide-slate-800/50">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
                  <p className="font-semibold text-slate-600 dark:text-slate-400">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs mt-1 text-slate-400">Try searching for &ldquo;Darwin&rdquo;, &ldquo;VaidyaOS&rdquo;, &ldquo;AgriSence&rdquo;, or &ldquo;Microservices&rdquo;</p>
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(idx)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl cursor-pointer text-xs transition-all ${
                        isSelected
                          ? 'bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/40 text-cyan-950 dark:text-cyan-200'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`p-2 rounded-xl shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm truncate text-slate-900 dark:text-slate-100">
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.badge && (
                          <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60">
                            {item.badge}
                          </span>
                        )}
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400">
                          {item.category}
                        </span>
                        {isSelected && (
                          <CornerDownLeft className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse ml-1" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer keyboard hints */}
            <div className="flex items-center justify-between px-5 py-2.5 border-t border-slate-200/80 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 font-mono bg-slate-50/70 dark:bg-slate-950/50">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px]">↑↓</kbd> navigate
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px]">↵</kbd> select
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px]">esc</kbd> close
                </span>
              </div>
              <span className="text-cyan-600 dark:text-cyan-400 font-medium">balaraj.me</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * Trigger button to embed in headers or navigation bars
 */
export function CommandPaletteTrigger() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
      type="button"
      className="inline-flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 hover:border-cyan-500/40 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all shadow-sm hover:scale-[1.02]"
    >
      <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
      <span className="hidden sm:inline">Search...</span>
      <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[10px] font-sans font-semibold">
        ⌘K
      </kbd>
    </button>
  );
}
