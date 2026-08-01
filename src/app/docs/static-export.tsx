// src/pages/docs/static-export/page.tsx
import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
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
  { id: 'overview', label: 'Overview' },
  { id: 'installation', label: 'Installation' },
  { id: 'setup', label: 'Setup' },
  { id: 'usage', label: 'Usage' },
  { id: 'export-output', label: 'Export Output' },
  { id: '404-handling', label: '404 Handling' },
  { id: 'options', label: 'Options' },
  { id: 'files-cleaned', label: 'Files Cleaned After Export' },
  { id: 'static-hosts', label: 'Works on Any Static Host' },
  { id: 'complete-example', label: 'Complete Example' },
]

const PAGE_TITLE = 'Static Export'
const PAGE_URL = 'https://bini.js.org/docs/static-export'
const EDIT_URL = 'https://github.com/Binidu01/bini-offical/edit/main/src/app/docs/static-export.tsx'

// ────────────────────────────────────────────────────────────────────────────────
// Code Block Component
// ────────────────────────────────────────────────────────────────────────────────
function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  const [copied, setCopied] = React.useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
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
function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
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
// Note Component
// ────────────────────────────────────────────────────────────────────────────────
function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 my-6">
      <div className="text-sm text-slate-300 [&>strong]:text-white [&>code]:text-cyan-400 [&>code]:bg-slate-800 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded">
        {children}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Static Export Page
// ────────────────────────────────────────────────────────────────────────────────
export default function StaticExportPage() {
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
                    <p className="text-slate-400 text-sm">Export your Bini.js app as static HTML files with <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">bini-export</code>, ready for any static host.</p>
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
                <motion.section id="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="scroll-mt-24">
                  <p className="text-slate-300 mb-6">
                    <code className="text-cyan-400">bini-export</code> pre-renders every static route to full HTML using headless browser prerendering, generates the right <code className="text-cyan-400">404.html</code>, and strips all platform server files — leaving <code className="text-cyan-400">dist/</code> ready for GitHub Pages, S3, Firebase, Surge, and any other fully static host.
                  </p>
                  <Note>
                    <strong>Web target only.</strong> Static export applies to the Node.js/web target. Desktop and mobile builds (Windows, macOS, Linux, Android, iOS) don't use <code>bini-export</code> — they package the same routes into a native binary instead.
                  </Note>
                </motion.section>

                {/* Installation */}
                <motion.section id="installation" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Installation</h2>
                  <CodeBlock code={`npm install -D bini-export`} />
                  <p className="text-slate-400 text-sm mt-2">
                    <code className="text-cyan-400">puppeteer</code> is installed automatically as a dependency for headless browser pre-rendering.
                  </p>
                </motion.section>

                {/* Setup */}
                <motion.section id="setup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Setup</h2>

                  <h3 className="text-lg font-semibold text-white mt-2 mb-3">1. vite.config.ts</h3>
                  <CodeBlock
                    filename="vite.config.ts"
                    code={`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { biniroute } from 'bini-router'
import { biniExport } from 'bini-export'

export default defineConfig({
  base: '/your-repo-name/', // 👈 see note below
  plugins: [
    react(),
    ...biniroute(),
    biniExport({
      ssg: true,              // Enable true SSG (default: true)
      waitForSelector: '#root', // Wait for selector before capturing HTML (default: '#root')
      renderTimeoutMs: 15000,  // Max time per route in ms (default: 15000)
    }),
  ],
})`}
                  />
                  <Note>
                    <code>biniroute()</code> returns an array of plugins — spread it into <code>plugins</code> alongside <code>biniExport()</code>. The export target is controlled by the <code>--mode export</code> build flag.
                  </Note>

                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Do you need base?</h3>
                  <Table
                    headers={['Situation', 'base']}
                    rows={[
                      ['GitHub Pages without a custom domain', <code className="text-cyan-400">'/your-repo-name/'</code>],
                      ['GitHub Pages with a custom domain', <span className="text-slate-400">not needed — remove it</span>],
                      ['S3, Firebase, Surge, or any other static host', <span className="text-slate-400">not needed — remove it</span>],
                    ]}
                  />
                  <Note>
                    If you use the function form of <code>defineConfig</code>, <code>base</code> goes at the top level of the returned object — the same level as <code>plugins</code> and <code>build</code>.
                  </Note>
                  <CodeBlock
                    code={`export default defineConfig(({ command, mode }) => {
  return {
    base: '/your-repo-name/', // top-level
    plugins: [ ... ],
    build: { ... },
  }
})`}
                  />

                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">2. package.json</h3>
                  <CodeBlock
                    filename="package.json"
                    code={`{
  "scripts": {
    "dev": "vite --host --open",
    "build": "vite build",
    "export": "vite build --mode export",
    "preview": "vite preview --host --open"
  }
}`}
                  />
                </motion.section>

                {/* Usage */}
                <motion.section id="usage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Usage</h2>
                  <Table
                    headers={['Command', 'When to use']}
                    rows={[
                      [<code className="text-cyan-400">npm run build</code>, 'Node servers, Netlify, Vercel, Cloudflare — any platform with server support'],
                      [<code className="text-cyan-400">npm run export</code>, 'Fully static hosts — GitHub Pages, S3, Firebase, Surge, etc.'],
                    ]}
                  />
                </motion.section>

                {/* Export Output */}
                <motion.section id="export-output" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Export Output</h2>
                  <CodeBlock
                    code={`dist/
├── index.html          ✅ Fully rendered home page
├── 404.html            ✅ Redirect handler
├── about/
│   └── index.html      ✅ Fully rendered about page
├── docs/
│   ├── index.html      ✅ Fully rendered docs landing
│   └── api-cors/
│       └── index.html  ✅ Fully rendered nested page
├── js/                 ✅ Hydration scripts (preserved)
├── css/                ✅ Styles
└── assets/             ✅ Images, fonts, etc.`}
                  />
                </motion.section>

                {/* 404 Handling */}
                <motion.section id="404-handling" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">404 Handling</h2>
                  <Table
                    headers={['Situation', 'What gets written to 404.html']}
                    rows={[
                      [
                        <span><code className="text-cyan-400">src/app/not-found.tsx</code> or <code className="text-cyan-400">src/app/not-found.jsx</code></span>,
                        <span>Copy of <code className="text-cyan-400">index.html</code> — React Router renders your custom not-found page</span>
                      ],
                      ['No custom not-found file', 'A redirect script that saves the original URL and sends the user to the repo root, where the SPA restores it automatically'],
                    ]}
                  />
                </motion.section>

                {/* Options */}
                <motion.section id="options" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Options</h2>
                  <CodeBlock
                    code={`biniExport({
  // Vite mode that activates this plugin
  mode?: string; // @default 'export'
  
  // Write dist/404.html
  copy404?: boolean; // @default true
  
  // Enable true SSG via headless-browser prerendering
  ssg?: boolean; // @default true
  
  // Routes to pre-render (auto-detected if not specified)
  routes?: string[];
  
  // Selector that must exist before capturing HTML
  waitForSelector?: string; // @default '#root'
  
  // Max time per route in ms
  renderTimeoutMs?: number; // @default 15000
  
  // Custom Puppeteer launch options
  puppeteerOptions?: {
    headless?: boolean;
    args?: string[];
    executablePath?: string;
    timeout?: number;
  };
})`}
                  />
                </motion.section>

                {/* Files Cleaned After Export */}
                <motion.section id="files-cleaned" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Files Cleaned After Export</h2>
                  <p className="text-slate-300 mb-4">
                    Export strips out server entry files left over from other hosting adapters, since a static host has nothing to run them.
                  </p>
                  <Table
                    headers={['Platform', 'File(s) removed']}
                    rows={[
                      ['Netlify', <code className="text-cyan-400">netlify/edge-functions/api.ts · api.js</code>],
                      ['Cloudflare Workers', <code className="text-cyan-400">worker.ts · worker.js</code>],
                      ['Node / Deno / Bun', <code className="text-cyan-400">server/index.ts · server/index.js</code>],
                      ['Vercel', <code className="text-cyan-400">api/index.ts · api/index.js</code>],
                    ]}
                  />
                  <p className="text-slate-300 mt-4">
                    Empty parent directories are pruned automatically.
                  </p>
                </motion.section>

                {/* Works on Any Fully Static Host */}
                <motion.section id="static-hosts" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Works on Any Fully Static Host</h2>
                  <Table
                    headers={['Host', 'Static routes', 'Dynamic routes']}
                    rows={[
                      ['GitHub Pages', <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> pre-rendered</span>, <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> via 404.html</span>],
                      ['AWS S3 + CloudFront', <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> pre-rendered</span>, <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> set error page to 404.html</span>],
                      ['Firebase Hosting', <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> pre-rendered</span>, <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> via 404.html</span>],
                      ['Surge.sh', <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> pre-rendered</span>, <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> via 404.html</span>],
                    ]}
                  />
                </motion.section>

                {/* Complete Example */}
                <motion.section id="complete-example" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Complete Example</h2>
                  <p className="text-slate-300 mb-4">
                    A full setup for deploying to GitHub Pages with true SSG:
                  </p>
                  <CodeBlock
                    filename="vite.config.ts"
                    code={`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { biniroute } from 'bini-router'
import { biniExport } from 'bini-export'

export default defineConfig({
  base: '/my-app/',
  plugins: [
    react(),
    ...biniroute(),
    biniExport({
      ssg: true,
      waitForSelector: '#root',
      renderTimeoutMs: 15000,
    }),
  ],
})`}
                  />
                  <CodeBlock
                    filename="package.json"
                    code={`{
  "scripts": {
    "dev": "vite --host --open",
    "build": "vite build",
    "export": "vite build --mode export",
    "preview": "vite preview --host --open"
  }
}`}
                  />
                  <p className="text-slate-300 mt-4">
                    Run <code className="text-cyan-400">npm run export</code>, then push the contents of <code className="text-cyan-400">dist/</code> to your GitHub Pages branch (or upload them through the GitHub Pages UI) — this step is manual and isn't wired into <code className="text-cyan-400">npm run deploy</code>.
                  </p>
                </motion.section>

                {/* Previous / Next Navigation */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                  <Link to="/docs/production-server" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <div>
                      <div className="text-xs text-slate-500">Previous</div>
                      <div className="text-sm font-medium">Production Server</div>
                    </div>
                  </Link>
                  <Link to="/docs/hosting" className="group flex items-center gap-2 text-right text-slate-400 hover:text-white transition-colors">
                    <div>
                      <div className="text-xs text-slate-500">Next</div>
                      <div className="text-sm font-medium">Hosting Providers</div>
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