// 3D artwork per service: transparent PNGs in /images/services/cards/<slug>.png,
// with their pixel size. Used by the service cards and the service page hero.
const SIZES = {
  "web-design-development":   [1122, 1402],
  "ai-ml-development":        [1225, 1284],
  "3d-vr-game-development":   [1122, 1402],
  "motion-graphics":          [1122, 1402],
  "saas-product-development": [1122, 1402],
  "mobile-app-development":   [1122, 1402],
  "video-production":         [1122, 1402],
  "digital-marketing":        [1122, 1402],
};

// { src, width, height } for a service, or null if it has no artwork yet
export function getServiceArt(slug) {
  const size = SIZES[slug];
  return size ? { src: `/images/services/cards/${slug}.png`, width: size[0], height: size[1] } : null;
}
