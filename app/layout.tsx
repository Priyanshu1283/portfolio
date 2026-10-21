import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" }
  ],
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pranshu.indevs.in"),
  title: {
    default: "Priyanshu Kumar — Full-Stack Software Engineer & MERN Architect",
    template: "%s | Priyanshu Kumar"
  },
  icons: {
    icon: "/icons/logo.jpeg",
    shortcut: "/icons/logo.jpeg",
    apple: "/icons/logo.jpeg"
  },
  description:
    "Portfolio of Priyanshu Kumar (Pranshu) — Full-Stack Software Engineer specializing in Next.js, React, Node.js, Express, MongoDB, and high-performance web systems. 700+ DSA problems solved.",
  keywords: [
    "Priyanshu Kumar",
    "Pranshu",
    "Priyanshu developer",
    "Pranshu developer",
    "Full-Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer India",
    "Software Engineer Portfolio",
    "React Engineer",
    "Bhopal Developer"
  ],
  authors: [{ name: "Priyanshu Kumar", url: "https://pranshu.indevs.in" }],
  creator: "Priyanshu Kumar",
  publisher: "Priyanshu Kumar",
  alternates: {
    canonical: "https://pranshu.indevs.in"
  },
  openGraph: {
    title: "Priyanshu Kumar — Full-Stack Software Engineer",
    description:
      "Crafting high-performance web applications, scalable backends, and modern interfaces. Explore projects, tech stack, and achievements.",
    url: "https://pranshu.indevs.in",
    siteName: "Priyanshu Kumar Portfolio",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanshu Kumar — Full-Stack Software Engineer",
    description:
      "Full-Stack Engineer building modern web applications with Next.js, React, Node.js, and TypeScript.",
    creator: "@ShivamS89004941"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Priyanshu Kumar",
    alternateName: "Pranshu",
    jobTitle: "Full-Stack Software Engineer",
    url: "https://pranshu.indevs.in",
    sameAs: [
      "https://github.com/Priyanshu1283",
      "https://www.linkedin.com/in/priyanshu-kumar-03310a253/",
      "https://leetcode.com/u/Pranshu_066/",
      "https://x.com/ShivamS89004941"
    ],
    knowsAbout: [
      "Full-Stack Development",
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TypeScript",
      "Data Structures and Algorithms",
      "Tailwind CSS"
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bhopal",
      addressRegion: "Madhya Pradesh",
      addressCountry: "India"
    }
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