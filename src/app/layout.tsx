import type { Metadata } from 'next'
import { Fraunces, Public_Sans, Space_Mono } from 'next/font/google'
import './globals.css'
import { NavSimple } from '@/components/NavSimple'
import { SkipNavigation } from '@/components/SkipNavigation'

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '800'],
})

const sans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
})

const mono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Vibhor Janey - Data Scientist & AI Engineer',
  description: 'Personal website showcasing professional experience, projects, and expertise in data science and AI engineering.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans">
        <SkipNavigation />
        <header>
          <NavSimple />
        </header>
        <main id="main-content" role="main">{children}</main>
        <footer className="border-t border-border/70 bg-background/80 backdrop-blur-sm" role="contentinfo">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2025 Vibhor Janey. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
