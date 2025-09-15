import type { Metadata } from 'next'
import './globals.css'
import { NavSimple } from '@/components/NavSimple'
import { SkipNavigation } from '@/components/SkipNavigation'

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
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <SkipNavigation />
        <header>
          <NavSimple />
        </header>
        <main id="main-content" role="main">{children}</main>
        <footer className="border-t border-border bg-muted/30" role="contentinfo">
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