import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { marked } from 'marked';

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

In *VaidyaOS this approach allowed us to create a robust triage system that doctors can rely on anywhere.
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

export default function BlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const blog = slug ? blogContent[slug] : null;

  if (!blog) return <div className="min-h-screen flex justify-center items-center text-white"><Helmet><title>Not Found</title></Helmet><h1>Blog not found</h1><Link to="/blogs" className="ml-4 text-cyan-400">Back</Link></div>;

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
      <Helmet>
        <title>{blog.title} | Balaraj R Blog</title>
        <meta name="description" content={blog.description} />
        <link rel="canonical" href={`https://balaraj.vercel.app/blogs/${slug}`} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://balaraj.vercel.app/blogs/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
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
