"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CursorDot } from './shared';
import { Navigation } from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import AchievementsSection from './AchievementsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

export default function HomeClient() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#020810] text-white relative">
      {/* Global Seamless Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none" 
        style={{ 
          backgroundImage: "url('/images/bg_global.png')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          opacity: 0.25 
        }} 
      />
      
      {/* Content wrapper */}
      <div className="relative z-10">
        <CursorDot />
        <Navigation />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
