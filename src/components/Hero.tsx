"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileDown, Mail } from "lucide-react";
import { siteConfig, typingPhrases } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { TrackedLink } from "./AchievementSystem";
import CodeCard from "./CodeCard";

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx % phrases.length];
    let delay = deleting ? 30 : 62;
    if (!deleting && text === current) delay = 2200;
    else if (deleting && text === "") delay = 350;

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % phrases.length);
      } else {
        setText(current.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, phraseIdx, phrases]);

  return text;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const scribbleStats = [
  { text: "codeforces 1657", note: "expert — top ~10%", rotate: -2 },
  { text: "leetcode 1842", note: "contest rated", rotate: 1.5 },
  { text: "codechef 2043", note: "5 stars ★", rotate: -1 },
  { text: "sih 2024", note: "national finalist", rotate: 2 },
];

export default function Hero() {
  const typed = useTypewriter(typingPhrases);

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* warm lamp glow, like a desk at night */}
      <div
        className="absolute -top-32 right-[10%] h-[420px] w-[420px] rounded-full opacity-[0.13] blur-[110px]"
        style={{ background: "#f5a83c" }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-[-10%] h-[380px] w-[380px] rounded-full opacity-[0.07] blur-[110px]"
        style={{ background: "#e2725b" }}
        aria-hidden
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-28 pb-16 w-full"
      >
        <div className="lg:grid lg:grid-cols-[1fr_auto] lg:gap-14 lg:items-center">
          <div>
        <motion.p variants={item} className="hand text-2xl sm:text-3xl -rotate-1 mb-4">
          namaste, i&apos;m
        </motion.p>

        <motion.h1
          variants={item}
          className="font-serif text-6xl sm:text-8xl font-semibold tracking-tight leading-[0.95]"
        >
          Sameer
          <br />
          Gupta<span className="text-accent">.</span>
        </motion.h1>

        <motion.p variants={item} className="mt-7 font-mono text-base sm:text-xl text-accent caret">
          <span className="text-muted">$&nbsp;</span>
          {typed}
        </motion.p>

        <motion.p variants={item} className="mt-6 max-w-2xl text-muted text-base sm:text-lg leading-relaxed">
          software engineer who likes the messy parts — race conditions, failure modes, systems under
          real load. currently building logistics tech at{" "}
          <span className="text-foreground font-medium">Shipsy</span>, previously shipped a production{" "}
          <span className="text-foreground font-medium">LLM workflow orchestrator</span> from scratch.
          IIIT Kota, class of 2026.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-background hover:opacity-90 transition-opacity"
          >
            see what i&apos;ve built
            <ArrowDown size={17} className="transition-transform group-hover:translate-y-1" />
          </a>
          <TrackedLink
            achievement="recruiter-mode"
            href={siteConfig.resumePath}
            download
            className="inline-flex items-center gap-2 rounded-lg card card-hover px-6 py-3 font-medium"
          >
            <FileDown size={17} className="text-accent" />
            grab my resume
          </TrackedLink>
          <div className="flex items-center gap-3 sm:ml-1">
            <TrackedLink
              achievement="networker"
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="card card-hover rounded-lg p-3 text-muted hover:text-foreground"
            >
              <GithubIcon size={19} />
            </TrackedLink>
            <TrackedLink
              achievement="networker"
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="card card-hover rounded-lg p-3 text-muted hover:text-foreground"
            >
              <LinkedinIcon size={19} />
            </TrackedLink>
            <TrackedLink
              achievement="networker"
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="card card-hover rounded-lg p-3 text-muted hover:text-foreground"
            >
              <Mail size={19} />
            </TrackedLink>
          </div>
        </motion.div>
          </div>

          <motion.div variants={item} className="hidden lg:block relative pr-4">
            <CodeCard />

            <div className="card absolute -left-20 top-6 -rotate-6 px-4 py-3 shadow-xl bg-surface">
              <p className="hand text-lg leading-none">note to self</p>
              <p className="font-mono text-xs mt-1.5 text-muted">
                if it can race,
                <br />
                it will.
              </p>
            </div>

            <div className="card absolute -left-14 -bottom-8 rotate-3 px-4 py-3 shadow-xl bg-surface">
              <p className="hand text-lg leading-none">status</p>
              <p className="font-mono text-xs mt-1.5 text-muted">
                open to SWE roles
                <br />
                class of 2026
              </p>
            </div>
          </motion.div>
        </div>

        {/* scribbled sticky-note stats */}
        <motion.div variants={item} className="mt-16 flex flex-wrap gap-4 max-w-3xl">
          {scribbleStats.map((s) => (
            <div
              key={s.text}
              className="card card-hover px-5 py-3"
              style={{ transform: `rotate(${s.rotate}deg)` }}
            >
              <p className="font-mono text-sm font-semibold">{s.text}</p>
              <p className="hand text-lg leading-tight">{s.note}</p>
            </div>
          ))}
        </motion.div>

        <motion.p variants={item} className="mt-14 hand text-xl text-muted -rotate-1">
          psst — this site has hidden achievements. try the trophy up top ↗ and the terminal down there ↘
        </motion.p>
      </motion.div>
    </section>
  );
}
