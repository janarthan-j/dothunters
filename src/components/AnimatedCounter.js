"use client";
import { useState, useEffect, useRef } from "react";

// Only "one number + optional suffix" (e.g. "24h", "5+", "98%") animates; anything else renders as-is.
const SIMPLE_VALUE = /^\d+\D*$/;

export default function AnimatedCounter({ value, className = "" }) {
  const animated = SIMPLE_VALUE.test(value);
  const num = animated ? parseInt(value, 10) : 0;
  const suffix = animated ? value.replace(/^\d+/, "") : "";
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!animated) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const steps = 60;
          const increment = num / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              setCount(num);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated, num]);

  if (!animated) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
