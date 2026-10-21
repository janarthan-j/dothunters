"use client";
import Image from "next/image";
import {
  GraduationCap,
  GitBranch, ShieldCheck, Activity, Lock, BookOpen, LifeBuoy,
  MapPin,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import SectionHeader, { ArrowLink } from "@/components/SectionHeader";
import {
  projectFlow, team, visitSteps, visitNote, productionChecklist,
} from "@/data/culture";

const icons = {
  GitBranch, ShieldCheck, Activity, Lock, BookOpen, LifeBuoy,
};

const initials = (name) => name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
const stepNumber = (i) => String(i + 1).padStart(2, "0");

const SectionHeading = ({ eyebrow, title, accent, text, invert }) => (
  <SectionHeader eyebrow={eyebrow} title={accent ? [title, accent] : title} text={text} invert={invert} />
);

export default function CulturePage() {
  return (
    <main>
      <PageHero
        eyebrow="Our culture"
        crumbs={[{ label: "Home", href: "/" }, { label: "Culture" }]}
        title={["Built together.", { text: "Delivered as one.", className: "text-red-500" }]}
        intro="A multi-disciplinary team across Batticaloa, Jaffna, Hatton and Colombo, guided by senior engineers and focused on software that works in the real world."
      />

      {/* Project flow */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="How we work"
              title="From kickoff"
              accent="to launch."
              text="Every project follows the same clear path, with seniors setting the direction and the whole team building it."
            />
          </ScrollReveal>
          <ol className="relative grid gap-6 lg:grid-cols-5">
            <span aria-hidden="true" className="hidden lg:block absolute top-6 left-6 right-6 h-px bg-gray-200 dark:bg-gray-700" />
            {projectFlow.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 80}>
                <li className="relative">
                  <span className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white text-sm font-bold mb-5">
                    {stepNumber(i)}
                  </span>
                  <h3 className="text-lg font-bold mb-2 dark:text-white">{s.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.text}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="The team"
              title="The people behind"
              accent="the dots."
              text="Every project is guided by senior engineers, with the whole team building alongside them."
            />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <ScrollReveal key={m.slug} delay={i * 60}>
                <div className="group h-full bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-gray-700/60 rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-square bg-red-500/10 overflow-hidden">
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        style={{ objectPosition: m.photoPosition || "center 15%" }}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-red-500">
                        {initials(m.name)}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold dark:text-white">{m.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{m.role}</p>
                    <div className="flex flex-wrap gap-2">
                      {m.disciplines.map((d) => (
                        <span key={d} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                          {d}
                        </span>
                      ))}
                    </div>
                    {m.education && (
                      <p className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <GraduationCap className="w-4 h-4 text-red-500 shrink-0" strokeWidth={1.75} />
                        {m.education}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Customer premises visits */}
      <section className="dot-bg py-24 bg-white/25 dark:bg-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="On-site visits"
              title="We come to you"
              accent="when it matters."
              text="Some things are better done in the room — understanding a workflow, installing hardware, training a team. We travel to you for the moments that count."
            />
          </ScrollReveal>
          <ol className="grid md:grid-cols-4 gap-6">
            {visitSteps.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 80}>
                <li className="relative h-full bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-gray-700/60 rounded-[2rem] p-8">
                  <span className="block text-5xl font-bold text-red-500/20 mb-4">{stepNumber(i)}</span>
                  <h3 className="text-lg font-bold mb-2 dark:text-white">{s.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.text}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
          <p className="mt-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4 text-red-500 shrink-0" strokeWidth={1.75} />
            {visitNote}
          </p>
        </div>
      </section>

      {/* Production-ready delivery */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Delivery"
              title="Production-ready,"
              accent="not demo-ready."
              text="We don't hand over prototypes. Everything we ship is built to run, scale and be maintained."
            />
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productionChecklist.map((c, i) => {
              const Icon = icons[c.icon];
              return (
                <ScrollReveal key={c.title} delay={i * 60}>
                  <div className="h-full border border-gray-200 dark:border-gray-700 rounded-[2rem] p-8 flex gap-5">
                    <Icon className="w-7 h-7 text-red-500 shrink-0" strokeWidth={1.5} />
                    <div>
                      <h3 className="text-lg font-bold mb-2 dark:text-white">{c.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <div className="mt-12">
            <ArrowLink href="/projects">See what we’ve shipped</ArrowLink>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
