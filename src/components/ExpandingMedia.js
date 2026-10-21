"use client";
import { useRef } from "react";
import { useScrollScene, clamp01 } from "@/lib/scrollScene";

// Wide media block that starts inset to the content column with rounded
// corners and opens out to full width as it scrolls up. Its contents drift
// slower than the page for depth. Children fill `.absolute inset-0`.
export default function ExpandingMedia({ children, className = "" }) {
  const ref = useRef(null);
  const layer = useRef(null);

  useScrollScene(ref, (rect, vh, vw) => {
    // Expand while the top travels from the bottom of the screen to 15% from the top
    const p = clamp01((vh - rect.top) / (vh * 0.85));
    const eased = 1 - (1 - p) * (1 - p);
    // Start lined up with the max-w-7xl content column
    const side = vw >= 1024 ? Math.max(32, (vw - 1280) / 2 + 32) : 24;
    const inset = side * (1 - eased);
    const radius = 48 - 24 * eased;
    ref.current.style.clipPath = `inset(0 ${inset.toFixed(1)}px 0 ${inset.toFixed(1)}px round ${radius.toFixed(1)}px)`;

    // Parallax over the whole time it's on screen
    const q = clamp01((vh - rect.top) / (vh + rect.height));
    const shift = (q - 0.5) * 2 * rect.height * 0.08;
    layer.current.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
  });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ clipPath: "inset(0 round 24px)" }}>
      <div ref={layer} className="absolute inset-x-0 -top-[8%] -bottom-[8%] will-change-transform">
        {children}
      </div>
    </div>
  );
}
