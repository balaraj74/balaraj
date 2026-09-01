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
  darwin: {
    id: "darwin",
    aliases: ["darwin-ai"],
    path: "/projects/darwin",
    title: "Darwin | AI Executive Board for Startup Founders",
    displayTitle: "Darwin - AI Executive Board & Venture Validation Engine",
    description:
      "Darwin acts as an AI-powered executive board for startup founders, featuring a multi-agent debate engine with 5 specialized agents evaluating venture viability.",
    keywords: [
      "Darwin",
      "AI Executive Board",
      "Multi-Agent AI",
      "FastAPI",
      "Vertex AI",
      "Venture Validation",
      "Balaraj R",
    ],
    content:
      "Darwin is a full-stack multi-agent AI system designed to act as an executive board for startup founders. It simulates rigorous boardroom debate across 5 specialized AI personas to stress-test business models, financial models, and go-to-market strategies.",
    github: "https://github.com/balaraj74/darwin",
    demo: "https://darwin-5dleehg6la-el.a.run.app",
    image: "/projects/darwin_showcase.png",
    category: "BusinessApplication",
    details: {
      problem:
        "Founders struggle with biased validation and lack accessible, objective advisory boards to stress-test business ideas and execution plans.",
      solution:
        "Darwin orchestrates 5 autonomous AI executive personas across 3 structured debate rounds to critically analyze market fit, unit economics, risks, and execution milestones.",
      features: [
        "5 autonomous AI executive specialist agents",
        "Structured 3-round multi-agent debate engine",
        "Hard deterministic constraint enforcement",
        "Actionable blueprint and roadmap generation",
      ],
      techStack: ["FastAPI", "Next.js 14", "Vertex AI", "Firebase", "Google Cloud Run"],
      architecture: [
        "User submits startup pitch and key parameters",
        "Orchestrator initiates parallel specialist evaluations (Product, GTM, Finance, Tech, Risk)",
        "Multi-round adversarial debate synthesizes consensus and reveals risks",
        "Deterministic formatter produces structured executive blueprint",
      ],
      roadmap: [
        "Add live competitive intelligence feeds",
        "Integrate automated pitch deck analysis",
        "Expand investor persona simulations",
      ],
      visuals: [
        {
          src: "/projects/darwin_showcase.png",
          alt: "Darwin AI Executive Board interface preview",
          caption: "Darwin multi-agent debate dashboard",
        },
      ],
    },
  },
  omnisence: {
    id: "omnisence",
    aliases: ["omni-sence"],
    path: "/projects/omnisence",
    title: "OmniSence | Multimodal Spatial AI Engine",
    displayTitle: "OmniSence - Multimodal Spatial Perception Engine",
    description:
      "OmniSence provides real-time multimodal perception, spatial vision analysis, and contextual audio-visual reasoning for intelligent environments.",
    keywords: [
      "OmniSence",
      "Multimodal AI",
      "Computer Vision",
      "Spatial Intelligence",
      "PyTorch",
      "FastAPI",
      "Balaraj R",
    ],
    content:
      "OmniSence is a high-throughput multimodal intelligence engine that fuses real-time computer vision with audio stream comprehension to perceive and structure complex ambient environments.",
    github: "https://github.com/balaraj74/omnisence",
    demo: "https://omnisence-demo.vercel.app",
    image: "/projects/omnisence_bg_1776501035325.png",
    category: "MultimediaApplication",
    details: {
      problem:
        "Single-modality vision models miss critical ambient audio and spatial context needed for rich situational awareness.",
      solution:
        "OmniSence combines low-latency neural vision models and audio event detection in a unified spatial reasoning pipeline.",
      features: [
        "Real-time object detection and spatial tracking",
        "Ambient audio classification and event correlation",
        "Zero-latency edge streaming pipeline",
        "Spatial coordinate mapping and telemetry export",
      ],
      techStack: ["Python", "PyTorch", "FastAPI", "OpenCV", "WebRTC"],
      architecture: [
        "High-frame rate video and audio feeds stream into ingestion pipeline",
        "PyTorch inference models extract spatial vectors and acoustic features",
        "Correlation engine matches visual anomalies with audio cues",
        "WebSocket server broadcasts real-time perceptual telemetry to client UI",
      ],
      roadmap: [
        "Add 3D depth point cloud reconstruction",
        "Optimize models for edge microcontrollers and Jetson Nano",
        "Introduce multi-camera sensor fusion",
      ],
      visuals: [
        {
          src: "/projects/omnisence_bg_1776501035325.png",
          alt: "OmniSence Multimodal Perception Preview",
          caption: "OmniSence spatial intelligence preview",
        },
      ],
    },
  },
  taskforze: {
    id: "taskforze",
    aliases: ["task-forze"],
    path: "/projects/taskforze",
    title: "TaskForze | Autonomous Agent Swarm Platform",
    displayTitle: "TaskForze - Autonomous Agent Workflow Orchestration",
    description:
      "TaskForze is an autonomous AI agent swarm platform that orchestrates complex task decomposition, tool execution, and self-correcting workflows.",
    keywords: [
      "TaskForze",
      "Autonomous Agents",
      "Workflow Automation",
      "LangGraph",
      "FastAPI",
      "Balaraj R",
    ],
    content:
      "TaskForze delivers enterprise-grade workflow orchestration by coordinating distributed autonomous agents that dynamically plan, execute, verify, and iterate on complex multi-step technical workflows.",
    github: "https://github.com/balaraj74/taskforze",
    demo: "https://taskforze.vercel.app",
    image: "/projects/taskforze_bg_1776501047462.png",
    category: "BusinessApplication",
    details: {
      problem:
        "Complex enterprise workflows break down when simple linear scripts fail without self-healing or adaptive replanning.",
      solution:
        "TaskForze uses graph-based agent topologies with dynamic replanning, validation checkpoints, and tool retry mechanisms.",
      features: [
        "Hierarchical agent swarm coordination",
        "Deterministic state machine and execution rollback",
        "Sandboxed Python & CLI tool execution",
        "Real-time step-by-step progress streaming",
      ],
      techStack: ["TypeScript", "Python", "FastAPI", "Redis", "Docker"],
      architecture: [
        "User defines high-level goal and security policy",
        "Lead planner agent decomposes goal into DAG of executable sub-tasks",
        "Worker agents execute tools in isolated sandbox environments",
        "Critic agent verifies artifacts and approves or triggers replanning",
      ],
      roadmap: [
        "Add asynchronous human-in-the-loop approval gates",
        "Expand pre-built SaaS connector marketplace",
        "Implement persistent memory across multi-day agent runs",
      ],
      visuals: [
        {
          src: "/projects/taskforze_bg_1776501047462.png",
          alt: "TaskForze Autonomous Agent Swarm Preview",
          caption: "TaskForze dynamic agent orchestration workflow",
        },
      ],
    },
  },
  healthmesh: {
    id: "healthmesh",
    aliases: ["health-mesh"],
    path: "/projects/healthmesh",
    title: "HealthMesh v2.0 | Distributed Clinical Telemetry Grid",
    displayTitle: "HealthMesh v2.0 - Federated Edge Healthcare Telemetry",
    description:
      "HealthMesh v2.0 connects distributed healthcare devices with zero-trust federated telemetry, on-device anomaly detection, and end-to-end encryption.",
    keywords: [
      "HealthMesh",
      "Healthcare IoT",
      "Edge Telemetry",
      "Zero Trust",
      "FastAPI",
      "Balaraj R",
    ],
    content:
      "HealthMesh v2.0 is a distributed medical telemetry network delivering zero-trust patient monitoring, continuous edge vital analysis, and low-latency critical event alerting across clinical facilities.",
    github: "https://github.com/balaraj74/healthmesh",
    demo: "https://healthmesh.vercel.app",
    image: "/projects/healthmesh_bg_1776501063141.png",
    category: "HealthcareApplication",
    details: {
      problem:
        "Hospital telemetry systems are fragmented and prone to latency delays and security breaches during cross-facility transfers.",
      solution:
        "HealthMesh establishes an encrypted, distributed telemetry mesh with edge anomaly detection and zero-trust authentication.",
      features: [
        "Zero-trust end-to-end encrypted vital streams",
        "Edge anomaly detection for cardiac & oxygen anomalies",
        "Fault-tolerant peer-to-peer sync during outages",
        "Interactive clinical monitoring dashboard",
      ],
      techStack: ["Go", "Python", "WebSockets", "TimescaleDB", "React"],
      architecture: [
        "Edge medical sensors stream encrypted vital telemetry",
        "Edge nodes run real-time anomaly detection heuristics",
        "Time-series database archives compressed telemetry streams",
        "Nurse station dashboard renders real-time multi-patient waveforms",
      ],
      roadmap: [
        "Add predictive arrhythmia early-warning models",
        "Integrate HL7 / FHIR standard hospital EHR exports",
        "Support wearable BLE clinical device ingestion",
      ],
      visuals: [
        {
          src: "/projects/healthmesh_bg_1776501063141.png",
          alt: "HealthMesh Clinical Telemetry Preview",
          caption: "HealthMesh distributed patient monitoring grid",
        },
      ],
    },
  },
  cybershield: {
    id: "cybershield",
    aliases: ["cyber-shield"],
    path: "/projects/cybershield",
    title: "CyberShield AI | Real-Time Threat Intelligence & Defense",
    displayTitle: "CyberShield AI - Autonomous Threat Detection & Response",
    description:
      "CyberShield AI uses continuous deep packet inspection and behavioural machine learning models to detect zero-day cyber threats in real time.",
    keywords: [
      "CyberShield AI",
      "Cybersecurity",
      "Threat Detection",
      "Machine Learning Security",
      "FastAPI",
      "Balaraj R",
    ],
    content:
      "CyberShield AI is an intelligent defensive cybersecurity platform that continuously ingests network telemetry and applies real-time behavioural anomaly classifiers to neutralize threat vectors before escalation.",
    github: "https://github.com/balaraj74/cybershield",
    demo: "https://cybershield.vercel.app",
    image: "/projects/cybershield_bg_1776501077227.png",
    category: "SecurityApplication",
    details: {
      problem:
        "Traditional signature-based firewalls cannot detect novel zero-day attack vectors and sophisticated lateral movement.",
      solution:
        "CyberShield AI trains behavioural anomaly classifiers on network telemetry to detect and quarantine zero-day threats in milliseconds.",
      features: [
        "Real-time packet flow inspection and protocol decoding",
        "Behavioural anomaly detection with deep learning",
        "Automated IP quarantine and firewall rule injection",
        "Live security operations center (SOC) event map",
      ],
      techStack: ["Python", "eBPF", "TensorFlow", "FastAPI", "Next.js"],
      architecture: [
        "eBPF hooks capture kernel-level network socket activity",
        "Streaming pipeline extracts behavioral flow statistics",
        "TensorFlow model classifies traffic as benign or anomalous",
        "Automated orchestrator triggers firewall isolation rules",
      ],
      roadmap: [
        "Add MITRE ATT&CK framework mapping for detected events",
        "Introduce automated threat intelligence feed sharing",
        "Support Kubernetes cloud-native sidecar enforcement",
      ],
      visuals: [
        {
          src: "/projects/cybershield_bg_1776501077227.png",
          alt: "CyberShield Threat Intelligence Preview",
          caption: "CyberShield AI threat detection dashboard",
        },
      ],
    },
  },
};

export const blogPosts = {
  "building-darwin-ai-executive-board": {
    slug: "building-darwin-ai-executive-board",
    path: "/blogs/building-darwin-ai-executive-board",
    title: "Building Darwin: The AI Executive Board for Startup Founders",
    description:
      "A deep dive into Darwin's architecture: a multi-agent system that runs structured debates to build realistic startup execution blueprints.",
    date: "2026-06-12",
    displayDate: "June 12, 2026",
    readTime: "10 min read",
    keywords: [
      "Darwin",
      "AI Executive Board",
      "Multi-agent AI",
      "Agent orchestration",
      "FastAPI",
      "Vertex AI",
      "Balaraj R",
    ],
  },
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
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png' },
      ],
      apple: [{ url: '/apple-icon.png', type: 'image/png' }],
    },
    verification: {
      google: 'Pdq86etn28D_kfMkzvOZ_B06dBGHFltpn89l3fW59Mo',
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
  { path: "/projects/darwin", changeFrequency: "monthly", priority: 0.85 },
  { path: "/projects/omnisence", changeFrequency: "monthly", priority: 0.85 },
  { path: "/projects/taskforze", changeFrequency: "monthly", priority: 0.85 },
  { path: "/projects/healthmesh", changeFrequency: "monthly", priority: 0.85 },
  { path: "/projects/cybershield", changeFrequency: "monthly", priority: 0.85 },
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
