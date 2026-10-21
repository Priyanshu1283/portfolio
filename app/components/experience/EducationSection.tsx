"use client";

import { portfolioData } from "@/app/data/portfolioData";
import { GraduationCap } from "lucide-react";

export default function EducationSection() {
  const { education } = portfolioData;

  return (
    <section id="education" className="scroll-mt-20">
      {/* Title Header */}
      <div className="w-full h-fit border-b">
        <div className="innerContainer px-4 py-2 sm:py-3 flex items-center justify-between">
          <h2 className="text1 font-bold text-2xl sm:text-3xl tracking-tight">
            Education
          </h2>
          <span className="text-[11px] font-mono text2 tracking-tight">
            04 / ACADEMIC BACKGROUND
          </span>
        </div>
      </div>

      {/* Content list */}
      <div className="w-full border-b h-fit">
        <div className="innerContainer py-4 px-2 sm:px-4 flex flex-col gap-3">
          {education.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between hover-bg2 rounded-xl p-3 transition-colors duration-150"
            >
              <div className="flex items-start gap-3">
                {/* Icon box */}
                <div className="flex size-7 items-center justify-center rounded-lg border flex-shrink-0 mt-0.5">
                  <div className="flex size-5 items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 bg3">
                    <GraduationCap className="size-3.5 text2" />
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col leading-tight">
                  <h3 className="text1 font-semibold text-sm sm:text-base tracking-tight">
                    {item.degree}
                  </h3>
                  <h4 className="text2 font-mono text-xs sm:text-sm mt-0.5">
                    {item.institution}
                  </h4>
                  {item.details && (
                    <p className="text-neutral-500 text-xs mt-1 leading-snug">
                      {item.details}
                    </p>
                  )}
                  {/* Score on Mobile */}
                  <div className="sm:hidden text2 font-mono text-xs mt-1.5 font-medium">
                    Score: {item.score} • {item.period}
                  </div>
                </div>
              </div>

              {/* Score & Period on Desktop */}
              <div className="hidden sm:flex flex-col items-end flex-shrink-0 pl-4 text-right">
                <span className="text1 font-mono text-xs font-semibold">
                  {item.score}
                </span>
                <span className="text2 font-mono text-xs mt-0.5">
                  {item.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
