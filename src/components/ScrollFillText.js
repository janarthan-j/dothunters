"use client";
import { useRef } from "react";
import { useScrollScene, clamp01 } from "@/lib/scrollScene";

const DIM = 0.2;

// Statement text whose words light up one by one as it scrolls up the page
export default function ScrollFillText({ as: Tag = "p", text, className = "" }) {
  const ref = useRef(null);
  const words = text.split(" ");

  useScrollScene(ref, (rect, vh) => {
    // 0 when the top enters the lower part of the screen, 1 once its middle passes ~35% from the top
    const p = clamp01((vh * 0.9 - rect.top) / (vh * 0.55 + rect.height * 0.5));
    const spans = ref.current.children;
    const n = spans.length;
    for (let i = 0; i < n; i++) {
      const o = (DIM + (1 - DIM) * clamp01(p * n - i)).toFixed(3);
      if (spans[i].style.opacity !== o) spans[i].style.opacity = o;
    }
  });

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i}>{i > 0 ? ` ${word}` : word}</span>
      ))}
    </Tag>
  );
}
