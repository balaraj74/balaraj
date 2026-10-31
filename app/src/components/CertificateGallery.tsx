"use client";
import Image from 'next/image';
import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView as useFramerInView } from 'framer-motion';
import { RevealText } from './motion/primitives';
import { CertificateCoverflow } from './CertificateCoverflow';
import { X, ZoomIn, ChevronLeft, ChevronRight, Award, Cloud, Code, Cpu, Trophy } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = 'All' | 'Google Cloud' | 'Hackathon' | 'AWS' | 'HackerRank' | 'Other';

interface Cert {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category: Category;
  image: string;
  badge: string;
  badgeColor: string;
  borderColor: string;
  glowColor: string;
}

// ─── All Certificates ─────────────────────────────────────────────────────────
const CERTS: Cert[] = [
  // ── Google Cloud ───────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'Gen AI Exchange Hackathon — Winner',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Feb 2026',
    category: 'Google Cloud',
    image: '/certificates/winner-career-advisor.jpg',
    badge: 'Winner',
    badgeColor: 'text-yellow-300 border-yellow-400/40',
    borderColor: 'border-yellow-500/40 hover:border-yellow-400/70',
    glowColor: 'rgba(250, 204, 21,0.3)',
  },
  {
    id: 2,
    title: 'Google Cloud Gen AI Academy APAC 2026 — Cohort 1',
    issuer: 'Google Cloud × Hack2skill',
    date: 'May 2026',
    category: 'Google Cloud',
    image: '/certificates/google-genai-apac-cohort-1.jpg',
    badge: 'Participation',
    badgeColor: 'text-green-400 border-green-400/30',
    borderColor: 'border-green-500/30 hover:border-green-400/60',
    glowColor: 'rgba(74, 222, 128,0.2)',
  },
  {
    id: 3,
    title: 'Google Cloud Gen AI Academy APAC 2026 — Cohort 2',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Jul 2026',
    category: 'Google Cloud',
    image: '/certificates/google-genai-apac-cohort-2.jpg',
    badge: 'Completion',
    badgeColor: 'text-emerald-400 border-emerald-400/30',
    borderColor: 'border-emerald-500/30 hover:border-emerald-400/60',
    glowColor: 'rgba(52, 211, 153,0.2)',
  },
  {
    id: 4,
    title: 'Google Cloud Gen AI Academy APAC 2026 — Cohort 3 (Cloud Run)',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Sep 2026',
    category: 'Google Cloud',
    image: '/certificates/google-genai-apac-cohort-3.jpg',
    badge: 'Completion',
    badgeColor: 'text-gold-400 border-gold-400/30',
    borderColor: 'border-gold-500/30 hover:border-gold-400/60',
    glowColor: 'rgba(168, 85, 247,0.2)',
  },
  {
    id: 5,
    title: 'Gen AI Academy 2.0 — Cloud Technologies',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Jan 2026',
    category: 'Google Cloud',
    image: '/certificates/genai-cloud.jpg',
    badge: 'Completion',
    badgeColor: 'text-gold-400 border-gold-400/30',
    borderColor: 'border-gold-500/30 hover:border-gold-400/60',
    glowColor: 'rgba(251, 191, 36,0.2)',
  },
  {
    id: 6,
    title: 'Gen AI Academy 2.0 — AI/ML Track',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Jan 2026',
    category: 'Google Cloud',
    image: '/certificates/genai-aiml.jpg',
    badge: 'Completion',
    badgeColor: 'text-emerald-400 border-emerald-400/30',
    borderColor: 'border-emerald-500/30 hover:border-emerald-400/60',
    glowColor: 'rgba(52, 211, 153,0.2)',
  },
  {
    id: 7,
    title: 'Gen AI Academy 2.0 — Networking Track',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Jan 2026',
    category: 'Google Cloud',
    image: '/certificates/genai-networking.jpg',
    badge: 'Completion',
    badgeColor: 'text-brand-400 border-brand-400/30',
    borderColor: 'border-brand-500/30 hover:border-brand-400/60',
    glowColor: 'rgba(247, 102, 22,0.2)',
  },
  {
    id: 8,
    title: 'Gen AI Academy 2.0 — Data Track',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Jan 2026',
    category: 'Google Cloud',
    image: '/certificates/genai-data.jpg',
    badge: 'Completion',
    badgeColor: 'text-gold-400 border-gold-400/30',
    borderColor: 'border-gold-500/30 hover:border-gold-400/60',
    glowColor: 'rgba(244, 114, 182,0.2)',
  },
  {
    id: 9,
    title: 'Gen AI Academy 2.0 — DevOps Track',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Dec 2025',
    category: 'Google Cloud',
    image: '/certificates/genai-devops.png',
    badge: 'Completion',
    badgeColor: 'text-brand-400 border-brand-400/30',
    borderColor: 'border-brand-500/30 hover:border-brand-400/60',
    glowColor: 'rgba(247, 102, 22,0.2)',
  },
  {
    id: 10,
    title: 'Gen AI Academy 2.0 — Serverless Track',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Dec 2025',
    category: 'Google Cloud',
    image: '/certificates/genai-serverless.png',
    badge: 'Completion',
    badgeColor: 'text-ember-400 border-ember-400/30',
    borderColor: 'border-ember-500/30 hover:border-ember-400/60',
    glowColor: 'rgba(251, 146, 60,0.2)',
  },
  {
    id: 11,
    title: 'Gen AI Academy 2.0 — Security Track',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Dec 2025',
    category: 'Google Cloud',
    image: '/certificates/genai-security.png',
    badge: 'Completion',
    badgeColor: 'text-gold-400 border-gold-400/30',
    borderColor: 'border-gold-500/30 hover:border-gold-400/60',
    glowColor: 'rgba(167, 139, 250,0.2)',
  },
  {
    id: 12,
    title: '5-Day AI Agents Intensive Course',
    issuer: 'Kaggle × Google',
    date: 'Dec 2025',
    category: 'Google Cloud',
    image: '/certificates/ai-agents-google.png',
    badge: 'Badge Earned',
    badgeColor: 'text-yellow-400 border-yellow-400/30',
    borderColor: 'border-yellow-500/30 hover:border-yellow-400/60',
    glowColor: 'rgba(250, 204, 21,0.2)',
  },
  {
    id: 13,
    title: 'Gemini Certified Educator',
    issuer: 'Google for Education',
    date: 'Jun 2025',
    category: 'Google Cloud',
    image: '/certificates/gemini-educator.jpg',
    badge: 'Certified',
    badgeColor: 'text-emerald-400 border-emerald-400/30',
    borderColor: 'border-emerald-500/30 hover:border-emerald-400/60',
    glowColor: 'rgba(52, 211, 153,0.2)',
  },
  {
    id: 14,
    title: 'Agentic AI Day',
    issuer: 'Google Cloud × Hack2skill',
    date: '2025',
    category: 'Google Cloud',
    image: '/certificates/cert-8.jpg',
    badge: 'Participation',
    badgeColor: 'text-ember-400 border-ember-400/30',
    borderColor: 'border-ember-500/30 hover:border-ember-400/60',
    glowColor: 'rgba(251, 146, 60,0.2)',
  },

  // ── Hackathons ─────────────────────────────────────────────────────────────
  {
    id: 15,
    title: 'Inferentia 2.0 — 1st Place',
    issuer: 'PES University · AURA · AI&ML Dept',
    date: 'Sep 2025',
    category: 'Hackathon',
    image: '/certificates/cert-7.jpg',
    badge: '1st Place',
    badgeColor: 'text-amber-400 border-amber-400/30',
    borderColor: 'border-amber-500/30 hover:border-amber-400/60',
    glowColor: 'rgba(251, 191, 36,0.25)',
  },
  {
    id: 16,
    title: 'Meta PyTorch OpenEnv Hackathon — Round 1',
    issuer: 'Meta × OpenEnv × Scaler',
    date: 'Apr 2026',
    category: 'Hackathon',
    image: '/certificates/finalist-card.jpg',
    badge: 'Round 1 Qualified',
    badgeColor: 'text-brand-400 border-brand-400/30',
    borderColor: 'border-brand-500/30 hover:border-brand-400/60',
    glowColor: 'rgba(247, 102, 22,0.25)',
  },
  {
    id: 17,
    title: 'Build with Gemma: Bengaluru AI Sprint',
    issuer: 'Google Build with Gemma × RIT / IEEE CIS',
    date: '2025',
    category: 'Hackathon',
    image: '/certificates/gemma-bengaluru-ai-sprint.jpg',
    badge: 'Participation',
    badgeColor: 'text-ember-400 border-ember-400/30',
    borderColor: 'border-ember-500/30 hover:border-ember-400/60',
    glowColor: 'rgba(217, 72, 15,0.25)',
  },
  {
    id: 18,
    title: 'Adobe University Hackathon',
    issuer: 'Adobe × Unstop',
    date: 'Aug 2026',
    category: 'Hackathon',
    image: '/certificates/adobe-university-hackathon.jpg',
    badge: 'Participation',
    badgeColor: 'text-red-400 border-red-400/30',
    borderColor: 'border-red-500/30 hover:border-red-400/60',
    glowColor: 'rgba(239, 68, 68,0.25)',
  },
  {
    id: 19,
    title: 'Code of Honour 2.0',
    issuer: 'PESIT × Unstop',
    date: '2025',
    category: 'Hackathon',
    image: '/certificates/cert-99d5.jpg',
    badge: 'Participation',
    badgeColor: 'text-brand-400 border-brand-400/30',
    borderColor: 'border-brand-500/30 hover:border-brand-400/60',
    glowColor: 'rgba(247, 102, 22,0.2)',
  },

  // ── AWS ────────────────────────────────────────────────────────────────────
  {
    id: 20,
    title: 'AWS Job Roles in the Cloud',
    issuer: 'Amazon Web Services',
    date: 'Nov 2025',
    category: 'AWS',
    image: '/certificates/cert-5.jpg',
    badge: 'Completion',
    badgeColor: 'text-orange-400 border-orange-400/30',
    borderColor: 'border-orange-500/30 hover:border-orange-400/60',
    glowColor: 'rgba(251, 146, 60,0.2)',
  },
  {
    id: 21,
    title: 'AWS Certified Cloud Practitioner (CLF-C02) — Practice Question Set',
    issuer: 'Amazon Web Services',
    date: 'Nov 2025',
    category: 'AWS',
    image: '/certificates/cert-6.jpg',
    badge: 'Completion',
    badgeColor: 'text-orange-400 border-orange-400/30',
    borderColor: 'border-orange-500/30 hover:border-orange-400/60',
    glowColor: 'rgba(251, 146, 60,0.2)',
  },

  // ── HackerRank ─────────────────────────────────────────────────────────────
  {
    id: 22,
    title: 'Frontend Developer (React)',
    issuer: 'HackerRank',
    date: 'Oct 2025',
    category: 'HackerRank',
    image: '/certificates/react-developer.jpg',
    badge: 'Certified',
    badgeColor: 'text-green-400 border-green-400/30',
    borderColor: 'border-green-500/30 hover:border-green-400/60',
    glowColor: 'rgba(74, 222, 128,0.2)',
  },
  {
    id: 23,
    title: 'JavaScript (Intermediate)',
    issuer: 'HackerRank',
    date: 'Oct 2025',
    category: 'HackerRank',
    image: '/certificates/javascript-intermediate.jpg',
    badge: 'Certified',
    badgeColor: 'text-yellow-400 border-yellow-400/30',
    borderColor: 'border-yellow-500/30 hover:border-yellow-400/60',
    glowColor: 'rgba(250, 204, 21,0.2)',
  },

  // ── Other ──────────────────────────────────────────────────────────────────
  {
    id: 24,
    title: 'Oracle Cloud Infrastructure — Generative AI Professional',
    issuer: 'Oracle',
    date: '2025',
    category: 'Other',
    image: '/certificates/oracle-oci.jpg',
    badge: 'Professional',
    badgeColor: 'text-red-400 border-red-400/30',
    borderColor: 'border-red-500/30 hover:border-red-400/60',
    glowColor: 'rgba(248, 113, 113,0.2)',
  },
  {
    id: 25,
    title: 'AI for Beginners',
    issuer: 'HP LIFE Foundation',
    date: 'Nov 2025',
    category: 'Other',
    image: '/certificates/cert-50366.jpg',
    badge: 'Completion',
    badgeColor: 'text-ember-400 border-ember-400/30',
    borderColor: 'border-ember-500/30 hover:border-ember-400/60',
    glowColor: 'rgba(251, 146, 60,0.2)',
  },
];

const CATEGORIES: Category[] = ['All', 'Google Cloud', 'Hackathon', 'AWS', 'HackerRank', 'Other'];

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  All: <Award className="w-3.5 h-3.5" />,
  'Google Cloud': <Cloud className="w-3.5 h-3.5" />,
  Hackathon: <Trophy className="w-3.5 h-3.5" />,
  AWS: <Cpu className="w-3.5 h-3.5" />,
  HackerRank: <Code className="w-3.5 h-3.5" />,
  Other: <Code className="w-3.5 h-3.5" />,
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ cert, certs, onClose, onPrev, onNext }: {
  cert: Cert;
  certs: Cert[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const idx = certs.findIndex(c => c.id === cert.id);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      data-lenis-prevent
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/92 backdrop-blur-xl" />

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close certificate preview"
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        disabled={idx === 0}
        aria-label="Previous certificate"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors disabled:opacity-20"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={idx === certs.length - 1}
        aria-label="Next certificate"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors disabled:opacity-20"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Image */}
      <motion.div
        key={cert.id}
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="relative z-10 max-w-4xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <div
          className="rounded-2xl overflow-hidden border border-white/10"
          style={{ boxShadow: '0 0 90px rgba(247, 102, 22, 0.28)' }}
        >
          <Image
            src={cert.image}
            alt={cert.title}
            width={1200}
            height={900}
            className="w-full h-auto max-h-[72vh] object-contain bg-white"
          />
        </div>
        <div className="mt-4 flex items-center justify-between flex-wrap gap-3 px-1">
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">{cert.title}</h3>
            <p className="text-white/50 text-sm">{cert.issuer} · {cert.date}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest ${cert.badgeColor} bg-black/40`}>
              {cert.badge}
            </span>
            <span className="text-white/30 text-xs">{idx + 1} / {certs.length}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function CertCard({ cert, index, isInView, onClick }: {
  cert: Cert;
  index: number;
  isInView: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120, scale: 0.5, rotate: index % 2 === 0 ? 8 : -8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
      transition={{
        type: 'spring',
        stiffness: 160,
        damping: 18,
        delay: Math.min(index * 0.05, 1.2),
      }}
      whileHover={{ y: -8, scale: 1.025 }}
      onClick={onClick}
      className="relative group rounded-2xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg hover:border-brand-500/40"
    >
      {/* Shimmer sweep */}
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-brand-400 to-transparent group-hover:w-full transition-all duration-500 z-10 rounded-t-2xl" />

      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-stone-50 dark:bg-stone-950 border-b border-stone-100 dark:border-stone-800" style={{ aspectRatio: '4/3' }}>
        <Image
          src={cert.image}
          alt={cert.title}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="w-full h-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
        />
        {/* Zoom overlay */}
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 flex items-center justify-center transition-all duration-300">
          <div className="w-11 h-11 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm border border-white dark:border-stone-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
            <ZoomIn className="w-5 h-5 text-stone-800 dark:text-stone-200" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="text-stone-900 dark:text-white font-bold text-sm leading-tight mb-1 line-clamp-2 transition-colors">{cert.title}</h3>
        <p className="text-stone-600 dark:text-stone-400 text-xs mb-3 truncate font-medium transition-colors">{cert.issuer}</p>
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded-full border border-stone-200 dark:border-stone-700 text-[10px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 shadow-xs">
            {cert.badge}
          </span>
          <span className="text-stone-600 dark:text-stone-400 text-[10px] font-medium">{cert.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CertificateGallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'deck'>('deck');
  const [lightboxCert, setLightboxCert] = useState<Cert | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(sectionRef, { once: true, margin: '-60px' });

  const filtered = activeCategory === 'All'
    ? CERTS
    : CERTS.filter(c => c.category === activeCategory);

  const lightboxCerts = filtered;
  const lightboxIdx = lightboxCert ? lightboxCerts.findIndex(c => c.id === lightboxCert.id) : -1;

  const openLightbox = useCallback((cert: Cert) => setLightboxCert(cert), []);
  const closeLightbox = useCallback(() => setLightboxCert(null), []);

  const prevCert = useCallback(() => {
    if (lightboxIdx > 0) setLightboxCert(lightboxCerts[lightboxIdx - 1]);
  }, [lightboxIdx, lightboxCerts]);

  const nextCert = useCallback(() => {
    if (lightboxIdx < lightboxCerts.length - 1) setLightboxCert(lightboxCerts[lightboxIdx + 1]);
  }, [lightboxIdx, lightboxCerts]);

  return (
    <div ref={sectionRef} className="mt-4 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p className="section-label mx-auto w-fit mb-4">Verified Credentials</p>
        <RevealText
          as="h3"
          className="text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.04] font-serif italic font-medium text-stone-900 dark:text-white tracking-tight mb-4"
          segments={[{ text: 'Certifications' }, { text: 'Gallery', className: 'gradient-text-cyan' }]}
        />
        <p className="text-stone-600 dark:text-stone-400 max-w-xl mx-auto text-sm font-medium transition-colors">
          {CERTS.length} certifications across AI, Cloud, Security, and Development. Swipe through them, or open any one at full size.
        </p>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-6"
      >
        {CATEGORIES.map(cat => {
          const count = cat === 'All' ? CERTS.length : CERTS.filter(c => c.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold transition-colors duration-300 ${
                activeCategory === cat
                  ? 'border-brand-500/50 text-brand-800 dark:text-brand-300 shadow-sm'
                  : 'bg-white/80 dark:bg-stone-900/80 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-white dark:hover:bg-stone-800'
              }`}
            >
              {activeCategory === cat && (
                <motion.span layoutId="cert-filter" className="absolute inset-0 rounded-full bg-brand-500/20" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              <span className="relative flex items-center gap-1.5">
              {CATEGORY_ICONS[cat]}
              {cat}
              </span>
              <span className={`relative ml-0.5 text-xs rounded-full px-1.5 py-0.5 ${activeCategory === cat ? 'bg-brand-500/30 text-brand-900 dark:text-brand-200' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* View Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex justify-center mb-10"
      >
        <div className="bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-700 p-1 rounded-2xl flex items-center gap-1 shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-brand-500 text-stone-950 font-black shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('deck')}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
              viewMode === 'deck'
                ? 'bg-brand-500 text-stone-950 font-black shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            3D Showcase
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key={`grid-${activeCategory}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5"
            transition={{ duration: 0.25 }}
          >
            {filtered.map((cert, i) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={i}
                isInView={isInView}
                onClick={() => openLightbox(cert)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`deck-${activeCategory}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            <CertificateCoverflow key={activeCategory} items={filtered} onOpen={openLightbox} />
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="sr-only">
        {CERTS.map((cert) => <li key={cert.id}>{cert.title}, {cert.issuer}, {cert.date}</li>)}
      </ul>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/30">No certificates in this category.</div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxCert && (
          <Lightbox
            cert={lightboxCert}
            certs={lightboxCerts}
            onClose={closeLightbox}
            onPrev={prevCert}
            onNext={nextCert}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
