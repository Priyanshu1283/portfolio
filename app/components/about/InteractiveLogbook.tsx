"use client";

import { useState } from "react";
import { portfolioData, CertificationItem } from "@/app/data/portfolioData";
import {
  BookOpen,
  Terminal,
  Award,
  ChevronLeft,
  ChevronRight,
  Play,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  X,
  FileCheck2
} from "lucide-react";
import confetti from "canvas-confetti";

const CERTS_PER_PAGE = 2;

export default function InteractiveLogbook() {
  const { logbookPages, certifications } = portfolioData;

  const [activeTab, setActiveTab] = useState<"logbook" | "terminal" | "certifications">("logbook");
  const [currentPage, setCurrentPage] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  // Certifications Pagination & Modal State
  const [certPage, setCertPage] = useState(0);
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  const totalCertPages = Math.ceil(certifications.length / CERTS_PER_PAGE);
  const startCertIndex = certPage * CERTS_PER_PAGE;
  const endCertIndex = Math.min(startCertIndex + CERTS_PER_PAGE, certifications.length);
  const displayedCerts = certifications.slice(startCertIndex, endCertIndex);

  const nextCertPage = () => {
    if (certPage < totalCertPages - 1) {
      setCertPage((prev) => prev + 1);
    }
  };

  const prevCertPage = () => {
    if (certPage > 0) {
      setCertPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < logbookPages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const runCode = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });

    setTerminalOutput([
      `> profile.speak()`,
      `"Hi, I'm Priyanshu Kumar, your next favorite developer."`,
      `> profile.hireable()`,
      `Status: true ✅ (hardWorker && problemSolver && skills.length >= 5 && alwaysCurious)`,
      `> Ready to build exceptional software together!`
    ]);
  };

  const codeString = `const profile = {
  name: "Priyanshu Kumar",
  title: "Full-Stack Developer | Problem Solver | Tech Explorer",
  skills: [
    "JavaScript", "TypeScript", "React", "Next.js",
    "Node.js", "Express", "MongoDB", "PostgreSQL",
    "TailwindCSS", "DSA", "WebSockets", "Cloudflare"
  ],
  traits: {
    hardWorker: true,
    problemSolver: true,
    alwaysCurious: true
  },
  hireable() {
    return (
      this.traits.hardWorker &&
      this.traits.problemSolver &&
      this.skills.length >= 5 &&
      this.traits.alwaysCurious
    );
  },
  speak() {
    console.log("Hi, I'm " + this.name + ", your next favorite developer");
  }
};

profile.speak();
console.log("Hireable? " + (profile.hireable() ? "Yes" : "Maybe later"));`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Certificate image component with elegant fallback
  const CertificateCardImage = ({ cert }: { cert: CertificationItem }) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgFailed, setImgFailed] = useState(false);

    return (
      <div className="relative w-full h-full overflow-hidden bg-neutral-950">
        {/* Fallback credential visual is rendered underneath */}
        {(!imgLoaded || imgFailed) && (
          <div className="w-full h-full bg-gradient-to-br from-amber-950/30 via-neutral-900 to-neutral-950 flex flex-col justify-between p-4 border border-amber-500/20 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex items-center justify-between z-10">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30">
                OFFICIAL CREDENTIAL
              </span>
              <span className="text-[10px] font-mono text-neutral-400">{cert.issueDate}</span>
            </div>

            <div className="flex flex-col gap-1 z-10 my-2">
              <div className="size-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
                <Award size={20} />
              </div>
              <span className="text-xs font-bold text-white line-clamp-1">{cert.title}</span>
              <span className="text-[11px] font-mono text-neutral-400">{cert.issuer}</span>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-neutral-800 pt-2 z-10">
              <span className="flex items-center gap-1 text-emerald-400">
                <FileCheck2 size={12} /> Verified &amp; Certified
              </span>
              <span className="text-amber-400 font-bold">★ ★ ★ ★ ★</span>
            </div>

            <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />
          </div>
        )}

        {/* Real certificate image from public/images/certifications/ fades in on load */}
        {cert.image && !imgFailed && (
          <img
            src={cert.image}
            alt={cert.title}
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
    <section id="studio" className="scroll-mt-20 relative">
      <span id="about" className="absolute -top-20" aria-hidden="true" />
      {/* Title Header */}
      <div className="w-full h-fit border-b">
        <div className="innerContainer px-4 py-2 sm:py-3 flex items-center justify-between">
          <h2 className="text1 font-bold text-2xl sm:text-3xl tracking-tight">
            Developer Studio
          </h2>
          <span className="text-[11px] font-mono text2 tracking-tight">
            01 / DEV STUDIO &amp; SPECS
          </span>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="w-full border-b">
        <div className="innerContainer px-4 py-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("logbook")}
            className={`
              px-3 py-1.5 rounded-md text-xs font-mono font-medium inline-flex items-center gap-1.5 transition-colors
              ${
                activeTab === "logbook"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text2 hover:text1 hover-bg2 border"
              }
            `}
          >
            <BookOpen size={13} /> Interactive Logbook
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("terminal")}
            className={`
              px-3 py-1.5 rounded-md text-xs font-mono font-medium inline-flex items-center gap-1.5 transition-colors
              ${
                activeTab === "terminal"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text2 hover:text1 hover-bg2 border"
              }
            `}
          >
            <Terminal size={13} /> developer.js
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("certifications")}
            className={`
              px-3 py-1.5 rounded-md text-xs font-mono font-medium inline-flex items-center gap-1.5 transition-colors
              ${
                activeTab === "certifications"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text2 hover:text1 hover-bg2 border"
              }
            `}
          >
            <Award size={13} /> Certifications ({certifications.length})
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="w-full border-b">
        <div className="innerContainer p-4 sm:p-6">
          {/* TAB 1: LOGBOOK */}
          {activeTab === "logbook" && (
            <div className="relative rounded-2xl border bg-white dark:bg-neutral-900 shadow-sm p-6 sm:p-8 overflow-hidden">
              {/* Spiral rings at the top */}
              <div className="absolute top-0 left-0 right-0 px-6 sm:px-12 flex justify-between pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center w-3">
                    <div className="w-1.5 h-4 rounded-full bg-neutral-300 dark:bg-neutral-700 shadow-xs -mt-2"></div>
                    <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-800 mt-1"></div>
                  </div>
                ))}
              </div>

              {/* Page Content */}
              <div className="mt-4 min-h-[220px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b pb-2 mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text1 tracking-tight">
                      {logbookPages[currentPage].title}
                    </h3>
                    <span className="text-xs font-mono text2">
                      Entry #{currentPage + 1}
                    </span>
                  </div>

                  <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300 whitespace-pre-line font-sans">
                    {logbookPages[currentPage].content}
                  </p>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between border-t pt-4 mt-6">
                  <button
                    type="button"
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium disabled:opacity-30 disabled:cursor-not-allowed hover-bg2 text1 transition-colors"
                  >
                    <ChevronLeft size={14} /> Prev
                  </button>

                  <span className="text-xs font-mono text2 tracking-widest">
                    {currentPage + 1} / {logbookPages.length}
                  </span>

                  <button
                    type="button"
                    onClick={nextPage}
                    disabled={currentPage === logbookPages.length - 1}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium disabled:opacity-30 disabled:cursor-not-allowed hover-bg2 text1 transition-colors"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TERMINAL / CODE RUNNER */}
          {activeTab === "terminal" && (
            <div className="rounded-2xl border bg-neutral-950 text-neutral-200 overflow-hidden shadow-lg font-mono text-xs">
              {/* Window bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800 bg-neutral-900/80">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-red-500/80"></span>
                  <span className="size-3 rounded-full bg-amber-500/80"></span>
                  <span className="size-3 rounded-full bg-emerald-500/80"></span>
                  <span className="ml-2 text-xs text-neutral-400">developer.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyCode}
                    className="p-1 rounded text-neutral-400 hover:text-white transition-colors"
                    title="Copy code"
                  >
                    {isCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                  <button
                    type="button"
                    onClick={runCode}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium text-[11px] transition-colors"
                  >
                    <Play size={12} /> Run Code
                  </button>
                </div>
              </div>

              {/* Code display */}
              <div className="p-4 overflow-x-auto text-[12px] leading-relaxed text-neutral-300">
                <pre>{codeString}</pre>
              </div>

              {/* Terminal Output Console */}
              {terminalOutput.length > 0 && (
                <div className="border-t border-neutral-800 bg-black/90 p-3.5 text-[11px] font-mono text-emerald-400 space-y-1">
                  <div className="text-neutral-500 uppercase text-[9px] tracking-wider mb-1">Console Output</div>
                  {terminalOutput.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CERTIFICATIONS (Smooth 2-Card Listing with Images) */}
          {activeTab === "certifications" && (
            <div className="space-y-4">
              {/* Certifications Sub-header & Counter */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b text-xs font-mono">
                <span className="text2">
                  Listing 2 per page • Click card to preview
                </span>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text2 border">
                    Showing {startCertIndex + 1}–{endCertIndex} of {certifications.length}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={prevCertPage}
                      disabled={certPage === 0}
                      className="size-7 rounded-md border flex items-center justify-center text2 hover:text1 hover-bg2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Previous certificates"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-[11px] text2 px-1">
                      {certPage + 1}/{totalCertPages}
                    </span>
                    <button
                      type="button"
                      onClick={nextCertPage}
                      disabled={certPage >= totalCertPages - 1}
                      className="size-7 rounded-md border flex items-center justify-center text2 hover:text1 hover-bg2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Next certificates"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 2-Certificates Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedCerts.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    className="group rounded-2xl border bg1 overflow-hidden shadow-xs hover:shadow-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Certificate Visual Banner / Image */}
                      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-neutral-950 border-b">
                        <CertificateCardImage cert={cert} />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <span className="px-3 py-1.5 rounded-lg bg-black/80 text-white font-mono text-xs border border-white/20 backdrop-blur-xs flex items-center gap-1.5 shadow-lg">
                            <Sparkles size={13} className="text-amber-400" /> Click to Inspect
                          </span>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-500 border border-blue-500/20 font-medium">
                            {cert.issueDate}
                          </span>
                          <span className="text-[11px] font-mono text2 font-semibold">
                            {cert.issuer}
                          </span>
                        </div>

                        <h4 className="font-bold text-base text1 leading-snug group-hover:underline">
                          {cert.title}
                        </h4>

                        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mt-2 line-clamp-2">
                          {cert.description}
                        </p>
                      </div>
                    </div>

                    {/* Tags Footer */}
                    <div className="p-4 pt-0">
                      <div className="pt-3 border-t flex items-center justify-between flex-wrap gap-1.5">
                        <div className="flex flex-wrap gap-1">
                          {cert.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text2 border"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <span className="text-[11px] font-mono text-amber-500 font-medium group-hover:translate-x-0.5 transition-transform">
                          View Credential ➔
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Pagination Bar for Certifications */}
              <div className="pt-3 border-t flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                <div className="flex items-center gap-1">
                  <span className="text2 mr-2">Page {certPage + 1} of {totalCertPages}</span>
                  {Array.from({ length: totalCertPages }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCertPage(idx)}
                      className={`size-6 rounded-md font-mono text-[11px] font-medium transition-colors ${
                        certPage === idx
                          ? "bg-black text-white dark:bg-white dark:text-black font-bold"
                          : "border text2 hover:text1 hover-bg2"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevCertPage}
                    disabled={certPage === 0}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium disabled:opacity-30 disabled:cursor-not-allowed hover-bg2 text1 transition-colors"
                  >
                    <ChevronLeft size={14} /> Previous 2
                  </button>

                  <button
                    type="button"
                    onClick={nextCertPage}
                    disabled={certPage >= totalCertPages - 1}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium disabled:opacity-30 disabled:cursor-not-allowed hover-bg2 text1 transition-colors"
                  >
                    Next 2 <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Detail Inspection Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg1 border rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Certificate Image / Banner */}
            <div className="relative h-52 sm:h-60 w-full bg-neutral-950 flex-shrink-0">
              <CertificateCardImage cert={selectedCert} />

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 size-8 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors z-20"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-black/70 text-white backdrop-blur-md border border-white/20">
                  {selectedCert.issuer}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500 text-black font-bold flex items-center gap-1">
                  Issued {selectedCert.issueDate}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <h3 className="text-xl font-bold text1 tracking-tight">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text2 font-mono mt-1">
                  Issued by {selectedCert.issuer} • Class of {selectedCert.issueDate}
                </p>
              </div>

              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                {selectedCert.description}
              </p>

              <div>
                <span className="text-[11px] font-mono text2 uppercase tracking-wider block mb-2 font-semibold">
                  Competencies &amp; Skills Verified
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-500 font-medium flex items-center gap-1.5">
                  <FileCheck2 size={15} /> Verified Credential
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black font-semibold text-xs tracking-tight hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
