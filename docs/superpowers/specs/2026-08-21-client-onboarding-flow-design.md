# Client Onboarding Flow — Design

## Purpose

Replace the "Start a Project" CTA destination with a multi-step lead-qualification
wizard. Today, `CTASection.js` and the services teaser on `/contact` both link to
`/contact`, a single-page form. This adds a new `/get-started` wizard that walks a
prospective client through service selection, service-specific qualifying
questions, budget/timeline, and contact info before submitting. `/contact` remains
unchanged for general inquiries.

## Non-goals

- No authentication or client portal.
- No real backend persistence, email delivery, or CRM integration — the API route
  is a stub that validates and logs, matching the existing `ContactForm.js`
  pattern of local-only submission (now backed by one real network request).
- No changes to `/contact`'s own form.

## Architecture

- `src/app/get-started/page.js` — server component page shell (mirrors
  `src/app/contact/page.js`): hero copy + renders `OnboardingWizard`.
- `src/components/OnboardingWizard.js` — `"use client"` component containing all
  wizard state, step rendering, and submission logic.
- `src/data/onboardingQuestions.js` — config module exporting the per-service
  question pairs (see below), keyed by service `slug`.
- `src/app/api/onboarding/route.js` — `POST` handler:
  - Parses JSON body.
  - Validates required fields present: `serviceSlug`, `budget`, `timeline`, `name`,
    `email`. Returns `400` with `{ error: "..." }` if any are missing.
  - Logs the validated payload (`console.log`).
  - Returns `200` with `{ ok: true }`.
- Repoint the "Start a Project" CTA from `/contact` to `/get-started`:
  - `src/components/CTASection.js:21`. This is the only CTA that changes — the
    `/contact` page's own "Explore our services" teaser link (`contact/page.js:171`)
    points to `/services` and is unrelated. `/contact` itself is left untouched.

## Data flow / state shape

Single component state in `OnboardingWizard.js`:

```js
{
  step: 0, // 0-3
  form: {
    serviceSlug: "",
    details: { q1: "", q2: "" },
    budget: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    notes: "",
  },
  submitting: false,
  error: null,
}
```

No reducer — four fixed steps, plain `useState` + handler functions, consistent
with `ContactForm.js`'s existing style.

## Steps

1. **Service** — card grid of the 7 services from `src/data/services.json`
   (title + tagline per card). Single-select; clicking a card sets `serviceSlug`
   and auto-advances to step 2.
2. **Details** — renders the 2 questions for the selected service from
   `onboardingQuestions.js` as select-style option buttons. Both required to
   advance (every question includes a "Not sure" option so this is always
   satisfiable).
3. **Budget & Timeline** — budget (reuse the 5 existing ranges from
   `ContactForm.js`) + new timeline select: `ASAP`, `1–3 months`, `3–6 months`,
   `Flexible / not sure`. Both required.
4. **Contact info** — Name* (text), Email* (email), Company (text, optional),
   Notes (textarea, optional). Submit button posts the full `form` object.

Back button available on steps 2–4. Next/Submit disabled until the current step's
required fields are filled.

## Per-service question config (`onboardingQuestions.js`)

Keyed by slug, each an array of 2 `{ id, label, options }` objects:

- `web-design-development`: existing site? (`Redesigning an existing site` /
  `Starting fresh`) · site size (`1–5 pages` / `6–15 pages` / `16+ pages` /
  `Not sure`)
- `ai-ml-development`: what to build (`Computer vision` / `LLM / chatbot` /
  `Automation / data pipeline` / `Not sure`) · data readiness (`Ready to use` /
  `Needs cleaning` / `Don't have data yet`)
- `3d-vr-game-development`: experience type (`VR / AR app` / `3D web experience` /
  `Game` / `Not sure`) · target platform (`Web` / `Mobile` / `VR headset` /
  `PC / Console` / `Not sure`)
- `motion-graphics`: what to animate (`Explainer video` / `Logo / brand
  animation` / `Social content` / `Not sure`) · script ready? (`Yes` / `No` /
  `Partial`)
- `saas-product-development`: stage (`Idea only` / `Have a spec or designs` /
  `Rebuilding an existing product` / `Not sure`) · billing needed? (`Yes` / `No` /
  `Not sure`)
- `mobile-app-development`: platforms (`iOS only` / `Android only` / `Both iOS
  & Android` / `Not sure`) · designs ready? (`Yes` / `No` / `Partial`)
- `video-production`: video type (`Brand film` / `Product video` / `Social
  content` / `Documentary / corporate` / `Not sure`) · filming needed? (`We need
  filming` / `We have footage, need editing` / `Not sure`)

## UI details

- Progress indicator: 4 numbered segments with labels on desktop, collapsing to
  "Step X of 4" text below `sm` breakpoint. Uses existing red-500/black/gray
  Tailwind palette and rounded-full/rounded-lg conventions from `ContactForm.js`,
  with dark-mode variants throughout.
- Step transitions: no animation library needed — simple conditional render
  keyed by `step`.

## Submission & error handling

- On step 4 submit: `POST /api/onboarding` with the `form` object as JSON.
- Success (`200`): replace the wizard with a confirmation view (same pattern as
  `ContactForm.js`'s `submitted` state), with copy naming the chosen service by
  title, e.g. "We'll review your **Web Design & Development** project and follow
  up within 24 hours."
- Failure (non-OK response or thrown/network error): inline red error banner
  above the Submit button ("Something went wrong — please try again."), `form`
  state preserved, user can retry without re-entering data.

## Testing / verification

- Manual browser walkthrough of the full 4-step flow for at least 2 different
  services (to confirm branching renders correctly), including:
  - Back/Next validation gating
  - Successful submission → confirmation view
  - Simulated API failure → error banner + retry preserves data
  - Mobile viewport (progress indicator collapse, layout)
  - Dark mode
- Confirm both repointed CTAs (`CTASection.js`, `/contact` teaser — only the
  "Start a Project" one) land on `/get-started`.
- No automated test suite exists in this repo currently; this stays consistent
  with that (manual verification only, matching how `ContactForm.js` was
  verified).
