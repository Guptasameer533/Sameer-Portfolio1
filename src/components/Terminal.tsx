"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { projects, siteConfig } from "@/lib/data";
import { useAchievements } from "./AchievementSystem";

type Line = { kind: "in" | "out"; text: string };

const BANNER: Line[] = [
  { kind: "out", text: "sameer-os v2.0 — type `help` to see what i can do" },
  { kind: "out", text: "(psst: two of the seven achievements hide in here)" },
];

export default function Terminal() {
  const { unlock, unlocked } = useAchievements();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  // ` opens it (unless typing in a field), Esc closes it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
      if (e.key === "`" && !typing) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function run(raw: string): string[] {
    const cmd = raw.trim().toLowerCase();
    switch (cmd) {
      case "help":
        return [
          "available commands:",
          "  whoami        who is this guy",
          "  projects      things i've built",
          "  resume        grab the pdf",
          "  contact       ways to reach me",
          "  ls            look around",
          "  chai          essential dev fuel",
          "  sudo hire-me  worth a try",
          "  clear         clean slate",
        ];
      case "whoami":
        return [
          "sameer gupta — software engineer.",
          "backend & distributed systems, IIIT Kota '26.",
          "currently: product engineer @ shipsy.",
          "likes: solving real world problems, C++, chai.",
        ];
      case "projects":
        return projects.map(
          (p) => `  ${p.name.padEnd(14)} ${p.subtitle}${p.live ? ` → ${p.live}` : ""}`
        );
      case "resume":
        window.open(siteConfig.resumePath, "_blank");
        unlock("recruiter-mode");
        return ["opening resume.pdf… (also: nice, you found the shortcut)"];
      case "contact":
        return [
          `  email:    ${siteConfig.email}`,
          `  github:   ${siteConfig.links.github}`,
          `  linkedin: ${siteConfig.links.linkedin}`,
        ];
      case "ls":
        return ["about/  work/  projects/  skills/  high-scores/  trophies/  secrets.txt"];
      case "cat secrets.txt":
        return ["nice try. the konami code works though. ↑↑↓↓←→←→BA"];
      case "chai":
        return ["☕ brewing… done. productivity +10, bugs -3."];
      case "sudo hire-me":
      case "sudo hire me":
        unlock("sudo-hire");
        return [
          "[sudo] password for recruiter: ********",
          "access granted ✔",
          `next step: email ${siteConfig.email} — i reply fast.`,
        ];
      case "clear":
        return [];
      case "":
        return [];
      default:
        return [`command not found: ${cmd} — try \`help\``];
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const cmd = input.trim();
    setInput("");
    if (cmd.toLowerCase() === "clear") {
      setLines(BANNER);
      return;
    }
    if (cmd !== "") unlock("terminal-hacker");
    const out = run(cmd).map((text): Line => ({ kind: "out", text }));
    setLines((prev) => [...prev, { kind: "in", text: cmd }, ...out]);
  }

  const discovered = unlocked.includes("terminal-hacker");

  return (
    <>
      {/* floating launcher — visible from anywhere on the page */}
      <motion.button
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open terminal"
        title="terminal (or press `)"
        className="fixed bottom-5 right-5 z-[70] card card-hover flex items-center gap-2.5 px-4 py-3 shadow-2xl"
      >
        {!discovered && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
          </span>
        )}
        <TerminalIcon size={17} className="text-accent" />
        <span className="hand text-lg leading-none hidden sm:inline">terminal</span>
      </motion.button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 28, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed bottom-20 right-5 z-[75] w-[min(580px,calc(100vw-2.5rem))]"
              >
                <div className="card overflow-hidden shadow-2xl" onClick={() => inputRef.current?.focus()}>
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-background/80">
                    <span className="h-3 w-3 rounded-full bg-rose/80" />
                    <span className="h-3 w-3 rounded-full bg-accent/80" />
                    <span className="h-3 w-3 rounded-full bg-sage/80" />
                    <span className="ml-3 font-mono text-xs text-muted">sameer@portfolio: ~</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(false);
                      }}
                      className="ml-auto text-muted hover:text-foreground"
                      aria-label="Close terminal"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div
                    ref={scrollRef}
                    className="h-72 overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed bg-background/95"
                  >
                    {lines.map((line, i) =>
                      line.kind === "in" ? (
                        <p key={i} className="text-foreground">
                          <span className="text-sage">➜</span> <span className="text-accent">~</span>{" "}
                          {line.text}
                        </p>
                      ) : (
                        <p key={i} className="text-muted whitespace-pre-wrap">
                          {line.text}
                        </p>
                      )
                    )}
                    <form onSubmit={onSubmit} className="flex items-center gap-2">
                      <span className="text-sage">➜</span>
                      <span className="text-accent">~</span>
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted/40"
                        placeholder="type `help`…"
                        aria-label="Terminal input"
                        autoComplete="off"
                        spellCheck={false}
                      />
                    </form>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
