import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Sameer Gupta | Software Engineer, Backend & Full-Stack Developer",
    template: "%s | Sameer Gupta",
  },
  description:
    "Sameer Gupta is a software engineer from IIIT Kota specialising in backend, distributed systems and full-stack development (Next.js, Node.js, TypeScript, Python). Product Engineer at Shipsy, Codeforces Expert (1657), Smart India Hackathon 2024 National Finalist, and builder of NextFlow, a production LLM workflow orchestrator.",
  keywords: [
    "Sameer Gupta",
    "Sameer Gupta IIIT Kota",
    "Sameer Gupta software engineer",
    "Sameer Gupta developer",
    "Sameer Gupta portfolio",
    "Sameer Gupta Shipsy",
    "Guptasameer533",
    "backend engineer India",
    "full stack developer",
    "distributed systems engineer",
    "Next.js developer",
    "Node.js developer",
    "Codeforces Expert",
    "IIIT Kota",
  ],
  authors: [{ name: "Sameer Gupta", url: siteConfig.url }],
  creator: "Sameer Gupta",
  publisher: "Sameer Gupta",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Sameer Gupta | Portfolio",
    title: "Sameer Gupta | Software Engineer, Backend & Full-Stack Developer",
    description:
      "Backend & distributed systems engineer from IIIT Kota. Product Engineer at Shipsy · Codeforces Expert 1657 · SIH 2024 National Finalist · Builder of NextFlow.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sameer Gupta | Software Engineer",
    description:
      "Backend & distributed systems engineer. Codeforces Expert 1657 · SIH 2024 National Finalist · Builder of NextFlow, a production LLM workflow orchestrator.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sameer Gupta",
  url: siteConfig.url,
  image: `${siteConfig.url}/sameer.jpg`,
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Shipsy",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Information Technology, Kota",
  },
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gurugram",
    addressCountry: "IN",
  },
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.leetcode,
    siteConfig.links.codeforces,
    siteConfig.links.codechef,
  ],
  knowsAbout: [
    "Software Engineering",
    "Backend Development",
    "Distributed Systems",
    "Full-Stack Development",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Python",
    "Competitive Programming",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${caveat.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
