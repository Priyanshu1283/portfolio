import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pranshu.indevs.in"),
  title: {
    default: "Priyanshu Kumar — Full-Stack Software Engineer & MERN Architect",
    template: "%s | Priyanshu Kumar",
  },
description:
  "Priyanshu Kumar (Pranshu) is a Full-Stack Developer specializing in Next.js, React, TypeScript, Node.js, Express.js, and MongoDB. Explore his projects, backend architecture, REST APIs, AI-powered applications, and scalable web development solutions.",

keywords: [
  "Priyanshu Kumar",
  "Pranshu",
  "Priyanshu Kumar Portfolio",
  "Pranshu Developer",
  "Full Stack Developer",
  "Full Stack Developer Portfolio",
  "Next.js Developer",
  "React.js Developer",
  "Node.js Developer",
  "MERN Stack Developer",
  "TypeScript Developer",
  "JavaScript Developer",
  "Backend Developer",
  "Software Engineer Portfolio",
  "REST API Development",
  "Microservices Architecture",
  "AI-Powered Web Applications",
  "MongoDB Developer",
  "Docker and AWS",
  "Data Structures and Algorithms",
  "LeetCode",
  "LNCT Bhopal ECE"
],

  authors: [{ name: "Priyanshu Kumar", url: "https://pranshu.indevs.in" }],
  creator: "Priyanshu Kumar",
  publisher: "Priyanshu Kumar",
  category: "Technology",
  classification: "Software Engineering Portfolio",
  alternates: {
    canonical: "https://pranshu.indevs.in",
  },
  icons: {
    icon: [
      { url: "/icons/logo.jpeg", sizes: "32x32", type: "image/jpeg" },
      { url: "/icons/logo.jpeg", sizes: "192x192", type: "image/jpeg" },
    ],
    shortcut: "/icons/logo.jpeg",
    apple: "/icons/logo.jpeg",
  },
  openGraph: {
    title: "Priyanshu Kumar — Full-Stack Software Engineer & MERN Architect",
    description:
      "Crafting high-performance web applications, scalable backends, and responsive user experiences. 700+ DSA solved. Open for software engineering roles.",
    url: "https://pranshu.indevs.in",
    siteName: "Priyanshu Kumar (Pranshu) Portfolio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/DP/DP1.jpeg",
        width: 800,
        height: 800,
        alt: "Priyanshu Kumar — Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu Kumar — Full-Stack Software Engineer",
    description:
      "Full-Stack Engineer building modern web apps with Next.js, React, Node.js, and TypeScript. 700+ DSA problems solved.",
    creator: "@ShivamS89004941",
    images: ["/images/DP/DP1.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://pranshu.indevs.in/#person",
        name: "Priyanshu Kumar",
        alternateName: "Pranshu",
        jobTitle: "Full-Stack Software Engineer",
        url: "https://pranshu.indevs.in",
        image: "https://pranshu.indevs.in/images/DP/DP1.jpeg",
        sameAs: [
          "https://github.com/Priyanshu1283",
          "https://www.linkedin.com/in/priyanshu-kumar-03310a253/",
          "https://leetcode.com/u/Pranshu_066/",
          "https://x.com/ShivamS89004941",
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Lakshmi Narain College of Technology (LNCT), Bhopal",
        },
        knowsAbout: [
          "Full-Stack Development",
          "Next.js",
          "React.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "TypeScript",
          "Data Structures and Algorithms",
          "Cloudflare Workers",
          "Salesforce Agentforce",
          "Tailwind CSS",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kolkata",
          addressRegion: "West Bengal",
          addressCountry: "India",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://pranshu.indevs.in/#website",
        url: "https://pranshu.indevs.in",
        name: "Priyanshu Kumar — Portfolio",
        description:
          "Portfolio of Priyanshu Kumar — Full-Stack Software Engineer specializing in Next.js, React, Node.js, Express, and MongoDB.",
        publisher: {
          "@id": "https://pranshu.indevs.in/#person",
        },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icons/logo.jpeg" type="image/jpeg" />
        <link rel="shortcut icon" href="/icons/logo.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/icons/logo.jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg1 text1 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}