import Link from "next/link";
import { products, productHref } from "@/data/products";
import ProductBadges from "@/components/ProductBadges";
import ParallaxImage from "@/components/ParallaxImage";
import PageHero from "@/components/PageHero";
import { FrostedPill } from "@/components/MediaCard";

export const metadata = {
  title: "Products",
  description: "Products DotHunters builds and owns, and the open-source tools we share with the community.",
};

// Masonry rhythm: columns fill top-to-bottom, so tall/short/short/tall
// staggers the two columns against each other
const heightFor = (i) => (i % 4 === 0 || i % 4 === 3 ? "h-[360px] md:h-[560px]" : "h-[300px] md:h-[400px]");

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Our products"
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        title={["Products we build", { text: "and own.", className: "text-red-500" }]}
        intro="Alongside client work, we build our own software — and we open-source our tools where we can. EdgeCam is free and open source, and Aragorn is an experimental project built in the open."
      />

      {/* ── Masonry ── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="md:columns-2 gap-10">
            {products.map((product, i) => (
              <article key={product.slug} className="break-inside-avoid mb-14 md:mb-16">
                <Link
                  href={productHref(product)}
                  data-cursor="View"
                  className="arrow-link group relative block rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 mb-6"
                >
                  {product.image ? (
                    <ParallaxImage
                      src={product.image}
                      alt=""
                      className={heightFor(i)}
                      imgClassName="group-hover:scale-105 transition duration-700"
                    />
                  ) : (
                    <div className={`${heightFor(i)} flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white/30 group-hover:text-red-400 transition`}>
                      {/* Inline mic icon: lucide-react needs a client component, and this page is a server component. */}
                      <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" x2="12" y1="19" y2="22" />
                      </svg>
                    </div>
                  )}

                  <FrostedPill>{product.title}</FrostedPill>
                </Link>

                <ProductBadges badges={product.badges} />
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mt-4 max-w-lg">{product.tagline}</p>
                {product.repoUrl && (
                  <a
                    href={product.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-xs font-semibold uppercase tracking-widest text-gray-900 dark:text-white hover:text-red-500 dark:hover:text-red-400 transition"
                  >
                    View on GitHub ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
