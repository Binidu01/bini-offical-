// src/pages/docs/api-routes/page.tsx
import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Info,
  Lightbulb,
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
// API Routes Page
// ────────────────────────────────────────────────────────────────────────────────
export default function ApiRoutesPage() {
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
                <h1 className="text-4xl font-bold text-white mb-2">API Routes</h1>
                <p className="text-slate-400 text-sm mb-8">
                  Learn how to create backend API endpoints in Bini.js using plain functions or Hono.
                </p>
              </motion.div>

              {/* Overview */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <p className="text-slate-300 mb-6">
                  Bini.js allows you to create API endpoints directly in your project. Place files in <code className="text-cyan-400">src/app/api/</code> and they automatically become API routes at <code className="text-cyan-400">/api/*</code>. The filename maps directly to the route — <code className="text-cyan-400">hello.ts</code> becomes <code className="text-cyan-400">/api/hello</code>, <code className="text-cyan-400">users.ts</code> becomes <code className="text-cyan-400">/api/users</code>, and so on.
                </p>
                <Callout type="warning">
                  <strong>Important:</strong> Every API route file <strong>must</strong> have a <code>default</code> export. 
                  Bini.js uses the default export to handle requests. Named exports will <strong>not</strong> work.
                </Callout>
              </motion.section>

              {/* File Structure */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">File Structure</h2>
                <p className="text-slate-300 mb-4">
                  The filename (without extension) becomes the last segment of the URL path under <code className="text-cyan-400">/api/</code>:
                </p>
                <CodeBlock 
                  code={`src/app/
├── api/
│   ├── hello.ts           → /api/hello
│   ├── users.ts           → /api/users
│   ├── posts/
│   │   ├── index.ts       → /api/posts
│   │   └── [id].ts        → /api/posts/:id
│   └── [...catch].ts      → /api/* (catch-all)
├── layout.tsx
└── page.tsx`}
                />
                <Callout type="info">
                  There is no root <code>/api</code> route. Every API file maps to a named path — use <code>posts/index.ts</code> if you need a route at <code>/api/posts</code>.
                </Callout>
              </motion.section>

              {/* Plain Function Handler */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Plain Function Handler</h2>
                <p className="text-slate-300 mb-4">
                  The simplest way to create an API route is to default export a handler function that checks the HTTP method:
                </p>
                <CodeBlock 
                  code={`// src/app/api/hello.ts → /api/hello
export default function handler(request: Request) {
  // Handle GET requests
  if (request.method === 'GET') {
    return Response.json({ message: 'Hello World' })
  }
  
  // Handle POST requests
  if (request.method === 'POST') {
    return Response.json({ message: 'Created' }, { status: 201 })
  }
  
  // Handle PUT requests
  if (request.method === 'PUT') {
    return Response.json({ message: 'Updated' })
  }
  
  // Handle DELETE requests
  if (request.method === 'DELETE') {
    return Response.json({ message: 'Deleted' })
  }
  
  // Method not allowed
  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}`}
                  filename="src/app/api/hello.ts → /api/hello"
                />
                <p className="text-slate-300 mt-4">
                  The handler receives the native <code className="text-cyan-400">Request</code> object. Check <code className="text-cyan-400">request.method</code> to handle different HTTP verbs.
                </p>
                <Callout type="tip">
                  For APIs with multiple endpoints or complex logic, Hono is recommended over plain functions.
                </Callout>
              </motion.section>

              {/* Hono Integration */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Hono Integration (Recommended)</h2>
                <p className="text-slate-300 mb-4">
                  For more complex APIs, use Hono. Create a Hono app and default export it. Write routes <strong className="text-white">without</strong> the <code className="text-cyan-400">/api</code> prefix — bini-router strips it before your handler sees the request, and re-mounts it automatically in production.
                </p>
                <CodeBlock 
                  code={`// src/app/api/users.ts → /api/users
import { Hono } from 'hono'

const app = new Hono()

// handles GET /api/users
app.get('/users', (c) => {
  return c.json({ users: ['alice', 'bob', 'charlie'] })
})

// handles POST /api/users
app.post('/users', async (c) => {
  const body = await c.req.json()
  return c.json({ created: body }, { status: 201 })
})

// handles GET /api/users/:id
app.get('/users/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ id, name: \`User \${id}\` })
})

// handles PUT /api/users/:id
app.put('/users/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  return c.json({ id, ...body })
})

// handles DELETE /api/users/:id
app.delete('/users/:id', (c) => {
  return c.json({ message: \`Deleted user \${c.req.param('id')}\` })
})

export default app`}
                  filename="src/app/api/users.ts → /api/users"
                />
                <Callout type="info">
                  Hono is the recommended approach for complex APIs. It provides routing, middleware, validation, and better TypeScript support.
                </Callout>
              </motion.section>

              {/* Hono Middleware */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Hono Middleware</h2>
                <p className="text-slate-300 mb-4">
                  Hono provides built-in middleware for common tasks:
                </p>
                <CodeBlock 
                  code={`// src/app/api/secure.ts → /api/secure
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { timeout } from 'hono/timeout'

const app = new Hono()

// Global middleware (applies to all routes in this file)
app.use('*', cors())
app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', timeout(5000))

// Public route
app.get('/secure', (c) => c.json({ message: 'Public endpoint' }))

// Additional routes
app.get('/secure/dashboard', (c) => {
  return c.json({ message: 'Dashboard' })
})

export default app`}
                  filename="src/app/api/secure.ts → /api/secure"
                />
                <Table 
                  headers={['Middleware', 'Purpose']}
                  rows={[
                    ['cors', 'Cross-Origin Resource Sharing'],
                    ['logger', 'Request logging'],
                    ['jwt', 'JWT authentication'],
                    ['prettyJSON', 'Pretty JSON responses'],
                    ['cache', 'Response caching'],
                    ['compress', 'Response compression'],
                    ['timeout', 'Request timeout'],
                    ['etag', 'ETag support'],
                  ]}
                />
              </motion.section>

              {/* Dynamic API Routes */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Dynamic API Routes</h2>
                <p className="text-slate-300 mb-4">
                  Use square brackets for dynamic segments, just like page routes:
                </p>
                <CodeBlock 
                  code={`// src/app/api/posts/[id].ts → /api/posts/:id
import { Hono } from 'hono'

const app = new Hono()

app.get('/posts/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ id, title: \`Post \${id}\` })
})

app.put('/posts/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  return c.json({ id, ...body })
})

app.delete('/posts/:id', (c) => {
  return c.json({ message: \`Deleted post \${c.req.param('id')}\` })
})

export default app`}
                  filename="src/app/api/posts/[id].ts → /api/posts/:id"
                />
                <p className="text-slate-300 mt-4">
                  For plain function handlers with dynamic routes, parameters are passed via the <code className="text-cyan-400">x-bini-params</code> header:
                </p>
                <CodeBlock 
                  code={`// src/app/api/posts/[id].ts → /api/posts/:id
export default function handler(request: Request) {
  // Dynamic params are passed in this header
  const paramsHeader = request.headers.get('x-bini-params')
  const params = paramsHeader ? JSON.parse(paramsHeader) : {}
  const id = params.id
  
  if (request.method === 'GET') {
    return Response.json({ id, title: \`Post \${id}\` })
  }
  
  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}`}
                  filename="src/app/api/posts/[id].ts → /api/posts/:id"
                />
              </motion.section>

              {/* Catch-all API Routes */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Catch-all API Routes</h2>
                <p className="text-slate-300 mb-4">
                  Use <code className="text-cyan-400">[...catch]</code> to handle all unmatched API routes:
                </p>
                <CodeBlock 
                  code={`// src/app/api/[...catch].ts → /api/* (catch-all)
export default function handler(request: Request) {
  const url = new URL(request.url)
  
  return Response.json({
    error: 'Not Found',
    path: url.pathname,
    method: request.method,
  }, { status: 404 })
}`}
                  filename="src/app/api/[...catch].ts → /api/*"
                />
              </motion.section>

              {/* Environment Variables */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Environment Variables</h2>
                <p className="text-slate-300 mb-4">
                  API routes use <code className="text-cyan-400">getEnv(c, key)</code> and <code className="text-cyan-400">requireEnv(c, key)</code> from <code className="text-cyan-400">bini-env</code>. Both read directly from the Hono request context via <code className="text-cyan-400">hono/adapter</code> — this means they work correctly across every runtime (Node, Bun, Cloudflare Workers, Vercel Edge, Netlify Edge, Deno) without any code changes.
                </p>
                <Callout type="info">
                  Always pass <code>c</code> explicitly. Cast it once at the top of the handler as <code>const ctx = c as any</code>, then use <code>ctx</code> throughout. There are no <code>process.env</code> fallbacks — every read is request-scoped and resolved by Hono's adapter for the current platform.
                </Callout>
                <CodeBlock 
                  code={`// src/app/api/email.ts → /api/email
import { Hono } from 'hono'
import { getEnv, requireEnv } from 'bini-env'
import nodemailer from 'nodemailer'

const app = new Hono()

app.post('/email/send', async (c) => {
  try {
    const ctx = c as any

    // requireEnv throws immediately if the var is missing — fail fast on required config
    const smtpHost = requireEnv(ctx, 'SMTP_HOST')
    const smtpUser = requireEnv(ctx, 'SMTP_USER')
    const smtpPass = requireEnv(ctx, 'SMTP_PASS')
    const fromEmail = requireEnv(ctx, 'FROM_EMAIL')

    // getEnv returns undefined if missing — use ?? for defaults
    const smtpPort = parseInt(getEnv(ctx, 'SMTP_PORT') ?? '587')

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      auth: { user: smtpUser, pass: smtpPass },
    })

    const { to, subject, text } = await c.req.json()
    await transporter.sendMail({ from: fromEmail, to, subject, text })

    return c.json({ success: true })

  } catch (error: any) {
    if (error.message?.includes('[bini-env] Missing required')) {
      return c.json({ error: error.message }, 500)
    }
    return c.json({ error: 'Failed to send email.' }, 500)
  }
})

export default app`}
                  filename="src/app/api/email.ts → /api/email"
                />
                <p className="text-slate-300 mb-4">
                  The pattern in three steps:
                </p>
                <CodeBlock
                  code={`const ctx = c as any              // cast once, at the top of the handler
requireEnv(ctx, 'KEY')            // for vars the handler cannot run without — throws if missing
getEnv(ctx, 'KEY') ?? 'default'   // for optional vars with sensible defaults`}
                />
                <p className="text-slate-300 mb-4">
                  On failure, the terminal will show:
                </p>
                <CodeBlock
                  code={`[bini-env] error  Missing required environment variable: "SMTP_HOST"
  -> Set it in your platform's env config or hosting dashboard.`}
                />

                <h3 className="text-lg font-semibold text-white mt-8 mb-3">Choosing the right prefix</h3>
                <p className="text-slate-300 mb-4">
                  bini-env supports three categories of variables. The prefix determines where the variable is accessible:
                </p>
                <Table
                  headers={['Prefix', 'Exposed to browser', 'Use for']}
                  rows={[
                    ['BINI_', 'Yes (via import.meta.env)', 'Public client config'],
                    ['VITE_', 'Yes (via import.meta.env)', 'Public client config (Vite standard)'],
                    ['No prefix', 'No', 'Secrets — server only, read via getEnv(ctx, key)'],
                  ]}
                />
                <CodeBlock
                  code={`# .env

# ✓ use BINI_ or VITE_ for anything the browser needs
BINI_PUBLIC_API_URL=https://api.example.com
VITE_APP_NAME=My App

# ✓ no prefix for secrets — read via getEnv(ctx, key) in API routes only
DATABASE_URL=postgres://...
SMTP_HOST=smtp.example.com
SMTP_USER=user@example.com
SMTP_PASS=your_password
FROM_EMAIL=App <noreply@example.com>`}
                />
                <Callout type="warning">
                  Never put secrets in <code>BINI_*</code> or <code>VITE_*</code> variables — both are bundled into client JavaScript and publicly visible. Use un-prefixed variables for secrets and read them with <code>getEnv(ctx, key)</code> inside API route handlers only.
                </Callout>
                <Callout type="tip">
                  <strong>Production note:</strong> <code>.env</code> files are only loaded by Vite during local development. In production, set your variables in your hosting platform's environment dashboard (Vercel, Netlify, Cloudflare, etc.). <code>getEnv</code> and <code>requireEnv</code> read from the correct source on every platform automatically — your handler code never changes.
                </Callout>
              </motion.section>

              {/* Request & Response */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Request & Response</h2>
                <p className="text-slate-300 mb-4">
                  API routes use standard Web APIs for requests and responses:
                </p>
                <CodeBlock 
                  code={`// Reading request data
export default async function handler(request: Request) {
  // Parse JSON body
  const json = await request.json()
  
  // Parse form data
  const formData = await request.formData()
  
  // Read headers
  const auth = request.headers.get('Authorization')
  
  // Read query parameters
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')
  
  // Return JSON response
  return Response.json({ data: json, page })
}

// Setting response headers
export default function handler() {
  return new Response('Hello', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=3600',
    },
  })
}`}
                />
              </motion.section>

              {/* CORS */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">CORS</h2>
                <p className="text-slate-300 mb-4">
                  CORS is enabled by default for all API routes. You can customize or disable it:
                </p>
                <CodeBlock 
                  code={`// vite.config.ts
import { defineConfig } from 'vite'
import { biniroute } from 'bini-router'

export default defineConfig({
  plugins: [
    biniroute({
      cors: true,  // Default: true
    }),
  ],
})`}
                  filename="vite.config.ts"
                />
                <p className="text-slate-300 mt-4">
                  With Hono, you can also configure CORS per route:
                </p>
                <CodeBlock 
                  code={`import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Global CORS
app.use('*', cors({
  origin: 'https://myapp.com',
  allowMethods: ['GET', 'POST'],
}))

// Specific CORS for a route
app.get('/public', cors(), (c) => c.text('Public endpoint'))

export default app`}
                />
              </motion.section>

              {/* Deployment */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Deployment</h2>
                <p className="text-slate-300 mb-4">
                  API routes work across all deployment platforms:
                </p>
                <Table 
                  headers={['Platform', 'Runtime', 'Notes']}
                  rows={[
                    ['Node.js', 'Node.js', 'Runs via bini-server'],
                    ['Netlify', 'Deno (Edge)', 'Uses Deno CDN imports'],
                    ['Vercel', 'Edge', 'Edge runtime'],
                    ['Cloudflare', 'Workers', 'Worker runtime'],
                    ['Deno', 'Deno', 'Native Deno runtime'],
                  ]}
                />
                <Callout type="info">
                  The same API code runs unchanged across all platforms. Bini.js automatically generates the appropriate entry files during build.
                </Callout>
              </motion.section>

              {/* Best Practices */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Best Practices</h2>
                <ul className="space-y-3 text-slate-300 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Always use default export</strong> — Every API file must have a default export.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Filename = route segment</strong> — <code className="text-cyan-400">hello.ts</code> maps to <code className="text-cyan-400">/api/hello</code>. There is no root <code className="text-cyan-400">/api</code> route.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Use Hono for complex APIs</strong> — It provides better structure and middleware.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Cast <code className="text-cyan-400">c</code> once per handler</strong> — Use <code className="text-cyan-400">const ctx = c as any</code> at the top, then pass <code className="text-cyan-400">ctx</code> to <code className="text-cyan-400">getEnv</code> / <code className="text-cyan-400">requireEnv</code>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Validate input</strong> — Always validate request data before processing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Handle errors gracefully</strong> — Return appropriate status codes and error messages.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Keep secrets secure</strong> — <code className="text-cyan-400">BINI_*</code> and <code className="text-cyan-400">VITE_*</code> variables are bundled into client JS. Use un-prefixed variables for sensitive data and read them only via <code className="text-cyan-400">getEnv(ctx, key)</code> inside API route handlers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Use Web APIs</strong> — Stick to standard Request/Response for maximum compatibility.</span>
                  </li>
                </ul>
              </motion.section>

              {/* Previous / Next Navigation */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                <Link to="/docs/loading" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-500">Previous</div>
                    <div className="text-sm font-medium">Loading UI</div>
                  </div>
                </Link>
                <Link to="/docs/api-plain" className="group flex items-center gap-2 text-right text-slate-400 hover:text-white transition-colors">
                  <div>
                    <div className="text-xs text-slate-500">Next</div>
                    <div className="text-sm font-medium">Plain Function Handlers</div>
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