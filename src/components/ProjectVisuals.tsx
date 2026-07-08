"use client";

import { useEffect, useState, type ReactNode } from "react";

function useTick(ms: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), ms);
    return () => clearInterval(t);
  }, [ms]);
  return tick;
}

function WindowFrame({ title, log, children }: { title: string; log: string; children: ReactNode }) {
  return (
    <div className="card overflow-hidden w-full">
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-line bg-background/60">
        <span className="h-2.5 w-2.5 rounded-full bg-rose/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-sage/80" />
        <span className="ml-2.5 font-mono text-[11px] text-muted">{title}</span>
      </div>
      {children}
      <p className="px-3.5 pb-3 pt-2.5 font-mono text-[11px] text-muted border-t border-line">
        <span className="text-sage">$</span> {log}
      </p>
    </div>
  );
}

/* ---------------- NextFlow: DAG run simulation ---------------- */

type NodeStatus = "pending" | "running" | "done" | "failed" | "skipped";

const NODES = [
  { id: "req", label: "request", x: 110, y: 10 },
  { id: "crop", label: "crop image", x: 10, y: 92 },
  { id: "llm", label: "gemini", x: 210, y: 92 },
  { id: "merge", label: "merge", x: 110, y: 174 },
  { id: "res", label: "respond", x: 110, y: 256 },
] as const;

type NodeId = (typeof NODES)[number]["id"];

const EDGES: [NodeId, NodeId][] = [
  ["req", "crop"],
  ["req", "llm"],
  ["crop", "merge"],
  ["llm", "merge"],
  ["merge", "res"],
];

const NODE_W = 108;
const NODE_H = 36;

type Frame = Partial<Record<NodeId, NodeStatus>>;

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

function nodeCenter(id: NodeId) {
  const n = NODES.find((n) => n.id === id)!;
  return { x: n.x + NODE_W / 2, y: n.y + NODE_H / 2 };
}

export function NextFlowVisual() {
  const tick = useTick(850);
  const run = Math.floor(tick / SUCCESS_RUN.length) + 1;
  const step = tick % SUCCESS_RUN.length;
  const frames = run % 3 === 0 ? FAILURE_RUN : SUCCESS_RUN;

  const status = new Map<NodeId, NodeStatus>(NODES.map((n) => [n.id, "pending"]));
  for (let i = 0; i <= step && i < frames.length; i++) {
    for (const [id, s] of Object.entries(frames[i])) status.set(id as NodeId, s as NodeStatus);
  }

  const doneCount = [...status.values()].filter((s) => s === "done").length;
  const failed = [...status.values()].includes("failed");
  const finished = step >= frames.length - 2;
  const log = !finished
    ? `run #${run}: executing…`
    : failed
      ? `run #${run}: gemini failed, 2 skipped`
      : `run #${run}: ${doneCount}/5 nodes ✓`;

  return (
    <WindowFrame title="nextflow: live run" log={log}>
      <svg viewBox="0 0 328 302" className="w-full" aria-hidden>
        {EDGES.map(([from, to]) => {
          const a = nodeCenter(from);
          const b = nodeCenter(to);
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
            <g key={n.id}>
              <rect
                x={n.x}
                y={n.y}
                width={NODE_W}
                height={NODE_H}
                rx="9"
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
              <text x={n.x + 12} y={n.y + NODE_H / 2 + 4} fontFamily="var(--font-geist-mono), monospace" fontSize="12" fill={st.text}>
                {n.label}
              </text>
              <text x={n.x + NODE_W - 20} y={n.y + NODE_H / 2 + 4} fontFamily="var(--font-geist-mono), monospace" fontSize="12" fill={st.stroke}>
                {BADGE[s]}
              </text>
            </g>
          );
        })}
      </svg>
    </WindowFrame>
  );
}

/* ---------------- KisanMitra: concurrent bids + optimistic lock ---------------- */

const KISAN_STEPS = [
  { status: "OPEN", color: "#a3947e", left: false, right: false, log: "contract listed, awaiting bids" },
  { status: "BID ₹42/q", color: "#f5a83c", left: true, right: false, log: "farmer placed a bid" },
  { status: "COUNTER ₹45/q", color: "#f5a83c", left: false, right: true, log: "buyer countered" },
  { status: "2 WRITES ⚠", color: "#e2725b", left: true, right: true, log: "concurrent writes detected…" },
  { status: "LOCKED v7 🔒", color: "#a3c293", left: false, right: false, log: "optimistic lock: 2 concurrent bids, 0 races" },
  { status: "LOCKED v7 🔒", color: "#a3c293", left: false, right: false, log: "optimistic lock: 2 concurrent bids, 0 races" },
];

export function KisanMitraVisual() {
  const tick = useTick(1300);
  const s = KISAN_STEPS[tick % KISAN_STEPS.length];

  const actor = (x: number, label: string, active: boolean) => (
    <>
      <rect x={x} y={86} width={82} height={38} rx="9" fill={active ? "rgba(245,168,60,0.10)" : "#1f1a14"} stroke={active ? "#f5a83c" : "#3d3426"} strokeWidth="1.5" style={{ transition: "all 0.4s" }} />
      <text x={x + 41} y={109} textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fontSize="12" fill={active ? "#f5a83c" : "#a3947e"}>
        {label}
      </text>
    </>
  );

  return (
    <WindowFrame title="kisanmitra: negotiation" log={s.log}>
      <svg viewBox="0 0 328 210" className="w-full" aria-hidden>
        <line x1="92" y1="105" x2="118" y2="105" stroke={s.left ? "#f5a83c" : "#3d3426"} strokeWidth="1.5" strokeDasharray={s.left ? "none" : "4 4"} style={{ transition: "stroke 0.4s" }} />
        <line x1="210" y1="105" x2="236" y2="105" stroke={s.right ? "#f5a83c" : "#3d3426"} strokeWidth="1.5" strokeDasharray={s.right ? "none" : "4 4"} style={{ transition: "stroke 0.4s" }} />

        {actor(10, "farmer", s.left)}
        {actor(236, "buyer", s.right)}

        <rect x={118} y={72} width={92} height={66} rx="10" fill="rgba(163,194,147,0.04)" stroke={s.color} strokeWidth="1.5" style={{ transition: "all 0.4s" }} />
        <text x={164} y={96} textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fontSize="12" fill="#f3ecdd">
          contract
        </text>
        <text x={164} y={118} textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fontSize="11" fill={s.color} style={{ transition: "fill 0.4s" }}>
          {s.status}
        </text>

        <text x={164} y={30} textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fontSize="10" fill="#6e6250">
          multi-party negotiation, one source of truth
        </text>
        <text x={164} y={185} textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fontSize="10" fill="#6e6250">
          transactional writes · optimistic locking
        </text>
      </svg>
    </WindowFrame>
  );
}

/* ---------------- Resource HUB: users climbing to 900+ ---------------- */

const BAR_HEIGHTS = [8, 14, 11, 20, 16, 26, 22, 34, 30, 42, 38, 52];
const HUB_CYCLE = 46; // ticks per loop

export function ResourceHubVisual() {
  const tick = useTick(90);
  const phase = tick % HUB_CYCLE;
  const progress = Math.min(1, phase / 32);
  const eased = 1 - Math.pow(1 - progress, 3);
  const count = Math.round(900 * eased);
  const live = progress >= 1;

  return (
    <WindowFrame
      title="resource-hub: activity"
      log={live ? "900+ active · consistent under concurrent load" : "onboarding students…"}
    >
      <svg viewBox="0 0 328 180" className="w-full" aria-hidden>
        <text x={20} y={52} fontFamily="var(--font-geist-mono), monospace" fontSize="34" fontWeight="bold" fill="#f5a83c">
          {count}
          {live ? "+" : ""}
        </text>
        <text x={20} y={74} fontFamily="var(--font-geist-mono), monospace" fontSize="11" fill="#a3947e">
          active students @ IIIT Kota
        </text>
        {live && (
          <g>
            <circle cx={26} cy={94} r="4" fill="#a3c293">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
            </circle>
            <text x={38} y={98} fontFamily="var(--font-geist-mono), monospace" fontSize="11" fill="#a3c293">
              live, reads & writes in sync
            </text>
          </g>
        )}
        {BAR_HEIGHTS.map((h, i) => {
          const barH = Math.max(2, h * eased);
          return (
            <rect
              key={i}
              x={20 + i * 25}
              y={160 - barH}
              width={16}
              height={barH}
              rx="3"
              fill={i === BAR_HEIGHTS.length - 1 && live ? "#f5a83c" : "rgba(245,168,60,0.35)"}
              style={{ transition: "all 0.15s linear" }}
            />
          );
        })}
      </svg>
    </WindowFrame>
  );
}
