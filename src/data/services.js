import allServices from "./services.json";
import { isHiddenProject } from "./projects";

const services = allServices.map((s) => ({
  ...s,
  projects: s.projects.filter((p) => !isHiddenProject(p.slug)),
}));

export { services };

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug) || null;
}
