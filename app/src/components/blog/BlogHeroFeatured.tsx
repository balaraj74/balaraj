"use client";
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { BlogPostData } from '@/types/blog';
import { blogCover } from '@/lib/blogCovers';

export function BlogHeroFeatured({ post }: { post: BlogPostData }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', reduced ? '-8%' : '8%']);

  return (
    <div className="hero-rise mb-12" style={{ animationDelay: '0.15s' }}>
      <div ref={ref} data-cursor="Read" className="group relative overflow-hidden rounded-[clamp(24px,3vw,40px)] bg-stone-950 text-white min-h-[clamp(460px,66vh,680px)] flex items-end">
        <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y }}>
          <Image src={blogCover(post)} alt="" fill preload sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

        <div className="relative p-6 sm:p-10 lg:p-12 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-4 text-xs font-bold uppercase tracking-widest">
            <span className="px-3 py-1 rounded-full bg-brand-500 text-stone-950">Featured</span>
            <span className="text-brand-300">{post.category}</span>
          </div>
          <h2 className="font-serif font-bold tracking-tight leading-[1.08] text-[clamp(1.9rem,4.6vw,3.75rem)]">
            <Link href={`/blogs/${post.slug}`} className="after:absolute after:inset-0">{post.title}</Link>
          </h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-lg leading-relaxed text-stone-200 line-clamp-3">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-mono text-stone-300">
            <span>{post.author.name}</span>
            <span>{post.displayDate}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-stone-950 font-sans font-bold transition-transform duration-300 group-hover:translate-x-1">
              Read Article <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
