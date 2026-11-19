"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A gentle, optional breathing guide: breathe in 4 seconds, hold 4, breathe out 6.
 * It never starts on its own, can be paused at any time, and keeps the circle
 * still for visitors who prefer reduced motion (the timed prompts still work).
 */
const PHASES = [
  { label: "Breathe in", seconds: 4, scale: 1 },
  { label: "Hold", seconds: 4, scale: 1 },
  { label: "Breathe out", seconds: 6, scale: 0.62 },
] as const;

export default function BreathingGuide({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [running, setRunning] = useState(false);
  const [tick, setTick] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    timer.current = setInterval(() => setTick((t) => t + 1), 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [running]);

  // Work out the current phase and seconds remaining from elapsed time
  const cycleLength = PHASES.reduce((n, p) => n + p.seconds, 0);
  let pos = tick % cycleLength;
  let phase = 0;
  while (pos >= PHASES[phase].seconds) {
    pos -= PHASES[phase].seconds;
    phase += 1;
  }
  const current = PHASES[phase];
  const count = current.seconds - pos;
  const started = tick > 0 || running;

  const toggle = () => setRunning((r) => !r);
  const reset = () => {
    setRunning(false);
    setTick(0);
  };
  const scale = running ? current.scale : 0.62;
  const dark = tone === "dark";

  return (
    <div className={`rounded-3xl p-6 sm:p-8 ${dark ? "bg-ivory/5 ring-1 ring-ivory/15" : "bg-ivory/70 ring-1 ring-gold-light/50"}`}>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
        <div className="relative grid h-44 w-44 shrink-0 place-items-center" aria-hidden>
          <span className={`absolute inset-0 rounded-full border ${dark ? "border-gold-light/40" : "border-gold-light/70"}`} />
          <span className={`absolute inset-3 rounded-full border ${dark ? "border-gold-light/25" : "border-gold-light/45"}`} />
          <span
            className="breath-orb absolute inset-5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#8b4fc0_0%,#49047e_55%,#2e0b47_100%)] shadow-[0_20px_50px_-20px_rgba(73,4,126,0.7)]"
            style={{
              transform: `scale(${scale})`,
              transitionDuration: running ? `${current.seconds}s` : "0.8s",
            }}
          />
          <span className="relative text-center font-serif text-ivory">
            <span className="block text-lg leading-tight">{running ? current.label : tick > 0 ? "Paused" : "Ready"}</span>
            {running && <span className="block text-sm text-ivory/80">{count}</span>}
          </span>
        </div>
        <div className="text-center sm:text-left">
          <p className={`font-serif text-2xl ${dark ? "text-ivory" : "text-plum"}`}>Take a calm breath</p>
          <p className={`mt-2 text-[0.95rem] ${dark ? "text-ivory/75" : "text-stone"}`}>
            A simple breathing pattern: in for four, hold for four, out for six. Follow the circle for a minute or two.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
            <button type="button" onClick={toggle} className={`btn !min-h-11 !px-6 ${dark ? "btn-light" : "btn-primary"}`} aria-pressed={running}>
              {running ? "Pause" : tick > 0 ? "Resume" : "Begin"}
            </button>
            {started && (
              <button type="button" onClick={reset} className={`btn !min-h-11 !px-6 ${dark ? "btn-outline-light" : "btn-outline"}`}>
                Reset
              </button>
            )}
          </div>
          <p className="sr-only" aria-live="polite">
            {running ? `${current.label}, ${current.seconds} seconds` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
