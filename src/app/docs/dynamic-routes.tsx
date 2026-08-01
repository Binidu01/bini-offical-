// src/pages/docs/dynamic-routes/page.tsx
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
  { id: 'dynamic-segments', label: 'Dynamic Segments' },
  { id: 'multiple-parameters', label: 'Multiple Parameters' },
  { id: 'catch-all-segments', label: 'Catch-all Segments' },
  { id: 'optional-catch-all', label: 'Optional Catch-all Segments' },
  { id: 'dynamic-layouts', label: 'Dynamic Segments in Layouts' },
  { id: 'flat-file-dynamic', label: 'Flat File Dynamic Routes' },
  { id: 'route-priority', label: 'Route Priority' },
  { id: 'complete-example', label: 'Complete Example' },
]

const PAGE_TITLE = 'Dynamic Routes'
const PAGE_URL = 'https://bini.js.org/docs/dynamic-routes'
const EDIT_URL = 'https://github.com/Binidu01/bini-offical/edit/main/src/app/docs/dynamic-routes.tsx'

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
// Dynamic Routes Page
// ────────────────────────────────────────────────────────────────────────────────
export default function DynamicRoutesPage() {
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
                    <p className="text-slate-400 text-sm">Learn how to create dynamic routes with parameters, catch-all segments, and optional catch-all segments.</p>
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
                    Dynamic routes allow you to create pages that match a pattern rather than a static path. This is essential for pages like blog posts, product pages, and user profiles.
                  </p>
                </motion.section>

                {/* Dynamic Segments */}
                <motion.section id="dynamic-segments" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Dynamic Segments</h2>
                  <p className="text-slate-300 mb-4">
                    Create a dynamic segment by wrapping a folder or file name in square brackets: <code className="text-cyan-400">[name]</code>.
                  </p>
                  <CodeBlock 
                    code={`src/app/
├── blog/
│   └── [slug]/
│       └── page.tsx       → /blog/hello-world
│                           → /blog/getting-started
│                           → /blog/any-value
├── products/
│   └── [id]/
│       └── page.tsx       → /products/123
│                           → /products/abc-456
└── users/
    └── [userId]/
        └── page.tsx       → /users/john
                            → /users/mary`}
                  />
                  <p className="text-slate-300 mt-4">
                    Access the parameter value using <code className="text-cyan-400">useParams()</code>:
                  </p>
                  <CodeBlock 
                    code={`// src/app/blog/[slug]/page.tsx
export default function BlogPost() {
  const { slug } = useParams()
  
  return <h1>Post: {slug}</h1>
}`}
                    filename="app/blog/[slug]/page.tsx"
                  />
                </motion.section>

                {/* Multiple Parameters */}
                <motion.section id="multiple-parameters" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Multiple Parameters</h2>
                  <p className="text-slate-300 mb-4">
                    You can have multiple dynamic segments in a single route:
                  </p>
                  <CodeBlock 
                    code={`src/app/
└── blog/
    └── [category]/
        └── [slug]/
            └── page.tsx   → /blog/tech/hello-world
                            → /blog/lifestyle/travel-tips`}
                  />
                  <CodeBlock 
                    code={`// src/app/blog/[category]/[slug]/page.tsx
export default function BlogPost() {
  const { category, slug } = useParams()
  
  return (
    <div>
      <p>Category: {category}</p>
      <h1>Post: {slug}</h1>
    </div>
  )
}`}
                    filename="app/blog/[category]/[slug]/page.tsx"
                  />
                  <Table 
                    headers={['URL', 'params']}
                    rows={[
                      ['/blog/tech/hello-world', '{ category: "tech", slug: "hello-world" }'],
                      ['/blog/lifestyle/travel', '{ category: "lifestyle", slug: "travel" }'],
                    ]}
                  />
                </motion.section>

                {/* Catch-all Segments */}
                <motion.section id="catch-all-segments" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Catch-all Segments</h2>
                  <p className="text-slate-300 mb-4">
                    Use <code className="text-cyan-400">[...name]</code> to match any number of segments. The parameter becomes an array of the matched segments.
                  </p>
                  <CodeBlock 
                    code={`src/app/
└── docs/
    └── [...slug]/
        └── page.tsx       → /docs/getting-started
                            → /docs/api/reference
                            → /docs/guides/routing/basics`}
                  />
                  <CodeBlock 
                    code={`// src/app/docs/[...slug]/page.tsx
export default function DocsPage() {
  const { slug } = useParams()
  // slug is an array, e.g., ['api', 'reference']
  
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
                  <p className="text-slate-300 mt-4">
                    <strong className="text-white">Note:</strong> Catch-all segments have lower priority than static routes and dynamic single segments. For example, <code className="text-cyan-400">/blog/featured</code> will match a static route if it exists, falling back to the catch-all only if no more specific route matches.
                  </p>
                </motion.section>

                {/* Optional Catch-all Segments */}
                <motion.section id="optional-catch-all" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Optional Catch-all Segments</h2>
                  <p className="text-slate-300 mb-4">
                    Use <code className="text-cyan-400">[[...name]]</code> to make the catch-all optional. The route matches even without any segments, making it perfect for multi-level navigation like documentation or shop categories.
                  </p>
                  <CodeBlock 
                    code={`src/app/
└── shop/
    └── [[...slug]]/
        └── page.tsx       → /shop
                            → /shop/clothing
                            → /shop/clothing/shirts`}
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

                {/* Dynamic Segments in Layouts */}
                <motion.section id="dynamic-layouts" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Dynamic Segments in Layouts</h2>
                  <p className="text-slate-300 mb-4">
                    Layouts can also access dynamic parameters using <code className="text-cyan-400">useParams()</code>, which is auto-imported:
                  </p>
                  <CodeBlock 
                    code={`// src/app/blog/[slug]/layout.tsx
export default function BlogLayout() {
  const { slug } = useParams()
  
  return (
    <div>
      <header>Post: {slug}</header>
      <main><Outlet /></main>
    </div>
  )
}`}
                    filename="app/blog/[slug]/layout.tsx"
                  />
                  <p className="text-slate-300 mt-4">
                    This is useful for displaying contextual information in headers, sidebars, or breadcrumbs.
                  </p>
                </motion.section>

                {/* Flat File Dynamic Routes */}
                <motion.section id="flat-file-dynamic" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Flat File Dynamic Routes</h2>
                  <p className="text-slate-300 mb-4">
                    Dynamic routes can also be created as flat files without folders:
                  </p>
                  <CodeBlock 
                    code={`src/app/
├── blog/
│   └── [slug].tsx        → /blog/hello-world
├── products/
│   └── [id].tsx          → /products/123
└── users/
    └── [userId].tsx      → /users/john`}
                  />
                  <CodeBlock 
                    code={`// src/app/blog/[slug].tsx
export default function BlogPost() {
  const { slug } = useParams()
  return <h1>Post: {slug}</h1>
}`}
                    filename="app/blog/[slug].tsx"
                  />
                  <p className="text-slate-300 mt-4">
                    Flat file dynamic routes are especially useful for simpler pages where a folder structure would be unnecessary overhead.
                  </p>
                </motion.section>

                {/* Route Priority */}
                <motion.section id="route-priority" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Route Priority</h2>
                  <p className="text-slate-300 mb-4">
                    When multiple routes could match a URL, Bini.js resolves them in this order:
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
│   └── page.tsx           → /blog/anything-else (dynamic)
└── [...slug]/
    └── page.tsx           → /blog/a/b/c (catch-all)`}
                  />
                  <Table 
                    headers={['URL', 'Matched Route']}
                    rows={[
                      ['/blog/featured', 'featured/page.tsx (static)'],
                      ['/blog/hello-world', '[slug]/page.tsx (dynamic)'],
                      ['/blog/a/b/c', '[...slug]/page.tsx (catch-all)'],
                    ]}
                  />
                  <p className="text-slate-300 mt-4">
                    This ensures predictable routing behavior and prevents conflicts between different route types.
                  </p>
                </motion.section>

                {/* Complete Example */}
                <motion.section id="complete-example" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Complete Example</h2>
                  <p className="text-slate-300 mb-4">
                    Here is a comprehensive example showing all dynamic route patterns:
                  </p>
                  <CodeBlock 
                    code={`src/app/
├── blog/
│   ├── featured/
│   │   └── page.tsx           → /blog/featured (static)
│   ├── [slug]/
│   │   ├── layout.tsx         ← Layout for single post
│   │   └── page.tsx           → /blog/:slug (dynamic)
│   ├── [category]/
│   │   └── [slug]/
│   │       └── page.tsx       → /blog/:category/:slug (multiple dynamic)
│   └── [...slug]/
│       └── page.tsx           → /blog/a/b/c (catch-all)
├── docs/
│   └── [[...slug]]/
│       ├── layout.tsx         ← Layout for docs
│       └── page.tsx           → /docs (optional catch-all)
│                               → /docs/getting-started
└── products/
    ├── page.tsx               → /products
    ├── [id].tsx               → /products/:id (flat file)
    └── categories/
        └── [name]/
            └── page.tsx       → /products/categories/:name`}
                  />
                </motion.section>

                {/* Previous / Next Navigation */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                  <Link to="/docs/file-based-routing" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <div>
                      <div className="text-xs text-slate-500">Previous</div>
                      <div className="text-sm font-medium">File-Based Routing</div>
                    </div>
                  </Link>
                  <Link to="/docs/catch-all-routes" className="group flex items-center gap-2 text-right text-slate-400 hover:text-white transition-colors">
                    <div>
                      <div className="text-xs text-slate-500">Next</div>
                      <div className="text-sm font-medium">Catch-All Routes</div>
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