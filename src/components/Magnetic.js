"use client";
import { useEffect, useRef } from "react";

// Pulls its child toward the pointer while the pointer is over the enclosing
// link/button, then springs back on leave. Mouse-only, off for reduced motion.
export default function Magnetic({ children, strength = 0.35, max = 14, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const zone = el.closest("a, button") || el;
    let tx = 0;
    let ty = 0;
    const clamp = (v) => Math.max(-max, Math.min(max, v));

    const onMove = (e) => {
      // Rect includes the current offset; remove it to get the resting centre
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 - tx;
      const cy = r.top + r.height / 2 - ty;
      tx = clamp((e.clientX - cx) * strength);
      ty = clamp((e.clientY - cy) * strength);
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      el.style.transform = "";
    };

    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
    };
  }, [strength, max]);

  return (
    <span ref={ref} className={`magnetic inline-flex ${className}`}>
      {children}
    </span>
  );
}
