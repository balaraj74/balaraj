import HomeClient from "@/components/HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://balaraj.vercel.app"),
  title: "Balaraj R | AI/ML Engineer | Full Stack Developer",
  description: "Portfolio of Balaraj R (Balu), AI/ML engineer and hackathon winner building healthcare, agriculture, and intelligent AI systems.",
  keywords: "Balaraj, Balaraj R, Balu, balaraj74, AI Engineer, ML Engineer, React Developer, Firebase Developer, Healthcare AI, AgriSence, VaidyaOS",
  authors: [{ name: "Balaraj R" }],
  alternates: {
    canonical: "https://balaraj.vercel.app",
  },
  openGraph: {
    title: "Balaraj R | AI/ML Engineer Portfolio",
    description: "AI/ML engineer building next-generation healthcare and agriculture AI systems.",
    url: "https://balaraj.vercel.app",
    siteName: "Balaraj R | AI/ML Engineer",
    images: [
      {
        url: "/og-image.png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balaraj R | AI/ML Engineer",
    description: "Portfolio of AI engineer and hackathon winner Balaraj R.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "name": "Balaraj R",
                "alternateName": "Balu",
                "url": "https://balaraj.vercel.app",
                "sameAs": [
                  "https://github.com/balaraj74",
                  "https://linkedin.com/in/balarajr",
                  "https://x.com/Balaraj__r",
                  "https://www.kaggle.com/balarajr",
                  "https://huggingface.co/balarajr",
                ],
                "jobTitle": "AI/ML Engineer",
                "alumniOf": "PES University",
                "knowsAbout": [
                  "Artificial Intelligence",
                  "Machine Learning",
                  "Edge AI",
                  "Healthcare AI",
                  "React",
                  "Firebase",
                ],
              },
              {
                "@type": "WebSite",
                "name": "Balaraj R | AI/ML Engineer",
                "url": "https://balaraj.vercel.app",
              },
            ],
          }),
        }}
      />
      <HomeClient />
    </>
  );
}
