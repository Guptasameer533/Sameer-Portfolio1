import { achievements } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const icons = ["🏆", "🔵", "🧩", "🎤"];

export default function Trophies() {
  return (
    <section id="trophies" className="mx-auto max-w-6xl px-5 sm:px-8 py-24">
      <SectionHeading label="the shelf" title="trophy cabinet" />

      <div className="grid sm:grid-cols-2 gap-6">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.08}>
            <div
              className="card card-hover p-6 h-full flex gap-4"
              style={{ transform: `rotate(${[-0.7, 0.6, 0.5, -0.5][i % 4]}deg)` }}
            >
              <span className="text-3xl leading-none mt-1">{icons[i % icons.length]}</span>
              <div>
                <h3 className="font-semibold mb-1.5">{a.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{a.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
