"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface CoverflowItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  badge: string;
}

const AUTOPLAY_MS = 3800;
const VISIBLE_SIDE = 3;

/** Shortest signed distance from the active card, wrapping around the ring. */
const ringOffset = (index: number, active: number, total: number) => {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
};

export function CertificateCoverflow<T extends CoverflowItem>({ items, onOpen }: { items: T[]; onOpen: (item: T) => void }) {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);
  const inView = useInView(stageRef, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [spacing, setSpacing] = useState(280);

  const total = items.length;
  const step = useCallback((by: number) => setActive((current) => (current + by + total) % total), [total]);
  const playing = inView && !hovered && !reduced && total > 1;

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => step(1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [active, playing, step]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setSpacing(width < 640 ? width * 0.42 : Math.min(width * 0.25, 340));
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const current = items[active];
  if (!current) return null;

  return (
    <div onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovered(true); }} onPointerLeave={() => setHovered(false)}>
      <motion.div
        ref={stageRef}
        className="cert-stage relative h-[clamp(280px,46vw,540px)] cursor-grab active:cursor-grabbing select-none"
        style={{ perspective: 1500, touchAction: 'pan-y' }}
        onPanStart={() => { dragged.current = true; }}
        onPanEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 50 || Math.abs(info.velocity.x) > 400) {
            const cards = Math.max(1, Math.round(Math.abs(info.offset.x) / spacing));
            step(info.offset.x < 0 ? cards : -cards);
          }
          setTimeout(() => { dragged.current = false; }, 0);
        }}
      >
        {items.map((item, index) => {
          const offset = ringOffset(index, active, total);
          const distance = Math.abs(offset);
          if (distance > VISIBLE_SIDE) return null;
          const isActive = offset === 0;

          return (
            <motion.button
              key={item.id}
              type="button"
              aria-label={isActive ? `View ${item.title} full size` : `Show ${item.title}`}
              data-cursor={isActive ? 'View' : undefined}
              onClick={() => {
                if (dragged.current) return;
                if (isActive) onOpen(item);
                else step(offset);
              }}
              initial={{ opacity: 0, x: offset * spacing, scale: 0.6 }}
              animate={{
                x: offset * spacing,
                rotateY: Math.max(-1, Math.min(1, -offset)) * (42 + (distance - 1) * 6),
                scale: 1 - distance * 0.15,
                opacity: distance === VISIBLE_SIDE ? 0 : 1,
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 24, mass: 0.9 }}
              style={{ zIndex: 10 - distance }}
              className={`cert-card absolute inset-0 m-auto h-fit w-[min(76%,640px)] aspect-[4/3] rounded-2xl overflow-hidden bg-white ${isActive ? 'is-active' : ''}`}
            >
              <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 640px, 76vw" draggable={false} className="object-contain pointer-events-none" />
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 bg-stone-950 pointer-events-none"
                animate={{ opacity: Math.min(0.62, distance * 0.3) }}
              />
              {isActive && <span aria-hidden="true" key={active} className="cert-shine" />}
            </motion.button>
          );
        })}
      </motion.div>

      <div className="relative z-20 mt-6 sm:mt-10 max-w-2xl mx-auto text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-[108px]"
          >
            <span className="inline-block px-3 py-1 rounded-full border border-brand-500/40 bg-brand-500/10 text-[11px] font-bold uppercase tracking-widest text-brand-700 dark:text-brand-300">
              {current.badge}
            </span>
            <h4 className="mt-3 text-lg sm:text-2xl font-black tracking-tight text-stone-900 dark:text-white">{current.title}</h4>
            <p className="mt-1 text-sm font-medium text-stone-600 dark:text-stone-400">{current.issuer} · {current.date}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-center gap-3 sm:gap-4">
          <button type="button" onClick={() => step(-1)} aria-label="Previous certificate" className="cert-nav">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" onClick={() => onOpen(current)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-500 hover:bg-brand-400 text-stone-950 text-xs font-bold uppercase tracking-widest transition-colors">
            <ZoomIn className="w-4 h-4" /> View
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next certificate" className="cert-nav">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="sm:hidden mt-4 font-mono text-xs font-bold tracking-widest text-stone-600 dark:text-stone-400">
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        <div className="hidden sm:flex mt-6 flex-wrap items-center justify-center">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Go to certificate ${index + 1}`}
              aria-current={index === active}
              className="group/tick min-w-6 min-h-6 inline-flex items-center justify-center"
            >
              <span className={`relative block h-1 overflow-hidden rounded-full transition-all duration-300 ${index === active ? 'w-9 bg-stone-300 dark:bg-stone-700' : 'w-3 bg-stone-300 dark:bg-stone-700 group-hover/tick:bg-brand-500'}`}>
                {index === active && (
                  <span key={active} className="cert-progress" style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: playing ? 'running' : 'paused' }} />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
