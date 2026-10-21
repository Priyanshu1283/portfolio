"use client";

import { useState } from "react";
import { portfolioData, StackItem } from "@/app/data/portfolioData";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiPostman,
  SiGit,
  SiCloudflare,
  SiVercel,
  SiCplusplus
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { TbApi } from "react-icons/tb";

export default function StackGrid() {
  const { stack } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Languages", "Frontend", "Backend & DB", "Tools & Cloud"];

  const filteredStack =
    activeCategory === "All"
      ? stack
      : stack.filter((s) => s.category === activeCategory);

  const getTechIcon = (name: string) => {
    switch (name) {
      case "TypeScript":
        return <SiTypescript className="size-6 text-[#3178c6]" />;
      case "JavaScript":
        return <SiJavascript className="size-6 text-[#f7df1e]" />;
      case "Java":
        return <FaJava className="size-6 text-[#e76f00]" />;
      case "C++":
        return <SiCplusplus className="size-6 text-[#00599c]" />;
      case "React":
        return <SiReact className="size-6 text-[#61dafb]" />;
      case "Next.js":
        return <SiNextdotjs className="size-6 text-black dark:text-white" />;
      case "Tailwind CSS":
        return <SiTailwindcss className="size-6 text-[#06b6d4]" />;
      case "Framer Motion":
        return <SiFramer className="size-6 text-[#f01a7d]" />;
      case "Three.js":
        return <SiThreedotjs className="size-6 text-black dark:text-white" />;
      case "Redux Toolkit":
        return <SiRedux className="size-6 text-[#764abc]" />;
      case "Node.js":
        return <SiNodedotjs className="size-6 text-[#339933]" />;
      case "Express.js":
        return <SiExpress className="size-6 text-black dark:text-white" />;
      case "MongoDB":
        return <SiMongodb className="size-6 text-[#47a248]" />;
      case "PostgreSQL":
        return <SiPostgresql className="size-6 text-[#4169e1]" />;
      case "Redis":
        return <SiRedis className="size-6 text-[#dc382d]" />;
      case "REST APIs":
        return <TbApi className="size-6 text-[#ff5722]" />;
      case "Postman":
        return <SiPostman className="size-6 text-[#ff6c37]" />;
      case "Git & GitHub":
        return <SiGit className="size-6 text-[#f05032]" />;
      case "Cloudflare Workers":
        return <SiCloudflare className="size-6 text-[#f38020]" />;
      case "Vercel":
        return <SiVercel className="size-6 text-black dark:text-white" />;
      default:
        return <span className="text-xs font-mono font-bold">{name.slice(0, 2)}</span>;
    }
  };

  const renderTechCard = (tech: StackItem, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${tech.name}`}
      className="relative group/tech flex-shrink-0"
    >
      {/* Icon Card */}
      <div
        className="
          size-13 sm:size-14 flex items-center justify-center rounded-xl border
          bg-white dark:bg-neutral-900 shadow-xs hover:scale-110 hover:border-neutral-400 dark:hover:border-neutral-600
          transition-all duration-200 cursor-pointer
        "
      >
        {getTechIcon(tech.name)}
      </div>

      {/* Floating Tooltip */}
      <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover/tech:opacity-100 transition-all duration-200 pointer-events-none z-40 flex flex-col items-center">
        <div className="tooltip-box text-[11px] font-mono px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap">
          <span className="font-semibold">{tech.name}</span>
          <span className="opacity-70 ml-1.5 text-[10px]">({tech.level})</span>
        </div>
        <div className="tooltip-pointer w-2 h-2 rotate-45 -mt-1" />
      </div>
    </div>
  );

  return (
    <section id="stack" className="scroll-mt-20">
      {/* Header */}
      <div className="w-full h-fit border-b">
        <div className="innerContainer px-4 py-2 sm:py-3 flex items-center justify-between">
          <h2 className="text1 font-bold text-2xl sm:text-3xl tracking-tight">
            Stack
          </h2>
          <span className="text-[11px] font-mono text2 tracking-tight">
            02 / TECH ARSENAL
          </span>
        </div>
      </div>

      {/* Category filter pills & motion status */}
      <div className="w-full border-b">
        <div className="innerContainer px-4 py-2 flex items-center justify-between flex-wrap gap-2">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-colors
                  ${
                    activeCategory === cat
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text2 hover:text1 hover-bg2 border"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-mono text2 tracking-tight hidden sm:block">
            {activeCategory === "All"
              ? "⚡ Moving right to left • Hover to pause"
              : `${filteredStack.length} tools in ${activeCategory}`}
          </span>
        </div>
      </div>

      {/* Single Line Horizontal Moving Tech Stack */}
      <div className="w-full border-b overflow-hidden relative">
        <div className="innerContainer py-7 sm:py-8 relative overflow-hidden">
          {/* Subtle edge fade overlays for marquee */}
          {activeCategory === "All" && (
            <>
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[var(--bg1)] to-transparent z-20" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[var(--bg1)] to-transparent z-20" />
            </>
          )}

          {activeCategory === "All" ? (
            /* Infinite Marquee moving Right to Left */
            <div className="flex w-max animate-marquee-left gap-4 sm:gap-6 items-center py-2">
              {/* First full set */}
              {stack.map((tech) => renderTechCard(tech, "set1"))}
              {/* Second identical set for seamless continuous looping */}
              {stack.map((tech) => renderTechCard(tech, "set2"))}
            </div>
          ) : (
            /* Single-line centered row for filtered category */
            <div className="flex flex-nowrap items-center justify-center gap-4 sm:gap-6 overflow-x-auto py-2 px-4 no-scrollbar">
              {filteredStack.map((tech) => renderTechCard(tech, "filtered"))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
