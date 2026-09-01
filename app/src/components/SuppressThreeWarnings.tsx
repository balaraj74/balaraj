"use client";
import { useEffect } from 'react';

/**
 * Suppresses two known false-positive console warnings from third-party deps:
 *
 * 1. THREE.Clock deprecated — R3F v9 internally uses THREE.Clock; it hasn't
 *    migrated to THREE.Timer yet. This is cosmetic only, not a runtime error.
 *    Remove once @react-three/fiber >= 10 is adopted.
 *
 * 2. Framer Motion "non-static position" — useScroll({ target }) walks up the
 *    DOM to find the scroll container and warns if <html> is position:static.
 *    The scroll calculations work correctly; this is a false positive for
 *    window-level scroll tracking. Remove once framer-motion fixes detection.
 */
export default function SuppressThreeWarnings() {
  useEffect(() => {
    const SUPPRESS = [
      'THREE.Clock',
      'non-static position',
    ];

    const original = console.warn.bind(console);
    console.warn = (...args: Parameters<typeof console.warn>) => {
      if (typeof args[0] === 'string' && SUPPRESS.some((s) => args[0].includes(s))) return;
      original(...args);
    };
    return () => { console.warn = original; };
  }, []);
  return null;
}
