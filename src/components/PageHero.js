import { Fragment } from "react";
import Link from "next/link";
import SplitReveal from "@/components/SplitReveal";
import { Eyebrow } from "@/components/SectionHeader";

// Shared page opener: "• Label" pill on the left; breadcrumb, word-reveal
// title and intro on the right. `media` (e.g. an ExpandingMedia) renders
// full-bleed underneath; `children` sit under the intro.
export default function PageHero({ eyebrow, crumbs, title, intro, media, children }) {
  return (
    <section className="pt-32 md:pt-44">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 md:pb-24">
        <div className="lg:col-span-3">
          <span className="inline-flex border border-gray-300 dark:border-gray-700 rounded-full px-5 py-2.5">
            <Eyebrow className="normal-case tracking-normal text-sm">{eyebrow}</Eyebrow>
          </span>
        </div>
        <div className="lg:col-span-9">
          {crumbs && (
            <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
              {crumbs.map((c, i) => (
                <Fragment key={c.label}>
                  {i > 0 && <span className="mx-2">/</span>}
                  {c.href ? (
                    <Link href={c.href} className="hover:text-gray-900 dark:hover:text-white transition">{c.label}</Link>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </Fragment>
              ))}
            </nav>
          )}
          <SplitReveal
            as="h1"
            text={title}
            className="text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight dark:text-white"
          />
          {intro && <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mt-6">{intro}</p>}
          {children}
        </div>
      </div>
      {media}
    </section>
  );
}
