export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Full Stack" | "Frontend" | "Backend" | "Extension" | "Mobile" | "AI / ML" | string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  imageAlt: string;
  color: string;
  image?: string;
}

/**
 * Projects Data Seed
 * You can edit, add, or remove projects here.
 * Place your project screenshot images in: public/images/projects/
 * e.g. public/images/projects/betterdrive.png
 */
export const projectsData: ProjectItem[] = [
  {
    id: "betterdrive",
    title: "BetterDrive",
    tagline: "Google Drive That Feels Right",
    description: "A fast, privacy-conscious cloud file management system featuring seamless file upload pipelines, nested folders, thumbnail generation, real-time sync, and granular access controls.",
    category: "Full Stack",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Appwrite/S3", "Lucide"],
    liveUrl: "https://betterdrive-demo.vercel.app",
    githubUrl: "https://github.com/Priyanshu1283/betterdrive",
    featured: true,
    imageAlt: "BetterDrive Cloud Storage Interface",
    color: "#3b82f6",
    image: "/images/projects/betterdrive.png"
  },
  {
    id: "societysync",
    title: "SocietySync",
    tagline: "Residential Community Management Platform",
    description: "Comprehensive community management portal with role-based access control (Admin, Resident, Security), visitor pass generation, billing, maintenance ticket tracking, and announcement feeds.",
    category: "Full Stack",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind"],
    liveUrl: "https://societysync.vercel.app",
    githubUrl: "https://github.com/Priyanshu1283/societysync",
    featured: true,
    imageAlt: "SocietySync residential management system",
    color: "#10b981",
    image: "/images/projects/societysync.png"
  },
  {
    id: "tmdb-cineclair",
    title: "CineClair TMDB Hub",
    tagline: "Intelligent Movie & TV Discovery Hub",
    description: "High-performance cinema discovery application utilizing TMDB v3 API with dynamic keyword filtering, interactive trailers, actor filmography graphs, and user watchlists.",
    category: "Frontend",
    tags: ["React", "Redux Toolkit", "TMDB API", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://tmdb-movie-pranshu.vercel.app",
    githubUrl: "https://github.com/Priyanshu1283/tmdb-movie-app",
    featured: true,
    imageAlt: "CineClair TMDB Movie Explorer",
    color: "#ec4899",
    image: "/images/projects/tmdb-cineclair.png"
  },
  {
    id: "weathernow-ai",
    title: "WeatherNow AI",
    tagline: "Next-Gen Meteorological Forecast Dashboard",
    description: "Real-time global weather intelligence dashboard providing hyper-local forecasts, interactive precipitation radar, UV index warnings, and 7-day temperature trends.",
    category: "Full Stack",
    tags: ["Next.js 15", "OpenWeatherMap API", "Chart.js", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://weathernowai.vercel.app",
    githubUrl: "https://github.com/Priyanshu1283/WeatherNowAi",
    featured: true,
    imageAlt: "WeatherNow AI real-time meteorological portal",
    color: "#06b6d4",
    image: "/images/projects/weathernow-ai.png"
  },
  {
    id: "leetcode-hider",
    title: "LeetCode Difficulty Hider",
    tagline: "Distraction-Free Problem Solving Extension",
    description: "Chrome Web Store extension that conceals problem difficulty tags, acceptance rates, and related topics to encourage pure problem analysis without psychological bias.",
    category: "Extension",
    tags: ["Chrome Extensions API", "JavaScript", "DOM MutationObserver", "CSS"],
    liveUrl: "https://chromewebstore.google.com",
    githubUrl: "https://github.com/Priyanshu1283/leetcode-difficulty-hider",
    featured: false,
    imageAlt: "LeetCode difficulty hider chrome extension",
    color: "#f59e0b",
    image: "/images/projects/leetcode-hider.png"
  },
  {
    id: "livelychat",
    title: "LivelyChat",
    tagline: "Low-Latency Messaging & WebRTC Rooms",
    description: "Real-time communication suite supporting one-on-one encrypted messaging, group channels, typing indicators, presence indicators, and WebRTC peer-to-peer audio/video streaming.",
    category: "Full Stack",
    tags: ["WebSockets", "Socket.io", "React", "Node.js", "WebRTC", "Express"],
    liveUrl: "https://livelychat.vercel.app",
    githubUrl: "https://github.com/Priyanshu1283/livelychat",
    featured: false,
    imageAlt: "LivelyChat real time chat system",
    color: "#8b5cf6",
    image: "/images/projects/livelychat.png"
  }
];

export const projects = projectsData;
export default projectsData;
