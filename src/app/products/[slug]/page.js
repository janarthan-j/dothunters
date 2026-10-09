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
