"use client";

import { useRef, useState } from "react";
import { portfolioData } from "@/app/data/portfolioData";
import { ArrowUpRight } from "lucide-react";

export default function StatusBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.12;
    const deltaY = (e.clientY - centerY) * 0.12;
    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="w-full border-b scroll-mt-20" id="hero">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="innerContainer relative overflow-hidden min-h-[230px] sm:min-h-[260px] md:min-h-[280px] flex items-center justify-center pt-8 pb-10 sm:pt-10 sm:pb-12 px-4"
      >
        {/* Dot Matrix background */}
        <div className="absolute inset-0 bg-dot-matrix bg-center pointer-events-none" />

        {/* Magnetic interactive banner */}
        <div
          className="relative z-10 transition-transform duration-300 ease-out will-change-transform text-center flex flex-col items-center justify-center"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`
          }}
        >
          {/* Available Now pill badge with clear clearance */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300/80 dark:border-neutral-700 bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md mb-3.5 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-medium tracking-tight text2 uppercase">
              Available Now
            </span>
          </div>

          <div className="text2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-tight hover:text1 transition-colors duration-200">
            <a
              href={`mailto:${portfolioData.profile.email}?subject=Let's connect&body=Hi Priyanshu,`}
              className="group inline-flex flex-col items-center cursor-pointer select-none"
            >
              <span className="group-hover:underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-600">
                Open for full-time
              </span>
              <span className="group-hover:underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-600 inline-flex items-center gap-1">
                &amp; freelance work
                <ArrowUpRight
                  size={18}
                  className="inline opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
