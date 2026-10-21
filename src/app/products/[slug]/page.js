import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import ProductBadges from "@/components/ProductBadges";
import PageHero from "@/components/PageHero";
import ScrollFillText from "@/components/ScrollFillText";
import SectionHeader, { Eyebrow } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";

// Products with a project page are shown there instead.
export function generateStaticParams() {
  return products.filter((p) => !p.projectSlug).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  return product && !product.projectSlug ? { title: product.title, description: product.tagline } : {};
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product || product.projectSlug) notFound();

  return (
    <main>
      <PageHero
        eyebrow="Product details"
        crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }]}
        title={product.title}
        intro={product.tagline}
      >
        <div className="mt-8">
          <ProductBadges badges={product.badges} />
        </div>
      </PageHero>

      {/* ── Overview ── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-gray-200 dark:border-gray-800 pt-16">
          <Eyebrow className="lg:col-span-4 lg:pt-3">Overview</Eyebrow>
          <div className="lg:col-span-8">
            <ScrollFillText
              text={product.description}
              className="text-gray-900 dark:text-white text-2xl md:text-4xl font-semibold leading-snug tracking-tight mb-10"
            />
            {product.repoUrl && (
              <a
                href={product.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-900 dark:text-white hover:text-red-500 dark:hover:text-red-400 transition"
              >
                View on GitHub ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      {product.features.length > 0 && (
        <section className="dot-bg py-24 bg-white/25 dark:bg-white/[0.03]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader eyebrow="Features" title={["What it", "does."]} className="border-gray-300 dark:border-gray-700" />
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 shrink-0" aria-hidden="true" />
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        eyebrow="Interested?"
        title={["Want something like this", { text: "built for you?", className: "text-red-500" }]}
        text="We build custom products for teams that need them. Tell us what you have in mind."
        secondary={{ href: "/products", label: "All products" }}
      />
    </main>
  );
}
