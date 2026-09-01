import type { Metadata } from "next";
import ProjectsSection from "@/components/ProjectsSection";
import {
  absoluteUrl,
  breadcrumbSchema,
  buildMetadata,
  projectSeo,
  safeJsonLd,
  softwareApplicationSchema,
  staticSeo,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata(staticSeo.projects);

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] dark:bg-[#030712] text-slate-900 dark:text-white transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                name: staticSeo.projects.title,
                url: absoluteUrl("/projects"),
                description: staticSeo.projects.description,
                mainEntity: {
                  "@type": "ItemList",
                  itemListElement: Object.values(projectSeo).map(
                    (project, index) => ({
                      "@type": "ListItem",
                      position: index + 1,
                      url: absoluteUrl(project.path),
                      name: project.title.split("|")[0].trim(),
                    }),
                  ),
                },
              },
              ...Object.values(projectSeo).map(softwareApplicationSchema),
              breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Projects", path: "/projects" },
              ]),
            ],
          }),
        }}
      />
      <ProjectsSection />
    </main>
  );
}
