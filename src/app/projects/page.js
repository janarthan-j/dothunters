import { projects } from "@/data/projects";
import Link from "next/link";
import ParallaxImage from "@/components/ParallaxImage";
import PageHero from "@/components/PageHero";

export default function ProjectsPage() {
  return (
    <main>
      {/* ── Page Hero ── */}
      <PageHero
        eyebrow="Our portfolio"
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        title={["Take a look at", { text: "our projects.", className: "text-red-500" }]}
        intro="A selection of work across design, development, motion, and immersive experiences — built for clients who care about quality."
      />

      {/* ── Grid ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 md:gap-y-20 md:pb-32">
            {projects.map((project, i) => (
              <Link
                key={i}
                href={`/projects/${project.slug}`}
                data-cursor="View"
                className={`group cursor-pointer block ${i % 2 === 1 ? "md:translate-y-32" : ""}`}
              >
                {/* Image */}
                <ParallaxImage
                  src={project.image}
                  alt={project.title}
                  className="h-[280px] md:h-[420px] rounded-[2rem] mb-6 bg-gray-100 dark:bg-gray-800"
                  imgClassName="group-hover:scale-105 transition duration-700"
                />

                {/* Meta row */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {project.service}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{project.year}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2 group-hover:text-red-500 dark:group-hover:text-red-400 transition leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Status + categories */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{project.status}</span>
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="py-16 bg-white/25 dark:bg-white/[0.03] border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { value: "7",    label: "Projects Delivered" },
            { value: "5",    label: "Happy Clients" },
            { value: "7",    label: "Services Offered" },
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
            href="/get-started"
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
