"use client";
import Image from 'next/image';
import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView as useFramerInView } from 'framer-motion';
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
    badge: '🏆 Winner',
    badgeColor: 'text-yellow-300 border-yellow-400/40',
    borderColor: 'border-yellow-500/40 hover:border-yellow-400/70',
    glowColor: 'rgba(250,204,21,0.3)',
  },
  {
    id: 2,
    title: 'Gen AI Academy APAC 2026',
    issuer: 'Google Cloud × Hack2skill',
    date: 'May 2026',
    category: 'Google Cloud',
    image: '/certificates/genai-apac.jpg',
    badge: 'Participation',
    badgeColor: 'text-green-400 border-green-400/30',
    borderColor: 'border-green-500/30 hover:border-green-400/60',
    glowColor: 'rgba(74,222,128,0.2)',
  },
  {
    id: 3,
    title: 'Gen AI Academy 2.0 — AI/ML Track',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Jan 2026',
    category: 'Google Cloud',
    image: '/certificates/genai-aiml2.jpg',
    badge: 'Completion',
    badgeColor: 'text-emerald-400 border-emerald-400/30',
    borderColor: 'border-emerald-500/30 hover:border-emerald-400/60',
    glowColor: 'rgba(52,211,153,0.2)',
  },
  {
    id: 4,
    title: 'Gen AI Academy 2.0 — Networking Track',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Jan 2026',
    category: 'Google Cloud',
    image: '/certificates/genai-ne.jpg',
    badge: 'Completion',
    badgeColor: 'text-cyan-400 border-cyan-400/30',
    borderColor: 'border-cyan-500/30 hover:border-cyan-400/60',
    glowColor: 'rgba(6,182,212,0.2)',
  },
  {
    id: 5,
    title: 'Gen AI Academy 2.0 — Cloud Architecture',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Jan 2026',
    category: 'Google Cloud',
    image: '/certificates/genai-cloud2.jpg',
    badge: 'Completion',
    badgeColor: 'text-sky-400 border-sky-400/30',
    borderColor: 'border-sky-500/30 hover:border-sky-400/60',
    glowColor: 'rgba(56,189,248,0.2)',
  },
  {
    id: 6,
    title: 'Gen AI Academy 2.0 — Data Analytics Track',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Jan 2026',
    category: 'Google Cloud',
    image: '/certificates/genai-data2.jpg',
    badge: 'Completion',
    badgeColor: 'text-pink-400 border-pink-400/30',
    borderColor: 'border-pink-500/30 hover:border-pink-400/60',
    glowColor: 'rgba(244,114,182,0.2)',
  },
  {
    id: 7,
    title: 'Gen AI Academy 2.0 — DevOps Track',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Dec 2025',
    category: 'Google Cloud',
    image: '/certificates/genai-devops.png',
    badge: 'Completion',
    badgeColor: 'text-cyan-400 border-cyan-400/30',
    borderColor: 'border-cyan-500/30 hover:border-cyan-400/60',
    glowColor: 'rgba(6,182,212,0.2)',
  },
  {
    id: 8,
    title: 'Gen AI Academy 2.0 — Serverless Track',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Dec 2025',
    category: 'Google Cloud',
    image: '/certificates/genai-serverless.png',
    badge: 'Completion',
    badgeColor: 'text-blue-400 border-blue-400/30',
    borderColor: 'border-blue-500/30 hover:border-blue-400/60',
    glowColor: 'rgba(96,165,250,0.2)',
  },
  {
    id: 9,
    title: 'Gen AI Academy 2.0 — Security Track',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Dec 2025',
    category: 'Google Cloud',
    image: '/certificates/genai-security.png',
    badge: 'Completion',
    badgeColor: 'text-purple-400 border-purple-400/30',
    borderColor: 'border-purple-500/30 hover:border-purple-400/60',
    glowColor: 'rgba(167,139,250,0.2)',
  },
  {
    id: 10,
    title: 'Gen AI Academy 2.0 — Networking (Hack2skill)',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Dec 2025',
    category: 'Google Cloud',
    image: '/certificates/genai-networking.jpg',
    badge: 'Completion',
    badgeColor: 'text-indigo-400 border-indigo-400/30',
    borderColor: 'border-indigo-500/30 hover:border-indigo-400/60',
    glowColor: 'rgba(129,140,248,0.2)',
  },
  {
    id: 11,
    title: 'Gen AI Academy 2.0 — Cloud Track (Hack2skill)',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Dec 2025',
    category: 'Google Cloud',
    image: '/certificates/genai-cloud.jpg',
    badge: 'Completion',
    badgeColor: 'text-sky-400 border-sky-400/30',
    borderColor: 'border-sky-500/30 hover:border-sky-400/60',
    glowColor: 'rgba(56,189,248,0.2)',
  },
  {
    id: 12,
    title: 'Gen AI Academy 2.0 — Data Analytics (Hack2skill)',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Dec 2025',
    category: 'Google Cloud',
    image: '/certificates/genai-data.jpg',
    badge: 'Completion',
    badgeColor: 'text-pink-400 border-pink-400/30',
    borderColor: 'border-pink-500/30 hover:border-pink-400/60',
    glowColor: 'rgba(244,114,182,0.2)',
  },
  {
    id: 13,
    title: 'Gen AI Academy 2.0 — AI/ML (Hack2skill)',
    issuer: 'Google Cloud × Hack2skill',
    date: 'Dec 2025',
    category: 'Google Cloud',
    image: '/certificates/genai-aiml.jpg',
    badge: 'Completion',
    badgeColor: 'text-emerald-400 border-emerald-400/30',
    borderColor: 'border-emerald-500/30 hover:border-emerald-400/60',
    glowColor: 'rgba(52,211,153,0.2)',
  },
  {
    id: 14,
    title: '5-Day AI Agents Intensive Course',
    issuer: 'Kaggle × Google',
    date: 'Dec 2025',
    category: 'Google Cloud',
    image: '/certificates/ai-agents-google.png',
    badge: 'Badge Earned',
    badgeColor: 'text-yellow-400 border-yellow-400/30',
    borderColor: 'border-yellow-500/30 hover:border-yellow-400/60',
    glowColor: 'rgba(250,204,21,0.2)',
  },
  {
    id: 15,
    title: 'Gemini Certified Educator',
    issuer: 'Google for Education',
    date: 'Jun 2025',
    category: 'Google Cloud',
    image: '/certificates/gemini-educator.jpg',
    badge: 'Certified',
    badgeColor: 'text-emerald-400 border-emerald-400/30',
    borderColor: 'border-emerald-500/30 hover:border-emerald-400/60',
    glowColor: 'rgba(52,211,153,0.2)',
  },
  {
    id: 16,
    title: 'Agentic AI Day',
    issuer: 'Google Cloud × Hack2skill',
    date: '2025',
    category: 'Google Cloud',
    image: '/certificates/cert-8.jpg',
    badge: 'Participation',
    badgeColor: 'text-blue-400 border-blue-400/30',
    borderColor: 'border-blue-500/30 hover:border-blue-400/60',
    glowColor: 'rgba(96,165,250,0.2)',
  },
  // ── Hackathon ──────────────────────────────────────────────────────────────
  {
    id: 17,
    title: 'Inferentia 2.0 — 1st Place',
    issuer: 'PES University · AURA · AI&ML Dept',
    date: 'Sep 2025',
    category: 'Hackathon',
    image: '/certificates/cert-7.jpg',
    badge: '🥇 1st Place',
    badgeColor: 'text-amber-400 border-amber-400/30',
    borderColor: 'border-amber-500/30 hover:border-amber-400/60',
    glowColor: 'rgba(251,191,36,0.25)',
  },
  {
    id: 18,
    title: 'Meta PyTorch OpenEnv Hackathon — Round 1',
    issuer: 'Meta × OpenEnv × Scaler',
    date: 'Apr 2026',
    category: 'Hackathon',
    image: '/certificates/finalist-card.jpg',
    badge: 'Round 1 Qualified',
    badgeColor: 'text-cyan-400 border-cyan-400/30',
    borderColor: 'border-cyan-500/30 hover:border-cyan-400/60',
    glowColor: 'rgba(6,182,212,0.25)',
  },
  {
    id: 19,
    title: 'Code of Honour 2.0',
    issuer: 'PESIT × Unstop',
    date: '2025',
    category: 'Hackathon',
    image: '/certificates/cert-99d5.jpg',
    badge: 'Participation',
    badgeColor: 'text-cyan-400 border-cyan-400/30',
    borderColor: 'border-cyan-500/30 hover:border-cyan-400/60',
    glowColor: 'rgba(6,182,212,0.2)',
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
    glowColor: 'rgba(251,146,60,0.2)',
  },
  {
    id: 21,
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    date: 'Nov 2025',
    category: 'AWS',
    image: '/certificates/cert-6.jpg',
    badge: 'Completion',
    badgeColor: 'text-orange-400 border-orange-400/30',
    borderColor: 'border-orange-500/30 hover:border-orange-400/60',
    glowColor: 'rgba(251,146,60,0.2)',
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
    glowColor: 'rgba(74,222,128,0.2)',
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
    glowColor: 'rgba(250,204,21,0.2)',
  },
  // ── Other ──────────────────────────────────────────────────────────────────
  {
    id: 24,
    title: 'Oracle Cloud Infrastructure — Gen AI Professional',
    issuer: 'Oracle',
    date: '2025',
    category: 'Other',
    image: '/certificates/oracle-oci.jpg',
    badge: 'Professional',
    badgeColor: 'text-red-400 border-red-400/30',
    borderColor: 'border-red-500/30 hover:border-red-400/60',
    glowColor: 'rgba(248,113,113,0.2)',
  },
  {
    id: 25,
    title: 'AI for Beginners',
    issuer: 'HP LIFE Foundation',
    date: 'Nov 2025',
    category: 'Other',
    image: '/certificates/cert-50366.jpg',
    badge: 'Completion',
    badgeColor: 'text-blue-400 border-blue-400/30',
    borderColor: 'border-blue-500/30 hover:border-blue-400/60',
    glowColor: 'rgba(96,165,250,0.2)',
  },
  {
    id: 26,
    title: 'Responsible AI with GitHub Copilot',
    issuer: 'GitHub',
    date: 'Dec 2025',
    category: 'Other',
    image: '/certificates/cert-github.jpg',
    badge: 'Certified',
    badgeColor: 'text-indigo-400 border-indigo-400/30',
    borderColor: 'border-indigo-500/30 hover:border-indigo-400/60',
    glowColor: 'rgba(129,140,248,0.2)',
  },
  {
    id: 27,
    title: 'NVIDIA Cloud & Community',
    issuer: 'NVIDIA',
    date: 'Dec 2025',
    category: 'Other',
    image: '/certificates/cert-nvidia.jpg',
    badge: 'Completion',
    badgeColor: 'text-green-400 border-green-400/30',
    borderColor: 'border-green-500/30 hover:border-green-400/60',
    glowColor: 'rgba(74,222,128,0.2)',
  },
  {
    id: 28,
    title: 'GDG Discovery Certification',
    issuer: 'Google Developer Groups',
    date: '2025',
    category: 'Google Cloud',
    image: '/certificates/cert-extra.jpg',
    badge: 'Participant',
    badgeColor: 'text-sky-400 border-sky-400/30',
    borderColor: 'border-sky-500/30 hover:border-sky-400/60',
    glowColor: 'rgba(56,189,248,0.2)',
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
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/92 backdrop-blur-xl" />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        disabled={idx === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors disabled:opacity-20"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={idx === certs.length - 1}
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
          style={{ boxShadow: `0 0 80px ${cert.glowColor}` }}
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
      className="relative group rounded-2xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg hover:border-cyan-500/40"
    >
      {/* Shimmer sweep */}
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent group-hover:w-full transition-all duration-500 z-10 rounded-t-2xl" />

      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800" style={{ aspectRatio: '4/3' }}>
        <Image
          src={cert.image}
          alt={cert.title}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="w-full h-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
        />
        {/* Zoom overlay */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 flex items-center justify-center transition-all duration-300">
          <div className="w-11 h-11 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-white dark:border-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
            <ZoomIn className="w-5 h-5 text-slate-800 dark:text-slate-200" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="text-slate-900 dark:text-white font-bold text-sm leading-tight mb-1 line-clamp-2 transition-colors">{cert.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-xs mb-3 truncate font-medium transition-colors">{cert.issuer}</p>
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 shadow-xs">
            {cert.badge}
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-[10px] font-medium">{cert.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Interactive 3D Deck Explorer ─────────────────────────────────────────────
interface InteractiveDeckProps {
  certs: Cert[];
  onCardClick: (cert: Cert) => void;
}

function InteractiveDeck({ certs, onCardClick }: InteractiveDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [draggedId, setDraggedId] = useState<number | null>(null);

  const nextCard = useCallback(() => {
    if (certs.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % certs.length);
  }, [certs.length]);

  const prevCard = useCallback(() => {
    if (certs.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + certs.length) % certs.length);
  }, [certs.length]);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || certs.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certs.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isHovered, certs.length]);

  if (certs.length === 0) {
    return <div className="text-center py-20 text-slate-400">No certificates in this category.</div>;
  }

  // Determine cards to show in the 3D stack (max visible: 4)
  const visibleCards = [];
  const maxVisible = Math.min(certs.length, 4);
  for (let i = 0; i < maxVisible; i++) {
    const idx = (currentIndex + i) % certs.length;
    visibleCards.push({ cert: certs[idx]!, stackIndex: i });
  }
  
  // Render cards in reverse order so the active/top card is on top (higher HTML stack order)
  visibleCards.reverse();

  return (
    <div className="flex flex-col items-center select-none pt-4">
      {/* 3D Stack Area */}
      <div 
        className="relative w-full max-w-[850px] h-[480px] sm:h-[580px] flex items-center justify-center mb-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <AnimatePresence mode="popLayout">
          {visibleCards.map(({ cert, stackIndex }) => {
            const isTop = stackIndex === 0;
            return (
              <motion.div
                key={cert.id}
                style={{
                  zIndex: visibleCards.length - stackIndex,
                  transformOrigin: "bottom center",
                  cursor: isTop ? "grab" : "default",
                }}
                className="absolute w-[95%] sm:w-full max-w-[560px] md:max-w-[640px] aspect-[4/3] rounded-3xl border border-white/95 dark:border-white/10 bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl overflow-hidden p-4 md:p-5 shadow-xl flex flex-col justify-between"
                initial={{
                  scale: 0.82 + (3 - stackIndex) * 0.04,
                  y: -stackIndex * 16,
                  rotate: isTop ? 0 : (stackIndex % 2 === 0 ? 1.5 : -1.5) * stackIndex,
                  opacity: 0,
                }}
                animate={{
                  scale: 1 - stackIndex * 0.04,
                  y: -stackIndex * 12,
                  rotate: isTop ? 0 : (stackIndex % 2 === 0 ? 1.5 : -1.5) * stackIndex,
                  opacity: 1,
                  boxShadow: isTop 
                    ? `0 20px 50px rgba(15,23,42,0.15)` 
                    : `0 4px 12px rgba(15, 23, 42, 0.06)`,
                }}
                exit={{
                  y: draggedId ? (draggedId === cert.id ? 0 : 0) : -120,
                  x: draggedId === cert.id ? 280 : (draggedId ? -280 : 0),
                  opacity: 0,
                  scale: draggedId ? 0.88 : 1.15,
                  rotate: draggedId === cert.id ? 15 : (draggedId ? -15 : 0),
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(event, info) => {
                  if (!isTop) return;
                  const swipeThreshold = 80;
                  if (info.offset.x > swipeThreshold) {
                    setDraggedId(cert.id);
                    setTimeout(() => {
                      nextCard();
                      setDraggedId(null);
                    }, 50);
                  } else if (info.offset.x < -swipeThreshold) {
                    setDraggedId(cert.id);
                    setTimeout(() => {
                      prevCard();
                      setDraggedId(null);
                    }, 50);
                  }
                }}
                whileHover={isTop ? { 
                  y: -6, 
                  scale: 1.015,
                  transition: { duration: 0.2 } 
                } : {}}
                onClick={() => {
                  if (isTop) onCardClick(cert);
                }}
              >
                {/* Image Area */}
                <div className="relative w-full aspect-[4/3] bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden mb-3.5 group border border-slate-200 dark:border-slate-800">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(min-width: 640px) 580px, 95vw"
                    className="w-full h-full object-contain p-2"
                    draggable={false}
                  />
                  {isTop && (
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-all duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-white dark:border-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                        <ZoomIn className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                      </div>
                    </div>
                  )}
                </div>
                {/* Text Area */}
                <div className="px-1 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm line-clamp-1 mb-0.5 leading-tight transition-colors">{cert.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs truncate leading-none font-medium transition-colors">{cert.issuer}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800">
                    <span className="px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 shadow-xs">
                      {cert.badge}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] font-medium">{cert.date}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Control Panel */}
      <div className="flex items-center gap-5 mt-2">
        <button
          onClick={prevCard}
          className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-400 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold tracking-widest min-w-[70px] text-center">
          {currentIndex + 1} / {certs.length}
        </span>
        <button
          onClick={nextCard}
          className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-400 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <p className="text-slate-500 dark:text-slate-400 text-[10px] mt-4 uppercase tracking-widest flex items-center gap-1.5 font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-pulse" />
        Swipe card or use controls to browse · click to zoom
      </p>
    </div>
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
        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3 transition-colors">
          Certifications <span className="gradient-text-cyan">Gallery</span>
        </h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm font-medium transition-colors">
          {CERTS.length} certifications across AI, Cloud, Security, and Development. Click any to view full resolution.
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
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-800 dark:text-cyan-300 shadow-sm'
                  : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              {CATEGORY_ICONS[cat]}
              {cat}
              <span className={`ml-0.5 text-xs rounded-full px-1.5 py-0.5 ${activeCategory === cat ? 'bg-cyan-500/30 text-cyan-900 dark:text-cyan-200' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
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
        <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 p-1 rounded-2xl flex items-center gap-1 shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('deck')}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
              viewMode === 'deck'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            3D Stack Explorer
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
            <InteractiveDeck
              certs={filtered}
              onCardClick={openLightbox}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
