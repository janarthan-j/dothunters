"use client";
import Link from "next/link";
import { Layout, Code2, Gamepad2, Clapperboard } from "lucide-react";
import { services } from "@/data/services";

const icons = {
  "ui-ux-design":           <Layout       className="w-10 h-10" strokeWidth={1.5} />,
  "web-development":        <Code2        className="w-10 h-10" strokeWidth={1.5} />,
  "3d-vr-game-development": <Gamepad2     className="w-10 h-10" strokeWidth={1.5} />,
  "motion-graphics":        <Clapperboard className="w-10 h-10" strokeWidth={1.5} />,
};

const tools = {
  "ui-ux-design":           ["Figma", "Adobe XD", "Maze", "Zeplin"],
  "web-development":        ["React", "Next.js", "Node.js", "TypeScript"],
  "3d-vr-game-development": ["Unity", "Unreal", "Blender", "WebXR"],
  "motion-graphics":        ["After Effects", "Cinema 4D", "Lottie", "Premiere"],
};

// Show only the 4 core services on the homepage
const featured = services.filter((s) => icons[s.slug]);

const ServicesSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500 dark:text-gray-400 font-medium tracking-widest uppercase text-sm">Services</p>
          <Link href="/services" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition text-sm font-medium">
            View All Services
            <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 md:mb-14 max-w-3xl dark:text-white">
          We help you go online &amp; increase your conversion rate.
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`group flex flex-col border rounded-xl p-8 hover:shadow-xl transition-all duration-300 ${
                index === 0 ? "border-red-400" : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {/* Icon */}
              <div className="text-gray-800 dark:text-gray-200 group-hover:text-red-500 transition mb-6">
                {icons[service.slug]}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 flex-1">
                {service.description}
              </p>

              {/* Approach steps */}
              <ul className="space-y-2 mb-6">
                {service.approach.slice(0, 3).map((step) => (
                  <li key={step.number} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <svg className="w-3.5 h-3.5 text-red-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {step.title}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <span className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400 transition">
                Explore service
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
