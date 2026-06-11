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
        border: '1.5px solid rgba(255,255,255,0.12)',
        background: 'linear-gradient(135deg, #0a0f1e 0%, #050d1a 100%)',
        overflow: 'hidden',
        willChange: 'transform',
      }}
      className="shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
    >
        {/* Accent top line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${
              project.accentColor.includes('cyan') ? 'rgba(6,182,212,0.8)'
              : project.accentColor.includes('emerald') ? 'rgba(52,211,153,0.8)'
              : project.accentColor.includes('violet') ? 'rgba(139,92,246,0.8)'
              : 'rgba(251,191,36,0.8)'
            }, transparent)`,
          }}
        />

        <div className="p-5 sm:p-7 md:p-10 h-full flex flex-col">
          {/* ── Top row: num / badge / title / CTA ── */}
          <div className="flex items-start justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-start gap-4 sm:gap-6 min-w-0">
              {/* Number */}
              <span
                className="font-black leading-none shrink-0 select-none"
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                  lineHeight: 0.85,
                  color: 'rgba(255,255,255,0.10)',
                  letterSpacing: '-0.04em',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="flex flex-col gap-1 min-w-0">
                {/* Badge */}
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  <span className="text-base">{project.emoji}</span>
                  {project.badge}
                </span>
                {/* Title */}
                <h3
                  className="font-black uppercase tracking-tight leading-none"
                  style={{
                    fontSize: 'clamp(1.4rem, 3.5vw, 3rem)',
                    color: '#e0e1dd',
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
                  className="inline-flex items-center gap-2 font-bold uppercase tracking-widest transition-all hover:bg-white/10"
                  style={{
                    borderRadius: '9999px',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    color: '#e0e1dd',
                    padding: 'clamp(8px,1vw,12px) clamp(16px,2vw,28px)',
                    fontSize: 'clamp(0.65rem, 1vw, 0.85rem)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <ExternalLink style={{ width: '0.9em', height: '0.9em' }} />
                  Live System
                </a>
              )}
              {project.github !== '#' && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold uppercase tracking-widest transition-all hover:bg-white/10"
                  style={{
                    borderRadius: '9999px',
                    border: '1.5px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.5)',
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
          <div className="flex gap-3 sm:gap-4 flex-1 min-h-0">
            {/* Left col — 40% — 2 stacked images */}
            <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: 0 }}>
              {/* Top image */}
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
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, transparent 60%)' }} />
              </div>

              {/* Bottom info card */}
              <div
                style={{
                  borderRadius: BR,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  flex: 1,
                  padding: 'clamp(12px, 1.5vw, 20px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 0,
                  overflow: 'hidden',
                }}
              >
                <p
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: 'clamp(0.7rem, 1.1vw, 0.95rem)',
                    lineHeight: 1.6,
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
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>Architecture</p>
                    <p style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, fontStyle: 'italic' }}>
                      {project.thinking}
                    </p>
                  </div>
                )}

                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '16px' }}>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        fontSize: 'clamp(0.6rem, 0.85vw, 0.75rem)',
                        color: 'rgba(255,255,255,0.55)',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right col — 60% — hero screenshot */}
            <div style={{ flex: '0 0 60%', position: 'relative', borderRadius: BR, overflow: 'hidden', minHeight: 0 }}>
              {/* Big background image */}
              <Image
                src={project.image}
                alt={`${project.title} hero`}
                fill
                sizes="60vw"
                className="object-cover"
                style={{ objectPosition: 'center top' }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, transparent 30%, rgba(5,13,26,0.85) 100%)',
                }}
              />

              {/* Metrics overlay at bottom */}
              {metrics && metrics.length > 0 && (
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    padding: 'clamp(12px, 2vw, 24px)',
                    display: 'flex',
                    gap: 'clamp(12px, 2vw, 24px)',
                  }}
                >
                  {metrics.map((m) => (
                    <div key={m.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span
                        style={{
                          fontSize: 'clamp(1rem, 2vw, 1.6rem)',
                          fontWeight: 900,
                          color: '#ffffff',
                          letterSpacing: '-0.02em',
                          lineHeight: 1,
                        }}
                      >
                        {m.value}
                      </span>
                      <span
                        style={{
                          fontSize: 'clamp(0.55rem, 0.8vw, 0.7rem)',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'rgba(255,255,255,0.45)',
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
        className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white/30 text-center mb-10"
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
              style={{
                borderRadius: 'clamp(16px, 2vw, 28px)',
                border: '1px solid rgba(255,255,255,0.09)',
                background: 'linear-gradient(135deg, #0a0f1e 0%, #050d1a 100%)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image strip */}
              <div style={{ height: '140px', position: 'relative', background: '#030812' }}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-50 hover:opacity-70 transition-opacity"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0a0f1e, transparent)' }} />
                <div
                  className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-full"
                  style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.10)' }}
                >
                  <span className="text-sm">{p.emoji}</span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: 'clamp(14px, 2vw, 20px)', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>
                    {p.badge}
                  </p>
                  <h4 style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', fontWeight: 900, color: '#e0e1dd', lineHeight: 1.1 }}>
                    {p.title}
                  </h4>
                </div>
                <p style={{ fontSize: 'clamp(0.7rem, 1vw, 0.82rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, flex: 1 }}>
                  {p.description.slice(0, 100)}…
                </p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                  {metrics.map((m) => (
                    <span key={m} style={{ fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '2px 8px' }}>
                      {m}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  {p.demo !== '#' && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '7px 12px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', transition: 'background 0.2s' }}
                    >
                      <ExternalLink style={{ width: '0.8em', height: '0.8em' }} /> Demo
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
        <div className="absolute bottom-40 right-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="section-label mx-auto w-fit">Engineering Portfolio</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic font-medium text-white leading-none tracking-tight mt-3">
            I design & deploy<br />
            <span className="gradient-text-cyan">complex AI systems</span>
          </h2>
          <p className="text-white/45 mt-6 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
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
      <div className="relative z-20 w-full bg-[#020810] pt-20 pb-24 shadow-[0_-40px_100px_rgba(2,8,16,1)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <OtherProjectsGrid isInView={isInView} />
        </div>
      </div>
    </section>
  );
}
