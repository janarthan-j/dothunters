import './globals.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata = {
  metadataBase: new URL('https://dothunters.com'),
  title: {
    default: 'DotHunters — Creative Digital Studio',
    template: '%s | DotHunters',
  },
  description: 'DotHunters is a creative digital studio specialising in UI/UX design, web development, 3D/VR experiences, and motion graphics. We build digital products that look great and convert.',
  keywords: [
    'UI/UX design', 'web development', 'motion graphics', '3D design', 'VR development',
    'Next.js agency', 'digital studio', 'Sri Lanka', 'creative agency', 'brand design',
  ],
  authors: [{ name: 'DotHunters', url: 'https://dothunters.com' }],
  creator: 'DotHunters',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dothunters.com',
    siteName: 'DotHunters',
    title: 'DotHunters — Creative Digital Studio',
    description: 'UI/UX design, web development, and motion crafted to grow your brand and convert your users.',
    images: [{ url: '/image.png', width: 1200, height: 630, alt: 'DotHunters Creative Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DotHunters — Creative Digital Studio',
    description: 'UI/UX design, web development, and motion crafted to grow your brand and convert your users.',
    images: ['/image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(s===null&&d)){document.documentElement.classList.add('dark')}})();`
        }} />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
