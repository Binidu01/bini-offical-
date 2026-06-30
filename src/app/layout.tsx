import React from 'react'

import './globals.css'

// metadata is read by bini-router at build time and injected into index.html.
// It is automatically stripped from the browser bundle — never ships to the client.
export const metadata = {
  title: 'Zero-Config React Framework',
  description: 'Bini.js is a zero-config React framework with file-based routing, Hono API routes, and multi-platform deployment. Build modern web applications with zero configuration.',
 keywords: [
    'Bini.js',
    'Bini',
    'bini',
    'bini.js',
    'Bini framework',
    'bini framework',
    'Bini.js framework',
    'bini.js framework',
    'React framework',
    'React SPA framework',
    'zero-config React',
    'file-based routing',
    'Hono API',
    'Vite',
    'React',
    'JavaScript framework',
    'TypeScript framework',
    'full-stack React',
    'meta-framework',
    'web development',
    'modern web framework',
    'API routes',
    'SPA',
    'single page application',
    'SPA framework',
    'single page app',
    'edge functions',
    'Cloudflare Workers',
    'Vercel',
    'Netlify',
    'Deno',
    'Bun',
    'Node.js',
    'deployment',
    'bini-router',
    'bini-env',
    'bini-server',
    'create-bini-app',
    'islands architecture',
    'partial hydration',
    'progressive enhancement',
    'Tailwind CSS',
    'CSS Modules',
    'TypeScript',
    'JavaScript',
    'web performance',
    'developer experience',
    'DX',
    'build tool',
    'frontend framework',
    'backend framework',
    'full-stack framework',
    'Binidu Ranasinghe',
    'open source framework',
    'MIT licensed',
  ],
  themeColor: '#00CFFF',
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Zero-Config React Framework',
    description: 'Bini.js is a zero-config React framework with file-based routing, Hono API routes, and multi-platform deployment. Build modern web applications with zero configuration.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zero-Config React Framework',
    creator: '@binidu01',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

// Root layout — wraps every page.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>
}
