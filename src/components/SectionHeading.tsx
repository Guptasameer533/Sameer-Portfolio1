"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  label: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12">
      <p className="hand text-2xl -rotate-1 mb-1">{label}</p>
      <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight inline-block relative">
        {title}
        <motion.svg
          viewBox="0 0 220 14"
          className="absolute -bottom-3 left-0 w-full max-w-[220px] h-4"
          fill="none"
          aria-hidden
        >
          <motion.path
            d="M3 9 C 30 3, 55 12, 85 7 S 145 3, 175 8 S 205 6, 217 8"
            stroke="var(--rose)"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
          />
        </motion.svg>
      </h2>
      {subtitle && <p className="mt-6 text-muted max-w-2xl">{subtitle}</p>}
    </Reveal>
  );
}
