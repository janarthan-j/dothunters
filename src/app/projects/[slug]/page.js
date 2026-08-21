import { notFound } from "next/navigation";
import Link from "next/link";
import projects from "@/data/projects.json";
import { getServiceBySlug } from "@/data/services";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const service = getServiceBySlug(project.serviceSlug);
  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative bg-gray-900">
        <div className="aspect-[16/7] w-full bg-gray-800">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-14 w-full">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {project.serviceSlug && (
                <Link
                  href={`/services/${project.serviceSlug}`}
                  className="text-xs font-semibold uppercase tracking-widest bg-red-500 text-white px-3 py-1 rounded-full"
                >
                  {project.service}
                </Link>
              )}
              <span className="text-xs font-medium uppercase tracking-widest text-gray-200 border border-white/30 px-3 py-1 rounded-full">
                {project.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
              {project.title}
            </h1>
            <p className="text-gray-300 text-lg mt-4 max-w-2xl">{project.tagline}</p>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">Overview</p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10">
                {project.overview}
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">The Problem</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">The Solution</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Meta sidebar */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 h-fit">
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Service</p>
                  {project.serviceSlug ? (
                    <Link href={`/services/${project.serviceSlug}`} className="font-semibold text-gray-900 dark:text-white hover:text-red-500 transition">
                      {project.service}
                    </Link>
                  ) : (
                    <p className="font-semibold text-gray-900 dark:text-white">{project.service}</p>
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Platform</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{project.platform.join(" + ")}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Status</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{project.status}</p>
                </div>
                <Link
                  href="/get-started"
                  className="inline-flex w-full items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="dot-bg py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">Highlights</p>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white mb-16 max-w-xl">
            What it does.
          </h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            {project.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">Gallery</p>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white mb-12">A closer look.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {project.gallery.map((img, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Projects ── */}
      <section className="dot-bg py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-3">Explore more</p>
          <h2 className="text-4xl font-bold dark:text-white mb-12">Other projects.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {otherProjects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="group cursor-pointer block">
                <div className="overflow-hidden rounded-xl mb-4 bg-gray-100 dark:bg-gray-700">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-[200px] object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-red-500 dark:group-hover:text-red-400 transition">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-400 dark:text-gray-500">{p.service}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Want something like this built?</h2>
            <p className="text-gray-400">Tell us about your goals and we&apos;ll get back within 24 hours.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-sm transition justify-center"
            >
              Start a Project
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white px-8 py-4 rounded-full font-semibold text-sm transition justify-center"
            >
              All Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
