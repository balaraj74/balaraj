"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CursorDot } from './shared';
import { Navigation } from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import JourneyExperience from './JourneyExperience';
import AchievementsSection from './AchievementsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

export default function HomeClient() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const scrollToHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < 10) {
          attempts++;
          setTimeout(tryScroll, 120);
        }
      };
      tryScroll();
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#F7F4EE] dark:bg-[#030712] text-slate-900 dark:text-slate-100 relative transition-colors duration-300">
      {/* Content wrapper */}
      <div className="relative z-10">
        <CursorDot />
        <Navigation />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneyExperience />
        <AchievementsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
