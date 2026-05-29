"use client";
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView as useFramerInView } from 'framer-motion';
import { ArrowRight, Trophy, Star, ArrowUpRight } from 'lucide-react';
import { useMouseParallax, ParticleField, EASE_OUT_EXPO } from './shared';

function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,#051830_0%,#020c1a_50%,#010508_100%)]" />
      <div
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/bg_hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          opacity: 0.45,
        }}
      />
      <div className="mesh-orb mesh-orb-1" />
      <div className="mesh-orb mesh-orb-2" />
      <div className="mesh-orb mesh-orb-3" />
      <div className="absolute inset-0 hero-grid opacity-[0.15]" />
      {/* Extra glow rings */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyan-500/5 animate-spin-slow" 
        style={{ animationDuration: '40s' }} 
      />
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-blue-500/3 animate-spin-slow" 
        style={{ animationDuration: '60s', animationDirection: 'reverse' }} 
      />
    </div>
  );
}

function ScrollingText({ isInView }: { isInView: boolean }) {
  return (
    <div className="absolute flex flex-col justify-center pointer-events-none overflow-hidden select-none top-1/2 transform -translate-y-[60%] z-10 w-full">
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: EASE_OUT_EXPO }}
        className="text-[clamp(10rem,28vw,35rem)] leading-none font-black text-white/[0.08] whitespace-nowrap tracking-tighter w-max flex animate-scroll-text"
      >
        <span className="px-8">BALARAJ</span>
        <span className="px-8">BALARAJ</span>
        <span className="px-8">BALARAJ</span>
        <span className="px-8">BALARAJ</span>
      </motion.h1>
    </div>
  );
}

interface PanelProps {
  isInView: boolean;
}

function LeftPanel({ isInView }: PanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.4, ease: EASE_OUT_EXPO }}
      className="absolute left-4 sm:left-8 lg:left-12 top-[20%] sm:top-[25%] lg:top-[20%] flex flex-col items-start gap-4 pointer-events-auto z-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white text-xs sm:text-sm font-semibold tracking-widest uppercase"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Open To Opportunities
      </motion.div>

      <div className="flex flex-col mt-2">
        {['FULL-STACK', '& AI / ML', 'ENGINEER'].map((word, i) => (
          <motion.h2
            key={word}
            initial={{ opacity: 0, x: -40, skewX: 5 }}
            animate={isInView ? { opacity: 1, x: 0, skewX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.12, ease: EASE_OUT_EXPO }}
            className={`text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] font-black leading-[0.85] tracking-tighter pointer-events-auto transition-all duration-500 ${
              i === 0
                ? 'gradient-text-cyan pb-2 hover:scale-[1.02] origin-left'
                : i === 1
                ? 'text-[#e0e1dd] mt-2 lg:mt-4 hover:text-cyan-400'
                : 'text-[#e0e1dd] mt-2 lg:mt-4 hover:text-purple-400 flex items-center'
            }`}
          >
            {word}
          </motion.h2>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="text-white/70 font-semibold text-xs sm:text-sm mt-6 uppercase tracking-widest max-w-[320px] leading-relaxed"
      >
        Architecting scalable event-driven infrastructure and robust multi-agent systems.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 mt-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.15)]"
      >
        <Trophy className="w-3.5 h-3.5" />
        2× NATIONAL HACKATHON WINNER
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="mt-6 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-4 bg-[#e0e1dd] text-[#1a1a1a] font-black px-6 py-3.5 sm:px-8 sm:py-4 rounded-full overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-cyan-400 hover:text-white hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm w-full sm:w-auto justify-center"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
          <span className="relative z-10">See Live AI Projects</span>
          <motion.div
            className="bg-[#1a1a1a] text-white p-1 rounded-full relative z-10 group-hover:bg-white group-hover:text-cyan-500 transition-all duration-300"
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.button>
        <motion.a
          href="https://drive.google.com/file/d/1eHgU1BzPQ1m0DxUQqf0EbmLVZ-jRKAYk/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-4 border-2 border-white/20 text-white font-black px-6 py-3.5 sm:px-8 sm:py-4 rounded-full shadow-none hover:bg-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm w-full sm:w-auto justify-center"
        >
          Download Resume
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

function RightPanel({ isInView }: PanelProps) {
  const highlights = [
    { text: '2 National-Level Hackathon Wins (₹2.75L+)', color: 'group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]', icon: 'group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' },
    { text: 'Built 10+ AI-driven applications', color: 'group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]', icon: 'group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]' },
    { text: 'Deployed ML systems used by real users', color: 'group-hover:text-blue-400 group-hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]', icon: 'group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.6, ease: EASE_OUT_EXPO }}
      className="absolute right-4 sm:right-8 lg:right-12 top-[20%] sm:top-[25%] lg:top-[20%] hidden lg:flex flex-col items-end text-right gap-12 pointer-events-auto z-20"
    >
      {/* Stars + Tagline */}
      <div className="max-w-[280px] w-full text-left">
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -30 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.07 }}
            >
              <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            </motion.div>
          ))}
        </div>
        <p className="text-[#e0e1dd] text-sm font-bold leading-relaxed tracking-wide uppercase">
          Award-winning AI/ML developer recognized for high-performance AI integration and scalable systems.
        </p>
      </div>

      {/* Highlights */}
      <div className="flex flex-col items-start text-left max-w-[320px] w-full">
        <h3 className="text-white text-base font-black tracking-[0.05em] uppercase mb-6 drop-shadow-md">
          PROVEN HIGHLIGHTS
        </h3>
        <div className="flex flex-col gap-5 w-full">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start group cursor-pointer w-full"
              whileHover={{ x: -6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <ArrowUpRight className={`w-5 h-5 text-white/40 ${item.icon} mr-4 mt-0.5 transition-all duration-300 flex-shrink-0`} />
              <span className={`text-[#e0e1dd] font-bold text-sm tracking-[0.1em] uppercase ${item.color} transition-all duration-300 leading-relaxed`}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Indicators({ isInView }: PanelProps) {
  return (
    <>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-3 z-30"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold rotate-90 transform translate-y-[-40px]">Scroll Down</span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-cyan-400"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Mobile Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 lg:hidden flex flex-col items-center gap-2 z-30">
        <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Scroll</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1">
          <div className="w-1 h-1.5 bg-cyan-400 rounded-full animate-bounce-slow" />
        </div>
      </div>
    </>
  );
}

export default function HeroSection() {
  const mouseOffset = useMouseParallax(0.015);
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useFramerInView(heroRef, { once: true });

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen min-h-screen flex items-center overflow-hidden bg-[#020c18]"
    >
      <HeroBackground />
      <ParticleField />
      <ScrollingText isInView={isInView} />

      <div className="absolute inset-0 z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        <LeftPanel isInView={isInView} />
        <RightPanel isInView={isInView} />

        {/* Centered portrait with parallax */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE_OUT_EXPO }}
          className="absolute top-0 bottom-0 left-0 right-0 mx-auto w-[85%] sm:w-[480px] lg:w-[620px] xl:w-[820px] flex items-end justify-center pointer-events-none z-30"
        >
          <div
            style={{
              transform: `translate(${mouseOffset.x}px, ${mouseOffset.y * 0.5}px)`,
            }}
            className="w-full h-full flex items-end justify-center pointer-events-none transition-transform duration-300 ease-out relative"
          >
            <Image
              src="/image1.png"
              alt="Balaraj"
              fill
              sizes="(min-width: 1280px) 820px, (min-width: 1024px) 620px, (min-width: 640px) 480px, 85vw"
              className="mb-4 lg:mb-8 object-contain object-bottom drop-shadow-[0_-20px_60px_rgba(6,182,212,0.2)] brightness-110 origin-bottom scale-[1.05]"
              priority
            />
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#020c18] via-[#020c18]/80 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>

      <Indicators isInView={isInView} />
    </section>
  );
}
