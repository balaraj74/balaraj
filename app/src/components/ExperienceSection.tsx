"use client";
import { useRef } from 'react';
import { motion, useInView as useFramerInView } from 'framer-motion';
import { Calendar, Zap, CheckCircle2 } from 'lucide-react';
import { AuroraBackground, fadeInUp, fadeInLeft, fadeInRight, scaleIn } from './shared';
import { TIMELINE_ITEMS, TimelineItem } from '../constants/timeline';

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isInView: boolean;
}

function TimelineCard({ item, index, isInView }: TimelineCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={isEven ? fadeInLeft : fadeInRight}
      transition={{ delay: index * 0.15 + 0.3 }}
      className={`relative flex flex-col lg:flex-row gap-8 items-start ${isEven ? 'lg:flex-row-reverse text-left lg:text-right' : 'text-left'}`}
    >
      {/* Center Dot */}
      <div className="hidden lg:block absolute left-1/2 top-8 -mt-1 -ml-3 w-6 h-6 rounded-full bg-[#040010] border-2 border-cyan-500/50 z-10">
        <motion.div
          className="w-full h-full rounded-full bg-cyan-400"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col group">
        <motion.div
          className={`glass-card rounded-3xl p-8 border border-white/5 relative overflow-hidden ${isEven ? 'lg:mr-10' : 'lg:ml-10'}`}
          whileHover={{ y: -6, boxShadow: `0 20px 60px ${item.glowColor}` }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className={`absolute top-0 w-36 h-36 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full ${item.blobColor} ${isEven ? 'right-0' : 'left-0'}`} />

          <div className={`flex flex-wrap items-center gap-3 mb-6 ${isEven ? 'lg:justify-end' : ''}`}>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/8 text-white/90 border border-white/10">{item.category}</span>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${item.color} border`}>{item.type}</span>
          </div>

          <div className={`flex items-center gap-2 text-white/40 text-xs font-mono tracking-wider mb-4 uppercase ${isEven ? 'lg:justify-end' : ''}`}>
            <Calendar className="w-3.5 h-3.5" />
            {item.period}
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-white/70 font-medium mb-6">{item.org}</p>

          <ul className="space-y-4 mb-8">
            {item.points.map((point, pi) => (
              <li key={pi} className={`flex items-start gap-4 text-white/60 text-sm leading-relaxed ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className={`pt-6 border-t border-white/10 flex flex-col ${isEven ? 'lg:items-end text-right' : 'items-start text-left'}`}>
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Impact</span>
            <ul className="space-y-2.5">
              {item.impact.map((imp, ii) => (
                <li key={ii} className={`flex items-center gap-2.5 text-white/80 font-medium text-sm ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {imp}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useFramerInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 bg-[#040010] overflow-hidden gradient-mesh">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "url('/images/bg_journey.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', opacity: 0.35 }} />
      <AuroraBackground />

      {/* Animated vertical line */}
      <div className="absolute left-1/2 top-40 bottom-32 w-px bg-white/5 hidden lg:block overflow-hidden">
        <motion.div
          className="w-full timeline-line-gradient"
          initial={{ scaleY: 0, originY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{ height: '100%' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-24"
        >
          <p className="section-label mx-auto w-fit">Journey</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Engineering <span className="gradient-text-cyan">Journey</span>
          </h2>
          <p className="text-white/50 font-medium text-sm sm:text-base mt-6 max-w-2xl mx-auto leading-relaxed px-4">
            From foundational systems to production-scale AI architectures — a progression of building, scaling, and refining real-world systems.
          </p>
        </motion.div>

        <div className="space-y-16">
          {TIMELINE_ITEMS.map((item, index) => (
            <TimelineCard 
              key={index} 
              item={item} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={scaleIn}
          transition={{ delay: 0.8 }}
          className="mt-32 max-w-3xl mx-auto text-center glass-card rounded-3xl p-10 border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_60px_rgba(6,182,212,0.1)] transition-all duration-700"
        >
          <h3 className="text-xl sm:text-2xl font-black text-white mb-4">What This Journey Reflects</h3>
          <p className="text-white/55 leading-relaxed text-sm sm:text-base">
            This timeline reflects my progression from learning foundational systems to designing and deploying scalable AI architectures. I consistently focus on building production-ready systems that integrate AI, robust cloud infrastructure, and real-world constraints to solve complex engineering challenges.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
