"use client";
import { useRef } from 'react';
import { motion, useInView as useFramerInView } from 'framer-motion';
import { Mail, Github, FileText, Brain, Code2, Cloud, Shield } from 'lucide-react';
import { AuroraBackground, fadeInLeft, staggerContainer, fadeInUp, scaleIn } from './shared';

interface Highlight {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}

const HIGHLIGHTS: Highlight[] = [
  { icon: Brain, label: 'Agentic AI Systems', desc: 'Multi-agent workflows, LLM orchestration, tool usage', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { icon: Code2, label: 'Full-Stack AI Apps', desc: 'Next.js, APIs, ML integration, real-time UI', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
  { icon: Cloud, label: 'Cloud & MLOps', desc: 'GCP, Docker, deployment pipelines', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { icon: Shield, label: 'AI Security', desc: 'Model safety, adversarial thinking, secure systems', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
];

function ProfileCodeCard({ isInView }: { isInView: boolean }) {
  const codeLines = [
    { num: '01', key: 'name', val: '"Balaraj R"' },
    { num: '02', key: 'role', val: '"Systems Architect & AI"' },
    { num: '03', key: 'university', val: '"PES University"' },
    { num: '04', key: 'focus', val: '"Distributed Systems, DS&A"' },
    { num: '05', key: 'specialization', val: '"AI & ML"' },
    { num: '06', key: 'hackathonPrizes', val: '"₹2,75,000"' },
    { num: '07', key: 'certifications', val: '35', isNum: true },
    { num: '08', key: 'linesOfCode', val: '"40,000+"' },
  ];

  return (
    <div className="relative">
      {/* Subtle ambient blur backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-sky-500/5 to-transparent rounded-3xl blur-2xl pointer-events-none" />

      {/* Main Glass IDE Card */}
      <motion.div
        className="relative glass-card rounded-3xl p-6 sm:p-7 font-mono text-xs sm:text-sm overflow-hidden group shadow-xl border border-white/90 dark:border-white/10 backdrop-blur-2xl transition-all duration-500"
        whileHover={{ y: -6, boxShadow: '0 24px 50px -10px rgba(6,182,212,0.2)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* IDE Window Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80 hover:bg-amber-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <span>balaraj.profile.ts</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">TS</span>
        </div>

        {/* Code Content */}
        <div className="space-y-1.5 leading-relaxed text-slate-800 dark:text-slate-200">
          <div className="flex items-center">
            <span className="text-slate-400/70 dark:text-slate-600 select-none mr-3 text-xs w-5 text-right font-normal">00</span>
            <span>
              <span className="text-purple-700 dark:text-purple-400 font-bold">const</span>{' '}
              <span className="text-cyan-700 dark:text-cyan-300 font-bold">balaraj</span>{' '}
              <span className="text-slate-500 dark:text-slate-400">=</span>{' '}
              <span className="text-slate-500 dark:text-slate-400">{'{'}</span>
            </span>
          </div>

          {codeLines.map((line, i) => (
            <motion.div
              key={line.key}
              className="flex items-center pl-2"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
            >
              <span className="text-slate-400/70 dark:text-slate-600 select-none mr-3 text-xs w-5 text-right font-normal">{line.num}</span>
              <span className="pl-3">
                <span className="text-sky-800 dark:text-sky-300 font-medium">{line.key}</span>
                <span className="text-slate-500 dark:text-slate-400">: </span>
                <span className={line.isNum ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-emerald-700 dark:text-emerald-300 font-medium'}>
                  {line.val}
                </span>
                <span className="text-slate-400 dark:text-slate-500">,</span>
              </span>
            </motion.div>
          ))}

          <div className="flex items-center pl-2">
            <span className="text-slate-400/70 dark:text-slate-600 select-none mr-3 text-xs w-5 text-right font-normal">09</span>
            <span className="pl-3">
              <span className="text-sky-800 dark:text-sky-300 font-medium">openSource</span>
              <span className="text-slate-500 dark:text-slate-400">: [</span>
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">&quot;Ubuntu&quot;</span>
              <span className="text-slate-400">, </span>
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">&quot;Pandas&quot;</span>
              <span className="text-slate-400">, </span>
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">&quot;NumPy&quot;</span>
              <span className="text-slate-500 dark:text-slate-400">],</span>
            </span>
          </div>

          <div className="flex items-center pl-2">
            <span className="text-slate-400/70 dark:text-slate-600 select-none mr-3 text-xs w-5 text-right font-normal">10</span>
            <span className="pl-3">
              <span className="text-sky-800 dark:text-sky-300 font-medium">badge</span>
              <span className="text-slate-500 dark:text-slate-400">: </span>
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">&quot;GitHub Pull Shark ×2&quot;</span>
              <span className="text-slate-400">,</span>
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-slate-400/70 dark:text-slate-600 select-none mr-3 text-xs w-5 text-right font-normal">11</span>
            <span>
              <span className="text-slate-500 dark:text-slate-400">{'}'};</span>
              <span className="inline-block w-2 bg-cyan-500 h-4 ml-1.5 animate-pulse align-middle" />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating Badge */}
      <motion.div
        className="absolute -bottom-5 -right-5 glass-card rounded-2xl p-4 sm:p-5 border border-white/95 dark:border-white/10 shadow-xl"
        initial={{ opacity: 0, scale: 0.7, rotate: 6 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 300 }}
        whileHover={{ rotate: -3, scale: 1.05 }}
      >
        <div className="text-3xl sm:text-4xl font-black gradient-text-cyan">3rd</div>
        <div className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold tracking-tight">Year B.Tech<br /><span className="text-slate-500 dark:text-slate-400 font-normal">CSE · AI &amp; ML</span></div>
      </motion.div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useFramerInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={sectionRef} className="py-24 sm:py-32 relative bg-transparent overflow-hidden">
      <AuroraBackground />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-950/10 to-transparent" />

      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-20 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInLeft}
            className="lg:col-span-5"
          >
            <ProfileCodeCard isInView={isInView} />
          </motion.div>

          <motion.div
            className="lg:col-span-7 space-y-8"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <p className="section-label">About Me</p>
              <h2 className="text-4xl sm:text-5xl font-serif italic font-medium text-slate-900 dark:text-white leading-tight tracking-tight transition-colors">
                Building AI That<br />
                <span className="gradient-text-cyan">Ships to Production</span>
              </h2>
              <p className="text-cyan-700 dark:text-cyan-400 font-semibold tracking-wide text-sm sm:text-base mt-3 transition-colors">
                Focused on building real-world AI systems — not just models, but deployable products.
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={fadeInUp}>
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed transition-colors">
                I&apos;m a 3rd-year B.Tech CSE student at <strong className="text-slate-900 dark:text-white">PES University</strong> specializing in AI &amp; ML. I build and deploy production-grade AI systems, including <strong className="text-cyan-700 dark:text-cyan-400">CareerLens</strong> (40,000+ LOC, 32 services) and <strong className="text-cyan-700 dark:text-cyan-400">AgriSence</strong> (GCP-based ML platform with 400+ commits).
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                I&apos;m a <strong className="text-slate-900 dark:text-white">National-level hackathon winner</strong> with <strong className="text-emerald-600 dark:text-emerald-400 font-bold">₹2.75L+</strong> in prizes—most notably securing a flagship victory in the <strong className="gradient-text-cyan">Google GenAI Hackathon</strong>. I hold 35+ top-tier certifications across multi-cloud infrastructure and cybersecurity, and actively shape open-source ecosystems with merged contributions to <strong className="text-slate-900 dark:text-white">Ubuntu, Pandas, and NumPy</strong> (GitHub Pull Shark ×2).
              </p>
            </motion.div>

            {/* Highlights grid */}
            <motion.div className="grid grid-cols-2 gap-4" variants={staggerContainer}>
              {HIGHLIGHTS.map((h) => (
                <motion.div
                  key={h.label}
                  variants={scaleIn}
                  className="glass-card rounded-2xl p-5 group cursor-default"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <div className={`w-10 h-10 ${h.bg} ${h.border} border rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <h.icon className={`w-5 h-5 ${h.color}`} />
                  </div>
                  <div className="text-slate-900 dark:text-white font-bold mb-1 transition-colors">{h.label}</div>
                  <div className="text-slate-600 dark:text-slate-400 text-sm transition-colors">{h.desc}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="flex flex-wrap gap-4 mt-8" variants={fadeInUp}>
              <motion.a
                href="mailto:balarajr483@gmail.com"
                className="btn-primary group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4 mr-2" />
                <span>Get In Touch</span>
              </motion.a>

              <motion.a
                href="https://github.com/balaraj74"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all shadow-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4 mr-2" />
                <span>GitHub Profile</span>
              </motion.a>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all shadow-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-4 h-4 mr-2 text-cyan-600 dark:text-cyan-400" />
                <span>View Resume</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
