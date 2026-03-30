import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getServiceBySlug } from "@/data/services";
import ServiceHeroSlideshow from "@/components/ServiceHeroSlideshow";

const serviceTools = {
  "ui-ux-design":           ["Figma", "Adobe XD", "Maze", "Zeplin"],
  "web-development":        ["React", "Next.js", "Node.js", "TypeScript"],
  "3d-vr-game-development": ["Unity", "Unreal", "Blender", "WebXR"],
  "motion-graphics":        ["After Effects", "Cinema 4D", "Lottie", "Premiere"],
  "mobile-apps":            ["React Native", "Flutter", "Swift", "Kotlin"],
  "saas-products":          ["Next.js", "Supabase", "Stripe", "Vercel"],
  "video-production":       ["Premiere Pro", "DaVinci Resolve", "After Effects", "Frame.io"],
  "web-applications":       ["React", "Node.js", "PostgreSQL", "Docker"],
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const StarIcon = () => (
  <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <main>
      {/* ── Hero Slideshow ── */}
      <ServiceHeroSlideshow
        images={service.heroImages}
        title={service.title}
        tagline={service.tagline}
      />

      {/* ── Overview ── */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">Overview</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight dark:text-white mb-6">
                {service.tagline}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-6">
                {service.description}
              </p>
              {serviceTools[service.slug] && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {serviceTools[service.slug].map((tool) => (
                    <span
                      key={tool}
                      className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-gray-900 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition"
              >
                Start a Project
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "120+", label: "Projects Delivered" },
                { value: "98%",  label: "Client Satisfaction" },
                { value: "5+",   label: "Years Experience" },
                { value: "24h",  label: "Avg. Response Time" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-6"
                >
                  <p className="text-3xl font-bold text-red-500 mb-1">{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section className="dot-bg py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">How we work</p>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white mb-16 max-w-xl">
            Our approach to {service.title.toLowerCase()}.
          </h2>
          <div className="grid md:grid-cols-4 gap-0">
            {service.approach.map((step, i) => (
              <div key={i} className="border-t-2 border-black dark:border-white pt-8 pr-8">
                <span className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase">{step.number}</span>
                <h4 className="text-xl font-bold mt-2 mb-3 dark:text-white">{step.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-3">Work</p>
              <h2 className="text-4xl md:text-5xl font-bold dark:text-white">Recent Projects.</h2>
            </div>
            <Link
              href="/projects"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition text-sm font-medium shrink-0"
            >
              View all projects
              <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {service.projects.map((project, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="overflow-hidden rounded-xl mb-4 bg-gray-100 dark:bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[240px] object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-red-500 dark:group-hover:text-red-400 transition">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 dark:text-gray-500">{project.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="dot-bg py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-3">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white mb-12">What clients say.</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {service.testimonials.map((t, i) => (
              <div
                key={i}
                className={`border rounded-xl p-8 flex flex-col justify-between hover:shadow-lg transition ${
                  i === 0 ? "border-red-400" : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, s) => <StarIcon key={s} />)}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm dark:text-white">{t.name}</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Services ── */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-3">Explore more</p>
          <h2 className="text-4xl font-bold dark:text-white mb-12">Other services.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group border border-gray-200 dark:border-gray-700 rounded-xl p-7 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-500 transition"
              >
                <h3 className="font-bold text-lg mb-2 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition">
                  {s.title}
                </h3>
                <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{s.tagline}</p>
                <span className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400 transition">
                  Learn more
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Ready to start your {service.title.toLowerCase()} project?
            </h2>
            <p className="text-gray-400">Tell us about your goals and we&apos;ll get back within 24 hours.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-sm transition justify-center"
            >
              Start a Project
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white px-8 py-4 rounded-full font-semibold text-sm transition justify-center"
            >
              All Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
