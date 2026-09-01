"use client";

import { useState, useRef } from 'react';
import { motion, useInView as useFramerInView, AnimatePresence } from 'framer-motion';
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
import { AuroraBackground, fadeInUp, staggerContainer, scaleIn } from './shared';
import { TIMELINE_ITEMS } from '../constants/timeline';

// Filter categories for the roadmap
const FILTER_TABS = [
  { id: 'all', label: 'All Milestones' },
  { id: 'ai', label: 'AI & Flagships' },
  { id: 'systems', label: 'Systems & OSS' },
  { id: 'competitions', label: 'Competitions & Education' },
];

export default function JourneyExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useFramerInView(sectionRef, { once: true, margin: '-60px' });
  const [activeTab, setActiveTab] = useState('all');

  const filteredItems = TIMELINE_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'ai') return item.category === 'Flagship Project' || item.category === 'Architecture';
    if (activeTab === 'systems') return item.category === 'Scale' || item.category === 'Systems';
    if (activeTab === 'competitions') return item.category === 'Hackathon' || item.category === 'Foundation';
    return true;
  });

  return (
    <section 
      id="journey" 
      ref={sectionRef} 
      className="py-24 sm:py-32 relative bg-transparent overflow-hidden"
    >
      {/* Anchor for both #journey and #experience navigation links */}
      <div id="experience" className="absolute -top-20" />
      <AuroraBackground />

      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-600/30 dark:border-cyan-400/30 bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Architectural Progression</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif italic font-medium text-slate-900 dark:text-white tracking-tight transition-colors">
            Engineering <span className="gradient-text-cyan">Roadmap</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 font-medium text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed transition-colors">
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
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_2px_12px_rgba(6,182,212,0.4)] scale-105'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-sm'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Vertical Roadmap Track */}
        <div className="relative">
          
          {/* Vertical Glowing Connecting Path */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-sky-400/50 to-transparent hidden sm:block" />

          {/* Roadmap Milestones Grid */}
          <motion.div 
            layout
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-12 sm:space-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const isEven = index % 2 === 0;
                const IconComponent = item.icon || Activity;
                const phaseNum = TIMELINE_ITEMS.length - index;

                return (
                  <motion.div
                    layout
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`relative flex flex-col sm:flex-row items-center gap-8 ${
                      isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                  >
                    {/* Milestone Center Node Badge */}
                    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-6 z-20 items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-cyan-500 shadow-[0_4px_16px_rgba(6,182,212,0.3)] flex items-center justify-center">
                        <span className="text-[11px] font-mono font-black text-cyan-800 dark:text-cyan-300">
                          {phaseNum < 10 ? `0${phaseNum}` : phaseNum}
                        </span>
                      </div>
                    </div>

                    {/* Milestone Card */}
                    <div className={`w-full sm:w-[calc(50%-3.5rem)] ${isEven ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
                      <motion.div
                        whileHover={{ y: -5, borderColor: 'rgba(6,182,212,0.5)' }}
                        className="glass-card rounded-2xl p-6 sm:p-8 border border-white/85 dark:border-white/10 relative overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        {/* Ambient glow backdrop */}
                        <div 
                          className="absolute top-0 right-0 w-40 h-40 blur-3xl opacity-10 group-hover:opacity-25 transition-opacity duration-500 rounded-full pointer-events-none"
                          style={{ backgroundColor: item.glowColor || 'rgba(6,182,212,0.2)' }}
                        />

                        {/* Top Badges */}
                        <div className={`flex flex-wrap items-center gap-2.5 mb-4 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm">
                            {item.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 ${item.color} inline-flex items-center gap-1.5 shadow-sm`}>
                            <IconComponent className="w-3 h-3" />
                            {item.type}
                          </span>
                        </div>

                        {/* Date & Org */}
                        <div className={`flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-mono mb-2 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                          <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                          <span>{item.period}</span>
                        </div>

                        {/* Title & Organization */}
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold mt-1 mb-5 transition-colors">
                          {item.org}
                        </p>

                        {/* Bullet Points */}
                        <ul className="space-y-3 mb-6">
                          {item.points.map((point, pi) => (
                            <li 
                              key={pi} 
                              className={`flex items-start gap-3 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed ${
                                isEven ? 'sm:flex-row-reverse text-left sm:text-right' : 'text-left'
                              }`}
                            >
                              <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Impact Tags Footer */}
                        <div className={`pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap gap-2 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                          {item.impact.map((tag, ti) => (
                            <span 
                              key={ti} 
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 shadow-sm"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              {tag}
                            </span>
                          ))}
                        </div>

                      </motion.div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

        </div>

        {/* Bottom Architectural Principles Summary */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={scaleIn}
          className="mt-20 glass-card rounded-3xl p-8 sm:p-10 border border-white/90 dark:border-white/10 shadow-lg"
        >
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold text-sm">
                <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Deterministic AI</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                Multi-agent validation, structured schemas, and rule-based vetoes over soft, unpredictable model hallucinations.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Edge & On-Device</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                Offline-first GGUF quantized models with cloud-sync fallbacks for low-latency, privacy-preserving clinical workflows.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 font-bold text-sm">
                <GitBranch className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Open Source Rigor</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                Production-grade contributions to foundational infrastructure packages ensuring maximum software resilience.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
