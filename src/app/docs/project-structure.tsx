// src/pages/docs/project-structure/page.tsx
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
// Project Structure Page
// ────────────────────────────────────────────────────────────────────────────────
export default function ProjectStructurePage() {
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
                <h1 className="text-4xl font-bold text-white mb-2">Project Structure</h1>
                <p className="text-slate-400 text-sm mb-8">
                  Learn the folder and file conventions in Bini.js, and how to organize your project.
                </p>
              </motion.div>

              {/* Overview */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Folder and file conventions</h2>
                <p className="text-slate-300 mb-4">
                  This page provides an overview of all the folder and file conventions in Bini.js, and recommendations for organizing your project.
                </p>
              </motion.section>

              {/* Top-level folders */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h3 className="text-lg font-semibold text-white mb-3">Top-level folders</h3>
                <p className="text-slate-300 mb-4">
                  Top-level folders are used to organize your application's code and static assets.
                </p>
                <Table 
                  headers={['Folder', 'Purpose']}
                  rows={[
                    ['src/', 'Application source folder'],
                    ['src/app', 'App Router — file-based routing and layouts'],
                    ['public', 'Static assets to be served at root URL'],
                    ['dist/', 'Production build output (generated)'],
                  ]}
                />
              </motion.section>

              {/* Top-level files */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h3 className="text-lg font-semibold text-white mb-3">Top-level files</h3>
                <p className="text-slate-300 mb-4">
                  Top-level files are used to configure your application, manage dependencies, and define environment variables.
                </p>
                <Table 
                  headers={['File', 'Purpose']}
                  rows={[
                    ['vite.config.ts', 'Configuration file for Vite and Bini.js'],
                    ['package.json', 'Project dependencies and scripts'],
                    ['index.html', 'HTML entry point — contains <html> and <body> tags'],
                    ['.env', 'Environment variables (should not be tracked)'],
                    ['.env.local', 'Local environment variables (should not be tracked)'],
                    ['.env.production', 'Production environment variables'],
                    ['.env.development', 'Development environment variables'],
                    ['.oxlintrc.json', 'Configuration file for Oxlint'],
                    ['.oxfmtrc.json', 'Configuration file for Oxfmt'],
                    ['.gitignore', 'Git files and folders to ignore'],
                    ['tsconfig.json', 'Configuration file for TypeScript'],
                    ['jsconfig.json', 'Configuration file for JavaScript'],
                  ]}
                />
              </motion.section>

              {/* Routing Files */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h3 className="text-lg font-semibold text-white mb-3">Routing Files</h3>
                <p className="text-slate-300 mb-4">
                  Add <code className="text-cyan-400">page</code> to expose a route, <code className="text-cyan-400">layout</code> for shared UI such as header, nav, or footer, <code className="text-cyan-400">loading</code> for skeletons, and <code className="text-cyan-400">not-found</code> for custom 404 pages.
                </p>
                <Table 
                  headers={['File', 'Extensions', 'Purpose']}
                  rows={[
                    ['layout', '.js .jsx .tsx', 'Shared UI that wraps pages and nested layouts'],
                    ['page', '.js .jsx .tsx', 'A page — defines a public route'],
                    ['loading', '.js .jsx .tsx', 'Loading UI (Suspense fallback)'],
                    ['not-found', '.js .jsx .tsx', 'Custom 404 UI'],
                    ['hello.ts', '.js .ts', 'API endpoint in src/app/api/'],
                  ]}
                />
                <p className="text-slate-400 text-sm mt-2">
                  <strong className="text-white">Note:</strong> The <code className="text-cyan-400">&lt;html&gt;</code> and <code className="text-cyan-400">&lt;body&gt;</code> tags are defined in <code className="text-cyan-400">index.html</code>, not in layouts.
                </p>
              </motion.section>

              {/* Complete project structure */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3 className="text-lg font-semibold text-white mb-3">Complete project structure</h3>
                <CodeBlock 
                  code={`my-app/
├── src/                   ← Application source folder
│   ├── app/
│   │   ├── api/           ← API route handlers
│   │   │   └── hello.ts   → /api/hello
│   │   ├── layout.tsx     ← Root layout (returns <Outlet />)
│   │   ├── page.tsx       ← Home page (/)
│   │   ├── loading.tsx    ← Custom loading UI (optional)
│   │   ├── not-found.tsx  ← Custom 404 page (optional)
│   │   └── globals.css    ← Global styles
│   ├── main.tsx           ← React entry point
│   └── App.tsx            ← Auto-generated — do not edit
├── public/                ← Static assets
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── og-image.png
├── index.html             ← HTML entry point with <html> and <body>
├── vite.config.ts         ← Vite configuration
├── .oxlintrc.json         ← Oxlint configuration
├── .oxfmtrc.json          ← Oxfmt configuration
└── package.json`}
                />
                <p className="text-slate-400 text-sm mt-2 mb-8">
                  <strong className="text-white">Note:</strong> <code className="text-cyan-400">App.tsx</code> is auto-generated by bini-router. Never edit this file directly.
                </p>
              </motion.section>

              {/* Nested routes */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <h3 className="text-lg font-semibold text-white mb-3">Nested routes</h3>
                <p className="text-slate-300 mb-4">
                  Folders define URL segments. Nesting folders nests segments. Layouts at any level wrap their child segments. A route becomes public when a <code className="text-cyan-400">page</code> file exists.
                </p>
                <Table 
                  headers={['Path', 'URL pattern', 'Notes']}
                  rows={[
                    ['src/app/layout.tsx', '—', 'Root layout wraps all routes'],
                    ['src/app/blog/layout.tsx', '—', 'Wraps /blog and descendants'],
                    ['src/app/page.tsx', '/', 'Public route'],
                    ['src/app/about/page.tsx', '/about', 'Public route'],
                    ['src/app/blog/page.tsx', '/blog', 'Public route'],
                    ['src/app/blog/authors/page.tsx', '/blog/authors', 'Public route'],
                  ]}
                />
              </motion.section>

              {/* Dynamic routes */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h3 className="text-lg font-semibold text-white mb-3">Dynamic routes</h3>
                <p className="text-slate-300 mb-4">
                  Parameterize segments with square brackets. Use <code className="text-cyan-400">[segment]</code> for a single param, <code className="text-cyan-400">[...segment]</code> for catch‑all, and <code className="text-cyan-400">[[...segment]]</code> for optional catch‑all. Access values via the <code className="text-cyan-400">useParams()</code> hook.
                </p>
                <Table 
                  headers={['Path', 'URL pattern']}
                  rows={[
                    ['src/app/blog/[slug]/page.tsx', '/blog/my-first-post'],
                    ['src/app/shop/[...slug]/page.tsx', '/shop/clothing, /shop/clothing/shirts'],
                    ['src/app/docs/[[...slug]]/page.tsx', '/docs, /docs/layouts, /docs/api/use-router'],
                  ]}
                />
              </motion.section>

              {/* Route Groups and Private Folders */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <h3 className="text-lg font-semibold text-white mb-3">Route groups and private folders</h3>
                <p className="text-slate-300 mb-4">
                  Organize code without changing URLs with route groups <code className="text-cyan-400">(group)</code>, and colocate non-routable files with private folders <code className="text-cyan-400">_folder</code>.
                </p>
                <Table 
                  headers={['Path', 'URL pattern', 'Notes']}
                  rows={[
                    ['src/app/(marketing)/page.tsx', '/', 'Group omitted from URL'],
                    ['src/app/(shop)/cart/page.tsx', '/cart', 'Share layouts within (shop)'],
                    ['src/app/blog/_components/Post.tsx', '—', 'Not routable; safe place for UI utilities'],
                    ['src/app/blog/_lib/data.ts', '—', 'Not routable; safe place for utils'],
                  ]}
                />
              </motion.section>

              {/* API Routes */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h3 className="text-lg font-semibold text-white mb-3">API Routes</h3>
                <p className="text-slate-300 mb-4">
                  Create API endpoints in <code className="text-cyan-400">src/app/api/</code>. Files export a handler function or Hono app.
                </p>
                <Table 
                  headers={['Path', 'URL pattern', 'Notes']}
                  rows={[
                    ['src/app/api/hello.ts', '/api/hello', 'Static API endpoint'],
                    ['src/app/api/users/[id].ts', '/api/users/123', 'Dynamic API endpoint'],
                    ['src/app/api/posts/[...slug].ts', '/api/posts/2024/hello', 'Catch-all API endpoint'],
                  ]}
                />
                <CodeBlock 
                  code={`// src/app/api/users/[id].ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/users/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ id, name: \`User \${id}\` })
})

export default app`}
                  filename="app/api/users/[id].ts"
                />
              </motion.section>

              {/* Component Hierarchy */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <h3 className="text-lg font-semibold text-white mb-3">Component hierarchy</h3>
                <p className="text-slate-300 mb-4">
                  The components defined in special files are rendered in a specific hierarchy:
                </p>
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 mb-6">
                  <ol className="list-decimal list-inside space-y-2 text-slate-300">
                    <li><code className="text-cyan-400">layout.tsx</code> — wraps all children</li>
                    <li><code className="text-cyan-400">loading.tsx</code> — React suspense boundary (if present)</li>
                    <li><code className="text-cyan-400">not-found.tsx</code> — 404 UI (only at root level)</li>
                    <li><code className="text-cyan-400">page.tsx</code> or nested <code className="text-cyan-400">layout.tsx</code></li>
                  </ol>
                </div>
                <p className="text-slate-300">
                  The components are rendered recursively in nested routes, meaning the components of a route segment will be nested <strong className="text-white">inside</strong> the components of its parent segment.
                </p>
              </motion.section>

              {/* Colocation */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <h3 className="text-lg font-semibold text-white mt-8 mb-3">Colocation</h3>
                <p className="text-slate-300 mb-4">
                  In the <code className="text-cyan-400">src/app</code> directory, nested folders define route structure. Each folder represents a route segment that maps to a URL path.
                </p>
                <p className="text-slate-300 mb-4">
                  However, even though route structure is defined through folders, a route is <strong className="text-white">not publicly accessible</strong> until a <code className="text-cyan-400">page.tsx</code> file is added to a route segment.
                </p>
                <p className="text-slate-300">
                  This means that <strong className="text-white">project files can be safely colocated</strong> inside route segments in the <code className="text-cyan-400">app</code> directory without accidentally being routable.
                </p>
              </motion.section>

              {/* Previous / Next Navigation */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                <Link to="/docs/installation" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-500">Previous</div>
                    <div className="text-sm font-medium">Installation</div>
                  </div>
                </Link>
                <Link to="/docs/layouts-and-pages" className="group flex items-center gap-2 text-right text-slate-400 hover:text-white transition-colors">
                  <div>
                    <div className="text-xs text-slate-500">Next</div>
                    <div className="text-sm font-medium">Layouts and Pages</div>
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