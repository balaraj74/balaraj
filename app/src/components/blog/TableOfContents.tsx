'use client';

import { useEffect, useState } from 'react';
import { AlignLeft } from 'lucide-react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse h2 and h3 from markdown text
    const lines = content.split('\n');
    const items: HeadingItem[] = [];
    
    lines.forEach((line) => {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);

      if (h2Match) {
        const text = h2Match[1].replace(/[*_`]/g, '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        items.push({ id, text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].replace(/[*_`]/g, '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        items.push({ id, text, level: 3 });
      }
    });

    setHeadings(items);

    // Scroll spy
    const handleScroll = () => {
      const headingElements = items
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      const scrollPosition = window.scrollY + 140;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveId(el.id);
          return;
        }
      }
      if (items.length > 0 && window.scrollY < 200) {
        setActiveId(items[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="p-5 rounded-2xl glass-card border border-white/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 shadow-sm backdrop-blur-md">
      <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-4">
        <AlignLeft className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
        Table of Contents
      </div>
      <ul className="space-y-2 text-sm">
        {headings.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              style={{ paddingLeft: item.level === 3 ? '1rem' : '0' }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    window.scrollTo({
                      top: target.offsetTop - 100,
                      behavior: 'smooth',
                    });
                  }
                }}
                className={`block py-1 transition-all text-xs sm:text-sm ${
                  isActive
                    ? 'text-cyan-600 dark:text-cyan-400 font-semibold translate-x-1'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
