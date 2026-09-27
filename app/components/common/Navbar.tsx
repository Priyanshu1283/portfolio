"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Education", href: "/education" },
  { name: "Career", href: "/career" },
  { name: "Projects", href: "/projects" },
];

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  // Apply saved theme without updating React state inside the effect
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !darkMode;

    setDarkMode(nextTheme);

    if (nextTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="fixed left-1/2 top-8 z-50 w-[calc(100%-40px)] max-w-[1520px] -translate-x-1/2">
      <nav className="flex h-[90px] items-center justify-between rounded-[45px] border border-black/[0.08] bg-white/90 px-7 shadow-[0_12px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/90">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-[13px] border border-purple-400 bg-white text-sm font-bold text-blue-500 shadow-[0_8px_20px_rgba(100,70,255,0.15)] dark:bg-neutral-900">
            PK
          </div>

          <div className="hidden sm:block">
            <p className="text-[17px] font-bold leading-tight text-black dark:text-white">
              Priyanshu Kumar
            </p>

            <p className="mt-1 text-[10px] font-bold tracking-[0.18em] text-neutral-500">
              SOFTWARE ENGINEER
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[16px] font-medium text-neutral-500 transition-colors duration-200 hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Theme button */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.08] bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg dark:border-white/10 dark:bg-neutral-900"
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={21} className="text-indigo-500" />
          )}
        </button>
      </nav>
    </header>
  );
}