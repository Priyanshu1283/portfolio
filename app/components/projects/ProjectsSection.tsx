"use client";

import { useState } from "react";
import { projects, ProjectItem } from "@/app/data/projects";
import {
  ArrowUpRight,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  FolderGit2
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const ITEMS_PER_PAGE = 2;

export default function ProjectsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, projects.length);
  const displayedProjects = projects.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Dynamic visual fallback centered mockup graphic when screenshot is not yet in public/images/projects/
  const renderFallbackVisual = (project: ProjectItem) => {
    switch (project.id) {
      case "betterdrive":
        return (
          <div className="w-full h-full bg-gradient-to-br from-blue-950/60 via-slate-900 to-neutral-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="flex flex-col items-center gap-2.5 z-10 -mt-3">
              <div className="size-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-2xl shadow-lg backdrop-blur-xs">
                📁
              </div>
              <div className="w-36 h-2 rounded-full bg-neutral-800/80 overflow-hidden border border-neutral-700/50">
                <div className="w-2/3 h-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
              </div>
              <span className="text-[10px] font-mono text-blue-400/80 tracking-wider">
                Cloud Vault v2.4
              </span>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl"></div>
          </div>
        );

      case "societysync":
        return (
          <div className="w-full h-full bg-gradient-to-br from-emerald-950/60 via-slate-900 to-neutral-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="flex flex-col items-center gap-2.5 z-10 -mt-3">
              <div className="size-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-lg backdrop-blur-xs">
                🏢
              </div>
              <div className="flex gap-1.5">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-neutral-800/80 text-emerald-400 border border-emerald-500/20">Admin</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-neutral-800/80 text-neutral-300 border border-neutral-700/50">Resident</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-neutral-800/80 text-neutral-300 border border-neutral-700/50">Pass</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400/80 tracking-wider">
                Live Community Sync
              </span>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-emerald-500/10 blur-2xl"></div>
          </div>
        );

      case "tmdb-cineclair":
        return (
          <div className="w-full h-full bg-gradient-to-br from-pink-950/60 via-purple-950/40 to-neutral-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="flex flex-col items-center gap-2.5 z-10 -mt-3">
              <div className="size-12 rounded-2xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-2xl shadow-lg backdrop-blur-xs">
                🎬
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-neutral-900/60 px-2.5 py-1 rounded-full border border-neutral-800">
                ★★★★★ <span className="text-neutral-400 text-[10px]">8.9/10</span>
              </div>
              <span className="text-[10px] font-mono text-pink-400/80 tracking-wider">
                TMDB Cinema Explorer
              </span>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-pink-500/10 blur-2xl"></div>
          </div>
        );

      case "weathernow-ai":
        return (
          <div className="w-full h-full bg-gradient-to-br from-cyan-950/60 via-sky-950/40 to-neutral-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="flex flex-col items-center gap-2.5 z-10 -mt-3">
              <div className="size-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-lg backdrop-blur-xs">
                🌦️
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/60 border border-cyan-500/20 text-[10px] font-mono text-cyan-300">
                <span>26°C Clear</span>
                <span>•</span>
                <span>Doppler Active</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400/80 tracking-wider">
                Global Meteorological AI
              </span>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-cyan-500/10 blur-2xl"></div>
          </div>
        );

      case "leetcode-hider":
        return (
          <div className="w-full h-full bg-gradient-to-br from-amber-950/60 via-neutral-900 to-neutral-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="flex flex-col items-center gap-2.5 z-10 -mt-3">
              <div className="size-12 rounded-2xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-2xl shadow-lg backdrop-blur-xs">
                ⚡
              </div>
              <div className="px-3 py-1 rounded-full bg-neutral-900/60 border border-amber-500/20 text-[10px] font-mono text-neutral-300">
                [Easy / Med / Hard] ➔ [Hidden]
              </div>
              <span className="text-[10px] font-mono text-amber-400/80 tracking-wider">
                Focus Mode Chrome Tool
              </span>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-amber-500/10 blur-2xl"></div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-violet-950/60 via-neutral-900 to-neutral-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="flex flex-col items-center gap-2.5 z-10 -mt-3">
              <div className="size-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-2xl shadow-lg backdrop-blur-xs">
                💬
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/60 border border-violet-500/20 text-[10px] font-mono text-violet-300">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>WebRTC P2P Active</span>
              </div>
              <span className="text-[10px] font-mono text-violet-400/80 tracking-wider">
                Socket.io Instant Rooms
              </span>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-violet-500/10 blur-2xl"></div>
          </div>
        );
    }
  };

  // Project Image Component with seamless fallback until image onLoad completes
  const ProjectCardImage = ({ project }: { project: ProjectItem }) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgFailed, setImgFailed] = useState(false);

    return (
      <div className="relative w-full h-full overflow-hidden bg-neutral-950">
        {/* Fallback mockup visual is always displayed underneath */}
        {(!imgLoaded || imgFailed) && renderFallbackVisual(project)}

        {/* Real screenshot from public/images/projects/ fades in cleanly on load */}
        {project.image && !imgFailed && (
          <img
            src={project.image}
            alt={project.imageAlt || project.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
            className={`w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500 absolute inset-0 ${
              imgLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        )}
      </div>
    );
  };

  return (
    <section id="projects" className="scroll-mt-20">
      {/* Title Header */}
      <div className="w-full h-fit border-b">
        <div className="innerContainer px-4 py-2 sm:py-3 flex items-center justify-between">
          <h2 className="text1 font-bold text-2xl sm:text-3xl tracking-tight">
            Projects
          </h2>
          <span className="text-[11px] font-mono text2 tracking-tight">
            03 / FEATURED WORK
          </span>
        </div>
      </div>

      {/* Subtitle & Listing Counter Bar */}
      <div className="w-full border-b">
        <div className="innerContainer py-3 sm:py-3.5 flex items-center justify-between px-4 flex-wrap gap-2 text-xs font-mono">
          <p className="text2 tracking-tight">
            Curated systems &amp; tools • Listing 2 per page
          </p>

          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text2 border">
              Showing {startIndex + 1}–{endIndex} of {projects.length}
            </span>

            {/* Pagination Controls in Header */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="size-7 rounded-md border flex items-center justify-center text2 hover:text1 hover-bg2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Previous 2 projects"
                aria-label="Previous projects"
              >
                <ChevronLeft size={14} />
              </button>

              <span className="text-[11px] text2 tracking-wider px-1">
                {currentPage + 1}/{totalPages}
              </span>

              <button
                type="button"
                onClick={nextPage}
                disabled={currentPage >= totalPages - 1}
                className="size-7 rounded-md border flex items-center justify-center text2 hover:text1 hover-bg2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Next 2 projects"
                aria-label="Next projects"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Project Cards Grid (Smooth Listing) */}
      <div className="w-full border-b h-fit">
        <div className="innerContainer py-5 px-3 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group rounded-2xl border bg1 overflow-hidden shadow-xs hover:shadow-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Card Image Banner */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-neutral-950 border-b">
                  <ProjectCardImage project={project} />

                  {/* Top Overlay Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-black/70 text-white backdrop-blur-md border border-white/10 uppercase tracking-wider">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/80 text-black font-semibold backdrop-blur-md flex items-center gap-1 shadow-xs">
                        <Sparkles size={10} /> Featured
                      </span>
                    )}
                  </div>

                  {/* Bottom Gradient with Title Overlay */}
                  <div className="absolute inset-x-0 bottom-0 pt-10 pb-3 px-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-between z-10">
                    <div>
                      <h3 className="text-white font-bold text-lg sm:text-xl drop-shadow-sm group-hover:underline">
                        {project.title}
                      </h3>
                      <p className="text-neutral-300 text-xs font-mono truncate max-w-[240px] sm:max-w-xs mt-0.5">
                        {project.tagline}
                      </p>
                    </div>

                    <div className="size-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-45 transition-all duration-200">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-2 border-t flex items-center justify-between flex-wrap gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text2 border"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text2">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-mono font-medium text-blue-500 dark:text-blue-400 group-hover:underline inline-flex items-center gap-1">
                      Details &amp; Demo ➔
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Pagination Controls Bar */}
          <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text2">Page {currentPage + 1} of {totalPages}</span>
              <div className="flex items-center gap-1 ml-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentPage(idx)}
                    className={`size-6 rounded-md font-mono text-[11px] font-medium transition-colors ${
                      currentPage === idx
                        ? "bg-black text-white dark:bg-white dark:text-black font-bold"
                        : "border text2 hover:text1 hover-bg2"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium disabled:opacity-30 disabled:cursor-not-allowed hover-bg2 text1 transition-colors"
              >
                <ChevronLeft size={14} /> Previous 2
              </button>

              <button
                type="button"
                onClick={nextPage}
                disabled={currentPage >= totalPages - 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium disabled:opacity-30 disabled:cursor-not-allowed hover-bg2 text1 transition-colors"
              >
                Next 2 <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* More on GitHub row */}
      <div className="w-full border-b">
        <div className="innerContainer h-9 sm:h-10 flex items-center justify-end px-4">
          <a
            href="https://github.com/Priyanshu1283?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-mono text1 underline hover:text-blue-500 inline-flex items-center gap-1 transition-colors"
          >
            More Projects on GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg1 border rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-56 sm:h-64 w-full bg-neutral-950 flex-shrink-0">
              <ProjectCardImage project={selectedProject} />

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 size-8 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors z-20"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-black/70 text-white backdrop-blur-md border border-white/20">
                  {selectedProject.category}
                </span>
                {selectedProject.featured && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500 text-black font-bold flex items-center gap-1">
                    <Sparkles size={11} /> Featured Project
                  </span>
                )}
              </div>
            </div>

            {/* Modal Content Details */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <h3 className="text-2xl font-bold text1 tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text2 font-mono mt-1">
                  {selectedProject.tagline}
                </p>
              </div>

              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                {selectedProject.description}
              </p>

              {/* Tech Badges */}
              <div>
                <span className="text-[11px] font-mono text2 uppercase tracking-wider block mb-2 font-semibold">
                  Technologies &amp; Architecture
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white dark:bg-white dark:text-black font-semibold text-xs tracking-tight hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text1 font-semibold text-xs tracking-tight hover-bg2 transition-colors"
                  >
                    <FaGithub size={14} /> Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
