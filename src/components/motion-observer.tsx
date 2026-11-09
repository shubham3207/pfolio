"use client";

import { useEffect } from "react";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Plays each `.reveal` element's entrance once as it scrolls into view.
 *
 * It never writes attributes or classes to React-rendered elements. Next.js hydrates the page
 * in stages, so a section can still be un-hydrated when this runs (for example after a reload
 * with the scroll position restored mid-page); changing its attributes then would cause a
 * hydration mismatch. The Web Animations API changes nothing in the HTML, so there is nothing
 * to mismatch. CSS holds `.reveal` hidden only while <html> has the `motion` class.
 */
export function MotionObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");
    if (!root.classList.contains("motion")) return;

    const shown = new WeakSet<Element>();

    const reveal = (el: Element) => {
      if (shown.has(el)) return;
      shown.add(el);
      const delay = parseFloat(getComputedStyle(el).getPropertyValue("--reveal-delay")) || 0;
      el.animate(
        [
          { opacity: 0, transform: "translateY(14px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 550, delay, easing: EASE, fill: "forwards" },
      );
      // Timeline milestones settle into place just after their entry arrives.
      el.querySelector(":scope > .timeline-node")?.animate(
        [
          { transform: "scale(0.55)", opacity: 0.4 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 450, delay: delay + 150, easing: EASE, fill: "forwards" },
      );
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const watch = (scope: ParentNode) =>
      scope.querySelectorAll(".reveal").forEach((el) => {
        if (!shown.has(el)) io.observe(el);
      });
    watch(document);

    // Elements added later (hot reload in development, or React replacing a subtree).
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches(".reveal") && !shown.has(node)) io.observe(node);
          watch(node);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
