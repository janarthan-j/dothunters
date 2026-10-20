"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Watches internal link clicks to fade the outgoing page and run a top
// progress bar until the new route's pathname lands.
export default function RouteTransition() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timers = useRef([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    delete document.documentElement.dataset.navigating;
    setProgress(1);
    timers.current.push(setTimeout(() => setVisible(false), 250));
    timers.current.push(setTimeout(() => setProgress(0), 600));
  }, [clearTimers]);

  useEffect(() => {
    const start = () => {
      clearTimers();
      document.documentElement.dataset.navigating = "true";
      setVisible(true);
      setProgress(0.08);
      timers.current.push(setTimeout(() => setProgress(0.45), 60));
      timers.current.push(setTimeout(() => setProgress(0.7), 600));
      timers.current.push(setTimeout(() => setProgress(0.88), 1800));
      // Safety net if navigation never resolves
      timers.current.push(setTimeout(() => finish(), 10000));
    };

    const onClick = (e) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      start();
    };

    // Capture phase: next/link calls preventDefault() before bubbling reaches us
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [clearTimers, finish]);

  useEffect(() => {
    if (document.documentElement.dataset.navigating) finish();
  }, [pathname, finish]);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <div
      aria-hidden="true"
      className="route-progress"
      style={{ opacity: visible ? 1 : 0, transform: `scaleX(${progress})` }}
    />
  );
}
