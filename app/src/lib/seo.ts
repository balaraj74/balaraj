import type { Metadata } from "next";

export const SITE_URL = "https://balaraj.vercel.app";
export const SITE_NAME = "Balaraj R | AI/ML Engineer";
export const OWNER_NAME = "Balaraj R";
export const OWNER_ALT_NAME = "Balu";
export const DEFAULT_OG_IMAGE = "/og-image.png";

export const ownerSameAs = [
  "https://github.com/balaraj74",
  "https://linkedin.com/in/balaraj-r-209a67330",
];

export const globalKeywords = [
  "Balaraj R",
  "Balaraj",
  "Balu",
  "balaraj74",
  "AI Engineer",
  "ML Engineer",
  "Full Stack Developer",
  "PES University",
  "Healthcare AI",
  "Edge AI",
  "AgriSence",
  "VaidyaOS",
  "Career Lens",
];

export const staticSeo = {
  home: {
    path: "/",
    title: "Balaraj R | AI/ML Engineer | Full Stack Developer | Portfolio",
    description:
      "Portfolio of Balaraj R (Balu), AI/ML engineer and full stack developer building healthcare AI, agriculture AI, Edge AI, and intelligent systems.",
    keywords: globalKeywords,
  },
  about: {
    path: "/about",
    title: "About Balaraj R | AI Engineer & Systems Builder",
    description:
      "Learn about Balaraj R, an AI/ML engineer focused on healthcare AI, agriculture AI, intelligent systems, and production-grade software architecture.",
    keywords: [
      ...globalKeywords,
      "AI systems builder",
      "production software architecture",
    ],
  },
  projects: {
    path: "/projects",
    title: "Projects | Balaraj R",
    description:
      "Explore AI, healthcare, agriculture, and intelligent systems projects built by Balaraj R.",
    keywords: [
      ...globalKeywords,
      "AI portfolio projects",
      "healthcare AI developer",
      "agriculture AI developer",
    ],
  },
  blogs: {
    path: "/blogs",
    title: "AI Engineering Blog | Balaraj R",
    description:
      "Technical articles on AI, machine learning, Edge AI, software architecture, healthcare AI, agriculture AI, and production engineering.",
    keywords: [
      ...globalKeywords,
      "AI engineering blog",
      "machine learning blog",
      "software architecture",
      "production engineering",
    ],
  },
  contact: {
    path: "/contact",
    title: "Contact Balaraj R",
    description:
      "Get in touch with Balaraj R for AI engineering, software development, startup collaborations, hackathons, and technical projects.",
    keywords: [
      ...globalKeywords,
      "hire AI engineer",
      "startup collaboration",
      "hackathon winner",
    ],
  },
} as const;

export const projectSeo = {
  vaidyos: {
    id: "vaidyos",
    aliases: ["vaidyaos"],
    path: "/projects/vaidyos",
    title: "VaidyaOS | Offline Healthcare AI Platform",
    displayTitle: "VaidyaOS - Offline AI Healthcare OS",
    description:
      "VaidyaOS is an AI-powered healthcare intelligence platform featuring Edge AI, multilingual support, offline inference, and on-device medical assistance.",
    keywords: [
      "VaidyaOS",
      "Healthcare AI",
      "Medical AI",
      "Offline AI",
      "Edge AI",
      "GGUF",
      "llama.cpp",
      "Healthcare Intelligence",
      "Balaraj R",
    ],
    content:
      "VaidyaOS is my flagship healthcare project. It uses optimized GGUF models to run directly on-device, ensuring patient privacy and zero-latency inference for critical triage workflows. It features multilingual support and integrates seamlessly with local hospital networks.",
    github: "https://github.com/balaraj74/VaidyaOS",
    demo: "https://roaring-valkyrie-042963.netlify.app/VaidyaOS.apk",
    image: "/projects/vaidyaos_banner.png",
    category: "HealthcareApplication",
    details: {
      problem:
        "Healthcare teams in low-connectivity environments need fast triage support without sending sensitive patient context to a remote model endpoint.",
      solution:
        "VaidyaOS combines an offline-first mobile workflow with compact GGUF model inference, local clinical context, multilingual interaction, and a privacy-preserving edge architecture.",
      features: [
        "Edge AI inference for low-latency clinical assistance",
        "Offline AI workflows for remote or unstable network conditions",
        "Multilingual AI interaction for Indian healthcare settings",
        "Voice-ready assistance for hands-light triage scenarios",
      ],
      techStack: ["React Native", "GGUF", "llama.cpp", "Gemma", "Firebase"],
      architecture: [
        "Mobile client captures symptoms, voice, and structured patient context",
        "On-device inference layer runs compact GGUF models locally",
        "Rules and retrieval layer adds clinical guardrails and local references",
        "Sync layer stores non-sensitive operational data when connectivity returns",
      ],
      roadmap: [
        "Add clinician review mode and confidence explanations",
        "Expand language coverage and voice interaction quality",
        "Package model updates through signed offline bundles",
      ],
      visuals: [
        {
          src: "/projects/vaidyaos_banner.png",
          alt: "VaidyaOS offline healthcare AI platform preview",
          caption: "VaidyaOS product preview",
        },
      ],
    },
  },
  agrisence: {
    id: "agrisence",
    aliases: [],
    path: "/projects/agrisence",
    title: "AgriSence | AI Agriculture Platform",
    displayTitle: "AgriSence - Real-Time Precision Farming AI",
    description:
      "AgriSence uses AI and machine learning for crop disease detection, crop recommendations, weather intelligence, and smart farming.",
    keywords: [
      "AgriSence",
      "Agriculture AI",
      "Crop Disease Detection",
      "Smart Farming",
      "Precision Agriculture",
      "Machine Learning Agriculture",
      "Balaraj R",
    ],
    content:
      "AgriSence was built to solve critical delays in crop disease identification. By leveraging GCP serverless functions and Gemini AI, it analyzes crop imagery and provides real-time, localized actionable advice to farmers across India.",
    github: "https://github.com/balaraj74/AgriSence",
    demo: "https://agrisence--agrisence-1dc30.us-central1.hosted.app/",
    image: "/projects/agrisence_bg_1776501022187.png",
    category: "AgricultureApplication",
    details: {
      problem:
        "Farmers often lose critical time identifying crop diseases, interpreting weather risk, and choosing the right advisory action for local conditions.",
      solution:
        "AgriSence uses AI crop intelligence to analyze crop imagery, recommend actions, combine weather context, and deliver multilingual farming guidance.",
      features: [
        "Crop disease detection from field images",
        "Crop recommendation and advisory workflows",
        "Weather-aware farming intelligence",
        "Multilingual guidance for regional accessibility",
      ],
      techStack: ["Next.js", "Gemini", "Firebase", "Google Cloud", "Genkit"],
      architecture: [
        "Farmer submits crop image and context from the web app",
        "Serverless API validates input and enriches it with location/weather context",
        "AI workflow classifies disease risk and generates advisory steps",
        "Firebase-backed persistence stores history and user-facing recommendations",
      ],
      roadmap: [
        "Add disease severity scoring and treatment tracking",
        "Improve regional crop coverage with more labeled samples",
        "Add satellite and soil signals for precision recommendations",
      ],
      visuals: [
        {
          src: "/projects/agrisence_bg_1776501022187.png",
          alt: "AgriSence crop disease detection dashboard",
          caption: "AgriSence crop intelligence workflow",
        },
      ],
    },
  },
  "career-lens": {
    id: "career-lens",
    aliases: [],
    path: "/projects/career-lens",
    title: "Career Lens | AI Career Intelligence Platform",
    displayTitle: "CareerLens - AI Career Mapping Platform",
    description:
      "Career Lens helps students and professionals make data-driven career decisions using AI-powered insights and recommendations.",
    keywords: [
      "Career Lens",
      "CareerLens",
      "AI Career Intelligence",
      "AI Career Platform",
      "Career Recommendations",
      "Google Gen AI Hackathon",
      "Balaraj R",
    ],
    content:
      "CareerLens is a sophisticated 32-microservice platform that deeply analyzes professional profiles. It uses semantic search and multi-agent reasoning to build 5-year optimized career trajectories, earning a National Hackathon victory.",
    github: "https://github.com/balaraj74/careerlens",
    demo: "https://careerlens--careerlens-1.us-central1.hosted.app",
    image: "/projects/career_lens_bg_1776501008387.png",
    category: "BusinessApplication",
    details: {
      problem:
        "Students and early-career professionals struggle to convert resumes, skills, and goals into clear, data-backed career decisions.",
      solution:
        "Career Lens analyzes profiles with AI workflows, identifies skill gaps, and generates personalized career paths through a microservices architecture.",
      features: [
        "Resume and profile analysis",
        "Skill-gap detection",
        "Personalized career recommendations",
        "Multi-agent reasoning for trajectory planning",
      ],
      techStack: ["Next.js", "TypeScript", "Gemini", "Cloud Functions", "Vector Search"],
      architecture: [
        "Profile ingestion normalizes resume and user context",
        "Embedding services map skills and experience into searchable vectors",
        "AI recommendation workers evaluate roles, gaps, and learning paths",
        "Frontend presents a structured journey with prioritized next actions",
      ],
      roadmap: [
        "Add recruiter-facing profile export",
        "Improve role-market matching with live job signals",
        "Add longitudinal progress tracking for recommended paths",
      ],
      visuals: [
        {
          src: "/projects/career_lens_bg_1776501008387.png",
          alt: "Career Lens AI career intelligence platform preview",
          caption: "Career Lens recommendation engine preview",
        },
      ],
    },
  },
} as const;

export const blogPosts = {
  "building-vaidyaos-offline-healthcare-ai-edge-ai": {
    slug: "building-vaidyaos-offline-healthcare-ai-edge-ai",
    path: "/blogs/building-vaidyaos-offline-healthcare-ai-edge-ai",
    title: "Building VaidyaOS: Offline Healthcare AI Using Edge AI",
    description:
      "A technical breakdown of how VaidyaOS uses offline-first design, Edge AI, and local inference for privacy-preserving healthcare assistance.",
    date: "2026-05-29",
    displayDate: "May 29, 2026",
    readTime: "7 min read",
    keywords: [
      "VaidyaOS",
      "Offline Healthcare AI",
      "Edge AI",
      "Medical AI",
      "On-device inference",
      "Balaraj R",
    ],
  },
  "how-agrisence-uses-ai-for-crop-disease-detection": {
    slug: "how-agrisence-uses-ai-for-crop-disease-detection",
    path: "/blogs/how-agrisence-uses-ai-for-crop-disease-detection",
    title: "How AgriSence Uses AI for Crop Disease Detection",
    description:
      "How AgriSence combines image analysis, weather context, and multilingual AI advisory workflows for smarter crop disease detection.",
    date: "2026-05-28",
    displayDate: "May 28, 2026",
    readTime: "6 min read",
    keywords: [
      "AgriSence",
      "Crop Disease Detection",
      "Agriculture AI",
      "Smart Farming",
      "Machine Learning Agriculture",
      "Balaraj R",
    ],
  },
  "deploying-gguf-models-for-on-device-inference": {
    slug: "deploying-gguf-models-for-on-device-inference",
    path: "/blogs/deploying-gguf-models-for-on-device-inference",
    title: "Deploying GGUF Models for On-Device Inference",
    description:
      "A practical guide to packaging compact GGUF models for local inference with better latency, privacy, and offline reliability.",
    date: "2026-05-27",
    displayDate: "May 27, 2026",
    readTime: "8 min read",
    keywords: [
      "GGUF",
      "llama.cpp",
      "On-device inference",
      "Edge AI",
      "Offline AI",
      "Balaraj R",
    ],
  },
  "architecture-of-a-multi-agent-ai-platform": {
    slug: "architecture-of-a-multi-agent-ai-platform",
    path: "/blogs/architecture-of-a-multi-agent-ai-platform",
    title: "Architecture of a Multi-Agent AI Platform",
    description:
      "A systems-level overview of multi-agent AI architecture, orchestration, queues, retrieval, and production reliability patterns.",
    date: "2026-05-26",
    displayDate: "May 26, 2026",
    readTime: "9 min read",
    keywords: [
      "Multi-agent AI",
      "AI architecture",
      "Agent orchestration",
      "Production AI systems",
      "Career Lens",
      "Balaraj R",
    ],
  },
  "my-journey-building-ai-systems-at-pes-university": {
    slug: "my-journey-building-ai-systems-at-pes-university",
    path: "/blogs/my-journey-building-ai-systems-at-pes-university",
    title: "My Journey Building AI Systems at PES University",
    description:
      "How Balaraj R built healthcare AI, agriculture AI, and multi-agent systems while studying at PES University.",
    date: "2026-05-25",
    displayDate: "May 25, 2026",
    readTime: "5 min read",
    keywords: [
      "Balaraj R",
      "PES University",
      "AI Engineer PES University",
      "Healthcare AI Developer",
      "Agriculture AI Developer",
      "Hackathon Winner",
    ],
  },
  "edge-ai-healthcare": {
    slug: "edge-ai-healthcare",
    path: "/blogs/edge-ai-healthcare",
    title: "Offline-First Edge AI in Healthcare",
    description:
      "Running LLMs locally changes the game for privacy and latency in medical triage.",
    date: "2026-05-17",
    displayDate: "May 17, 2026",
    readTime: "5 min read",
    keywords: [
      "Edge AI healthcare",
      "Offline AI",
      "Healthcare AI",
      "GGUF",
      "Llama.cpp",
      "VaidyaOS",
      "Balaraj R",
    ],
  },
  "event-driven-microservices-ai": {
    slug: "event-driven-microservices-ai",
    path: "/blogs/event-driven-microservices-ai",
    title: "Scaling AI with Event-Driven Microservices",
    description:
      "Lessons learned building a 32-microservice architecture for CareerLens.",
    date: "2026-04-22",
    displayDate: "April 22, 2026",
    readTime: "8 min read",
    keywords: [
      "AI microservices",
      "event-driven architecture",
      "Career Lens",
      "Gemini AI",
      "production AI systems",
      "Balaraj R",
    ],
  },
} as const;

export type ProjectId = keyof typeof projectSeo;
export type BlogSlug = keyof typeof blogPosts;

export function absoluteUrl(path = "/") {
  return path.startsWith("http")
    ? path
    : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getProjectByRouteId(id: string) {
  const project = projectSeo[id as ProjectId];
  if (project) return project;

  return Object.values(projectSeo).find((item) =>
    item.aliases.includes(id as never),
  );
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    keywords: keywords ? [...keywords] : [...globalKeywords],
    authors: [{ name: OWNER_NAME, url: SITE_URL }],
    creator: OWNER_NAME,
    publisher: OWNER_NAME,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${OWNER_NAME} AI/ML Engineer portfolio preview`,
        },
      ],
      locale: "en_US",
      type,
      ...(type === "article" && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [OWNER_NAME],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@Balaraj__r",
    },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: OWNER_NAME,
    alternateName: OWNER_ALT_NAME,
    url: SITE_URL,
    jobTitle: "AI/ML Engineer",
    alumniOf: "PES University",
    sameAs: ownerSameAs,
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Healthcare AI",
      "Agriculture AI",
      "Edge AI",
      "Full Stack Development",
      "Production Software Architecture",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: ["Balaraj R Portfolio", "Balu Portfolio"],
    url: SITE_URL,
    author: {
      "@type": "Person",
      name: OWNER_NAME,
    },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function softwareApplicationSchema(project: (typeof projectSeo)[ProjectId]) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title.split("|")[0].trim(),
    alternateName: project.displayTitle,
    url: absoluteUrl(project.path),
    image: absoluteUrl(project.image),
    operatingSystem: "Web, Android",
    applicationCategory: project.category,
    description: project.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: OWNER_NAME,
      url: SITE_URL,
    },
  };
}

export function blogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: staticSeo.blogs.title,
    url: absoluteUrl(staticSeo.blogs.path),
    description: staticSeo.blogs.description,
    author: {
      "@type": "Person",
      name: OWNER_NAME,
      url: SITE_URL,
    },
    blogPost: Object.values(blogPosts).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: absoluteUrl(post.path),
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: OWNER_NAME,
      },
    })),
  };
}

export function blogPostingSchema(post: (typeof blogPosts)[BlogSlug]) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: absoluteUrl(post.path),
    datePublished: post.date,
    dateModified: post.date,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    author: {
      "@type": "Person",
      name: OWNER_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: OWNER_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(post.path),
    },
  };
}

export const sitemapRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/projects/vaidyos", changeFrequency: "monthly", priority: 0.85 },
  { path: "/projects/agrisence", changeFrequency: "monthly", priority: 0.85 },
  { path: "/projects/career-lens", changeFrequency: "monthly", priority: 0.85 },
  { path: "/blogs", changeFrequency: "weekly", priority: 0.8 },
  {
    path: "/blogs/building-vaidyaos-offline-healthcare-ai-edge-ai",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blogs/how-agrisence-uses-ai-for-crop-disease-detection",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/blogs/deploying-gguf-models-for-on-device-inference",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blogs/architecture-of-a-multi-agent-ai-platform",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/blogs/my-journey-building-ai-systems-at-pes-university",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  { path: "/blogs/edge-ai-healthcare", changeFrequency: "monthly", priority: 0.75 },
  {
    path: "/blogs/event-driven-microservices-ai",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
] as const;
