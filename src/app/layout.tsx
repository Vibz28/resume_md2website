import type { Metadata } from 'next'
import './globals.css'
import { NavSimple } from '@/components/NavSimple'
import { SkipNavigation } from '@/components/SkipNavigation'

export const metadata: Metadata = {
  title: 'Vibhor Janey — AI Solution Architect',
  description: 'Architecting AI solutions for manufacturing and healthcare. Expert in LangGraph, LLM orchestration, and production-scale ML systems.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SkipNavigation />
        <header>
          <NavSimple />
        </header>
        <main id="main-content" role="main">{children}</main>
        <footer className="border-t border-border bg-muted/30" role="contentinfo">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground font-mono">
                <span className="text-primary">&gt;</span> vibhor.janey@gmail.com
              </p>
              <p className="text-sm text-muted-foreground">
                © 2025 Vibhor Janey. Built with precision.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
