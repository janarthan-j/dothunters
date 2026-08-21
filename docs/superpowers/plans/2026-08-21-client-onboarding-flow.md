# Client Onboarding Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `/get-started` multi-step wizard that qualifies leads by service, collects service-specific details, budget/timeline, and contact info, then posts to a stub API route — replacing the "Start a Project" CTA's destination.

**Architecture:** A page shell (`src/app/get-started/page.js`) renders a client-side orchestrator component (`OnboardingWizard.js`) that holds all wizard state and switches between five small, single-responsibility step components in `src/components/onboarding/`. Service-specific question config lives in `src/data/onboardingQuestions.js`, keyed by the same slugs already used in `src/data/services.js`. Submission posts JSON to a new stub route handler (`src/app/api/onboarding/route.js`) that validates and logs. One existing CTA link is repointed.

**Tech Stack:** Next.js 13 (App Router), React 18, Tailwind CSS. No test framework exists in this repo — verification is via `npm run lint`, `npm run build`, and manual browser walkthroughs using the project's existing dev server (`.claude/launch.json` → `dothunters-dev`, port 3000), matching how the existing `ContactForm.js` was verified and as specified in the design spec's Testing section.

**Design spec:** `docs/superpowers/specs/2026-08-21-client-onboarding-flow-design.md`

---

### Task 1: Onboarding question data

**Files:**
- Create: `src/data/onboardingQuestions.js`

- [ ] **Step 1: Create the file with the full per-service question config**

```js
const onboardingQuestions = {
  "web-design-development": [
    {
      id: "q1",
      label: "Do you have an existing website?",
      options: ["Redesigning an existing site", "Starting fresh"],
    },
    {
      id: "q2",
      label: "Roughly how many pages do you need?",
      options: ["1–5 pages", "6–15 pages", "16+ pages", "Not sure"],
    },
  ],
  "ai-ml-development": [
    {
      id: "q1",
      label: "What are you trying to build?",
      options: ["Computer vision", "LLM / chatbot", "Automation / data pipeline", "Not sure"],
    },
    {
      id: "q2",
      label: "Do you have data ready to work with?",
      options: ["Ready to use", "Needs cleaning", "Don't have data yet"],
    },
  ],
  "3d-vr-game-development": [
    {
      id: "q1",
      label: "What kind of experience are you building?",
      options: ["VR / AR app", "3D web experience", "Game", "Not sure"],
    },
    {
      id: "q2",
      label: "What's the target platform?",
      options: ["Web", "Mobile", "VR headset", "PC / Console", "Not sure"],
    },
  ],
  "motion-graphics": [
    {
      id: "q1",
      label: "What do you need animated?",
      options: ["Explainer video", "Logo / brand animation", "Social content", "Not sure"],
    },
    {
      id: "q2",
      label: "Do you already have a script or storyboard?",
      options: ["Yes", "No", "Partial"],
    },
  ],
  "saas-product-development": [
    {
      id: "q1",
      label: "Where are you in the process?",
      options: ["Idea only", "Have a spec or designs", "Rebuilding an existing product", "Not sure"],
    },
    {
      id: "q2",
      label: "Do you need billing / subscriptions built in?",
      options: ["Yes", "No", "Not sure"],
    },
  ],
  "mobile-app-development": [
    {
      id: "q1",
      label: "Which platforms do you need?",
      options: ["iOS only", "Android only", "Both iOS & Android", "Not sure"],
    },
    {
      id: "q2",
      label: "Do you have designs already?",
      options: ["Yes", "No", "Partial"],
    },
  ],
  "video-production": [
    {
      id: "q1",
      label: "What type of video do you need?",
      options: ["Brand film", "Product video", "Social content", "Documentary / corporate", "Not sure"],
    },
    {
      id: "q2",
      label: "Do you need filming, or just editing?",
      options: ["We need filming", "We have footage, need editing", "Not sure"],
    },
  ],
};

export default onboardingQuestions;
```

- [ ] **Step 2: Verify the slugs match `src/data/services.json` exactly**

Run:
```bash
node -e "const s=require('./src/data/services.json').map(x=>x.slug).sort(); const q=Object.keys(require('./src/data/onboardingQuestions.js').default||{}); console.log(s)"
```
This will fail with `export default` under plain Node (no `"type": "module"` in `package.json`) — that's expected and fine, this file is only ever consumed via Next's bundler. Instead, just visually confirm the 7 keys above (`web-design-development`, `ai-ml-development`, `3d-vr-game-development`, `motion-graphics`, `saas-product-development`, `mobile-app-development`, `video-production`) match the 7 `slug` values in `src/data/services.json`.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: No errors (warnings about unrelated files, if any, are pre-existing — do not fix them here).

- [ ] **Step 4: Commit**

```bash
git add src/data/onboardingQuestions.js
git commit -m "feat: add per-service onboarding question config"
```

---

### Task 2: Onboarding API route (stub)

**Files:**
- Create: `src/app/api/onboarding/route.js`

- [ ] **Step 1: Create the route handler**

```js
import { NextResponse } from "next/server";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const required = ["serviceSlug", "budget", "timeline", "name", "email"];
  const missing = required.filter((field) => !body?.[field]);

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  console.log("New onboarding submission:", body);

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Start the dev server and verify the route with curl**

Start the dev server (via the project's preview tooling, `dothunters-dev` on port 3000), then in a separate terminal:

```bash
curl -s -X POST http://localhost:3000/api/onboarding -H "Content-Type: application/json" -d "{}"
```
Expected: HTTP 400 body like `{"error":"Missing required fields: serviceSlug, budget, timeline, name, email"}`

```bash
curl -s -X POST http://localhost:3000/api/onboarding -H "Content-Type: application/json" -d "{\"serviceSlug\":\"web-design-development\",\"budget\":\"Under $5,000\",\"timeline\":\"ASAP\",\"name\":\"Jane\",\"email\":\"jane@example.com\"}"
```
Expected: HTTP 200 body `{"ok":true}`, and the dev server log shows `New onboarding submission: { ... }`.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/onboarding/route.js
git commit -m "feat: add stub onboarding API route"
```

---

### Task 3: ProgressBar component

**Files:**
- Create: `src/components/onboarding/ProgressBar.js`

- [ ] **Step 1: Create the component**

```js
const steps = ["Service", "Details", "Budget & Timeline", "Contact"];

export default function ProgressBar({ currentStep }) {
  return (
    <div className="mb-10">
      {/* Mobile */}
      <p className="sm:hidden text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        Step {currentStep + 1} of {steps.length} — {steps[currentStep]}
      </p>

      {/* Desktop */}
      <ol className="hidden sm:flex items-center gap-4">
        {steps.map((label, i) => (
          <li key={label} className="flex items-center gap-4 flex-1 last:flex-none">
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition ${
                  i < currentStep
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : i === currentStep
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                }`}
              >
                {i < currentStep ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={`text-sm font-medium ${
                  i <= currentStep ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-px flex-1 ${
                  i < currentStep ? "bg-black dark:bg-white" : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: No errors. (This component isn't rendered anywhere yet, so there's nothing to browser-test until Task 9 wires it in — that's fine, later tasks cover it.)

- [ ] **Step 3: Commit**

```bash
git add src/components/onboarding/ProgressBar.js
git commit -m "feat: add onboarding wizard progress bar"
```

---

### Task 4: ServiceStep component

**Files:**
- Create: `src/components/onboarding/ServiceStep.js`

- [ ] **Step 1: Create the component**

```js
import { services } from "@/data/services";

export default function ServiceStep({ value, onSelect }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 dark:text-white">Which service are you interested in?</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        Pick the one that fits best — we can refine scope later.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <button
            key={service.slug}
            type="button"
            onClick={() => onSelect(service.slug)}
            className={`text-left border rounded-xl p-5 transition ${
              value === service.slug
                ? "border-black dark:border-white bg-gray-50 dark:bg-gray-800"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
            }`}
          >
            <p className="font-semibold text-gray-900 dark:text-white mb-1">{service.title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{service.tagline}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/onboarding/ServiceStep.js
git commit -m "feat: add onboarding service selection step"
```

---

### Task 5: DetailsStep component

**Files:**
- Create: `src/components/onboarding/DetailsStep.js`

- [ ] **Step 1: Create the component**

```js
import onboardingQuestions from "@/data/onboardingQuestions";

export default function DetailsStep({ serviceSlug, serviceTitle, details, onChange }) {
  const questions = onboardingQuestions[serviceSlug] || [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 dark:text-white">
        A bit more about your {serviceTitle} project
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        This helps us route your brief to the right team.
      </p>
      <div className="space-y-8">
        {questions.map((q) => (
          <div key={q.id}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {q.label}
            </label>
            <div className="flex flex-wrap gap-2">
              {q.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange(q.id, option)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                    details[q.id] === option
                      ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/onboarding/DetailsStep.js
git commit -m "feat: add onboarding service-details step"
```

---

### Task 6: BudgetTimelineStep component

**Files:**
- Create: `src/components/onboarding/BudgetTimelineStep.js`

- [ ] **Step 1: Create the component**

```js
const budgets = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Let's discuss",
];

const timelines = ["ASAP", "1–3 months", "3–6 months", "Flexible / not sure"];

export default function BudgetTimelineStep({ budget, timeline, onChange }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 dark:text-white">Budget & timeline</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        Rough numbers are fine — this just helps us scope realistically.
      </p>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Budget range
          </label>
          <div className="flex flex-wrap gap-2">
            {budgets.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange("budget", option)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  budget === option
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Timeline
          </label>
          <div className="flex flex-wrap gap-2">
            {timelines.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange("timeline", option)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  timeline === option
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/onboarding/BudgetTimelineStep.js
git commit -m "feat: add onboarding budget and timeline step"
```

---

### Task 7: ContactStep component

**Files:**
- Create: `src/components/onboarding/ContactStep.js`

- [ ] **Step 1: Create the component**

```js
const inputClass =
  "w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-800 dark:focus:border-gray-400 transition";
const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

export default function ContactStep({ form, onChange }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 dark:text-white">Almost there — how do we reach you?</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        We&apos;ll follow up within 24 hours.
      </p>

      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Jane Smith"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="jane@company.com"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Company / Organisation</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={(e) => onChange("company", e.target.value)}
            placeholder="Acme Inc."
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Anything else we should know?</label>
          <textarea
            name="notes"
            rows={4}
            value={form.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="Optional — links, context, specific requirements..."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/onboarding/ContactStep.js
git commit -m "feat: add onboarding contact-info step"
```

---

### Task 8: ConfirmationView component

**Files:**
- Create: `src/components/onboarding/ConfirmationView.js`

- [ ] **Step 1: Create the component**

```js
export default function ConfirmationView({ serviceTitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-6">
        <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-2 dark:text-white">You&apos;re all set!</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
        We&apos;ll review your{" "}
        <span className="font-semibold text-gray-800 dark:text-gray-200">{serviceTitle}</span>{" "}
        project and follow up within 24 hours.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/onboarding/ConfirmationView.js
git commit -m "feat: add onboarding confirmation view"
```

---

### Task 9: OnboardingWizard orchestrator

**Files:**
- Create: `src/components/OnboardingWizard.js`

- [ ] **Step 1: Create the orchestrator component wiring Tasks 1, 2, 3–8 together**

```js
"use client";
import { useState } from "react";
import { services } from "@/data/services";
import onboardingQuestions from "@/data/onboardingQuestions";
import ProgressBar from "./onboarding/ProgressBar";
import ServiceStep from "./onboarding/ServiceStep";
import DetailsStep from "./onboarding/DetailsStep";
import BudgetTimelineStep from "./onboarding/BudgetTimelineStep";
import ContactStep from "./onboarding/ContactStep";
import ConfirmationView from "./onboarding/ConfirmationView";

const initialForm = {
  serviceSlug: "",
  details: {},
  budget: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
  notes: "",
};

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const selectedService = services.find((s) => s.slug === form.serviceSlug) || null;

  const canAdvance = () => {
    if (step === 0) return Boolean(form.serviceSlug);
    if (step === 1) {
      const questions = onboardingQuestions[form.serviceSlug] || [];
      return questions.every((q) => Boolean(form.details[q.id]));
    }
    if (step === 2) return Boolean(form.budget) && Boolean(form.timeline);
    if (step === 3) return Boolean(form.name) && Boolean(form.email);
    return true;
  };

  const handleSelectService = (slug) => {
    setForm((prev) => ({ ...prev, serviceSlug: slug, details: {} }));
    setStep(1);
  };

  const handleDetailChange = (id, value) => {
    setForm((prev) => ({ ...prev, details: { ...prev.details, [id]: value } }));
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));
  const handleNext = () => setStep((s) => Math.min(3, s + 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <ConfirmationView serviceTitle={selectedService?.title || "project"} />;
  }

  return (
    <div>
      <ProgressBar currentStep={step} />

      {step === 0 && <ServiceStep value={form.serviceSlug} onSelect={handleSelectService} />}
      {step === 1 && (
        <DetailsStep
          serviceSlug={form.serviceSlug}
          serviceTitle={selectedService?.title || ""}
          details={form.details}
          onChange={handleDetailChange}
        />
      )}
      {step === 2 && (
        <BudgetTimelineStep budget={form.budget} timeline={form.timeline} onChange={handleFieldChange} />
      )}
      {step === 3 && <ContactStep form={form} onChange={handleFieldChange} />}

      {error && (
        <p className="mt-6 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {step > 0 && (
        <div className="flex items-center justify-between mt-10">
          <button
            type="button"
            onClick={handleBack}
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
          >
            Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canAdvance()}
              className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-semibold text-sm transition"
            >
              Continue
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9H3a1 1 0 110-2h7.586L8.293 4.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canAdvance() || submitting}
              className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-semibold text-sm transition"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/OnboardingWizard.js
git commit -m "feat: add onboarding wizard orchestrator component"
```

---

### Task 10: /get-started page

**Files:**
- Create: `src/app/get-started/page.js`

- [ ] **Step 1: Create the page shell**

```js
import OnboardingWizard from "@/components/OnboardingWizard";

export const metadata = {
  title: "Get Started",
  description: "Tell us about your project in a few quick steps and we'll follow up within 24 hours.",
};

export default function GetStartedPage() {
  return (
    <main id="get-started">
      <section className="dot-bg bg-gray-50 dark:bg-gray-800 py-24 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">
            Get started
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl mb-6 dark:text-white">
            Let&apos;s scope your <span className="text-red-500">project.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl">
            A few quick questions so we can route your brief to the right team and come back with
            something useful.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <OnboardingWizard />
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 3: Start the dev server and manually walk the full flow**

Start the dev server (`dothunters-dev`, port 3000) and navigate to `http://localhost:3000/get-started`. Walk through:

1. Step 1: click a service card (e.g. "Web Design & Development") → confirm it auto-advances to Step 2.
2. Step 2: confirm the two questions shown match that service (existing site? / page count), confirm "Continue" is disabled until both are answered, then answer both and click Continue.
3. Step 3: pick a budget and timeline, click Continue.
4. Step 4: leave Name/Email blank — confirm Submit is disabled. Fill Name + Email, click Submit.
5. Confirm the confirmation view appears, naming "Web Design & Development".
6. Click Back on an earlier step to confirm previously-entered values are preserved.
7. Reload and repeat steps 1–2 picking a *different* service (e.g. "AI / ML Development") to confirm the Step 2 questions change accordingly.
8. Resize to a mobile viewport and confirm the progress indicator collapses to "Step X of 4" text and the layout doesn't overflow.
9. Toggle dark mode (site's existing theme toggle) and confirm readable contrast throughout all 4 steps and the confirmation view.

Expected: All of the above behave as described, with no console errors (check via the browser tool's console reader).

- [ ] **Step 4: Commit**

```bash
git add src/app/get-started/page.js
git commit -m "feat: add /get-started onboarding page"
```

---

### Task 11: Repoint the "Start a Project" CTA

**Files:**
- Modify: `src/components/CTASection.js:21`

- [ ] **Step 1: Change the href**

In `src/components/CTASection.js`, change:

```js
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-red-500 text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-red-600 transition"
            >
              Start a Project
```

to:

```js
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 bg-red-500 text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-red-600 transition"
            >
              Start a Project
```

- [ ] **Step 2: Verify on the homepage**

Navigate to `http://localhost:3000/` (dev server still running), scroll to the CTA section, click "Start a Project", and confirm it lands on `/get-started`. Confirm `/contact`'s own "Explore our services" link (bottom of `/contact`) still points to `/services` and was not touched.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/CTASection.js
git commit -m "feat: point Start a Project CTA at /get-started"
```

---

### Task 12: Final build verification

**Files:** None (verification only)

- [ ] **Step 1: Run a production build**

Run: `npm run build`
Expected: Build completes successfully, with `/get-started` and `/api/onboarding` listed in the route output, no type/lint errors.

- [ ] **Step 2: Full spec checklist walkthrough**

With the dev server running, re-confirm every item from the design spec's Testing section:
- 4-step flow completes for at least 2 different services (already covered in Task 10, re-confirm here after all commits).
- Back/Next validation gating works on every step.
- Successful submission shows the confirmation view.
- Simulate an API failure (e.g. temporarily stop the dev server mid-submit, or use the browser tool's network throttling/offline mode) and confirm the red error banner appears and form data is preserved on retry.
- Mobile viewport and dark mode both verified.
- Both repointed CTA and unrelated `/contact` teaser link confirmed (from Task 11).

Expected: Every item passes. If anything fails, fix the relevant task's file and re-run `npm run lint` before re-verifying.

- [ ] **Step 3: No commit needed for this task** (verification only — skip if nothing changed).
