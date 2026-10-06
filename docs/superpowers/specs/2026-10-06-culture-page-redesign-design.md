# Culture Page Redesign — Design

**Date:** 2026-10-06
**Status:** Approved
**Files:** `src/data/culture.js`, `src/app/culture/page.js`, `src/app/culture/layout.js`, `src/components/AnimatedCounter.js`, `src/app/contact/page.js`

## Goal

Reposition the culture page away from "remote-first" messaging toward a team-collaboration story: a senior-guided, multi-disciplinary team spread across Sri Lanka that builds together. Replace placeholder (`TODO(content)`) values with confirmed facts.

## Approach

Data-driven, same pattern as today: all copy lives in `src/data/culture.js`; `src/app/culture/page.js` renders it using existing card/heading styles (`SectionHeading`, `ScrollReveal`, bordered rounded cards, red accents). No new component files.

## Page order

Story arc: how we work → who we are → what we believe → what you get.

1. Hero
2. How a project flows
3. Mentorship
4. Team
5. Values with proof
6. Quick reach
7. On-site visits
8. Production checklist

Removed: "Remote-first, never remote-distant" principles section, toolkit chips, "One team, every layer" services grid + squad example.

## Sections

### 1. Hero

- Eyebrow: `Our culture`
- Heading: `Built together.` + red `Delivered as one.`
- Subtext: "A multi-disciplinary team across Batticaloa, Jaffna, Hatton and Colombo, guided by senior engineers and focused on software that works in the real world."

`layout.js` metadata description: "How DotHunters builds together: senior-guided, multi-disciplinary and production-focused."

### 2. How a project flows

- Eyebrow: `How we work` · Heading: `From kickoff` + red `to launch.`
- Subtext: "Every project follows the same clear path, with seniors setting the direction and the whole team building it."
- Five numbered steps rendered as a horizontal timeline on `lg`, stacked on mobile.

Data (`projectFlow`):

| # | Title | Text |
|---|---|---|
| 01 | Discover | We map your goals, users and constraints before writing a line of code. |
| 02 | Plan | Senior engineers set the architecture, scope and milestones. |
| 03 | Build | Developers build in pairs, with seniors reviewing every step. |
| 04 | Review & test | Every change is code-reviewed and tested before it reaches you. |
| 05 | Launch & support | We ship, monitor and support you for up to a year. |

### 3. Mentorship

- Eyebrow: `How we grow` · Heading: `Seniors lead.` + red `Everyone grows.`
- Subtext: "Senior engineers guide every project, and the whole team builds alongside them. Our juniors learn on real work, not on the sidelines."
- Four icon cards (lucide icons), same style as the old principles cards.

Data (`mentorship`):

| Icon | Title | Text |
|---|---|---|
| GraduationCap | Learning sessions | Regular sessions where the team shares tools, techniques and lessons from live projects. |
| Wrench | Hands-on experience | Everyone works on real client projects from the start, with a senior close by. |
| FlaskConical | Trial projects | New skills are tested on internal builds first, so client work only gets proven approaches. |
| Users | Team collaboration | Design, engineering and AI work side by side, so problems are solved together, not handed off. |

### 4. Team

- Eyebrow: `The team` · Heading: `The people behind` + red `the dots.`
- Subtext: "Every project is guided by senior engineers, with the whole team building alongside them."
- Existing cards unchanged, plus an optional `education` field on each `team` entry. When present, render a small line with a `GraduationCap` icon under the disciplines. When absent, render nothing.
- Initial data: Janarthan J → `B.Sc. (Hons) in IT`. Others empty; keep `// TODO(content): add education for remaining team members`.

### 5. Values with proof

- Eyebrow: `What we believe` · Heading: `Principles we` + red `actually ship.`
- Four cards; each ends with a small link to the proof project's page (`/projects/<slug>`).

Data (`values`):

| Title | Text | Proof label | Slug |
|---|---|---|---|
| Ship real things | We build for production, not demos. | CAD Studio: live quotes and bookings | `cad-studio-photography` |
| Get the details right | The small things decide whether software can be trusted. | CAD Studio: tax rules by province and bookings that can't double up | `cad-studio-photography` |
| Stay for the long run | Launch is the start of the relationship, not the end. | Limax Medica: maintained for 2+ years | `limax-medica` |
| Test before trust | Nothing reaches you without being reviewed and tested. | CAD Studio: 120 test files | `cad-studio-photography` |

### 6. Quick reach

- Heading: `Wherever we are,` + red `we're easy to reach.`
- `reach`:

| Value | Label |
|---|---|
| 1–2h | First reply |
| 1–2h | Critical issue response |
| 1 | Named point of contact |
| 5h | Daily overlap, minimum |

- `reachChannels`: `Email`, `WhatsApp`, `Phone` (Slack removed).

**AnimatedCounter fix:** current parsing turns `1–2h` into `12–h`. Change: if `value` does not match `/^\d+\D*$/` (a single number plus optional suffix), render the value as static text with no animation. Existing callers with values like `24h`, `5h`, `1` are unaffected.

### 7. On-site visits

- Steps unchanged.
- `visitNote`: "On-site visits available anywhere in Sri Lanka."

### 8. Production checklist

- Unchanged except Post-launch support text: "Up to a year of support after launch, on request, to fix anything the real world uncovers."

## Other changes

- `src/app/contact/page.js` FAQ answer (line ~45): replace "Yes — the majority of our clients are remote…" with "Yes. We work with clients across Sri Lanka and abroad, keeping projects moving with clear written updates and quick replies."
- Delete `remotePrinciples`, `tools`, `squadExample` exports and their imports, plus now-unused icon/service imports in `page.js`.
- Remove resolved `TODO(content)` comments; keep only the team-education one.

## Verification

- `npm run lint` passes with no new warnings.
- Do **not** run `npm run build` (breaks the user's running dev server).
- If the dothunters dev server is running, screenshot `/culture` (desktop + mobile width) with Playwright and check: no "remote" wording, `1–2h` renders correctly, proof links resolve, education line shows only for Janarthan.
- Grep `src/` for `remote` / `Remote` — only the unrelated services.json video-production line should remain.
