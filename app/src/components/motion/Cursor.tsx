"use client";
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

/** Dot and trailing ring. The ring grows over interactive elements and shows data-cursor labels. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<{ active: boolean; label: string | null }>({ active: false, label: null });
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    const frame = requestAnimationFrame(() => setEnabled(true));

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const labelled = target?.closest<HTMLElement>('[data-cursor]');
      setState({
        active: Boolean(labelled ?? target?.closest('a, button, [role="button"], input, textarea')),
        label: labelled?.dataset.cursor ?? null,
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = state.label ? 84 : state.active ? 48 : 28;
  return (
    <div aria-hidden="true" className="fixed inset-0 z-[9999] pointer-events-none">
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-brand-500/70"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          backgroundColor: state.label ? 'rgba(247, 102, 22,0.92)' : state.active ? 'rgba(247, 102, 22,0.14)' : 'rgba(247, 102, 22,0)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <AnimatePresence>
          {state.label && (
            <motion.span
              className="text-[11px] font-bold uppercase tracking-widest text-stone-950"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-brand-500"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
    </div>
  );
}
