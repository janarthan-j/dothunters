import HeroDotGrid from "./HeroDotGrid";
import MarqueeStrip from "./MarqueeStrip";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-100 dark:bg-gray-900 h-screen flex flex-col overflow-hidden">
      <HeroDotGrid />

      {/* Hero image — right side */}
      <img
        className="absolute top-0 right-0 h-full w-auto object-cover object-left pointer-events-none select-none animate-float"
        src="/images/hero.png"
        alt="Hero visual"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center flex-1 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-16 -mt-8">
        <div className="max-w-2xl">

          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-1.5 w-fit mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">Creative Studio</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-gray-900 dark:text-white mb-6">
            We Design &amp;<br />
            Build Digital<br />
            <span className="text-red-500">Experiences.</span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
            UI/UX design, web development, and motion crafted to grow your brand and convert your users.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-red-500 text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-red-600 transition"
            >
              Start a Project
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold text-sm transition"
            >
              <span className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              View Our Work
            </a>
          </div>
        </div>
      </div>

      {/* Marquee pinned to bottom of hero */}
      <div className="relative z-10 mt-auto">
        <MarqueeStrip />
      </div>
    </section>
  );
};

export default HeroSection;
