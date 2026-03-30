"use client";
import Link from "next/link";
import { services } from "@/data/services";
import { Layout, Code2, Gamepad2, Clapperboard, AppWindow, Cloud, Smartphone, Video } from "lucide-react";

const icons = {
  "ui-ux-design":                <Layout      className="w-10 h-10" strokeWidth={1.5} />,
  "web-development":             <Code2       className="w-10 h-10" strokeWidth={1.5} />,
  "3d-vr-game-development":      <Gamepad2    className="w-10 h-10" strokeWidth={1.5} />,
  "motion-graphics":             <Clapperboard className="w-10 h-10" strokeWidth={1.5} />,
  "web-application-development": <AppWindow   className="w-10 h-10" strokeWidth={1.5} />,
  "saas-product-development":    <Cloud       className="w-10 h-10" strokeWidth={1.5} />,
  "mobile-app-development":      <Smartphone  className="w-10 h-10" strokeWidth={1.5} />,
  "video-production":            <Video       className="w-10 h-10" strokeWidth={1.5} />,
};

export default function ServicesPage() {
  return (
    <main>
      {/* Page Hero */}
      <section className="dot-bg bg-gray-50 dark:bg-gray-800 py-24 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">What we do</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl mb-6 dark:text-white">
            Services built for <span className="text-red-500">digital growth.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl">
            From strategy to shipping — we cover every layer of the digital product lifecycle.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`group border rounded-2xl p-10 flex flex-col justify-between hover:shadow-xl transition-all duration-300 ${
                  i === 0 ? "border-red-400" : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div>
                  <div className="text-gray-800 dark:text-gray-200 mb-6 group-hover:text-red-500 transition">
                    {icons[service.slug]}
                  </div>
                  <h2 className="text-2xl font-bold mb-3 dark:text-white">{service.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.approach.slice(0, 3).map((step) => (
                      <li key={step.number} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {step.title}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 mt-8 text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-red-500 transition">
                  Explore service
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Not sure where to start?</h2>
            <p className="text-gray-400">Tell us about your project and we&apos;ll point you in the right direction.</p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-sm transition shrink-0"
          >
            Get a Free Consultation
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
