import { ExternalLink } from "lucide-react";
import { projects, siteConfig } from "@/lib/data";
import { GithubIcon } from "./BrandIcons";
import { TrackedLink } from "./AchievementSystem";
import { KisanMitraVisual, NextFlowVisual, ResourceHubVisual } from "./ProjectVisuals";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const VISUALS: Record<string, React.ComponentType> = {
  NextFlow: NextFlowVisual,
  KisanMitra: KisanMitraVisual,
  "Resource HUB": ResourceHubVisual,
};

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 sm:px-8 py-24">
      <SectionHeading
        label="built, shipped, kept alive"
        title="things i've built"
        subtitle="each of these is deployed, used by real people, and taught me something the hard way."
      />

      <div className="space-y-10">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.08}>
            <article
              className={`card card-hover p-6 sm:p-8 relative ${
                project.featured ? "border-accent/40" : ""
              }`}
              style={{ transform: `rotate(${[-0.4, 0.5, -0.3][i % 3]}deg)` }}
            >
              <p className="hand text-xl sm:text-2xl absolute -top-4 right-6 rotate-2 hidden sm:block">
                ↓ {project.note}
              </p>

              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-serif text-3xl font-semibold">{project.name}</h3>
                    <span className="rounded-full bg-accent-soft border border-accent/40 px-3 py-1 font-mono text-xs text-accent">
                      {project.badge}
                    </span>
                  </div>
                  <p className="text-muted font-medium mt-1">{project.subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-accent/50 bg-accent-soft px-4 py-2 text-sm font-medium text-accent hover:bg-accent hover:text-background transition-colors"
                    >
                      <ExternalLink size={14} />
                      try it live
                    </a>
                  )}
                  <TrackedLink
                    achievement="networker"
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} on GitHub`}
                    className="card card-hover rounded-lg p-2.5 text-muted hover:text-foreground"
                  >
                    <GithubIcon size={16} />
                  </TrackedLink>
                </div>
              </div>

              <p className="text-muted leading-relaxed mb-4">{project.description}</p>

              <div className="md:grid md:grid-cols-[1fr_330px] md:gap-8 md:items-center">
                <div>
                  <ul className="space-y-2 mb-5">
                    {project.points.map((point) => (
                      <li key={point.slice(0, 32)} className="text-muted text-[0.95rem] leading-relaxed flex gap-2.5">
                        <span className="text-accent mt-0.5 shrink-0">→</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, ti) => (
                      <span
                        key={tech}
                        className="sticker font-mono text-xs card rounded-md px-2.5 py-1 text-muted"
                        style={{ transform: `rotate(${((ti % 3) - 1) * 1.2}deg)` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {(() => {
                  const Visual = VISUALS[project.name];
                  return Visual ? (
                    <div className="hidden md:block">
                      <Visual />
                    </div>
                  ) : null;
                })()}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
