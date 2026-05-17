import { motion } from 'framer-motion';
import {
  Brain,
  WifiOff,
  Globe2,
  Cpu,
  Mic,
  Activity,
  Zap,
  ShieldCheck,
  Smartphone,
  CloudCog,
  ArrowRight,
  Github,
  Download,
  Stethoscope
} from 'lucide-react';

const VaidyaOS = () => {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full bg-[#030712] relative overflow-hidden font-sans border-y border-white/5 py-24 sm:py-32 my-32">
      
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* === HERO SECTION === */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto mb-32"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Flagship Engineering Project</span>
          </motion.div>
          
          <motion.h2 variants={fadeUp} className="text-6xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-cyan-500 mb-6 tracking-tight drop-shadow-lg">
            VaidyaOS
          </motion.h2>
          
          <motion.p variants={fadeUp} className="text-2xl sm:text-3xl font-medium text-cyan-200/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            "AI-powered healthcare intelligence that works online, offline, and on-device."
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mt-12">
            <a href="https://roaring-valkyrie-042963.netlify.app/VaidyaOS.apk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              <Download className="w-5 h-5" />
              Download APK
            </a>
            <a href="https://github.com/balaraj74/VaidyaOS" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-2xl transition-all hover:scale-105 active:scale-95">
              <Github className="w-5 h-5" />
              View Source
            </a>
            <a href="https://huggingface.co/balarajr/vaidyaos-gemma4-clinical-india-4b-GGUF" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-2xl transition-all hover:scale-105 active:scale-95">
              <Brain className="w-5 h-5" />
              Hugging Face Model
            </a>
          </motion.div>
        </motion.div>

        {/* === CORE FEATURES GRID === */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-32"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-12">
            <h3 className="text-3xl font-bold text-white">Core Intelligence</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "AI Medical Assistant", desc: "Real-time intelligent healthcare conversations powered by lightweight LLMs." },
              { icon: WifiOff, title: "Offline AI Support", desc: "Core medical intelligence works completely without internet connectivity." },
              { icon: Globe2, title: "Multilingual", desc: "Supports regional languages with seamless voice-enabled interaction." },
              { icon: Cpu, title: "Edge Inference", desc: "Runs optimized quantized models directly on-device for speed & privacy." },
              { icon: Mic, title: "Voice Interaction", desc: "Advanced speech-to-text and AI voice response system." },
              { icon: Activity, title: "Medical Engine", desc: "AI-assisted symptom analysis and preliminary healthcare guidance." },
              { icon: Zap, title: "Lightweight Deploy", desc: "Optimized for mobile devices using heavily quantized GGUF models." },
              { icon: ShieldCheck, title: "Privacy-Focused", desc: "Sensitive healthcare interactions processed strictly locally." }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeUp} className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-cyan-500/[0.02] hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <feature.icon className="w-8 h-8 text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* === ARCHITECTURE VISUALIZATION === */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-32 relative"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">System Architecture</h3>
            <p className="text-white/50 max-w-2xl mx-auto">A robust, privacy-first pipeline designed to process complex medical intelligence dynamically between edge devices and the cloud.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="relative p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.05] overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 relative z-10">
              
              {/* User/Mobile */}
              <div className="flex flex-col items-center gap-4 w-full lg:w-1/4">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)] relative">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-white mb-1">React Native App</div>
                  <div className="text-xs text-white/40">Voice & UI Layer</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden lg:flex w-16 items-center justify-center text-cyan-500/50">
                <ArrowRight className="w-8 h-8" />
              </div>

              {/* Edge/Local AI */}
              <div className="flex flex-col items-center gap-4 w-full lg:w-1/4">
                <div className="w-24 h-24 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.15)] relative">
                  <Cpu className="w-10 h-10 text-cyan-400" />
                  <div className="absolute -inset-2 border border-cyan-500/20 rounded-[1.25rem] animate-[spin_4s_linear_infinite]" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-cyan-100 mb-1">Edge Inference</div>
                  <div className="text-xs text-cyan-400/60">GGUF / Llama.cpp (Offline)</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden lg:flex w-16 items-center justify-center text-indigo-400/50">
                <ArrowRight className="w-8 h-8" />
              </div>

              {/* Cloud Layer */}
              <div className="flex flex-col items-center gap-4 w-full lg:w-1/4">
                <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.1)] relative">
                  <CloudCog className="w-8 h-8 text-indigo-400" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-indigo-100 mb-1">Cloud Sync & APIs</div>
                  <div className="text-xs text-indigo-400/60">Gemini / Firebase</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden lg:flex w-16 items-center justify-center text-purple-400/50">
                <ArrowRight className="w-8 h-8" />
              </div>

              {/* Healthcare Engine */}
              <div className="flex flex-col items-center gap-4 w-full lg:w-1/4">
                <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.1)] relative">
                  <Stethoscope className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-100 mb-1">Medical Intelligence</div>
                  <div className="text-xs text-purple-400/60">AI Agents & Vectors</div>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>

        {/* === TECH STACK & INNOVATION === */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeUp} className="text-2xl font-bold text-white mb-8">Advanced Tech Stack</motion.h3>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {[
                "React Native", "Firebase", "Gemini API", "Gemma", 
                "Llama.cpp", "GGUF Models", "Ollama", "Vector Search", 
                "Speech Recognition", "AI Agents"
              ].map((tech, i) => (
                <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeUp} className="text-2xl font-bold text-white mb-8">Future Roadmap</motion.h3>
            <div className="space-y-4">
              {[
                { label: "Wearable Integration", active: true },
                { label: "Federated Healthcare AI", active: true },
                { label: "Emergency Response Intelligence", active: false },
                { label: "Telemedicine AI Sync", active: false },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'bg-white/20'}`} />
                  <span className={item.active ? 'text-white' : 'text-white/40'}>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default VaidyaOS;
