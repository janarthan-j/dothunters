"use client";
import { useState } from "react";
import projects from "@/data/projects.json";

const filters = ["All", ...Array.from(new Set(projects.flatMap((p) => p.categories))).sort()];

const PortfolioSection = () => {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(active));

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-3">Portfolio</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white">Recent Projects.</h2>
            <a href="/projects" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition text-sm font-medium">
              View all projects
              <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
                active === f
                  ? "bg-black text-white border-black dark:bg-white dark:text-gray-900 dark:border-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <div key={i} className="group cursor-pointer">
              {/* Image */}
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-red-500 dark:group-hover:text-red-400 transition">
                {project.title}
              </h3>
              {/* Categories */}
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {project.categories.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
