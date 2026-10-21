"use client";
import { useRef } from "react";
import { useScrollScene, clamp01 } from "@/lib/scrollScene";

// Image that moves slower than its frame while scrolling. The frame needs a
// height (via className); hover effects go on the <img> through imgClassName.
export default function ParallaxImage({ src, alt, className = "", imgClassName = "", amount = 8 }) {
  const ref = useRef(null);
  const layer = useRef(null);

  useScrollScene(ref, (rect, vh) => {
    const q = clamp01((vh - rect.top) / (vh + rect.height));
    const shift = (q - 0.5) * 2 * rect.height * (amount / 100);
    layer.current.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
  });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div ref={layer} className="absolute inset-x-0 will-change-transform" style={{ top: `-${amount}%`, bottom: `-${amount}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} />
      </div>
    </div>
  );
}
