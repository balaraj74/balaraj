"use client";
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView as useFramerInView } from 'framer-motion';
import { Github, ExternalLink, Layers, Terminal, Server, Globe, Code2, CheckCircle2, Cpu } from 'lucide-react';
import { AuroraBackground, fadeInUp, fadeInLeft, fadeInRight, scaleIn } from './shared';
import { FEATURED_PROJECTS, OTHER_PROJECTS, Project } from '../constants/projects';

const projectRoutes: Record<string, string> = {
  VaidyaOS: '/projects/vaidyos',
  CareerLens: '/projects/career-lens',
  AgriSence: '/projects/agrisence',
};

function FeaturedProjectCard({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) {
  const isEven = index % 2 === 0;
  const metrics = project.metrics as { label: string; value: string }[];
  const projectRoute = projectRoutes[project.title];
  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={isEven ? fadeInLeft : fadeInRight}
      transition={{ delay: index * 0.15 + 0.1 }}
      whileHover={{ y: -4 }}
      className={`group relative glass-card rounded-3xl border ${project.borderColor} overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(6,182,212,0.08)] flex flex-col lg:flex-row card-shine`}
    >
      <div className={`absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r ${project.gradientFrom} to-transparent group-hover:w-full transition-all duration-700`} />

      <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col z-20 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 w-max">
          <span className="text-lg">{project.emoji}</span>
          <span className={`text-xs font-bold tracking-wider ${project.accentColor} uppercase`}>{project.badge}</span>
        </div>

        <h3 className={`text-3xl lg:text-4xl font-extrabold text-white mb-4 group-hover:${project.accentColor} transition-colors`}>
          {projectRoute ? (
            <Link href={projectRoute}>{project.title}</Link>
          ) : (
            project.title
          )}
        </h3>

        <div className="bg-white/4 border border-white/5 rounded-xl p-4 mb-6">
          <p className="text-white/80 font-medium leading-relaxed">{project.description}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {metrics.map((m) => (
            <motion.div key={m.label} className="flex flex-col border-l-2 border-white/10 pl-3" whileHover={{ scale: 1.05 }}>
              <span className="text-xl font-bold text-white">{m.value}</span>
              <span className="text-[10px] uppercase tracking-wider text-white/40">{m.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-white/10">
          <p className="text-xs font-mono text-white/40 mb-4 flex items-center gap-2">
            <Layers className={`w-4 h-4 ${project.accentColor}`} /> {project.thinking}
          </p>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {project.tech.map((tech) => (
              <span key={tech} className="px-3 py-1.5 text-xs bg-white/5 text-white/70 rounded-lg border border-white/10 font-medium whitespace-nowrap">{tech}</span>
            ))}
          </div>
          <div className="flex gap-4">
            {project.github !== '#' && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex justify-center items-center gap-2 py-3 px-6 glass rounded-xl text-white/80 hover:text-white transition-all text-sm font-semibold hover:bg-white/10 border border-white/10"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-5 h-5" /> View Architecture
              </motion.a>
            )}
            {project.demo !== '#' && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex justify-center items-center gap-2 py-3 px-6 rounded-xl text-white transition-all text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/10 ${project.accentColor}`}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-5 h-5" /> Live System
              </motion.a>
            )}
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-2/5 relative overflow-hidden bg-[#020810]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050d1a]/80 via-transparent to-transparent z-10" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover object-left opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-1000"
        />
      </div>
    </motion.div>
  );
}

function GridProjectCard({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) {
  const metrics = project.metrics as string[];
  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={scaleIn}
      transition={{ delay: index * 0.1 + 0.4 }}
      whileHover={{ y: -6 }}
      className={`group relative glass-card rounded-2xl border ${project.borderColor} overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)] flex flex-col card-shine`}
    >
      <div className="h-40 relative overflow-hidden bg-[#030812]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0515] to-transparent z-10" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-1000"
        />
        <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
          <span className="text-sm">{project.emoji}</span>
          <span className="text-[10px] font-bold tracking-wider text-white uppercase">{project.badge}</span>
        </div>
      </div>

      <div className="relative p-6 space-y-4 flex-1 flex flex-col z-10 bg-[#0a0515]/90">
        <h3 className={`text-xl font-bold text-white group-hover:${project.accentColor} transition-colors`}>
          {project.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed flex-1">{project.description}</p>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {metrics.map((m) => (
            <div key={m} className="flex items-center gap-1.5 text-white/50 text-xs">
              <CheckCircle2 className={`w-3.5 h-3.5 ${project.accentColor} flex-shrink-0`} />
              <span className="truncate font-medium">{m}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
          <p className="text-[11px] font-mono text-white/40 flex items-center gap-2 truncate">
            <Cpu className={`w-3.5 h-3.5 ${project.accentColor}`} /> {project.thinking}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span key={tech} className="px-2 py-1 text-[10px] font-medium bg-white/5 text-white/60 rounded-md border border-white/5 whitespace-nowrap">{tech}</span>
            ))}
          </div>
          <div className="flex gap-2 pt-1">
            {project.github !== '#' && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex justify-center items-center gap-1.5 py-2 px-3 glass rounded-lg text-white/60 hover:text-white transition-all text-xs font-medium border border-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Github className="w-4 h-4" /> View Arch
              </motion.a>
            )}
            {project.demo !== '#' && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex justify-center items-center gap-1.5 py-2 px-3 rounded-lg text-white transition-all text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink className={`w-4 h-4 ${project.accentColor}`} /> Case Study
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectShowcase({ isInView }: { isInView: boolean }) {
  const items = [
    { icon: Terminal, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20', title: 'Production AI Systems', desc: 'Ability to go beyond prototypes to build, deploy, and scale real-world generative AI and multimodal ML pipelines.' },
    { icon: Server, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', title: 'Scalable Cloud Infrastructures', desc: 'Designing complex microservices and backend architectures using GCP, Azure, serverless deployments, and vector databases.' },
    { icon: Code2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', title: 'Full-Stack Autonomy', desc: 'Working across the entire stack—from frontend UI/UX in Next.js to backend APIs in FastAPI, all the way to secure database schemas.' },
    { icon: Globe, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', title: 'Practical Real-World Impact', desc: 'Solving actual problems like clinical orchestration, offline mesh emergency networks, and crop disease mapping through system design.' },
  ];

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ delay: 0.8 }}
      className="glass-card border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
    >
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 relative z-10 flex items-center gap-3">
        <Layers className="w-8 h-8 text-purple-400" /> What these projects demonstrate
      </h3>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
        {items.map((item) => (
          <motion.div
            key={item.title}
            className="flex items-start gap-4"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <div className={`w-10 h-10 rounded-xl ${item.bg} border flex items-center justify-center shrink-0`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1">{item.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useFramerInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 bg-[#050d1a] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "url('/images/bg_projects.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', opacity: 0.35 }} />
      <AuroraBackground />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-96 h-96 bg-cyan-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-[30rem] h-[30rem] bg-indigo-600/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <p className="section-label mx-auto w-fit">Engineering Portfolio</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            I design and deploy complex <br />
            <span className="gradient-text-cyan">AI systems at scale</span>
          </h2>
          <p className="text-white/50 mt-6 max-w-2xl mx-auto text-lg">
            Here&apos;s proof that I build real-world systems with impact, performance, and architecture in mind.
          </p>
        </motion.div>

        <div className="space-y-8 mb-8">
          {FEATURED_PROJECTS.map((project, index) => (
            <FeaturedProjectCard 
              key={project.title} 
              project={project} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {OTHER_PROJECTS.map((project, index) => (
            <GridProjectCard 
              key={project.title} 
              project={project} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </div>

        <ProjectShowcase isInView={isInView} />
      </div>
    </section>
  );
}
