import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { marked } from 'marked';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  blogPostingSchema,
  blogPosts,
  breadcrumbSchema,
  buildMetadata,
  safeJsonLd,
} from '@/lib/seo';

const blogContent: Record<string, string> = {
  'building-darwin-ai-executive-board': `
# Building Darwin: The AI Executive Board for Startup Founders

Most startup advice on the internet is generic. It assumes every founder has the same technical skills, capital, risk tolerance, and network. But in reality, a brilliant B2B SaaS idea that requires a 9-month enterprise sales cycle is a terrible idea for a solo technical founder with a $500 budget and no B2B network.

I built **Darwin** to solve this. Darwin is a full-stack AI platform that acts as an **AI-powered executive board**. Instead of giving generic advice, it builds a *Digital Twin* of the founder, then runs a 3-round structured debate among 5 specialized AI agents (CEO, CFO, CTO, CMO, CPO) to decide if an idea is viable *for that specific founder*.

## The Architecture of a Boardroom

At its core, Darwin is an orchestration problem. How do you get five LLM agents to debate, disagree, and ultimately synthesize a verdict?

I structured the debate engine in three distinct rounds:

1. **Initial Positions (Parallel):** The CEO, CFO, CTO, CMO, and CPO independently evaluate the idea based on the founder's Digital Twin. This step is completely parallelized using \`asyncio.gather\` in FastAPI, ensuring low latency.
2. **Cross-Examination (Sequential):** Each agent responds to another's position. For example, the optimistic CEO must defend its market sizing against the conservative CFO's capital warnings. The skeptical CTO questions the ambitious CMO's distribution strategy.
3. **Final Vote (Parallel):** After reviewing the entire debate transcript, each agent casts a final vote and confidence score.

## Hard Constraints vs. Soft Scores

One of the biggest issues with multi-agent systems is that LLMs tend to be overly agreeable. If four agents love an idea, they might convince the fifth to agree, even if the fifth agent identified a critical flaw.

To counter this, Darwin uses **Deterministic Vetoes**. The Decision Synthesizer applies hard constraints that override soft AI scores:
- **CFO Veto:** If the projected capital runway doesn't reach the first revenue milestone, it's an automatic REJECT.
- **CTO Veto:** If the founder lacks the required technical skills and has no budget to hire, it's an automatic REJECT.
- **Time Veto:** If the time-to-market exceeds the founder's strict deadline, it's an automatic REJECT.

Only if the idea survives the hard constraints does the system calculate the weighted soft scores (CEO 25%, CFO 30%, CTO 20%, CMO 15%, CPO 10%).

## The Tech Stack: Scaling the Boardroom

Darwin is built for production, heavily leveraging Google Cloud:

- **Frontend:** Next.js 14 App Router, built with a dark glassmorphism aesthetic to feel like a premium command center.
- **Backend:** FastAPI (Python 3.12) running asynchronously to handle parallel LLM calls.
- **AI Infrastructure:** Vertex AI is the primary engine (Gemini 3.1 Pro for deep reasoning, Gemini 3 Flash for fast agent opinions).
- **Fallback Chain:** To handle rate limits gracefully, I built a 4-level fallback chain that switches from Vertex AI to OpenRouter (free tier) to NVIDIA NIM automatically if quotas are hit.
- **Persistence:** Firebase Auth for Google Sign-in and Firestore for persisting the Digital Twins and Session Histories.
- **Deployment:** Containerized via Docker and deployed on Google Cloud Run for auto-scaling from zero to handle intensive debate sessions.

## The Output: Execution Blueprints

When the boardroom votes "PROCEED", Darwin doesn't just say "Good job". It generates an execution package in parallel:
- A Product Requirements Document (PRD) scoping the exact MVP.
- A Financial Model constrained to the actual budget.
- A 7-slide Pitch Deck tailored to the founder's unfair advantage.
- A Tech Architecture recommendation.
- An API call to GitLab to automatically scaffold a project board with actionable issues.

Darwin isn't just an LLM wrapper—it's an intelligent decision engine that forces founders to face reality before they write a single line of code.
  `,
  'building-vaidyaos-offline-healthcare-ai-edge-ai': `
# Building VaidyaOS: Offline Healthcare AI Using Edge AI

Healthcare AI is most useful when it is available at the moment of care. In rural clinics, emergency workflows, and low-connectivity settings, relying on a cloud-only model creates latency, availability, and privacy risks.

VaidyaOS is designed around a different constraint: the system should still assist when the network is unreliable. The core architecture moves inference closer to the user through compact local models and an offline-first application flow.

## System Goals

- Keep sensitive patient context on-device whenever possible.
- Provide fast first-pass triage support with low latency.
- Support multilingual interactions for more accessible healthcare workflows.
- Sync operational data only when connectivity is available.

## Edge AI Architecture

The VaidyaOS workflow starts with a mobile client that captures structured symptoms, patient context, and voice-ready interaction data. A local inference layer runs compact GGUF models through an on-device runtime, while the application layer adds guardrails, prompts, and structured outputs for safer clinical assistance.

This does not replace clinicians. The goal is to support faster intake, clearer summarization, and more resilient decision support in places where cloud dependency is a weakness.

## Why Offline Matters

Offline inference improves three practical dimensions: privacy, latency, and resilience. Patient context does not need to leave the device for every interaction, responses are not blocked by network round trips, and the system remains useful in remote environments.

VaidyaOS is a healthcare AI project, but the same architecture pattern applies to any high-trust domain where availability and privacy matter.
  `,
  'how-agrisence-uses-ai-for-crop-disease-detection': `
# How AgriSence Uses AI for Crop Disease Detection

Crop disease detection is time-sensitive. A delay of even a few days can turn a manageable issue into a major yield loss, especially when farmers lack immediate access to expert agronomy support.

AgriSence approaches this as an AI crop intelligence problem. The system combines crop imagery, user context, weather signals, and multilingual advisory generation to help farmers understand what is happening and what to do next.

## Workflow

1. A farmer captures or uploads a crop image.
2. The application collects crop, location, and field context.
3. AI workflows classify visible disease risk and enrich the result with weather-aware reasoning.
4. The system generates practical next steps in accessible language.

## Why Multilingual Advisory Matters

Detection alone is not enough. A farmer needs a recommendation that is understandable, localized, and actionable. AgriSence prioritizes regional accessibility so the output is closer to a useful field advisory than a raw model prediction.

## Production Considerations

The architecture uses serverless APIs and Firebase-backed persistence to keep the product deployable and scalable. This keeps the frontend responsive while allowing AI workflows to evolve independently behind the API layer.
  `,
  'deploying-gguf-models-for-on-device-inference': `
# Deploying GGUF Models for On-Device Inference

GGUF models make it practical to run compact language models locally with runtimes such as llama.cpp. For products like VaidyaOS, this enables AI assistance without depending on constant cloud connectivity.

## Why GGUF

GGUF is useful for edge deployment because it packages model weights in a format optimized for local inference. Quantized variants can reduce memory and compute requirements, which matters on laptops, mobile devices, and constrained edge environments.

## Deployment Pattern

A practical on-device deployment needs more than a model file. It needs model selection, quantization choice, runtime integration, prompt templates, response parsing, fallback behavior, and update strategy.

The high-level flow is:

1. Choose a compact base model for the domain.
2. Quantize or select a GGUF variant that fits the target device.
3. Integrate a local runtime such as llama.cpp.
4. Wrap inference with structured prompts and output validation.
5. Ship model updates as versioned, signed bundles.

## Tradeoffs

On-device inference improves privacy and latency, but it also forces tighter thinking around memory, model size, and response quality. The best architecture often combines local inference for critical offline paths with cloud inference for heavier optional workflows.
  `,
  'architecture-of-a-multi-agent-ai-platform': `
# Architecture of a Multi-Agent AI Platform

Multi-agent AI systems become useful when they are treated as distributed systems rather than prompt chains. The hard parts are orchestration, state, retries, cost control, observability, and reliable handoffs between specialized workers.

Career Lens uses this style of architecture to analyze profiles, infer skill gaps, and generate career recommendations through multiple coordinated AI workflows.

## Core Components

- Ingestion services normalize resumes and user context.
- Embedding workers convert profile data into searchable representations.
- Recommendation agents evaluate roles, gaps, and career paths.
- Queue-driven orchestration keeps long-running AI work resilient.
- The frontend presents results as structured actions, not raw model output.

## Why Events Help

Event-driven design prevents one slow model call from blocking the entire product. Each worker can process a specific task, retry independently, and publish structured output for the next stage.

## Production Lessons

The most important design choice is to keep agent responsibilities narrow. A reliable multi-agent platform depends less on one powerful prompt and more on clear contracts between services.
  `,
  'my-journey-building-ai-systems-at-pes-university': `
# My Journey Building AI Systems at PES University

My work at PES University has focused on building practical AI systems rather than isolated demos. The projects that shaped my portfolio, including VaidyaOS, AgriSence, and Career Lens, each started from a real-world problem and grew into a system architecture challenge.

## What I Focused On

I kept returning to three themes: healthcare AI, agriculture AI, and intelligent decision-support systems. These domains forced me to think about latency, accessibility, privacy, deployment, and user trust.

## Hackathons as Systems Practice

Hackathons gave me a way to test ideas quickly, but the real learning came from turning prototypes into structured products. Winning outcomes mattered, but the deeper value was learning how to scope, build, deploy, and explain complex AI systems under pressure.

## Engineering Direction

The portfolio now reflects the kind of engineering I want to keep doing: AI systems that combine model capability with strong product architecture, clear user value, and production-grade implementation.
  `,
  'edge-ai-healthcare': {
    content: `
# Offline-First Edge AI in Healthcare

In traditional AI healthcare applications, patient data is often sent to the cloud. This introduces latency, privacy risks, and a reliance on network connectivity.

By using **Llama.cpp** and optimized GGUF models, we can run inference entirely on-device. This means:
- **Zero Latency**: No waiting for network requests.
- **Absolute Privacy**: Patient data never leaves the device.
- **Offline Resilience**: Works in remote areas without internet.

In *VaidyaOS* this approach allowed us to create a robust triage system that doctors can rely on anywhere.
    `
  }.content,
  'event-driven-microservices-ai': {
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
  }.content
};

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const blog = blogPosts[params.slug as keyof typeof blogPosts];
  if (!blog) return { title: 'Not Found' };

  return buildMetadata({
    title: blog.title,
    description: blog.description,
    path: blog.path,
    keywords: blog.keywords,
    type: "article",
    publishedTime: blog.date,
  });
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export default async function BlogPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const blog = blogPosts[params.slug as keyof typeof blogPosts];
  const content = blogContent[params.slug];

  if (!blog || !content) {
    notFound();
  }

  const htmlContent = marked.parse(content) as string;

  return (
    <div className="min-h-screen bg-[#F7F4EE] dark:bg-[#030712] text-slate-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@graph": [
              blogPostingSchema(blog),
              breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Blogs", path: "/blogs" },
                { name: blog.title, path: blog.path },
              ]),
            ],
          }),
        }}
      />

      <div className="max-w-3xl mx-auto">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-cyan-700 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 mb-8 transition-colors font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        <div 
          className="prose dark:prose-invert prose-lg max-w-none prose-a:text-cyan-600 dark:prose-a:text-cyan-400 prose-headings:text-slate-900 dark:prose-headings:text-white text-slate-800 dark:text-slate-200"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </div>
    </div>
  );
}
