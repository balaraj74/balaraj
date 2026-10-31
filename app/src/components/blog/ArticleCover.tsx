"use client";
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export function ArticleCover({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', reduced ? '-9%' : '9%']);

  return (
    <div ref={ref} className="hero-rise relative mb-14 overflow-hidden rounded-[clamp(20px,3vw,36px)] bg-stone-950 aspect-[16/10] sm:aspect-[21/9]" style={{ animationDelay: '0.3s' }}>
      <motion.div className="absolute -inset-y-[11%] inset-x-0" style={{ y }}>
        <Image src={src} alt="" fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
      </motion.div>
    </div>
  );
}
