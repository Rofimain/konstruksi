// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans, Space_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { siteConfig } from '@/data'
import { headers } from 'next/headers'

const playfair = Playfair_Display({
  subsets: ['latin'], variable: '--font-playfair', display: 'swap',
})
const dmSans = DM_Sans({
  subsets: ['latin'], variable: '--font-dm-sans', display: 'swap',
})
const spaceMono = Space_Mono({
  subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono', display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.siteName} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  keywords: ['konstruksi', 'kontraktor', 'arsitek', 'pembangunan', 'renovasi', 'Jakarta', 'Indonesia'],
  openGraph: {
    type: 'website', locale: 'id_ID',
    title: siteConfig.siteName, description: siteConfig.description,
    siteName: siteConfig.siteName,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0B', width: 'device-width', initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || ''
  const isAdmin = pathname.startsWith('/admin')

  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body className="bg-brand-dark text-brand-cream font-body antialiased">
        {!isAdmin && <CustomCursor />}
        {!isAdmin && <Navbar />}
        <main className={isAdmin ? '' : 'min-h-screen'}>
          {children}
        </main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  )
}
