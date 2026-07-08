"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Mail, Send } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { TrackedLink } from "./AchievementSystem";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "failed");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && err.message === "not_configured"
          ? "the mail service isn't wired up yet, email me directly instead:"
          : "something broke (ironic, i know), email me directly instead:"
      );
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 sm:px-8 py-24">
      <SectionHeading
        label="the inbox is always open"
        title="say hi"
        subtitle="looking for a software engineer who owns things end-to-end? or just want to argue about tabs vs spaces? either works."
      />

      <div className="grid lg:grid-cols-[330px_1fr] gap-10 items-start">
        <Reveal>
          <div className="space-y-4">
            <TrackedLink
              achievement="networker"
              href={`mailto:${siteConfig.email}`}
              className="card card-hover p-4 flex items-center gap-4 group -rotate-1"
            >
              <span className="rounded-lg bg-accent-soft border border-accent/30 p-2.5 text-accent">
                <Mail size={18} />
              </span>
              <div>
                <p className="hand text-lg leading-none">email</p>
                <p className="font-medium text-sm mt-1 group-hover:text-accent transition-colors">
                  {siteConfig.email}
                </p>
              </div>
            </TrackedLink>

            <TrackedLink
              achievement="networker"
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover p-4 flex items-center gap-4 group rotate-[0.7deg]"
            >
              <span className="rounded-lg bg-accent-soft border border-accent/30 p-2.5 text-accent">
                <LinkedinIcon size={18} />
              </span>
              <div>
                <p className="hand text-lg leading-none">linkedin</p>
                <p className="font-medium text-sm mt-1 group-hover:text-accent transition-colors">
                  in/sameergupta533
                </p>
              </div>
            </TrackedLink>

            <TrackedLink
              achievement="networker"
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover p-4 flex items-center gap-4 group -rotate-[0.5deg]"
            >
              <span className="rounded-lg bg-accent-soft border border-accent/30 p-2.5 text-accent">
                <GithubIcon size={18} />
              </span>
              <div>
                <p className="hand text-lg leading-none">github</p>
                <p className="font-medium text-sm mt-1 group-hover:text-accent transition-colors">
                  Guptasameer533
                </p>
              </div>
            </TrackedLink>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5 rotate-[0.3deg] relative">
            <p className="hand text-2xl absolute -top-4 left-8 rotate-[-2deg]">drop me a line ✉</p>
            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              <div>
                <label htmlFor="name" className="hand text-lg block mb-1.5">
                  your name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  placeholder="Jane Recruiter"
                  className="w-full rounded-lg bg-background border border-line px-4 py-3 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="hand text-lg block mb-1.5">
                  your email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  placeholder="jane@company.com"
                  className="w-full rounded-lg bg-background border border-line px-4 py-3 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="hand text-lg block mb-1.5">
                what&apos;s on your mind
              </label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                rows={6}
                placeholder="hi sameer, we're building something interesting and…"
                className="w-full rounded-lg bg-background border border-line px-4 py-3 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent/60 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-background hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> sending…
                </>
              ) : (
                <>
                  <Send size={16} /> send it
                </>
              )}
            </button>

            {status === "sent" && (
              <p className="hand text-xl text-sage">✓ got it! i&apos;ll reply soon, promise.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-rose">
                ✗ {errorMsg}{" "}
                <a href={`mailto:${siteConfig.email}`} className="underline text-accent">
                  {siteConfig.email}
                </a>
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
