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
    { key: 'name', val: '"Balaraj R"' },
    { key: 'role', val: '"Systems Architect & AI"' },
    { key: 'university', val: '"PES University"' },
    { key: 'focus', val: '"Distributed Systems, DS&A"' },
    { key: 'specialization', val: '"AI & ML"' },
    { key: 'hackathonPrizes', val: '"₹2,75,000"' },
    { key: 'certifications', val: '35', isNum: true },
    { key: 'linesOfCode', val: '"40,000+ (solo)"' },
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/15 to-blue-600/5 rounded-3xl blur-2xl" />
      <motion.div
        className="relative glass-card rounded-3xl p-8 border border-white/10 font-mono text-sm overflow-hidden group card-shine animated-border"
        whileHover={{ rotate: -0.5, scale: 1.01, y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.8)] opacity-0 group-hover:opacity-100 animate-scan pointer-events-none z-20" />

        <div className="flex gap-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
          <span className="ml-2 text-white/30 text-xs">balaraj.profile.ts</span>
        </div>

        <div className="space-y-1.5 text-white/80">
          <div><span className="text-violet-400">const</span> <span className="text-sky-300">balaraj</span> <span className="text-white/40">=</span> {'{'}</div>
          {codeLines.map((line, i) => (
            <motion.div
              key={line.key}
              className="pl-4"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.06 }}
            >
              <span className="text-emerald-300">{line.key}</span>
              <span className="text-white/40">:</span>{' '}
              <span className={line.isNum ? 'text-violet-300' : 'text-amber-300'}>{line.val}</span>
              <span className="text-white/40">,</span>
            </motion.div>
          ))}
          <div className="pl-4">
            <span className="text-emerald-300">openSource</span><span className="text-white/40">: {`[`}</span>
          </div>
          <div className="pl-8 text-amber-300">&quot;Ubuntu&quot;<span className="text-white/40">,</span> &quot;Pandas&quot;<span className="text-white/40">,</span> &quot;NumPy&quot;<span className="text-white/40">,</span></div>
          <div className="pl-4"><span className="text-white/40">{`]`},</span></div>
          <div className="pl-4"><span className="text-emerald-300">badge</span><span className="text-white/40">:</span> <span className="text-amber-300">&quot;GitHub Pull Shark x2&quot;</span><span className="text-white/40">,</span></div>
          <div>{'}'}<span className="text-white/40">;</span> <span className="inline-block w-2 bg-cyan-400 h-4 ml-1 animate-pulse align-middle" /></div>
        </div>
      </motion.div>

      {/* Floating Badge */}
      <motion.div
        className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-5 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
        initial={{ opacity: 0, scale: 0.7, rotate: 10 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8, type: 'spring', stiffness: 300 }}
        whileHover={{ rotate: -5, scale: 1.05 }}
      >
        <div className="text-4xl font-black gradient-text-cyan">2nd</div>
        <div className="text-white/60 text-sm">Year BTech<br />CSE · AI & ML</div>
      </motion.div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useFramerInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={sectionRef} className="relative py-28 bg-[#050d1a] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "url('/images/bg_about.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', opacity: 0.35 }} />
      <AuroraBackground />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-950/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInLeft}
          >
            <ProfileCodeCard isInView={isInView} />
          </motion.div>

          <motion.div
            className="space-y-8"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <p className="section-label">About Me</p>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                Building AI That<br />
                <span className="gradient-text-cyan">Ships to Production</span>
              </h2>
              <p className="text-cyan-400 font-semibold tracking-wide text-sm sm:text-base mt-3 opacity-90">
                Focused on building real-world AI systems — not just models, but deployable products.
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={fadeInUp}>
              <p className="text-white/65 text-lg leading-relaxed">
                I&apos;m a 1st-year B.Tech CSE student at <strong className="text-white">PES University</strong> specializing in AI &amp; ML. I build and deploy production-grade AI systems, including <strong className="text-cyan-400">CareerLens</strong> (40,000+ LOC, 32 services) and <strong className="text-cyan-400">AgriSence</strong> (GCP-based ML platform with 400+ commits).
              </p>
              <p className="text-white/50 leading-relaxed">
                I&apos;m a <strong className="text-white">National-level hackathon winner</strong> with <strong className="text-emerald-400">₹2.75L+</strong> in prizes—most notably securing a flagship victory in the <strong className="gradient-text-cyan">Google GenAI Hackathon</strong>. I hold 35+ top-tier certifications across multi-cloud infrastructure and cybersecurity, and actively shape open-source ecosystems with merged contributions to <strong className="text-white">Ubuntu, Pandas, and NumPy</strong> (GitHub Pull Shark ×2).
              </p>
            </motion.div>

            {/* Highlights grid */}
            <motion.div className="grid grid-cols-2 gap-4" variants={staggerContainer}>
              {HIGHLIGHTS.map((h) => (
                <motion.div
                  key={h.label}
                  variants={scaleIn}
                  className={`glass-card rounded-2xl p-5 border ${h.border} group cursor-default`}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <div className={`w-10 h-10 ${h.bg} ${h.border} border rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <h.icon className={`w-5 h-5 ${h.color}`} />
                  </div>
                  <div className="text-white font-semibold mb-1">{h.label}</div>
                  <div className="text-white/45 text-sm">{h.desc}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="flex flex-wrap gap-4 mt-8" variants={fadeInUp}>
              <motion.a
                href="mailto:balarajr483@gmail.com"
                className="btn-primary group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                Work With Me
              </motion.a>
              <motion.a
                href="https://github.com/balaraj74"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Github className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                View GitHub
              </motion.a>
              <motion.a
                href="https://drive.google.com/file/d/1eHgU1BzPQ1m0DxUQqf0EbmLVZ-jRKAYk/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <FileText className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                View Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
