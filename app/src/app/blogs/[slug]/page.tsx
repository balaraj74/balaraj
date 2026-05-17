import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { marked } from 'marked';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const blogContent: Record<string, any> = {
  'edge-ai-healthcare': {
    title: 'Offline-First Edge AI in Healthcare',
    description: 'Running LLMs locally changes the game for privacy and latency in medical triage.',
    date: '2026-05-17',
    content: `
# Offline-First Edge AI in Healthcare

In traditional AI healthcare applications, patient data is often sent to the cloud. This introduces latency, privacy risks, and a reliance on network connectivity.

By using **Llama.cpp** and optimized GGUF models, we can run inference entirely on-device. This means:
- **Zero Latency**: No waiting for network requests.
- **Absolute Privacy**: Patient data never leaves the device.
- **Offline Resilience**: Works in remote areas without internet.

In *VaidyaOS* this approach allowed us to create a robust triage system that doctors can rely on anywhere.
    `
  },
  'event-driven-microservices-ai': {
    title: 'Scaling AI with Event-Driven Microservices',
    description: 'Lessons learned building a 32-microservice architecture for CareerLens.',
    date: '2026-04-22',
    content: `
# Scaling AI with Event-Driven Microservices

When building *CareerLens*, we realized that synchronous API calls to LLMs (like Gemini) create massive bottlenecks. 

### The Solution
We adopted an event-driven architecture using Pub/Sub mechanisms. 

1. **Upload**: User uploads a resume.
2. **Event**: 'resume.uploaded' event is published.
3. **Workers**: Multiple microservices pick up the event to extract skills, generate embeddings, and query the LLM concurrently.

This reduced processing time from 30 seconds to under 5 seconds for complex multi-agent workflows.
    `
  }
};

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const blog = blogContent[params.slug];
  if (!blog) return { title: 'Not Found' };

  return {
    title: `${blog.title} | Balaraj R Blog`,
    description: blog.description,
    alternates: {
      canonical: `https://balaraj.vercel.app/blogs/${params.slug}`,
    },
    openGraph: {
      title: blog.title,
      type: "article",
      url: `https://balaraj.vercel.app/blogs/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(blogContent).map((slug) => ({
    slug,
  }));
}

export default async function BlogPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const blog = blogContent[params.slug];

  if (!blog) {
    notFound();
  }

  const htmlContent = marked.parse(blog.content) as string;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description,
    "datePublished": blog.date,
    "author": {
      "@type": "Person",
      "name": "Balaraj R"
    }
  };

  return (
    <div className="min-h-screen bg-[#050d1a] text-white py-20 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        <div 
          className="prose prose-invert prose-lg max-w-none prose-a:text-cyan-400 prose-headings:text-white"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </div>
    </div>
  );
}
