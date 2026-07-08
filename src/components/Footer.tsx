"use client";

import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { TrackedLink } from "./AchievementSystem";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
        <p className="hand text-2xl mb-2">that&apos;s all, folks.</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p className="text-sm text-muted">
            designed & built by me: next.js, chai, and a few too many 2am commits. ©{" "}
            {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4">
            <TrackedLink
              achievement="networker"
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted hover:text-accent transition-colors"
            >
              <GithubIcon size={18} />
            </TrackedLink>
            <TrackedLink
              achievement="networker"
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted hover:text-accent transition-colors"
            >
              <LinkedinIcon size={18} />
            </TrackedLink>
            <TrackedLink
              achievement="networker"
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="text-muted hover:text-accent transition-colors"
            >
              <Mail size={18} />
            </TrackedLink>
          </div>
        </div>
        <p className="mt-4 font-mono text-xs text-muted/60">
          psst: found all 7 achievements yet? ↑↑↓↓←→←→BA
        </p>
      </div>
    </footer>
  );
}
