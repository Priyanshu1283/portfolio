"use client";

import { portfolioData } from "@/app/data/portfolioData";
import { ArrowUpRight, Award, Code2, Sparkles } from "lucide-react";

export default function AboutSection() {
  const { profile } = portfolioData;

  return (
    <section id="about" className="scroll-mt-20">
      {/* Header bar */}
      <div className="w-full h-fit border-b">
        <div className="innerContainer px-4 py-2 sm:py-3 flex items-center justify-between">
          <h2 className="text1 font-bold text-2xl sm:text-3xl tracking-tight">
            About
          </h2>
          <span className="text-[11px] font-mono text2 tracking-tight">
            01 / OVERVIEW
          </span>
        </div>
      </div>

      {/* Content body */}
      <div className="w-full border-b">
        <div className="innerContainer h-full px-4 text-[15px] leading-relaxed">
          <div className="flex flex-col gap-4 tracking-tight py-6 text1">
            <ul className="list-disc pl-5 flex flex-col gap-3.5 marker:text-neutral-300 dark:marker:text-neutral-700">
              <li>
                <span className="font-semibold">Full-Stack Software Engineer</span>{" "}
                driven by the craft of building scalable digital architectures, responsive web interfaces, and high-performance server pipelines.
              </li>
              <li>
                Proficient in modern full-stack paradigms with{" "}
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  Next.js, React, Node.js, Express, TypeScript, and MongoDB
                </span>
                , complemented by deep algorithmic understanding.
              </li>
              <li>
                Graduate of{" "}
                <span className="font-medium italic">Sheryians Coding School</span>{" "}
                (FrontEnd Domination), mastering advanced JavaScript internals, reactive state, and cinematic UI animations.
              </li>
              <li>
                Enthusiastic about turning ideas into reality through fastidious personal projects and open-source contributions.
              </li>

              {/* Highlights Sub-list */}
              <li className="pt-2">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                  <Sparkles size={16} className="text-amber-500 inline" />
                  Key Highlights &amp; Accomplishments
                </span>
                <ul className="list-disc pl-6 mt-3 flex flex-col gap-2.5 marker:text-neutral-300 dark:marker:text-neutral-700">
                  {profile.highlights.map((h, i) => (
                    <li key={i}>
                      <span className="font-medium">{h.label}</span> —{" "}
                      <span className="text2">{h.detail}</span>{" "}
                      {h.link && (
                        <a
                          href={h.link}
                          target={h.link.startsWith("http") ? "_blank" : undefined}
                          rel={h.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text1 underline font-medium hover:text-blue-500 inline-flex items-center gap-0.5 ml-1"
                        >
                          View <ArrowUpRight size={13} />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
