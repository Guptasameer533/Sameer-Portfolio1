import { experience } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 sm:px-8 py-24">
      <SectionHeading
        label="real systems, real users"
        title="where i've worked"
        subtitle="production code, measurable impact, not tutorial projects."
      />

      <div className="relative notebook-line ml-2 sm:ml-4 space-y-12">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.1} className="relative pl-8 sm:pl-12">
            <span className="absolute -left-[11px] top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-background text-[10px]">
              ✦
            </span>

            <div
              className="card card-hover p-6 sm:p-8"
              style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.6}deg)` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-serif text-2xl font-semibold">{job.company}</h3>
                  <p className="text-accent font-medium mt-1">{job.role}</p>
                </div>
                <div className="text-right">
                  <p className="hand text-xl">{job.period}</p>
                  <p className="text-sm text-muted mt-0.5">{job.location}</p>
                </div>
              </div>

              <ul className="space-y-2.5">
                {job.bullets.map((b) => (
                  <li key={b.slice(0, 32)} className="text-muted text-[0.95rem] leading-relaxed flex gap-2.5">
                    <span className="text-accent mt-0.5 shrink-0">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.stack.map((tech, ti) => (
                  <span
                    key={tech}
                    className="sticker font-mono text-xs card rounded-md px-2.5 py-1 text-muted"
                    style={{ transform: `rotate(${[(ti % 3) - 1][0] * 1.2}deg)` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
