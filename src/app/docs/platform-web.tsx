// src/pages/docs/platform-web/page.tsx
import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Server,
  Cloud,
  Terminal,
  Zap,
  Shield,
  Gauge,
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
  { id: 'web-overview', label: 'Web Overview' },
  { id: 'windows', label: 'Windows' },
  { id: 'macos', label: 'macOS' },
  { id: 'linux', label: 'Linux' },
  { id: 'development-server', label: 'Development Server' },
  { id: 'production-server', label: 'Production Server' },
  { id: 'static-export', label: 'Static Export' },
  { id: 'deployment', label: 'Deployment' },
]

const PAGE_TITLE = 'Web'
const PAGE_URL = 'https://bini.js.org/docs/platform-web'
const EDIT_URL = 'https://github.com/Binidu01/bini-offical/edit/main/src/app/docs/platform-web.tsx'

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
    <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 my-6">
      <div className="text-sm text-slate-300 [&>strong]:text-white [&>code]:text-cyan-400 [&>code]:bg-slate-800 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded">{children}</div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Platform Web Page
// ────────────────────────────────────────────────────────────────────────────────
export default function PlatformWebPage() {
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
                    <p className="text-slate-400 text-sm">Build web applications with Bini.js — the default platform target.</p>
                  </div>
                  <div className="shrink-0 pt-2 hidden sm:block">
                    <CopyPageButton pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} />
                  </div>
                </motion.div>
                {/* Copy button on small screens */}
                <div className="sm:hidden mb-8">
                  <CopyPageButton pageUrl={PAGE_URL} pageTitle={PAGE_TITLE} />
                </div>

                {/* Web Overview */}
                <motion.section id="web-overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Web Overview</h2>
                  <p className="text-slate-300 mb-4">
                    Web is the default platform target in Bini.js. It's a standard Vite + React SPA with file-based routing and a Hono API layer. Your application runs in the browser and can be deployed to any hosting platform.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3 mb-6">
                    <div className="p-4 rounded-xl border border-slate-700 bg-[#0a0a0a]">
                      <Globe className="w-5 h-5 text-cyan-400 mb-2" />
                      <h3 className="text-white font-medium text-sm">SPA</h3>
                      <p className="text-slate-400 text-xs">Single-page application with client-side routing</p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-700 bg-[#0a0a0a]">
                      <Server className="w-5 h-5 text-cyan-400 mb-2" />
                      <h3 className="text-white font-medium text-sm">API Layer</h3>
                      <p className="text-slate-400 text-xs">Hono-powered API routes in <code className="text-cyan-400">src/app/api/</code></p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-700 bg-[#0a0a0a]">
                      <Cloud className="w-5 h-5 text-cyan-400 mb-2" />
                      <h3 className="text-white font-medium text-sm">Universal</h3>
                      <p className="text-slate-400 text-xs">Deploy anywhere — Node.js, Edge, or static hosting</p>
                    </div>
                  </div>
                </motion.section>

                {/* Windows */}
                <motion.section id="windows" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Windows</h2>
                  <p className="text-slate-300 mb-4">
                    Create a web application on Windows using the CLI. Web is the default platform, so you don't need to specify it.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Interactive Mode</h3>
                  <p className="text-slate-300 mb-4">
                    Run the CLI and select <code className="text-cyan-400">web</code> when prompted:
                  </p>
                  <CodeBlock 
                    code={`npx create-bini-app@latest`}
                  />
                  <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 mb-4">
                    <p className="text-slate-300 text-sm">
                      <span className="text-white">Prompt:</span> Which platform would you like to target?
                    </p>
                    <p className="text-cyan-400 text-sm mt-1">web / windows / macos / linux / android / ios</p>
                    <p className="text-emerald-400 text-sm mt-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Select <span className="font-medium">web</span> and press Enter
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">With --platform Flag</h3>
                  <CodeBlock 
                    code={`npx create-bini-app@latest my-app --platform web`}
                  />

                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Default (No Flag)</h3>
                  <CodeBlock 
                    code={`npx create-bini-app@latest my-app`}
                  />
                  <Note>
                    Web is the default platform on Windows. All commands work the same way as on other operating systems.
                  </Note>
                </motion.section>

                {/* macOS */}
                <motion.section id="macos" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">macOS</h2>
                  <p className="text-slate-300 mb-4">
                    Create a web application on macOS using the CLI. Web is the default platform, so you don't need to specify it.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Interactive Mode</h3>
                  <p className="text-slate-300 mb-4">
                    Run the CLI and select <code className="text-cyan-400">web</code> when prompted:
                  </p>
                  <CodeBlock 
                    code={`npx create-bini-app@latest`}
                  />
                  <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 mb-4">
                    <p className="text-slate-300 text-sm">
                      <span className="text-white">Prompt:</span> Which platform would you like to target?
                    </p>
                    <p className="text-cyan-400 text-sm mt-1">web / windows / macos / linux / android / ios</p>
                    <p className="text-emerald-400 text-sm mt-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Select <span className="font-medium">web</span> and press Enter
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">With --platform Flag</h3>
                  <CodeBlock 
                    code={`npx create-bini-app@latest my-app --platform web`}
                  />

                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Default (No Flag)</h3>
                  <CodeBlock 
                    code={`npx create-bini-app@latest my-app`}
                  />
                  <Note>
                    Web is the default platform on macOS. All commands work the same way as on other operating systems.
                  </Note>
                </motion.section>

                {/* Linux */}
                <motion.section id="linux" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Linux</h2>
                  <p className="text-slate-300 mb-4">
                    Create a web application on Linux using the CLI. Web is the default platform, so you don't need to specify it.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Interactive Mode</h3>
                  <p className="text-slate-300 mb-4">
                    Run the CLI and select <code className="text-cyan-400">web</code> when prompted:
                  </p>
                  <CodeBlock 
                    code={`npx create-bini-app@latest`}
                  />
                  <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 mb-4">
                    <p className="text-slate-300 text-sm">
                      <span className="text-white">Prompt:</span> Which platform would you like to target?
                    </p>
                    <p className="text-cyan-400 text-sm mt-1">web / windows / macos / linux / android / ios</p>
                    <p className="text-emerald-400 text-sm mt-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Select <span className="font-medium">web</span> and press Enter
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">With --platform Flag</h3>
                  <CodeBlock 
                    code={`npx create-bini-app@latest my-app --platform web`}
                  />

                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Default (No Flag)</h3>
                  <CodeBlock 
                    code={`npx create-bini-app@latest my-app`}
                  />
                  <Note>
                    Web is the default platform on Linux. All commands work the same way as on other operating systems.
                  </Note>
                </motion.section>

                {/* Development Server */}
                <motion.section id="development-server" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Development Server</h2>
                  <p className="text-slate-300 mb-4">
                    Start the development server with HMR (Hot Module Replacement):
                  </p>
                  <CodeBlock 
                    code={`npm run dev`}
                  />
                  <p className="text-slate-300 mt-4">
                    The dev server provides:
                  </p>
                  <ul className="space-y-2 text-slate-300 mb-4 list-disc list-inside">
                    <li>Fast refresh with HMR</li>
                    <li>File-based routing with live updates</li>
                    <li>API routes served at <code className="text-cyan-400">/api/*</code></li>
                    <li>Environment variables from <code className="text-cyan-400">.env</code> files</li>
                    <li>Error overlay with <code className="text-cyan-400">bini-overlay</code></li>
                  </ul>
                </motion.section>

                {/* Production Server */}
                <motion.section id="production-server" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Production Server</h2>
                  <p className="text-slate-300 mb-4">
                    Build and serve your application in production mode:
                  </p>
                  <CodeBlock 
                    code={`npm run build
npm start`}
                  />
                  <p className="text-slate-300 mt-4">
                    <code className="text-cyan-400">bini-server</code> is a zero-dependency production server that includes:
                  </p>
                  <ul className="space-y-2 text-slate-300 mb-4 list-disc list-inside">
                    <li>Static file serving with ETag/304 caching</li>
                    <li>API routes from <code className="text-cyan-400">src/app/api/</code></li>
                    <li>SPA fallback for client-side routing</li>
                    <li>Graceful shutdown</li>
                    <li>Configurable timeouts and body limits</li>
                  </ul>
                  <Note>
                    <code>bini-server</code> is included by default. No additional setup required.
                  </Note>
                </motion.section>

                {/* Static Export */}
                <motion.section id="static-export" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Static Export</h2>
                  <p className="text-slate-300 mb-4">
                    Export your app as a static SPA for hosting on any static platform:
                  </p>
                  <CodeBlock 
                    code={`npm run export`}
                  />
                  <p className="text-slate-300 mt-4">
                    <code className="text-cyan-400">bini-export</code> pre-renders every static route and generates:
                  </p>
                  <ul className="space-y-2 text-slate-300 mb-4 list-disc list-inside">
                    <li><code className="text-cyan-400">dist/</code> with pre-rendered HTML for each route</li>
                    <li><code className="text-cyan-400">404.html</code> for SPA fallback</li>
                    <li>Clean build with platform-specific files removed</li>
                  </ul>
                  <Note>
                    Static export works on GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, Firebase Hosting, and Surge.
                  </Note>
                </motion.section>

                {/* Deployment */}
                <motion.section id="deployment" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Deployment</h2>
                  <p className="text-slate-300 mb-4">
                    Deploy your web application with <code className="text-cyan-400">bini-deploy</code>:
                  </p>
                  <CodeBlock 
                    code={`npm run deploy`}
                  />
                  <p className="text-slate-300 mt-4">
                    bini-deploy prompts you to select your hosting platform and generates the appropriate configuration:
                  </p>
                  <Table 
                    headers={['Platform', 'Runtime', 'Generated']}
                    rows={[
                      ['Node.js', 'Node.js', 'bini-server (no config needed)'],
                      ['Netlify', 'Edge Functions (Deno)', 'netlify.toml + netlify/edge-functions/api.ts'],
                      ['Vercel', 'Edge Runtime', 'vercel.json + api/index.ts'],
                      ['Cloudflare', 'Workers', 'wrangler.toml + worker.ts'],
                      ['Deno', 'Deno', 'server/index.ts'],
                    ]}
                  />
                  <Note>
                    For static hosting, use <code>npm run export</code> and deploy the <code>dist/</code> folder.
                  </Note>
                </motion.section>

                {/* Previous / Next Navigation */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                  <Link to="/docs/css-modules" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <div>
                      <div className="text-xs text-slate-500">Previous</div>
                      <div className="text-sm font-medium">CSS Modules</div>
                    </div>
                  </Link>
                  <Link to="/docs/platform-windows" className="group flex items-center gap-2 text-right text-slate-400 hover:text-white transition-colors">
                    <div>
                      <div className="text-xs text-slate-500">Next</div>
                      <div className="text-sm font-medium">Windows</div>
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