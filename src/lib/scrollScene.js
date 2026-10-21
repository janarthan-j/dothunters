"use client";
import { useEffect } from "react";

// One shared rAF loop for every scroll-linked effect. Each frame reads all
// element rects first, then runs all renders, so effects never force layout
// in between each other's style writes. Lenis drives native window scroll,
// so plain scroll events cover smooth scrolling too.
const scenes = new Map();
let raf = null;

function frame() {
  raf = null;
  const vh = window.innerHeight;
  const vw = document.documentElement.clientWidth;
  const reads = [];
  // React detaches refs on unmount before passive-effect cleanup unsubscribes,
  // so a frame can land in between; skip elements already gone from the page.
  scenes.forEach((render, el) => {
    if (el.isConnected) reads.push([render, el.getBoundingClientRect()]);
  });
  reads.forEach(([render, rect]) => {
    // Skip work for anything well outside the viewport
    if (rect.bottom < -vh * 0.5 || rect.top > vh * 1.5) return;
    render(rect, vh, vw);
  });
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(frame);
}

function subscribe(el, render) {
  if (scenes.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  scenes.set(el, render);
  schedule();
  return () => {
    scenes.delete(el);
    if (scenes.size === 0) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    }
  };
}

export const clamp01 = (v) => Math.min(1, Math.max(0, v));

// Calls render(rect, vh, vw) whenever the page scrolls or resizes. Does nothing
// for reduced-motion users, so components must render their final state by default.
export function useScrollScene(ref, render) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Same gap as above: callers read their refs, so bail if they've been cleared
    return subscribe(el, (rect, vh, vw) => {
      if (ref.current) render(rect, vh, vw);
    });
    // render is set up once per mount on purpose
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
