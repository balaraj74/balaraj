"use client";
import { useEffect, useRef } from 'react';

/** Fades article blocks in as they enter; the HTML stays fully readable without JS. */
export function ProseReveal({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px' });

    for (const block of root.children) {
      block.classList.add('prose-block');
      observer.observe(block);
    }
    return () => observer.disconnect();
  }, [html]);

  return <div ref={ref} className="article-prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
}
