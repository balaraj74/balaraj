"use client";

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative p-2 rounded-xl border transition-all duration-300 flex items-center justify-center shadow-sm overflow-hidden ${
        isDark
          ? 'bg-slate-900/90 border-slate-700/80 text-amber-300 hover:text-amber-200 hover:border-amber-400/50 hover:bg-slate-800 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
          : 'bg-white/90 border-slate-300 text-slate-700 hover:text-slate-950 hover:border-cyan-500/50 hover:bg-slate-100 shadow-sm'
      } ${className}`}
      whileHover={{ scale: 1.08, y: -1 }}
      whileTap={{ scale: 0.92 }}
    >
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: isDark ? -90 : 90, scale: 0, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: isDark ? 90 : -90, scale: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700" />
        )}
      </motion.div>
    </motion.button>
  );
}
