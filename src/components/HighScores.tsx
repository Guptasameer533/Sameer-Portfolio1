import { competitiveProgramming } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const ranked = [...competitiveProgramming].sort(
  (a, b) => Number(b.rating) - Number(a.rating)
);

export default function HighScores() {
  return (
    <section id="high-scores" className="mx-auto max-w-6xl px-5 sm:px-8 py-24">
      <SectionHeading
        label="500+ problems, mostly in C++"
        title="high scores"
        subtitle="competitive programming ratings — all public, all verifiable. click a row to check."
      />

      <Reveal>
        <div className="card p-6 sm:p-10 font-mono text-sm sm:text-base -rotate-[0.3deg] max-w-3xl">
          <p className="text-center text-accent tracking-[0.35em] text-xs sm:text-sm mb-8">
            ★ ★ ★ HIGH SCORES ★ ★ ★
          </p>

          <div className="grid grid-cols-[2.5rem_1fr_5rem_auto] gap-x-3 sm:gap-x-6 text-muted text-xs uppercase tracking-wider pb-3 border-b border-line">
            <span>rank</span>
            <span>player</span>
            <span className="text-right">score</span>
            <span className="text-right">title</span>
          </div>

          {ranked.map((cp, i) => (
            <a
              key={cp.platform}
              href={cp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-[2.5rem_1fr_5rem_auto] gap-x-3 sm:gap-x-6 items-center py-4 border-b border-line/60 group hover:bg-accent-soft transition-colors rounded-sm px-1 -mx-1"
            >
              <span className="text-muted">0{i + 1}</span>
              <span className="font-semibold group-hover:text-accent transition-colors uppercase">
                {cp.platform}
              </span>
              <span className="text-right text-xl sm:text-2xl font-bold" style={{ color: cp.color }}>
                {cp.rating}
              </span>
              <span
                className="text-right text-xs sm:text-sm"
                style={{ color: cp.color }}
              >
                {cp.tier.toUpperCase()}
              </span>
            </a>
          ))}

          <p className="mt-8 text-center text-muted text-xs sm:text-sm caret">
            INSERT COIN TO CHALLENGE&nbsp;
          </p>
        </div>
      </Reveal>
    </section>
  );
}
