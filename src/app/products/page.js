import Link from "next/link";
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
                {/* Duplicates "Learn more", so it's skipped by keyboard and screen readers. */}
                <Link
                  href={productHref(product)}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="block overflow-hidden rounded-xl mb-5 bg-gray-100 dark:bg-gray-800"
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[280px] object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-[280px] flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-red-500 transition">
                      {/* Inline mic icon: lucide-react needs a client component, and this page is a server component. */}
                      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" x2="12" y1="19" y2="22" />
                      </svg>
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
