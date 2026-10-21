// Static dot grid behind the hero. Same pattern as the .dot-bg utility:
// 1.5px dots every 28px in --dot-color, which follows light/dark mode.
export default function HeroDotGrid() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        backgroundImage: "radial-gradient(circle, var(--dot-color) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
        opacity: 0.55,
      }}
    />
  );
}
