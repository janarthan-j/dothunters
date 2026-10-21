"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Inertia scrolling on desktop wheels/trackpads. Touch keeps native scrolling,
// and reduced-motion users never get Lenis at all.
export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Anchor jumps stop below the fixed navbar
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -88 } });
    lenisRef.current = lenis;

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Back/Forward should land where the visitor left off; anything else is a fresh page
  const isHistoryNav = useRef(false);
  useEffect(() => {
    const onPop = () => { isHistoryNav.current = true; };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // New page: start at the top (Next only scrolls far enough to bring the new
  // segment into view). Back/Forward or #anchor links keep the browser's position.
  // Either way, resync Lenis so a glide from the previous page can't drag on.
  useEffect(() => {
    const fromHistory = isHistoryNav.current;
    isHistoryNav.current = false;
    const id = requestAnimationFrame(() => {
      const lenis = lenisRef.current;
      const toTop = !fromHistory && !window.location.hash;
      if (toTop) window.scrollTo(0, 0);
      if (lenis) {
        lenis.scrollTo(toTop ? 0 : window.scrollY, { immediate: true, force: true });
        lenis.resize();
      }
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
