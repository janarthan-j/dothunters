import Image from "next/image";
import HeroDotGrid from "./HeroDotGrid";
import HeroRotator from "./HeroRotator";
import MarqueeStrip from "./MarqueeStrip";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-100 dark:bg-gray-900 h-screen flex flex-col overflow-hidden">
      <HeroDotGrid />

      {/* Hero image — centred above the text on mobile (smaller and faded on short
          phones, where it sits behind the text); right half of the content column
          on desktop, kept clear of the navbar and marquee */}
      <div className="absolute inset-x-0 top-24 h-[40%] sm:h-[44%] flex justify-center px-6 pointer-events-none select-none max-md:[@media(max-height:700px)]:h-[32%] max-md:[@media(max-height:700px)]:opacity-40 md:inset-y-0 md:top-0 md:h-auto md:max-w-7xl md:mx-auto md:justify-end md:items-center md:px-8 md:pt-28 md:pb-24">
        <Image
          src="/images/hero.png"
          alt="Hero visual"
          width={1122}
          height={1402}
          priority
          sizes="(min-width: 768px) 50vw, 90vw"
          className="h-full w-auto max-w-full md:max-w-[50%] md:max-h-[860px] object-contain animate-float"
        />
      </div>

      {/* Main content — bottom on mobile, centered on desktop */}
      <div className="relative z-10 flex flex-col justify-end md:justify-center flex-1 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-16 pb-10 md:pb-0 md:-mt-8">
        <div className="max-w-2xl">

          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-1.5 w-fit mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">Digital Product Studio</span>
          </div>

          {/* Heading + subtitle, rotating through each discipline */}
          <HeroRotator />

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="/get-started"
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

      {/* Marquee — hidden on mobile, visible on desktop */}
      <div className="relative z-10 mt-auto hidden md:block">
        <MarqueeStrip />
      </div>
    </section>
  );
};

export default HeroSection;
