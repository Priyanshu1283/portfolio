"use client";

import { motion, type MotionValue } from "framer-motion";

interface FloatingPlaneProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
}

export default function FloatingPlane({
  x,
  y,
  rotate,
}: FloatingPlaneProps) {
  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
      }}
      className="pointer-events-none absolute -right-8 top-0 z-30"
    >
      <div className="relative h-7 w-9">
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-0
            w-0
            -translate-x-1/2
            -translate-y-1/2
            rotate-[-12deg]
            border-b-[22px]
            border-l-[5px]
            border-r-[5px]
            border-b-black
            border-l-transparent
            border-r-transparent
            drop-shadow-[0_4px_5px_rgba(0,0,0,0.35)]
            dark:border-b-white
          "
        />

        <div
          className="
            absolute
            left-[8px]
            top-[15px]
            h-[7px]
            w-[17px]
            rotate-[18deg]
            rounded-full
            bg-neutral-900
            dark:bg-white
          "
        />
      </div>
    </motion.div>
  );
}