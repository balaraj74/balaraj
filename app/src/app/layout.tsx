import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import {
  buildMetadata,
  personSchema,
  safeJsonLd,
  staticSeo,
  websiteSchema,
} from "@/lib/seo";

import { Playfair_Display } from "next/font/google";

const geistSans = localFont({
  src: "./fonts/geist-sans.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = buildMetadata(staticSeo.home);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd({
              "@context": "https://schema.org",
              "@graph": [personSchema(), websiteSchema()],
            }),
          }}
        />
        <nav aria-label="Portfolio internal links" className="sr-only">
          <Link href="/">Home</Link>
          <Link href="/about">About Balaraj R</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/projects/vaidyos">VaidyaOS</Link>
          <Link href="/projects/agrisence">AgriSence</Link>
          <Link href="/projects/career-lens">Career Lens</Link>
          <Link href="/blogs">AI Engineering Blog</Link>
          <Link href="/contact">Contact Balaraj R</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
