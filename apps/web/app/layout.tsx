import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BlogClaude - Tech Blog & Resume',
    template: '%s | BlogClaude'
  },
  description: 'A modern tech blog and resume showcase featuring high-level and low-level design content for software professionals.',
  keywords: ['tech blog', 'software engineering', 'high-level design', 'low-level design', 'full-stack development'],
  authors: [{ name: 'BlogClaude' }],
  creator: 'BlogClaude',
  publisher: 'BlogClaude',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://blogclaude.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blogclaude.com',
    title: 'BlogClaude - Tech Blog & Resume',
    description: 'A modern tech blog and resume showcase featuring high-level and low-level design content for software professionals.',
    siteName: 'BlogClaude',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlogClaude - Tech Blog & Resume',
    description: 'A modern tech blog and resume showcase featuring high-level and low-level design content for software professionals.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <div id="root">
          <header className="bg-white shadow-sm border-b">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">BlogClaude</h1>
                </div>
                <div className="flex items-center space-x-8">
                  <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                  <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
                  <Link href="/resume" className="text-gray-600 hover:text-gray-900">Resume</Link>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
                </div>
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="bg-gray-50 border-t">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                © 2025 BlogClaude. Built with Next.js and TypeScript.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}