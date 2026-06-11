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

function HackathonStatCounter({ stat, isVisible, delayMs }: { stat: AchievementStat; isVisible: boolean; delayMs: number }) {
  const count = useCountUp(stat.value, isVisible);

  let formattedCount = count.toString();
  if (stat.type === 'currency' && count > 0) {
    if (count >= 100000) {
      formattedCount = (count / 100000).toFixed(2) + 'L';
    } else {
      formattedCount = count.toLocaleString('en-IN');
    }
  } else if (stat.type === 'shortK' && count > 0) {
    formattedCount = count >= 1000 ? Math.floor(count / 1000) + 'K' : count.toString();
  }

  const Icon = stat.icon;

  return (
    <motion.div
      className="glass-card rounded-3xl p-8 border border-white/8 text-center hover:border-cyan-500/30 relative overflow-hidden group cursor-default card-shine"
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
      <div className="text-white/50 text-sm font-medium tracking-wide uppercase group-hover:text-white/80 transition-colors">
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
      whileHover={{ y: -8, boxShadow: `0 30px 60px ${award.glowColor}` }}
      className={`rounded-3xl p-8 border ${award.borderColor} flex flex-col items-start text-left group relative overflow-hidden transition-all duration-500 bg-[#050d1a] card-shine`}
    >
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-25 group-hover:opacity-45 transition-opacity duration-700" 
          style={{ backgroundImage: award.image, backgroundPosition: 'center', backgroundSize: 'cover' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-[#050d1a]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050d1a] via-[#050d1a]/60 to-[#050d1a]/20" />
      </div>

      <div className={`absolute top-0 right-0 w-64 h-64 ${award.bgColor} blur-[80px] rounded-full group-hover:opacity-200 transition-opacity duration-500 z-0`} />

      <motion.div
        className={`w-14 h-14 rounded-2xl bg-[#050d1a]/80 backdrop-blur-md border ${award.borderColor.split(' ')[0]} flex items-center justify-center mb-6 z-10`}
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <Icon className={`w-7 h-7 ${award.iconColor} drop-shadow-[0_0_10px_currentColor]`} />
      </motion.div>

      <div className="relative z-10 flex flex-col items-start mt-auto">
        <h3 className="text-2xl font-bold text-white mb-2">{award.title}</h3>
        <p className={`text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full border ${award.badgeColor} bg-[#050d1a]/80 backdrop-blur-md inline-block`}>
          {award.badge}
        </p>
        <p className="text-white/80 leading-relaxed font-medium">{award.desc}</p>
      </div>
    </motion.div>
  );
}



export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useFramerInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="awards" ref={sectionRef} className="py-24 sm:py-32 relative bg-transparent overflow-hidden">
      <AuroraBackground />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <p className="section-label mx-auto w-fit">Impact Metrics</p>
          <h2 className="text-4xl sm:text-5xl font-serif italic font-medium text-white tracking-tight">
            Achievements & <span className="gradient-text-cyan">Impact</span>
          </h2>
          <p className="text-white/50 font-medium text-sm sm:text-base mt-6 max-w-2xl mx-auto leading-relaxed px-4">
            Recognized through national competitions, real-world deployments, and continuous technical mastery.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
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
          <p className="text-white/60 font-medium text-lg leading-relaxed">
            Focused on building and validating real-world AI systems through competitions, production deployments, and continuous learning.
          </p>
        </motion.div>

        {/* Major Awards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
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
