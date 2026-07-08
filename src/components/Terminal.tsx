"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { projects, siteConfig } from "@/lib/data";
import { useAchievements } from "./AchievementSystem";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Line = { kind: "in" | "out"; text: string };

const BANNER: Line[] = [
  { kind: "out", text: "sameer-os v2.0 — type `help` to see what i can do" },
];

export default function Terminal() {
  const { unlock } = useAchievements();
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

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
          "currently: product engineer intern @ shipsy.",
          "likes: race conditions (fixing them), C++, chai.",
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

  return (
    <section id="terminal" className="mx-auto max-w-6xl px-5 sm:px-8 py-24">
      <SectionHeading
        label="for the curious ones"
        title="poke around"
        subtitle="a real terminal. two of the seven achievements are hiding in here."
      />

      <Reveal>
        <div
          className="card overflow-hidden max-w-3xl rotate-[0.3deg]"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-background/60">
            <span className="h-3 w-3 rounded-full bg-rose/80" />
            <span className="h-3 w-3 rounded-full bg-accent/80" />
            <span className="h-3 w-3 rounded-full bg-sage/80" />
            <span className="ml-3 font-mono text-xs text-muted">sameer@portfolio: ~</span>
          </div>

          <div ref={scrollRef} className="h-72 overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed">
            {lines.map((line, i) =>
              line.kind === "in" ? (
                <p key={i} className="text-foreground">
                  <span className="text-sage">➜</span> <span className="text-accent">~</span> {line.text}
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
      </Reveal>
    </section>
  );
}
