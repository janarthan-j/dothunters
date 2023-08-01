import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DotHunters',
  description: 'Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Link href="/">Home</Link>

          <Link href="/services">Services</Link>
          <Link href="/projects">Projects</Link>

        </nav>
        {children}</body>
    </html>
  )
}
