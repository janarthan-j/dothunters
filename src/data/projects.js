import allProjects from "./projects.json";

// Projects flagged `"hidden": true` in projects.json are left off the site
// entirely: lists, detail pages, and service page references.
export const projects = allProjects.filter((p) => !p.hidden);

const hiddenSlugs = new Set(allProjects.filter((p) => p.hidden).map((p) => p.slug));

export function isHiddenProject(slug) {
  return hiddenSlugs.has(slug);
}
