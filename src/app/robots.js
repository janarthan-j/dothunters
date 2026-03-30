export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://dothunters.com/sitemap.xml',
    host: 'https://dothunters.com',
  };
}
