"use client";

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Zap, 
  CheckCircle2, 
  Cpu, 
  Server, 
  Activity, 
  GitBranch,
  Compass
} from 'lucide-react';
import { AuroraBackground, EASE_OUT_EXPO, fadeInUp, scaleIn } from './shared';
import { RoadmapPath } from './RoadmapPath';
import { RevealText, VIEWPORT } from './motion/primitives';
import { TIMELINE_ITEMS } from '../constants/timeline';

// The data is newest-first; the path walks it from the first step to today.
const JOURNEY = [...TIMELINE_ITEMS].reverse();

// Filter categories for the roadmap
const FILTER_TABS = [
  { id: 'all', label: 'All Milestones' },
  { id: 'ai', label: 'AI & Flagships' },
  { id: 'systems', label: 'Systems & OSS' },
  { id: 'competitions', label: 'Competitions & Education' },
];

export default function JourneyExperience() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredItems = useMemo(() => JOURNEY.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'ai') return ['Internship', 'Flagship Project', 'Architecture'].includes(item.category);
    if (activeTab === 'systems') return item.category === 'Scale' || item.category === 'Systems';
    if (activeTab === 'competitions') return item.category === 'Hackathon' || item.category === 'Foundation';
    return true;
  }), [activeTab]);

  const stops = useMemo(() => filteredItems.map((item) => ({
    id: item.title,
    phase: JOURNEY.indexOf(item) + 1,
    period: item.period,
    category: item.category,
  })), [filteredItems]);

  return (
    <section 
      id="journey" 
      className="py-24 sm:py-32 relative bg-transparent overflow-x-clip"
    >
      {/* Anchor for both #journey and #experience navigation links */}
      <div id="experience" className="absolute -top-20" />
      <AuroraBackground />

      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
      viewport={VIEWPORT}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-600/30 dark:border-brand-400/30 bg-brand-500/10 dark:bg-brand-500/20 text-brand-800 dark:text-brand-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Architectural Progression</span>
          </div>
          <RevealText
            className="text-[clamp(2.75rem,7.5vw,7rem)] leading-[1.02] font-serif italic font-medium text-stone-900 dark:text-white tracking-tight transition-colors"
            segments={[{ text: 'Engineering' }, { text: 'Roadmap', className: 'gradient-text-cyan' }]}
          />
          <p className="text-stone-700 dark:text-stone-300 font-medium text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed transition-colors">
            From foundational systems to production-scale AI architectures — a structured progression of designing, building, and deploying reliable software.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-500 text-stone-950 shadow-[0_2px_12px_rgba(247,102,22,0.4)] scale-105'
                      : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 shadow-sm'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <RoadmapPath stops={stops} total={JOURNEY.length}>
          {(current) => (
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="pt-20">
                {filteredItems.map((item, index) => {
                  const isLeft = index % 2 === 0;
                  const IconComponent = item.icon || Activity;
                  const phase = stops[index].phase;
                  const reached = index <= current;
                  const isCurrent = index === current;

                  return (
                    <div key={item.title} className={`relative pl-12 lg:pl-0 pb-10 lg:pb-16 ${index > 0 ? 'lg:-mt-40' : ''}`}>
                      {/* Stop on the path */}
                      <div
                        data-stop
                        className={`absolute top-10 left-[14px] -translate-x-1/2 z-20 ${isLeft ? 'lg:left-[46%]' : 'lg:left-[54%]'}`}
                      >
                        <div className={`roadmap-stop ${reached ? 'is-reached' : ''} ${isCurrent ? 'is-current' : ''}`}>
                          {String(phase).padStart(2, '0')}
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, x: isLeft ? -70 : 70 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1, ease: EASE_OUT_EXPO }}
                        className={`w-full lg:w-[43%] ${isLeft ? '' : 'lg:ml-auto'}`}
                      >
                        <article className={`roadmap-card glass-card rounded-3xl p-6 sm:p-8 border border-white/85 dark:border-white/10 relative overflow-hidden shadow-md ${reached ? 'is-reached' : ''} ${isCurrent ? 'is-current' : ''}`}>
                          <span aria-hidden="true" className="absolute -top-3 right-3 font-black leading-none text-[clamp(5rem,9vw,8rem)] tracking-tighter text-stone-900/[0.05] dark:text-white/[0.06] select-none">
                            {String(phase).padStart(2, '0')}
                          </span>
                          <div
                            className="absolute top-0 right-0 w-48 h-48 blur-3xl opacity-20 rounded-full pointer-events-none"
                            style={{ backgroundColor: item.glowColor || 'rgba(247, 102, 22,0.2)' }}
                          />

                          <div className="relative flex flex-wrap items-center gap-2.5 mb-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 shadow-sm">
                              {item.category}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 ${item.color} inline-flex items-center gap-1.5 shadow-sm`}>
                              <IconComponent className="w-3 h-3" />
                              {item.type}
                            </span>
                          </div>

                          <div className="relative flex items-center gap-2 text-stone-600 dark:text-stone-400 text-xs font-mono mb-2">
                            <Calendar className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                            <span>{item.period}</span>
                          </div>

                          <h3 className="relative text-xl sm:text-2xl font-black text-stone-900 dark:text-white tracking-tight">
                            {item.title}
                          </h3>
                          <p className="relative text-stone-700 dark:text-stone-300 text-sm font-semibold mt-1 mb-5">
                            {item.org}
                          </p>

                          <ul className="relative space-y-3 mb-6">
                            {item.points.map((point) => (
                              <li key={point} className="flex items-start gap-3 text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                                <Zap className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="relative pt-4 border-t border-stone-200/80 dark:border-stone-800 flex flex-wrap gap-2">
                            {item.impact.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200 bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-700 shadow-sm"
                              >
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </article>
                      </motion.div>
                    </div>
                  );
                })}

                {/* The path ends at today */}
                <div className="relative h-24 pl-12 lg:pl-0 flex items-end lg:justify-center">
                  <div data-stop className="absolute bottom-3 left-[14px] lg:left-1/2 -translate-x-1/2">
                    <div className={`roadmap-end ${current >= filteredItems.length ? 'is-reached' : ''}`} />
                  </div>
                  <p className="lg:hidden pb-1 font-mono text-xs font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300">Today · still building</p>
                </div>
                <p className="hidden lg:block text-center mt-3 font-mono text-xs font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300">Today · still building</p>
              </motion.div>
            </AnimatePresence>
          )}
        </RoadmapPath>

        {/* Bottom Architectural Principles Summary */}
        <motion.div
          initial="hidden"
          whileInView="visible"
      viewport={VIEWPORT}
          variants={scaleIn}
          className="mt-20 glass-card rounded-3xl p-8 sm:p-10 border border-white/90 dark:border-white/10 shadow-lg"
        >
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-700 dark:text-brand-400 font-bold text-sm">
                <Cpu className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Deterministic AI</span>
              </div>
              <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
                Multi-agent validation, structured schemas, and rule-based vetoes over soft, unpredictable model hallucinations.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Edge & On-Device</span>
              </div>
              <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
                Offline-first GGUF quantized models with cloud-sync fallbacks for low-latency, privacy-preserving clinical workflows.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gold-700 dark:text-gold-400 font-bold text-sm">
                <GitBranch className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                <span>Open Source Rigor</span>
              </div>
              <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
                Production-grade contributions to foundational infrastructure packages ensuring maximum software resilience.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
