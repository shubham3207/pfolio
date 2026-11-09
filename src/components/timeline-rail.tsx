"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The timeline list. While motion is on, it writes scroll progress (0–1) to `--progress`,
 * which draws the forest-green line down the rail as the reader moves through the section.
 * Without motion the line is simply drawn in full.
 */
export function TimelineRail({ children, labelledBy }: { children: ReactNode; labelledBy: string }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !document.documentElement.classList.contains("motion")) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // The line reaches a milestone as it passes ~70% of the way down the viewport.
      const progress = (window.innerHeight * 0.7 - rect.top) / rect.height;
      el.style.setProperty("--progress", Math.min(1, Math.max(0, progress)).toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={ref} aria-labelledby={labelledBy} className="timeline relative">
      {children}
    </ol>
  );
}
