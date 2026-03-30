"use client";
import { useState } from "react";
import projects from "@/data/projects.json";
import Link from "next/link";

const allCategories = ["All", ...Array.from(new Set(projects.flatMap((p) => p.categories))).sort()];
const allServices  = ["All Services", ...Array.from(new Set(projects.map((p) => p.service))).sort()];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeService,  setActiveService]  = useState("All Services");

  const filtered = projects.filter((p) => {
    const catMatch = activeCategory === "All" || p.categories.includes(activeCategory);
    const svcMatch = activeService  === "All Services" || p.service === activeService;
    return catMatch && svcMatch;
  });

  return (
    <main>
      {/* ── Page Hero ── */}
      <section className="dot-bg bg-gray-50 dark:bg-gray-800 py-24 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">Our Work</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl mb-6 dark:text-white">
            Projects we&apos;re <span className="text-red-500">proud of.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl">
            A selection of work across design, development, motion, and immersive experiences — built for clients who care about quality.
          </p>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-[57px] z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                  activeCategory === c
                    ? "bg-black text-white border-black dark:bg-white dark:text-gray-900 dark:border-white"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Service dropdown */}
          <select
            value={activeService}
            onChange={(e) => setActiveService(e.target.value)}
            className="text-sm border border-gray-200 dark:border-gray-600 rounded-full px-4 py-1.5 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 focus:outline-none focus:border-gray-400 dark:focus:border-gray-400 cursor-pointer"
          >
            {allServices.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg font-medium">No projects match these filters.</p>
              <button
                onClick={() => { setActiveCategory("All"); setActiveService("All Services"); }}
                className="mt-4 text-sm underline hover:text-gray-700 transition"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {filtered.map((project, i) => (
                <div key={i} className="group cursor-pointer">
                  {/* Image */}
                  <div className="overflow-hidden rounded-xl mb-5 bg-gray-100 dark:bg-gray-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      {project.service}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{project.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-500 dark:group-hover:text-red-400 transition leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Client + categories */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{project.client}</span>
                    <div className="flex gap-1">
                      {project.categories.map((cat) => (
                        <span
                          key={cat}
                          className="text-xs border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5 text-gray-500 dark:text-gray-400"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Result count */}
          <p className="text-xs text-gray-400 mt-12 text-center">
            Showing {filtered.length} of {projects.length} projects
          </p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { value: "120+", label: "Projects Delivered" },
            { value: "60+",  label: "Happy Clients" },
            { value: "8",    label: "Services Offered" },
            { value: "98%",  label: "Client Satisfaction" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Want to be on this list?</h2>
            <p className="text-gray-400">Let&apos;s build something worth showcasing.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-sm transition shrink-0"
          >
            Start a Project
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
