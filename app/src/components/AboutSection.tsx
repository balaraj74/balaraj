"use client";
import { motion } from 'framer-motion';
import { Mail, Github, FileText, Brain, Code2, Cloud, Shield } from 'lucide-react';
import { AuroraBackground, fadeInLeft, staggerContainer, fadeInUp, scaleIn } from './shared';
import { RESUME_URL } from '../constants/contacts';
import { Magnetic, RevealText, ScrollWords, SpotlightCard, VIEWPORT } from './motion/primitives';

interface Highlight {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}

const HIGHLIGHTS: Highlight[] = [
  { icon: Brain, label: 'Agentic AI Systems', desc: 'Multi-agent workflows, LLM orchestration, tool usage', color: 'text-brand-400', bg: 'bg-brand-500/10', border: 'border-brand-500/20' },
  { icon: Code2, label: 'Full-Stack AI Apps', desc: 'Next.js, APIs, ML integration, real-time UI', color: 'text-gold-400', bg: 'bg-gold-500/10', border: 'border-gold-500/20' },
  { icon: Cloud, label: 'Cloud & MLOps', desc: 'GCP, Docker, deployment pipelines', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { icon: Shield, label: 'AI Security', desc: 'Model safety, adversarial thinking, secure systems', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
];

function ProfileCodeCard() {
  const codeLines = [
    { num: '01', key: 'name', val: '"Balaraj R"' },
    { num: '02', key: 'role', val: '"Systems Architect & AI"' },
    { num: '03', key: 'university', val: '"PES University"' },
    { num: '04', key: 'focus', val: '"Distributed Systems, DS&A"' },
    { num: '05', key: 'specialization', val: '"AI & ML"' },
    { num: '06', key: 'hackathonPrizes', val: '"₹2,75,000"' },
    { num: '07', key: 'certifications', val: '25', isNum: true },
    { num: '08', key: 'linesOfCode', val: '"40,000+"' },
  ];

  return (
    <div className="relative">
      {/* Subtle ambient blur backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-gold-500/5 to-transparent rounded-3xl blur-2xl pointer-events-none" />

      {/* Main Glass IDE Card */}
      <SpotlightCard className="glass-card rounded-3xl p-6 sm:p-7 font-mono text-xs sm:text-sm overflow-hidden group shadow-xl border border-white/90 dark:border-white/10 backdrop-blur-2xl transition-colors duration-500">
        {/* IDE Window Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200/80 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80 hover:bg-amber-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-stone-100/80 dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700/70 text-stone-700 dark:text-stone-300 text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            <span>balaraj.profile.ts</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400 dark:text-stone-500">TS</span>
        </div>

        {/* Code Content */}
        <div className="space-y-1.5 leading-relaxed text-stone-800 dark:text-stone-200">
          <div className="flex items-center">
            <span className="text-stone-400/70 dark:text-stone-600 select-none mr-3 text-xs w-5 text-right font-normal">00</span>
            <span>
              <span className="text-gold-700 dark:text-gold-400 font-bold">const</span>{' '}
              <span className="text-brand-700 dark:text-brand-300 font-bold">balaraj</span>{' '}
              <span className="text-stone-600 dark:text-stone-400">=</span>{' '}
              <span className="text-stone-600 dark:text-stone-400">{'{'}</span>
            </span>
          </div>

          {codeLines.map((line, i) => (
            <motion.div
              key={line.key}
              className="flex items-center pl-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
            >
              <span className="text-stone-400/70 dark:text-stone-600 select-none mr-3 text-xs w-5 text-right font-normal">{line.num}</span>
              <span className="pl-3">
                <span className="text-gold-800 dark:text-gold-300 font-medium">{line.key}</span>
                <span className="text-stone-600 dark:text-stone-400">: </span>
                <span className={line.isNum ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-emerald-700 dark:text-emerald-300 font-medium'}>
                  {line.val}
                </span>
                <span className="text-stone-400 dark:text-stone-500">,</span>
              </span>
            </motion.div>
          ))}

          <div className="flex items-center pl-2">
            <span className="text-stone-400/70 dark:text-stone-600 select-none mr-3 text-xs w-5 text-right font-normal">09</span>
            <span className="pl-3">
              <span className="text-gold-800 dark:text-gold-300 font-medium">openSource</span>
              <span className="text-stone-600 dark:text-stone-400">: [</span>
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">&quot;Ubuntu&quot;</span>
              <span className="text-stone-400">, </span>
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">&quot;Pandas&quot;</span>
              <span className="text-stone-400">, </span>
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">&quot;NumPy&quot;</span>
              <span className="text-stone-600 dark:text-stone-400">],</span>
            </span>
          </div>

          <div className="flex items-center pl-2">
            <span className="text-stone-400/70 dark:text-stone-600 select-none mr-3 text-xs w-5 text-right font-normal">10</span>
            <span className="pl-3">
              <span className="text-gold-800 dark:text-gold-300 font-medium">badge</span>
              <span className="text-stone-600 dark:text-stone-400">: </span>
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">&quot;GitHub Pull Shark ×2&quot;</span>
              <span className="text-stone-400">,</span>
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-stone-400/70 dark:text-stone-600 select-none mr-3 text-xs w-5 text-right font-normal">11</span>
            <span>
              <span className="text-stone-600 dark:text-stone-400">{'}'};</span>
              <span className="inline-block w-2 bg-brand-500 h-4 ml-1.5 animate-pulse align-middle" />
            </span>
          </div>
        </div>
      </SpotlightCard>

      {/* Floating Badge */}
      <motion.div
        className="absolute -bottom-5 -right-5 glass-card rounded-2xl p-4 sm:p-5 border border-white/95 dark:border-white/10 shadow-xl"
        initial={{ opacity: 0, scale: 0.7, rotate: 6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 300 }}
        whileHover={{ rotate: -3, scale: 1.05 }}
      >
        <div className="text-3xl sm:text-4xl font-black gradient-text-cyan">3rd</div>
        <div className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm font-semibold tracking-tight">Year B.Tech<br /><span className="text-stone-600 dark:text-stone-400 font-normal">CSE · AI &amp; ML</span></div>
      </motion.div>
    </div>
  );
}

export default function AboutSection() {

  return (
    <section id="about" className="py-24 sm:py-32 relative bg-transparent overflow-hidden">
      <AuroraBackground />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-ember-950/10 to-transparent" />

      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <ScrollWords
          text="Focused on building real-world AI systems — not just models, but deployable products."
          className="max-w-6xl mb-24 sm:mb-32 text-[clamp(2rem,5.4vw,5rem)] font-serif italic font-medium leading-[1.12] tracking-tight text-stone-900 dark:text-white"
        />
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
      viewport={VIEWPORT}
            variants={fadeInLeft}
            className="lg:col-span-5"
          >
            <ProfileCodeCard />
          </motion.div>

          <motion.div
            className="lg:col-span-7 space-y-8"
            initial="hidden"
            whileInView="visible"
      viewport={VIEWPORT}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <p className="section-label">About Me</p>
              <RevealText
                className="text-[clamp(2.75rem,5.4vw,5rem)] leading-[1.04] font-serif italic font-medium text-stone-900 dark:text-white tracking-tight transition-colors"
                segments={[{ text: 'Building AI That', br: true }, { text: 'Ships to Production', className: 'gradient-text-cyan' }]}
              />
            </motion.div>

            <motion.div className="space-y-4" variants={fadeInUp}>
              <p className="text-stone-700 dark:text-stone-300 text-lg leading-relaxed transition-colors">
                I&apos;m a 3rd-year B.Tech CSE student at <strong className="text-stone-900 dark:text-white">PES University</strong> specializing in AI &amp; ML. I build and deploy production-grade AI systems, including <strong className="text-brand-700 dark:text-brand-400">CareerLens</strong> (40,000+ LOC, 32 services) and <strong className="text-brand-700 dark:text-brand-400">AgriSence</strong> (GCP-based ML platform with 400+ commits).
              </p>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed transition-colors">
                I&apos;m a <strong className="text-stone-900 dark:text-white">National-level hackathon winner</strong> with <strong className="text-emerald-600 dark:text-emerald-400 font-bold">₹2.75L+</strong> in prizes—most notably securing a flagship victory in the <strong className="gradient-text-cyan">Google GenAI Hackathon</strong>. I hold 25+ top-tier certifications across multi-cloud infrastructure and cybersecurity, and actively shape open-source ecosystems with merged contributions to <strong className="text-stone-900 dark:text-white">Ubuntu, Pandas, and NumPy</strong> (GitHub Pull Shark ×2).
              </p>
            </motion.div>

            {/* Highlights grid */}
            <motion.div className="grid grid-cols-2 gap-4" variants={staggerContainer}>
              {HIGHLIGHTS.map((h) => (
                <motion.div key={h.label} variants={scaleIn}>
                  <SpotlightCard className="glass-card rounded-2xl p-5 group cursor-default h-full">
                  <div className={`w-10 h-10 ${h.bg} ${h.border} border rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <h.icon className={`w-5 h-5 ${h.color}`} />
                  </div>
                  <div className="text-stone-900 dark:text-white font-bold mb-1 transition-colors">{h.label}</div>
                  <div className="text-stone-600 dark:text-stone-400 text-sm transition-colors">{h.desc}</div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="flex flex-wrap gap-4 mt-8" variants={fadeInUp}>
              <Magnetic>
              <motion.a
                href="mailto:balu.balarajr@gmail.com"
                className="btn-primary group"
                whileTap={{ scale: 0.97 }}
              >
                <Mail className="w-4 h-4 mr-2" />
                <span>Get In Touch</span>
              </motion.a>
              </Magnetic>

              <Magnetic>
              <motion.a
                href="https://github.com/balaraj74"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-all shadow-sm"
                whileTap={{ scale: 0.97 }}
              >
                <Github className="w-4 h-4 mr-2" />
                <span>GitHub Profile</span>
              </motion.a>
              </Magnetic>

              <Magnetic>
              <motion.a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-all shadow-sm"
                whileTap={{ scale: 0.97 }}
              >
                <FileText className="w-4 h-4 mr-2 text-brand-600 dark:text-brand-400" />
                <span>View Resume</span>
              </motion.a>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
