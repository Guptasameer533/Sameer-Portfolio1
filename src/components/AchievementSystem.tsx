"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, X } from "lucide-react";

export const ACHIEVEMENTS = [
  { id: "hello-world", icon: "👋", title: "hello, world", desc: "you showed up. that's step one." },
  { id: "deep-diver", icon: "🤿", title: "deep diver", desc: "scrolled all the way to the very end." },
  { id: "recruiter-mode", icon: "📄", title: "recruiter mode: on", desc: "grabbed a copy of the resume." },
  { id: "networker", icon: "🔗", title: "networker", desc: "checked out one of my profiles." },
  { id: "terminal-hacker", icon: "💻", title: "terminal hacker", desc: "ran a command in the terminal." },
  { id: "sudo-hire", icon: "🔓", title: "with great power…", desc: "ran `sudo hire-me`. bold. i respect it." },
  { id: "konami", icon: "🕹️", title: "↑↑↓↓←→←→BA", desc: "you know the old ways." },
] as const;

export type AchievementId = (typeof ACHIEVEMENTS)[number]["id"];

type AchievementsContextValue = {
  unlocked: AchievementId[];
  unlock: (id: AchievementId) => void;
};

const AchievementsContext = createContext<AchievementsContextValue>({
  unlocked: [],
  unlock: () => {},
});

export function useAchievements() {
  return useContext(AchievementsContext);
}

const STORAGE_KEY = "sg-achievements";
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

function fireConfetti(big: boolean) {
  const base = { origin: { y: 0.75 }, colors: ["#f5a83c", "#e2725b", "#a3c293", "#f3ecdd"] };
  confetti({ ...base, particleCount: big ? 180 : 70, spread: big ? 120 : 70 });
  if (big) {
    setTimeout(() => confetti({ ...base, particleCount: 120, spread: 100, origin: { x: 0.2, y: 0.6 } }), 250);
    setTimeout(() => confetti({ ...base, particleCount: 120, spread: 100, origin: { x: 0.8, y: 0.6 } }), 500);
  }
}

export function AchievementsProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<AchievementId[]>([]);
  const [toasts, setToasts] = useState<AchievementId[]>([]);
  const unlockedRef = useRef<AchievementId[]>([]);
  const konamiPos = useRef(0);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as AchievementId[];
      const valid = saved.filter((id) => ACHIEVEMENTS.some((a) => a.id === id));
      unlockedRef.current = valid;
      setUnlocked(valid);
    } catch {
      /* fresh start */
    }
  }, []);

  const unlock = useCallback((id: AchievementId) => {
    if (unlockedRef.current.includes(id)) return;
    const next = [...unlockedRef.current, id];
    unlockedRef.current = next;
    setUnlocked(next);
    setToasts((t) => [...t, id]);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* private mode etc. */
    }
    if (id === "konami") fireConfetti(false);
    if (next.length === ACHIEVEMENTS.length) fireConfetti(true);
    setTimeout(() => setToasts((t) => t.slice(1)), 4200);
  }, []);

  // "hello, world" — just for arriving and sticking around a moment
  useEffect(() => {
    const t = setTimeout(() => unlock("hello-world"), 2500);
    return () => clearTimeout(t);
  }, [unlock]);

  // konami code listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[konamiPos.current]) {
        konamiPos.current += 1;
        if (konamiPos.current === KONAMI.length) {
          konamiPos.current = 0;
          unlock("konami");
        }
      } else {
        konamiPos.current = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [unlock]);

  // "deep diver" — reached the footer
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) unlock("deep-diver");
      },
      { threshold: 0.4 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [unlock]);

  return (
    <AchievementsContext.Provider value={{ unlocked, unlock }}>
      {children}

      {/* unlock toasts */}
      <div className="fixed bottom-5 left-5 z-[80] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((id) => {
            const a = ACHIEVEMENTS.find((x) => x.id === id)!;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: -60, rotate: -4 }}
                animate={{ opacity: 1, x: 0, rotate: -1 }}
                exit={{ opacity: 0, x: -60 }}
                className="card px-4 py-3 flex items-center gap-3 shadow-xl max-w-[300px]"
              >
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <p className="hand text-lg leading-none">achievement unlocked!</p>
                  <p className="text-sm font-semibold mt-1">{a.title}</p>
                  <p className="text-xs text-muted mt-0.5">{a.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </AchievementsContext.Provider>
  );
}

/** Trophy counter for the navbar — opens the achievements panel. */
export function TrophyButton() {
  const { unlocked } = useAchievements();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-muted hover:border-accent hover:text-accent transition-colors"
        aria-label="Your achievements"
        title="Your achievements"
      >
        <Trophy size={14} className="text-accent" />
        <span className="font-mono text-xs">
          {unlocked.length}/{ACHIEVEMENTS.length}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 16, rotate: -1 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="card w-full max-w-md p-6 relative"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-muted hover:text-foreground"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <p className="hand text-2xl">visitor achievements</p>
              <p className="text-sm text-muted mt-1 mb-4">
                yes, this portfolio has achievements. find all {ACHIEVEMENTS.length}.
              </p>

              <div className="h-2 rounded-full bg-background border border-line overflow-hidden mb-5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "var(--accent)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(unlocked.length / ACHIEVEMENTS.length) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>

              <ul className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                {ACHIEVEMENTS.map((a) => {
                  const done = unlocked.includes(a.id);
                  return (
                    <li
                      key={a.id}
                      className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
                        done ? "border-accent/40 bg-accent-soft" : "border-line bg-background opacity-60"
                      }`}
                    >
                      <span className="text-xl">{done ? a.icon : "🔒"}</span>
                      <div>
                        <p className="text-sm font-medium">{done ? a.title : "???"}</p>
                        <p className="text-xs text-muted">{done ? a.desc : "keep exploring…"}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Anchor that unlocks an achievement when clicked. */
export function TrackedLink({
  achievement,
  children,
  ...props
}: { achievement: AchievementId } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { unlock } = useAchievements();
  return (
    <a
      {...props}
      onClick={(e) => {
        unlock(achievement);
        props.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
