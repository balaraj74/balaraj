"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export interface PathStop {
  id: string;
  phase: number;
  period: string;
  category: string;
}

/**
 * Lays a winding beam through every `[data-stop]` element inside it. Scrolling
 * drives a comet along the beam; each stop it passes lights up, and a sticky
 * readout tracks where the reader is on the journey.
 */
export function RoadmapPath({
  stops,
  total,
  children,
}: {
  stops: PathStop[];
  total: number;
  children: (current: number) => ReactNode;
}) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const cometRef = useRef<HTMLDivElement>(null);
  const stopsY = useRef<number[]>([]);
  const [shape, setShape] = useState({ d: '', height: 0 });
  const [current, setCurrent] = useState(-1);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 0.55', 'end 0.55'] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6 });

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const origin = track.getBoundingClientRect();
    const points = [...track.querySelectorAll('[data-stop]')].map((stop) => {
      const rect = stop.getBoundingClientRect();
      return { x: rect.left + rect.width / 2 - origin.left, y: rect.top + rect.height / 2 - origin.top };
    });
    if (!points.length) return;

    stopsY.current = points.map((point) => point.y);
    const d = points.reduce((path, point, i) => {
      const from = points[i - 1] ?? { x: point.x, y: 0 };
      const bend = (point.y - from.y) * 0.5;
      return `${path} C ${from.x} ${from.y + bend}, ${point.x} ${point.y - bend}, ${point.x} ${point.y}`;
    }, `M ${points[0].x} 0`);
    setShape({ d, height: origin.height });
  }, []);

  const place = useCallback((value: number) => {
    const beam = beamRef.current;
    const glow = glowRef.current;
    if (!beam || !glow || !shape.d) return;
    const length = beam.getTotalLength();
    const drawn = length * Math.min(1, Math.max(0, value));
    const point = beam.getPointAtLength(drawn);
    for (const path of [beam, glow]) {
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length - drawn}`;
    }
    if (cometRef.current) {
      cometRef.current.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`;
      cometRef.current.style.opacity = value > 0.002 ? '1' : '0';
    }
    setCurrent(stopsY.current.filter((y) => y <= point.y + 2).length - 1);
  }, [shape.d]);

  useMotionValueEvent(progress, 'change', (value) => {
    if (!reduced) place(value);
  });

  // Height changes with viewport width and with the filter.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    measure();
  }, [measure, stops]);

  useEffect(() => {
    place(reduced ? 1 : progress.get());
  }, [place, progress, reduced]);

  const active = stops[Math.min(current, stops.length - 1)];

  return (
    <div ref={trackRef} className="relative">
      <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ height: shape.height || undefined }}>
        <defs>
          <linearGradient id="roadmap-beam" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={shape.height || 1}>
            <stop offset="0%" stopColor="#f9853c" />
            <stop offset="55%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d9480f" />
          </linearGradient>
        </defs>
        <path d={shape.d} fill="none" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" className="stroke-stone-400/60 dark:stroke-stone-600/70" />
        <path ref={glowRef} d={shape.d} fill="none" stroke="url(#roadmap-beam)" strokeWidth="14" strokeLinecap="round" opacity="0.16" />
        <path ref={beamRef} d={shape.d} fill="none" stroke="url(#roadmap-beam)" strokeWidth="3.5" strokeLinecap="round" />
      </svg>

      <div ref={cometRef} aria-hidden="true" className="roadmap-comet" />

      {active && (
        <div className="sticky top-[calc(100vh-4.5rem)] z-30 h-0 flex justify-center pointer-events-none">
          <div aria-hidden="true" className="h-fit inline-flex items-center gap-3 px-4 py-2 rounded-full border border-brand-500/40 bg-white/85 dark:bg-stone-950/85 backdrop-blur-xl shadow-lg font-mono text-xs">
            <span className="flex overflow-hidden font-black text-brand-700 dark:text-brand-300 text-sm">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active.phase}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {String(active.phase).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
              <span className="text-stone-500 font-medium">/{String(total).padStart(2, '0')}</span>
            </span>
            <span className="w-px h-3 bg-stone-300 dark:bg-stone-700" />
            <span className="uppercase tracking-wider text-stone-700 dark:text-stone-300 whitespace-nowrap">{active.period}</span>
          </div>
        </div>
      )}

      {children(reduced ? stops.length : current)}
    </div>
  );
}
