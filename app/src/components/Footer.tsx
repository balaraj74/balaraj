"use client";
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub profile', icon: Github, href: 'https://github.com/balaraj74' },
    { name: 'LinkedIn profile', icon: Linkedin, href: 'https://www.linkedin.com/in/balaraj-r-209a67330/' },
    { name: 'X / Twitter profile', icon: Twitter, href: 'https://x.com/Balaraj__r' },
    { name: 'Instagram profile', icon: Instagram, href: 'https://www.instagram.com/balaraj.__r/' },
    { name: 'Email Balaraj', icon: Mail, href: 'mailto:balarajr483@gmail.com' },
  ];

  return (
    <footer className="relative py-12 bg-[#EFECE5] dark:bg-[#020617] border-t border-slate-300 dark:border-slate-800 transition-colors">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-xl font-black tracking-tight mb-1">
              <span className="text-slate-900 dark:text-white transition-colors">B</span>
              <span className="gradient-text-cyan">R</span>
              <span className="text-slate-600 dark:text-slate-400 text-sm font-normal ml-1">· Portfolio</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors">© 2026 Balaraj R. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm transition-colors">
            <span>Built with</span>
            <span className="text-cyan-700 dark:text-cyan-400 font-semibold">Next.js</span>
            <span>·</span>
            <span className="text-cyan-700 dark:text-cyan-400 font-semibold">TypeScript</span>
            <span>·</span>
            <span className="text-cyan-700 dark:text-cyan-400 font-semibold">Framer Motion</span>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
