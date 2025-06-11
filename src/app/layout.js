import Link from 'next/link'
import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import Navbar from '@/components/Navbar'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], // specify the weights you need
  variable: '--font-space-grotesk', // optional: for CSS variable usage
  display: 'swap', // optional
});

export const metadata = {
  title: 'DotHunters',
  description: 'Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <Navbar />
        {children}</body>
    </html>
  )
}
