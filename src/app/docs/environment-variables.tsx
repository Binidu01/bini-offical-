// src/pages/docs/environment-variables/page.tsx
import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Info,
  Lightbulb,
  CheckCircle,
  Shield,
  Key,
  Eye,
  EyeOff,
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
function Callout({ type, children }: { type: 'info' | 'warning' | 'tip' | 'danger'; children: React.ReactNode }) {
  const styles = {
    info: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', color: 'text-cyan-400', icon: Info },
    warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', color: 'text-amber-400', icon: AlertTriangle },
    tip: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', color: 'text-purple-400', icon: Lightbulb },
    danger: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', color: 'text-rose-400', icon: Shield },
  }
  const style = styles[type]
  const Icon = style.icon

  return (
    <div className={`p-4 rounded-lg ${style.bg} border ${style.border} my-6`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-4 h-4 ${style.color}`} />
        <p className={`text-sm font-medium ${style.color}`}>
          {type === 'info' ? 'Note' : type === 'warning' ? 'Warning' : type === 'danger' ? 'Security' : 'Tip'}
        </p>
      </div>
      <div className="text-sm text-slate-300 [&>strong]:text-white [&>code]:text-cyan-400 [&>code]:bg-slate-800 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded">{children}</div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Icons
// ────────────────────────────────────────────────────────────────────────────────
const Globe = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

// ────────────────────────────────────────────────────────────────────────────────
// Environment Variables Page
// ────────────────────────────────────────────────────────────────────────────────
export default function EnvironmentVariablesPage() {
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
                <h1 className="text-4xl font-bold text-white mb-2">Environment Variables</h1>
                <p className="text-slate-400 text-sm mb-8">
                  Zero-config environment variable system powered by Hono — works across Node.js, Bun, Deno, Vercel Edge, Netlify Edge, and Cloudflare Workers.
                </p>
              </motion.div>

              {/* Overview */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <p className="text-slate-300 mb-6">
                  <code className="text-cyan-400">bini-env</code> is <strong className="text-white">installed and configured by default</strong> in every Bini.js project. 
                  It reads env vars from the Hono request context, so variables are always resolved from the correct runtime binding — no platform-specific code needed.
                </p>
                <Callout type="info">
                  <strong>Hono-native:</strong> <code>getEnv(c, key)</code> / <code>requireEnv(c, key)</code> read directly from the Hono request context. Zero dotenv — no <code>.env</code> parsing at runtime; vars come from the host platform. Vite handles <code>.env</code> loading during development.
                </Callout>
              </motion.section>

              {/* Security Warning */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <Callout type="danger">
                  <strong>Before You Use This:</strong> This library does NOT magically make env vars safe.
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li><code>VITE_*</code> variables are <strong>always</strong> bundled into client JavaScript — they are public.</li>
                    <li><code>BINI_*</code> variables are <strong>also exposed</strong> to the client via <code>import.meta.env</code>.</li>
                    <li>Only un-prefixed variables read via <code>getEnv(ctx, key)</code> in API routes are truly server-side.</li>
                    <li>Misconfigured prefixes = data leak.</li>
                  </ul>
                  If you don't understand this, stop and fix that first.
                </Callout>
              </motion.section>

              {/* Quick Start */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Quick Start</h2>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">1. Register the Vite plugin</h3>
                <CodeBlock 
                  code={`// vite.config.ts
import { defineConfig } from 'vite'
import { biniEnv } from 'bini-env'

export default defineConfig({
  plugins: [biniEnv()]
})`}
                  filename="vite.config.ts"
                />

                <h3 className="text-lg font-semibold text-white mt-6 mb-3">2. Read env vars in your Hono handlers</h3>
                <CodeBlock 
                  code={`// src/app/api/hello.ts
import { Hono } from 'hono'
import { getEnv, requireEnv } from 'bini-env'

const app = new Hono()

app.post('/hello', async (c) => {
  try {
    const ctx = c as any

    // requireEnv throws if the var is missing — fail fast on required config
    const apiKey  = requireEnv(ctx, 'MY_API_KEY')

    // getEnv returns undefined if missing — use ?? to provide a default
    const appName = getEnv(ctx, 'APP_NAME')     ?? 'World'
    const timeout = parseInt(getEnv(ctx, 'TIMEOUT_MS') ?? '5000')

    return c.json({ message: \`Hello, \${appName}!\` })

  } catch (error: any) {
    if (error.message?.includes('[bini-env] Missing required')) {
      return c.json({ error: error.message }, 500)
    }
    return c.json({ error: 'Something went wrong.' }, 500)
  }
})

export default app`}
                  filename="src/app/api/hello.ts"
                />
              </motion.section>

              {/* Usage Pattern */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Usage Pattern</h2>
                <p className="text-slate-300 mb-4">
                  Always pass <code>c</code> explicitly. Cast it once at the top of the handler, then use <code>ctx</code> throughout.
                </p>
                <CodeBlock 
                  code={`app.post('/example', async (c) => {
  try {
    const ctx = c as any

    // Required vars — handler throws immediately if missing
    const dbUrl  = requireEnv(ctx, 'DATABASE_URL')
    const apiKey = requireEnv(ctx, 'STRIPE_SECRET_KEY')

    // Optional vars — fall back to sensible defaults
    const model      = getEnv(ctx, 'AI_MODEL')    ?? 'gpt-4o'
    const region     = getEnv(ctx, 'AWS_REGION')  ?? 'us-east-1'
    const maxRetries = parseInt(getEnv(ctx, 'MAX_RETRIES') ?? '3')
    const debug      = getEnv(ctx, 'DEBUG_MODE')  === 'true'

    // ... rest of handler

  } catch (error: any) {
    if (error.message?.includes('[bini-env] Missing required')) {
      return c.json({ error: error.message }, 500)
    }
    return c.json({ error: 'Something went wrong.' }, 500)
  }
})`}
                />
                <p className="text-slate-300 mt-4">
                  The pattern in three steps:
                </p>
                <CodeBlock 
                  code={`const ctx = c as any              // cast once, at the top of the handler
requireEnv(ctx, 'KEY')            // for vars the handler cannot run without
getEnv(ctx, 'KEY') ?? 'default'   // for optional vars with sensible defaults`}
                />
              </motion.section>

              {/* Environment Prefixes */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Environment Prefixes</h2>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  BINI_ — Client-side vars
                </h3>
                <p className="text-slate-300 mb-4">
                  <code>BINI_</code> variables are exposed to <code>import.meta.env</code>. Use them for public client-side config.
                </p>
                <CodeBlock 
                  code={`# .env
BINI_PUBLIC_API_URL=https://api.example.com`}
                  filename=".env"
                />
                <p className="text-slate-300 mb-2">Accessible in any component:</p>
                <CodeBlock 
                  code={`const apiUrl = import.meta.env.BINI_PUBLIC_API_URL`}
                />

                <h3 className="text-lg font-semibold text-white mt-6 mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-400" />
                  VITE_ — Public client vars
                </h3>
                <p className="text-slate-300 mb-4">
                  <code>VITE_</code> is Vite's built-in prefix. Any var starting with <code>VITE_</code> is bundled into your client-side JavaScript and is publicly visible.
                </p>
                <CodeBlock 
                  code={`# .env
VITE_ANALYTICS_ID=UA-XXXX
VITE_API_URL=https://api.example.com`}
                  filename=".env"
                />
                <CodeBlock 
                  code={`// Accessible anywhere, including the browser
import.meta.env.VITE_ANALYTICS_ID`}
                />

                <h3 className="text-lg font-semibold text-white mt-6 mb-3 flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-rose-400" />
                  No prefix — Secrets (server only)
                </h3>
                <p className="text-slate-300 mb-4">
                  Variables without a prefix are NOT exposed to the browser. Read them via <code>getEnv(ctx, key)</code> in API routes only.
                </p>
                <CodeBlock 
                  code={`# .env
DATABASE_URL=postgres://...
STRIPE_SECRET_KEY=sk_live_...
SMTP_PASS=super_secret`}
                  filename=".env"
                />
                <CodeBlock 
                  code={`// In API routes — auto-imported
const ctx = c as any
const dbUrl = requireEnv(ctx, 'DATABASE_URL')
const smtpPass = requireEnv(ctx, 'SMTP_PASS')`}
                />

                <h3 className="text-lg font-semibold text-white mt-8 mb-3">Prefix Summary</h3>
                <Table 
                  headers={['Prefix', 'Exposed to browser', 'Use for']}
                  rows={[
                    ['BINI_', 'Yes (via import.meta.env)', 'Public client config'],
                    ['VITE_', 'Yes (via import.meta.env)', 'Public client config (Vite standard)'],
                    ['No prefix', 'No', 'Secrets — server only, read via getEnv(ctx, key)'],
                  ]}
                />
                <Callout type="warning">
                  <strong>Critical:</strong> Never put secrets in <code>BINI_*</code> or <code>VITE_*</code> variables — both are exposed to the browser. Use un-prefixed variables for secrets and read them with <code>getEnv(ctx, key)</code> inside API route handlers only.
                </Callout>
              </motion.section>

              {/* Platform Support */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Platform Support</h2>
                <p className="text-slate-300 mb-4">
                  <code>getEnv</code> and <code>requireEnv</code> delegate to Hono's <code>env(c)</code> adapter, which reads from the correct source on every supported platform automatically. Your code never changes regardless of where it deploys.
                </p>
                <Table 
                  headers={['Platform', 'Runtime', 'How Hono reads it']}
                  rows={[
                    ['Node.js', 'Node', 'process.env ✅'],
                    ['Bun', 'Bun', 'process.env ✅'],
                    ['Vercel Edge', 'V8 isolate', 'process.env ✅'],
                    ['Netlify Edge', 'Deno', 'Deno.env.get() ✅'],
                    ['Cloudflare Workers', 'V8 isolate', 'CF bindings via c.env ✅'],
                    ['Deno Deploy', 'Deno', 'Deno.env.get() ✅'],
                  ]}
                />
              </motion.section>

              {/* How It Works */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">How It Works</h2>
                <p className="text-slate-300 mb-4">
                  The <code>biniEnv()</code> plugin tells Vite which env prefixes to expose to <code>import.meta.env</code>, and prints the ß Bini.js banner with detected <code>.env</code> files on server start.
                </p>
                <CodeBlock 
                  code={`// what biniEnv() does internally
config() {
  return { envPrefix: ['BINI_', 'VITE_', ...yourExtras] }
}`}
                />
                <p className="text-slate-300 mt-4">
                  On server start you will see:
                </p>
                <CodeBlock 
                  code={`  ß Bini.js (dev)
  ➜  Environments: .env.local, .env
  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.7:3000/`}
                />
                <p className="text-slate-300 mt-4">
                  Vite handles everything else natively: loading <code>.env</code>, <code>.env.local</code>, <code>.env.[mode]</code> files during dev, watching and restarting on change, injecting prefixed vars into <code>import.meta.env</code> at build time, and HMR when env files change. bini-env does not reimplement any of that.
                </p>
                <p className="text-slate-300 mt-2">
                  <strong>Zero dotenv:</strong> <code>dotenv</code> is never used at runtime. In production, vars are set in your hosting platform's environment config. <code>getEnv</code> and <code>requireEnv</code> are direct calls to Hono's adapter on every invocation — request-scoped and correct.
                </p>
              </motion.section>

              {/* API Reference */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">API Reference</h2>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">getEnv(c, key)</h3>
                <p className="text-slate-300 mb-2">Returns <code>string | undefined</code>. Reads from the Hono request context.</p>
                <CodeBlock 
                  code={`app.get('/config', async (c) => {
  const ctx = c as any

  const region   = getEnv(ctx, 'AWS_REGION') ?? 'us-east-1'
  const logLevel = getEnv(ctx, 'LOG_LEVEL')  ?? 'info'
  const debug    = getEnv(ctx, 'DEBUG_MODE') === 'true'

  return c.json({ region, logLevel, debug })
})`}
                />

                <h3 className="text-lg font-semibold text-white mt-6 mb-3">requireEnv(c, key)</h3>
                <p className="text-slate-300 mb-2">Returns <code>string</code>. Throws immediately if the variable is missing or empty. Logs a descriptive error to the terminal on failure.</p>
                <CodeBlock 
                  code={`app.post('/send-email', async (c) => {
  try {
    const ctx = c as any

    const smtpHost = requireEnv(ctx, 'SMTP_HOST')
    const smtpPass = requireEnv(ctx, 'SMTP_PASS')
    const smtpPort = parseInt(getEnv(ctx, 'SMTP_PORT') ?? '587')

    // ... send email

    return c.json({ sent: true })

  } catch (error: any) {
    if (error.message?.includes('[bini-env] Missing required')) {
      return c.json({ error: error.message }, 500)
    }
    return c.json({ error: 'Failed to send email.' }, 500)
  }
})`}
                />
                <p className="text-slate-300 mt-4">
                  On failure, the terminal will show:
                </p>
                <CodeBlock 
                  code={`[bini-env] error  Missing required environment variable: "SMTP_HOST"
  -> Set it in your platform's env config or hosting dashboard.`}
                />

                <h3 className="text-lg font-semibold text-white mt-6 mb-3">biniEnv(options?)</h3>
                <p className="text-slate-300 mb-4">Vite plugin. Registers <code>BINI_</code> and <code>VITE_</code> as env prefixes and optionally adds more.</p>
                <CodeBlock 
                  code={`biniEnv()
// or with extra prefixes
biniEnv({ envPrefix: ['MY_PUBLIC_'] })`}
                />
                <Table 
                  headers={['Option', 'Type', 'Default', 'Description']}
                  rows={[
                    ['envPrefix', 'string | string[]', '[]', 'Extra prefixes to expose to import.meta.env, in addition to BINI_ and VITE_'],
                  ]}
                />

                <h3 className="text-lg font-semibold text-white mt-6 mb-3">HonoContext</h3>
                <p className="text-slate-300 mb-4">
                  Exported type (<code>Context</code> from Hono). Use it to type helper functions that group env reads, so you only cast <code>c as any</code> once per entry point.
                </p>
                <CodeBlock 
                  code={`import type { HonoContext } from 'bini-env'

function readDbConfig(c: HonoContext) {
  const ctx = c as any
  return {
    url:      requireEnv(ctx, 'DATABASE_URL'),
    poolSize: parseInt(getEnv(ctx, 'DB_POOL_SIZE') ?? '10'),
    ssl:      getEnv(ctx, 'DB_SSL') !== 'false',
  }
}`}
                />
              </motion.section>

              {/* Performance */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Performance</h2>
                <Table 
                  headers={['Metric', 'Dev', 'Prod']}
                  rows={[
                    ['File reads', '0', '0'],
                    ['Runtime cost', '~0ms', '0'],
                    ['Bundle impact', 'Minimal', 'Tree-shaken'],
                  ]}
                />
                <p className="text-slate-300 mt-4">
                  No dotenv. No disk reads. No caching layer. <code>getEnv</code> is a direct call to Hono's adapter on every invocation — request-scoped and correct.
                </p>
              </motion.section>

              {/* Troubleshooting */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Troubleshooting</h2>
                <Table 
                  headers={['Problem', 'Solution']}
                  rows={[
                    ['"Env var is undefined in production"', 'Vars set in .env files are only loaded by Vite during local development. In production, set your variables in your hosting platform\'s environment dashboard (Vercel, Netlify, Cloudflare, etc.).'],
                    ['"Works in dev, undefined in prod"', 'Same as above. Local dev works because Vite loads .env files automatically. Production requires platform-level configuration.'],
                    ['"Cloudflare secret not found"', 'Secrets set via wrangler secret put are only available via c.env inside a handler — which is exactly what getEnv(ctx, key) reads. Ensure you are passing c to the function.'],
                    ['"TypeScript error: Context not assignable"', 'Hono 4.12+ added a symbol to HonoRequest that can break structural assignability in strict TypeScript projects. Cast once per handler: const ctx = c as any'],
                    ['"Types not found"', 'Add to your tsconfig.json or entry file: /// <reference types="vite/client" />'],
                  ]}
                />
              </motion.section>

              {/* Complete Example */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Complete Example</h2>
                <CodeBlock 
                  code={`# .env
# Client-side (PUBLIC) — accessible via import.meta.env
BINI_PUBLIC_API_URL=https://api.example.com
VITE_APP_NAME=My App

# Server-side (PRIVATE) — accessible via getEnv(ctx, key) in API routes
DATABASE_URL=postgres://localhost:5432/mydb
SMTP_PASS=your_smtp_password
JWT_SECRET=your_jwt_secret`}
                  filename=".env"
                />
                <CodeBlock 
                  code={`// src/app/page.tsx (Client Component)
export default function HomePage() {
  const apiUrl = import.meta.env.BINI_PUBLIC_API_URL
  const appName = import.meta.env.VITE_APP_NAME
  
  return (
    <div>
      <h1>{appName}</h1>
      <p>API: {apiUrl}</p>
    </div>
  )
}`}
                  filename="src/app/page.tsx"
                />
                <CodeBlock 
                  code={`// src/app/api/config.ts (API Route)
import { Hono } from 'hono'
import { getEnv, requireEnv } from 'bini-env'

const app = new Hono()

app.get('/config', (c) => {
  const ctx = c as any

  // requireEnv throws if missing
  const dbUrl = requireEnv(ctx, 'DATABASE_URL')
  const jwtSecret = requireEnv(ctx, 'JWT_SECRET')

  // getEnv returns undefined if missing — use ?? for defaults
  const debug = getEnv(ctx, 'DEBUG_MODE') === 'true'

  return c.json({
    debug,
    dbConnected: !!dbUrl,
    jwtConfigured: !!jwtSecret,
    // Never expose the actual secrets in responses!
  })
})

export default app`}
                  filename="src/app/api/config.ts"
                />
              </motion.section>

              {/* Best Practices */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Best Practices</h2>
                <ul className="space-y-3 text-slate-300 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Never commit .env files</strong> — Add to .gitignore.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Use .env.example</strong> — Document required variables for your team.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Cast c once per handler</strong> — <code className="text-cyan-400">const ctx = c as any</code> at the top, then use <code className="text-cyan-400">ctx</code> throughout.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Use requireEnv for critical values</strong> — Fail fast on missing config.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Use VITE_ or BINI_ for client vars</strong> — Both are accessible via <code className="text-cyan-400">import.meta.env</code>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">No prefix for secrets</strong> — Read via <code className="text-cyan-400">getEnv(ctx, key)</code> in API routes only.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Never expose secrets in responses</strong> — Use environment variables for configuration, not for returning to the client.</span>
                  </li>
                </ul>
              </motion.section>

              {/* Previous / Next Navigation */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                <Link to="/docs/static-export" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-500">Previous</div>
                    <div className="text-sm font-medium">Static Export</div>
                  </div>
                </Link>
                <Link to="/docs/deploying" className="group flex items-center gap-2 text-right text-slate-400 hover:text-white transition-colors">
                  <div>
                    <div className="text-xs text-slate-500">Next</div>
                    <div className="text-sm font-medium">Deploying</div>
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