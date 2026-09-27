"use client";

import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import AvailabilityBadge from "./AvailabilityBadge";
import ProfileCard from "./ProfileCard";
import SocialLinks from "../common/SocialLinks";

export default function Hero() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white dark:bg-neutral-950">
      {/* Ambient background */}
      <div
        className="
          pointer-events-none
          absolute
          left-[35%]
          top-[25%]
          h-[550px]
          w-[550px]
          rounded-full
          bg-purple-200/20
          blur-[140px]
          dark:bg-purple-900/10
        "
      />

      <div
        className="
          mx-auto
          flex
          min-h-screen
          max-w-[1520px]
          items-center
          px-6
          pb-12
          pt-[150px]
          lg:px-10
        "
      >
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_0.9fr] xl:gap-4">

          {/* LEFT */}
          <div className="max-w-[760px]">
            <AvailabilityBadge />

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-8"
            >
              <h1
                className="
                  text-[clamp(4rem,7vw,6.7rem)]
                  font-bold
                  leading-[0.95]
                  tracking-[-0.055em]
                  text-black
                  dark:text-white
                "
              >
                Hi, I&apos;m
              </h1>

              <h1
                className="
                  mt-3
                  bg-gradient-to-r
                  from-violet-600
                  via-blue-500
                  to-cyan-400
                  bg-clip-text
                  text-[clamp(4rem,7vw,6.7rem)]
                  font-bold
                  leading-[0.95]
                  tracking-[-0.055em]
                  text-transparent
                "
              >
                Priyanshu Kumar
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="
                mt-9
                max-w-[650px]
                text-[19px]
                leading-[1.65]
                text-neutral-500
                dark:text-neutral-400
                sm:text-[21px]
              "
            >
              I build scalable and user-focused digital experiences.
              Specialized in crafting modern web applications with
              clean architecture, elegant interfaces, and powerful
              backend systems.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/projects"
                className="
                  group
                  inline-flex
                  h-[58px]
                  items-center
                  gap-3
                  rounded-full
                  bg-black
                  px-8
                  text-[15px]
                  font-bold
                  text-white
                  shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_18px_35px_rgba(0,0,0,0.18)]
                  dark:bg-white
                  dark:text-black
                "
              >
                View Work

                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <a
                href="/resume.pdf"
                download
                className="
                  inline-flex
                  h-[58px]
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-black/[0.1]
                  bg-white
                  px-8
                  text-[15px]
                  font-bold
                  text-black
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  dark:border-white/10
                  dark:bg-neutral-900
                  dark:text-white
                "
              >
                Resume

                <Download size={18} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.4,
              }}
              className="mt-10"
            >
              <SocialLinks />
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="relative lg:-mr-6 xl:-mr-10">
            <ProfileCard />
          </div>
        </div>
      </div>
    </main>
  );
}