"use client";
import { Fragment, useEffect, useState } from "react";

const SLIDE_MS = 10000; // total time per slide, typing included
// The heading (after the static "We") types out over STEPS ticks; once it's complete the
// subtitle slides up, and it fades out again when the heading starts erasing.
const STEPS = 40;
const TYPE_STEP_MS = 50; // 2s to type
const DELETE_STEP_MS = 15; // 0.6s to erase

// Heading + subtitle pairs. First is the overview; the rest each cover one discipline.
// Every heading starts with a static "We" (STATIC_WORD); headings keep the same shape (two lines + red accent line) so the hero height stays stable.
const slides = [
  {
    heading: ["Build &", "Grow Digital"],
    accent: "Products.",
    tagline: "Software, AI, mobile apps, immersive 3D/VR and digital marketing — one studio to build and grow your product end to end.",
  },
  {
    heading: ["Engineer", "Software That"],
    accent: "Scales.",
    tagline: "Custom web platforms and SaaS products, engineered to scale with your business.",
  },
  {
    heading: ["Put AI", "to Work for"],
    accent: "Your Business.",
    tagline: "AI and machine learning that automates the busywork and turns your data into decisions.",
  },
  {
    heading: ["Build Apps", "People Keep"],
    accent: "Using.",
    tagline: "Mobile apps for iOS and Android, designed and built for real-world use.",
  },
  {
    heading: ["Create", "Immersive"],
    accent: "Worlds.",
    tagline: "Immersive 3D, VR/AR and game experiences that people remember.",
  },
  {
    heading: ["Grow", "Your Brand"],
    accent: "Online.",
    tagline: "Digital marketing across SEO, paid ads and social, tuned against real numbers, not vanity metrics.",
  },
  {
    heading: ["Design", "Brands That"],
    accent: "Stand Out.",
    tagline: "UI/UX design, motion graphics and video that make your brand look as good as it works.",
  },
];

const STATIC_WORD = "We";
const headingParts = (slide) => [...slide.heading, slide.accent];
const headingLength = (slide) => headingParts(slide).join("").length;
const shownChars = (length, step) => Math.ceil((length * step) / STEPS);

const Cursor = ({ className }) => (
  <span aria-hidden="true" className={`inline-block align-baseline bg-red-500 animate-pulse ${className}`} />
);

// "We" stays put; the heading lines after it are cut to the first `count` characters.
// The last line is the red accent.
function HeadingText({ slide, count, cursor }) {
  let remaining = count;
  const parts = headingParts(slide);
  const lines = parts.map((part, i) => {
    const isAccent = i === parts.length - 1;
    const shown = part.slice(0, Math.max(0, remaining));
    // At a line boundary the cursor moves to the start of the next line
    const isCursorHere = cursor && remaining >= 0 && (remaining < part.length || isAccent);
    remaining -= part.length;
    return (
      <Fragment key={i}>
        {isAccent ? <span className="text-red-500">{shown}</span> : shown}
        {isCursorHere && <Cursor className="w-[0.08em] h-[0.85em] ml-1 -mb-[0.05em]" />}
        {!isAccent && <br />}
      </Fragment>
    );
  });
  return <>{STATIC_WORD} {lines}</>;
}

export default function HeroRotator() {
  // First slide starts fully typed so the server-rendered page has real text.
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(STEPS);
  const [phase, setPhase] = useState("hold"); // hold → deleting → typing → hold

  const slide = slides[index];

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer;

    if (phase === "hold") {
      const hold = reduceMotion ? SLIDE_MS : SLIDE_MS - STEPS * (TYPE_STEP_MS + DELETE_STEP_MS);
      timer = setTimeout(() => {
        if (reduceMotion) setIndex((i) => (i + 1) % slides.length);
        else setPhase("deleting");
      }, hold);
    } else if (phase === "deleting") {
      timer = setTimeout(() => {
        if (step > 0) return setStep((n) => n - 1);
        setIndex((i) => (i + 1) % slides.length);
        setPhase("typing");
      }, DELETE_STEP_MS);
    } else {
      timer = setTimeout(() => {
        if (step < STEPS) setStep((n) => n + 1);
        else setPhase("hold");
      }, TYPE_STEP_MS);
    }

    return () => clearTimeout(timer);
  }, [phase, step, index]);

  const headingChars = shownChars(headingLength(slide), step);

  const showTagline = phase === "hold";

  // Every slide's heading and subtitle share one grid cell, reserving the tallest slide's
  // height so nothing below shifts while the text changes.
  return (
    <>
      <h1 className="grid grid-cols-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-gray-900 dark:text-white mb-5">
        <span className="sr-only">{[STATIC_WORD, ...headingParts(slide)].join(" ")}</span>
        {slides.map((s) => (
          <span key={s.accent} aria-hidden="true" className="invisible [grid-area:1/1]">
            <HeadingText slide={s} count={Infinity} />
          </span>
        ))}
        <span aria-hidden="true" className="[grid-area:1/1]">
          <HeadingText slide={slide} count={headingChars} cursor />
        </span>
      </h1>

      <p className="grid grid-cols-1 text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-md">
        <span className="sr-only">{slide.tagline}</span>
        {slides.map((s, i) => (
          <span
            key={s.accent}
            aria-hidden="true"
            className={`[grid-area:1/1] motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${
              i === index && showTagline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {s.tagline}
          </span>
        ))}
      </p>
    </>
  );
}
