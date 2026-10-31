import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  buildMetadata,
  safeJsonLd,
  siteGraph,
  staticSeo,
} from "@/lib/seo";
import SuppressThreeWarnings from "@/components/SuppressThreeWarnings";
import { ThemeProvider } from "@/context/ThemeContext";
import { CommandPalette } from "@/components/CommandPalette";

import { Outfit, Playfair_Display } from "next/font/google";
import { Cursor } from "@/components/motion/Cursor";
import { MotionRoot } from "@/components/motion/SmoothScroll";

const geistSans = localFont({
  src: "./fonts/geist-sans.woff2",
  variable: "--font-geist-sans",
  display: "swap",
  preload: false,
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = buildMetadata(staticSeo.home);

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F4EE" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Balaraj R | AI Engineering Blog"
          href="https://balaraj.me/rss.xml"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}if(sessionStorage.getItem('intro')){document.documentElement.dataset.seen='1';}else{sessionStorage.setItem('intro','1');}}catch(e){}})();`,
          }}
        />
        <noscript>
          <style>{`main [style*="opacity:0"],.roadmap-card,.reveal-word>span{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd({
              "@context": "https://schema.org",
              "@graph": siteGraph(),
            }),
          }}
        />
        <SuppressThreeWarnings />
        <ThemeProvider>
          <MotionRoot>
            <Cursor />
            <CommandPalette />
            {children}
          </MotionRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}
