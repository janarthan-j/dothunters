// Generates the static Open Graph / Twitter share images into public/og/:
//   public/og/home.png                 homepage hero screenshot, cropped to 1200×630
//   public/og/services/<slug>.png      service card artwork on the site background
//
// Run after changing a service, its artwork or the hero:  npm run og
//
// Uses the @vercel/og renderer bundled with Next. Next 13.4's copy builds its asset
// paths with path.join(import.meta.url, ...), which breaks on Windows, so we load a
// patched copy that resolves them with new URL() instead.
import { createRequire } from "module";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import { pathToFileURL } from "url";

const root = process.cwd();
const require = createRequire(path.join(root, "package.json"));
const React = require("react");
const h = React.createElement;

const SIZE = { width: 1200, height: 630 };
const RED = "#ef4444";

async function loadImageResponse() {
  const entry = require.resolve("next/dist/compiled/@vercel/og/index.node.js");
  const assetsUrl = pathToFileURL(path.dirname(entry) + path.sep).href;
  const source = readFileSync(entry, "utf8").replace(
    /join\(import\.meta\.url, "\.\.\/([^"]+)"\)/g,
    (_, file) => `new URL(${JSON.stringify(file)}, ${JSON.stringify(assetsUrl)})`
  );
  const patched = path.join(tmpdir(), `vercel-og-patched-${process.pid}.mjs`);
  writeFileSync(patched, source);
  return (await import(pathToFileURL(patched).href)).ImageResponse;
}

const dataUri = (publicPath) =>
  `data:image/png;base64,${readFileSync(path.join(root, "public", publicPath)).toString("base64")}`;

// Pixel size of a PNG, read from its IHDR chunk
function pngSize(publicPath) {
  const buf = readFileSync(path.join(root, "public", publicPath));
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

// Space Grotesk (the site font) as TTF; Google serves TTF to clients that
// don't advertise woff2. Falls back to the bundled default font if offline.
async function brandFonts() {
  try {
    const css = await (await fetch("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700")).text();
    const faces = [...css.matchAll(/font-weight:\s*(\d+);[\s\S]*?src:\s*url\(([^)]+)\)/g)];
    return await Promise.all(
      faces.map(async ([, weight, url]) => ({
        name: "Space Grotesk",
        data: await (await fetch(url)).arrayBuffer(),
        weight: Number(weight),
        style: "normal",
      }))
    );
  } catch (err) {
    console.warn("Space Grotesk unavailable, using default font:", err.message);
    return [];
  }
}

async function save(ImageResponse, element, file, fonts) {
  const res = new ImageResponse(element, { ...SIZE, fonts });
  const buf = Buffer.from(await res.arrayBuffer());
  const out = path.join(root, "public", file);
  mkdirSync(path.dirname(out), { recursive: true });
  writeFileSync(out, buf);
  console.log(`  ${file}  ${Math.round(buf.length / 1024)}KB`);
}

// ── Homepage: hero screenshot, scaled to the card height and centre-cropped ──
function homeCard() {
  const src = "/images/og/home-hero.png";
  const { width, height } = pngSize(src);
  const scaledWidth = Math.round((width * SIZE.height) / height);
  return h(
    "div",
    { style: { display: "flex", width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#04070f" } },
    h("img", {
      src: dataUri(src),
      width: scaledWidth,
      height: SIZE.height,
      style: { position: "absolute", top: 0, left: -Math.round((scaledWidth - SIZE.width) / 2) },
    })
  );
}

// ── Service: artwork on navy with the blue top light and orbit rings ──
function serviceCard(service, fontFamily) {
  const artPath = `/images/services/cards/${service.slug}.png`;
  const art = pngSize(artPath);
  const artHeight = 560;
  const artWidth = Math.round((art.width * artHeight) / art.height);
  const title = service.title;

  const ring = (r, i) =>
    h("div", {
      key: r,
      style: {
        position: "absolute",
        left: 880 - r,
        top: 650 - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        border: i === 0 ? "14px solid rgba(59,130,246,0.55)" : "1.5px solid rgba(79,110,168,0.45)",
      },
    });

  return h(
    "div",
    { style: { display: "flex", width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#04070f", fontFamily } },
    // Blue light from the top
    h("div", {
      style: {
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex",
        backgroundImage: "radial-gradient(ellipse 60% 75% at 66% 0%, rgba(80,150,255,0.55), rgba(37,99,235,0.16) 50%, transparent 78%)",
      },
    }),
    // Orbit rings under the artwork
    ...[360, 470, 590].map(ring),
    // Soft glow behind the artwork
    h("div", {
      style: {
        position: "absolute", left: 640, top: 120, width: 480, height: 480, borderRadius: "50%", display: "flex",
        backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)",
      },
    }),
    // Artwork
    h("img", { src: dataUri(artPath), width: artWidth, height: artHeight, style: { position: "absolute", right: 40, bottom: 10 } }),
    // Copy
    h(
      "div",
      { style: { position: "relative", display: "flex", flexDirection: "column", padding: "60px 0 56px 72px", width: 660, height: "100%" } },
      h("img", { src: dataUri("/logo/logo-horizontal-white.png"), width: 175, height: 44 }),
      h(
        "div",
        { style: { display: "flex", flexDirection: "column", marginTop: "auto", marginBottom: "auto" } },
        h(
          "div",
          { style: { display: "flex", alignItems: "center", color: "#cbd5e1", fontSize: 22, fontWeight: 500, letterSpacing: 4 } },
          h("div", { style: { width: 10, height: 10, borderRadius: 5, background: RED, marginRight: 14 } }),
          "SERVICES"
        ),
        h(
          "div",
          { style: { display: "flex", color: "#ffffff", fontSize: title.length > 22 ? 64 : 74, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, marginTop: 22 } },
          title
        ),
        h(
          "div",
          { style: { display: "flex", color: "#94a3b8", fontSize: 30, fontWeight: 500, lineHeight: 1.35, marginTop: 24, maxWidth: 540 } },
          service.tagline
        )
      ),
      h(
        "div",
        { style: { display: "flex", alignItems: "center", color: "#e2e8f0", fontSize: 22, fontWeight: 500 } },
        h("div", { style: { width: 8, height: 8, borderRadius: 4, background: RED, marginRight: 12 } }),
        "dothunters.com"
      )
    )
  );
}

const ImageResponse = await loadImageResponse();
const fonts = await brandFonts();
const fontFamily = fonts.length ? "Space Grotesk" : undefined;
const services = JSON.parse(readFileSync(path.join(root, "src/data/services.json"), "utf8"));

console.log("Generating share images:");
await save(ImageResponse, homeCard(), "og/home.png", fonts);
for (const service of services) {
  await save(ImageResponse, serviceCard(service, fontFamily), `og/services/${service.slug}.png`, fonts);
}
