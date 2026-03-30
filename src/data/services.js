import services from "./services.json";

export { services };

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug) || null;
}
