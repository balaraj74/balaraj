"use client";
import { Children, useRef, type ElementType, type PointerEvent, type ReactNode } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  type MotionValue,
} from 'framer-motion';
import { EASE_OUT_EXPO } from '../shared';

export const VIEWPORT = { once: true, amount: 0.2 } as const;

// ─── Reveal ───────────────────────────────────────────────────────────────────
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  x = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

// ─── Text ─────────────────────────────────────────────────────────────────────
export interface TextSegment {
  text: string;
  className?: string;
  /** Starts a new line after this segment. */
  br?: boolean;
}

const wordVariants = {
  hidden: { y: '110%', rotate: 4 },
  visible: { y: '0%', rotate: 0, transition: { duration: 1, ease: EASE_OUT_EXPO } },
};

/** Masked word-by-word heading. Words stay real text for crawlers and readers. */
export function RevealText({
  as = 'h2',
  segments,
  className,
}: {
  as?: 'h1' | 'h2' | 'h3';
  segments: TextSegment[];
  className?: string;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.06 }}
    >
      {segments.map((segment, i) => (
        <span key={i}>
          {segment.text.split(' ').map((word, w) => (
            <span key={w}>
              <span className="reveal-word">
                <motion.span className={`inline-block origin-top-left ${segment.className ?? ''}`} variants={wordVariants}>
                  {word}
                </motion.span>
              </span>{' '}
            </span>
          ))}
          {segment.br && <br />}
        </span>
      ))}
    </Tag>
  );
}

function ScrollWord({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{word}</motion.span>{' '}
    </>
  );
}

/** Large statement whose words light up as it scrolls through the viewport. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <ScrollWord key={i} word={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </span>
    </p>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
/** Endless strip that speeds up, and flips direction, with scroll velocity. */
export function Marquee({
  children,
  speed = 2,
  reverse = false,
  className,
  trackClassName,
  ariaHidden,
}: {
  children: ReactNode;
  ariaHidden?: boolean;
  /** Percent of the strip per second. */
  speed?: number;
  reverse?: boolean;
  className?: string;
  trackClassName?: string;
}) {
  const reduced = useReducedMotion();
  const position = useMotionValue(0);
  const hovered = useRef(false);
  const direction = useRef(reverse ? 1 : -1);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const x = useTransform(position, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced || hovered.current) return;
    const boost = Math.min(Math.abs(velocity.get()) / 400, 6);
    if (velocity.get() < -40) direction.current = reverse ? -1 : 1;
    else if (velocity.get() > 40) direction.current = reverse ? 1 : -1;
    position.set(position.get() + direction.current * speed * (1 + boost) * (delta / 1000));
  });

  const items = Children.toArray(children);
  return (
    <div
      aria-hidden={ariaHidden}
      className={`marquee overflow-hidden ${className ?? ''}`}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') hovered.current = true; }}
      onPointerLeave={() => { hovered.current = false; }}
    >
      <motion.div className={`flex w-max ${trackClassName ?? ''}`} style={{ x }}>
        <div className="flex shrink-0">{items}</div>
        <div className="flex shrink-0" aria-hidden="true">{items}</div>
      </motion.div>
    </div>
  );
}

// ─── Pointer effects ──────────────────────────────────────────────────────────
/** Pulls its child toward the pointer, then springs back. */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div className={className ?? 'inline-block'} style={{ x, y }} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </motion.div>
  );
}

/** Card with a pointer-tracked spotlight and, optionally, 3D tilt. */
export function SpotlightCard({
  as = 'div',
  children,
  className,
  tilt = 6,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees; 0 disables it. */
  tilt?: number;
}) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(0, { stiffness: 180, damping: 18 });
  const ry = useSpring(0, { stiffness: 180, damping: 18 });
  const background = useMotionTemplate`radial-gradient(420px circle at ${px}px ${py}px, rgba(247, 102, 22,0.16), transparent 70%)`;
  const Tag = (typeof as === 'string' ? motion.create(as) : as) as typeof motion.div;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    px.set(mx);
    py.set(my);
    if (reduced || !tilt) return;
    ry.set((mx / rect.width - 0.5) * tilt * 2);
    rx.set((0.5 - my / rect.height) * tilt * 2);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <Tag
      className={`group/spot relative ${className ?? ''}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-[1] rounded-[inherit] opacity-0 group-hover/spot:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background }}
      />
      {children}
    </Tag>
  );
}
