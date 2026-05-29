import type { Metadata } from "next";
import ProjectsSection from "@/components/ProjectsSection";
import {
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
    <main className="min-h-screen bg-[#050d1a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                name: staticSeo.projects.title,
                url: "https://balaraj.vercel.app/projects",
                description: staticSeo.projects.description,
                mainEntity: {
                  "@type": "ItemList",
                  itemListElement: Object.values(projectSeo).map(
                    (project, index) => ({
                      "@type": "ListItem",
                      position: index + 1,
                      url: `https://balaraj.vercel.app${project.path}`,
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
