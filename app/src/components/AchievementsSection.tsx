"use client";
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView as useFramerInView } from 'framer-motion';
import { AuroraBackground, EASE_OUT_EXPO, fadeInUp, useCountUp } from './shared';
import { RevealText, VIEWPORT } from './motion/primitives';
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

function StatCounter({ stat, isVisible, index }: { stat: AchievementStat; isVisible: boolean; index: number }) {
  const count = useCountUp(stat.value, isVisible);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: EASE_OUT_EXPO }}
      className={`group relative py-6 lg:py-8 lg:px-6 lg:first:pl-0 lg:last:pr-0 lg:border-l first:border-l-0 border-stone-300/80 dark:border-white/10 ${index === 0 ? 'col-span-2 lg:col-span-1' : ''}`}
    >
      <div className={`font-black leading-none tracking-tighter tabular-nums text-[clamp(2.75rem,4.8vw,5rem)] ${stat.color}`}>
        {stat.prefix || ''}{formatStatValue(count, stat.type)}{stat.suffix || ''}
      </div>
      <p className="mt-3 text-[11px] font-bold uppercase tracking-widest leading-relaxed text-stone-600 dark:text-stone-400">
        {stat.label}
      </p>
    </motion.div>
  );
}

function StatLedger() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useFramerInView(ref, { once: true, amount: 0.4 });
  const rule = { hidden: { scaleX: 0 }, visible: { scaleX: 1 } };

  return (
    <div ref={ref} className="mb-20 sm:mb-28">
      <motion.div
        variants={rule}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
        className="h-px origin-left bg-stone-400/70 dark:bg-white/20"
      />
      <div className="grid grid-cols-2 lg:grid-cols-[1fr_1.55fr_0.8fr_1.1fr_1fr] gap-x-6 lg:gap-x-0">
        {HACKATHON_STATS.map((stat, index) => (
          <StatCounter key={stat.label} stat={stat} isVisible={isVisible} index={index} />
        ))}
      </div>
      <motion.div
        variants={rule}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 1.4, delay: 0.2, ease: EASE_OUT_EXPO }}
        className="h-px origin-right bg-stone-400/70 dark:bg-white/20"
      />
    </div>
  );
}

function AwardPanel({ award, index }: { award: MajorAward; index: number }) {
  const Icon = award.icon;

  return (
    <motion.article
      initial={{ clipPath: 'inset(14% 14% 14% 14% round 40px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 40px)', opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.3, ease: EASE_OUT_EXPO }}
      className={`group relative overflow-hidden min-h-[clamp(440px,62vh,620px)] flex items-end bg-stone-950 text-white ${index === 1 ? 'lg:mt-24' : ''}`}
    >
      <Image
        src={award.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

      <div className="relative p-6 sm:p-10">
        <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500 text-stone-950 text-[11px] font-black uppercase tracking-widest">
          <Icon className="w-3.5 h-3.5" /> {award.badge}
        </p>
        <h3 className="mt-4 font-black uppercase tracking-tighter leading-[0.98] text-[clamp(2.25rem,4.4vw,4.25rem)]">{award.title}</h3>
        <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-stone-200">{award.desc}</p>
      </div>
    </motion.article>
  );
}

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 sm:py-32 relative bg-transparent overflow-hidden">
      <div id="awards" className="absolute -top-24" />
      <AuroraBackground />

      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeInUp}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="section-label mx-auto w-fit">Impact Metrics</p>
          <RevealText
            className="text-[clamp(2.75rem,7.5vw,7rem)] leading-[1.02] font-serif italic font-medium text-stone-900 dark:text-white tracking-tight transition-colors"
            segments={[{ text: 'Achievements &' }, { text: 'Impact', className: 'gradient-text-cyan' }]}
          />
          <p className="text-stone-700 dark:text-stone-300 font-medium text-sm sm:text-base mt-6 max-w-2xl mx-auto leading-relaxed px-4 transition-colors">
            Recognized through national competitions, real-world deployments, and continuous technical mastery.
          </p>
        </motion.div>

        <StatLedger />

        <div className="grid lg:grid-cols-2 gap-5 xl:gap-8 mb-24 sm:mb-32">
          {MAJOR_AWARDS.map((award, index) => (
            <AwardPanel key={award.title} award={award} index={index} />
          ))}
        </div>

        <CertificateGallery />
      </div>
    </section>
  );
}
