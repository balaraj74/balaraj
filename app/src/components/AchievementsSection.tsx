"use client";
import { useRef } from 'react';
import { motion, useInView as useFramerInView } from 'framer-motion';
import { AuroraBackground, fadeInUp, scaleIn, useCountUp } from './shared';
import { 
  HACKATHON_STATS, 
  MAJOR_AWARDS, 
  AchievementStat, 
  MajorAward, 
} from '../constants/achievements';
import CertificateGallery from './CertificateGallery';

function formatStatValue(count: number, type?: string): string {
  if (type === 'currency') {
    if (count >= 100000) {
      return (count / 100000).toFixed(2) + 'L';
    }
    return count > 0 ? count.toLocaleString('en-IN') : '0';
  }
  if (type === 'shortK') {
    return count >= 1000 ? Math.floor(count / 1000) + 'K' : count.toString();
  }
  return count.toString();
}

function HackathonStatCounter({ stat, isVisible, delayMs }: { stat: AchievementStat; isVisible: boolean; delayMs: number }) {
  const count = useCountUp(stat.value, isVisible);
  const formattedCount = formatStatValue(count, stat.type);
  const Icon = stat.icon;

  return (
    <motion.div
      className="glass-card rounded-3xl p-8 border border-white/85 dark:border-white/10 text-center hover:border-cyan-500/40 relative overflow-hidden group cursor-default shadow-md"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delayMs / 1000, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-20 ${stat.bgFilter} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
      <motion.div
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <Icon className={`w-10 h-10 ${stat.color} mx-auto mb-4`} />
      </motion.div>
      <div className={`text-4xl md:text-5xl font-black ${stat.color} mb-2 tracking-tight`}>
        {stat.prefix || ''}{formattedCount}{stat.suffix || ''}
      </div>
      <div className="text-slate-600 dark:text-slate-400 text-sm font-bold tracking-wide uppercase group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
        {stat.label}
      </div>
    </motion.div>
  );
}

function AwardCard({ award, isInView }: { award: MajorAward; isInView: boolean }) {
  const Icon = award.icon;
  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={scaleIn}
      transition={{ delay: 0.5 }}
      whileHover={{ y: -8, boxShadow: `0 20px 40px -10px rgba(15,23,42,0.12)` }}
      className="glass-card rounded-3xl p-8 border border-white/85 dark:border-white/10 flex flex-col items-start text-left group relative overflow-hidden transition-all duration-500 shadow-md"
    >
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-700" 
          style={{ backgroundImage: award.image, backgroundPosition: 'center', backgroundSize: 'cover' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 dark:from-slate-950/95 via-white/80 dark:via-slate-950/80 to-transparent" />
      </div>

      <div className={`absolute top-0 right-0 w-64 h-64 ${award.bgColor} blur-[80px] rounded-full group-hover:opacity-200 transition-opacity duration-500 z-0`} />

      <motion.div
        className="w-14 h-14 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center justify-center mb-6 z-10"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <Icon className={`w-7 h-7 ${award.iconColor} drop-shadow-[0_0_10px_currentColor]`} />
      </motion.div>

      <div className="relative z-10 flex flex-col items-start mt-auto">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">{award.title}</h3>
        <p className={`text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-md inline-block shadow-sm`}>
          {award.badge}
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium transition-colors">{award.desc}</p>
      </div>
    </motion.div>
  );
}

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useFramerInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="achievements" ref={sectionRef} className="py-24 sm:py-32 relative bg-transparent overflow-hidden">
      <div id="awards" className="absolute -top-24" />
      <AuroraBackground />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <p className="section-label mx-auto w-fit">Impact Metrics</p>
          <h2 className="text-4xl sm:text-5xl font-serif italic font-medium text-slate-900 dark:text-white tracking-tight transition-colors">
            Achievements & <span className="gradient-text-cyan">Impact</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 font-medium text-sm sm:text-base mt-6 max-w-2xl mx-auto leading-relaxed px-4 transition-colors">
            Recognized through national competitions, real-world deployments, and continuous technical mastery.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {HACKATHON_STATS.map((stat, idx) => (
            <HackathonStatCounter 
              key={stat.label} 
              stat={stat} 
              isVisible={isInView} 
              delayMs={idx * 150 + 200} 
            />
          ))}
        </div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
          className="mb-24 max-w-3xl mx-auto text-center"
        >
          <p className="text-slate-700 dark:text-slate-300 font-medium text-lg leading-relaxed transition-colors">
            Focused on building and validating real-world AI systems through competitions, production deployments, and continuous learning.
          </p>
        </motion.div>

        {/* Major Awards */}
        <div className="grid md:grid-cols-2 gap-8 xl:gap-10 mb-24">
          {MAJOR_AWARDS.map((award) => (
            <AwardCard key={award.title} award={award} isInView={isInView} />
          ))}
        </div>

        {/* Certificate Gallery with real images */}
        <CertificateGallery />
      </div>
    </section>
  );
}
