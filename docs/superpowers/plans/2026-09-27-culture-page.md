# Culture Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/culture` page that tells prospects how DotHunters works: remote-first, a small multi-disciplinary team, quick to reach, willing to visit on-site, and focused on production-ready delivery. Wire up the dead `Culture` links in the navbar and footer.

**Architecture:** One server-rendered page (`src/app/culture/page.js`) made of section blocks that follow the existing `services/page.js` visual language (`dot-bg` hero, `max-w-7xl` containers, red-500 accents, dark-mode variants, `ScrollReveal` wrappers). All copy and team data live in `src/data/culture.js`, so content edits never touch JSX. The discipline section reads `src/data/services.js` so it stays in sync with the services catalogue. `CTASection` is reused at the bottom.

**Tech Stack:** Next.js 13 (App Router), React 18, Tailwind CSS, lucide-react icons. There is no test framework. Verify with `npm run lint`, `npm run build`, and a manual check in light and dark mode at mobile and desktop widths on the dev server (port 3000).

---

## Page outline

| # | Section | Purpose | Key content |
|---|---------|---------|-------------|
| 0 | Hero | Frame the story | Eyebrow "Our culture". H1 "Remote by design. <red>Close when it counts.</red>" One-line sub. |
| 1 | Remote work culture | Show that remote is a strength, not a compromise | 4 principle cards: Async-first, Written by default, Overlap hours, Outcome over hours. A short strip of the tools we use (Slack/WhatsApp, GitHub, Figma, Notion/Linear). |
| 2 | Team members | Put faces to the studio | Grid of cards: photo, name, role, discipline tags, optional GitHub/LinkedIn. Falls back to initials when there is no photo. |
| 3 | Multi-disciplinary expertise | One team covers the whole product | Discipline tiles built from `services.js` (icon, title). A "how a squad forms" line: design + engineering + AI/3D pulled in per project. Example: EdgeCam = Vision AI + Mobile + Hardware. |
| 4 | Quick reach | Remove the fear of "remote = unreachable" | Black band, like `StatsSection`, with commitments: first reply within X hrs, same-day critical fixes, a named point of contact, working-hour overlap across time zones. Channel list: email, WhatsApp, call, shared Slack. |
| 5 | Customer premises visits | Remote-first, but we still show up | 3–4 step timeline: Discovery workshop on-site → Site survey / hardware install (EdgeCam, AGRO) → On-site training → Go-live support. Note on the coverage area and how visits are scheduled. |
| 6 | Production-ready delivery | Close with trust | Checklist grid: CI/CD pipelines, code review + QA, docs & handover, monitoring/logging, security basics, post-launch support window. Link to `/projects` ("See what we've shipped"). |
| 7 | CTA | Convert | Reuse `<CTASection />`. |

---

## Open content questions (need answers from you before Task 1 is final)

1. **Team:** names, roles, photos (put them in `public/images/team/<slug>.jpg`), and whether to show social links. Is showing everyone OK, or only leads?
2. **Quick reach numbers:** the real reply SLA. `CTASection` already promises "within 24 hours", so we should keep that or tighten it. Also the working hours and time zone (IST?).
3. **Premises visits:** coverage area (city, state, all of India, international on request?) and whether visits are included or billed separately.
4. **Production-ready:** the length of the post-launch support window (e.g. 30/60/90 days).
5. **Photos:** are there any real team or on-site photos (for example, an EdgeCam install)? They would do far more for credibility than icons.

Until these are answered, the data file ships with clearly marked `TODO(content)` placeholders.

---

### Task 1: Culture content data

**Files:**
- Create: `src/data/culture.js`

- [ ] **Step 1: Create the data module**

```js
export const remotePrinciples = [
  { icon: "Globe",        title: "Async-first",        text: "Work moves forward across time zones without waiting on meetings." },
  { icon: "FileText",     title: "Written by default", text: "Decisions, specs and updates are documented, so nothing lives only in someone's head." },
  { icon: "Clock",        title: "Real overlap hours", text: "Guaranteed daily overlap with your working hours for live calls and quick decisions." }, // TODO(content): hours
  { icon: "Target",       title: "Outcomes over hours", text: "We measure shipped, working software — not time online." },
];

export const tools = ["Slack", "WhatsApp", "GitHub", "Figma", "Notion", "Google Meet"]; // TODO(content): confirm

export const team = [
  // TODO(content): replace with real team
  { slug: "janarthan-j", name: "Janarthan J", role: "Founder & Lead Engineer", disciplines: ["Web", "AI/ML"], photo: null, links: { github: "", linkedin: "" } },
];

export const reach = [
  { value: "24h",  label: "First reply, guaranteed" },     // TODO(content): SLA
  { value: "4h",   label: "Critical issue response" },     // TODO(content)
  { value: "1",    label: "Named point of contact" },
  { value: "5+",   label: "Hours daily overlap" },         // TODO(content)
];

export const reachChannels = ["Email", "WhatsApp", "Phone", "Shared Slack channel"];

export const visitSteps = [
  { title: "Discovery workshop", text: "We come to you to map workflows with the people who'll use the product." },
  { title: "Site survey & install", text: "For hardware and vision projects we survey, install and calibrate on location." },
  { title: "On-site training", text: "Hands-on sessions so your team is confident from day one." },
  { title: "Go-live support", text: "We're on the ground (or on call) during launch week." },
];
export const visitNote = "Available across Tamil Nadu; elsewhere on request."; // TODO(content): coverage

export const productionChecklist = [
  { icon: "GitBranch",   title: "CI/CD from day one",   text: "Automated builds and deploys; no manual release rituals." },
  { icon: "ShieldCheck", title: "Reviewed & tested",    text: "Every change is code-reviewed and QA'd before it ships." },
  { icon: "Activity",    title: "Monitored",            text: "Logging, error tracking and uptime alerts configured at launch." },
  { icon: "Lock",        title: "Secure by default",    text: "Auth, secrets handling and dependency hygiene baked in." },
  { icon: "BookOpen",    title: "Documented handover",  text: "Runbooks, credentials and source handed over — you own it all." },
  { icon: "LifeBuoy",    title: "Post-launch support",  text: "A support window after go-live to squash anything real-world uncovers." }, // TODO(content): window length
];
```

- [ ] **Step 2: Commit** — `feat: add culture page content data`

### Task 2: Page route and metadata

**Files:**
- Create: `src/app/culture/layout.js` (exports `metadata`: title "Culture", description)
- Create: `src/app/culture/page.js`

- [ ] **Step 1:** Add `layout.js` with `export const metadata = { title: "Culture", description: "Remote-first, multi-disciplinary, production-focused — how DotHunters works." }` and a passthrough `<section>{children}</section>`, matching `services/layout.js`.
- [ ] **Step 2:** Build `page.js` as a server component. Import `ScrollReveal`, `CTASection`, the data from Task 1, `services` from `@/data/services`, and lucide icons through a name→component map (the same pattern as the `icons` map in `services/page.js`).
- [ ] **Step 3:** Build the sections in outline order. Style rules:
  - Hero: copy the `services/page.js` hero block verbatim (the `dot-bg bg-gray-50 dark:bg-gray-800 py-24`).
  - Alternate section backgrounds: white/gray-900 ↔ gray-50/gray-800. The Quick reach band uses `bg-black text-white` with `AnimatedCounter`, like `StatsSection`.
  - Each section: eyebrow (`uppercase tracking-widest text-gray-400 text-sm`), H2 `text-4xl font-bold`, then the content.
  - Team card: `rounded-2xl border`, a square photo via `next/image` or an initials avatar (`bg-red-500/10 text-red-500`), and discipline tags as small pills.
  - Visit steps: a numbered horizontal timeline on `md+`, stacked vertically on mobile.
  - Checklist: `grid md:grid-cols-2 lg:grid-cols-3`, icon in red-500.
- [ ] **Step 4:** Wrap each section's content in `<ScrollReveal>`.
- [ ] **Step 5: Commit** — `feat: add /culture page`

### Task 3: Wire navigation

**Files:**
- Modify: `src/components/Navbar.js:12` — `href: "#"` → `href: "/culture"`
- Modify: `src/components/Footer.js:44` — `href="#"` → `href="/culture"`

- [ ] **Step 1:** Update both links.
- [ ] **Step 2: Commit** — `feat: link Culture nav items to /culture`

### Task 4: Verify

- [ ] `npm run lint`: no new warnings.
- [ ] `npm run build`: `/culture` is listed as a static route.
- [ ] Dev server: check `/culture` at 375px and 1280px, in light and dark mode. The navbar and footer links work, `ScrollReveal` animates, and there's no horizontal scroll.
- [ ] Grep for `TODO(content)`. Any that remain go back to you as a list before launch.

---

## Out of scope (possible follow-ups)

- A careers / "join us" block (it would fit naturally on this page later).
- A photo gallery of on-site visits (needs real photos first).
- `sitemap.js`: `robots.js` references `/sitemap.xml`, but no sitemap route exists. That's a separate fix.
