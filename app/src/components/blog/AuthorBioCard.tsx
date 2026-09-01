import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Sparkles } from 'lucide-react';
import { AuthorInfo } from '@/types/blog';

export function AuthorBioCard({ author }: { author: AuthorInfo }) {
  return (
    <div className="rounded-2xl glass-card border border-white/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-lg my-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-cyan-500/30 flex-shrink-0 bg-slate-100 dark:bg-slate-800 shadow-md">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {author.name}
            </h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-3 h-3" /> Author
            </span>
          </div>
          <p className="text-sm font-medium text-cyan-700 dark:text-cyan-400 mb-2">
            {author.role}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            AI/ML Engineer and systems architect building production-grade intelligence platforms across Healthcare AI, Agriculture OS, and Edge AI. State Winner at Inferentia 2.0 & Google Gen AI hackathon champion.
          </p>
          <div className="flex items-center gap-3">
            {author.github && (
              <Link
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-slate-700/50 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </Link>
            )}
            {author.linkedin && (
              <Link
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-slate-700/50 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
            )}
            {author.twitter && (
              <Link
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-slate-700/50 transition-colors"
                aria-label="Twitter Profile"
              >
                <Twitter className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
