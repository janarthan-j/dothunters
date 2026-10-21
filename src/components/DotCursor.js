"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const INTERACTIVE = "a, button, [role='button'], label, summary, [data-cursor]";
const TEXT_FIELD = "input, textarea, select, [contenteditable='true']";

// Brand dot that trails the pointer. Grows over interactive elements and
// shows a label over anything with data-cursor="View" (or any other text).
// Mouse-only; the native cursor stays so nothing is lost for usability.
export default function DotCursor() {
  const ref = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const label = el.querySelector(".dot-cursor__label");
    const ease = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0.2;
    const pos = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let raf = null;

    const tick = () => {
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      const settled = Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1;
      raf = settled ? null : requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!el.classList.contains("is-visible")) {
        // Appear at the pointer instead of flying in from the corner
        pos.x = target.x;
        pos.y = target.y;
        el.classList.add("is-visible");
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      if (e.target.closest(TEXT_FIELD)) {
        el.dataset.state = "hidden";
        return;
      }
      const hit = e.target.closest(INTERACTIVE);
      const text = hit?.dataset.cursor;
      if (text) label.textContent = text;
      el.dataset.state = text ? "label" : hit ? "hover" : "";
    };

    const onLeave = () => el.classList.remove("is-visible");
    const onDown = () => el.classList.add("is-pressed");
    const onUp = () => el.classList.remove("is-pressed");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  // The hovered link is gone after navigation; drop its hover state
  useEffect(() => {
    if (ref.current) ref.current.dataset.state = "";
  }, [pathname]);

  return (
    <div ref={ref} className="dot-cursor" aria-hidden="true">
      <div className="dot-cursor__dot">
        <span className="dot-cursor__label" />
      </div>
    </div>
  );
}
