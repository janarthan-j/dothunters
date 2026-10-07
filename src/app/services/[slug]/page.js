import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getServiceBySlug } from "@/data/services";
import ServiceHeroSlideshow from "@/components/ServiceHeroSlideshow";
import TestimonialsSection from "@/components/TestimonialsSection";
import { testimonials } from "@/data/testimonials";

const serviceTools = {
  "web-design-development": ["Figma", "Next.js", "React", "Node.js"],
  "3d-vr-game-development": ["Unity", "Unreal", "Blender", "WebXR"],
  "motion-graphics":        ["After Effects", "Cinema 4D", "Lottie", "Premiere"],
  "mobile-app-development": ["React Native", "Flutter", "Swift", "Kotlin"],
  "saas-product-development": ["Next.js", "Supabase", "Stripe", "Vercel"],
  "video-production":       ["Premiere Pro", "DaVinci Resolve", "After Effects", "Frame.io"],
  "ai-ml-development":      ["Python", "PyTorch", "OpenCV", "LangChain"],
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

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
                href="/get-started"
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
                { value: "7",    label: "Projects Delivered" },
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
            {service.projects.map((project, i) => {
              const Wrapper = project.slug ? Link : "div";
              const wrapperProps = project.slug ? { href: `/projects/${project.slug}` } : {};
              return (
                <Wrapper key={i} {...wrapperProps} className="group cursor-pointer block">
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
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <TestimonialsSection
        testimonials={testimonials.filter((t) => t.serviceSlug === service.slug)}
        title="What clients say."
        className="dot-bg bg-gray-50 dark:bg-gray-800"
      />

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
              href="/get-started"
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
