// src/pages/docs/file-based-routing/page.tsx
import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Layout'
import { DocLayout } from '../../components/DocSidebar'
import { CopyPageButton } from '../../components/CopyPageButton'
import { TableOfContents, type TocItem } from '../../components/TableOfContents'

// ────────────────────────────────────────────────────────────────────────────────
// "On this page" entries
// ────────────────────────────────────────────────────────────────────────────────
const TOC_ITEMS: TocItem[] = [
  { id: 'special-files', label: 'Special Files' },
  { id: 'page-file', label: 'page.tsx' },
  { id: 'mdx-pages', label: 'MDX & Markdown Pages' },
  { id: 'layout-file', label: 'layout.tsx' },
  { id: 'loading-file', label: 'loading.tsx' },
  { id: 'error-file', label: 'error.tsx' },
  { id: 'not-found-file', label: 'not-found.tsx' },
  { id: 'nearest-wins', label: 'Nearest Wins Resolution' },
  { id: 'file-combinations', label: 'File Combinations' },
  { id: 'file-priority', label: 'File Priority' },
  { id: 'complete-example', label: 'Complete Example' },
]

const PAGE_TITLE = 'File-Based Routing'
const PAGE_URL = 'https://bini.js.org/docs/file-based-routing'
const EDIT_URL = 'https://github.com/Binidu01/bini-official/edit/main/src/pages/docs/file-based-routing/page.tsx'

// ────────────────────────────────────────────────────────────────────────────────
// Code Block Component with horizontal scrollbar
// ────────────────────────────────────────────────────────────────────────────────
function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  const [copied, setCopied] = React.useState(false)
  const handleCopy = () => { 
    const cleanCode = code.replace(/\$ /g, '')
    navigator.clipboard.writeText(cleanCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) 
  }

  return (
    <div className="relative group mb-6">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border border-slate-800 border-b-0 rounded-t-lg">
          <span className="text-sm text-slate-300 font-mono">{filename}</span>
        </div>
      )}
      <button onClick={handleCopy} className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors z-10 opacity-0 group-hover:opacity-100" style={{ top: filename ? '3rem' : '0.5rem' }}>
        {copied ? (
          <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
      <div className={`bg-[#0a0a0a] border border-slate-700 ${filename ? 'rounded-t-none' : 'rounded-lg'} overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent hover:scrollbar-thumb-slate-500`}>
        <pre className="p-4 min-w-max">
          <code className="text-sm font-mono text-slate-200 whitespace-pre">{code}</code>
        </pre>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Table Component
// ────────────────────────────────────────────────────────────────────────────────
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700 my-6">
      <table className="w-full text-sm">
        <thead className="bg-slate-900 border-b border-slate-800">
          <tr>{headers.map((h, i) => <th key={i} className="text-left py-3 px-4 font-medium text-white">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} className="py-3 px-4 text-slate-300 text-xs">{cell}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// File-Based Routing Page
// ────────────────────────────────────────────────────────────────────────────────
export default function FileBasedRoutingPage() {
  return (
    <div className="min-h-screen bg-black font-sans antialiased overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-300 h-200 bg-linear-to-b from-cyan-500/5 via-sky-500/3 to-transparent rounded-full blur-3xl" />
      </div>

      <Header />

      <div className="relative pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 overflow-x-hidden">
          
          <DocLayout>
            <div className="flex gap-10 xl:gap-14">
              {/* Main content column */}
              <div className="max-w-4xl min-w-0 flex-1">

                {/* Title + Copy page button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start justify-between gap-4 mb-4"
                >
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{PAGE_TITLE}</h1>
                    <p className="text-slate-400 text-sm">Learn how special files like page.tsx, layout.tsx, loading.tsx, error.tsx, and MDX pages define route behavior in Bini.js.</p>
                  </div>
                  <div className="shrink-0 pt-2 hidden sm:block">
                    <CopyPageButton pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} />
                  </div>
                </motion.div>
                {/* Copy button on small screens */}
                <div className="sm:hidden mb-8">
                  <CopyPageButton pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} />
                </div>

                {/* Overview */}
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <p className="text-slate-300 mb-6">
                    Bini.js uses special file conventions to define route behavior. Each file has a specific purpose and is automatically recognized by the router.
                  </p>
                </motion.section>

                {/* Special Files Overview */}
                <motion.section id="special-files" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Special Files</h2>
                  <Table 
                    headers={['File', 'Purpose']}
                    rows={[
                      ['page.tsx / page.jsx', 'Defines a public route — required to make a route accessible'],
                      ['page.mdx / page.md', 'MDX/Markdown content route — full JSX/import/export support'],
                      ['layout.tsx / layout.jsx', 'Shared UI that wraps pages and nested layouts'],
                      ['loading.tsx / loading.jsx', 'Loading UI shown while page content streams'],
                      ['error.tsx / error.jsx', 'Error UI when something breaks in a route or its children'],
                      ['not-found.tsx / not-found.jsx', 'Custom 404 page for unmatched routes'],
                      ['hello.ts / hello.js', 'API endpoint (in src/app/api/)'],
                    ]}
                  />
                  <p className="text-slate-300 mt-4">
                    Files must be placed in the correct location within <code className="text-cyan-400">src/app/</code> to work properly.
                  </p>
                </motion.section>

                {/* page.tsx */}
                <motion.section id="page-file" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">page.tsx</h2>
                  <p className="text-slate-300 mb-4">
                    The <code className="text-cyan-400">page.tsx</code> file defines a public route. Without it, the folder is not accessible via URL.
                  </p>
                  <CodeBlock 
                    code={`// src/app/page.tsx
export default function HomePage() {
  return <h1>Welcome to Bini.js!</h1>
}

// src/app/about/page.tsx
export default function AboutPage() {
  return <h1>About Us</h1>
}

// src/app/blog/page.tsx
export default function BlogPage() {
  return <h1>Blog</h1>
}`}
                  />
                  <p className="text-slate-300 mt-4">
                    Each <code className="text-cyan-400">page.tsx</code> must have a <strong className="text-white">default export</strong> of a React component.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Page with Dynamic Params</h3>
                  <CodeBlock 
                    code={`// src/app/blog/[slug]/page.tsx
export default function BlogPost() {
  const { slug } = useParams()
  
  return (
    <article>
      <h1>Post: {slug}</h1>
    </article>
  )
}`}
                    filename="app/blog/[slug]/page.tsx"
                  />
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Flat File Pages</h3>
                  <p className="text-slate-300 mb-4">
                    Pages can also be defined as flat files without a folder:
                  </p>
                  <CodeBlock 
                    code={`src/app/
├── page.tsx              → /
├── about.tsx             → /about
├── contact.tsx           → /contact
└── blog/
    └── [slug].tsx        → /blog/:slug`}
                  />
                  <p className="text-slate-300 mt-4">
                    This creates routes at <code className="text-cyan-400">/about</code> and <code className="text-cyan-400">/contact</code> without needing separate folders.
                  </p>
                </motion.section>

                {/* MDX & Markdown Pages */}
                <motion.section id="mdx-pages" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">MDX & Markdown Pages</h2>
                  <p className="text-slate-300 mb-4">
                    Bini.js supports <code className="text-cyan-400">.mdx</code> and <code className="text-cyan-400">.md</code> files as content routes out of the box — no setup required. <code className="text-cyan-400">@mdx-js/rollup</code> is bundled internally.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">MDX Page Example</h3>
                  <CodeBlock 
                    code={`---
export const metadata = {
  title: 'About',
  description: 'Learn about us',
}
---

# About us

This is regular **markdown**, rendered as JSX under the hood. You can also
drop in real components:

<button className="rounded bg-cyan-500 px-4 py-2 text-white">
  Click me
</button>

## Features

- File-based routing
- MDX & Markdown support
- Nested layouts`}
                    filename="app/about.mdx"
                  />
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">MDX with Imports</h3>
                  <CodeBlock 
                    code={`import { Button } from '@/components/Button'

export const metadata = {
  title: 'Blog Post',
}

# My Blog Post

<Button>Click me</Button>`}
                    filename="app/blog/[slug].mdx"
                  />
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Flat File MDX Routes</h3>
                  <CodeBlock 
                    code={`src/app/
├── about.mdx            → /about
├── blog/
│   ├── page.tsx         → /blog
│   └── [slug].mdx       → /blog/:slug
└── contact.md           → /contact`}
                  />
                  
                  <p className="text-slate-300 mt-4">
                    Both <code className="text-cyan-400">.mdx</code> and <code className="text-cyan-400">.md</code> are compiled through the same MDX pipeline (full JSX/import/export support in both). Auto-imports (<code className="text-cyan-400">useState</code>, <code className="text-cyan-400">Link</code>, <code className="text-cyan-400">getEnv</code>, etc.) apply to MDX files the same as any other page.
                  </p>
                  
                  <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 mt-4">
                    <p className="text-slate-300 text-sm">
                      <strong className="text-white">Note:</strong> <code className="text-cyan-400">layout.tsx</code>, <code className="text-cyan-400">not-found.tsx</code>, <code className="text-cyan-400">loading.tsx</code>, and <code className="text-cyan-400">error.tsx</code> must stay <code className="text-cyan-400">.tsx</code>/<code className="text-cyan-400">.jsx</code> — they define app structure rather than content.
                    </p>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Extension Priority</h3>
                  <p className="text-slate-300 mb-4">
                    When multiple files share the same base name (e.g., both <code className="text-cyan-400">page.tsx</code> and <code className="text-cyan-400">page.mdx</code> exist in the same folder):
                  </p>
                  <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 mb-4">
                    <code className="text-cyan-400 text-sm">
                      .tsx &gt; .jsx &gt; .ts &gt; .js &gt; .mdx &gt; .md
                    </code>
                  </div>
                  <p className="text-slate-300">
                    The higher-priority file wins; the lower-priority one is simply ignored for that route.
                  </p>
                </motion.section>

                {/* layout.tsx */}
                <motion.section id="layout-file" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">layout.tsx</h2>
                  <p className="text-slate-300 mb-4">
                    Layouts wrap pages and other layouts, providing shared UI that persists across navigation.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Root Layout</h3>
                  <p className="text-slate-300 mb-4">
                    The root layout at <code className="text-cyan-400">src/app/layout.tsx</code> is <strong className="text-white">required</strong>. It wraps all pages in your application.
                  </p>
                  <CodeBlock 
                    code={`// src/app/layout.tsx
export const metadata = {
  title: 'My App',
  description: 'Built with Bini.js',
}

export default function RootLayout() {
  return <Outlet />
}`}
                    filename="app/layout.tsx"
                  />
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Nested Layout</h3>
                  <p className="text-slate-300 mb-4">
                    Create layouts for specific sections by adding <code className="text-cyan-400">layout.tsx</code> in subdirectories.
                  </p>
                  <CodeBlock 
                    code={`// src/app/dashboard/layout.tsx
export default function DashboardLayout() {
  return (
    <div className="dashboard">
      <aside>Sidebar</aside>
      <main><Outlet /></main>
    </div>
  )
}`}
                    filename="app/dashboard/layout.tsx"
                  />
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Layout Nesting</h3>
                  <CodeBlock 
                    code={`src/app/
├── layout.tsx            ← Wraps everything
├── page.tsx              ← /
└── dashboard/
    ├── layout.tsx        ← Wraps /dashboard/*
    ├── page.tsx          ← /dashboard
    └── settings/
        └── page.tsx      ← /dashboard/settings`}
                  />
                  <p className="text-slate-300 mt-4">
                    The root layout wraps the dashboard layout, which wraps the settings page.
                  </p>
                </motion.section>

                {/* loading.tsx */}
                <motion.section id="loading-file" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">loading.tsx</h2>
                  <p className="text-slate-300 mb-4">
                    The <code className="text-cyan-400">loading.tsx</code> file provides a loading UI while page content is being loaded. It wraps the page in a Suspense boundary.
                  </p>
                  <CodeBlock 
                    code={`// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-cyan-500" />
    </div>
  )
}`}
                    filename="app/loading.tsx"
                  />
                  <p className="text-slate-300 mt-4">
                    You can also create route-specific loading UI:
                  </p>
                  <CodeBlock 
                    code={`// src/app/dashboard/loading.tsx
export default function DashboardLoading() {
  return <DashboardSkeleton />
}`}
                    filename="app/dashboard/loading.tsx"
                  />
                  <p className="text-slate-300 mt-4">
                    The loading UI is shown immediately on navigation while the page content streams in.
                  </p>
                </motion.section>

                {/* error.tsx */}
                <motion.section id="error-file" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">error.tsx</h2>
                  <p className="text-slate-300 mb-4">
                    The <code className="text-cyan-400">error.tsx</code> file catches errors thrown anywhere in a route or its children. It wraps the route and its children in an Error Boundary.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Basic Error Component</h3>
                  <CodeBlock 
                    code={`// src/app/dashboard/error.tsx
export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6">
      <h2>Something went wrong!</h2>
      <p className="text-red-400">{error.message}</p>
      <button 
        onClick={reset}
        className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  )
}`}
                    filename="app/dashboard/error.tsx"
                  />
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Error Props</h3>
                  <p className="text-slate-300 mb-4">
                    Your <code className="text-cyan-400">error.tsx</code> component receives two props:
                  </p>
                  <ul className="space-y-2 text-slate-300 mb-4 list-disc list-inside">
                    <li><code className="text-cyan-400">error</code> — The thrown Error object with message and stack trace</li>
                    <li><code className="text-cyan-400">reset</code> — A function that clears the error state and re-renders children</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Folder-Scoped Errors</h3>
                  <p className="text-slate-300 mb-4">
                    Place <code className="text-cyan-400">error.tsx</code> in any folder to catch errors only for that route and its children:
                  </p>
                  <CodeBlock 
                    code={`src/app/
├── layout.tsx
├── page.tsx
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── error.tsx          ← Only catches errors in /dashboard/*
│   └── settings/
│       └── page.tsx       ← Also wrapped by dashboard/error.tsx
└── blog/
    ├── page.tsx
    └── error.tsx           ← Only catches errors in /blog/*`}
                  />
                </motion.section>

                {/* not-found.tsx */}
                <motion.section id="not-found-file" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">not-found.tsx</h2>
                  <p className="text-slate-300 mb-4">
                    The <code className="text-cyan-400">not-found.tsx</code> file defines a custom 404 page for unmatched routes.
                  </p>
                  <CodeBlock 
                    code={`// src/app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-4">404</h1>
      <p className="text-slate-400 mb-4">Page not found</p>
      <Link to="/" className="text-cyan-400 hover:underline">
        Return Home
      </Link>
    </div>
  )
}`}
                    filename="app/not-found.tsx"
                  />
                  <p className="text-slate-300 mt-4">
                    You can also trigger the 404 page programmatically:
                  </p>
                  <CodeBlock 
                    code={`// src/app/blog/[slug]/page.tsx
export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  
  if (!post) {
    return <NotFound />
  }
  
  return <article>{post.content}</article>
}`}
                  />
                </motion.section>

                {/* Nearest Wins Resolution */}
                <motion.section id="nearest-wins" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Nearest Wins Resolution</h2>
                  <p className="text-slate-300 mb-4">
                    <code className="text-cyan-400">loading.tsx</code>, <code className="text-cyan-400">not-found.tsx</code>, and <code className="text-cyan-400">error.tsx</code> all use <strong className="text-white">"nearest wins"</strong> resolution — a file in a subfolder only affects that subfolder and shadows (without deleting) the same file in any ancestor folder.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">How It Works</h3>
                  <ul className="space-y-2 text-slate-300 mb-4 list-disc list-inside">
                    <li>A file in a subfolder only affects routes inside that subfolder</li>
                    <li>It shadows (but doesn't delete) the same file in ancestor folders</li>
                    <li>Routes without a closer match fall through to the nearest ancestor</li>
                    <li>Built-in defaults apply if nothing exists anywhere</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Example Structure</h3>
                  <CodeBlock 
                    code={`src/app/
├── layout.tsx
├── page.tsx
├── loading.tsx              ← Default loading for all routes
├── not-found.tsx            ← Default 404 for all routes
├── error.tsx                ← Default error for all routes
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx          ← Only affects /dashboard/*
│   ├── error.tsx            ← Only affects /dashboard/*
│   └── settings/
│       └── page.tsx         ← Uses dashboard/loading.tsx and dashboard/error.tsx
└── blog/
    ├── page.tsx
    ├── loading.tsx          ← Only affects /blog/*
    └── [slug]/
        └── page.tsx         ← Uses blog/loading.tsx`}
                  />
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Resolution Flow</h3>
                  <p className="text-slate-300 mb-4">
                    When a route needs a boundary file (loading, error, or not-found):
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-slate-300 mb-4">
                    <li>Check the route's own folder first</li>
                    <li>If not found, check each parent folder (going up)</li>
                    <li>If still not found, use the built-in default</li>
                  </ol>
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Built-in Defaults</h3>
                  <ul className="space-y-2 text-slate-300 mb-4 list-disc list-inside">
                    <li><strong className="text-white">Loading:</strong> Built-in dark-mode-aware spinner</li>
                    <li><strong className="text-white">Error:</strong> <code className="text-cyan-400">null</code> in dev (Vite overlay takes over), generic "Something went wrong" in production</li>
                    <li><strong className="text-white">Not Found:</strong> Built-in 404 page</li>
                  </ul>
                </motion.section>

                {/* File Combinations */}
                <motion.section id="file-combinations" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">File Combinations</h2>
                  <p className="text-slate-300 mb-4">
                    Special files can be combined in the same folder to create rich route behavior:
                  </p>
                  <CodeBlock 
                    code={`src/app/dashboard/
├── layout.tsx            ← Shared layout for all dashboard pages
├── loading.tsx           ← Loading UI for dashboard
├── error.tsx             ← Error UI for dashboard
├── page.tsx              ← Dashboard home
├── settings/
│   ├── page.tsx          ← Settings page (inherits layout, loading, error)
│   └── loading.tsx       ← Override loading UI just for settings
└── profile/
    ├── layout.tsx        ← Additional nested layout for profile
    └── page.tsx          ← Profile page`}
                  />
                  <Table 
                    headers={['Route', 'Files Used']}
                    rows={[
                      ['/dashboard', 'layout.tsx + loading.tsx + error.tsx + page.tsx'],
                      ['/dashboard/settings', 'layout.tsx + loading.tsx (from settings) + error.tsx (from dashboard) + page.tsx'],
                      ['/dashboard/profile', 'layout.tsx + profile/layout.tsx + loading.tsx + error.tsx + page.tsx'],
                    ]}
                  />
                </motion.section>

                {/* File Priority */}
                <motion.section id="file-priority" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">File Priority</h2>
                  <p className="text-slate-300 mb-4">
                    When multiple files could apply to a route, they are resolved in this order (from outermost to innermost):
                  </p>
                  <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 mb-6">
                    <ol className="list-decimal list-inside space-y-2 text-slate-300">
                      <li>Root <code className="text-cyan-400">layout.tsx</code></li>
                      <li>Nested <code className="text-cyan-400">layout.tsx</code> files (from root to leaf)</li>
                      <li><code className="text-cyan-400">loading.tsx</code> (closest to the page)</li>
                      <li><code className="text-cyan-400">error.tsx</code> (closest to the page)</li>
                      <li><code className="text-cyan-400">not-found.tsx</code> (if triggered)</li>
                      <li><code className="text-cyan-400">page.tsx</code> or <code className="text-cyan-400">page.mdx</code></li>
                    </ol>
                  </div>
                </motion.section>

                {/* Complete Example */}
                <motion.section id="complete-example" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Complete Example</h2>
                  <p className="text-slate-300 mb-4">
                    Here's a comprehensive file structure showing all special files:
                  </p>
                  <CodeBlock 
                    code={`src/app/
├── layout.tsx                 ← Root layout (required)
├── page.tsx                   → /
├── loading.tsx                ← Global loading UI
├── error.tsx                  ← Global error UI
├── not-found.tsx              ← Global 404 page
├── about.mdx                  → /about (MDX page)
├── contact.md                 → /contact (Markdown page)
├── blog/
│   ├── layout.tsx             ← Blog layout
│   ├── page.tsx               → /blog
│   ├── loading.tsx            ← Blog loading UI
│   ├── error.tsx              ← Blog error UI
│   ├── [slug]/
│   │   └── page.tsx           → /blog/:slug
│   └── _components/           ← Private folder (not routable)
│       └── PostCard.tsx
├── dashboard/
│   ├── layout.tsx             ← Dashboard layout
│   ├── page.tsx               → /dashboard
│   ├── loading.tsx            ← Dashboard loading UI
│   ├── error.tsx              ← Dashboard error UI
│   ├── settings/
│   │   └── page.tsx           → /dashboard/settings
│   └── profile/
│       ├── layout.tsx         ← Nested profile layout
│       └── page.tsx           → /dashboard/profile
└── api/                       ← API routes
    ├── hello.ts               → /api/hello
    └── users/
        └── [id].ts            → /api/users/:id`}
                  />
                </motion.section>

                {/* Previous / Next Navigation */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                  <Link to="/docs/folder-based-routing" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <div>
                      <div className="text-xs text-slate-500">Previous</div>
                      <div className="text-sm font-medium">Folder-Based Routing</div>
                    </div>
                  </Link>
                  <Link to="/docs/dynamic-routes" className="group flex items-center gap-2 text-right text-slate-400 hover:text-white transition-colors">
                    <div>
                      <div className="text-xs text-slate-500">Next</div>
                      <div className="text-sm font-medium">Dynamic Routes</div>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

              </div>

              {/* Right-hand "On this page" sidebar */}
              <aside className="hidden xl:block w-56 shrink-0">
                <TableOfContents items={TOC_ITEMS} editUrl={EDIT_URL} />
              </aside>
            </div>
          </DocLayout>
          
        </div>
      </div>
    </div>
  )
}