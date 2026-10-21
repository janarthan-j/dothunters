import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { getServiceBySlug } from "@/data/services";
import ProjectGallery from "@/components/ProjectGallery";
import ExpandingMedia from "@/components/ExpandingMedia";
import ScrollFillText from "@/components/ScrollFillText";
import PageHero from "@/components/PageHero";
import MediaCard from "@/components/MediaCard";
import SectionHeader, { Eyebrow, ArrowLink } from "@/components/SectionHeader";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const service = getServiceBySlug(project.serviceSlug);
  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const meta = [
    { label: "Service", value: project.service, href: project.serviceSlug && `/services/${project.serviceSlug}` },
    project.client && { label: "Client", value: project.client },
    { label: "Platform", value: project.platform.join(" + ") },
    project.url
      ? { label: "Preview", value: new URL(project.url).hostname.replace(/^www\./, ""), href: project.url, external: true }
      : { label: "Status", value: project.status },
  ].filter(Boolean);

  return (
    <main>
      {/* ── Hero ── */}
      <PageHero
        eyebrow="Project details"
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }]}
        title={project.title}
        intro={project.tagline}
        media={
          <ExpandingMedia className="h-[60vh] md:h-[85vh] min-h-[420px] bg-gray-800">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </ExpandingMedia>
        }
      >
            {/* Meta row */}
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 mt-12">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-sm text-gray-400 dark:text-gray-500 mb-1.5">{m.label}</dt>
                  <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                    {m.href ? (
                      <a
                        href={m.href}
                        {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="hover:text-red-500 dark:hover:text-red-400 transition"
                      >
                        {m.value}
                      </a>
                    ) : (
                      m.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
      </PageHero>

      {/* ── Overview ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-8 lg:gap-y-20">
            <Eyebrow className="lg:col-span-4 lg:pt-3">Project overview</Eyebrow>
            <ScrollFillText
              text={project.overview}
              className="lg:col-span-8 text-gray-900 dark:text-white text-2xl md:text-4xl font-semibold leading-snug tracking-tight"
            />

            <div className="lg:col-start-3 lg:col-span-10 grid sm:grid-cols-2 gap-10 sm:gap-16 border-t border-gray-200 dark:border-gray-800 pt-10">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The problem</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The solution</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{project.solution}</p>
              </div>
              <div className="sm:col-span-2 flex flex-wrap gap-x-10 gap-y-4">
                <ArrowLink href="/get-started">Start a project</ArrowLink>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
                  >
                    Visit live site ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="dot-bg py-24 bg-white/25 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow="Highlights" title={["What it", "does."]} className="border-gray-300 dark:border-gray-700" />
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow="Gallery" title={["A closer", "look."]} />
          <ProjectGallery images={project.gallery} title={project.title} />
        </div>
      </section>

      {/* ── Other Projects ── */}
      <section className="dot-bg py-24 bg-white/25 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Explore more"
            title={["Other", "projects."]}
            link={{ href: "/projects", label: "All work" }}
            className="border-gray-300 dark:border-gray-700"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {otherProjects.map((p) => (
              <MediaCard
                key={p.slug}
                href={`/projects/${p.slug}`}
                image={p.image}
                title={p.title}
                caption={p.service}
              />
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
