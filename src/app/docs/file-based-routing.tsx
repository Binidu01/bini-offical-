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

// ────────────────────────────────────────────────────────────────────────────────
// Code Block Component
// ────────────────────────────────────────────────────────────────────────────────
function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  const [copied, setCopied] = React.useState(false)
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }

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
      <pre className={`bg-[#0a0a0a] border border-slate-700 ${filename ? 'rounded-t-none' : 'rounded-lg'} p-4 overflow-x-auto`}>
        <code className="text-sm font-mono text-slate-200">{code}</code>
      </pre>
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
            <div className="max-w-4xl">
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-bold text-white mb-2">File-Based Routing</h1>
                <p className="text-slate-400 text-sm mb-8">
                  Learn how special files like page.tsx, layout.tsx, and loading.tsx define route behavior in Bini.js.
                </p>
              </motion.div>

              {/* Overview */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <p className="text-slate-300 mb-6">
                  Bini.js uses special file conventions to define route behavior. Each file has a specific purpose and is automatically recognized by the router.
                </p>
              </motion.section>

              {/* Special Files Overview */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Special Files</h2>
                <Table 
                  headers={['File', 'Purpose']}
                  rows={[
                    ['page.tsx', 'Defines a public route — required to make a route accessible'],
                    ['layout.tsx', 'Shared UI that wraps pages and nested layouts'],
                    ['loading.tsx', 'Loading UI shown while page content streams'],
                    ['not-found.tsx', 'Custom 404 page for unmatched routes'],
                    ['hello.ts', 'API endpoint (in src/app/api/)'],
                  ]}
                />
                <p className="text-slate-300 mt-4">
                  Files must be placed in the correct location within <code className="text-cyan-400">src/app/</code> to work properly.
                </p>
              </motion.section>

              {/* page.tsx */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
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

              {/* layout.tsx */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
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
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
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

              {/* not-found.tsx */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
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

              {/* File Combinations */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">File Combinations</h2>
                <p className="text-slate-300 mb-4">
                  Special files can be combined in the same folder to create rich route behavior:
                </p>
                <CodeBlock 
                  code={`src/app/dashboard/
├── layout.tsx            ← Shared layout for all dashboard pages
├── loading.tsx           ← Loading UI for dashboard
├── page.tsx              ← Dashboard home
├── settings/
│   ├── page.tsx          ← Settings page (inherits layout and loading)
│   └── loading.tsx       ← Override loading UI just for settings
└── profile/
    ├── layout.tsx        ← Additional nested layout for profile
    └── page.tsx          ← Profile page`}
                />
                <Table 
                  headers={['Route', 'Files Used']}
                  rows={[
                    ['/dashboard', 'layout.tsx + loading.tsx + page.tsx'],
                    ['/dashboard/settings', 'layout.tsx + loading.tsx (from settings) + page.tsx'],
                    ['/dashboard/profile', 'layout.tsx + profile/layout.tsx + loading.tsx (from dashboard) + page.tsx'],
                  ]}
                />
              </motion.section>

              {/* File Priority */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">File Priority</h2>
                <p className="text-slate-300 mb-4">
                  When multiple files could apply to a route, they are resolved in this order (from outermost to innermost):
                </p>
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 mb-6">
                  <ol className="list-decimal list-inside space-y-2 text-slate-300">
                    <li>Root <code className="text-cyan-400">layout.tsx</code></li>
                    <li>Nested <code className="text-cyan-400">layout.tsx</code> files (from root to leaf)</li>
                    <li><code className="text-cyan-400">loading.tsx</code> (closest to the page)</li>
                    <li><code className="text-cyan-400">not-found.tsx</code> (if triggered)</li>
                    <li><code className="text-cyan-400">page.tsx</code></li>
                  </ol>
                </div>
              </motion.section>

              {/* Complete Example */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Complete Example</h2>
                <p className="text-slate-300 mb-4">
                  Here's a comprehensive file structure showing all special files:
                </p>
                <CodeBlock 
                  code={`src/app/
├── layout.tsx                 ← Root layout (required)
├── page.tsx                   → /
├── loading.tsx                ← Global loading UI
├── not-found.tsx              ← Global 404 page
├── about.tsx                  → /about (flat file page)
├── blog/
│   ├── layout.tsx             ← Blog layout
│   ├── page.tsx               → /blog
│   ├── loading.tsx            ← Blog loading UI
│   ├── [slug]/                ← Dynamic route
│   │   └── page.tsx           → /blog/:slug
│   └── _components/           ← Private folder (not routable)
│       └── PostCard.tsx
├── dashboard/
│   ├── layout.tsx             ← Dashboard layout
│   ├── page.tsx               → /dashboard
│   ├── loading.tsx            ← Dashboard loading UI
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
          </DocLayout>
          
        </div>
      </div>
    </div>
  )
}