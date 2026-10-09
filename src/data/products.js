import allProducts from "./products.json";

export const products = allProducts;

// Products with a project page link there; the rest get /products/<slug>.
export function productHref(product) {
  return product.projectSlug ? `/projects/${product.projectSlug}` : `/products/${product.slug}`;
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}
