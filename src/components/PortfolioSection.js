"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import SectionHeader from "@/components/SectionHeader";
import DragScroll from "@/components/DragScroll";
import { useScrollScene, clamp01 } from "@/lib/scrollScene";

// Projects flagged `"featured": true` in projects.json; until any are, the first five
const flagged = projects.filter((p) => p.featured);
const featured = (flagged.length ? flagged : projects).slice(0, 5);

const ArrowBox = () => (
  <span className="arrow-link__circle w-9 h-9 rounded-lg bg-white/[0.15] group-hover:bg-red-500 flex items-center justify-center overflow-hidden">
    <svg className="arrow-link__icon w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </span>
);

const cardSize = "w-[82vw] sm:w-[60vw] lg:w-[42vw] max-w-[720px] h-[55vh] min-h-[340px] max-h-[580px]";

function ProjectCard({ project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="View"
      draggable={false}
      className={`arrow-link group relative shrink-0 snap-start rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 ${cardSize}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt={project.title}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
      />
      {/* Frosted title pill */}
      <span className="absolute left-5 bottom-5 md:left-7 md:bottom-7 inline-flex items-center gap-4 rounded-xl bg-black/[0.45] backdrop-blur-md pl-5 pr-2 py-2 text-white text-sm font-semibold uppercase tracking-wide">
        {project.title}
        <ArrowBox />
      </span>
    </Link>
  );
}

function AllWorkCard() {
  return (
    <Link
      href="/projects"
      draggable={false}
      className={`arrow-link group shrink-0 snap-start rounded-[2rem] border border-gray-300 dark:border-gray-700 flex flex-col justify-end p-8 md:p-10 hover:border-red-500 !w-[70vw] sm:!w-[40vw] lg:!w-[26vw] ${cardSize}`}
    >
      <span className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
        <span className="text-gray-400 dark:text-gray-500">See all</span>
        <br />
        our work
      </span>
      <span className="arrow-link__circle w-14 h-14 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 group-hover:bg-red-500 group-hover:text-white flex items-center justify-center overflow-hidden">
        <svg className="arrow-link__icon w-5 h-5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </span>
    </Link>
  );
}

const header = (
  <SectionHeader
    eyebrow="Portfolio"
    title={["Selected", "projects."]}
    link={{ href: "/projects", label: "All work" }}
    className="!mb-10 md:!mb-12"
  />
);

// Desktop: the section pins while vertical scroll slides the row sideways.
function PinnedRow() {
  const outer = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const [height, setHeight] = useState(null);

  // Section height = one screen + however far the row has to travel
  useEffect(() => {
    const measure = () => {
      // Resize/observer callbacks can fire after unmount, before cleanup runs
      if (!track.current || !outer.current) return;
      const travel = Math.max(0, track.current.scrollWidth - document.documentElement.clientWidth);
      setHeight(window.innerHeight + travel);
      outer.current.dataset.travel = travel;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useScrollScene(outer, (rect, vh) => {
    const travel = Number(outer.current.dataset.travel || 0);
    const p = travel ? clamp01(-rect.top / (rect.height - vh)) : 0;
    track.current.style.transform = `translate3d(${(-p * travel).toFixed(1)}px, 0, 0)`;
    bar.current.style.transform = `scaleX(${p.toFixed(4)})`;
  });

  return (
    <section ref={outer} className="relative" style={{ height: height ? `${height}px` : undefined }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center pt-16">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">{header}</div>
        <div ref={track} className="drag-scroll--bleed flex gap-6 w-max will-change-transform">
          {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
          <AllWorkCard />
        </div>
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 mt-8">
          <div className="h-px bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <div ref={bar} className="h-full bg-red-500 origin-left" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Phones, tablets and reduced motion: a plain swipe/drag row
function SwipeRow() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">{header}</div>
      <DragScroll className="drag-scroll--bleed pb-2 !gap-6">
        {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
        <AllWorkCard />
      </DragScroll>
    </section>
  );
}

const PortfolioSection = () => {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return pinned ? <PinnedRow /> : <SwipeRow />;
};

export default PortfolioSection;
