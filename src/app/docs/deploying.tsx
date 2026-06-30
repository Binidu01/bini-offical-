// src/pages/docs/deploying/page.tsx
import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  AlertTriangle,
  Info,
  Lightbulb,
  CheckCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Layout'
import { DocLayout } from '../../components/DocSidebar'
import {
  siNodedotjs,
  siNetlify,
  siVercel,
  siCloudflare,
  siDeno,
  siGithub,
} from 'simple-icons'
import type { SimpleIcon as SimpleIconType } from 'simple-icons'

// Simple Icon component
function SimpleIcon({ 
  icon, 
  className = "", 
  size = 20 
}: { 
  icon: SimpleIconType
  className?: string
  size?: number 
}) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      dangerouslySetInnerHTML={{ __html: icon.svg }}
    />
  )
}

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
// Deploying Page
// ────────────────────────────────────────────────────────────────────────────────
export default function DeployingPage() {
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
                <h1 className="text-4xl font-bold text-white mb-2">Deploying</h1>
                <p className="text-slate-400 text-sm mb-8">
                  Learn how to deploy your Bini.js application to production.
                </p>
              </motion.div>

              {/* Overview */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <p className="text-slate-300 mb-6">
                  Bini.js can be deployed to any platform that supports Node.js, or exported as static files for static hosting. Choose the deployment option that fits your needs.
                </p>
              </motion.section>

              {/* Deployment Options */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Deployment Options</h2>
                <Table 
                  headers={['Platform', 'Command', 'Notes']}
                  rows={[
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siNodedotjs} className="text-green-400" size={16} /> Node.js</span>, <code className="text-cyan-400">npm run build && npm start</code>, 'Default — uses bini-server'],
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siGithub} className="text-white" size={16} /> Static Export</span>, <code className="text-cyan-400">npm run export</code>, 'GitHub Pages, S3, Firebase, Surge'],
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siNetlify} className="text-cyan-400" size={16} /> Netlify</span>, <code className="text-cyan-400">npm run build</code>, 'Edge Functions for API routes'],
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siVercel} className="text-white" size={16} /> Vercel</span>, <code className="text-cyan-400">npm run build</code>, 'Edge runtime for API routes'],
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siCloudflare} className="text-orange-400" size={16} /> Cloudflare</span>, <code className="text-cyan-400">npm run build</code>, 'Workers for API routes'],
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siDeno} className="text-white" size={16} /> Deno Deploy</span>, <code className="text-cyan-400">npm run build</code>, 'Native Deno runtime'],
                  ]}
                />
              </motion.section>

              {/* Node.js Server */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <SimpleIcon icon={siNodedotjs} className="text-green-400" size={20} />
                  Node.js Server
                </h2>
                <p className="text-slate-300 mb-4">
                  The default deployment option. Bini.js uses <code className="text-cyan-400">bini-server</code> — a zero-dependency production server.
                </p>
                <CodeBlock 
                  code={`npm run build
npm start`}
                />
                <p className="text-slate-300 mt-4">
                  Your app will be served at the port specified by <code className="text-cyan-400">PORT</code> (default: 3000).
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">Platforms</h3>
                <ul className="space-y-2 text-slate-300 mb-4 list-disc list-inside">
                  <li><strong className="text-white">Railway</strong> — Auto-detects Node.js, just connect your repo</li>
                  <li><strong className="text-white">Render</strong> — Set build command to <code>npm run build</code> and start to <code>npm start</code></li>
                  <li><strong className="text-white">Fly.io</strong> — Use the Node.js builder</li>
                  <li><strong className="text-white">VPS</strong> — Use <code>pm2</code> to keep the server running</li>
                </ul>
                
                <Callout type="info">
                  <strong>bini-server features:</strong> ETag support, 30s timeouts, 10MB body limit, graceful shutdown, and automatic port increment.
                </Callout>
              </motion.section>

              {/* Netlify */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <SimpleIcon icon={siNetlify} className="text-cyan-400" size={20} />
                  Netlify
                </h2>
                <p className="text-slate-300 mb-4">
                  Bini.js projects are pre-configured for Netlify. Set the platform in <code>vite.config.ts</code>:
                </p>
                <CodeBlock 
                  code={`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { biniroute } from 'bini-router'

export default defineConfig({
  plugins: [
    react(),
    biniroute({ platform: 'netlify' }),
  ],
})`}
                  filename="vite.config.ts"
                />
                <p className="text-slate-300 mt-4">
                  Add a <code>netlify.toml</code> to your project root:
                </p>
                <CodeBlock 
                  code={`[build]
  command = "npm run build"
  publish = "dist"

[[edge_functions]]
  path = "/api/*"
  function = "api"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`}
                  filename="netlify.toml"
                />
                <Callout type="warning">
                  <strong>Important:</strong> Netlify Edge Functions run on Deno, not Node.js. Node-specific packages like <code>nodemailer</code>, <code>fs</code>, or <code>path</code> will not work. Use Web API alternatives.
                </Callout>
              </motion.section>

              {/* Vercel */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <SimpleIcon icon={siVercel} className="text-white" size={20} />
                  Vercel
                </h2>
                <p className="text-slate-300 mb-4">
                  Configure Vercel deployment in <code>vite.config.ts</code>:
                </p>
                <CodeBlock 
                  code={`// vite.config.ts
biniroute({ platform: 'vercel' })`}
                />
                <p className="text-slate-300 mt-4">
                  Add a <code>vercel.json</code> to your project root:
                </p>
                <CodeBlock 
                  code={`{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.ts" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`}
                  filename="vercel.json"
                />
                <Callout type="warning">
                  <strong>Important:</strong> Vercel reads <code>api/</code> before the build step runs. You must commit the generated file: <code>git add api/index.ts</code>.
                </Callout>
              </motion.section>

              {/* Cloudflare Workers */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <SimpleIcon icon={siCloudflare} className="text-orange-400" size={20} />
                  Cloudflare Workers
                </h2>
                <p className="text-slate-300 mb-4">
                  Configure Cloudflare Workers in <code>vite.config.ts</code>:
                </p>
                <CodeBlock 
                  code={`// vite.config.ts
biniroute({ platform: 'cloudflare' })`}
                />
                <p className="text-slate-300 mt-4">
                  Add a <code>wrangler.toml</code> to your project root:
                </p>
                <CodeBlock 
                  code={`name = "my-app"
main = "worker.ts"
compatibility_date = "2025-04-09"

[assets]
directory = "./dist"
binding = "ASSETS"`}
                  filename="wrangler.toml"
                />
                <p className="text-slate-300 mt-4">
                  Build and deploy:
                </p>
                <CodeBlock 
                  code={`npm run build
npx wrangler deploy`}
                />
              </motion.section>

              {/* Deno Deploy */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <SimpleIcon icon={siDeno} className="text-white" size={20} />
                  Deno Deploy
                </h2>
                <p className="text-slate-300 mb-4">
                  Configure Deno Deploy in <code>vite.config.ts</code>:
                </p>
                <CodeBlock 
                  code={`// vite.config.ts
biniroute({ platform: 'deno' })`}
                />
                <p className="text-slate-300 mt-4">
                  In the Deno Deploy dashboard, set:
                </p>
                <ul className="space-y-2 text-slate-300 mb-4 list-disc list-inside">
                  <li><strong className="text-white">Entrypoint:</strong> <code>server/index.ts</code></li>
                  <li><strong className="text-white">Build Command:</strong> <code>vite build</code></li>
                  <li><strong className="text-white">Runtime:</strong> Dynamic App</li>
                </ul>
                <Callout type="warning">
                  <strong>Important:</strong> Deno Deploy reads <code>server/</code> before the build step. Commit the generated file: <code>git add server/index.ts</code>.
                </Callout>
              </motion.section>

              {/* Static Export */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <SimpleIcon icon={siGithub} className="text-white" size={20} />
                  Static Export
                </h2>
                <p className="text-slate-300 mb-4">
                  Export your app as static HTML files for static hosts like GitHub Pages, S3, or Firebase:
                </p>
                <CodeBlock 
                  code={`npm run export`}
                />
                <p className="text-slate-300 mt-4">
                  The exported files will be in the <code className="text-cyan-400">dist/</code> folder.
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">GitHub Pages</h3>
                <p className="text-slate-300 mb-4">
                  Set the <code>base</code> option in <code>vite.config.ts</code> if deploying to a subpath:
                </p>
                <CodeBlock 
                  code={`// vite.config.ts
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react(), biniroute({ platform: 'node' }), biniExport()],
})`}
                />
                <Callout type="info">
                  For more details, see the <Link to="/docs/static-export" className="text-cyan-400 hover:underline">Static Export</Link> documentation.
                </Callout>
              </motion.section>

              {/* Platform Comparison */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Platform Comparison</h2>
                <Table 
                  headers={['Platform', 'API Runtime', 'Static Routes', 'Dynamic Routes']}
                  rows={[
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siNodedotjs} className="text-green-400" size={14} /> Node.js</span>, 'Node.js', <CheckCircle className="w-4 h-4 text-emerald-400" />, <CheckCircle className="w-4 h-4 text-emerald-400" />],
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siNetlify} className="text-cyan-400" size={14} /> Netlify</span>, 'Deno (Edge)', <CheckCircle className="w-4 h-4 text-emerald-400" />, <CheckCircle className="w-4 h-4 text-emerald-400" />],
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siVercel} className="text-white" size={14} /> Vercel</span>, 'Edge', <CheckCircle className="w-4 h-4 text-emerald-400" />, <CheckCircle className="w-4 h-4 text-emerald-400" />],
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siCloudflare} className="text-orange-400" size={14} /> Cloudflare</span>, 'Workers', <CheckCircle className="w-4 h-4 text-emerald-400" />, <CheckCircle className="w-4 h-4 text-emerald-400" />],
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siDeno} className="text-white" size={14} /> Deno Deploy</span>, 'Deno', <CheckCircle className="w-4 h-4 text-emerald-400" />, <CheckCircle className="w-4 h-4 text-emerald-400" />],
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siGithub} className="text-white" size={14} /> Static Export</span>, 'N/A', <CheckCircle className="w-4 h-4 text-emerald-400" />, <span className="text-amber-400">via 404.html</span>],
                  ]}
                />
              </motion.section>

              {/* Environment Variables in Production */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Environment Variables in Production</h2>
                <p className="text-slate-300 mb-4">
                  Set environment variables through your hosting platform's dashboard:
                </p>
                <Table 
                  headers={['Platform', 'How to Set']}
                  rows={[
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siNodedotjs} className="text-green-400" size={14} /> Node.js</span>, 'Use .env file or system environment variables'],
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siNetlify} className="text-cyan-400" size={14} /> Netlify</span>, 'Site settings → Environment variables'],
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siVercel} className="text-white" size={14} /> Vercel</span>, 'Project settings → Environment Variables'],
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siCloudflare} className="text-orange-400" size={14} /> Cloudflare</span>, 'wrangler.toml or dashboard'],
                    [<span className="flex items-center gap-2"><SimpleIcon icon={siDeno} className="text-white" size={14} /> Deno Deploy</span>, 'Project settings → Environment Variables'],
                  ]}
                />
                <Callout type="warning">
                  Never commit <code>.env</code> files with secrets to your repository. Use platform environment variables for production.
                </Callout>
              </motion.section>

              {/* Best Practices */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Best Practices</h2>
                <ul className="space-y-3 text-slate-300 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Test builds locally</strong> — Run <code>npm run build</code> and <code>npm run preview</code> before deploying.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Use environment variables</strong> — Keep configuration separate from code.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Set up CI/CD</strong> — Automate deployments with GitHub Actions or similar.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Monitor your app</strong> — Use platform analytics to track performance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Use a custom domain</strong> — Configure SSL for secure connections.</span>
                  </li>
                </ul>
              </motion.section>

              {/* Previous Navigation */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="pt-8 mt-8 border-t border-slate-800">
                <Link to="/docs/environment-variables" className="group inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-500">Previous</div>
                    <div className="text-sm font-medium">Environment Variables</div>
                  </div>
                </Link>
              </motion.div>

            </div>
          </DocLayout>
          
        </div>
      </div>
    </div>
  )
}