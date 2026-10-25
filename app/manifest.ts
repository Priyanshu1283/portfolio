import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Priyanshu Kumar — Portfolio",
    short_name: "Pranshu",
    description:
      "Full-Stack Software Engineer specializing in modern web applications, Next.js, React, Node.js, and high-performance backends.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f0f",
    theme_color: "#000000",
    icons: [
      {
        src: "/icons/logo.jpeg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/icons/logo.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
