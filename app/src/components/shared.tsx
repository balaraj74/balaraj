"use client";
import { useEffect, useState } from 'react';

// ─── Animation Variants ───────────────────────────────────────────────────────
export type EasingTuple = [number, number, number, number];
export const EASE_OUT_EXPO: EasingTuple = [0.16, 1, 0.3, 1];

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: EASE_OUT_EXPO } }),
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

// ─── Custom Hooks ─────────────────────────────────────────────────────────────
/**
 * Hook to count up to a target number when visible.
 */
export function useCountUp(target: number, isVisible: boolean): number {
  const [count, setCount] = useState(target);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const duration = 1200;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(ease * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, target]);

  return count;
}

/**
 * Hook to get mouse-tracking offset for parallax animation.
 */
export function useMouseParallax(strength = 0.02) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setOffset({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);
  return offset;
}

// ─── Visual Components ────────────────────────────────────────────────────────
/**
 * Floating background particle effect field (disabled for clean dark aesthetic).
 */
export function ParticleField() {
  return null;
}

/**
 * Decorative background (disabled for clean dark aesthetic).
 */
export function AuroraBackground() {
  return null;
}
