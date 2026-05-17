"use client";
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';




import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Brain,
  Shield,
  Cloud,
  Cpu,
  Award,
  Calendar,
  CheckCircle2,
  Trophy,
  Sparkles,
  Layers,
  Globe,
  GitBranch,
  Zap,
  Menu,
  X,
  FileText,
  Star,
  ArrowUpRight,
  Terminal,
  Server,
  Flame,
  Twitter,
  Instagram,
  Database,
  Activity,
} from 'lucide-react';


// ─── Utility Hook ──────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ─── Custom Hooks & Components ──────────────────────────────────────────────────
function useCountUp(target: number, isVisible: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    const step = target / 40;
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { 
        setCount(target); 
        clearInterval(timer); 
      } else {
        setCount(Math.floor(current));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [isVisible, target]);
  return count;
}

function CursorDot() {
  const [pos, setPos] = useState({x: 0, y: 0});
  useEffect(() => {
    const fn = (e: MouseEvent) => setPos({x: e.clientX, y: e.clientY});
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);
  return (
    <div className="fixed pointer-events-none z-[9999] mix-blend-difference hidden md:block"
         style={{left: pos.x - 6, top: pos.y - 6, width: 12, height: 12,
                 borderRadius: '50%', background: '#00d4ff',
                 transition: 'left 0.05s, top 0.05s'}} />
  );
}


// ─── Particle Field ────────────────────────────────────────────────────────────
function ParticleField() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: `${(i * 3.7 + 5) % 100}%`,
    y: `${(i * 7.3 + 10) % 100}%`,
    delay: `${(i * 0.4) % 6}s`,
    duration: `${5 + (i * 0.3) % 4}s`,
    size: i % 3 === 0 ? 'w-1.5 h-1.5' : 'w-1 h-1',
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute ${p.size} rounded-full bg-cyan-400/20 animate-float`}
          style={{ left: p.x, top: p.y, animationDelay: p.delay, animationDuration: p.duration }}
        />
      ))}
    </div>
  );
}


// ─── Navigation ───────────────────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Journey' },
    { id: 'achievements', label: 'Awards' },
    { id: 'contact', label: 'Contact' },
    { id: 'blogs', label: 'Blog', route: '/blogs' },
  ];

  const router = useRouter();
  const navigate = router.push;
  const pathname = usePathname();
  const location = { pathname, hash: typeof window !== 'undefined' ? window.location.hash : '' };
  const scrollToSection = useCallback((id: string) => {
    if (location.pathname !== '/') {
      navigate('/#' + id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  }, [navigate, location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      for (const link of navLinks) {
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
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[96%] max-w-[1400px] z-50 transition-all duration-300 rounded-[2rem] ${
        scrolled
          ? 'bg-[#0f172a]/80 backdrop-blur-lg border border-white/10 shadow-2xl'
          : 'bg-[#0f172a]/40 backdrop-blur-md border border-white/5'
      }`}
    >
      <div className="w-full px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-xl font-black tracking-tight cursor-pointer" onClick={() => scrollToSection('hero')}>
            <span className="text-white">B</span>
            <span className="text-violet-400">R</span>
            <span className="text-white/40 text-xs font-normal ml-1">· Portfolio</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => link.route ? navigate(link.route) : scrollToSection(link.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  activeSection === link.id
                    ? 'text-violet-400 bg-violet-500/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/balaraj74"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-white/70 hover:text-white"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0a0f1a]/95 backdrop-blur-3xl border-t border-white/10 rounded-b-[2rem] overflow-hidden absolute w-full left-0 top-full mt-2">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => link.route ? navigate(link.route) : scrollToSection(link.id)}
                className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  activeSection === link.id
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  const { ref, isVisible } = useInView(0.15);

  return (
    <section id="hero" ref={ref as React.RefObject<HTMLDivElement>} className="relative h-screen min-h-[700px] flex items-center overflow-hidden hero-bg bg-[#050d1a]">
      {/* Base Background & Particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#051125] via-[#050d1a] to-[#01050a]" />
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="absolute inset-0 hero-grid opacity-20" />
      </div>
      
      <ParticleField />

      {/* Massive Background Text */}
      <div className="absolute flex flex-col justify-center pointer-events-none overflow-hidden select-none top-1/2 -translate-y-[60%] z-10 w-full mb-12">
        <h1 className={`text-[clamp(10rem,28vw,35rem)] leading-none font-black text-white/10 whitespace-nowrap tracking-tighter w-max flex animate-scroll-text transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <span className="px-8">BALARAJ</span>
          <span className="px-8">BALARAJ</span>
          <span className="px-8">BALARAJ</span>
          <span className="px-8">BALARAJ</span>
        </h1>
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        
        {/* Floating Left Content */}
        <div className={`absolute left-4 sm:left-8 lg:left-12 top-1/3 sm:top-1/2 -translate-y-1/2 flex flex-col items-start gap-4 transition-all duration-700 delay-300 pointer-events-auto ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-widest uppercase">
            Open To Opportunities
          </div>
          
          <div className="flex flex-col mt-2">
            <h2 className="text-[3rem] sm:text-[4.5rem] lg:text-[6.5rem] font-black leading-[0.85] tracking-tighter gradient-text-cyan pb-2 pointer-events-auto hover:scale-[1.02] transition-transform duration-500 origin-left">
              SYSTEMS
            </h2>
            <h2 className="text-[3rem] sm:text-[4.5rem] lg:text-[6.5rem] font-black leading-[0.85] tracking-tighter text-[#e0e1dd] mt-2 lg:mt-4 pointer-events-auto hover:text-cyan-400 transition-colors duration-500">
              ARCHITECT
            </h2>
            <h2 className="text-[3rem] sm:text-[4.5rem] lg:text-[6.5rem] font-black leading-[0.85] tracking-tighter text-[#e0e1dd] mt-2 lg:mt-4 flex items-center pointer-events-auto hover:text-purple-400 transition-colors duration-500">
              & AI ENGINEER
            </h2>
          </div>
          
          <p className="text-white/80 font-bold text-xs sm:text-sm mt-6 uppercase tracking-widest max-w-[320px] leading-relaxed">
            Architecting scalable event-driven infrastructure and robust multi-agent systems.
          </p>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mt-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            2× National Hackathon Winner
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto relative">
             <button className="group flex items-center gap-4 bg-[#e0e1dd] text-[#1a1a1a] font-black px-6 py-3 sm:px-8 sm:py-4 rounded-xl overflow-hidden relative shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-cyan-400 hover:text-white hover:scale-105 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] active:scale-95 transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm w-full sm:w-auto justify-center" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                {/* Button shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                <span className="relative z-10">See Live AI Projects</span>
                <div className="bg-[#1a1a1a] text-white p-1 rounded-full group-hover:translate-x-1 group-hover:bg-white group-hover:text-cyan-500 transition-all duration-300 relative z-10">
                  <ArrowRight className="w-4 h-4" />
                </div>
             </button>
             <a href="https://drive.google.com/file/d/1eHgU1BzPQ1m0DxUQqf0EbmLVZ-jRKAYk/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 border-2 border-white/20 text-white font-black px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-none hover:bg-white/10 hover:border-cyan-400/50 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] active:scale-95 transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm w-full sm:w-auto justify-center">
                Download Resume
             </a>
          </div>
        </div>

        {/* Floating Right Content */}
        <div className={`absolute right-4 sm:right-8 lg:right-12 top-1/3 sm:top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end text-right gap-12 transition-all duration-700 delay-500 pointer-events-auto z-20 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            
            {/* Review/Intro Style Block */}
            <div className="max-w-[280px] w-full text-left">
               <div className="flex items-center gap-1 mb-3">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                 ))}
               </div>
               <p className="text-[#e0e1dd] text-sm font-bold leading-relaxed tracking-wide uppercase">
                 Award-winning AI/ML developer recognized for high-performance AI integration and scalable systems.
               </p>
            </div>

            {/* Structured Stats */}
            <div className="flex flex-col items-start text-left max-w-[320px] w-full">
               <h3 className="text-white text-base font-black tracking-[0.05em] uppercase mb-6 drop-shadow-md">
                 PROVEN HIGHLIGHTS
               </h3>
               <div className="flex flex-col gap-6 w-full">
                 <div className="flex items-start group cursor-pointer w-full hover:-translate-x-2 transition-transform duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] mr-4 mt-0.5 transition-all duration-300 flex-shrink-0" />
                    <span className="text-[#e0e1dd] font-bold text-sm tracking-[0.1em] uppercase group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] transition-all duration-300 leading-relaxed">
                      2 National-Level Hackathon Wins (₹2.75L+)
                    </span>
                 </div>
                 <div className="flex items-start group cursor-pointer w-full hover:-translate-x-2 transition-transform duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] mr-4 mt-0.5 transition-all duration-300 flex-shrink-0" />
                    <span className="text-[#e0e1dd] font-bold text-sm tracking-[0.1em] uppercase group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] transition-all duration-300 leading-relaxed">
                      Built 10+ AI-driven applications
                    </span>
                 </div>
                 <div className="flex items-start group cursor-pointer w-full hover:-translate-x-2 transition-transform duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-purple-400 group-hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)] mr-4 mt-0.5 transition-all duration-300 flex-shrink-0" />
                    <span className="text-[#e0e1dd] font-bold text-sm tracking-[0.1em] uppercase group-hover:text-purple-400 group-hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.8)] transition-all duration-300 leading-relaxed">
                      Deployed ML systems used by real users
                    </span>
                 </div>
               </div>
            </div>
            
        </div>

        {/* Character Portrait */}
        <div className={`absolute bottom-0 left-0 right-0 mx-auto w-[85%] sm:w-[480px] lg:w-[620px] xl:w-[820px] h-[100%] flex items-end justify-center pointer-events-none transition-all duration-1000 delay-200 z-30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}>
           <img src="/image1.png" alt="Balaraj" className="mb-4 lg:mb-8 w-full h-[95%] object-contain object-bottom drop-shadow-[0_-20px_50px_rgba(6,182,212,0.15)] brightness-110 origin-bottom scale-[1.05]" />
           {/* Dark Gradient Overlay at the bottom to blend the image beautifully */}
           <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050d1a] via-[#050d1a]/80 to-transparent pointer-events-none" />
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-3 z-30">
        <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold rotate-90 translate-y-[-40px]">Scroll Down</span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-cyan-400 origin-top animate-[scale-y_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
      
      {/* Mobile Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:hidden flex flex-col items-center gap-2 z-30">
        <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Scroll Down</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1">
          <div className="w-1 h-1.5 bg-cyan-400 rounded-full animate-bounce-slow" />
        </div>
      </div>
      
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  const { ref, isVisible } = useInView(0.2);

  const highlights = [
    { icon: Brain, label: 'Agentic AI Systems', desc: 'Multi-agent workflows, LLM orchestration, tool usage', color: 'text-violet-400' },
    { icon: Code2, label: 'Full-Stack AI Apps', desc: 'Next.js, APIs, ML integration, real-time UI', color: 'text-sky-400' },
    { icon: Cloud, label: 'Cloud & MLOps', desc: 'GCP, Docker, deployment pipelines', color: 'text-emerald-400' },
    { icon: Shield, label: 'AI Security', desc: 'Model safety, adversarial thinking, secure systems', color: 'text-amber-400' },
  ];

  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="relative py-28 bg-[#050d1a] overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-violet-950/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left – Visual */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/12 to-transparent rounded-3xl blur-2xl" />
              {/* Code-style card */}
              <div className="relative glass-strong rounded-3xl p-8 border border-violet-500/20 font-mono text-sm overflow-hidden group hover:border-cyan-500/30 hover:scale-[1.02] hover:-rotate-1 hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)] transition-all duration-500 origin-center">
                {/* Scanning bar */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.8)] opacity-0 group-hover:opacity-100 animate-scan pointer-events-none z-20" />
                
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="ml-2 text-white/30 text-xs">balaraj.profile.ts</span>
                </div>
                <div className="space-y-1.5 text-white/80">
                  <div><span className="text-violet-400">const</span> <span className="text-sky-300">balaraj</span> <span className="text-white/40">=</span> {'{'}</div>
                  <div className="pl-4"><span className="text-emerald-300">name</span><span className="text-white/40">:</span> <span className="text-amber-300">"Balaraj R"</span><span className="text-white/40">,</span></div>
                  <div className="pl-4"><span className="text-emerald-300">role</span><span className="text-white/40">:</span> <span className="text-amber-300">"Systems Architect & AI"</span><span className="text-white/40">,</span></div>
                  <div className="pl-4"><span className="text-emerald-300">university</span><span className="text-white/40">:</span> <span className="text-amber-300">"PES University"</span><span className="text-white/40">,</span></div>
                  <div className="pl-4"><span className="text-emerald-300">focus</span><span className="text-white/40">:</span> <span className="text-amber-300">"Distributed Systems, DS&A"</span><span className="text-white/40">,</span></div>
                  <div className="pl-4"><span className="text-emerald-300">specialization</span><span className="text-white/40">:</span> <span className="text-amber-300">"AI & ML"</span><span className="text-white/40">,</span></div>
                  <div className="pl-4"><span className="text-emerald-300">hackathonPrizes</span><span className="text-white/40">:</span> <span className="text-amber-300">"₹2,75,000"</span><span className="text-white/40">,</span></div>
                  <div className="pl-4"><span className="text-emerald-300">certifications</span><span className="text-white/40">:</span> <span className="text-violet-300">35</span><span className="text-white/40">,</span></div>
                  <div className="pl-4"><span className="text-emerald-300">linesOfCode</span><span className="text-white/40">:</span> <span className="text-amber-300">"40,000+ (solo)"</span><span className="text-white/40">,</span></div>
                  <div className="pl-4">
                    <span className="text-emerald-300">openSource</span><span className="text-white/40">: {`[`}</span>
                  </div>
                  <div className="pl-8 text-amber-300">"Ubuntu"<span className="text-white/40">,</span> "Pandas"<span className="text-white/40">,</span> "NumPy"<span className="text-white/40">,</span></div>
                  <div className="pl-4"><span className="text-white/40">{`]`},</span></div>
                  <div className="pl-4"><span className="text-emerald-300">badge</span><span className="text-white/40">:</span> <span className="text-amber-300">"GitHub Pull Shark x2"</span><span className="text-white/40">,</span></div>
                  <div>{'}'}<span className="text-white/40">;</span> <span className="inline-block w-2 bg-violet-400 h-4 ml-1 animate-pulse align-middle" /></div>
                </div>
              </div>

              {/* Floating stat */}
              <div className="absolute -bottom-6 -right-6 glass-strong rounded-2xl p-5 border border-violet-500/20">
                <div className="text-4xl font-black text-violet-400">1st</div>
                <div className="text-white/60 text-sm">Year BTech<br />CSE · AI & ML</div>
              </div>
            </div>
          </div>

          {/* Right – Text */}
          <div className="space-y-8">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="section-label">About Me</p>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                Building AI That<br />
                <span className="gradient-text-purple">Ships to Production</span>
              </h2>
              <p className="text-cyan-400 font-semibold tracking-wide text-sm sm:text-base mt-3 opacity-90">
                Focused on building real-world AI systems — not just models, but deployable products.
              </p>
            </div>

            <div className={`space-y-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-white/65 text-lg leading-relaxed">
                I'm a 1st-year B.Tech CSE student at <strong className="text-white">PES University</strong> specializing in AI & ML. I build and deploy production-grade AI systems, including <strong className="text-violet-400">CareerLens</strong> (40,000+ LOC, 32 services) and <strong className="text-violet-400">AgriSence</strong> (GCP-based ML platform with 400+ commits).
              </p>
              <p className="text-white/50 leading-relaxed">
                I'm a <strong className="text-white">National-level hackathon winner</strong> with <strong className="text-emerald-400">₹2.75L+</strong> in prizes—most notably securing a flagship victory in the <strong className="gradient-text-cyan">Google GenAI Hackathon</strong>. I hold 35+ top-tier certifications across multi-cloud infrastructure and cybersecurity, and actively shape open-source ecosystems with merged contributions to <strong className="text-white">Ubuntu, Pandas, and NumPy</strong> (GitHub Pull Shark ×2).
              </p>
            </div>

            {/* Highlights grid */}
            <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {highlights.map((h, i) => (
                <div key={h.label} className="glass rounded-2xl p-5 border border-white/5 hover:border-cyan-500/25 hover:bg-white/3 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1 transition-all duration-300 group" style={{ transitionDelay: isVisible ? `${600 + i * 150}ms` : '0ms' }}>
                  <h.icon className={`w-6 h-6 ${h.color} mb-3 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_currentColor] transition-all duration-300`} />
                  <div className="text-white font-semibold mb-1">{h.label}</div>
                  <div className="text-white/45 text-sm">{h.desc}</div>
                </div>
              ))}
            </div>

            <div className={`flex flex-wrap gap-4 mt-8 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <a href="mailto:balarajr483@gmail.com" className="btn-primary group">
                <Mail className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                Work With Me
              </a>
              <a href="https://github.com/balaraj74" target="_blank" rel="noopener noreferrer" className="btn-secondary group">
                <Github className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                View GitHub
              </a>
              <a href="https://drive.google.com/file/d/1eHgU1BzPQ1m0DxUQqf0EbmLVZ-jRKAYk/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-secondary group">
                <FileText className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                View Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Capabilities & Systems Section ───────────────────────────────────────────
function SkillsSection() {
  const { ref, isVisible } = useInView(0.15);

  const skillCategories = [
    {
      title: 'AI Systems Engineering',
      icon: Brain,
      color: 'text-violet-400',
      badgeBg: 'bg-violet-500/10 border-violet-500/20 text-violet-300',
      border: 'border-white/5',
      glow: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] hover:border-violet-500/40',
      image: '/ai_systems.png',
      bullets: [
        'Design and build LLM-powered applications using RAG, tool-calling, and multi-agent workflows',
        'Deploy models using Vertex AI / Gemini APIs with real-time inference pipelines',
        'Optimize for latency, cost, and scalability in production environments'
      ],
      techStack: ['LangChain', 'Vertex AI', 'Gemini', 'TensorFlow', 'PyTorch']
    },
    {
      title: 'Full-Stack AI Development',
      icon: Code2,
      color: 'text-sky-400',
      badgeBg: 'bg-sky-500/10 border-sky-500/20 text-sky-300',
      border: 'border-white/5',
      glow: 'hover:shadow-[0_0_40px_rgba(56,189,248,0.2)] hover:border-sky-500/40',
      image: '/full_stack.png',
      bullets: [
        'Build end-to-end AI products with seamless frontend–backend integration',
        'Develop scalable APIs for ML services and real-time applications',
        'Focus on clean architecture, modular design, and performance'
      ],
      techStack: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'Firebase']
    },
    {
      title: 'Cloud & MLOps',
      icon: Layers,
      color: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
      border: 'border-white/5',
      glow: 'hover:shadow-[0_0_40px_rgba(52,211,153,0.2)] hover:border-emerald-500/40',
      image: '/cloud_mlops.png',
      bullets: [
        'Deploy and manage applications on GCP (Cloud Run, Firestore, Functions)',
        'Containerize services using Docker and design microservice architectures',
        'Handle CI/CD, monitoring, and production reliability'
      ],
      techStack: ['GCP', 'Docker', 'Firebase', 'Cloud Functions']
    },
    {
      title: 'Security & Reliability',
      icon: Shield,
      color: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
      border: 'border-white/5',
      glow: 'hover:shadow-[0_0_40px_rgba(251,191,36,0.2)] hover:border-amber-500/40',
      image: '/security.png',
      bullets: [
        'Implement secure architectures for AI systems and APIs',
        'Work with encryption, network analysis, and system-level debugging',
        'Design systems with resilience and fault tolerance in mind'
      ],
      techStack: ['Network Security', 'Cryptography', 'Wireshark', 'Auth']
    },
  ];

  return (
    <section id="skills" ref={ref as React.RefObject<HTMLElement>} className="relative py-32 bg-[#060010] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">Capabilities</span>
          </h2>
          <p className="text-white/45 mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            I design, build, and deploy production-grade AI systems — from model development to scalable cloud infrastructure.
          </p>
        </div>

        {/* Tech Logo Grid */}
        <div className={`mb-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            // Row 1: AI/ML
            { name: 'Python', icon: 'python', color: 'hover:text-[#3776AB] hover:border-[#3776AB]/30' },
            { name: 'PyTorch', icon: 'pytorch', color: 'hover:text-[#EE4C2C] hover:border-[#EE4C2C]/30' },
            { name: 'TensorFlow', icon: 'tensorflow', color: 'hover:text-[#FF6F00] hover:border-[#FF6F00]/30' },
            { name: 'Gemini', icon: 'googlegemini', color: 'hover:text-[#8E75B2] hover:border-[#8E75B2]/30' },
            { name: 'LangChain', icon: 'langchain', color: 'hover:text-[#121212] hover:bg-white/5 hover:border-white/30' },
            { name: 'Google ADK', icon: 'google', color: 'hover:text-[#4285F4] hover:border-[#4285F4]/30' },
            // Row 2: Cloud
            { name: 'Google Cloud', icon: 'googlecloud', color: 'hover:text-[#4285F4] hover:border-[#4285F4]/30' },
            { name: 'Azure', icon: 'microsoftazure', color: 'hover:text-[#0078D4] hover:border-[#0078D4]/30' },
            { name: 'AWS', icon: 'amazonaws', color: 'hover:text-[#FF9900] hover:border-[#FF9900]/30' },
            { name: 'Firebase', icon: 'firebase', color: 'hover:text-[#FFCA28] hover:border-[#FFCA28]/30' },
            { name: 'Docker', icon: 'docker', color: 'hover:text-[#2496ED] hover:border-[#2496ED]/30' },
            { name: 'Vercel', icon: 'vercel', color: 'hover:text-white hover:border-white/30' },
            // Row 3: Dev
            { name: 'TypeScript', icon: 'typescript', color: 'hover:text-[#3178C6] hover:border-[#3178C6]/30' },
            { name: 'Next.js', icon: 'nextdotjs', color: 'hover:text-white hover:border-white/30' },
            { name: 'React', icon: 'react', color: 'hover:text-[#61DAFB] hover:border-[#61DAFB]/30' },
            { name: 'FastAPI', icon: 'fastapi', color: 'hover:text-[#009688] hover:border-[#009688]/30' },
            { name: 'Node.js', icon: 'nodedotjs', color: 'hover:text-[#5FA04E] hover:border-[#5FA04E]/30' },
            { name: 'PostgreSQL', icon: 'postgresql', color: 'hover:text-[#4169E1] hover:border-[#4169E1]/30' }
          ].map((tech) => (
            <div key={tech.name} className={`flex flex-col items-center justify-center gap-3 p-4 glass rounded-2xl border border-white/5 transition-all duration-300 group hover:-translate-y-1 ${tech.color}`}>
              <img src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${tech.icon}.svg`} alt={tech.name} className="w-10 h-10 opacity-60 group-hover:opacity-100 transition-opacity filter invert group-hover:filter-none" />
              <span className="text-xs font-bold text-white/50 group-hover:text-current transition-colors tracking-wider uppercase">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* 4 Main Capability Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className={`relative overflow-hidden glass rounded-3xl p-8 border ${category.border} transition-all duration-700 group ${category.glow} flex flex-col justify-between ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${catIndex * 150 + 200}ms` }}
            >
              {/* Dynamic AI Background Image */}
              <div className="absolute inset-y-0 right-0 w-2/3 md:w-1/2 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-r-3xl z-0">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#060010]/80 to-[#060010] z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060010] via-transparent to-[#060010] z-10" />
                <img src={category.image} alt={category.title} className="absolute top-1/2 -translate-y-1/2 right-[-20%] w-[120%] h-auto object-cover mix-blend-screen scale-110 group-hover:scale-125 transition-transform duration-1000" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 glass rounded-2xl flex items-center justify-center border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-white/20 shadow-lg ${category.badgeBg.split(' ')[0]}`}>
                    <category.icon className={`w-7 h-7 ${category.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{category.title}</h3>
                </div>

                <ul className="space-y-4 mb-10 max-w-md">
                  {category.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.8)] ${category.color.replace('text-', 'bg-')}`} />
                      <span className="text-white/70 text-sm sm:text-base leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/10">
                <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest block mb-3">Core Stack</span>
                <div className="flex flex-wrap gap-2">
                  {category.techStack.map((tech, idx) => (
                    <span key={idx} className={`text-xs font-semibold px-3 py-1 rounded-full border bg-opacity-20 backdrop-blur-sm whitespace-nowrap ${category.badgeBg}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Game-Changer Overview Row (2x2 Grid) */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          
          {/* Production Experience */}
          <div className={`glass rounded-3xl p-8 border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-700 group relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '800ms' }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/20 transition-colors duration-700 pointer-events-none" />
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
              <Trophy className="w-6 h-6 text-cyan-400" /> Production Experience <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-cyan-500/10 text-cyan-300 rounded-lg ml-2 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]">Highly Unique</span>
            </h3>
            <p className="text-white/40 text-sm mb-6 relative z-10 tracking-wide uppercase">Where I've Applied These Skills:</p>
            <div className="space-y-6 relative z-10">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <h4 className="text-white font-semibold mb-2 flex items-center justify-between">
                  CareerLens <span className="text-cyan-400/80 text-xs font-mono">32 Microservices</span>
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">Built scalable AI-powered backend (40K+ LOC) processing real-time generation queues and embedding pipelines.</p>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <h4 className="text-white font-semibold mb-2 flex items-center justify-between">
                  AgriSence <span className="text-cyan-400/80 text-xs font-mono">GCP Deployed</span>
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">Deployed end-to-end ML architectures handling image segmentation models on scalable cloud functions.</p>
              </div>
            </div>
          </div>

          {/* Tools & Ecosystem */}
          <div className={`glass rounded-3xl p-8 border border-white/5 hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(52,211,153,0.15)] transition-all duration-700 group relative ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '900ms' }}>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
              <Cpu className="w-6 h-6 text-emerald-400" /> Complete Arsenal
            </h3>
            <div className="space-y-5 text-sm relative z-10">
              <div className="group/item">
                <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-2 group-hover/item:border-emerald-500/40 transition-colors">
                  <span className="text-white/40 uppercase tracking-widest text-[10px] font-bold">AI & Data</span>
                  <span className="text-white/90 font-medium">Vertex AI, Gemini, LangChain, PyTorch</span>
                </div>
              </div>
              <div className="group/item">
                <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-2 group-hover/item:border-emerald-500/40 transition-colors">
                  <span className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Frontend</span>
                  <span className="text-white/90 font-medium">Next.js 14, React, Tailwind CSS, Framer</span>
                </div>
              </div>
              <div className="group/item">
                <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-2 group-hover/item:border-emerald-500/40 transition-colors">
                  <span className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Backend</span>
                  <span className="text-white/90 font-medium">Node.js, TypeScript, FastAPI, Firebase</span>
                </div>
              </div>
              <div className="group/item">
                <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-2 group-hover/item:border-emerald-500/40 transition-colors">
                  <span className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Cloud & DevOps</span>
                  <span className="text-white/90 font-medium">GCP, Docker, GitHub Actions, Vercel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Engineering Approach */}
          <div className={`glass rounded-3xl p-8 border border-white/5 hover:border-violet-500/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all duration-700 group relative overflow-hidden md:col-span-2 lg:col-span-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1000ms' }}>
            <div className="absolute top-0 right-1/2 w-full h-32 bg-violet-500/10 rounded-full blur-[80px] -translate-y-1/2 group-hover:bg-violet-500/20 transition-colors duration-700 pointer-events-none" />
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
              <Layers className="w-6 h-6 text-violet-400" /> Engineering DNA
            </h3>
            
            {/* Cool Flow Diagram */}
            <div className="flex items-center justify-between text-xs font-mono text-violet-200/90 mb-8 bg-[#0a0515] p-4 rounded-2xl border border-violet-500/20 shadow-inner relative z-10">
              <div className="flex flex-col items-center gap-2"><div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30 text-lg">1</div><span>Design</span></div>
              <ArrowRight className="w-4 h-4 text-violet-500/60"/>
              <div className="flex flex-col items-center gap-2"><div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30 text-lg">2</div><span>Model</span></div>
              <ArrowRight className="w-4 h-4 text-violet-500/60"/>
              <div className="flex flex-col items-center gap-2"><div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30 text-lg">3</div><span>API</span></div>
              <ArrowRight className="w-4 h-4 text-violet-500/60"/>
              <div className="flex flex-col items-center gap-2"><div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30 text-lg">4</div><span>Ship</span></div>
            </div>

            <ul className="space-y-4 text-white/60 text-sm relative z-10">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                <span className="leading-relaxed">I don't just build ML models in Jupyter Notebooks. I build the infrastructure, the API, and the frontend to serve them to real users.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                <span className="leading-relaxed">Clean architecture, type-safety, and observability are non-negotiable defaults in my projects.</span>
              </li>
            </ul>
          </div>

          {/* What Sets Me Apart */}
          <div className={`glass rounded-3xl p-8 border border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-700 group relative md:col-span-2 lg:col-span-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1100ms' }}>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
              <Sparkles className="w-6 h-6 text-blue-400" /> Real-World Impact
            </h3>
            <ul className="space-y-6 text-white/70 text-sm relative z-10">
              <li className="flex items-start gap-4 group/list">
                <CheckCircle2 className="w-6 h-6 text-blue-500 mt-0 shrink-0 group-hover/list:scale-110 transition-transform" />
                <span className="leading-relaxed text-base"><strong className="text-white font-semibold">National-Level Winner:</strong> Secured ₹2.75L+ in hackathon victories, proving ability to ideate, build, and pitch under extreme 24-48 hour pressure.</span>
              </li>
              <li className="flex items-start gap-4 group/list">
                <CheckCircle2 className="w-6 h-6 text-blue-500 mt-0 shrink-0 group-hover/list:scale-110 transition-transform" />
                <span className="leading-relaxed text-base"><strong className="text-white font-semibold">The Rarest Intersection:</strong> Combining deep AI theory with hardened Full-Stack architectures and Security engineering layers.</span>
              </li>
              <li className="flex items-start gap-4 group/list">
                <CheckCircle2 className="w-6 h-6 text-blue-500 mt-0 shrink-0 group-hover/list:scale-110 transition-transform" />
                <span className="leading-relaxed text-base"><strong className="text-white font-semibold">Self-Driven Builder:</strong> Capable of taking a completely ambiguous concept and shipping a globally scalable 1.0 iteration independently.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
function ProjectsSection() {
  const { ref, isVisible } = useInView(0.08);

  const featuredProjects = [
    {
      title: 'VaidyaOS',
      emoji: '🩺',
      badge: 'Flagship AI Healthcare OS',
      description: 'Advanced AI healthcare platform for intelligent, real-time, multilingual medical assistance using on-device edge AI and offline capabilities via lightweight GGUF models.',
      thinking: 'Offline-first architecture with Edge AI inference & Llama.cpp',
      tech: ['React Native', 'Gemma', 'Llama.cpp', 'Firebase', '+4 more'],
      github: 'https://github.com/balaraj74/VaidyaOS',
      demo: 'https://roaring-valkyrie-042963.netlify.app/VaidyaOS.apk',
      color: 'from-emerald-600/20 to-teal-600/10',
      borderColor: 'border-emerald-500/30',
      accentColor: 'text-emerald-400',
      image: '/projects/vaidyaos_banner.png',
      metrics: [
        { label: 'Inference', value: 'On-device' },
        { label: 'Network', value: 'Offline-ready' }
      ]
    },
    {
      title: 'CareerLens',
      emoji: '🎯',
      badge: '🥇 Google Gen AI Exchange — National Winner',
      description:
        'Built an AI-powered career platform that analyzes resumes, identifies skill gaps, and generates personalized career paths. Designed as a microservices system and deployed for real-world usage.',
      thinking: 'Event-driven microservices architecture with parallel embedding queues',
      tech: ['Next.js 15', 'TypeScript', 'Gemini 1.5 Pro', 'Cloud Functions', '+4 more'],
      github: 'https://github.com/balaraj74/careerlens',
      demo: 'https://careerlens--careerlens-1.us-central1.hosted.app',
      color: 'from-cyan-500/15 to-blue-500/8',
      borderColor: 'border-cyan-500/25',
      accentColor: 'text-cyan-400',
      image: '/projects/career_lens_bg_1776501008387.png',
      metrics: [
        { label: 'Lines of Code', value: '40,000+' },
        { label: 'Microservices', value: '32' },
        { label: 'Commits', value: '320+' }
      ],
    },
    {
      title: 'AgriSence',
      emoji: '🌾',
      badge: '🥇 INFERENTIA 2.0 — Winner',
      description:
        'Developed a real-time AI farming system for crop disease detection and advisory. Integrated ML models with satellite data and multilingual support, deployed on GCP for scalable access.',
      thinking: 'Serverless ML inference pipeline with real-time edge sync',
      tech: ['Next.js 16', 'Gemini 2.0 Flash', 'Firebase', 'Genkit', '+3 more'],
      github: 'https://github.com/balaraj74/AgriSence',
      demo: 'https://agrisence--agrisence-1dc30.us-central1.hosted.app/',
      color: 'from-emerald-600/20 to-teal-600/10',
      borderColor: 'border-emerald-500/30',
      accentColor: 'text-emerald-400',
      image: '/projects/agrisence_bg_1776501022187.png',
      metrics: [
        { label: 'Languages', value: '7 Regional' },
        { label: 'AI Workflows', value: '15+ Flows' },
        { label: 'Cloud Tech', value: 'GCP Serverless' }
      ],
    }
  ];

  const projects = [
    {
      title: 'OmniSence',
      emoji: '🎬',
      badge: 'Gemini Live Agent Finalist',
      description:
        'Engineered a multimodal creative storytelling engine processing text to audio and video. Combined LLMs, Imagen, and Cloud TTS for real-time narrative generation.',
      thinking: 'Real-time streaming pipeline with async media generation',
      tech: ['FastAPI', 'React', 'Gemini 2.0', 'Cloud Run', '+3 more'],
      github: 'https://github.com/balaraj74/Omnisence',
      demo: 'https://omnisence-518586257861.us-central1.run.app/',
      color: 'from-sky-600/20 to-blue-600/10',
      borderColor: 'border-sky-500/30',
      accentColor: 'text-sky-400',
      image: '/projects/omnisence_bg_1776501035325.png',
      metrics: ['Streaming pipeline', 'Async image rendering']
    },
    {
      title: 'TaskForze',
      emoji: '🤖',
      badge: 'Google APAC Hackathon',
      description:
        'Created a multi-agent productivity system that coordinates 5 specialized AI sub-agents to manage workflows, with automated escalation via WhatsApp and AI voice calls for missed deadlines.',
      thinking: 'Multi-agent orchestration system with vector retrieval',
      tech: ['Google ADK', 'FastAPI', 'Cloud Run', 'AlloyDB', '+2 more'],
      github: '#',
      demo: 'https://taskforze-7k4ykvztvq-uc.a.run.app/',
      color: 'from-amber-600/20 to-orange-600/10',
      borderColor: 'border-amber-500/30',
      accentColor: 'text-amber-400',
      image: '/projects/taskforze_bg_1776501047462.png',
      metrics: ['5 specialized agents', 'WhatsApp escalation']
    },
    {
      title: 'HealthMesh v2.0',
      emoji: '🏥',
      badge: 'Microsoft Imagine Cup',
      description:
        'Built a HIPAA-ready clinical AI platform combining 6 specialized healthcare agents with a prescription bridge API to link clinical insights to hyperlocal medicine delivery.',
      thinking: 'FHIR R4 compliant microservices with secure data enclave',
      tech: ['Azure OpenAI', 'FHIR R4', 'FastAPI', 'Firebase', '+1 more'],
      github: '#',
      demo: 'https://healthmesh.azurewebsites.net',
      color: 'from-rose-600/20 to-pink-600/10',
      borderColor: 'border-rose-500/30',
      accentColor: 'text-rose-400',
      image: '/projects/healthmesh_bg_1776501063141.png',
      metrics: ['HIPAA-ready', '6 clinical AI agents']
    },
    {
      title: 'CyberShield AI',
      emoji: '🛡️',
      badge: 'AMD Slingshot Hackathon',
      description:
        'Developed and deployed multiple systems including a 5-layer SME cybersecurity suite (scoring 78/100) and an offline C-based mesh communication network for emergency triage.',
      thinking: 'Offline mesh topologies and multi-layered security protocols',
      tech: ['Python', 'C', 'Gemini', 'FastAPI', '+2 more'],
      github: '#',
      demo: 'https://cybershield-inky.vercel.app/',
      color: 'from-slate-600/20 to-gray-600/10',
      borderColor: 'border-slate-500/30',
      accentColor: 'text-slate-300',
      image: '/projects/cybershield_bg_1776501077227.png',
      metrics: ['5-layer security', 'C-based offline mesh']
    },
  ];

  return (
    <section id="projects" ref={ref as React.RefObject<HTMLElement>} className="relative py-32 bg-[#050d1a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-[30rem] h-[30rem] bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-label">Engineering Portfolio</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            I design and deploy complex <br/><span className="gradient-text-purple">AI systems at scale</span>
          </h2>
          <p className="text-white/50 mt-6 max-w-2xl mx-auto text-lg">
            Here's proof that I build real-world systems with impact, performance, and architecture in mind.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-8 mb-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative glass-strong rounded-3xl border ${project.borderColor} overflow-hidden hover:shadow-[0_0_60px_rgba(6,182,212,0.1)] transition-all duration-700 hover:-translate-y-1 flex flex-col lg:flex-row ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150 + 100}ms` }}
            >
              <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col z-20 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 w-max">
                  <span className="text-lg">{project.emoji}</span>
                  <span className={`text-xs font-bold tracking-wider ${project.accentColor} uppercase`}>{project.badge}</span>
                </div>
                
                <h3 className={`text-3xl lg:text-4xl font-extrabold text-white mb-4 group-hover:${project.accentColor} transition-colors`}>
                  {project.title}
                </h3>
                
                <div className="bg-[#050d1a]/50 border border-white/5 rounded-xl p-4 mb-6">
                  <p className="text-white/80 font-medium leading-relaxed">{project.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {project.metrics.map(m => (
                    <div key={m.label} className="flex flex-col border-l-2 border-white/10 pl-3">
                      <span className="text-xl font-bold text-white">{m.value}</span>
                      <span className="text-[10px] uppercase tracking-wider text-white/40">{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <p className="text-xs font-mono text-white/40 mb-4 flex items-center gap-2">
                    <Layers className={`w-4 h-4 ${project.accentColor}`} /> {project.thinking}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 text-xs bg-white/5 text-white/70 rounded-lg border border-white/10 font-medium whitespace-nowrap">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex justify-center items-center gap-2 py-3 px-6 glass rounded-xl text-white/80 hover:text-white transition-all text-sm font-semibold hover:bg-white/10 border border-white/10">
                        <Github className="w-5 h-5" /> View Architecture
                      </a>
                    )}
                    {project.demo !== '#' && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        className={`flex-1 flex justify-center items-center gap-2 py-3 px-6 rounded-xl text-white transition-all text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/10 ${project.accentColor}`}>
                        <ExternalLink className="w-5 h-5" /> Live System
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Side */}
              <div className="hidden lg:block lg:w-2/5 relative overflow-hidden bg-[#030812]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0515]/80 via-transparent to-transparent z-10" />
                <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover object-left opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000" />
              </div>
            </div>
          ))}
        </div>

        {/* Regular Grid Projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative glass-strong rounded-2xl border ${project.borderColor} overflow-hidden hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-500 hover:-translate-y-1 flex flex-col ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100 + 400}ms` }}
            >
              <div className="h-40 relative overflow-hidden bg-[#030812]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0515] to-transparent z-10" />
                <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                  <span className="text-sm">{project.emoji}</span>
                  <span className={`text-[10px] font-bold tracking-wider text-white uppercase`}>{project.badge}</span>
                </div>
              </div>

              <div className="relative p-6 space-y-4 flex-1 flex flex-col z-10 bg-[#0a0515]/90">
                <h3 className={`text-xl font-bold text-white group-hover:${project.accentColor} transition-colors`}>
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed flex-1">{project.description}</p>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  {project.metrics.map(m => (
                    <div key={m} className="flex items-center gap-1.5 text-white/50 text-xs">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${project.accentColor} flex-shrink-0`} />
                      <span className="truncate font-medium">{m}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-white/5 space-y-4">
                  <p className="text-[11px] font-mono text-white/40 flex items-center gap-2 truncate">
                    <Cpu className={`w-3.5 h-3.5 ${project.accentColor}`} /> {project.thinking}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 text-[10px] font-medium tracking-wide bg-white/5 text-white/60 rounded-md border border-white/5 whitespace-nowrap">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex justify-center items-center gap-1.5 py-2 px-3 glass rounded-lg text-white/60 hover:text-white transition-all text-xs font-medium border border-white/10">
                        <Github className="w-4 h-4" /> View Arch
                      </a>
                    )}
                    {project.demo !== '#' && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        className={`flex-1 flex justify-center items-center gap-1.5 py-2 px-3 rounded-lg text-white transition-all text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/10`}>
                        <ExternalLink className={`w-4 h-4 ${project.accentColor}`} /> Case Study
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What These Projects Demonstrate */}
        <div className={`mt-20 glass-strong border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '800ms' }}>
           <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
           <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
           
           <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 relative z-10 flex items-center gap-3">
             <Layers className="w-8 h-8 text-purple-400" /> What these projects demonstrate
           </h3>
           
           <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                 <Terminal className="w-5 h-5 text-cyan-400" />
               </div>
               <div>
                 <h4 className="text-white font-semibold mb-1">Production AI Systems</h4>
                 <p className="text-white/50 text-sm leading-relaxed">Ability to go beyond prototypes to build, deploy, and scale real-world generative AI and multimodal ML pipelines.</p>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                 <Server className="w-5 h-5 text-purple-400" />
               </div>
               <div>
                 <h4 className="text-white font-semibold mb-1">Scalable Cloud Infrastructures</h4>
                 <p className="text-white/50 text-sm leading-relaxed">Designing complex microservices and backend architectures using GCP, Azure, serverless deployments, and vector databases.</p>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                 <Code2 className="w-5 h-5 text-emerald-400" />
               </div>
               <div>
                 <h4 className="text-white font-semibold mb-1">Full-Stack Autonomy</h4>
                 <p className="text-white/50 text-sm leading-relaxed">Working across the entire stack—from frontend UI/UX in Next.js to backend APIs in FastAPI, all the way to secure database schemas.</p>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                 <Globe className="w-5 h-5 text-amber-400" />
               </div>
               <div>
                 <h4 className="text-white font-semibold mb-1">Practical Real-World Impact</h4>
                 <p className="text-white/50 text-sm leading-relaxed">Solving actual problems like clinical orchestration, offline mesh emergency networks, and crop disease mapping through system design.</p>
               </div>
             </div>
           </div>
        </div>

      </div>
    </section>
  );
}

// ─── System Architecture & Experience Section ──────────────────────────────────
function ExperienceSection() {
  const { ref, isVisible } = useInView(0.15);

  const timeline = [
    {
      category: 'Flagship Project',
      type: 'Architecture & AI',
      icon: Activity,
      title: 'VaidyaOS Engineering & Deployment',
      org: 'Independent AI Healthcare Initiative',
      period: 'MAY 2026 – Present',
      color: 'border-[#10b981]/50 bg-[#10b981]/10 text-[#10b981]',
      blobColor: 'bg-[#10b981]',
      points: [
        'Architected and engineered a comprehensive, privacy-first healthcare AI platform running directly on-device using quantized GGUF models.',
        'Developed full offline medical intelligence capabilities alongside cloud-synced fallback APIs, ensuring zero-latency, highly available clinical insights.'
      ],
      impact: [
        'ON-DEVICE AI',
        'OFFLINE-FIRST',
        'Llama.cpp'
      ]
    },
    {
      category: 'Hackathon',
      type: 'Competition',
      icon: Flame,
      title: 'Meta PyTorch OpenEnv Grand Finale',
      org: 'Meta',
      period: 'APR 2026',
      color: 'border-[#ef4444]/50 bg-[#ef4444]/10 text-[#ef4444]',
      blobColor: 'bg-[#ef4444]',
      points: [
        'Cleared Round 1 from 52,000+ registered developers.',
        'Selected for the Grand Finale in Bangalore — one of the most competitive ML hackathons globally.'
      ],
      impact: [
        'ARCHITECTURE',
        'ML SYSTEMS'
      ]
    },
    {
      category: 'Scale',
      type: 'System Architecture',
      icon: Server,
      title: 'Event-Driven Microservices Engine',
      org: 'CareerLens & HealthMesh Core',
      period: '2024 – 2025',
      color: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400',
      blobColor: 'bg-cyan-600',
      points: [
        'Designed and scaled an event-driven microservices architecture powering production AI platforms.',
        'Built parallel processing pipelines for vector embeddings and background workers, enabling reliable, low-latency operations across 32 independent services.'
      ],
      impact: [
        'Scaled to 32 microservices',
        'Reduced processing latency',
        'Enabled real-time AI workflows'
      ]
    },
    {
      category: 'Architecture',
      type: 'R&D',
      icon: Cpu,
      title: 'Multi-Agent Supervisor Framework',
      org: 'TaskForze System',
      period: 'Q4 2024',
      color: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
      blobColor: 'bg-amber-600',
      points: [
        'Built a multi-agent orchestration framework with stateless supervisor nodes to coordinate task execution across specialized agents.',
        'Implemented failover mechanisms and real-time escalation workflows using external APIs, ensuring reliability under SLA constraints.'
      ],
      impact: [
        '5 specialized agents coordinated',
        'Zero-downtime failover triggers',
        'Automated WhatsApp/Call escalation'
      ]
    },
    {
      category: 'Systems',
      type: 'Open Source',
      icon: GitBranch,
      title: 'Core Library Contributor',
      org: 'Ubuntu, Pandas & NumPy',
      period: 'Jan 2024 – Present',
      color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
      blobColor: 'bg-emerald-600',
      points: [
        'Contributed to performance optimizations and bug fixes across Python data ecosystem libraries (Ubuntu, Pandas, NumPy).',
        'Resolved complex issues and improved system efficiency, earning multiple GitHub Pull Shark badges (22+ PRs merged).'
      ],
      impact: [
        '22+ PRs successfully merged',
        'Performance bottlenecks resolved',
        'Strengthened major OSS pipelines'
      ]
    },
    {
      category: 'Foundation',
      type: 'Education',
      icon: Globe,
      title: 'B.Tech CSE (AI & ML)',
      org: 'PES University, Bengaluru',
      period: 'Aug 2024 – 2028',
      color: 'border-violet-500/50 bg-violet-500/10 text-violet-400',
      blobColor: 'bg-violet-600',
      points: [
        'Focused on systems-level thinking including operating systems, networking, and low-level architecture (RISC-V, TCP/IP).',
        'Actively engaged in developer communities (GDG, NVIDIA Cloud) and technical speaking.'
      ],
      impact: [
        'Deep architectural fundamentals',
        'Systematic problem solving',
        'Community technical leadership'
      ]
    },
  ];

  return (
    <section id="experience" ref={ref as React.RefObject<HTMLElement>} className="relative py-32 bg-[#060010] overflow-hidden gradient-mesh">
      {/* Vertical line connecting timeline */}
      <div className="absolute left-1/2 top-40 bottom-32 w-px bg-white/5 hidden lg:block overflow-hidden">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent animate-beam-down shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Engineering <span className="gradient-text-purple">Journey</span>
          </h2>
          <p className="text-[#a1a1aa] font-medium text-sm sm:text-base mt-6 max-w-2xl mx-auto leading-relaxed px-4">
            From foundational systems to production-scale AI architectures — a progression of building, scaling, and refining real-world systems.
          </p>
        </div>

        <div className="space-y-16">
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`relative flex flex-col lg:flex-row gap-8 items-start transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } ${index % 2 === 0 ? 'lg:flex-row-reverse text-left lg:text-right' : 'text-left'}`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              {/* Center Dot (Desktop only) */}
              <div className="hidden lg:block absolute left-1/2 top-8 -mt-1 -ml-3 w-6 h-6 rounded-full bg-[#060010] border-4 border-cyan-500/30 z-10 transition-transform duration-300 hover:scale-125">
                <div className={`w-full h-full rounded-full bg-cyan-400 animate-pulse`} />
              </div>

              {/* Box Content - Halved */}
              <div className="w-full lg:w-1/2 flex flex-col group">
                <div className={`glass-strong rounded-3xl p-8 border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative overflow-hidden ${index % 2 === 0 ? 'lg:mr-10' : 'lg:ml-10'}`}>
                  <div className={`absolute top-0 w-32 h-32 blur-3xl opacity-20 pointer-events-none rounded-full transition-opacity duration-500 group-hover:opacity-40 ${index % 2 === 0 ? 'right-0' : 'left-0'} ${item.blobColor}`} />
                  
                  <div className={`flex flex-wrap items-center gap-3 mb-6 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#111] text-white/90 border border-white/10 shadow-inner`}>
                      {item.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${item.color} border`}>
                      {item.type}
                    </span>
                  </div>

                  <div className={`flex items-center gap-2 text-white/40 text-xs font-mono tracking-wider mb-4 uppercase ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 font-medium mb-6">{item.org}</p>
                  
                  <ul className="space-y-4 mb-8">
                    {item.points.map((point, pi) => (
                      <li key={pi} className={`flex items-start gap-4 text-[#a1a1aa] text-sm leading-relaxed ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                        <Zap className={`w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5 ${index % 2 === 0 ? 'rotate-180' : ''}`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Impact Highlights */}
                  <div className={`pt-6 border-t border-white/10 flex flex-col ${index % 2 === 0 ? 'lg:items-end text-right' : 'items-start text-left'}`}>
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Impact</span>
                    <ul className="space-y-2.5">
                       {item.impact.map((imp, ii) => (
                         <li key={ii} className={`flex items-center gap-2.5 text-white/80 font-medium text-sm ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                           <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                           {imp}
                         </li>
                       ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The Killer Summary Section */}
        <div className={`mt-32 max-w-3xl mx-auto text-center glass-strong rounded-3xl p-10 border border-violet-500/20 hover:border-violet-500/40 shadow-[0_0_40px_rgba(139,92,246,0.05)] hover:shadow-[0_0_60px_rgba(139,92,246,0.15)] transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-4">What This Journey Reflects</h3>
          <p className="text-[#a1a1aa] leading-relaxed text-sm sm:text-base">
            This timeline reflects my progression from learning foundational systems to designing and deploying scalable AI architectures. I consistently focus on building production-ready systems that integrate AI, robust cloud infrastructure, and real-world constraints to solve complex engineering challenges.
          </p>
        </div>

      </div>
    </section>
  );
}


function HackathonStatCounter({ stat, isVisible, delayMs }: { stat: any; isVisible: boolean; delayMs: number }) {
  const count = useCountUp(stat.value, isVisible);
  
  let formattedCount = count.toString();
  if (stat.type === 'currency' && count > 0) {
    if (count >= 100000) {
      formattedCount = (count / 100000).toFixed(2) + 'L';
    } else {
      formattedCount = count.toLocaleString('en-IN');
    }
  } else if (stat.type === 'shortK' && count > 0) {
    if (count >= 1000) {
      formattedCount = Math.floor(count / 1000) + 'K';
    } else {
      formattedCount = count.toString();
    }
  }

  return (
    <div 
      className={`glass-strong rounded-3xl p-8 border border-white/10 text-center hover:border-cyan-500/30 relative overflow-hidden group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 ${stat.bgFilter} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
      <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-700 group-hover:drop-shadow-[0_0_12px_currentColor]`} />
      <div className={`text-4xl md:text-5xl font-black ${stat.color} mb-2 drop-shadow-lg tracking-tight`}>
        {stat.prefix || ''}{formattedCount}{stat.suffix || ''}
      </div>
      <div className="text-white/50 text-sm font-medium tracking-wide uppercase group-hover:text-white/80 transition-colors">{stat.label}</div>
    </div>
  );
}

// ─── Impact & Certifications Section ──────────────────────────────────────────
function AchievementsSection() {
  const { ref, isVisible } = useInView(0.15);

  const hackathonStats = [
    { label: '2 National Wins · 8+ Competitions', value: 10, suffix: '+', icon: Trophy, color: 'text-blue-400', bgFilter: 'bg-blue-500' },
    { label: 'Prize Money Won', value: 275000, prefix: '₹', suffix: '+', type: 'currency', icon: Sparkles, color: 'text-emerald-400', bgFilter: 'bg-emerald-500' },
    { label: '2× NATIONAL WINNER', value: 2, icon: Award, color: 'text-purple-400', bgFilter: 'bg-purple-500' },
    { label: 'META PYTORCH HACKATHON | GRAND FINALE', value: 52000, type: 'shortK', suffix: '+', icon: Flame, color: 'text-[#ef4444]', bgFilter: 'bg-[#ef4444]' },
    { label: 'Certifications (AI, Cloud, Security)', value: 35, suffix: '+', icon: CheckCircle2, color: 'text-cyan-400', bgFilter: 'bg-cyan-500' },
  ];

  return (
    <section id="achievements" ref={ref as React.RefObject<HTMLElement>} className="relative py-32 bg-[#0a0515] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-label">Impact Metrics</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Achievements & <span className="gradient-text-purple">Impact</span>
          </h2>
          <p className="text-[#a1a1aa] font-medium text-sm sm:text-base mt-6 max-w-2xl mx-auto leading-relaxed px-4">
            Recognized through national competitions, real-world deployments, and continuous technical mastery.
          </p>
        </div>

        {/* Impact Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 lg:grid-cols-5 gap-6 mb-12">
          {hackathonStats.map((stat, idx) => (
            <HackathonStatCounter key={stat.label} stat={stat} isVisible={isVisible} delayMs={idx * 150 + 200} />
          ))}
        </div>

        {/* Killer Summary Line */}
        <div className={`mb-24 max-w-3xl mx-auto text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
           <p className="text-white/60 font-medium text-lg leading-relaxed">
             Focused on building and validating real-world AI systems through competitions, production deployments, and continuous learning.
           </p>
        </div>

        {/* Tier 1: Major Awards */}
        <div className={`grid md:grid-cols-2 gap-8 mb-24 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="rounded-3xl p-8 border border-blue-500/30 hover:border-blue-400 flex flex-col items-start text-left group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] bg-[#0a0515]">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
               <div 
                 className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                 style={{ 
                   backgroundImage: 'url(/images/ai-exchange.png)', 
                   backgroundPosition: 'center', 
                   backgroundSize: 'cover' 
                 }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0515] via-[#0a0515]/80 to-transparent" />
               <div className="absolute inset-0 bg-gradient-to-r from-[#0a0515] via-[#0a0515]/60 to-[#0a0515]/20" />
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500 z-0" />

            <div className="w-14 h-14 rounded-2xl bg-[#0a0515]/80 backdrop-blur-md border border-blue-500/30 flex items-center justify-center mb-6 z-10 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
               <Trophy className="w-7 h-7 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            </div>
            
            <div className="relative z-10 flex flex-col items-start mt-auto">
               <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Google Gen AI Exchange</h3>
               <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full border border-blue-400/30 bg-[#0a0515]/80 backdrop-blur-md inline-block shadow-lg">NATIONAL WINNER</p>
               <p className="text-white/80 leading-relaxed font-medium">
                 Built an AI-driven clinical orchestration system. Selected among top teams nationwide for innovation, robust technical architecture, and real-world applicability.
               </p>
            </div>
          </div>

          <div className="rounded-3xl p-8 border border-cyan-500/30 hover:border-cyan-400 flex flex-col items-start text-left group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(6,182,212,0.15)] bg-[#0a0515]">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
               <div 
                 className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                 style={{ 
                   backgroundImage: 'url(/images/inferential.png)', 
                   backgroundPosition: 'center', 
                   backgroundSize: 'cover' 
                 }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0515] via-[#0a0515]/80 to-transparent" />
               <div className="absolute inset-0 bg-gradient-to-r from-[#0a0515] via-[#0a0515]/60 to-[#0a0515]/20" />
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-500 z-0" />

            <div className="w-14 h-14 rounded-2xl bg-[#0a0515]/80 backdrop-blur-md border border-cyan-500/30 flex items-center justify-center mb-6 z-10 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
               <Award className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            </div>
            
            <div className="relative z-10 flex flex-col items-start mt-auto">
               <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Inferential 2.0</h3>
               <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-[#0a0515]/80 backdrop-blur-md inline-block shadow-lg">🥇 1st Place</p>
               <p className="text-white/80 leading-relaxed font-medium">
                 Developed a high-performance system under intense time pressure. Praised for clean system design, scalability, and seamless integration capabilities.
               </p>
            </div>
          </div>
        </div>

        {/* Tier 2: Certifications */}
        <div className={`text-center mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-bold text-white mb-4">Certifications & Training</h3>
          <p className="text-white/50 max-w-xl mx-auto">
            Certifications from leading technology platforms including Google, NVIDIA, and cloud providers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 relative z-20 mb-20">
          <div className={`glass rounded-2xl p-8 border border-white/5 hover:border-emerald-500/30 hover:bg-white/5 transition-all duration-500 hover:-translate-y-1 flex flex-col items-center text-center group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '600ms' }}>
             <div className="w-12 h-12 rounded-2xl bg-[#0a0515] border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
               <Cpu className="w-6 h-6 text-emerald-400" />
             </div>
             <h3 className="text-white font-bold text-base mb-3">AI Systems & MLOps</h3>
             <p className="text-white/50 text-sm leading-relaxed mb-6">Gen AI Academy 2.0 (Google APAC), Gemini Certified Educator, Agentic AI Day</p>
             <div className="mt-auto px-4 py-1.5 rounded-full border-emerald-400/20 border bg-[#0a0515] text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
               Google & GDG
             </div>
          </div>

          <div className={`glass rounded-2xl p-8 border border-white/5 hover:border-cyan-500/30 hover:bg-white/5 transition-all duration-500 hover:-translate-y-1 flex flex-col items-center text-center group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '700ms' }}>
             <div className="w-12 h-12 rounded-2xl bg-[#0a0515] border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
               <Cloud className="w-6 h-6 text-cyan-400" />
             </div>
             <h3 className="text-white font-bold text-base mb-3">Cloud & Data Architecture</h3>
             <p className="text-white/50 text-sm leading-relaxed mb-6">Document AI & Sensitive Data, Advanced Cloud Storage Implementations</p>
             <div className="mt-auto px-4 py-1.5 rounded-full border-cyan-400/20 border bg-[#0a0515] text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
               Google Cloud
             </div>
          </div>

          <div className={`glass rounded-2xl p-8 border border-white/5 hover:border-green-500/30 hover:bg-white/5 transition-all duration-500 hover:-translate-y-1 flex flex-col items-center text-center group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '800ms' }}>
             <div className="w-12 h-12 rounded-2xl bg-[#0a0515] border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
               <Shield className="w-6 h-6 text-green-400" />
             </div>
             <h3 className="text-white font-bold text-base mb-3">GPU-Accelerated AI & Ethics</h3>
             <p className="text-white/50 text-sm leading-relaxed mb-6">NVIDIA Cloud & Community, GitHub Responsible AI & Copilot</p>
             <div className="mt-auto px-4 py-1.5 rounded-full border-green-400/20 border bg-[#0a0515] text-green-400 text-[10px] font-bold uppercase tracking-widest">
               NVIDIA & GitHub
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const { ref, isVisible } = useInView(0.15);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" ref={ref as React.RefObject<HTMLElement>} className="relative py-28 bg-[#0a0515] overflow-hidden">
      {/* Premium AI Background Overlay */}
      <div className="absolute inset-0 z-0">
         <div 
           className="absolute inset-0 opacity-[0.15] mix-blend-screen"
           style={{ 
             backgroundImage: 'url(/images/premium_bg.png)', 
             backgroundPosition: 'center', 
             backgroundSize: 'cover' 
           }}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0515] via-[#0a0515]/80 to-transparent" />
         <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-transparent to-transparent pointer-events-none" />
      </div>
      
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <p className="section-label mb-0">Get in Touch</p>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Open to Collaborations</span>
                </div>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                Let's Build<br />
                <span className="gradient-text-cyan">Scalable AI Systems</span>
              </h2>
            </div>

            <p className="text-[#a1a1aa] text-lg leading-relaxed">
              I’m open to AI/ML internships, high-impact projects, and collaborations focused on real-world systems. Currently building production-grade AI platforms — happy to connect if you're working on something meaningful.
              <br /><br />
              <span className="text-white/40 text-sm">Based in Bengaluru, open to remote opportunities.</span>
            </p>

            <div className="inline-flex items-center gap-3 px-4 py-2 mt-4 rounded-2xl glass border border-[#FFA116]/30 bg-[#FFA116]/5 mb-6 group cursor-default shadow-[0_0_20px_rgba(255,161,22,0.1)]">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/leetcode.svg" alt="LeetCode" className="w-5 h-5 filter invert opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div>
                <div className="text-[#FFA116] font-bold text-sm leading-tight">LeetCode 200+</div>
                <div className="text-white/40 text-[10px] uppercase tracking-wider">Problems Solved</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Mail, label: 'Email', value: 'balarajr483@gmail.com', href: 'mailto:balarajr483@gmail.com', subtext: 'Within 24 hrs' },
                { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/balaraj-r-209a67330', href: 'https://www.linkedin.com/in/balaraj-r-209a67330/', subtext: 'Experience' },
                { icon: Github, label: 'GitHub', value: 'github.com/balaraj74', href: 'https://github.com/balaraj74', subtext: 'Code & PRs' },
                { icon: Twitter, label: 'X (Twitter)', value: 'x.com/Balaraj__r', href: 'https://x.com/Balaraj__r', subtext: 'Tech Updates' },
                { icon: Database, label: 'Kaggle', value: 'kaggle.com/balarajr', href: 'https://www.kaggle.com/balarajr', subtext: 'Data Science' },
                { icon: Brain, label: 'Hugging Face', value: 'huggingface.co/balarajr', href: 'https://huggingface.co/balarajr', subtext: 'AI Models' },
                { icon: Code2, label: 'Google Dev', value: 'g.dev/balarajr', href: 'https://g.dev/balarajr', subtext: 'Dev Profile' },
                { icon: Award, label: 'Google Skills', value: 'skills.google', href: 'https://www.skills.google/public_profiles/7e29917e-8bd6-41e6-8149-0795ae63c97b', subtext: 'Certifications' },
                { icon: Instagram, label: 'Instagram', value: 'instagram.com/balaraj.__r', href: 'https://www.instagram.com/balaraj.__r/', subtext: 'Personal' },
              ].map((contact) => (
                <a key={contact.label} href={contact.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group p-2 rounded-2xl hover:bg-white/5 transition-all duration-300">
                  <div className="w-12 h-12 glass shadow-lg rounded-xl flex items-center justify-center border border-white/5 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all duration-300 group-hover:scale-110">
                    <contact.icon className="w-5 h-5 text-white/50 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div>
                    <div className="text-white font-medium group-hover:text-cyan-400 transition-colors">{contact.label}</div>
                    <div className="text-white/40 text-sm">{contact.subtext}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Resume Button */}
            <div className="pt-4">
              <a href="https://drive.google.com/file/d/1eHgU1BzPQ1m0DxUQqf0EbmLVZ-jRKAYk/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 rounded-xl text-white font-medium transition-all duration-300 group shadow-lg">
                <FileText className="w-5 h-5 text-cyan-400 group-hover:-translate-y-1 transition-transform" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
            <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-8 border border-white/10 hover:border-cyan-500/30 transition-colors duration-500 space-y-6 shadow-[0_0_40px_rgba(6,182,212,0.05)]">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message sent successfully</h3>
                  <p className="text-[#a1a1aa]">I’ll get back to you soon.</p>
                  <button
                    type="button"
                    className="mt-8 px-6 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another message
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 bg-[#0a0515]/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/50 transition-all hover:bg-[#0a0515]/80"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 bg-[#0a0515]/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/50 transition-all hover:bg-[#0a0515]/80"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3.5 bg-[#0a0515]/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none hover:bg-[#0a0515]/80"
                      placeholder="Briefly describe your project, opportunity, or idea..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative flex items-center justify-center gap-2 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] overflow-hidden"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        <span>Start a Conversation</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </form>

            <p className="mt-8 text-center text-white/40 text-sm">
               Prefer direct contact? Reach me via <a href="mailto:balarajr483@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">email</a> or <a href="https://www.linkedin.com/in/balaraj-r-209a67330/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">LinkedIn</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative py-12 bg-[#050d1a] border-t border-violet-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-xl font-black tracking-tight mb-1">
              <span className="text-white">B</span>
              <span className="text-violet-400">R</span>
              <span className="text-white/30 text-sm font-normal ml-1">· Portfolio</span>
            </div>
            <p className="text-white/35 text-sm">© 2026 Balaraj R. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-2 text-white/30 text-sm">
            <span>Built with</span>
            <span className="text-violet-400">React</span>
            <span>·</span>
            <span className="text-violet-400">TypeScript</span>
            <span>·</span>
            <span className="text-violet-400">Vite</span>
          </div>

          <div className="flex gap-3">
            {[
              { icon: Github, href: 'https://github.com/balaraj74' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/balaraj-r-209a67330/' },
              { icon: Twitter, href: 'https://x.com/Balaraj__r' },
              { icon: Instagram, href: 'https://www.instagram.com/balaraj.__r/' },
              { icon: Mail, href: 'mailto:balarajr483@gmail.com' },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 hover:text-violet-400 transition-colors"
              >
                <s.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}



export default function HomePage() {
  const pathname = usePathname();
  const location = { pathname, hash: typeof window !== 'undefined' ? window.location.hash : '' };
  
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location]);
  
  return (
    <div className="min-h-screen bg-[#050d1a] text-white">
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
  );
}
