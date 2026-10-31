import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import type { Metadata } from 'next';
import { absoluteUrl, breadcrumbSchema, buildMetadata, safeJsonLd, staticSeo } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(staticSeo.contact);

export default function ContactPage() {
  return (
    <>
    <Navigation />
    <main className="min-h-screen bg-[#F7F4EE] dark:bg-[#0c0a09] pt-20 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ContactPage",
                name: staticSeo.contact.title,
                url: absoluteUrl("/contact"),
                description: staticSeo.contact.description,
              },
              breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Contact", path: "/contact" },
              ]),
            ],
          }),
        }}
      />
      <ContactSection headingLevel="h1" />
    </main>
    <Footer />
    </>
  );
}
