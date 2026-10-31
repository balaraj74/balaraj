import HomeClient from "@/components/HomeClient";
import type { Metadata } from "next";
import { breadcrumbSchema, buildMetadata, profilePageSchema, safeJsonLd, staticSeo } from "@/lib/seo";

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
              profilePageSchema(),
              breadcrumbSchema([{ name: "Home", path: "/" }]),
            ],
          }),
        }}
      />
      <HomeClient />
    </>
  );
}
