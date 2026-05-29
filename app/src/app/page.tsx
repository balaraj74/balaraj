import HomeClient from "@/components/HomeClient";
import type { Metadata } from "next";
import { breadcrumbSchema, buildMetadata, safeJsonLd, staticSeo } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(staticSeo.home);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                name: staticSeo.home.title,
                url: "https://balaraj.vercel.app",
                description: staticSeo.home.description,
              },
              breadcrumbSchema([{ name: "Home", path: "/" }]),
            ],
          }),
        }}
      />
      <HomeClient />
    </>
  );
}
