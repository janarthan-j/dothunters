"use client";
import { useEffect, useRef } from "react";

const SPACING = 28;
const SPEED = -0.15;           // dot grid scroll speed (px/frame)
const MAX_HIGHLIGHTS = 25;    // dots highlighted at a time
const HIGHLIGHT_SPEED = 0.006; // pulse speed — lower = slower fade (0.01–0.05)

export default function HeroDotGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let offset = 0;
    let animFrame;
    const highlights = {};

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function spawnIfNeeded() {
      const active = Object.keys(highlights).length;
      if (active >= MAX_HIGHLIGHTS) return;

      const cols = Math.ceil(canvas.width / SPACING) + 2;
      const rows = Math.ceil(canvas.height / SPACING) + 1;

      // fill up to MAX_HIGHLIGHTS with new random dots
      let attempts = 0;
      while (Object.keys(highlights).length < MAX_HIGHLIGHTS && attempts < 50) {
        const col = Math.floor(Math.random() * cols);
        const row = Math.floor(Math.random() * rows);
        const key = `${col},${row}`;
        if (!highlights[key]) highlights[key] = { t: 0, col, row };
        attempts++;
      }
    }

    function isDark() {
      return document.documentElement.classList.contains("dark");
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      offset = (offset + SPEED) % SPACING;

      const cols = Math.ceil(canvas.width / SPACING) + 2;
      const rows = Math.ceil(canvas.height / SPACING) + 1;
      const dark = isDark();
      const baseColor = dark ? "45,55,72" : "209,213,219";

      // advance highlights, remove finished ones
      for (const key in highlights) {
        highlights[key].t += HIGHLIGHT_SPEED;
        if (highlights[key].t > 1) delete highlights[key];
      }

      // keep exactly 5 alive
      spawnIfNeeded();

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * SPACING - offset;
          const y = r * SPACING;
          const key = `${c},${r}`;
          const h = highlights[key];

          if (h) {
            const pulse = Math.sin(h.t * Math.PI);
            ctx.fillStyle = `rgba(249,115,22,${0.15 + pulse * 0.85})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.5 + pulse * 2.5, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = `rgba(${baseColor},0.55)`;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animFrame = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
