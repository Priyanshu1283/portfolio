"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check saved theme or system preference
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Studio", href: "#studio" },
    { label: "Stack", href: "#stack" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      {/* Top accent bar matching friend's design */}
      <div className="sticky top-0 h-2 w-full bg1 z-50" />

      {/* Main sticky navigation bar */}
      <nav className="sticky top-2 z-50 h-12 w-full flex justify-center items-center bg1 border-y">
        <div className="h-full max-w-3xl w-[95%] md:w-full flex justify-between items-center px-4 sm:px-8 border-x">
          {/* Logo brand */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="Priyanshu Kumar home"
          >
            <div className="size-7.5 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 shadow-xs group-hover:scale-105 transition-transform duration-200 bg-neutral-950 flex items-center justify-center">
              <img
                src="/icons/logo.jpeg"
                alt="Priyanshu Kumar Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-sm text1 tracking-tight hidden xs:inline">
              Priyanshu
            </span>
          </Link>

          {/* Desktop links */}
          <div className="flex items-center gap-5 sm:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hidden sm:block text-xs md:text-sm text2 hover:text1 transition-colors duration-200 tracking-tight font-medium"
              >
                {link.label}
              </a>
            ))}

            {/* Theme switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark/light mode"
              className="size-7 rounded-md border flex items-center justify-center text2 hover:text1 hover-bg2 transition-colors duration-200"
            >
              {darkMode ? (
                <Sun size={14} className="text-amber-400" />
              ) : (
                <Moon size={14} className="text-indigo-600" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="sm:hidden size-7 rounded-md border flex items-center justify-center text2 hover:text1"
            >
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed top-14 left-0 right-0 z-40 bg1 border-b shadow-lg py-3 px-6 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text2 hover:text1 py-1 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between"
              >
                {link.label}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}