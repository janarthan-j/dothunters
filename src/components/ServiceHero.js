import Image from "next/image";
import Link from "next/link";
import SplitReveal from "@/components/SplitReveal";
import { Eyebrow, ArrowCircle, ArrowLink } from "@/components/SectionHeader";
import { getServiceArt } from "@/data/serviceArt";

// Service page hero, matching the share card: copy on the left; the service's
// 3D artwork on the right, floating over a glow with a thick blue arc and thin
// orbit rings beneath it. Its rings replace the site-wide ones on these pages
// (see .service-hero in globals.css).
export default function ServiceHero({ service }) {
  const art = getServiceArt(service.slug);

  return (
    <section className="service-hero relative overflow-hidden pt-28 md:pt-36 pb-12 md:pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        {/* Copy */}
        <div className="lg:col-span-6 relative z-10">
          <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-gray-900 dark:hover:text-white transition">Services</Link>
          </nav>

          <Eyebrow className="mb-6 !text-gray-500 dark:!text-gray-300 tracking-[0.25em]">Services</Eyebrow>

          <SplitReveal
            as="h1"
            text={service.title}
            className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.02] tracking-tight dark:text-white"
          />
          <p className="text-gray-500 dark:text-gray-400 text-xl md:text-2xl leading-snug mt-6 max-w-lg">
            {service.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-8 mt-10">
            <Link
              href={`/get-started?service=${service.slug}`}
              className="arrow-link group inline-flex items-center gap-4 bg-red-500 text-white rounded-full pl-7 pr-1.5 py-1.5 text-xs font-semibold uppercase tracking-widest hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900"
            >
              Start a project
              <ArrowCircle className="w-11 h-11 bg-white text-red-500 group-hover:text-gray-900" />
            </Link>
            {service.pricing ? (
              <ArrowLink href="#pricing">See pricing</ArrowLink>
            ) : (
              <ArrowLink href="/contact">Talk to us</ArrowLink>
            )}
          </div>
        </div>

        {/* Artwork stage */}
        <div className="lg:col-span-6 relative h-[380px] sm:h-[460px] lg:h-[580px]" aria-hidden="true">
          {/* Rings, centred below the artwork so only their upper arcs show */}
          <div className="service-hero__rings absolute left-1/2 top-[58%] -translate-x-1/2">
            <span className="service-hero__ring service-hero__ring--arc" />
            <span className="service-hero__ring service-hero__ring--1" />
            <span className="service-hero__ring service-hero__ring--2" />
          </div>
          {/* Glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.35),transparent_68%)] dark:bg-[radial-gradient(circle,rgba(139,92,246,0.45),transparent_68%)]" />

          {art && (
            <div className="service-hero__art absolute inset-0 flex items-center justify-center">
              <Image
                src={art.src}
                alt=""
                width={art.width}
                height={art.height}
                priority
                sizes="(min-width: 1024px) 560px, 90vw"
                className="h-full w-auto max-w-full object-contain drop-shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
