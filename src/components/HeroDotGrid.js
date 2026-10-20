"use client";
import { useEffect, useRef } from "react";

const SPACING = 28;

// A lit dot reaches out to 1–6 nearby dots; when a line arrives the new dot lights up
// and the old one dissolves back to the base colour. Each spread stops after MAX_DEPTH hops.
const ACCENT = [249, 115, 22];
const MAX_NODES = 40; // lit dots on screen at once
const MAX_DEPTH = 10; // hops per spread
const SEED_EVERY_MS = 1400; // how often a new spread starts (when there is room)
const APPEAR_MS = 500; // a seed dot fading in
const ARRIVE_MS = 220; // a reached dot popping in
const HOLD_MS = 450; // lit dot rests before reaching out
const LINK_MS = 750; // line travelling to its target
const LINK_FADE_MS = 900; // line fading after it arrives
const FADE_MS = 1300; // old dot dissolving back to the base colour
const MIN_REACH = 2; // target distance, in grid cells
const MAX_REACH = 4.5;
// Each spread is its own network; networks keep apart and their lines never cross
const NETWORK_GAP = 3; // min cells between a new dot and another network's dots
const SEED_GAP = 6; // min cells between a new spread and any other network
const SEED_RADIUS = 3; // the first spread starts within this many cells of the centre

const easeOut = (t) => 1 - (1 - t) ** 3;
const clamp01 = (t) => Math.min(1, Math.max(0, t));
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

// Do segments p1–p2 and p3–p4 cross? (grid coordinates)
function segmentsCross([ax, ay], [bx, by], [cx, cy], [dx, dy]) {
  const cross = (px, py, qx, qy, rx, ry) => (qx - px) * (ry - py) - (qy - py) * (rx - px);
  const d1 = cross(cx, cy, dx, dy, ax, ay);
  const d2 = cross(cx, cy, dx, dy, bx, by);
  const d3 = cross(ax, ay, bx, by, cx, cy);
  const d4 = cross(ax, ay, bx, by, dx, dy);
  return d1 * d2 < 0 && d3 * d4 < 0;
}

// Chance of each branch count (1–6); bigger bursts are rarer
const BRANCH_WEIGHTS = [0.3, 0.25, 0.2, 0.12, 0.08, 0.05];

function branchCount() {
  let r = Math.random();
  for (let i = 0; i < BRANCH_WEIGHTS.length; i++) {
    r -= BRANCH_WEIGHTS[i];
    if (r < 0) return i + 1;
  }
  return BRANCH_WEIGHTS.length;
}

export default function HeroDotGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let animFrame;
    let last = performance.now();
    let sinceSeed = SEED_EVERY_MS;
    let nextNetwork = 0;
    const nodes = new Map(); // "col,row" -> { col, row, net, depth, age, appearMs, branched, fadeAt }
    const links = []; // { from: [col,row], to: [col,row], net, depth, age, arrived }
    const networks = new Map(); // net id -> cells it has claimed ([col,row]), kept until it fully fades

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) draw(0);
    }

    const toX = (col) => col * SPACING;
    const toY = (row) => row * SPACING;
    const isVisible = (col, row) => {
      const x = toX(col);
      return x > SPACING && x < width - SPACING && row > 0 && toY(row) < height - SPACING;
    };
    const key = (col, row) => `${col},${row}`;
    const isTaken = (col, row) =>
      nodes.has(key(col, row)) || links.some((l) => !l.arrived && l.to[0] === col && l.to[1] === row);

    // Distance (in cells) from a point to the nearest dot claimed by a network other than `net`
    function distanceToOthers(col, row, net) {
      let min = Infinity;
      for (const [id, cells] of networks) {
        if (id === net) continue;
        for (const [c, r] of cells) min = Math.min(min, Math.hypot(c - col, r - row));
      }
      return min;
    }

    const crossesOtherNetwork = (from, to, net) =>
      links.some((l) => l.net !== net && segmentsCross(from, to, l.from, l.to));

    function addNode(col, row, net, depth, appearMs) {
      nodes.set(key(col, row), { col, row, net, depth, age: 0, appearMs, branched: false, fadeAt: null });
    }

    function seed() {
      for (let attempt = 0; attempt < 30; attempt++) {
        // The first spread starts in the middle; later ones start from random dots
        const fromCentre = nextNetwork === 0;
        const col = fromCentre
          ? Math.round(width / SPACING / 2 + (Math.random() * 2 - 1) * SEED_RADIUS)
          : Math.floor(Math.random() * (width / SPACING));
        const row = fromCentre
          ? Math.round(height / SPACING / 2 + (Math.random() * 2 - 1) * SEED_RADIUS)
          : Math.floor(Math.random() * (height / SPACING));
        if (!isVisible(col, row) || isTaken(col, row) || distanceToOthers(col, row) < SEED_GAP) continue;
        const net = nextNetwork++;
        networks.set(net, [[col, row]]);
        return addNode(col, row, net, 0, APPEAR_MS);
      }
    }

    function pickTarget(col, row, net) {
      for (let attempt = 0; attempt < 25; attempt++) {
        const dc = Math.round((Math.random() * 2 - 1) * MAX_REACH);
        const dr = Math.round((Math.random() * 2 - 1) * MAX_REACH);
        const dist = Math.hypot(dc, dr);
        if (dist < MIN_REACH || dist > MAX_REACH) continue;
        const target = [col + dc, row + dr];
        if (
          isVisible(...target) &&
          !isTaken(...target) &&
          distanceToOthers(...target, net) >= NETWORK_GAP &&
          !crossesOtherNetwork([col, row], target, net)
        ) {
          return target;
        }
      }
      return null;
    }

    function branch(node) {
      node.branched = true;
      const room = MAX_NODES - nodes.size - links.filter((l) => !l.arrived).length;
      const count = node.depth < MAX_DEPTH ? Math.min(branchCount(), room) : 0;
      let sent = 0;
      for (let i = 0; i < count; i++) {
        const target = pickTarget(node.col, node.row, node.net);
        if (!target) continue;
        networks.get(node.net).push(target); // claim it now so other networks steer clear
        links.push({ from: [node.col, node.row], to: target, net: node.net, depth: node.depth + 1, age: 0, arrived: false });
        sent++;
      }
      // The old dot dissolves once its lines reach their targets (or right away if it sent none)
      node.fadeAt = node.age + (sent ? LINK_MS : 0);
    }

    function update(dt) {
      sinceSeed += dt;
      if (sinceSeed >= SEED_EVERY_MS && nodes.size < MAX_NODES / 2) {
        sinceSeed = 0;
        seed();
      }

      for (const [k, node] of nodes) {
        node.age += dt;
        if (!node.branched && node.age >= node.appearMs + HOLD_MS) branch(node);
        if (node.fadeAt !== null && node.age >= node.fadeAt + FADE_MS) {
          nodes.delete(k);
        }
      }

      for (let i = links.length - 1; i >= 0; i--) {
        const link = links[i];
        link.age += dt;
        if (!link.arrived && link.age >= LINK_MS) {
          link.arrived = true;
          if (!nodes.has(key(...link.to))) addNode(link.to[0], link.to[1], link.net, link.depth, ARRIVE_MS);
        }
        if (link.age >= LINK_MS + LINK_FADE_MS) links.splice(i, 1);
      }

      // A network releases its space once all its dots and lines have faded
      for (const id of networks.keys()) {
        const alive = links.some((l) => l.net === id) || [...nodes.values()].some((n) => n.net === id);
        if (!alive) networks.delete(id);
      }
    }

    function nodeIntensity(node) {
      const appear = easeOut(clamp01(node.age / node.appearMs));
      if (node.fadeAt === null || node.age < node.fadeAt) return appear;
      return appear * (1 - clamp01((node.age - node.fadeAt) / FADE_MS));
    }

    function draw(dt) {
      if (dt) update(dt);
      ctx.clearRect(0, 0, width, height);

      const dark = document.documentElement.classList.contains("dark");
      const base = dark ? [45, 55, 72] : [209, 213, 219];

      // Base grid
      ctx.fillStyle = `rgba(${base.join(",")},0.55)`;
      for (let x = 0; x < width + SPACING; x += SPACING) {
        for (let y = 0; y < height + SPACING; y += SPACING) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Lines: grow toward the target, then fade
      ctx.lineWidth = 1;
      for (const link of links) {
        const progress = easeOut(clamp01(link.age / LINK_MS));
        const alpha = link.arrived ? 1 - clamp01((link.age - LINK_MS) / LINK_FADE_MS) : 1;
        const x1 = toX(link.from[0]);
        const y1 = toY(link.from[1]);
        const x2 = x1 + (toX(link.to[0]) - x1) * progress;
        const y2 = y1 + (toY(link.to[1]) - y1) * progress;
        ctx.strokeStyle = `rgba(${ACCENT.join(",")},${0.55 * alpha})`;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        if (!link.arrived) {
          ctx.fillStyle = `rgba(${ACCENT.join(",")},0.9)`;
          ctx.beginPath();
          ctx.arc(x2, y2, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Lit dots: colour, size and a soft halo follow intensity
      for (const node of nodes.values()) {
        const intensity = nodeIntensity(node);
        if (intensity <= 0) continue;
        const x = toX(node.col);
        const y = toY(node.row);
        ctx.fillStyle = `rgba(${ACCENT.join(",")},${0.15 * intensity})`;
        ctx.beginPath();
        ctx.arc(x, y, 7 * intensity, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${mix(base, ACCENT, intensity).join(",")},${0.55 + 0.45 * intensity})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.5 + 2 * intensity, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame(now) {
      const dt = Math.min(50, now - last); // cap so a backgrounded tab doesn't jump ahead
      last = now;
      draw(dt);
      animFrame = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) animFrame = requestAnimationFrame(frame);

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
