import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { breadcrumbSchema, buildMetadata, safeJsonLd, staticSeo } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(staticSeo.contact);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050d1a] text-white py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ContactPage",
                name: staticSeo.contact.title,
                url: "https://balaraj.vercel.app/contact",
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
      <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
      <p className="text-lg text-white/70 mb-8 max-w-2xl text-center">
        Feel free to reach out to me for collaborations or inquiries. This page will soon feature a contact form and more details.
      </p>
      <Link href="/" className="text-cyan-400 hover:underline inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back Home
      </Link>
    </div>
  );
}
