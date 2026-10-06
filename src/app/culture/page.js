"use client";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap, Wrench, FlaskConical, Users,
  GitBranch, ShieldCheck, Activity, Lock, BookOpen, LifeBuoy,
  Mail, MessageCircle, Phone, MapPin, ArrowUpRight,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import {
  projectFlow, mentorship, team, values,
  reach, reachChannels, visitSteps, visitNote, productionChecklist,
} from "@/data/culture";

const icons = {
  GraduationCap, Wrench, FlaskConical, Users,
  GitBranch, ShieldCheck, Activity, Lock, BookOpen, LifeBuoy,
};

const channelIcons = {
  "Email":    Mail,
  "WhatsApp": MessageCircle,
  "Phone":    Phone,
};

const initials = (name) => name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
const stepNumber = (i) => String(i + 1).padStart(2, "0");

const SectionHeading = ({ eyebrow, title, accent, text }) => (
  <div className="max-w-2xl mb-14">
    <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">{eyebrow}</p>
    <h2 className="text-4xl md:text-5xl font-bold leading-tight dark:text-white">
      {title} {accent && <span className="text-red-500">{accent}</span>}
    </h2>
    {text && <p className="text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">{text}</p>}
  </div>
);

export default function CulturePage() {
  return (
    <main>
      {/* Page Hero */}
      <section className="dot-bg bg-gray-50 dark:bg-gray-800 py-24 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">Our culture</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl mb-6 dark:text-white">
            Built together. <span className="text-red-500">Delivered as one.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl">
            A multi-disciplinary team across Batticaloa, Jaffna, Hatton and Colombo, guided by senior engineers and focused on software that works in the real world.
          </p>
        </div>
      </section>

      {/* Project flow */}
      <section className="py-24 bg-white dark:bg-gray-900">
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

      {/* Mentorship */}
      <section className="dot-bg py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="How we grow"
              title="Seniors lead."
              accent="Everyone grows."
              text="Senior engineers guide every project, and the whole team builds alongside them. Our juniors learn on real work, not on the sidelines."
            />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentorship.map((m, i) => {
              const Icon = icons[m.icon];
              return (
                <ScrollReveal key={m.title} delay={i * 80}>
                  <div className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                    <Icon className="w-8 h-8 text-red-500 mb-6" strokeWidth={1.5} />
                    <h3 className="text-xl font-bold mb-2 dark:text-white">{m.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{m.text}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white dark:bg-gray-900">
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
                <div className="group h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
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

      {/* Values with proof */}
      <section className="dot-bg py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="What we believe"
              title="Principles we"
              accent="actually ship."
            />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 80}>
                <div className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 dark:text-white">{v.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">{v.text}</p>
                  <Link
                    href={`/projects/${v.slug}`}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-600 transition"
                  >
                    {v.proof}
                    <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={2} />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick reach */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-2xl mb-14">
              <p className="uppercase tracking-widest text-gray-500 text-sm mb-4">Quick reach</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Wherever we are, <span className="text-red-500">we&apos;re easy to reach.</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center mb-14">
            {reach.map((r) => (
              <div key={r.label} className="flex flex-col items-center">
                <AnimatedCounter value={r.value} className="text-5xl font-bold text-red-500 mb-2" />
                <span className="text-xs uppercase tracking-widest text-gray-400">{r.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {reachChannels.map((c) => {
              const Icon = channelIcons[c] || Mail;
              return (
                <span key={c} className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 text-sm text-gray-300">
                  <Icon className="w-4 h-4 text-red-500" strokeWidth={1.75} />
                  {c}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer premises visits */}
      <section className="dot-bg py-24 bg-gray-50 dark:bg-gray-800">
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
                <li className="relative h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
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
      <section className="py-24 bg-white dark:bg-gray-900">
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
                  <div className="h-full border border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex gap-5">
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
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition"
            >
              See what we&apos;ve shipped &rarr;
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
