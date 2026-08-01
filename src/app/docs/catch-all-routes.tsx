// src/pages/docs/catch-all-routes/page.tsx
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
  { id: 'what-are-catch-all-routes', label: 'What are Catch-All Routes?' },
  { id: 'basic-usage', label: 'Basic Usage' },
  { id: 'accessing-parameters', label: 'Accessing Parameters' },
  { id: 'nested-catch-all', label: 'Nested Catch-All Routes' },
  { id: 'optional-catch-all', label: 'Optional Catch-All Routes' },
  { id: 'file-based-catch-all', label: 'File-Based Catch-All Routes' },
  { id: 'route-priority', label: 'Route Priority' },
  { id: 'use-cases', label: 'Use Cases' },
  { id: 'complete-example', label: 'Complete Example' },
]

const PAGE_TITLE = 'Catch-All Routes'
const PAGE_URL = 'https://bini.js.org/docs/catch-all-routes'
const EDIT_URL = 'https://github.com/Binidu01/bini-offical/edit/main/src/app/docs/catch-all-routes.tsx'

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
// Catch-All Routes Page
// ────────────────────────────────────────────────────────────────────────────────
export default function CatchAllRoutesPage() {
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
                    <p className="text-slate-400 text-sm">Learn how to use catch-all routes to match multiple URL segments in Bini.js.</p>
                  </div>
                  <div className="shrink-0 pt-2 hidden sm:block">
                    <CopyPageButton pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} />
                  </div>
                </motion.div>
                {/* Copy button on small screens */}
                <div className="sm:hidden mb-8">
                  <CopyPageButton pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} />
                </div>

                {/* What are Catch-All Routes? */}
                <motion.section id="what-are-catch-all-routes" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">What are Catch-All Routes?</h2>
                  <p className="text-slate-300 mb-4">
                    Catch-all routes allow you to match multiple URL segments in a single route. They are defined using the <code className="text-cyan-400">[...name]</code> syntax, where the parameter becomes an array of the matched segments.
                  </p>
                  <p className="text-slate-300 mb-4">
                    This is useful for creating flexible routing patterns like documentation pages, nested categories, or any URL structure with variable depth.
                  </p>
                  <CodeBlock 
                    code={`src/app/
└── docs/
    └── [...slug]/
        └── page.tsx       → /docs/getting-started
                            → /docs/api/reference
                            → /docs/guides/routing/basics`}
                  />
                </motion.section>

                {/* Basic Usage */}
                <motion.section id="basic-usage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Basic Usage</h2>
                  <p className="text-slate-300 mb-4">
                    Create a catch-all route by naming a folder or file with square brackets and three dots: <code className="text-cyan-400">[...name]</code>.
                  </p>
                  <CodeBlock 
                    code={`src/app/
├── blog/
│   └── [...slug]/
│       └── page.tsx       → /blog/a/b/c
│                           → /blog/2024/01/hello-world
├── products/
│   └── [...path]/
│       └── page.tsx       → /products/electronics/phones
│                           → /products/clothing/men/shirts
└── users/
    └── [...ids]/
        └── page.tsx       → /users/1/2/3`}
                  />
                  <p className="text-slate-300 mt-4">
                    The route will match any URL that starts with the parent path and has at least one segment.
                  </p>
                </motion.section>

                {/* Accessing Parameters */}
                <motion.section id="accessing-parameters" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Accessing Parameters</h2>
                  <p className="text-slate-300 mb-4">
                    Use <code className="text-cyan-400">useParams()</code> (auto-imported) to access the catch-all parameter as an array:
                  </p>
                  <CodeBlock 
                    code={`// src/app/docs/[...slug]/page.tsx
export default function DocsPage() {
  const { slug } = useParams()
  // slug is an array of the URL segments
  
  return (
    <div>
      <h1>Documentation</h1>
      <p>Path: {slug?.join(' / ')}</p>
    </div>
  )
}`}
                    filename="app/docs/[...slug]/page.tsx"
                  />
                  <Table 
                    headers={['URL', 'slug value']}
                    rows={[
                      ['/docs/getting-started', "['getting-started']"],
                      ['/docs/api/reference', "['api', 'reference']"],
                      ['/docs/guides/routing/basics', "['guides', 'routing', 'basics']"],
                    ]}
                  />
                </motion.section>

                {/* Nested Catch-All Routes */}
                <motion.section id="nested-catch-all" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Nested Catch-All Routes</h2>
                  <p className="text-slate-300 mb-4">
                    Catch-all routes can be combined with other dynamic and static segments:
                  </p>
                  <CodeBlock 
                    code={`src/app/
├── blog/
│   ├── featured/
│   │   └── page.tsx       → /blog/featured (static - highest priority)
│   └── [...slug]/
│       └── page.tsx       → /blog/a/b/c (catch-all)
├── products/
│   └── [category]/
│       └── [...slug]/
│           └── page.tsx   → /products/electronics/phones/iphone
│                           → /products/clothing/men/shirts`}
                  />
                  <CodeBlock 
                    code={`// src/app/products/[category]/[...slug]/page.tsx
export default function ProductPage() {
  const { category, slug } = useParams()
  
  return (
    <div>
      <h1>Category: {category}</h1>
      <p>Path: {slug?.join(' / ')}</p>
    </div>
  )
}`}
                    filename="app/products/[category]/[...slug]/page.tsx"
                  />
                </motion.section>

                {/* Optional Catch-All Routes */}
                <motion.section id="optional-catch-all" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Optional Catch-All Routes</h2>
                  <p className="text-slate-300 mb-4">
                    Use <code className="text-cyan-400">[[...name]]</code> to make the catch-all optional. The route will match both the parent path and any nested paths.
                  </p>
                  <CodeBlock 
                    code={`src/app/
├── shop/
│   └── [[...slug]]/
│       └── page.tsx       → /shop
│                           → /shop/clothing
│                           → /shop/clothing/shirts
└── docs/
    └── [[...path]]/
        └── page.tsx       → /docs
                            → /docs/getting-started
                            → /docs/api/reference`}
                  />
                  <CodeBlock 
                    code={`// src/app/shop/[[...slug]]/page.tsx
export default function ShopPage() {
  const { slug } = useParams()
  
  if (!slug) {
    return <h1>Shop Home</h1>
  }
  
  return <h1>Category: {slug.join(' / ')}</h1>
}`}
                    filename="app/shop/[[...slug]]/page.tsx"
                  />
                  <Table 
                    headers={['URL', 'slug value']}
                    rows={[
                      ['/shop', 'undefined'],
                      ['/shop/clothing', "['clothing']"],
                      ['/shop/clothing/shirts', "['clothing', 'shirts']"],
                    ]}
                  />
                </motion.section>

                {/* File-Based Catch-All Routes */}
                <motion.section id="file-based-catch-all" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">File-Based Catch-All Routes</h2>
                  <p className="text-slate-300 mb-4">
                    Catch-all routes can also be defined as flat files without folders:
                  </p>
                  <CodeBlock 
                    code={`src/app/
├── docs/
│   └── [...slug].tsx      → /docs/getting-started
│                           → /docs/api/reference
├── products/
│   └── [...path].tsx      → /products/electronics/phones
│                           → /products/clothing/men
└── blog/
    └── [...slug].tsx      → /blog/2024/01/hello-world`}
                  />
                  <CodeBlock 
                    code={`// src/app/blog/[...slug].tsx
export default function BlogArchive() {
  const { slug } = useParams()
  
  return (
    <div>
      <h1>Blog Archive</h1>
      <p>Path: {slug?.join(' / ')}</p>
    </div>
  )
}`}
                    filename="app/blog/[...slug].tsx"
                  />
                </motion.section>

                {/* Route Priority */}
                <motion.section id="route-priority" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Route Priority</h2>
                  <p className="text-slate-300 mb-4">
                    Catch-all routes have lower priority than static routes and dynamic single segments. The router resolves matches in this order:
                  </p>
                  <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 mb-6">
                    <ol className="list-decimal list-inside space-y-2 text-slate-300">
                      <li><strong className="text-white">Static routes</strong> — exact matches</li>
                      <li><strong className="text-white">Dynamic single segments</strong> — <code className="text-cyan-400">[slug]</code></li>
                      <li><strong className="text-white">Catch-all segments</strong> — <code className="text-cyan-400">[...slug]</code></li>
                      <li><strong className="text-white">Optional catch-all segments</strong> — <code className="text-cyan-400">[[...slug]]</code></li>
                    </ol>
                  </div>
                  <p className="text-slate-300 mb-4">
                    Example with overlapping routes:
                  </p>
                  <CodeBlock 
                    code={`src/app/blog/
├── featured/
│   └── page.tsx           → /blog/featured (static - highest priority)
├── [slug]/
│   └── page.tsx           → /blog/hello-world (dynamic)
└── [...slug]/
    └── page.tsx           → /blog/2024/01/hello-world (catch-all)`}
                  />
                  <Table 
                    headers={['URL', 'Matched Route']}
                    rows={[
                      ['/blog/featured', 'featured/page.tsx (static)'],
                      ['/blog/hello-world', '[slug]/page.tsx (dynamic)'],
                      ['/blog/2024/01/hello-world', '[...slug]/page.tsx (catch-all)'],
                    ]}
                  />
                </motion.section>

                {/* Use Cases */}
                <motion.section id="use-cases" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Use Cases</h2>
                  <p className="text-slate-300 mb-4">
                    Catch-all routes are ideal for:
                  </p>
                  <ul className="space-y-2 text-slate-300 mb-4 list-disc list-inside">
                    <li><strong className="text-white">Documentation pages</strong> — Multi-level documentation with variable depth</li>
                    <li><strong className="text-white">E-commerce categories</strong> — Nested category structures like <code className="text-cyan-400">/products/electronics/phones/iphone</code></li>
                    <li><strong className="text-white">Blog archives</strong> — Date-based archives like <code className="text-cyan-400">/blog/2024/01/hello-world</code></li>
                    <li><strong className="text-white">CMS content</strong> — Content pages with flexible URL structures</li>
                    <li><strong className="text-white">Multi-language sites</strong> — Language prefixes with variable paths like <code className="text-cyan-400">/en/docs/getting-started</code></li>
                    <li><strong className="text-white">API versioning</strong> — API routes with version segments like <code className="text-cyan-400">/api/v1/users/123</code></li>
                  </ul>
                </motion.section>

                {/* Complete Example */}
                <motion.section id="complete-example" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Complete Example</h2>
                  <p className="text-slate-300 mb-4">
                    Here is a comprehensive example showing all catch-all route patterns:
                  </p>
                  <CodeBlock 
                    code={`src/app/
├── blog/
│   ├── featured/
│   │   └── page.tsx           → /blog/featured (static)
│   ├── [slug]/
│   │   └── page.tsx           → /blog/:slug (dynamic)
│   └── [...slug]/
│       └── page.tsx           → /blog/2024/01/hello-world (catch-all)
├── docs/
│   └── [[...slug]]/
│       ├── layout.tsx         ← Layout for docs
│       └── page.tsx           → /docs (optional catch-all)
│                               → /docs/getting-started
├── products/
│   └── [category]/
│       └── [...slug]/
│           └── page.tsx       → /products/electronics/phones/iphone
├── shop/
│   └── [[...slug]]/
│       └── page.tsx           → /shop (optional catch-all)
│                               → /shop/clothing
│                               → /shop/clothing/shirts
└── api/
    └── v1/
        └── [...path].ts       → /api/v1/users/123 (flat file catch-all)`}
                  />
                </motion.section>

                {/* Previous / Next Navigation */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                  <Link to="/docs/dynamic-routes" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <div>
                      <div className="text-xs text-slate-500">Previous</div>
                      <div className="text-sm font-medium">Dynamic Routes</div>
                    </div>
                  </Link>
                  <Link to="/docs/mdx-markdown" className="group flex items-center gap-2 text-right text-slate-400 hover:text-white transition-colors">
                    <div>
                      <div className="text-xs text-slate-500">Next</div>
                      <div className="text-sm font-medium">MDX and Markdown</div>
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