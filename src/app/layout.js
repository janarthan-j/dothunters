import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DotHunters',
  description: 'Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />

        {children}</body>
    </html>
  )
}
