// src/pages/docs/static-export/page.tsx
import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Info,
  Lightbulb,
  CheckCircle,
  XCircle,
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
// Callout Component
// ────────────────────────────────────────────────────────────────────────────────
function Callout({ type, children }: { type: 'info' | 'warning' | 'tip'; children: React.ReactNode }) {
  const styles = {
    info: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', color: 'text-cyan-400', icon: Info },
    warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', color: 'text-amber-400', icon: AlertTriangle },
    tip: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', color: 'text-purple-400', icon: Lightbulb },
  }
  const style = styles[type]
  const Icon = style.icon

  return (
    <div className={`p-4 rounded-lg ${style.bg} border ${style.border} my-6`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-4 h-4 ${style.color}`} />
        <p className={`text-sm font-medium ${style.color}`}>
          {type === 'info' ? 'Note' : type === 'warning' ? 'Warning' : 'Tip'}
        </p>
      </div>
      <div className="text-sm text-slate-300 [&>strong]:text-white [&>code]:text-cyan-400 [&>code]:bg-slate-800 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded">{children}</div>
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
            <div className="max-w-4xl">
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-bold text-white mb-2">Static Export</h1>
                <p className="text-slate-400 text-sm mb-8">
                  Export your Bini.js app as static HTML files for deployment to any static host.
                </p>
              </motion.div>

              {/* Overview */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <p className="text-slate-300 mb-6">
                  <code className="text-cyan-400">bini-export</code> pre-renders every static route, generates the right <code className="text-cyan-400">404.html</code>, and strips all platform server files — leaving <code className="text-cyan-400">dist/</code> ready for GitHub Pages, S3, Firebase, Surge, and any other fully static host.
                </p>
              </motion.section>

              {/* Install */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Install</h2>
                <CodeBlock 
                  code={`npm install -D bini-export`}
                />
              </motion.section>

              {/* Setup */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Setup</h2>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">1. vite.config.ts</h3>
                <CodeBlock 
                  code={`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { biniroute } from 'bini-router'
import { biniExport } from 'bini-export'

export default defineConfig({
  base: '/your-repo-name/', // 👈 See note below
  plugins: [
    react(),
    biniroute({ platform: 'node' }),
    biniExport(),
  ],
})`}
                  filename="vite.config.ts"
                />
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">Do you need base?</h3>
                <Table 
                  headers={['Situation', 'base']}
                  rows={[
                    ['GitHub Pages without a custom domain', <code className="text-cyan-400">'/your-repo-name/'</code>],
                    ['GitHub Pages with a custom domain', <span className="text-slate-400">not needed — remove it</span>],
                    ['S3, Firebase, Surge, or any other static host', <span className="text-slate-400">not needed — remove it</span>],
                  ]}
                />
                <Callout type="warning">
                  If you use the function form of <code>defineConfig</code>, <code>base</code> goes at the top level of the returned object, same level as <code>plugins</code> and <code>build</code>.
                </Callout>
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
                  code={`{
  "scripts": {
    "dev": "vite --host --open",
    "build": "vite build",
    "export": "vite build --mode export",
    "preview": "vite preview --host --open"
  }
}`}
                  filename="package.json"
                />
              </motion.section>

              {/* Usage */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
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
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Export Output</h2>
                <CodeBlock 
                  code={`dist/
├── index.html
├── about/
│   └── index.html
├── dashboard/
│   └── index.html
├── 404.html
└── assets/
    ├── index-*.js
    └── index-*.css`}
                />
              </motion.section>

              {/* 404 Handling */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">404 Handling</h2>
                <Table 
                  headers={['Situation', 'What gets written to 404.html']}
                  rows={[
                    ['src/app/not-found.tsx exists', 'A copy of index.html — React Router renders your custom not-found page'],
                    ['No custom not-found file', 'A redirect script that saves the original URL and sends the user to the repo root, where the SPA restores it automatically'],
                  ]}
                />
              </motion.section>

              {/* Options */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Options</h2>
                <CodeBlock 
                  code={`biniExport({
  cleanPaths: ['some/generated/file.ts'], // extra files to delete (default: [])
  mode: 'export',                         // vite --mode flag (default: 'export')
  copy404: true,                          // write 404.html (default: true)
  prerender: true,                        // copy index.html into each route folder (default: true)
})`}
                />
              </motion.section>

              {/* Files Cleaned After Export */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Files Cleaned After Export</h2>
                <Table 
                  headers={['Platform', 'File(s) removed']}
                  rows={[
                    ['Netlify', 'netlify/edge-functions/api.ts · api.js'],
                    ['Cloudflare Workers', 'worker.ts · worker.js'],
                    ['Node / Deno / Bun', 'server/index.ts · server/index.js'],
                    ['AWS Lambda', 'handler.ts · handler.js'],
                    ['Vercel', 'api/index.ts · api/index.js'],
                  ]}
                />
                <p className="text-slate-300 mt-4">
                  Empty parent directories are pruned automatically.
                </p>
              </motion.section>

              {/* Works on Any Fully Static Host */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
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
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Complete Example</h2>
                <p className="text-slate-300 mb-4">
                  A full setup for deploying to GitHub Pages:
                </p>
                <CodeBlock 
                  code={`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { biniroute } from 'bini-router'
import { biniExport } from 'bini-export'

export default defineConfig({
  base: '/my-app/',
  plugins: [
    react(),
    biniroute({ platform: 'node' }),
    biniExport(),
  ],
})`}
                  filename="vite.config.ts"
                />
                <CodeBlock 
                  code={`{
  "scripts": {
    "dev": "vite --host --open",
    "build": "vite build",
    "export": "vite build --mode export",
    "preview": "vite preview --host --open",
    "deploy": "npm run export && npx gh-pages -d dist"
  }
}`}
                  filename="package.json"
                />
                <Callout type="tip">
                  Use <code>gh-pages</code> to deploy to GitHub Pages with one command: <code>npm run deploy</code>.
                </Callout>
              </motion.section>

              {/* Previous / Next Navigation */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                <Link to="/docs/css-modules" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-500">Previous</div>
                    <div className="text-sm font-medium">CSS Modules</div>
                  </div>
                </Link>
                <Link to="/docs/environment-variables" className="group flex items-center gap-2 text-right text-slate-400 hover:text-white transition-colors">
                  <div>
                    <div className="text-xs text-slate-500">Next</div>
                    <div className="text-sm font-medium">Environment Variables</div>
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