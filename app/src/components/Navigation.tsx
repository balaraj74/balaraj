"use client";
import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Menu, X, Search } from 'lucide-react';
import { EASE_OUT_EXPO, fadeInUp, staggerContainer } from './shared';
import { ThemeToggle } from './ThemeToggle';
import { CommandPaletteTrigger } from './CommandPalette';

interface NavLink {
  id: string;
  label: string;
  route?: string;
}

const NAV_LINKS: NavLink[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'achievements', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
  { id: 'blogs', label: 'Blog', route: '/blogs' },
];

function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <motion.div
      className="fixed top-0 left-0 h-[2px] z-[60] bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
      style={{ width: `${progress}%` }}
    />
  );
}

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      aria-label="Balaraj R Portfolio Home"
      className="text-2xl font-serif italic font-medium tracking-tight cursor-pointer flex items-center group pointer-events-auto bg-transparent border-0 p-0 text-left"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-slate-900 dark:text-white font-bold transition-colors">Balaraj</span>
      <span className="gradient-text-cyan ml-1 font-bold">R</span>
      <span className="text-slate-500 dark:text-slate-400 text-sm font-sans not-italic font-normal ml-2 hidden sm:inline transition-colors">· Portfolio</span>
    </motion.button>
  );
}

interface DesktopNavProps {
  activeSection: string;
  onLinkClick: (link: NavLink) => void;
}

function DesktopNav({ activeSection, onLinkClick }: DesktopNavProps) {
  return (
    <div className="hidden lg:flex items-center gap-0.5">
      {NAV_LINKS.map((link) => (
        <motion.button
          key={link.id}
          onClick={() => onLinkClick(link)}
          className={`px-3 py-1.5 text-xs font-semibold transition-all duration-300 rounded-lg relative ${
            activeSection === link.id
              ? 'text-cyan-700 dark:text-cyan-400 font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
          whileHover={{ y: -1 }}
          whileTap={{ y: 0 }}
        >
          {activeSection === link.id && (
            <motion.div
              layoutId="nav-pill"
              className="absolute inset-0 bg-cyan-500/15 dark:bg-cyan-500/20 rounded-lg border border-cyan-500/30 dark:border-cyan-500/40"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{link.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  activeSection: string;
  onLinkClick: (link: NavLink) => void;
}

function MobileMenu({ isOpen, activeSection, onLinkClick }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-3xl border border-slate-200 dark:border-slate-800 shadow-xl rounded-b-[2rem] overflow-hidden absolute w-full left-0 top-full mt-2"
        >
          <motion.div
            className="px-4 py-4 space-y-1"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {NAV_LINKS.map((link) => (
              <motion.button
                key={link.id}
                variants={fadeInUp}
                onClick={() => onLinkClick(link)}
                className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  activeSection === link.id
                    ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-500/15 dark:bg-cyan-500/20 border border-cyan-500/30 dark:border-cyan-500/40 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {link.label}
              </motion.button>
            ))}

            <div className="pt-2 mt-2 border-t border-slate-200/80 dark:border-slate-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  onLinkClick({ id: 'search', label: 'Search' });
                  window.dispatchEvent(new CustomEvent('open-command-palette'));
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-50/50 dark:bg-cyan-950/30 text-xs font-semibold text-cyan-800 dark:text-cyan-300 shadow-sm hover:bg-cyan-100/50 dark:hover:bg-cyan-900/30 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Quick Search...</span>
                </span>
                <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-cyan-500/30 text-[10px] font-mono text-cyan-700 dark:text-cyan-300">
                  ⌘K
                </kbd>
              </button>
              <div className="flex gap-2">
              <a
                href="https://github.com/balaraj74"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-xs font-semibold text-slate-800 dark:text-slate-200"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/balaraj-r-209a67330/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-xs font-semibold text-slate-800 dark:text-slate-200"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <span>LinkedIn</span>
              </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  const handleLinkClick = useCallback((link: NavLink) => {
    if (link.route) {
      router.push(link.route);
    } else {
      if (pathname !== '/') {
        router.push(`/#${link.id}`);
      } else {
        const element = document.getElementById(link.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setMenuOpen(false);
  }, [pathname, router]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      const sections = NAV_LINKS.filter(link => !link.route).map(link => link.id);
      const viewportMiddle = scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const { top } = section.getBoundingClientRect();
          const absoluteTop = top + scrollY;
          if (viewportMiddle >= absoluteTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ScrollProgressBar progress={scrollProgress} />
      <motion.nav
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
        className={`fixed top-3 left-1/2 w-[96%] max-w-[1700px] z-50 transition-all duration-500 rounded-2xl ${
          scrolled
            ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-2xl border border-white/90 dark:border-slate-800/80 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.1),0_0_0_1px_rgba(255,255,255,0.8)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)]'
            : 'bg-white/65 dark:bg-slate-950/65 backdrop-blur-xl border border-white/80 dark:border-slate-800/60 shadow-[0_8px_24px_-4px_rgba(15,23,42,0.06)] dark:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3)]'
        }`}
      >
        <div className="px-4 sm:px-8">
          <div className="flex items-center justify-between h-14">
            <Logo onClick={() => handleLinkClick({ id: 'hero', label: 'Home' })} />
            <DesktopNav activeSection={activeSection} onLinkClick={handleLinkClick} />
            <div className="flex items-center gap-2.5 shrink-0">
              <CommandPaletteTrigger />
              <ThemeToggle />
              <motion.a
                href="https://github.com/balaraj74"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-sm"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/balaraj-r-209a67330/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-[#0A66C2]/40 transition-all duration-300 shadow-sm"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>LinkedIn</span>
              </motion.a>
              <motion.button
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                className="lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                onClick={() => setMenuOpen((o) => !o)}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
        <MobileMenu isOpen={menuOpen} activeSection={activeSection} onLinkClick={handleLinkClick} />
      </motion.nav>
    </>
  );
}
