# Products Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/products` page showcasing DotHunters' own and open-source products, plus a placeholder `/products/[slug]` page for products without a project page (Aragorn).

**Architecture:** Product data lives in `src/data/products.json`, wrapped by `src/data/products.js` (same pattern as `services.js`). `/products` renders one badge-tagged grid; cards link to `/projects/<projectSlug>` when set, otherwise to `/products/<slug>`. Navbar and footer gain a Products link.

**Tech Stack:** Next.js 13.4 App Router, React 18, Tailwind CSS, lucide-react icons.

**Spec:** `docs/superpowers/specs/2026-10-09-products-page-design.md`

**Verification note:** No test framework exists in this repo. Verify with `npm run lint` and the browser on the running dev server (`npm run dev`, port 3000). Do **not** run `npm run build` — it breaks the user's running dev server.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `src/data/products.json` | Create | Product content (owner edits this) |
| `src/data/products.js` | Create | Exports `products`, `getProductBySlug`, `productHref` |
| `src/components/ProductBadges.js` | Create | Renders badge pills; shared by both pages |
| `src/app/products/page.js` | Create | `/products` grid |
| `src/app/products/[slug]/page.js` | Create | Placeholder detail page |
| `src/components/Navbar.js:11-16` | Modify | Add Products link |
| `src/components/Footer.js:47` | Modify | Add Products link |

---

### Task 1: Product data

**Files:**
- Create: `src/data/products.json`
- Create: `src/data/products.js`

- [ ] **Step 1: Create `src/data/products.json`**

```json
[
  {
    "slug": "dotpos",
    "title": "DotPOS",
    "tagline": "Point-of-sale software built for everyday retail.",
    "description": "",
    "badges": ["Product"],
    "image": "/images/projects/dotpos/login.png",
    "features": [],
    "repoUrl": "",
    "projectSlug": "dotpos"
  },
  {
    "slug": "easywatch",
    "title": "EasyWatch",
    "tagline": "AI-powered CCTV monitoring that actually watches for you.",
    "description": "",
    "badges": ["Product"],
    "image": "/images/projects/easywatch/login.png",
    "features": [],
    "repoUrl": "",
    "projectSlug": "easywatch"
  },
  {
    "slug": "edgecam",
    "title": "EdgeCam",
    "tagline": "Stream your phone as a security camera, anywhere on your network.",
    "description": "",
    "badges": ["Product", "Open Source"],
    "image": "/images/projects/edgecam/mockup.jpg",
    "features": [],
    "repoUrl": "",
    "projectSlug": "edgecam"
  },
  {
    "slug": "aragorn",
    "title": "Aragorn",
    "tagline": "A voice assistant you run on your own machine.",
    "description": "Aragorn is a voice assistant you run on your own machine. Speak, and it transcribes you live with Whisper, sends each finished utterance to an LLM, and streams the answer back — on screen and, if you like, out loud. It can search the web when it needs current information, and it answers voice notes and text from Telegram too.",
    "badges": ["Open Source", "Experimental"],
    "image": "",
    "features": [
      "Live speech transcription with Whisper",
      "Streaming LLM answers, on screen as they arrive",
      "Optional spoken replies",
      "Web search for current information",
      "Answers Telegram voice notes and text"
    ],
    "repoUrl": "",
    "projectSlug": ""
  }
]
```

`description` and `features` are empty for the three products with a `projectSlug` because their cards link to the existing project pages, which already hold that content.

- [ ] **Step 2: Create `src/data/products.js`**

```js
import allProducts from "./products.json";

export const products = allProducts;

// Products with a project page link there; the rest get /products/<slug>.
export function productHref(product) {
  return product.projectSlug ? `/projects/${product.projectSlug}` : `/products/${product.slug}`;
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}
```

- [ ] **Step 3: Sanity-check the data loads**

Run: `node -e "const p=require('./src/data/products.json');console.log(p.map(x=>x.slug+':'+(x.projectSlug||'own-page')).join(' '))"`
Expected: `dotpos:dotpos easywatch:easywatch edgecam:edgecam aragorn:own-page`

- [ ] **Step 4: Commit**

```bash
git add src/data/products.json src/data/products.js
git commit -m "feat: add product data"
```

---

### Task 2: Badge component

**Files:**
- Create: `src/components/ProductBadges.js`

- [ ] **Step 1: Create `src/components/ProductBadges.js`**

```js
const badgeStyles = {
  "Product":      "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
  "Open Source":  "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/40",
  "Experimental": "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/40",
};

export default function ProductBadges({ badges }) {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <span
          key={badge}
          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeStyles[badge] || badgeStyles.Product}`}
        >
          {badge}
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProductBadges.js
git commit -m "feat: add product badge component"
```

---

### Task 3: `/products` page

**Files:**
- Create: `src/app/products/page.js`

- [ ] **Step 1: Create `src/app/products/page.js`**

```js
import Link from "next/link";
import { Mic } from "lucide-react";
import { products, productHref } from "@/data/products";
import ProductBadges from "@/components/ProductBadges";

export const metadata = {
  title: "Products",
  description: "Products DotHunters builds and owns, and the open-source tools we share with the community.",
};

export default function ProductsPage() {
  return (
    <main>
      {/* ── Page Hero ── */}
      <section className="dot-bg bg-gray-50 dark:bg-gray-800 py-24 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">Our Products</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl mb-6 dark:text-white">
            Products we build <span className="text-red-500">and own.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
            Alongside client work, we build our own software — and we open-source our tools where we can.
            EdgeCam is free and open source, and Aragorn is an experimental project built in the open.
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
            {products.map((product) => (
              <div key={product.slug} className="group flex flex-col">
                <Link href={productHref(product)} className="block overflow-hidden rounded-xl mb-5 bg-gray-100 dark:bg-gray-800">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[280px] object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-[280px] flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-red-500 transition">
                      <Mic className="w-16 h-16" strokeWidth={1.25} />
                    </div>
                  )}
                </Link>

                <ProductBadges badges={product.badges} />

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">{product.title}</h2>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{product.tagline}</p>

                <div className="flex items-center gap-3 mt-auto">
                  <Link
                    href={productHref(product)}
                    className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition"
                  >
                    Learn more
                  </Link>
                  {product.repoUrl && (
                    <a
                      href={product.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-full font-semibold text-sm hover:border-gray-500 transition"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
```

The icon tile uses `Mic` because Aragorn is the only product without an image. If a future product has no image, add an `icon` field then (YAGNI for now).

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors (an `@next/next/no-img-element` warning on the new `<img>` is acceptable; the repo already has these everywhere).

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000/products`. Confirm: four cards in a 2-column grid (1 column at mobile width); badges DotPOS `Product`, EasyWatch `Product`, EdgeCam `Product` + `Open Source`, Aragorn `Open Source` + `Experimental`; Aragorn shows the mic tile; no GitHub buttons; dark mode readable. Click each "Learn more": DotPOS/EasyWatch/EdgeCam open `/projects/<slug>`, Aragorn opens `/products/aragorn` (404 until Task 4).

- [ ] **Step 4: Commit**

```bash
git add src/app/products/page.js
git commit -m "feat: add products page"
```

---

### Task 4: `/products/[slug]` placeholder page

**Files:**
- Create: `src/app/products/[slug]/page.js`

- [ ] **Step 1: Create `src/app/products/[slug]/page.js`**

```js
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductBySlug } from "@/data/products";
import ProductBadges from "@/components/ProductBadges";

// Products with a project page are shown there instead.
export function generateStaticParams() {
  return products.filter((p) => !p.projectSlug).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  return product ? { title: product.title, description: product.tagline } : {};
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product || product.projectSlug) notFound();

  return (
    <main>
      {/* ── Hero ── */}
      <section className="dot-bg bg-gray-50 dark:bg-gray-800 py-24 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/products" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
            ← All products
          </Link>
          <div className="mt-8 mb-6">
            <ProductBadges badges={product.badges} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 dark:text-white">{product.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">{product.tagline}</p>
        </div>
      </section>

      {/* ── Details ── */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">Overview</p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">{product.description}</p>
            {product.repoUrl && (
              <a
                href={product.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-gray-900 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition"
              >
                View on GitHub
              </a>
            )}
          </div>

          {product.features.length > 0 && (
            <div>
              <p className="uppercase tracking-widest text-gray-400 dark:text-gray-500 text-sm mb-4">Features</p>
              <ul className="space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                    <svg className="w-5 h-5 mt-0.5 text-red-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Verify in browser**

- `http://localhost:3000/products/aragorn`: badges, title, tagline, description, five features, back link works, no GitHub button.
- `http://localhost:3000/products/dotpos`: 404.
- `http://localhost:3000/products/nope`: 404.
- Temporarily set Aragorn's `repoUrl` to `https://github.com` in `products.json`: GitHub buttons appear on `/products` and `/products/aragorn`. Revert to `""`.

- [ ] **Step 4: Commit**

```bash
git add "src/app/products/[slug]/page.js"
git commit -m "feat: add product detail page for products without a project page"
```

---

### Task 5: Navigation links

**Files:**
- Modify: `src/components/Navbar.js:11-16`
- Modify: `src/components/Footer.js:47`

- [ ] **Step 1: Navbar** — in the `links` array, after Projects:

```js
    { label: "Projects", href: "/projects" },
    { label: "Products", href: "/products" },
    { label: "Contact",  href: "/contact" },
```

- [ ] **Step 2: Footer** — after the Projects list item:

```jsx
              <li><a href="/projects" className="hover:text-white transition">Projects</a></li>
              <li><a href="/products" className="hover:text-white transition">Products</a></li>
```

- [ ] **Step 3: Lint and verify**

Run: `npm run lint` — expected no errors.
Browser: Products appears in desktop navbar, mobile menu (narrow window, open menu), and footer Navigation list; each goes to `/products`.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.js src/components/Footer.js
git commit -m "feat: link products page from navbar and footer"
```
