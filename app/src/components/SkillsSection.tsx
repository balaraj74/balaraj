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
      className="mb-20 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4"
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
          className={`flex flex-col items-center justify-center gap-3 p-4 glass rounded-2xl border border-white/5 cursor-default transition-all duration-300 group ${tech.color}`}
        >
          <span
            aria-label={tech.name}
            className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-all duration-300 bg-white group-hover:bg-current"
            style={{
              mask: `url('https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${tech.icon}.svg') center / contain no-repeat`,
              WebkitMask: `url('https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${tech.icon}.svg') center / contain no-repeat`,
            }}
          />
          <span className="text-[10px] font-bold text-white/40 group-hover:text-current transition-colors tracking-wider uppercase">
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
      className={`relative overflow-hidden glass-card rounded-3xl p-8 border border-white/5 transition-all duration-500 group ${category.glow} flex flex-col justify-between card-shine`}
    >
      <div className="absolute inset-y-0 right-0 w-2/3 md:w-1/2 opacity-15 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-r-3xl z-0">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#040010]/80 to-[#040010] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040010] via-transparent to-[#040010] z-10" />
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(min-width: 768px) 50vw, 67vw"
          className="object-cover object-center mix-blend-screen scale-110 group-hover:scale-125 transition-transform duration-1000"
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className={`w-14 h-14 glass rounded-2xl flex items-center justify-center border border-white/10 ${category.badgeBg.split(' ')[0]}`}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Icon className={`w-7 h-7 ${category.color}`} />
          </motion.div>
          <h3 className="text-2xl font-bold text-white tracking-tight">{category.title}</h3>
        </div>

        <ul className="space-y-4 mb-10 max-w-md">
          {category.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <div className={`w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 ${category.color.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]`} />
              <span className="text-white/70 text-sm sm:text-base leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 pt-6 border-t border-white/10">
        <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest block mb-3">Core Stack</span>
        <div className="flex flex-wrap gap-2">
          {category.techStack.map((tech, idx) => (
            <span
              key={idx}
              className={`text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-sm whitespace-nowrap ${category.badgeBg}`}
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
      className="glass-card rounded-3xl p-8 border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_50px_rgba(34,211,238,0.12)] transition-all duration-500 group relative overflow-hidden card-shine"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/8 rounded-full blur-[80px] transform -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/15 transition-colors duration-700 pointer-events-none" />
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
        <Trophy className="w-6 h-6 text-cyan-400" />
        Production Experience
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-cyan-500/10 text-cyan-300 rounded-lg ml-2 border border-cyan-500/20">Highly Unique</span>
      </h3>
      <p className="text-white/40 text-sm mb-6 relative z-10 tracking-wide uppercase">Where I&apos;ve Applied These Skills:</p>
      <div className="space-y-4 relative z-10">
        {experiences.map((item) => (
          <motion.div
            key={item.name}
            className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/8 hover:border-cyan-500/20 transition-all duration-300"
            whileHover={{ x: 4 }}
          >
            <h4 className="text-white font-semibold mb-2 flex items-center justify-between">
              {item.name}
              <span className="text-cyan-400/80 text-xs font-mono">{item.tag}</span>
            </h4>
            <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
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
      className="glass-card rounded-3xl p-8 border border-white/5 hover:border-emerald-500/30 hover:shadow-[0_0_50px_rgba(52,211,153,0.12)] transition-all duration-500 group relative card-shine"
    >
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/8 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/15 transition-colors duration-700 pointer-events-none" />
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
        <Cpu className="w-6 h-6 text-emerald-400" /> Complete Arsenal
      </h3>
      <div className="space-y-5 text-sm relative z-10">
        {arsenal.map((row) => (
          <motion.div
            key={row.label}
            className="flex justify-between items-end border-b border-white/10 pb-2 hover:border-emerald-500/40 transition-colors"
            whileHover={{ x: 4 }}
          >
            <span className="text-white/40 uppercase tracking-widest text-[10px] font-bold">{row.label}</span>
            <span className="text-white/90 font-medium text-right max-w-[55%]">{row.value}</span>
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
    <section id="skills" ref={sectionRef} className="relative py-32 bg-[#040010] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "url('/images/bg_skills.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', opacity: 0.35 }} />
      <AuroraBackground />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <p className="section-label mx-auto w-fit">Capabilities</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">Capabilities</span>
          </h2>
          <p className="text-white/45 mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            I design, build, and deploy production-grade AI systems — from model development to scalable cloud infrastructure.
          </p>
        </motion.div>

        <TechLogoGrid isInView={isInView} />

        <div className="grid lg:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, catIndex) => (
            <CapabilityCard
              key={category.title}
              category={category}
              catIndex={catIndex}
              isInView={isInView}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <ExperienceCard isInView={isInView} />
          <ArsenalCard isInView={isInView} />
        </div>
      </div>
    </section>
  );
}
