# Culture Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the culture page from "remote-first" messaging to a senior-guided, team-collaboration story, with confirmed facts replacing placeholders.

**Architecture:** Data-driven, matching the existing pattern. All copy lives in `src/data/culture.js`; `src/app/culture/page.js` renders it with the existing `SectionHeading` / `ScrollReveal` / bordered-card styles. One small behaviour fix in `AnimatedCounter` so range values like `1–2h` render as static text.

**Tech Stack:** Next.js 13.4 (App Router, JS), React 18, Tailwind 3, lucide-react.

**Spec:** `docs/superpowers/specs/2026-10-06-culture-page-redesign-design.md`

**Ground rules:**
- The repo has no test framework. Verification = `npm run lint` + a Node data check + visual check.
- **Never run `npm run build`** — it breaks the user's running dev server.
- `src/app/culture/page.js` already has two uncommitted copy edits (hero heading, team subtext). Task 3 overwrites the whole file, which includes them.

---

## File map

| File | Change | Responsibility |
|---|---|---|
| `src/components/AnimatedCounter.js` | Modify | Static-text fallback for non-simple values |
| `src/data/culture.js` | Rewrite | All culture page copy |
| `src/app/culture/page.js` | Rewrite | Render 8 sections in new order |
| `src/app/culture/layout.js` | Modify | Metadata description |
| `src/app/contact/page.js:45` | Modify | FAQ answer without "remote" |

---

### Task 1: AnimatedCounter static fallback

**Files:**
- Modify: `src/components/AnimatedCounter.js`

Current parsing strips non-digits, so `"1–2h"` becomes `num=12`, suffix `"–h"` → renders `12–h`. Values that are not "one number + optional suffix" must render as-is.

- [ ] **Step 1: Confirm the bug with a Node check**

Run:
```bash
node -e "const v='1–2h';console.log(parseInt(v.replace(/\D/g,''),10)+v.replace(/[0-9]/g,''))"
```
Expected: `12–h` (the wrong output).

- [ ] **Step 2: Replace the file with the fixed version**

```js
"use client";
import { useState, useEffect, useRef } from "react";

// Only "one number + optional suffix" (e.g. "24h", "5+", "98%") animates; anything else renders as-is.
const SIMPLE_VALUE = /^\d+\D*$/;

export default function AnimatedCounter({ value, className = "" }) {
  const animated = SIMPLE_VALUE.test(value);
  const num = animated ? parseInt(value, 10) : 0;
  const suffix = animated ? value.replace(/^\d+/, "") : "";
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!animated) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const steps = 60;
          const increment = num / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              setCount(num);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated, num]);

  if (!animated) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
```

- [ ] **Step 3: Verify parsing for all values used on the site**

Run:
```bash
node -e "const R=/^\d+\D*$/;for(const v of ['7','5','5+','98%','1','5h','1–2h'])console.log(JSON.stringify(v),R.test(v)?parseInt(v,10)+v.replace(/^\d+/,''):'static:'+v)"
```
Expected:
```
"7" 7
"5" 5
"5+" 5+
"98%" 98%
"1" 1
"5h" 5h
"1–2h" static:1–2h
```

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no errors; no new warnings in `AnimatedCounter.js`.

- [ ] **Step 5: Commit**

```bash
git add src/components/AnimatedCounter.js
git commit -m "fix: render non-numeric counter values as static text"
```

---

### Task 2: Rewrite culture data

**Files:**
- Modify (full rewrite): `src/data/culture.js`

Removes `remotePrinciples`, `tools`, `squadExample`. Adds `projectFlow`, `mentorship`, `values`. Adds `education` to team. Updates `reach`, `reachChannels`, `visitNote`, Post-launch support text.

- [ ] **Step 1: Replace the file contents**

```js
export const projectFlow = [
  { title: "Discover",         text: "We map your goals, users and constraints before writing a line of code." },
  { title: "Plan",             text: "Senior engineers set the architecture, scope and milestones." },
  { title: "Build",            text: "Developers build in pairs, with seniors reviewing every step." },
  { title: "Review & test",    text: "Every change is code-reviewed and tested before it reaches you." },
  { title: "Launch & support", text: "We ship, monitor and support you for up to a year." },
];

export const mentorship = [
  { icon: "GraduationCap", title: "Learning sessions",   text: "Regular sessions where the team shares tools, techniques and lessons from live projects." },
  { icon: "Wrench",        title: "Hands-on experience", text: "Everyone works on real client projects from the start, with a senior close by." },
  { icon: "FlaskConical",  title: "Trial projects",      text: "New skills are tested on internal builds first, so client work only gets proven approaches." },
  { icon: "Users",         title: "Team collaboration",  text: "Design, engineering and AI work side by side, so problems are solved together, not handed off." },
];

// TODO(content): add education for remaining team members
export const team = [
  { slug: "janarthan-j",   name: "Janarthan J",   role: "Founder & Lead Engineer", disciplines: ["Web", "AI/ML", "Architecture"], education: "B.Sc. (Hons) in IT", photo: "/images/team/janarthan.jpg", photoPosition: "center top" },
  { slug: "b-ranjith",     name: "B. Ranjith",    role: "ML Engineer",             disciplines: ["Vision AI", "Edge Devices"], photo: "/images/team/b-ranjith.jpeg" },
  { slug: "thamilini-ramakrishna", name: "Thamilini Ramakrishna", role: "Senior Software Engineer", disciplines: ["ReactJS", "Frontend"], photo: "/images/team/thamilini.jpeg", photoPosition: "center 25%" },
  { slug: "santhirakumar-sathurjan", name: "Santhirakumar Sathurjan", role: "Junior Software Engineer", disciplines: ["Web", "Full Stack"], photo: "/images/team/santhirakumar-sathurjan.jpeg" },
];

export const values = [
  { title: "Ship real things",      text: "We build for production, not demos.",                              proof: "CAD Studio: live quotes and bookings",                                slug: "cad-studio-photography" },
  { title: "Get the details right", text: "The small things decide whether software can be trusted.",         proof: "CAD Studio: tax rules by province and bookings that can't double up", slug: "cad-studio-photography" },
  { title: "Stay for the long run", text: "Launch is the start of the relationship, not the end.",            proof: "Limax Medica: maintained for 2+ years",                               slug: "limax-medica" },
  { title: "Test before trust",     text: "Nothing reaches you without being reviewed and tested.",           proof: "CAD Studio: 120 test files",                                          slug: "cad-studio-photography" },
];

export const reach = [
  { value: "1–2h", label: "First reply" },
  { value: "1–2h", label: "Critical issue response" },
  { value: "1",    label: "Named point of contact" },
  { value: "5h",   label: "Daily overlap, minimum" },
];

export const reachChannels = ["Email", "WhatsApp", "Phone"];

export const visitSteps = [
  { title: "Discovery workshop",    text: "We come to you to map workflows with the people who will actually use the product." },
  { title: "Site survey & install", text: "For hardware and vision projects we survey, install and calibrate on location." },
  { title: "On-site training",      text: "Hands-on sessions so your team is confident from day one." },
  { title: "Go-live support",       text: "We're on the ground — or on call — through launch week." },
];

export const visitNote = "On-site visits available anywhere in Sri Lanka.";

export const productionChecklist = [
  { icon: "GitBranch",   title: "CI/CD from day one",  text: "Automated builds and deploys — no manual release rituals." },
  { icon: "ShieldCheck", title: "Reviewed & tested",   text: "Every change is code-reviewed and QA'd before it ships." },
  { icon: "Activity",    title: "Monitored",           text: "Logging, error tracking and uptime alerts configured at launch." },
  { icon: "Lock",        title: "Secure by default",   text: "Auth, secrets handling and dependency hygiene baked in." },
  { icon: "BookOpen",    title: "Documented handover", text: "Runbooks, credentials and source code handed over — you own it all." },
  { icon: "LifeBuoy",    title: "Post-launch support", text: "Up to a year of support after launch, on request, to fix anything the real world uncovers." },
];
```

Note: the page will not compile between Task 2 and Task 3 (page.js still imports removed exports). Do Task 3 immediately after; commit Tasks 2 and 3 together.

- [ ] **Step 2: Verify proof slugs exist in projects.json**

Run:
```bash
node -e "const s=new Set(require('./src/data/projects.json').map(p=>p.slug));for(const x of ['cad-studio-photography','limax-medica'])console.log(x,s.has(x))"
```
Expected:
```
cad-studio-photography true
limax-medica true
```

---

### Task 3: Rewrite culture page and metadata

**Files:**
- Modify (full rewrite): `src/app/culture/page.js`
- Modify: `src/app/culture/layout.js:3`

Section order: Hero → Project flow → Mentorship → Team → Values → Quick reach → On-site visits → Production checklist. Removes the remote principles, toolkit and services grid/squad sections, and the now-unused `services` import and icons.

- [ ] **Step 1: Replace `src/app/culture/page.js`**

```js
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
```

Background alternation (avoid two same-colour sections in a row): Hero gray → Flow white → Mentorship gray → Team white → Values gray → Reach black → Visits gray → Delivery white.

Small deviation from spec, flagged: the On-site subtext "We fly in for the moments that count" becomes "We travel to you for the moments that count" — flying doesn't fit visits within Sri Lanka.

- [ ] **Step 2: Update `src/app/culture/layout.js` line 3**

Replace:
```js
    description: "Remote-first, multi-disciplinary and production-focused — how DotHunters works with clients.",
```
with:
```js
    description: "How DotHunters builds together: senior-guided, multi-disciplinary and production-focused.",
```

- [ ] **Step 3: Verify all imported icons exist and data exports match imports**

Run:
```bash
node -e "const l=require('lucide-react');const miss=['GraduationCap','Wrench','FlaskConical','Users','GitBranch','ShieldCheck','Activity','Lock','BookOpen','LifeBuoy','Mail','MessageCircle','Phone','MapPin','ArrowUpRight'].filter(n=>!l[n]);console.log('missing icons:',miss)"
```
Expected: `missing icons: []`

Run:
```bash
grep -n "^export const" src/data/culture.js
```
Expected exactly: `projectFlow`, `mentorship`, `team`, `values`, `reach`, `reachChannels`, `visitSteps`, `visitNote`, `productionChecklist`.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no errors. Only the pre-existing `<img>` warnings in `ProjectGallery.js` and `ServiceHeroSlideshow.js`.

- [ ] **Step 5: Commit Tasks 2 + 3 together**

```bash
git add src/data/culture.js src/app/culture/page.js src/app/culture/layout.js
git commit -m "feat: rework culture page around senior-guided team collaboration"
```

---

### Task 4: Contact page FAQ

**Files:**
- Modify: `src/app/contact/page.js:45`

- [ ] **Step 1: Replace the FAQ answer**

Replace:
```js
    a: "Yes — the majority of our clients are remote. We work across time zones and use async-first communication to keep projects moving.",
```
with:
```js
    a: "Yes. We work with clients across Sri Lanka and abroad, keeping projects moving with clear written updates and quick replies.",
```

- [ ] **Step 2: Verify no "remote" wording remains in src**

Run:
```bash
grep -rni "remote" src
```
Expected: only `src/data/services.json` (video-production "remote direction of client-side footage" — unrelated, keep).

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/contact/page.js
git commit -m "copy: reword international clients FAQ"
```

---

### Task 5: Visual verification

Only if the dothunters dev server is running. Port 3000 may be a different app (the CAD Studio site redirects `/` → `/en`); confirm by checking `/culture` returns 200 and contains "Built together".

- [ ] **Step 1: Find the dev server**

Run:
```bash
for p in 3000 3001 3002; do curl -s --max-time 5 http://localhost:$p/culture | grep -q "Built together" && echo "dothunters on $p"; done
```
Expected: `dothunters on <port>`. If nothing prints, ask the user to start `npm run dev` and skip to Step 3 when they confirm; do not start it yourself if another dev process may be running.

- [ ] **Step 2: Screenshot desktop + mobile**

Use Playwright from the session scratchpad (already installed there). Script:
```js
import { chromium } from 'playwright';
const [port, out] = process.argv.slice(2);
const b = await chromium.launch();
for (const [name, w] of [['desktop', 1440], ['mobile', 390]]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(`http://localhost:${port}/culture`, { waitUntil: 'networkidle' });
  // Trigger ScrollReveal / counters by scrolling through the page
  for (let y = 0; y < 12000; y += 600) { await p.mouse.wheel(0, 600); await p.waitForTimeout(150); }
  await p.waitForTimeout(2000);
  await p.screenshot({ path: `${out}/culture-${name}.png`, fullPage: true });
  await p.close();
}
await b.close();
```
Run: `node culture-shot.mjs <port> <scratchpad>` from the scratchpad directory.

- [ ] **Step 3: Check screenshots against the spec**

- Hero reads "Built together. Delivered as one." with locations subtext
- 5-step flow, numbered circles, connector line on desktop, stacked on mobile
- Mentorship 4 cards; Team cards with education line only on Janarthan
- Values 2×2 with red proof links
- Quick reach shows `1–2h` twice (not `12–h`), `1`, `5h`; channels Email / WhatsApp / Phone
- Visit note "anywhere in Sri Lanka"; Post-launch support "Up to a year…"
- No horizontal scroll on mobile

- [ ] **Step 4: Confirm proof links resolve**

Run:
```bash
for s in cad-studio-photography limax-medica; do curl -s -o /dev/null -w "$s %{http_code}\n" http://localhost:<port>/projects/$s; done
```
Expected: both `200`.
