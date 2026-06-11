"use client";
import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Menu, X } from 'lucide-react';
import { EASE_OUT_EXPO, fadeInUp, staggerContainer } from './shared';

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
  { id: 'experience', label: 'Journey' },
  { id: 'achievements', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
  { id: 'blogs', label: 'Blog', route: '/blogs' },
];

function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <motion.div
      className="fixed top-0 left-0 h-[2px] z-[60] bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
      style={{ width: `${progress}%` }}
    />
  );
}

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className="text-2xl font-serif italic font-medium tracking-tight cursor-pointer flex items-center group pointer-events-auto"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-white">Balaraj</span>
      <span className="gradient-text-cyan ml-1">R</span>
      <span className="text-white/40 text-sm font-sans not-italic font-normal ml-2 hidden sm:inline">· Portfolio</span>
    </motion.div>
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
            activeSection === link.id ? 'text-cyan-400' : 'text-white/55 hover:text-white'
          }`}
          whileHover={{ y: -1 }}
          whileTap={{ y: 0 }}
        >
          {activeSection === link.id && (
            <motion.div
              layoutId="nav-pill"
              className="absolute inset-0 bg-cyan-500/10 rounded-lg border border-cyan-500/20"
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
          className="lg:hidden bg-[#0a0f1a]/98 backdrop-blur-3xl border-t border-white/10 rounded-b-[2rem] overflow-hidden absolute w-full left-0 top-full mt-2"
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
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {link.label}
              </motion.button>
            ))}
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
        router.push('/#' + link.id);
      } else {
        document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  }, [router, pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 50);
      setScrollProgress(totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0);

      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ScrollProgressBar progress={scrollProgress} />
      <motion.nav
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
        className={`fixed top-3 left-1/2 w-[94%] max-w-6xl z-50 transition-all duration-500 rounded-2xl ${
          scrolled
            ? 'bg-[#0a1628]/90 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(6,182,212,0.1)]'
            : 'bg-[#0f172a]/40 backdrop-blur-md border border-white/5'
        }`}
      >
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <Logo onClick={() => handleLinkClick({ id: 'hero', label: 'Home' })} />
            <DesktopNav activeSection={activeSection} onLinkClick={handleLinkClick} />
            <div className="flex items-center gap-2 shrink-0">
              <motion.a
                href="https://github.com/balaraj74"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-medium hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </motion.a>
              <motion.button
                className="lg:hidden p-2 text-white/70 hover:text-white"
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
