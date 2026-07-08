"use client";

import { useEffect, useState } from "react";

type NodeStatus = "pending" | "running" | "done" | "failed" | "skipped";

const NODES = [
  { id: "req", label: "request", x: 150, y: 12 },
  { id: "crop", label: "crop image", x: 24, y: 116 },
  { id: "llm", label: "gemini", x: 276, y: 116 },
  { id: "merge", label: "merge", x: 150, y: 220 },
  { id: "res", label: "respond", x: 150, y: 324 },
] as const;

type NodeId = (typeof NODES)[number]["id"];

const EDGES: [NodeId, NodeId][] = [
  ["req", "crop"],
  ["req", "llm"],
  ["crop", "merge"],
  ["llm", "merge"],
  ["merge", "res"],
];

const NODE_W = 128;
const NODE_H = 44;

type Frame = Partial<Record<NodeId, NodeStatus>>;

// a clean run…
const SUCCESS_RUN: Frame[] = [
  {},
  { req: "running" },
  { req: "done", crop: "running", llm: "running" },
  { crop: "done" },
  { llm: "done" },
  { merge: "running" },
  { merge: "done", res: "running" },
  { res: "done" },
  {},
];

// …and one where a branch dies and failure propagates
const FAILURE_RUN: Frame[] = [
  {},
  { req: "running" },
  { req: "done", crop: "running", llm: "running" },
  { crop: "done" },
  { llm: "failed" },
  { merge: "skipped" },
  { res: "skipped" },
  {},
  {},
];

const STYLE: Record<NodeStatus, { stroke: string; fill: string; text: string; dash?: string }> = {
  pending: { stroke: "#3d3426", fill: "#1f1a14", text: "#a3947e" },
  running: { stroke: "#f5a83c", fill: "rgba(245,168,60,0.10)", text: "#f5a83c" },
  done: { stroke: "#a3c293", fill: "rgba(163,194,147,0.08)", text: "#a3c293" },
  failed: { stroke: "#e2725b", fill: "rgba(226,114,91,0.10)", text: "#e2725b" },
  skipped: { stroke: "#5a4f3d", fill: "#1a1611", text: "#6e6250", dash: "5 5" },
};

const BADGE: Record<NodeStatus, string> = {
  pending: "·",
  running: "⟳",
  done: "✓",
  failed: "✗",
  skipped: "–",
};

function center(id: NodeId) {
  const n = NODES.find((n) => n.id === id)!;
  return { x: n.x + NODE_W / 2, y: n.y + NODE_H / 2 };
}

const FRAMES_PER_RUN = SUCCESS_RUN.length; // both scenarios are the same length

export default function HeroGraph() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 850);
    return () => clearInterval(t);
  }, []);

  const run = Math.floor(tick / FRAMES_PER_RUN) + 1;
  const step = tick % FRAMES_PER_RUN;
  const failing = run % 3 === 0;
  const frames = failing ? FAILURE_RUN : SUCCESS_RUN;

  // fold frames up to the current step into one status map
  const status = new Map<NodeId, NodeStatus>(NODES.map((n) => [n.id, "pending"]));
  for (let i = 0; i <= step && i < frames.length; i++) {
    for (const [id, s] of Object.entries(frames[i])) status.set(id as NodeId, s as NodeStatus);
  }

  const doneCount = [...status.values()].filter((s) => s === "done").length;
  const failed = [...status.values()].includes("failed");
  const finished = step >= frames.length - 2;

  const log = !finished
    ? `run #${run} — executing…`
    : failed
      ? `run #${run} — gemini failed, 2 skipped (propagated)`
      : `run #${run} — ${doneCount}/5 nodes ✓`;

  return (
    <div className="relative">
      <div className="card overflow-hidden rotate-[1.2deg] w-[430px]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-background/60">
          <span className="h-3 w-3 rounded-full bg-rose/80" />
          <span className="h-3 w-3 rounded-full bg-accent/80" />
          <span className="h-3 w-3 rounded-full bg-sage/80" />
          <span className="ml-3 font-mono text-xs text-muted">nextflow — live run</span>
        </div>

        <svg viewBox="0 0 428 384" className="w-full" aria-hidden>
          {EDGES.map(([from, to]) => {
            const a = center(from);
            const b = center(to);
            const active = status.get(from) === "done";
            return (
              <path
                key={`${from}-${to}`}
                d={`M ${a.x} ${a.y + NODE_H / 2 - 4} C ${a.x} ${(a.y + b.y) / 2}, ${b.x} ${(a.y + b.y) / 2}, ${b.x} ${b.y - NODE_H / 2 + 4}`}
                fill="none"
                stroke={active ? "#a3c293" : "#3d3426"}
                strokeWidth="1.5"
                strokeDasharray={active ? "none" : "4 4"}
                style={{ transition: "stroke 0.4s" }}
              />
            );
          })}

          {NODES.map((n) => {
            const s = status.get(n.id)!;
            const st = STYLE[s];
            return (
              <g key={n.id} style={{ transition: "opacity 0.4s" }}>
                <rect
                  x={n.x}
                  y={n.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill={st.fill}
                  stroke={st.stroke}
                  strokeWidth="1.5"
                  strokeDasharray={st.dash ?? "none"}
                  style={{ transition: "all 0.4s" }}
                >
                  {s === "running" && (
                    <animate attributeName="opacity" values="1;0.55;1" dur="1.1s" repeatCount="indefinite" />
                  )}
                </rect>
                <text
                  x={n.x + 14}
                  y={n.y + NODE_H / 2 + 4}
                  fontFamily="var(--font-geist-mono), monospace"
                  fontSize="13"
                  fill={st.text}
                >
                  {n.label}
                </text>
                <text
                  x={n.x + NODE_W - 22}
                  y={n.y + NODE_H / 2 + 5}
                  fontFamily="var(--font-geist-mono), monospace"
                  fontSize="14"
                  fill={st.stroke}
                >
                  {BADGE[s]}
                </text>
              </g>
            );
          })}
        </svg>

        <p className="px-4 pb-4 font-mono text-xs text-muted border-t border-line pt-3">
          <span className="text-sage">$</span> {log}
        </p>
      </div>

      <p className="hand text-xl mt-5 text-center rotate-[-1.5deg]">
        ↑ how NextFlow runs a task graph — the real one is in projects
      </p>
    </div>
  );
}
