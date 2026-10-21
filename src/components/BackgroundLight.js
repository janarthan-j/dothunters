"use client";
import { useEffect } from "react";

// Site-wide background, behind every page:
// - a half circle of blue light hanging from the top centre that slowly rises
//   and sets (fixed to the window)
// - concentric orbit rings with travelling dots and one thick glowing arc,
//   centred under the beam at the top of the page (scrolls away with it)
// - fine grain over the light so it doesn't band
// Styles live in the "background light" block of globals.css.

// Ring radii in SVG units; the first is the thick glowing arc
const ARC = 380;
const RINGS = [470, 560, 680, 810];

// Dots per ring: [ring index, angles in degrees]
const DOTS = [
  [0, [0, 40, 80, 140, 200, 250, 300, 330]],
  [1, [15, 70, 125, 190, 235, 285, 345]],
  [2, [30, 95, 160, 215, 265, 320]],
  [3, [5, 60, 130, 180, 240, 300]],
];

const point = (r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180; // 0° = top of the circle
  return [Math.cos(a) * r, Math.sin(a) * r];
};

// Grain is random per-pixel noise drawn once at the screen's pixel density.
// (SVG turbulence scaled into a repeating tile clumped into a visible dot pattern.)
const NOISE_TILE = 128; // CSS px

function noiseTile(shade, px) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = px;
  const ctx = canvas.getContext("2d");
  const img = ctx.createImageData(px, px);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] = d[i + 1] = d[i + 2] = shade;
    d[i + 3] = Math.random() * 255;
  }
  ctx.putImageData(img, 0, 0);
  return `url(${canvas.toDataURL("image/png")})`;
}

export default function BackgroundLight() {
  useEffect(() => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const px = Math.round(NOISE_TILE * dpr);
    const root = document.documentElement.style;
    // Dark specks for light mode, light specks for dark mode; CSS picks by theme
    root.setProperty("--noise-dark-specks", noiseTile(0, px));
    root.setProperty("--noise-light-specks", noiseTile(255, px));
  }, []);

  return (
    <>
      <div className="bg-light" aria-hidden="true">
        <span className="bg-light__halo" />
        {/* Half circle of light with a hot core at the top edge */}
        <span className="bg-light__lamp">
          <span className="bg-light__beam" />
          <span className="bg-light__source" />
        </span>
      </div>

      <div className="bg-orbits" aria-hidden="true">
        <svg className="bg-orbits__svg" viewBox="-850 -850 1700 1700" fill="none">
          {/* Theme colours go through style: SVG presentation attributes can't read CSS vars */}
          <defs>
            {/* Bright at the top of the arc, fading toward its sides */}
            <linearGradient id="arc-fade" x1="0" y1={-ARC} x2="0" y2={-ARC * 0.2} gradientUnits="userSpaceOnUse">
              <stop offset="0%" style={{ stopColor: "var(--orbit-arc)" }} stopOpacity="1" />
              <stop offset="100%" style={{ stopColor: "var(--orbit-arc)" }} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ring-fade" x1="0" y1="-850" x2="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" style={{ stopColor: "var(--orbit-ring)" }} stopOpacity="1" />
              <stop offset="100%" style={{ stopColor: "var(--orbit-ring)" }} stopOpacity="0" />
            </linearGradient>
            <filter id="arc-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>

          {/* Thin rings */}
          {RINGS.map((r) => (
            <circle key={r} r={r} stroke="url(#ring-fade)" strokeWidth="1.25" />
          ))}

          {/* Thick arc: blurred glow underneath, crisp stroke on top */}
          <circle r={ARC} stroke="url(#arc-fade)" strokeWidth="34" filter="url(#arc-glow)" opacity="0.8" />
          <circle r={ARC} stroke="url(#arc-fade)" strokeWidth="22" />

          {/* Travelling dots, one rotating group per ring */}
          {DOTS.map(([ring, angles]) => (
            <g key={ring} className={`bg-orbits__dots bg-orbits__dots--${ring}`}>
              {angles.map((deg) => {
                const [x, y] = point(RINGS[ring], deg);
                return <circle key={deg} cx={x.toFixed(1)} cy={y.toFixed(1)} r={ring === 0 ? 4 : 3.5} style={{ fill: "var(--orbit-dot)" }} />;
              })}
            </g>
          ))}
        </svg>
      </div>
    </>
  );
}
