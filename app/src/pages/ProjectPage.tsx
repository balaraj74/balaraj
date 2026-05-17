import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

const projectsData: Record<string, any> = {
  'vaidyaos': {
    title: 'VaidyaOS - Offline AI Healthcare OS',
    description: 'VaidyaOS is an offline-first AI healthcare operating system powered by edge AI and Llama.cpp for real-time medical insights.',
    keywords: 'VaidyaOS, Healthcare AI, Edge AI, Offline AI, Llama.cpp, React Native, Balaraj R',
    content: 'VaidyaOS is my flagship healthcare project. It uses optimized GGUF models to run directly on-device, ensuring patient privacy and zero-latency inference for critical triage workflows. It features multilingual support and integrates seamlessly with local hospital networks.',
    github: 'https://github.com/balaraj74/VaidyaOS',
    demo: 'https://roaring-valkyrie-042963.netlify.app/VaidyaOS.apk',
    image: '/projects/vaidyaos_banner.png'
  },
  'agrisence': {
    title: 'AgriSence - Real-Time Precision Farming AI',
    description: 'AgriSence integrates Google Cloud, Firebase, and Gemini AI for crop disease detection and real-time advisory in 7 languages.',
    keywords: 'AgriSence, Agriculture AI, GCP, Next.js, Gemini AI, Precision Farming, Balaraj R',
    content: 'AgriSence was built to solve critical delays in crop disease identification. By leveraging GCP serverless functions and Gemini AI, it analyzes crop imagery and provides real-time, localized actionable advice to farmers across India.',
    github: 'https://github.com/balaraj74/AgriSence',
    demo: 'https://agrisence--agrisence-1dc30.us-central1.hosted.app/',
    image: '/projects/agrisence_bg_1776501022187.png'
  },
  'career-lens': {
    title: 'CareerLens - AI Career Mapping Platform',
    description: 'Winner of Google Gen AI Hackathon. CareerLens uses an event-driven microservices architecture to process resumes and generate personalized career paths.',
    keywords: 'CareerLens, AI Career, Microservices, Gemini 1.5 Pro, Next.js, Google Gen AI Hackathon, Balaraj R',
    content: 'CareerLens is a sophisticated 32-microservice platform that deeply analyzes professional profiles. It uses semantic search and multi-agent reasoning to build 5-year optimized career trajectories, earning a National Hackathon victory.',
    github: 'https://github.com/balaraj74/careerlens',
    demo: 'https://careerlens--careerlens-1.us-central1.hosted.app',
    image: '/projects/career_lens_bg_1776501008387.png'
  }
};

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsData[id] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050d1a] text-white flex items-center justify-center">
        <Helmet><title>Project Not Found | Balaraj R</title></Helmet>
        <h1 className="text-3xl font-bold">Project not found</h1>
        <Link to="/" className="ml-4 text-cyan-400 hover:underline">Return Home</Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "operatingSystem": "Web, Android",
    "applicationCategory": "WebApplication",
    "description": project.description,
    "author": {
      "@type": "Person",
      "name": "Balaraj R"
    }
  };

  return (
    <div className="min-h-screen bg-[#050d1a] text-white py-20 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{project.title} | Balaraj R</title>
        <meta name="description" content={project.description} />
        <meta name="keywords" content={project.keywords} />
        <link rel="canonical" href={`https://balaraj.vercel.app/projects/${id}`} />
        
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={`https://balaraj.vercel.app${project.image}`} />
        <meta property="og:url" content={`https://balaraj.vercel.app/projects/${id}`} />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project.title} />
        <meta name="twitter:description" content={project.description} />
        <meta name="twitter:image" content={`https://balaraj.vercel.app${project.image}`} />
        
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        
        <div className="glass rounded-3xl overflow-hidden border border-white/10 mb-12">
          <img src={project.image} alt={project.title} className="w-full h-[400px] object-cover" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-black mb-6">{project.title}</h1>
        <p className="text-xl text-white/70 mb-10 leading-relaxed">
          {project.description}
        </p>

        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <p>{project.content}</p>
        </div>

        <div className="flex gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all">
              <Github className="w-5 h-5" /> View Source
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl font-medium transition-all">
              <ExternalLink className="w-5 h-5" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );}
