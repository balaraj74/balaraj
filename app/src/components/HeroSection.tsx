"use client";

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, FileText, ExternalLink } from 'lucide-react';
import { Magnetic } from './motion/primitives';
import { scrollToId } from './motion/SmoothScroll';

const PROOF_STATS = [
  { value: '₹2.75L+', label: 'Hackathon Prize Pool' },
  { value: '40K+ LOC', label: 'Engineered Systems' },
  {
    value: '35+ Badges',
    label: 'Google Skills Profile',
    href: 'https://www.skills.google/public_profiles/7e29917e-8bd6-41e6-8149-0795ae63c97b',
  },
];

/** Entrance delay; the CSS adds the intro curtain's length on a first visit. */
const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties;

const headlineClass = 'hero-line block overflow-hidden pb-[0.08em] -mb-[0.08em] sm:whitespace-nowrap';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // The hero is only pinned on desktop; on phones it scrolls like normal content.
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const sync = () => setPinned(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  const still = reduced || !pinned;

  // Scroll: the pinned hero shrinks into a card while the portrait pushes forward.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 0.3], [0, still ? 0 : -140]);
  const copyOpacity = useTransform(scrollYProgress, (v) => (still ? 1 : Math.max(0, 1 - v / 0.14)));
  const nameScale = useTransform(scrollYProgress, [0, 0.375], [1, still ? 1 : 1.05]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.375], [1, still ? 1 : 1.14]);
  const insetY = useTransform(scrollYProgress, [0.12, 0.375], [0, still ? 0 : 5]);
  const insetX = useTransform(scrollYProgress, [0.12, 0.375], [0, still ? 0 : 6]);
  const radius = useTransform(scrollYProgress, [0.12, 0.375], [0, still ? 0 : 48]);
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`;

  // Pointer: the portrait leans a few pixels against the cursor.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const leanX = useSpring(pointerX, { stiffness: 60, damping: 18 });
  const leanY = useSpring(pointerY, { stiffness: 60, damping: 18 });

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== 'mouse') return;
    pointerX.set((e.clientX / window.innerWidth - 0.5) * -22);
    pointerY.set((e.clientY / window.innerHeight - 0.5) * -12);
  };

  return (
    <section id="hero" ref={heroRef} onPointerMove={onPointerMove} className="relative lg:h-[160vh] motion-reduce:h-auto">
      <motion.div
        style={still ? undefined : { clipPath }}
        className="relative lg:sticky lg:top-0 min-h-screen lg:h-screen flex items-end justify-center overflow-hidden bg-[#F7F4EE] dark:bg-[#0c0a09] transition-colors duration-300 pt-20"
      >
      <div aria-hidden="true" className="hero-aurora absolute inset-0 z-0 pointer-events-none">
        <span />
        <span />
      </div>

      <motion.div
        aria-hidden="true"
        style={{ scale: nameScale }}
        className="hero-name absolute inset-x-0 top-[9vh] lg:top-[6vh] z-0 flex justify-center select-none pointer-events-none origin-top"
      >
        {'BALARAJ'.split('').map((letter, i) => (
          <span key={i} className="block">
            <span className="block" style={delay(0.1 + i * 0.06)}>{letter}</span>
          </span>
        ))}
      </motion.div>

      <div className="relative z-20 w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-end min-h-[calc(100vh-5rem)]">

          <motion.div
            style={{ y: copyY, opacity: copyOpacity }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6 pb-4 sm:pb-8 lg:pb-24 pt-4 relative z-30"
          >
            <div className="hero-rise inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-600/30 dark:border-brand-400/30 bg-brand-500/10 dark:bg-brand-500/20 text-brand-800 dark:text-brand-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm" style={delay(0.1)}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open To AI/ML Opportunities</span>
            </div>

            <h1 className="text-[clamp(2.2rem,4.9vw,4.5rem)] font-black leading-[1.05] tracking-tight text-stone-900 dark:text-white transition-colors">
              <span className={`${headlineClass} !text-base sm:!text-lg font-serif italic font-medium tracking-normal text-stone-700 dark:text-stone-300 mb-2`}>
                <span style={delay(0.15)}>Balaraj R — AI/ML Engineer</span>
              </span>{' '}
              <span className={headlineClass}>
                <span style={delay(0.25)}>Building Real-World</span>
              </span>{' '}
              <span className={headlineClass}>
                <span style={delay(0.35)}>
                  <span className="gradient-text-cyan">AI Systems</span> That
                </span>
              </span>{' '}
              <span className={headlineClass}>
                <span className="text-stone-800 dark:text-stone-200" style={delay(0.45)}>Ship to Production</span>
              </span>
            </h1>

            <p className="hero-rise text-stone-700 dark:text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal transition-colors" style={delay(0.6)}>
              AI/ML engineer specializing in multi-agent orchestration, offline-first Edge AI architectures, and high-throughput event-driven microservices.
            </p>

            <div className="hero-rise grid grid-cols-3 gap-3 sm:gap-6 py-3 w-full max-w-xl border-y border-stone-300 dark:border-stone-800 transition-colors" style={delay(0.7)}>
              {PROOF_STATS.map((stat) =>
                stat.href ? (
                  <a key={stat.label} href={stat.href} target="_blank" rel="noopener noreferrer" className="flex flex-col group">
                    <span className="text-lg sm:text-2xl lg:text-3xl font-black whitespace-nowrap text-stone-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 tracking-tight transition-colors inline-flex items-center gap-1">
                      {stat.value}
                      <ExternalLink className="hidden sm:block w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-brand-600 dark:text-brand-400" />
                    </span>
                    <span className="text-[10px] sm:text-xs text-stone-600 dark:text-stone-400 group-hover:text-brand-700 dark:group-hover:text-brand-300 uppercase tracking-wider font-semibold mt-0.5 transition-colors">
                      {stat.label}
                    </span>
                  </a>
                ) : (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-lg sm:text-2xl lg:text-3xl font-black whitespace-nowrap text-stone-900 dark:text-white tracking-tight transition-colors">
                      {stat.value}
                    </span>
                    <span className="text-[10px] sm:text-xs text-stone-600 dark:text-stone-400 uppercase tracking-wider font-semibold mt-0.5 transition-colors">
                      {stat.label}
                    </span>
                  </div>
                )
              )}
            </div>

            <div className="hero-rise flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto" style={delay(0.8)}>
              <Magnetic className="w-full sm:w-auto">
                <a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); scrollToId('projects'); }}
                  className="btn-fill group flex items-center justify-center gap-3 bg-brand-500 text-stone-950 font-black px-7 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(247,102,22,0.3)] uppercase tracking-wider text-xs sm:text-sm w-full sm:w-auto"
                >
                  <span>Explore AI Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Magnetic>

              <Magnetic className="w-full sm:w-auto">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:border-brand-500/40 text-stone-900 dark:text-stone-100 font-bold px-6 py-3.5 rounded-xl shadow-sm transition-colors duration-300 uppercase tracking-wider text-xs sm:text-sm w-full sm:w-auto"
                >
                  <FileText className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>Resume</span>
                </a>
              </Magnetic>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end items-end w-full select-none self-end pointer-events-none relative z-10">
            <motion.div
              style={{ scale: portraitScale, x: leanX }}
              className="relative flex justify-center lg:justify-end items-end w-full origin-bottom"
            >
              <motion.div style={{ y: leanY }} className="relative hero-portrait lg:translate-x-8 xl:translate-x-14 2xl:translate-x-20">
                <Image
                  src="/balaraj_portrait.png"
                  alt="Balaraj R, AI/ML engineer, seated in a black blazer"
                  width={1015}
                  height={911}
                  preload
                  quality={90}
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 62vw, 440px"
                  className="relative object-contain object-bottom drop-shadow-[0_20px_45px_rgba(28,25,23,0.16)] h-[clamp(320px,46vh,500px)] lg:h-[clamp(560px,86vh,1080px)] w-auto max-w-none"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="hero-fade absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-3 z-30 pointer-events-none" style={delay(1.2)}>
        <span className="text-[10px] uppercase tracking-widest text-stone-600 dark:text-stone-400 font-semibold [writing-mode:vertical-rl]">Scroll</span>
        <div className="w-px h-12 bg-stone-300 dark:bg-stone-700 relative overflow-hidden">
          <span className="scroll-tick absolute inset-x-0 top-0 h-1/2 bg-brand-500" />
        </div>
      </div>
      </motion.div>
    </section>
  );
}
