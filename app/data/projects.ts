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
  
  
];

export const projects = projectsData;
export default projectsData;
