"use client";
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { useInView, useReducedMotion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants/skills';

const CYCLE_MS = 6000;

/** Panels that trade width: the active skill opens up and the rest fold to labels. */
export function CapabilityPanels() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const cycling = inView && !held && !reduced;

  useEffect(() => {
    if (!cycling) return;
    const timer = setTimeout(() => setActive((current) => (current + 1) % SKILL_CATEGORIES.length), CYCLE_MS);
    return () => clearTimeout(timer);
  }, [active, cycling]);

  return (
    <div
      ref={rootRef}
      className="cap-panels flex flex-col lg:flex-row gap-3 h-[780px] sm:h-[720px] lg:h-[min(76vh,720px)] lg:min-h-[560px]"
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHeld(true); }}
      onPointerLeave={() => setHeld(false)}
    >
      {SKILL_CATEGORIES.map((category, index) => {
        const Icon = category.icon;
        const isActive = index === active;
        const number = String(index + 1).padStart(2, '0');

        return (
          <article
            key={category.title}
            className={`cap-panel ${isActive ? 'is-active' : ''}`}
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(index); }}
          >
            <Image src={category.image} alt="" fill sizes="(min-width: 1024px) 70vw, 100vw" className="cap-image object-cover" />
            <div className="cap-shade" />

            <button
              type="button"
              aria-expanded={isActive}
              onClick={() => setActive(index)}
              className="absolute inset-x-0 top-0 h-[74px] lg:inset-0 lg:h-auto z-10 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4 p-5 lg:p-6 text-left text-white"
              style={isActive ? { pointerEvents: 'none' } : undefined}
            >
              <span className="flex lg:flex-col items-center lg:items-start gap-3 lg:gap-4">
                <span className="font-mono text-sm font-bold text-brand-300">{number}</span>
                <Icon className="w-6 h-6 text-brand-300" />
              </span>
              <span className={`cap-label font-black tracking-tight text-lg lg:text-2xl ${isActive ? 'opacity-0' : ''}`}>{category.title}</span>
            </button>

            <div className="cap-body">
              <h3 className="cap-rise font-black uppercase tracking-tighter leading-[0.98] text-[clamp(1.9rem,4.4vw,4.25rem)]" style={{ '--i': 0 } as CSSProperties}>
                {category.title}
              </h3>
              <ul className="mt-4 lg:mt-5 space-y-2 lg:space-y-3">
                {category.bullets.map((bullet, i) => (
                  <li key={bullet} className="cap-rise flex items-start gap-3 text-sm lg:text-base leading-relaxed text-stone-200" style={{ '--i': i + 1 } as CSSProperties}>
                    <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-brand-400" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="cap-rise mt-5 flex flex-wrap gap-2" style={{ '--i': 4 } as CSSProperties}>
                {category.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full text-xs font-semibold border border-white/25 bg-white/10 backdrop-blur-md whitespace-nowrap">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {isActive && (
              <span aria-hidden="true" className="absolute inset-x-0 top-0 z-20 h-[3px] bg-white/15">
                <span
                  key={active}
                  className="cert-progress"
                  style={{ animationDuration: `${CYCLE_MS}ms`, animationPlayState: cycling ? 'running' : 'paused' }}
                />
              </span>
            )}
          </article>
        );
      })}
    </div>
  );
}
