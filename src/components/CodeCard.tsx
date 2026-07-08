"use client";

type Token = { t: string; c?: string };

// warm-palette syntax highlighting: keywords amber, strings sage, numbers rose
const LINES: Token[][] = [
  [{ t: "// sameer.ts", c: "text-muted/60 italic" }],
  [
    { t: "const ", c: "text-accent" },
    { t: "sameer" },
    { t: " = {", c: "text-muted" },
  ],
  [
    { t: "  role" },
    { t: ": ", c: "text-muted" },
    { t: '"software engineer"', c: "text-sage" },
    { t: ",", c: "text-muted" },
  ],
  [
    { t: "  stack" },
    { t: ": [", c: "text-muted" },
    { t: '"ts"', c: "text-sage" },
    { t: ", ", c: "text-muted" },
    { t: '"node"', c: "text-sage" },
    { t: ", ", c: "text-muted" },
    { t: '"next.js"', c: "text-sage" },
    { t: ", ", c: "text-muted" },
    { t: '"c++"', c: "text-sage" },
    { t: "],", c: "text-muted" },
  ],
  [
    { t: "  currently" },
    { t: ": ", c: "text-muted" },
    { t: '"Product Engineer @ shipsy"', c: "text-sage" },
    { t: ",", c: "text-muted" },
  ],
  [
    { t: "  cfRating" },
    { t: ": ", c: "text-muted" },
    { t: "1657", c: "text-rose" },
    { t: ",  ", c: "text-muted" },
    { t: "// expert", c: "text-muted/60 italic" },
  ],
  [
    { t: "  likes" },
    { t: ": ", c: "text-muted" },
    { t: '"Solving Real World Problems"', c: "text-sage" },
    { t: ",", c: "text-muted" },
  ],
  [
    { t: "  ships" },
    { t: ": ", c: "text-muted" },
    { t: '"code that survives prod"', c: "text-sage" },
    { t: ",", c: "text-muted" },
  ],
  [{ t: "};", c: "text-muted" }],
  [{ t: "" }],
  [
    { t: "export default ", c: "text-accent" },
    { t: "sameer" },
    { t: ";", c: "text-muted" },
  ],
];

export default function CodeCard() {
  return (
    <div className="card overflow-hidden w-[400px] xl:w-[430px] rotate-[1.2deg] shadow-2xl">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-background/60">
        <span className="h-3 w-3 rounded-full bg-rose/80" />
        <span className="h-3 w-3 rounded-full bg-accent/80" />
        <span className="h-3 w-3 rounded-full bg-sage/80" />
        <span className="ml-3 font-mono text-xs text-accent border-b border-accent/50 pb-0.5">
          sameer.ts
        </span>
      </div>

      <div className="px-4 py-4 font-mono text-[13px] leading-[1.75]">
        {LINES.map((parts, i) => (
          <div key={i} className="whitespace-pre">
            <span className="inline-block w-7 text-right mr-4 select-none text-muted/40">
              {i + 1}
            </span>
            {parts.map((p, j) => (
              <span key={j} className={p.c ?? "text-foreground"}>
                {p.t}
              </span>
            ))}
            {i === LINES.length - 1 && <span className="caret" />}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-4 py-2 border-t border-line font-mono text-[11px] text-muted">
        <span className="h-2 w-2 rounded-full bg-sage" />
        <span>⎇ main* · typescript · 0 problems</span>
      </div>
    </div>
  );
}
