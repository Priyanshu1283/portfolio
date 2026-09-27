import { motion } from "framer-motion";

export default function AvailabilityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-3 rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-sm text-neutral-600 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-300"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>

      Available for work
    </motion.div>
  );
}