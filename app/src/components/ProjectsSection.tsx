"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { FEATURED_PROJECTS, OTHER_PROJECTS } from '../constants/projects';
import { EASE_OUT_EXPO } from './shared';
import { Reveal, RevealText, SpotlightCard, VIEWPORT } from './motion/primitives';



/* ─── Gallery panel ────────────────────────────────────────────── */
function ProjectPanel({ project, index, progress }: { project: (typeof FEATURED_PROJECTS)[0]; index: number; progress: MotionValue<number> }) {
  const metrics = project.metrics as { label: string; value: string }[];
  const imageX = useTransform(progress, [0, 1], [`${-6 + index * 2}%`, `${6 - index * 2}%`]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO }}
      data-cursor="Open"
      className="group relative shrink-0 w-full lg:w-[72vw] xl:w-[64vw] h-[78vh] min-h-[520px] rounded-[clamp(24px,3vw,44px)] overflow-hidden bg-[#141110] text-white shadow-2xl"
    >
      <motion.div className="absolute inset-y-0 -inset-x-[8%]" style={{ x: imageX }}>
        <Image
          src={project.image}
          alt={`${project.title} visual`}
          fill
          sizes="(min-width: 1024px) 75vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />

      <span aria-hidden="true" className="absolute top-4 left-6 sm:left-10 font-black leading-none text-white/25 text-[clamp(4rem,10vw,9rem)] tracking-tighter">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-300 mb-3">{project.badge}</p>
        <h3 className="font-black uppercase tracking-tighter leading-[0.95] text-[clamp(2.75rem,7vw,6.5rem)]">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">{project.title}</Link>
        </h3>
        <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-stone-200 line-clamp-3">{project.description}</p>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
          <div className="flex gap-6 sm:gap-10">
            {metrics?.map((m) => (
              <div key={m.label}>
                <div className="font-black leading-none text-lg sm:text-2xl">{m.value}</div>
                <div className="mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-300">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="relative z-10 flex gap-2">
            {project.demo !== '#' && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-400 hover:bg-brand-300 text-stone-950 px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                {project.demo.toLowerCase().endsWith('.apk') ? 'Download APK' : 'Live'}
              </a>
            )}
            {project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/40 hover:bg-white/15 px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors">
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Other projects compact grid ──────────────────────────────── */
function OtherProjectsGrid() {
  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="text-xl sm:text-2xl font-black uppercase tracking-wider text-stone-800 dark:text-stone-100 text-center mb-10 transition-colors"
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE_OUT_EXPO }}
            >
              <SpotlightCard className="glass-card rounded-2xl border border-white/90 dark:border-white/10 bg-white/85 dark:bg-stone-900/85 overflow-hidden flex flex-col h-full shadow-sm hover:border-brand-500/40 transition-colors duration-300">
              {/* Image strip */}
              <div className="h-[140px] relative bg-[#141110]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col gap-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-700 dark:text-brand-400 mb-1">
                    {p.badge}
                  </p>
                  <h4 className="text-base sm:text-lg font-black text-stone-900 dark:text-white leading-tight transition-colors">
                    <Link href={`/projects/${p.slug}`} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                      {p.title}
                    </Link>
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed flex-1 font-medium">
                  {p.description.slice(0, 100)}…
                </p>
                <div className="flex gap-1.5 flex-wrap mt-1">
                  {metrics.map((m) => (
                    <span key={m} className="text-[10px] font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200 bg-white/90 dark:bg-stone-800/90 border border-stone-300 dark:border-stone-700 rounded-md px-2 py-0.5">
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
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-[11px] font-bold uppercase tracking-wider shadow-sm transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </a>
                  )}
                  {p.demo && p.demo !== '#' && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full border border-brand-500/40 text-brand-700 dark:text-brand-300 bg-brand-500/10 hover:bg-brand-500/20 text-[11px] font-bold uppercase tracking-wider shadow-sm transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live
                    </a>
                  )}
                </div>
              </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */
export default function ProjectsSection({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  // Sideways travel exists only on the pinned desktop layout.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const pinned = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches;
      setDistance(track && pinned ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section id="projects" className="dark relative bg-[#141110] text-white rounded-t-[clamp(28px,4vw,64px)] -mt-px">
      <div ref={pinRef} className="relative lg:h-[420vh] motion-reduce:h-auto">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden flex items-center py-16 lg:py-0 motion-reduce:overflow-x-auto">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 w-full lg:w-max px-4 sm:px-8 lg:px-[6vw]"
          >
            <div className="shrink-0 lg:w-[46vw] pb-6 lg:pb-0">
              <Reveal><p className="section-label">Engineering Portfolio</p></Reveal>
              <RevealText
                as={headingLevel}
                className="text-[clamp(2.75rem,6.4vw,6.5rem)] leading-[1.02] font-serif italic font-medium tracking-tight mt-3"
                segments={[{ text: 'I design & deploy', br: true }, { text: 'complex AI systems', className: 'gradient-text-cyan' }]}
              />
              <Reveal delay={0.2}>
                <p className="text-stone-300 mt-6 max-w-md text-base sm:text-lg leading-relaxed">
                  Proof that I build real-world systems with impact, performance, and architecture in mind.
                </p>
              </Reveal>
            </div>
            {FEATURED_PROJECTS.map((project, i) => (
              <ProjectPanel key={project.title} project={project} index={i} progress={scrollYProgress} />
            ))}
          </motion.div>
          <div aria-hidden="true" className="hidden lg:block absolute bottom-6 inset-x-[6vw] h-px bg-white/15">
            <motion.div className="h-full bg-brand-400 origin-left" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full pt-16 pb-24">
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <OtherProjectsGrid />
        </div>
      </div>
    </section>
  );
}
