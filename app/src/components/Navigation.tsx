"use client";
import { useEffect, useState, useCallback, type MouseEvent } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Menu, X, Search } from 'lucide-react';
import { EASE_OUT_EXPO, fadeInUp, staggerContainer } from './shared';
import { scrollToId } from './motion/SmoothScroll';
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

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <motion.div
      className="fixed top-0 inset-x-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-brand-400 via-gold-400 to-ember-500"
      style={{ scaleX }}
    />
  );
}

const linkHref = (link: NavLink) => link.route ?? `/#${link.id}`;

function Logo({ onClick }: { onClick: (e: MouseEvent) => void }) {
  return (
    <motion.a
      href="/"
      className="text-2xl font-serif italic font-medium tracking-tight cursor-pointer flex items-center group pointer-events-auto bg-transparent border-0 p-0 text-left"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-stone-900 dark:text-white font-bold transition-colors">Balaraj</span>
      <span className="gradient-text-cyan ml-1 font-bold">R</span>
      <span className="text-stone-600 dark:text-stone-400 text-sm font-sans not-italic font-normal ml-2 hidden sm:inline transition-colors">· Portfolio</span>
    </motion.a>
  );
}

interface DesktopNavProps {
  activeSection: string;
  onLinkClick: (link: NavLink, e?: MouseEvent) => void;
}

function DesktopNav({ activeSection, onLinkClick }: DesktopNavProps) {
  return (
    <div className="hidden lg:flex items-center gap-0.5">
      {NAV_LINKS.map((link) => (
        <motion.a
          key={link.id}
          href={linkHref(link)}
          aria-current={activeSection === link.id ? 'true' : undefined}
          onClick={(e) => onLinkClick(link, e)}
          className={`px-3 py-1.5 text-xs font-semibold transition-all duration-300 rounded-lg relative ${
            activeSection === link.id
              ? 'text-brand-700 dark:text-brand-400 font-bold'
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
          }`}
          whileHover={{ y: -1 }}
          whileTap={{ y: 0 }}
        >
          {activeSection === link.id && (
            <motion.div
              layoutId="nav-pill"
              className="absolute inset-0 bg-brand-500/15 dark:bg-brand-500/20 rounded-lg border border-brand-500/30 dark:border-brand-500/40"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{link.label}</span>
        </motion.a>
      ))}
    </div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  activeSection: string;
  onLinkClick: (link: NavLink, e?: MouseEvent) => void;
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
          className="lg:hidden bg-white/95 dark:bg-stone-950/95 backdrop-blur-3xl border border-stone-200 dark:border-stone-800 shadow-xl rounded-b-[2rem] overflow-hidden absolute w-full left-0 top-full mt-2"
        >
          <motion.div
            className="px-4 py-4 space-y-1"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link.id}
                href={linkHref(link)}
                variants={fadeInUp}
                onClick={(e) => onLinkClick(link, e)}
                className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  activeSection === link.id
                    ? 'text-brand-700 dark:text-brand-400 bg-brand-500/15 dark:bg-brand-500/20 border border-brand-500/30 dark:border-brand-500/40 font-bold'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-900'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {link.label}
              </motion.a>
            ))}

            <div className="pt-2 mt-2 border-t border-stone-200/80 dark:border-stone-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  onLinkClick({ id: 'search', label: 'Search' });
                  window.dispatchEvent(new CustomEvent('open-command-palette'));
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-brand-500/30 bg-brand-50/50 dark:bg-brand-950/30 text-xs font-semibold text-brand-800 dark:text-brand-300 shadow-sm hover:bg-brand-100/50 dark:hover:bg-brand-900/30 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>Quick Search...</span>
                </span>
                <kbd className="px-2 py-0.5 rounded bg-white dark:bg-stone-800 border border-brand-500/30 text-[10px] font-mono text-brand-700 dark:text-brand-300">
                  ⌘K
                </kbd>
              </button>
              <div className="flex gap-2">
              <a
                href="https://github.com/balaraj74"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 text-xs font-semibold text-stone-800 dark:text-stone-200"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/balarajr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 text-xs font-semibold text-stone-800 dark:text-stone-200"
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
  const [hidden, setHidden] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(current > previous && current > 160);
  });

  const handleLinkClick = useCallback((link: NavLink, e?: MouseEvent) => {
    e?.preventDefault();
    if (link.route) {
      router.push(link.route);
    } else {
      if (pathname !== '/') {
        router.push(`/#${link.id}`);
      } else {
        scrollToId(link.id);
      }
    }
    setMenuOpen(false);
  }, [pathname, router]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

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

  const currentLink = pathname.startsWith('/blogs') ? 'blogs' : activeSection;

  return (
    <>
      <ScrollProgressBar />
      <motion.nav
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: hidden && !menuOpen ? -110 : 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className={`fixed top-3 left-1/2 w-[96%] max-w-[1700px] z-50 transition-[background-color,border-color,box-shadow] duration-500 rounded-2xl ${
          scrolled
            ? 'bg-white/85 dark:bg-stone-950/85 backdrop-blur-2xl border border-white/90 dark:border-stone-800/80 shadow-[0_12px_36px_-6px_rgba(28,25,23,0.1),0_0_0_1px_rgba(255,255,255,0.8)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)]'
            : 'bg-white/65 dark:bg-stone-950/65 backdrop-blur-xl border border-white/80 dark:border-stone-800/60 shadow-[0_8px_24px_-4px_rgba(28,25,23,0.06)] dark:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3)]'
        }`}
      >
        <div className="px-4 sm:px-8">
          <div className="flex items-center justify-between h-14">
            <Logo onClick={(e) => handleLinkClick({ id: 'hero', label: 'Home' }, e)} />
            <DesktopNav activeSection={currentLink} onLinkClick={handleLinkClick} />
            <div className="flex items-center gap-2.5 shrink-0">
              <CommandPaletteTrigger />
              <ThemeToggle />
              <motion.a
                href="https://github.com/balaraj74"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-stone-900/90 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-brand-500/40 transition-all duration-300 shadow-sm"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/balarajr/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-stone-900/90 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-[#0A66C2]/40 transition-all duration-300 shadow-sm"
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
                className="lg:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white"
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
        <MobileMenu isOpen={menuOpen} activeSection={currentLink} onLinkClick={handleLinkClick} />
      </motion.nav>
    </>
  );
}
