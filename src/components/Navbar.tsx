"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, FileDown } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";
import { TrackedLink, TrophyButton } from "./AchievementSystem";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-serif text-xl font-semibold tracking-tight">
          sameer<span className="text-accent">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm text-muted hover:text-foreground transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-rose rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <TrophyButton />
          </li>
          <li>
            <TrackedLink
              achievement="recruiter-mode"
              href={siteConfig.resumePath}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-accent/50 bg-accent-soft px-4 py-2 text-sm font-medium text-accent hover:bg-accent hover:text-background transition-colors"
            >
              <FileDown size={15} />
              resume
            </TrackedLink>
          </li>
        </ul>

        <div className="md:hidden flex items-center gap-3">
          <TrophyButton />
          <button
            className="text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-line px-6 py-5">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <TrackedLink
                achievement="recruiter-mode"
                href={siteConfig.resumePath}
                download
                className="inline-flex items-center gap-2 text-accent"
              >
                <FileDown size={15} />
                download resume
              </TrackedLink>
            </li>
          </ul>
        </div>
      )}
    </motion.header>
  );
}
