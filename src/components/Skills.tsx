import { skillGroups } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 sm:px-8 py-24">
      <SectionHeading
        label="the sticker wall"
        title="tools i reach for"
        subtitle="from C++ in contests to Kubernetes in production. poke a sticker."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.07}>
            <div
              className="card card-hover p-6 h-full"
              style={{ transform: `rotate(${[-0.8, 0.6, -0.4, 0.9, -0.5, 0.7][i % 6]}deg)` }}
            >
              <p className="hand text-2xl mb-4">{group.title.toLowerCase()}</p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <span
                    key={skill}
                    className="sticker font-mono text-xs card rounded-md px-2.5 py-1.5 text-muted cursor-default"
                    style={{ transform: `rotate(${((si % 5) - 2) * 1.1}deg)` }}
                  >
                    {skill}
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
