"use client";
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/balaraj74' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/balaraj-r-209a67330/' },
    { icon: Twitter, href: 'https://x.com/Balaraj__r' },
    { icon: Instagram, href: 'https://www.instagram.com/balaraj.__r/' },
    { icon: Mail, href: 'mailto:balarajr483@gmail.com' },
  ];

  return (
    <footer className="relative py-12 bg-[#020810] border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-xl font-black tracking-tight mb-1">
              <span className="text-white">B</span>
              <span className="gradient-text-cyan">R</span>
              <span className="text-white/30 text-sm font-normal ml-1">· Portfolio</span>
            </div>
            <p className="text-white/30 text-sm">© 2026 Balaraj R. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-2 text-white/30 text-sm">
            <span>Built with</span>
            <span className="text-cyan-400">Next.js</span>
            <span>·</span>
            <span className="text-cyan-400">TypeScript</span>
            <span>·</span>
            <span className="text-cyan-400">Framer Motion</span>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-cyan-400 transition-colors"
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
