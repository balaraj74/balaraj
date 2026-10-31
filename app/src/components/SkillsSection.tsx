"use client";
import { motion } from 'framer-motion';
import { Trophy, Cpu } from 'lucide-react';
import { AuroraBackground, EASE_OUT_EXPO, fadeInUp } from './shared';
import { CapabilityPanels } from './CapabilityPanels';
import { Marquee, Reveal, RevealText, SpotlightCard, VIEWPORT } from './motion/primitives';
import { TECH_LOGOS } from '../constants/skills';

function TechTile({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex items-center gap-3 mx-2 px-5 py-3 glass rounded-2xl border border-white/80 dark:border-white/10 transition-colors duration-300 group shadow-sm hover:border-brand-500/40">
      {icon === 'langchain' ? (
        <svg role="img" viewBox="0 0 24 24" className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-all duration-300 fill-stone-800 dark:fill-stone-200 group-hover:fill-brand-600 dark:group-hover:fill-brand-400" aria-label={name}>
          <path d="M13.796 0a6.93 6.93 0 0 0-4.91 2.019L5.451 5.455l3.273 3.27 3.432-3.432a2.284 2.284 0 0 1 3.277 0 2.28 2.28 0 0 1 0 3.275L12 12.001l3.273 3.273 3.433-3.435c2.692-2.692 2.692-7.127 0-9.82A6.92 6.92 0 0 0 13.796 0m-5.07 8.728-3.433 3.434c-2.692 2.693-2.692 7.126 0 9.819A6.92 6.92 0 0 0 10.203 24a6.93 6.93 0 0 0 4.911-2.02l3.432-3.432-3.271-3.272-3.433 3.433a2.284 2.284 0 0 1-3.277 0 2.28 2.28 0 0 1 0-3.276L12 12z" />
        </svg>
      ) : (
        <span
          aria-hidden="true"
          className="w-6 h-6 block opacity-70 group-hover:opacity-100 transition-all duration-300 bg-stone-800 dark:bg-stone-200 group-hover:bg-brand-600 dark:group-hover:bg-brand-400"
          style={{ mask: `url('/icons/${icon}.svg') center / contain no-repeat`, WebkitMask: `url('/icons/${icon}.svg') center / contain no-repeat` }}
        />
      )}
      <span className="text-xs font-bold text-stone-700 dark:text-stone-300 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors tracking-wider uppercase whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function TechMarquee() {
  const half = Math.ceil(TECH_LOGOS.length / 2);
  return (
    <div className="mb-14 space-y-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <Marquee speed={1.2}>
        {TECH_LOGOS.slice(0, half).map((tech) => <TechTile key={tech.name} name={tech.name} icon={tech.icon} />)}
      </Marquee>
      <Marquee speed={1.2} reverse>
        {TECH_LOGOS.slice(half).map((tech) => <TechTile key={tech.name} name={tech.name} icon={tech.icon} />)}
      </Marquee>
    </div>
  );
}

const PROOF = [
  { name: 'CareerLens', value: '32', unit: 'Microservices', desc: 'Scalable AI-powered backend of 40K+ lines, processing real-time generation queues and embedding pipelines.' },
  { name: 'AgriSence', value: 'GCP', unit: 'Deployed', desc: 'End-to-end ML architecture handling image segmentation models on scalable cloud functions.' },
];

const ARSENAL = [
  { label: 'AI & Data', value: ['Vertex AI', 'Gemini', 'LangChain', 'PyTorch'] },
  { label: 'Frontend', value: ['Next.js 16', 'React', 'Tailwind CSS', 'Framer'] },
  { label: 'Backend', value: ['Node.js', 'TypeScript', 'FastAPI', 'Firebase'] },
  { label: 'Cloud & DevOps', value: ['GCP', 'Docker', 'GitHub Actions', 'Vercel'] },
];

function ProofCard() {
  return (
    <Reveal className="h-full">
      <SpotlightCard tilt={3} className="glass-card h-full rounded-3xl p-7 sm:p-10 border border-white/85 dark:border-white/10 hover:border-brand-500/40 overflow-hidden shadow-md transition-colors duration-500">
        <h3 className="relative flex items-center gap-3 text-2xl font-bold text-stone-900 dark:text-white">
          <Trophy className="w-6 h-6 text-brand-600 dark:text-brand-400" /> Production Experience
        </h3>
        <div className="relative mt-8 divide-y divide-stone-200/80 dark:divide-white/10">
          {PROOF.map((item) => (
            <div key={item.name} className="py-6 first:pt-0 last:pb-0 grid grid-cols-[auto_1fr] gap-x-6 items-start">
              <div className="min-w-[96px]">
                <div className="font-black leading-none tracking-tighter text-[clamp(2.75rem,5vw,4rem)] gradient-text-cyan w-fit">{item.value}</div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-stone-600 dark:text-stone-400">{item.unit}</div>
              </div>
              <div>
                <h4 className="font-bold text-lg text-stone-900 dark:text-white">{item.name}</h4>
                <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

function ArsenalCard() {
  return (
    <Reveal className="h-full" delay={0.1}>
      <SpotlightCard tilt={3} className="glass-card h-full rounded-3xl p-7 sm:p-10 border border-white/85 dark:border-white/10 hover:border-brand-500/40 overflow-hidden shadow-md transition-colors duration-500">
        <h3 className="relative flex items-center gap-3 text-2xl font-bold text-stone-900 dark:text-white">
          <Cpu className="w-6 h-6 text-brand-600 dark:text-brand-400" /> Complete Arsenal
        </h3>
        <div className="relative mt-8 space-y-5">
          {ARSENAL.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE_OUT_EXPO }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-600 dark:text-stone-400 mb-2">{row.label}</p>
              <div className="flex flex-wrap gap-2">
                {row.value.map((tool) => (
                  <span key={tool} className="px-3 py-1 rounded-full text-sm font-semibold border border-stone-300/80 dark:border-white/15 text-stone-800 dark:text-stone-200 hover:border-brand-500 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

export default function SkillsSection() {

  return (
    <section id="skills" className="py-24 sm:py-32 relative bg-transparent overflow-hidden">
      <AuroraBackground />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-ember-500/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
      viewport={VIEWPORT}
          variants={fadeInUp}
          className="text-center mb-14"
        >
          <p className="section-label mx-auto w-fit">Capabilities</p>
          <RevealText
            className="text-[clamp(2.75rem,7.5vw,7rem)] leading-[1.02] font-serif italic font-medium text-stone-900 dark:text-white tracking-tight transition-colors"
            segments={[{ text: 'Skills &' }, { text: 'Capabilities', className: 'gradient-text-cyan' }]}
          />
          <p className="text-stone-700 dark:text-stone-300 mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed transition-colors">
            I design, build, and deploy production-grade AI systems — from model development to scalable cloud infrastructure.
          </p>
        </motion.div>

        <TechMarquee />

        <Reveal>
          <CapabilityPanels />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 xl:gap-6 mt-5 xl:mt-6">
          <ProofCard />
          <ArsenalCard />
        </div>
      </div>
    </section>
  );
}
