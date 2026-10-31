"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';
import { Marquee } from './motion/primitives';

const SITE_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
  { label: 'RSS', href: '/rss.xml' },
];

const PROJECT_LINKS = [
  { label: 'Darwin', href: '/projects/darwin' },
  { label: 'VaidyaOS', href: '/projects/vaidyos' },
  { label: 'CareerLens', href: '/projects/career-lens' },
  { label: 'AgriSence', href: '/projects/agrisence' },
  { label: 'TaskForze', href: '/projects/taskforze' },
];

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub profile', icon: Github, href: 'https://github.com/balaraj74' },
    { name: 'LinkedIn profile', icon: Linkedin, href: 'https://www.linkedin.com/in/balaraj-r-209a67330/' },
    { name: 'X / Twitter profile', icon: Twitter, href: 'https://x.com/Balaraj__r' },
    { name: 'Instagram profile', icon: Instagram, href: 'https://www.instagram.com/balaraj.__r/' },
    { name: 'Email Balaraj', icon: Mail, href: 'mailto:balarajr483@gmail.com' },
  ];

  return (
    <footer className="relative pb-12 bg-[#EFECE5] dark:bg-[#090706] border-t border-stone-300 dark:border-stone-800 transition-colors">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
      <Link href="/contact" data-cursor="Talk" className="block py-10 sm:py-16 border-b border-stone-300 dark:border-stone-800 group">
        <span className="sr-only">Let&apos;s build something real: contact Balaraj R</span>
        <Marquee speed={1.6} ariaHidden>
          {['a', 'b', 'c'].map((key) => (
            <span key={key} className="text-[clamp(3.5rem,11vw,10rem)] font-serif italic font-medium leading-none tracking-tight text-stone-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors px-8 whitespace-nowrap">
              Let&apos;s build something real <span aria-hidden="true">—</span>
            </span>
          ))}
        </Marquee>
      </Link>

      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-12">
        <nav aria-label="Footer" className="grid grid-cols-2 sm:flex sm:gap-24 gap-8 mb-12 text-sm">
          {[{ title: 'Site', links: SITE_LINKS }, { title: 'Projects', links: PROJECT_LINKS }].map((column) => (
            <div key={column.title}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-600 dark:text-stone-400 mb-3">{column.title}</p>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-stone-700 dark:text-stone-300 hover:text-brand-700 dark:hover:text-brand-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-xl font-black tracking-tight mb-1">
              <span className="text-stone-900 dark:text-white transition-colors">B</span>
              <span className="gradient-text-cyan">R</span>
              <span className="text-stone-600 dark:text-stone-400 text-sm font-normal ml-1">· Portfolio</span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 text-sm transition-colors">© 2026 Balaraj R. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400 text-sm transition-colors">
            <span>Built with</span>
            <span className="text-brand-700 dark:text-brand-400 font-semibold">Next.js</span>
            <span>·</span>
            <span className="text-brand-700 dark:text-brand-400 font-semibold">TypeScript</span>
            <span>·</span>
            <span className="text-brand-700 dark:text-brand-400 font-semibold">Framer Motion</span>
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
                  className="text-stone-600 dark:text-stone-400 hover:text-brand-700 dark:hover:text-brand-400 transition-colors"
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
