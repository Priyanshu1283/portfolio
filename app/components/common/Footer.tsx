"use client";

import { useEffect, useState } from "react";
import { portfolioData } from "@/app/data/portfolioData";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const { profile, quotes } = portfolioData;
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="w-full min-h-[26vh] md:h-[30vh] border-b">
        <div className="innerContainer h-full flex flex-col md:flex-row justify-between md:items-end p-4 py-8 md:pt-6">
          {/* Right column (Desktop order-2): Dynamic Quote Rotator */}
          <div className="flex flex-col items-center md:items-end justify-between md:h-full w-full md:w-3/5 md:order-2 mb-6 md:mb-0">
            {/* Top prompt */}
            <div className="text-xs font-mono text2 tracking-tight text-center md:text-right mb-2">
              <span className="inline-block px-2 py-0.5 rounded border border-neutral-300 dark:border-neutral-700">
                Seeking ambitious engineering challenges.
              </span>
            </div>

            {/* Quote container */}
            <div className="relative h-14 overflow-hidden text2 font-mono text-xs sm:text-sm w-full text-center md:text-right">
              <div
                className="transition-transform duration-700 ease-out flex flex-col"
                style={{ transform: `translateY(-${quoteIndex * 3.5}rem)` }}
              >
                {quotes.map((q, idx) => (
                  <div
                    key={idx}
                    className="h-14 flex items-center justify-center md:justify-end text-neutral-600 dark:text-neutral-400 italic"
                  >
                    &ldquo;{q}&rdquo;
                  </div>
                ))}
              </div>
            </div>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-mono text2 hover:text1 hover:underline transition-colors mt-2"
            >
              Back to top <ArrowUp size={13} />
            </button>
          </div>

          {/* Left column (Desktop order-1): Identity and Essential Links */}
          <div className="flex flex-col items-center md:items-start md:order-1 space-y-1 font-mono">
            <a
              href="/"
              className="text-lg sm:text-xl font-bold text1 hover:underline tracking-tight"
            >
              {profile.name}
            </a>
            <a
              href="https://github.com/Priyanshu1283"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text2 hover:text1 transition-colors"
            >
              GitHub / Priyanshu1283
            </a>
            <a
              href="https://www.linkedin.com/in/priyanshu-kumar-03310a253/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text2 hover:text1 transition-colors"
            >
              LinkedIn / priyanshu-kumar
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="text-xs text2 hover:text1 transition-colors"
            >
              {profile.phone}
            </a>
            <p className="text-[10px] text2 opacity-60 pt-2">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
