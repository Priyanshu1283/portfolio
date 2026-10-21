"use client";

import { useEffect, useState } from "react";
import { portfolioData } from "@/app/data/portfolioData";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  FileText,
  Globe,
  Copy,
  Check,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";
import { FaLinkedinIn, FaGithub, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

export default function ProfileHeader() {
  const { profile, socials } = portfolioData;

  const dpImages =
    profile.dpImages && profile.dpImages.length > 0
      ? profile.dpImages
      : [profile.avatar || "/images/DP/DP1.jpeg"];

  // Rotating profile pictures index (cycles every 3 seconds)
  const [dpIndex, setDpIndex] = useState(0);

  // Text rotator index
  const [roleIndex, setRoleIndex] = useState(0);

  // Live IST Clock
  const [currentTime, setCurrentTime] = useState("");

  // Copy feedback states
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    // Timer for rotating DP images every 3 seconds
    const dpTimer = setInterval(() => {
      setDpIndex((prev) => (prev + 1) % dpImages.length);
    }, 3000);

    // Timer for rotating roles
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % profile.roles.length);
    }, 2800);

    // Live clock in IST (Asia/Kolkata)
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const clockTimer = setInterval(updateTime, 1000);

    return () => {
      clearInterval(dpTimer);
      clearInterval(roleTimer);
      clearInterval(clockTimer);
    };
  }, [dpImages.length, profile.roles.length]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const getSocialIcon = (name: string) => {
    switch (name) {
      case "LinkedIn":
        return <FaLinkedinIn size={16} />;
      case "GitHub":
        return <FaGithub size={16} />;
      case "X (Twitter)":
        return <FaXTwitter size={15} />;
      case "LeetCode":
        return <SiLeetcode size={16} className="text-amber-500" />;
      default:
        return <ArrowUpRight size={16} />;
    }
  };

  return (
    <>
      {/* Top Profile Intro Block */}
      <div className="w-full border-b">
        <div className="innerContainer">
          <div className="h-[18vh] sm:h-[21vh] md:h-[25vh] w-full flex items-center justify-start">
            {/* Avatar container with 3s auto-rotating DP and manual click to cycle */}
            <div
              id="imageDiv"
              className="h-full aspect-square bg1 border-r flex items-center justify-center p-2.5 sm:p-3 md:p-4 relative select-none"
            >
              <div
                onClick={() => setDpIndex((prev) => (prev + 1) % dpImages.length)}
                className="relative size-full rounded-full border border-neutral-300 dark:border-neutral-700 p-[2px] sm:p-[3px] hover:p-0 transition-all duration-300 ease-in-out group cursor-pointer shadow-xs hover:shadow-md"
                title="Click to switch photo (auto-cycles every 3 seconds)"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  {/* Rotating DP image layers with smooth cross-fade */}
                  {dpImages.map((src, idx) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Priyanshu Kumar (${idx + 1} of ${dpImages.length})`}
                      className={`absolute inset-0 w-full h-full object-cover object-[center_25%] transition-all duration-700 ease-in-out ${
                        idx === dpIndex
                          ? "opacity-100 scale-100 z-10"
                          : "opacity-0 scale-105 pointer-events-none z-0"
                      }`}
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  ))}

                  {/* Subtle glass reflection ring */}
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none z-20" />
                </div>

                {/* Micro pagination pill indicator */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-30 px-1.5 py-0.5 rounded-full bg-neutral-900/80 dark:bg-black/90 backdrop-blur-xs border border-white/20 shadow-xs pointer-events-none">
                  {dpImages.map((_, idx) => (
                    <span
                      key={idx}
                      className={`block rounded-full transition-all duration-300 ${
                        idx === dpIndex
                          ? "w-2.5 h-1 bg-cyan-400"
                          : "w-1 h-1 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Profile info column */}
            <div id="infoDiv" className="h-full flex-1 flex flex-col">
              {/* Monospace tags banner */}
              <div className="h-[46%] md:h-[50%] border-b flex items-end px-3 sm:px-4 pb-1.5 gap-2 font-mono tracking-tighter text-[9px] sm:text-[10px] md:text-xs text2">
                {profile.metaTags.map((tag, idx) => (
                  <span key={idx} className="inline opacity-80">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Name & Verified Badge */}
              <div className="h-[28%] md:h-[26%] border-b flex items-center px-3 sm:px-4 gap-2">
                <h1 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl text1 tracking-tight">
                  {profile.name}
                </h1>
                {/* Verified Badge with 360 rotation on hover */}
                <div
                  className="size-4 sm:size-5 text-blue-500 flex items-center justify-center cursor-pointer hover:rotate-360 transition-transform duration-700 ease-in-out"
                  title="Verified Full-Stack Engineer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#009CF6"
                    className="w-full h-full"
                    aria-label="Verified"
                  >
                    <path d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z" />
                  </svg>
                </div>
              </div>

              {/* Dynamic Role Rotator */}
              <div className="h-[26%] md:h-[24%] px-3 sm:px-4 flex items-center font-mono tracking-tight text-xs sm:text-sm overflow-hidden">
                <div className="relative h-6 overflow-hidden text2 font-medium w-full">
                  <div
                    className="transition-transform duration-500 ease-out flex flex-col"
                    style={{ transform: `translateY(-${roleIndex * 1.5}rem)` }}
                  >
                    {profile.roles.map((r, i) => (
                      <div
                        key={i}
                        className="h-6 flex items-center text-left text-neutral-600 dark:text-neutral-300 truncate"
                      >
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Facts / Contact Matrix */}
      <div className="w-full border-b">
        <div className="innerContainer min-h-[22vh] p-4 py-6 font-mono tracking-tight text-xs sm:text-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-3 justify-center">
            {/* Email with copy */}
            <div className="flex items-center gap-2 group">
              <div className="flex size-7 items-center justify-center rounded-lg border">
                <div className="flex size-5 items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 bg3">
                  <Mail className="size-3.5 text2" />
                </div>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="hover:underline truncate text1"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(profile.email, "email")}
                aria-label="Copy email"
                className="opacity-0 group-hover:opacity-100 transition-opacity text2 hover:text1 ml-1"
                title="Copy email"
              >
                {copiedField === "email" ? (
                  <Check size={14} className="text-emerald-500" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>

            {/* Phone with copy */}
            <div className="flex items-center gap-2 group">
              <div className="flex size-7 items-center justify-center rounded-lg border">
                <div className="flex size-5 items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 bg3">
                  <Phone className="size-3.5 text2" />
                </div>
              </div>
              <a
                href={`tel:${profile.phone}`}
                className="hover:underline text1"
              >
                {profile.phone}
              </a>
              <button
                type="button"
                onClick={() => copyToClipboard(profile.phone, "phone")}
                aria-label="Copy phone"
                className="opacity-0 group-hover:opacity-100 transition-opacity text2 hover:text1 ml-1"
                title="Copy phone"
              >
                {copiedField === "phone" ? (
                  <Check size={14} className="text-emerald-500" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg border">
                <div className="flex size-5 items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 bg3">
                  <MapPin className="size-3.5 text2" />
                </div>
              </div>
              <a
                href="https://www.google.com/maps/place/Bhopal,+Madhya+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text1"
              >
                {profile.location}
              </a>
            </div>

            {/* Live IST Clock */}
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg border">
                <div className="flex size-5 items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 bg3">
                  <Clock className="size-3.5 text2" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{currentTime || "Loading IST..."} (IST)</span>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3 justify-center sm:pl-2">
            {/* Resume */}
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg border">
                <div className="flex size-5 items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 bg3">
                  <FileText className="size-3.5 text2" />
                </div>
              </div>
              <a
                href={profile.resumeUrl}
                download
                className="hover:underline text1 font-medium inline-flex items-center gap-1"
              >
                Download Resume <ArrowUpRight size={13} className="text2" />
              </a>
            </div>

            {/* Pronouns */}
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg border">
                <div className="flex size-5 items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 bg3">
                  <ShieldCheck className="size-3.5 text2" />
                </div>
              </div>
              <span className="text2">{profile.pronouns}</span>
            </div>

            {/* Personal Website */}
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg border">
                <div className="flex size-5 items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 bg3">
                  <Globe className="size-3.5 text2" />
                </div>
              </div>
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text1 truncate"
              >
                pranshu.indevs.in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links Row (4 Columns on Desktop, 2 Columns on Mobile) */}
      <div className="w-full h-fit border-b">
        <div className="innerContainer h-32 md:h-16 grid grid-cols-2 md:grid-cols-4">
          {socials.map((social, index) => {
            const isRightCol = index % 2 === 1;
            const isLast = index === socials.length - 1;

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group hover-bg2 transition-colors duration-150 flex items-center justify-between px-3 pl-4
                  border-b md:border-b-0
                  ${!isLast ? "border-r" : ""}
                  ${isRightCol ? "border-r md:border-r" : ""}
                `}
              >
                <div className="flex items-center gap-2.5">
                  <div className="size-6 rounded-md border flex items-center justify-center text2 group-hover:text1 transition-colors">
                    {getSocialIcon(social.name)}
                  </div>
                  <h3 className="text-sm font-semibold text1 tracking-tight">
                    {social.name}
                  </h3>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text2 group-hover:text1 group-hover:rotate-45 transition-transform duration-200"
                />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
