"use client";
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView as useFramerInView } from 'framer-motion';
import { Trophy, Cpu } from 'lucide-react';
import { AuroraBackground, fadeInUp, staggerContainer, scaleIn } from './shared';
import { SKILL_CATEGORIES, TECH_LOGOS, SkillCategory } from '../constants/skills';

function TechLogoGrid({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      className="mb-20 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3 sm:gap-4"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      {TECH_LOGOS.map((tech) => (
        <motion.div
          key={tech.name}
          variants={scaleIn}
          whileHover={{ y: -6, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="flex flex-col items-center justify-center gap-3 p-4 glass rounded-2xl border border-white/80 dark:border-white/10 cursor-default transition-all duration-300 group shadow-sm hover:border-cyan-500/40"
        >
          {tech.icon === 'langchain' ? (
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 opacity-60 group-hover:opacity-100 transition-all duration-300 fill-slate-800 dark:fill-slate-200 group-hover:fill-cyan-600 dark:group-hover:fill-cyan-400"
              aria-label={tech.name}
            >
              <path d="M13.796 0a6.93 6.93 0 0 0-4.91 2.019L5.451 5.455l3.273 3.27 3.432-3.432a2.284 2.284 0 0 1 3.277 0 2.28 2.28 0 0 1 0 3.275L12 12.001l3.273 3.273 3.433-3.435c2.692-2.692 2.692-7.127 0-9.82A6.92 6.92 0 0 0 13.796 0m-5.07 8.728-3.433 3.434c-2.692 2.693-2.692 7.126 0 9.819A6.92 6.92 0 0 0 10.203 24a6.93 6.93 0 0 0 4.911-2.02l3.432-3.432-3.271-3.272-3.433 3.433a2.284 2.284 0 0 1-3.277 0 2.28 2.28 0 0 1 0-3.276L12 12z" />
            </svg>
          ) : (
            <span
              aria-label={tech.name}
              className="w-8 h-8 opacity-60 group-hover:opacity-100 transition-all duration-300 bg-slate-800 dark:bg-slate-200 group-hover:bg-cyan-600 dark:group-hover:bg-cyan-400"
              style={{
                mask: `url('https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${tech.icon}.svg') center / contain no-repeat`,
                WebkitMask: `url('https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${tech.icon}.svg') center / contain no-repeat`,
              }}
            />
          )}
          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors tracking-wider uppercase text-center">
            {tech.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function CapabilityCard({ category, catIndex, isInView }: { category: SkillCategory; catIndex: number; isInView: boolean }) {
  const Icon = category.icon;
  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay: catIndex * 0.15 + 0.2 }}
      whileHover={{ y: -6 }}
      className={`relative overflow-hidden glass-card rounded-3xl p-8 sm:p-10 border border-white/85 dark:border-white/10 transition-all duration-500 group ${category.glow} flex flex-col justify-between shadow-md`}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className="w-14 h-14 bg-white/90 dark:bg-slate-900/90 glass rounded-2xl flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80 shadow-sm"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Icon className={`w-7 h-7 ${category.color}`} />
          </motion.div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">{category.title}</h3>
        </div>

        <ul className="space-y-4 mb-10">
          {category.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <div className={`w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 ${category.color.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]`} />
              <span className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium transition-colors">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 pt-6 border-t border-slate-200/80 dark:border-slate-800">
        <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest block mb-3">Core Stack</span>
        <div className="flex flex-wrap gap-2">
          {category.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold px-3 py-1 rounded-full border border-slate-300/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-sm whitespace-nowrap shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceCard({ isInView }: { isInView: boolean }) {
  const experiences = [
    { name: 'CareerLens', tag: '32 Microservices', desc: 'Built scalable AI-powered backend (40K+ LOC) processing real-time generation queues and embedding pipelines.' },
    { name: 'AgriSence', tag: 'GCP Deployed', desc: 'Deployed end-to-end ML architectures handling image segmentation models on scalable cloud functions.' },
  ];

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay: 0.8 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-3xl p-8 sm:p-10 border border-white/85 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-500 group relative overflow-hidden shadow-md"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/8 rounded-full blur-[80px] transform -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/15 transition-colors duration-700 pointer-events-none" />
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 relative z-10 transition-colors">
        <Trophy className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
        Production Experience
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 rounded-lg ml-2 border border-cyan-500/20">Highly Unique</span>
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 relative z-10 tracking-wide uppercase font-semibold">Where I&apos;ve Applied These Skills:</p>
      <div className="space-y-4 relative z-10">
        {experiences.map((item) => (
          <motion.div
            key={item.name}
            className="bg-white/80 dark:bg-slate-900/80 border border-white/90 dark:border-slate-800 rounded-2xl p-5 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 shadow-sm"
            whileHover={{ x: 4 }}
          >
            <h4 className="text-slate-900 dark:text-white font-bold mb-2 flex items-center justify-between transition-colors">
              {item.name}
              <span className="text-cyan-700 dark:text-cyan-400 text-xs font-mono font-bold">{item.tag}</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ArsenalCard({ isInView }: { isInView: boolean }) {
  const arsenal = [
    { label: 'AI & Data', value: 'Vertex AI, Gemini, LangChain, PyTorch' },
    { label: 'Frontend', value: 'Next.js 16, React, Tailwind CSS, Framer' },
    { label: 'Backend', value: 'Node.js, TypeScript, FastAPI, Firebase' },
    { label: 'Cloud & DevOps', value: 'GCP, Docker, GitHub Actions, Vercel' },
  ];

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay: 0.9 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-3xl p-8 sm:p-10 border border-white/85 dark:border-white/10 hover:border-emerald-500/40 transition-all duration-500 group relative shadow-md"
    >
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/8 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/15 transition-colors duration-700 pointer-events-none" />
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 relative z-10 transition-colors">
        <Cpu className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /> Complete Arsenal
      </h3>
      <div className="space-y-5 text-sm relative z-10">
        {arsenal.map((row) => (
          <motion.div
            key={row.label}
            className="flex justify-between items-end border-b border-slate-200/80 dark:border-slate-800 pb-2 hover:border-emerald-500/40 transition-colors"
            whileHover={{ x: 4 }}
          >
            <span className="text-slate-500 dark:text-slate-400 uppercase tracking-widest text-[10px] font-bold">{row.label}</span>
            <span className="text-slate-900 dark:text-white font-semibold text-right max-w-[55%] transition-colors">{row.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useFramerInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={sectionRef} className="py-24 sm:py-32 relative bg-transparent overflow-hidden">
      <AuroraBackground />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <p className="section-label mx-auto w-fit">Capabilities</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic font-medium text-slate-900 dark:text-white tracking-tight transition-colors">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 dark:from-cyan-400 dark:via-sky-400 dark:to-blue-400">Capabilities</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed transition-colors">
            I design, build, and deploy production-grade AI systems — from model development to scalable cloud infrastructure.
          </p>
        </motion.div>

        <TechLogoGrid isInView={isInView} />

        <div className="grid lg:grid-cols-2 gap-8 xl:gap-10">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <CapabilityCard
              key={category.title}
              category={category}
              catIndex={catIndex}
              isInView={isInView}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 xl:gap-10 mt-10">
          <ExperienceCard isInView={isInView} />
          <ArsenalCard isInView={isInView} />
        </div>
      </div>
    </section>
  );
}
