import Image from "next/image";
import { about, education, siteConfig } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 sm:px-8 py-24">
      <SectionHeading label="the person behind the code" title="a bit about me" />

      <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
        <div>
          {about.paragraphs.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p className="text-muted leading-relaxed mb-5 text-[1.05rem]">{p}</p>
            </Reveal>
          ))}

          <div className="mt-9 grid sm:grid-cols-3 gap-5">
            {about.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.1}>
                <div
                  className="card card-hover p-5 h-full"
                  style={{ transform: `rotate(${[-1.2, 0.8, -0.6][i % 3]}deg)` }}
                >
                  <p className="hand text-xl mb-2">{["01.", "02.", "03."][i % 3]}</p>
                  <h3 className="font-semibold text-sm mb-1.5">{h.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.1} className="mx-auto lg:mx-0 w-fit">
            <div className="tape rotate-2 hover:rotate-0 transition-transform duration-300 bg-[#f3ecdd] p-3 pb-4 rounded-sm shadow-2xl w-64 sm:w-72">
              <Image
                src="/sameer.jpg"
                alt="Sameer Gupta, Software Engineer"
                width={963}
                height={1280}
                className="object-cover rounded-[2px]"
              />
              <p className="hand text-2xl text-center mt-3 leading-none" style={{ color: "#3d3426" }}>
                me, probably debugging something
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="card p-5 border-l-4 border-l-accent rotate-[0.6deg]">
              <p className="hand text-xl mb-1">where i studied</p>
              <h3 className="font-semibold">{education.institute}</h3>
              <p className="text-muted text-sm mt-1">
                {education.degree} · {education.period}
              </p>
              <p className="text-muted text-sm mt-2">
                <span className="text-foreground">favourite classes:</span>{" "}
                {education.coursework.join(", ")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="card p-5 -rotate-[0.8deg]">
              <p className="hand text-xl mb-2">coordinates</p>
              <p className="font-mono text-sm text-muted">📍 {siteConfig.location}</p>
              <p className="font-mono text-sm text-muted mt-1.5">✉ {siteConfig.email}</p>
              <p className="hand text-lg mt-3 leading-tight">replies fast, usually same day</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
