# Products Page — Design

## Purpose

Showcase DotHunters' own products (DotPOS, EasyWatch, EdgeCam) and its
open-source work (EdgeCam is open source; Aragorn is an open-source,
experimental voice assistant) on a new `/products` page.

## Decisions

- Products also stay on `/projects` — no changes to project data or pages.
- `/products` is a single grid; each card carries badges
  (`Product`, `Open Source`, `Experimental`).
- Products that already have a project page link to it. Products without one
  (today: Aragorn) get a simple placeholder page at `/products/[slug]` that the
  owner fills in later.
- Repo links are added later; until then no GitHub button is shown.

## Data — `src/data/products.json`

An array; order is display order. Fields:

| Field | Type | Notes |
|---|---|---|
| `slug` | string | URL segment for `/products/[slug]` |
| `title` | string | |
| `tagline` | string | One line, shown on card and detail hero |
| `description` | string | Paragraph, shown on detail page |
| `badges` | string[] | Any of `Product`, `Open Source`, `Experimental` |
| `image` | string | Optional. Card shows an icon tile when empty |
| `features` | string[] | Shown on detail page |
| `repoUrl` | string | Empty until the owner adds it |
| `projectSlug` | string | Optional. When set, the card links to `/projects/<projectSlug>` and no `/products/<slug>` page is generated |

Initial entries:

| Product | Badges | `projectSlug` | Image |
|---|---|---|---|
| DotPOS | Product | `dotpos` | existing project image |
| EasyWatch | Product | `easywatch` | existing project image |
| EdgeCam | Product, Open Source | `edgecam` | existing project image |
| Aragorn | Open Source, Experimental | — | none |

Title, tagline and image for the first three are copied from `projects.json`.
Aragorn uses the owner's description; draft features: live transcription with
Whisper, streaming LLM answers, optional spoken replies, web search for current
information, Telegram voice notes and text. Owner will revise.

`src/data/products.js` exports `products` and `getProductBySlug(slug)`,
matching the `services.js` pattern.

## Pages

### `/products` (`src/app/products/page.js`)

- Hero, same pattern as `/projects`: eyebrow "Our Products", heading
  "Products we build and own.", paragraph on open-source support naming
  EdgeCam (open source) and Aragorn (experimental, built in the open).
- Grid: 1 / 2 columns (mobile / md+). Each card:
  - Image (or icon tile using a lucide icon when `image` is empty)
  - Badges, title, tagline
  - "Learn more" → `/projects/<projectSlug>` or `/products/<slug>`
  - "GitHub" button (opens in new tab) only when `repoUrl` is non-empty
- Server component; data is static.

### `/products/[slug]` (`src/app/products/[slug]/page.js`)

- `generateStaticParams` returns only products without `projectSlug`.
- `notFound()` for unknown slugs and for products that have a `projectSlug`.
- Sections: hero (badges, title, tagline), description, feature list,
  GitHub button when `repoUrl` set, link back to `/products`. No other
  sections; the page stays minimal until the owner adds content.

## Navigation

- Navbar: add `{ label: "Products", href: "/products" }` after Projects.
- Footer: add Products link after Projects in the same list.

## Out of scope

- Homepage section for products.
- Removing products from `/projects`.
- Product pricing, demos or sign-up.

## Testing

No automated test suite exists. Verify with `npm run lint` (not
`npm run build` — it disrupts the running dev server), then in the browser:

- `/products` renders four cards with correct badges; dark mode; mobile width
- DotPOS / EasyWatch / EdgeCam cards open their `/projects/...` pages
- Aragorn card opens `/products/aragorn`; icon tile shown instead of image
- No GitHub buttons while `repoUrl` is empty; setting one shows the button
- `/products/dotpos` returns 404
- Navbar (desktop and mobile menu) and footer show Products
