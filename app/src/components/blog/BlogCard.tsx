"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { BlogPostData } from '@/types/blog';
import { blogCover } from '@/lib/blogCovers';
import { EASE_OUT_EXPO } from '../shared';
import { SpotlightCard } from '../motion/primitives';

export function BlogCard({ post, index, wide }: { post: BlogPostData; index: number; wide?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: EASE_OUT_EXPO }}
      className={wide ? 'md:col-span-2' : ''}
    >
      <SpotlightCard tilt={3} className="h-full rounded-3xl overflow-hidden border border-stone-200/80 dark:border-white/10 bg-white dark:bg-stone-900 shadow-sm hover:shadow-xl hover:border-brand-500/40 transition-[box-shadow,border-color] duration-500">
        <article className="group relative flex flex-col h-full">
          <div className={`relative overflow-hidden bg-stone-950 ${wide ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[16/9]'}`}>
            <Image
              src={blogCover(post)}
              alt=""
              fill
              sizes={wide ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="absolute left-4 bottom-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white border border-white/15">
              {post.category}
            </span>
          </div>

          <div className="flex flex-col flex-1 p-5 sm:p-6">
            <h3 className={`font-serif font-bold tracking-tight leading-snug text-stone-900 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors ${wide ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
              <Link href={`/blogs/${post.slug}`} className="after:absolute after:inset-0 after:z-10">{post.title}</Link>
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed line-clamp-3 text-stone-600 dark:text-stone-300">{post.description}</p>
            <div className="mt-5 pt-4 flex items-center justify-between border-t border-stone-200/80 dark:border-white/10 text-xs font-mono text-stone-600 dark:text-stone-400">
              <span className="flex items-center gap-3">
                <span>{post.displayDate}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
              </span>
              <ArrowUpRight className="w-5 h-5 text-brand-600 dark:text-brand-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </article>
      </SpotlightCard>
    </motion.div>
  );
}
