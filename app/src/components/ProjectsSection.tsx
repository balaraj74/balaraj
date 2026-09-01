"use client";
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView as useFramerInView, MotionValue } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { FEATURED_PROJECTS, OTHER_PROJECTS } from '../constants/projects';
import { EASE_OUT_EXPO } from './shared';
const BR = 'clamp(24px, 3.5vw, 50px)';

/* ─── Sticky stacking card ─────────────────────────────────────── */
const TOTAL = FEATURED_PROJECTS.length;

function StickyCard({ project, index, progress }: { project: (typeof FEATURED_PROJECTS)[0]; index: number; progress: MotionValue<number> }) {
  // Map progress to scale based on index
  const start = index / TOTAL;
  const targetScale = 1 - (TOTAL - index) * 0.04;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  const metrics = project.metrics as { label: string; value: string }[];

  return (
    <motion.div
      style={{
        position: 'sticky',
        top: `calc(10vh + ${index * 30}px)`,
        height: '85vh',
        scale,
        transformOrigin: 'top center',
        borderRadius: BR,
        overflow: 'hidden',
        willChange: 'transform',
      }}
      className="glass-card border border-white/90 dark:border-white/10 bg-white/85 dark:bg-gradient-to-br dark:from-slate-900/95 dark:to-slate-950/95 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-colors duration-300"
    >
        {/* Accent top line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${
              project.accentColor.includes('cyan') ? 'rgba(6,182,212,0.9)'
              : project.accentColor.includes('emerald') ? 'rgba(16,185,129,0.9)'
              : project.accentColor.includes('blue') || project.accentColor.includes('sky') ? 'rgba(14,165,233,0.9)'
              : 'rgba(245,158,11,0.9)'
            }, transparent)`,
          }}
        />

        <div className="p-5 sm:p-7 md:p-10 h-full flex flex-col">
          {/* ── Top row: num / badge / title / CTA ── */}
          <div className="flex items-start justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-start gap-4 sm:gap-6 min-w-0">
              {/* Number */}
              <span
                className="font-black leading-none shrink-0 select-none text-slate-900/10 dark:text-white/10"
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                  lineHeight: 0.85,
                  letterSpacing: '-0.04em',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="flex flex-col gap-1 min-w-0">
                {/* Badge */}
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-400"
                >
                  <span className="text-base">{project.emoji}</span>
                  {project.badge}
                </span>
                {/* Title */}
                <h3
                  className="font-black uppercase tracking-tight leading-none text-slate-900 dark:text-white transition-colors"
                  style={{
                    fontSize: 'clamp(1.4rem, 3.5vw, 3rem)',
                  }}
                >
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
              {project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold uppercase tracking-widest transition-all hover:bg-cyan-400 bg-cyan-500 text-slate-950 shadow-sm"
                  style={{
                    borderRadius: '9999px',
                    padding: 'clamp(8px,1vw,12px) clamp(16px,2vw,28px)',
                    fontSize: 'clamp(0.65rem, 1vw, 0.85rem)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <ExternalLink style={{ width: '0.9em', height: '0.9em' }} />
                  {project.demo.toLowerCase().endsWith('.apk') ? 'Download APK' : 'Live System'}
                </a>
              )}
              {project.github !== '#' && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold uppercase tracking-widest transition-all bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm"
                  style={{
                    borderRadius: '9999px',
                    padding: 'clamp(8px,1vw,12px) clamp(16px,2vw,28px)',
                    fontSize: 'clamp(0.65rem, 1vw, 0.85rem)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Github style={{ width: '0.9em', height: '0.9em' }} />
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* ── Bottom: image grid + description ── */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 flex-1 min-h-0">
            {/* Main project visual */}
            <div className="flex-1 flex flex-col min-h-0">
              <div
                className="relative overflow-hidden group/img cursor-pointer flex-1 w-full"
                style={{
                  borderRadius: BR,
                  background: '#0a0f1e',
                  minHeight: '200px',
                }}
                onClick={() => {
                  if (project.demo !== '#') window.open(project.demo, '_blank');
                  else if (project.github !== '#') window.open(project.github, '_blank');
                }}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} visual`}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 65vw, 95vw"
                  className="object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300 group-hover/img:opacity-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
                  }}
                />
              </div>

              {/* Mobile Description */}
              <div className="md:hidden mt-3 p-3.5 bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs">
                <p className="text-slate-700 dark:text-slate-300 text-xs font-medium leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                {project.thinking && (
                  <p className="text-[11px] text-cyan-800 dark:text-cyan-300 font-semibold mt-1.5 line-clamp-2 italic">
                    💡 {project.thinking}
                  </p>
                )}
              </div>
            </div>

            {/* Right stack: secondary image + desc + metrics */}
            <div
              className="hidden md:flex flex-col gap-3 sm:gap-4"
              style={{ width: 'clamp(300px, 34vw, 540px)', flexShrink: 0 }}
            >
              {/* Secondary visual strip */}
              <div
                style={{
                  borderRadius: BR,
                  overflow: 'hidden',
                  height: 'clamp(120px, 14vw, 200px)',
                  position: 'relative',
                  flexShrink: 0,
                  background: '#0a0f1e',
                }}
              >
                <Image
                  src={project.secondaryImage || project.image}
                  alt={`${project.title} preview`}
                  fill
                  sizes="40vw"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.12) 0%, transparent 60%)' }} />
              </div>

              {/* Bottom info card */}
              <div
                className="bg-white/70 dark:bg-slate-900/70 border border-white/90 dark:border-slate-800 shadow-sm flex flex-col justify-between overflow-hidden"
                style={{
                  borderRadius: BR,
                  flex: 1,
                  padding: 'clamp(12px, 1.5vw, 20px)',
                  minHeight: 0,
                }}
              >
                <p
                  className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed"
                  style={{
                    fontSize: 'clamp(0.7rem, 1.1vw, 0.95rem)',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 8,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {project.description}
                </p>

                {/* Architectural Thinking */}
                {project.thinking && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-400 mb-1.5">Architecture</p>
                    <p className="text-slate-800 dark:text-slate-200 leading-snug italic font-medium" style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)' }}>
                      {project.thinking}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Footer row: tags + metrics ── */}
          <div
            className="flex items-center justify-between gap-4 pt-4 sm:pt-6 mt-4 flex-wrap border-t border-slate-200 dark:border-slate-800"
          >
            {/* Tech tags */}
            <div className="flex gap-1.5 sm:gap-2 flex-wrap items-center">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-full font-semibold uppercase tracking-wider shadow-sm"
                  style={{
                    fontSize: 'clamp(0.6rem, 0.85vw, 0.75rem)',
                    padding: 'clamp(3px, 0.4vw, 5px) clamp(8px, 1vw, 14px)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Metrics */}
            {metrics && metrics.length > 0 && (
              <div className="flex gap-4 sm:gap-8 shrink-0">
                {metrics.map((m) => (
                  <div key={m.label} className="flex flex-col gap-0.5">
                    <span
                      className="font-black text-slate-900 dark:text-white leading-none tracking-tight transition-colors"
                      style={{
                        fontSize: 'clamp(1rem, 2vw, 1.6rem)',
                      }}
                    >
                      {m.value}
                    </span>
                    <span
                      className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest"
                      style={{
                        fontSize: 'clamp(0.55rem, 0.8vw, 0.7rem)',
                      }}
                    >
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
  );
}

/* ─── Other projects compact grid ──────────────────────────────── */
function OtherProjectsGrid({ isInView }: { isInView: boolean }) {
  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 text-center mb-10 transition-colors"
      >
        More Projects
      </motion.h3>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {OTHER_PROJECTS.map((p, i) => {
          const metrics = p.metrics as string[];
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: EASE_OUT_EXPO }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl border border-white/90 dark:border-white/10 bg-white/85 dark:bg-slate-900/85 overflow-hidden flex flex-col shadow-sm hover:border-cyan-500/40 transition-all duration-300"
            >
              {/* Image strip */}
              <div className="h-[140px] relative bg-[#030812]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div
                  className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-white/90 dark:border-slate-700"
                >
                  <span className="text-sm">{p.emoji}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col gap-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-400 mb-1">
                    {p.badge}
                  </p>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight transition-colors">
                    {p.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1 font-medium">
                  {p.description.slice(0, 100)}…
                </p>
                <div className="flex gap-1.5 flex-wrap mt-1">
                  {metrics.map((m) => (
                    <span key={m} className="text-[10px] font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-0.5">
                      {m}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  {p.github && p.github !== '#' && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-bold uppercase tracking-wider shadow-sm transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </a>
                  )}
                  {p.demo && p.demo !== '#' && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 text-[11px] font-bold uppercase tracking-wider shadow-sm transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useFramerInView(sectionRef, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        background: 'transparent',
        paddingTop: 'clamp(60px, 8vw, 120px)',
        paddingBottom: 'clamp(60px, 8vw, 120px)',
        position: 'relative',
      }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="section-label mx-auto w-fit">Engineering Portfolio</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic font-medium text-slate-900 dark:text-white leading-none tracking-tight mt-3 transition-colors">
            I design & deploy<br />
            <span className="gradient-text-cyan">complex AI systems</span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mt-6 max-w-xl mx-auto text-base sm:text-lg leading-relaxed transition-colors">
            Proof that I build real-world systems with impact, performance, and architecture in mind.
          </p>
        </motion.div>

        {/* Sticky stacking cards */}
        <div className="relative mt-16 pb-12">
          {FEATURED_PROJECTS.map((project, i) => (
            <StickyCard key={project.title} project={project} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>

      {/* Other projects grid seamlessly slides over the final sticky card */}
      <div className="relative z-20 w-full bg-transparent pt-20 pb-24">
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <OtherProjectsGrid isInView={isInView} />
        </div>
      </div>
    </section>
  );
}
