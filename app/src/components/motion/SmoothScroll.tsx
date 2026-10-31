"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import Lenis from 'lenis';

let lenis: Lenis | null = null;

/** Scrolls to a section, through Lenis when it is running. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export function MotionRoot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis = instance;
    let frame = requestAnimationFrame(function raf(time) {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // Route changes keep the Lenis instance, so its limits need re-measuring.
  useEffect(() => {
    lenis?.resize();
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
