"use client";

import { useRef } from 'react';
import { motion, useInView as useFramerInView } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, FileText, ExternalLink } from 'lucide-react';
import { EASE_OUT_EXPO } from './shared';

function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#F7F4EE] dark:bg-[#030712] transition-colors duration-300" />
      <div className="absolute inset-0 hero-grid opacity-[0.15] dark:opacity-[0.25]" />
    </div>
  );
}

function ScrollingText({ isInView }: { isInView: boolean }) {
  return (
    <div className="absolute inset-x-0 top-1/2 -translate-y-[55%] z-0 pointer-events-none overflow-hidden select-none flex items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
        className="w-max flex whitespace-nowrap animate-scroll-text"
      >
        <span className="text-[clamp(9rem,24vw,30rem)] font-black leading-none tracking-tight text-slate-900/[0.08] dark:text-white/[0.12] px-12">
          BALARAJ.
        </span>
        <span className="text-[clamp(9rem,24vw,30rem)] font-black leading-none tracking-tight text-slate-900/[0.08] dark:text-white/[0.12] px-12">
          BALARAJ.
        </span>
        <span className="text-[clamp(9rem,24vw,30rem)] font-black leading-none tracking-tight text-slate-900/[0.08] dark:text-white/[0.12] px-12">
          BALARAJ.
        </span>
        <span className="text-[clamp(9rem,24vw,30rem)] font-black leading-none tracking-tight text-slate-900/[0.08] dark:text-white/[0.12] px-12">
          BALARAJ.
        </span>
      </motion.div>
    </div>
  );
}

function Indicators({ isInView }: { isInView: boolean }) {
  return (
    <>
      {/* Desktop Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-3 z-30 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-400 font-semibold rotate-90 transform translate-y-[-40px]">Scroll Down</span>
        <div className="w-[1px] h-12 bg-slate-300 dark:bg-slate-700 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-cyan-500"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Mobile Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:hidden flex flex-col items-center gap-1.5 z-30 pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-400 font-semibold">Scroll</span>
        <div className="w-4 h-7 border border-slate-400 dark:border-slate-600 rounded-full flex justify-center pt-1">
          <div className="w-1 h-1.5 bg-cyan-500 rounded-full animate-bounce-slow" />
        </div>
      </div>
    </>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useFramerInView(heroRef, { once: true });

  const proofStats = [
    { value: '₹2.75L+', label: 'Hackathon Prize Pool' },
    { value: '40K+ LOC', label: 'Engineered Systems' },
    {
      value: '35+ Badges',
      label: 'Google Skills Profile',
      href: 'https://www.skills.google/public_profiles/7e29917e-8bd6-41e6-8149-0795ae63c97b',
    },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-end justify-center overflow-hidden bg-[#F7F4EE] dark:bg-[#030712] transition-colors duration-300 pt-20 pb-0"
    >
      <HeroBackground />
      <ScrollingText isInView={isInView} />

      <div className="relative z-20 w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end min-h-[calc(100vh-5rem)]">
          
          {/* Left Column: Headline, Pitch, 3 Proof Stats, CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT_EXPO }}
            className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left space-y-6 pb-12 sm:pb-16 lg:pb-24 pt-4 relative z-20"
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-600/30 dark:border-cyan-400/30 bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open To AI/ML Opportunities</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-[clamp(2.2rem,5.2vw,4.5rem)] font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white transition-colors">
                Building Real-World <br className="hidden sm:inline" />
                <span className="gradient-text-cyan">AI Systems</span> That <br className="hidden sm:inline" />
                <span className="text-slate-800 dark:text-slate-200">Ship to Production</span>
              </h1>
            </div>

            {/* One-Sentence Pitch */}
            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed font-normal transition-colors">
              AI/ML engineer specializing in multi-agent orchestration, offline-first Edge AI architectures, and high-throughput event-driven microservices.
            </p>

            {/* 3 Hard-Number Proof Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 py-3 w-full max-w-xl border-y border-slate-300 dark:border-slate-800 transition-colors">
              {proofStats.map((stat, i) =>
                stat.href ? (
                  <a
                    key={i}
                    href={stat.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col group cursor-pointer"
                  >
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 tracking-tight transition-colors inline-flex items-center gap-1">
                      {stat.value}
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-cyan-600 dark:text-cyan-400" />
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 uppercase tracking-wider font-semibold mt-0.5 transition-colors">
                      {stat.label}
                    </span>
                  </a>
                ) : (
                  <div key={i} className="flex flex-col">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
                      {stat.value}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider font-semibold mt-0.5 transition-colors">
                      {stat.label}
                    </span>
                  </div>
                )
              )}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-7 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(6,182,212,0.3)] transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm w-full sm:w-auto"
              >
                <span>Explore AI Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-center gap-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-cyan-500/40 text-slate-900 dark:text-slate-100 font-bold px-6 py-3.5 rounded-xl shadow-sm transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm w-full sm:w-auto"
              >
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Resume</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Hero Portrait scaled directly to top near navigation bar, seated at bottom-right */}
          <div className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end items-end w-full select-none self-end pointer-events-none relative z-10">
            <div className="relative flex justify-center lg:justify-end items-end w-full lg:translate-x-8 xl:translate-x-14 2xl:translate-x-20">
              <Image
                src="/balaraj_hero.png"
                alt="Balaraj R — Systems & AI Engineer"
                width={1015}
                height={911}
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain object-bottom drop-shadow-[0_20px_45px_rgba(15,23,42,0.16)] h-[clamp(340px,52vh,500px)] lg:h-[clamp(560px,92vh,1080px)] w-auto max-w-none"
              />
            </div>
          </div>

        </div>
      </div>

      <Indicators isInView={isInView} />
    </section>
  );
}
