import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import {
  breadcrumbSchema,
  buildMetadata,
  getProjectByRouteId,
  projectSeo,
  safeJsonLd,
  softwareApplicationSchema,
} from '@/lib/seo';

export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const project = getProjectByRouteId(params.id);
  if (!project) return { title: 'Project Not Found | Balaraj R' };

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: project.path,
    keywords: project.keywords,
    image: `${project.path}/opengraph-image`,
    type: "article",
  });
}

export async function generateStaticParams() {
  return Object.values(projectSeo).flatMap((project) => [
    { id: project.id },
    ...project.aliases.map((id) => ({ id })),
  ]);
}

export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = getProjectByRouteId(params.id);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      softwareApplicationSchema(project),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: project.title.split("|")[0].trim(), path: project.path },
      ]),
    ],
  };

  return (
    <>
    <Navigation />
    <main className="min-h-screen bg-[#F7F4EE] dark:bg-[#0c0a09] text-stone-900 dark:text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        <Link href="/projects" className="inline-flex items-center gap-2 text-brand-700 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 mb-8 transition-colors font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        
        <div className="glass-card rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 mb-12 relative h-[400px] shadow-xl">
          <Image src={project.image} alt={project.displayTitle} fill sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" preload />
        </div>

        <h1 className="text-4xl sm:text-5xl font-black mb-6">{project.displayTitle}</h1>
        <p className="text-xl text-stone-700 dark:text-stone-300 mb-10 leading-relaxed font-medium">
          {project.description}
        </p>

        <div className="prose dark:prose-invert prose-lg max-w-none mb-12 text-stone-800 dark:text-stone-200">
          <p>{project.content}</p>
        </div>

        <div className="space-y-8 mb-12">
          <section className="glass-card rounded-2xl border border-white/80 dark:border-white/10 p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-3 text-stone-900 dark:text-white">Problem</h2>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">{project.details.problem}</p>
          </section>

          <section className="glass-card rounded-2xl border border-white/80 dark:border-white/10 p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-3 text-stone-900 dark:text-white">Solution</h2>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">{project.details.solution}</p>
          </section>

          <section className="glass-card rounded-2xl border border-white/80 dark:border-white/10 p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-5 text-stone-900 dark:text-white">Features</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.details.features.map((feature) => (
                <div key={feature} className="rounded-xl border border-stone-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 text-stone-800 dark:text-stone-200 font-medium">
                  {feature}
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-2xl border border-white/80 dark:border-white/10 p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-5 text-stone-900 dark:text-white">Screenshots</h2>
            <div className="grid gap-4">
              {project.details.visuals.map((visual) => (
                <figure key={visual.src} className="overflow-hidden rounded-xl border border-stone-200 dark:border-white/10 bg-stone-100 dark:bg-black/20">
                  <div className="relative h-72">
                    <Image src={visual.src} alt={visual.alt} fill sizes="(min-width: 1024px) 848px, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="px-4 py-3 text-sm text-stone-600 dark:text-white/50">{visual.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-2xl border border-white/80 dark:border-white/10 p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-5 text-stone-900 dark:text-white">Architecture</h2>
            <ol className="space-y-3">
              {project.details.architecture.map((step, index) => (
                <li key={step} className="flex gap-3 text-stone-700 dark:text-stone-300">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-sm font-bold text-brand-700 dark:text-brand-300 border border-brand-500/30">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="glass-card rounded-2xl border border-white/80 dark:border-white/10 p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-5 text-stone-900 dark:text-white">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.details.techStack.map((tech) => (
                <span key={tech} className="rounded-lg border border-stone-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-1.5 text-sm text-stone-800 dark:text-stone-200 font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-2xl border border-white/80 dark:border-white/10 p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-5 text-stone-900 dark:text-white">Future Roadmap</h2>
            <ul className="space-y-3">
              {project.details.roadmap.map((item) => (
                <li key={item} className="text-stone-600 dark:text-stone-400 font-medium">- {item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex flex-wrap gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded-xl font-semibold transition-all shadow-sm">
              <Github className="w-5 h-5" /> View Source
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-400 text-stone-950 rounded-xl font-bold transition-all shadow-md">
              <ExternalLink className="w-5 h-5" /> {project.demo.toLowerCase().endsWith('.apk') ? 'Download APK' : 'Live Demo'}
            </a>
          )}
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
