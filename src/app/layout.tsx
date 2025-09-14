import type { Metadata } from 'next'
import './globals.css'

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
        <header className="border-b border-gray-200 bg-white">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <a href="/resume_md2website/" className="text-xl font-bold text-gray-900">
                  Vibhor Janey
                </a>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="/resume_md2website/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </a>
                  <a href="/resume_md2website/experience/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Experience
                  </a>
                  <a href="/resume_md2website/about/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    About
                  </a>
                  <a href="/resume_md2website/projects/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Projects
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © 2025 Vibhor Janey. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}