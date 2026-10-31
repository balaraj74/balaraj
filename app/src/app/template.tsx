"use client";
import { useEffect } from 'react';

let hasNavigated = false;

/** Fades in on client-side navigation only, so the first load paints immediately. */
export default function Template({ children }: { children: React.ReactNode }) {
  const className = hasNavigated ? 'page-enter' : undefined;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return <div className={className}>{children}</div>;
}
