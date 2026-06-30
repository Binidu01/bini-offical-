// src/pages/docs/api-hono/page.tsx
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
// Hono Integration Page
// ────────────────────────────────────────────────────────────────────────────────
export default function ApiHonoPage() {
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
                <h1 className="text-4xl font-bold text-white mb-2">Hono Integration</h1>
                <p className="text-slate-400 text-sm mb-8">
                  Learn how to build powerful APIs with Hono in Bini.js — file-based routing, middleware, and type safety.
                </p>
              </motion.div>

              {/* Overview */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <p className="text-slate-300 mb-6">
                  Hono is a fast, lightweight web framework that works everywhere. Bini.js integrates Hono seamlessly with <strong>file-based API routing</strong> — your file structure defines your API routes.
                </p>
                <Callout type="info">
                  Hono is the <strong>recommended</strong> approach for complex APIs in Bini.js. It provides routing, middleware, validation, and excellent TypeScript support — all with zero-config file-based routing.
                </Callout>
              </motion.section>

              {/* File-Based API Routing */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">File-Based API Routing</h2>
                <p className="text-slate-300 mb-4">
                  Your API route is determined by the <strong>file path</strong> inside <code className="text-cyan-400">src/app/api/</code>. The file name becomes the route segment:
                </p>
                <Table 
                  headers={['File Path', 'API Route']}
                  rows={[
                    ['src/app/api/hello.ts', '/api/hello'],
                    ['src/app/api/user.ts', '/api/user'],
                    ['src/app/api/posts.ts', '/api/posts'],
                    ['src/app/api/posts/[id].ts', '/api/posts/:id'],
                    ['src/app/api/[...catch].ts', '/api/* (catch-all)'],
                  ]}
                />
                <Callout type="info">
                  There are <strong>no root / API routes</strong>. Every API file maps to a named route based on its filename. A file at <code>src/app/api/hello.ts</code> is served at <code>/api/hello</code>. Write your Hono routes <strong>without</strong> the <code>/api</code> prefix — bini-router strips it in dev/preview and mounts the app under <code>/api</code> in production.
                </Callout>
              </motion.section>

              {/* Basic Hono App */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Basic Hono App</h2>
                <p className="text-slate-300 mb-4">
                  Create a Hono app in <code className="text-cyan-400">src/app/api/</code> and default export it:
                </p>
                <CodeBlock 
                  code={`// src/app/api/hello.ts → /api/hello
import { Hono } from 'hono'

const app = new Hono()

app.all('/hello', (c) => {
  return c.json({
    message  : 'Hello from Bini.js!',
    timestamp: new Date().toISOString(),
    method   : c.req.method,
  })
})

export default app`}
                  filename="src/app/api/hello.ts → /api/hello"
                />
                <p className="text-slate-300 mt-4">
                  This handler is reachable at <code className="text-cyan-400">/api/hello</code> in every environment — <code className="text-cyan-400">vite dev</code>, <code className="text-cyan-400">vite preview</code>, and all production platforms — without any changes.
                </p>
              </motion.section>

              {/* Routing with Hono */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Routing with Hono</h2>
                <p className="text-slate-300 mb-4">
                  Hono provides a powerful routing system with path parameters, query parameters, and more:
                </p>
                <CodeBlock 
                  code={`// src/app/api/users.ts → /api/users
import { Hono } from 'hono'

const app = new Hono()

// GET /api/users — list all users
app.get('/users', (c) => {
  return c.json({ users: ['alice', 'bob', 'charlie'] })
})

// GET /api/users/:id — get a specific user
app.get('/users/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ id, name: \`User \${id}\` })
})

// POST /api/users — create a new user
app.post('/users', async (c) => {
  const body = await c.req.json()
  return c.json({ created: body }, { status: 201 })
})

// PUT /api/users/:id — update a user
app.put('/users/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  return c.json({ id, ...body })
})

// DELETE /api/users/:id — delete a user
app.delete('/users/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ message: \`Deleted user \${id}\` })
})

export default app`}
                  filename="src/app/api/users.ts → /api/users"
                />
                <Table 
                  headers={['Method', 'Route Pattern', 'Full URL']}
                  rows={[
                    ['GET', '/users', '/api/users'],
                    ['GET', '/users/:id', '/api/users/123'],
                    ['POST', '/users', '/api/users'],
                    ['PUT', '/users/:id', '/api/users/123'],
                    ['DELETE', '/users/:id', '/api/users/123'],
                  ]}
                />
              </motion.section>

              {/* Dynamic API Routes */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Dynamic API Routes</h2>
                <p className="text-slate-300 mb-4">
                  Use <code className="text-cyan-400">[param]</code> in filenames for dynamic segments, or <code className="text-cyan-400">[...catch]</code> for catch-all routes:
                </p>
                <CodeBlock 
                  code={`// src/app/api/posts/[id].ts → /api/posts/:id
import { Hono } from 'hono'

const app = new Hono()

app.get('/posts/:id', (c) => {
  return c.json({ id: c.req.param('id') })
})

export default app`}
                  filename="src/app/api/posts/[id].ts → /api/posts/:id"
                />
                <CodeBlock 
                  code={`// src/app/api/[...catch].ts → /api/* (catch-all)
import { Hono } from 'hono'

const app = new Hono()

app.all('*', (c) => {
  return c.json({ 
    message: 'Catch-all route',
    path: c.req.path 
  })
})

export default app`}
                  filename="src/app/api/[...catch].ts → /api/*"
                />
              </motion.section>

              {/* Middleware */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Middleware</h2>
                <p className="text-slate-300 mb-4">
                  Hono has built-in middleware for common tasks. Apply them globally or to specific routes:
                </p>
                <CodeBlock 
                  code={`// src/app/api/secure.ts → /api/secure
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { jwt } from 'hono/jwt'
import { prettyJSON } from 'hono/pretty-json'
import { timeout } from 'hono/timeout'

const app = new Hono()

// Global middleware (applies to all routes in this file)
app.use('*', cors())
app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', timeout(5000)) // 5 second timeout

// Route-specific middleware
app.use('/secure/admin/*', jwt({
  secret: 'your-jwt-secret'
}))

// Public routes
app.get('/secure', (c) => c.json({ message: 'Public endpoint' }))

// Protected routes (require JWT)
app.get('/secure/admin/dashboard', (c) => {
  return c.json({ message: 'Admin dashboard' })
})

app.get('/secure/admin/users', (c) => {
  return c.json({ users: [] })
})

export default app`}
                  filename="src/app/api/secure.ts → /api/secure"
                />
                <Table 
                  headers={['Middleware', 'Purpose']}
                  rows={[
                    ['cors', 'Cross-Origin Resource Sharing'],
                    ['logger', 'Request logging with timing'],
                    ['jwt', 'JWT authentication'],
                    ['prettyJSON', 'Pretty-print JSON responses'],
                    ['timeout', 'Request timeout handling'],
                    ['cache', 'Response caching'],
                    ['compress', 'Response compression'],
                    ['etag', 'ETag support for caching'],
                    ['csrf', 'CSRF protection'],
                    ['basicAuth', 'HTTP Basic authentication'],
                    ['bearerAuth', 'Bearer token authentication'],
                  ]}
                />
              </motion.section>

              {/* Request Handling */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Request Handling</h2>
                <p className="text-slate-300 mb-4">
                  Hono provides convenient methods for accessing request data:
                </p>
                <CodeBlock 
                  code={`// src/app/api/echo.ts → /api/echo
import { Hono } from 'hono'

const app = new Hono()

app.all('/echo', async (c) => {
  // Path parameters
  const params = c.req.param()
  
  // Query parameters
  const query = c.req.query()
  const page = c.req.query('page')
  
  // Headers
  const userAgent = c.req.header('User-Agent')
  const auth = c.req.header('Authorization')
  
  // Parse body (JSON, form, text)
  const body = await c.req.parseBody()
  const json = await c.req.json().catch(() => null)
  
  // Request info
  const method = c.req.method
  const url = c.req.url
  const path = c.req.path
  
  // Cookies
  const sessionId = c.req.cookie('sessionId')
  
  return c.json({
    method,
    url,
    path,
    params,
    query: { page, ...query },
    headers: { userAgent, auth },
    body: json || body,
    cookies: { sessionId },
  })
})

export default app`}
                  filename="src/app/api/echo.ts → /api/echo"
                />
              </motion.section>

              {/* Response Handling */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Response Handling</h2>
                <p className="text-slate-300 mb-4">
                  Hono provides flexible response methods:
                </p>
                <CodeBlock 
                  code={`// src/app/api/responses.ts → /api/responses
import { Hono } from 'hono'

const app = new Hono()

// JSON response
app.get('/responses/json', (c) => {
  return c.json({ message: 'Hello JSON' })
})

// JSON with status
app.post('/responses/created', (c) => {
  return c.json({ message: 'Resource created' }, 201)
})

// Text response
app.get('/responses/text', (c) => {
  return c.text('Hello Text')
})

// HTML response
app.get('/responses/html', (c) => {
  return c.html('<h1>Hello HTML</h1>')
})

// Redirect
app.get('/responses/redirect', (c) => {
  return c.redirect('https://example.com', 302)
})

// Custom response
app.get('/responses/custom', (c) => {
  return new Response('Custom response', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'X-Custom-Header': 'value',
    },
  })
})

// Set cookies
app.get('/responses/set-cookie', (c) => {
  c.cookie('sessionId', 'abc123', {
    httpOnly: true,
    secure: true,
    maxAge: 3600,
  })
  return c.json({ message: 'Cookie set' })
})

// Set headers
app.get('/responses/headers', (c) => {
  c.header('Cache-Control', 'max-age=3600')
  c.header('X-Custom', 'value')
  return c.json({ message: 'Headers set' })
})

// Error response
app.get('/responses/error', (c) => {
  return c.json({ error: 'Something went wrong' }, 500)
})

export default app`}
                  filename="src/app/api/responses.ts → /api/responses"
                />
              </motion.section>

              {/* Validation */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Validation</h2>
                <p className="text-slate-300 mb-4">
                  Validate incoming requests with Zod or other validation libraries:
                </p>
                <CodeBlock 
                  code={`// src/app/api/posts.ts → /api/posts
import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()

// Validation schema
const postSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  published: z.boolean().optional().default(false),
})

// Route with validation
app.post('/posts', zValidator('json', postSchema), async (c) => {
  const body = c.req.valid('json')
  
  // body is fully typed and validated
  return c.json({ 
    message: 'Post created',
    post: {
      id: Date.now(),
      ...body,
    }
  }, 201)
})

// Validation with custom error handling
app.post('/posts/custom', zValidator('json', postSchema, (result, c) => {
  if (!result.success) {
    return c.json({
      error: 'Validation failed',
      issues: result.error.issues,
    }, 400)
  }
}), async (c) => {
  const body = c.req.valid('json')
  return c.json({ post: body }, 201)
})

export default app`}
                  filename="src/app/api/posts.ts → /api/posts"
                />
                <Callout type="tip">
                  Install <code>zod</code> and <code>@hono/zod-validator</code> for powerful request validation with TypeScript inference.
                </Callout>
              </motion.section>

              {/* Environment Variables */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Environment Variables</h2>
                <p className="text-slate-300 mb-4">
                  Use <code className="text-cyan-400">getEnv()</code> and <code className="text-cyan-400">requireEnv()</code> from <code className="text-cyan-400">bini-env</code> — both are auto-imported in API routes:
                </p>
                <CodeBlock 
                  code={`// src/app/api/config.ts → /api/config
import { Hono } from 'hono'

const app = new Hono()

app.get('/config', (c) => {
  const ctx = c as any

  // requireEnv throws if the var is missing — fail fast on required config
  const apiKey  = requireEnv(ctx, 'MY_API_KEY')

  // getEnv returns undefined if missing — use ?? to provide a default
  const appName = getEnv(ctx, 'APP_NAME')     ?? 'Bini.js'
  const debug   = getEnv(ctx, 'DEBUG_MODE')  === 'true'

  // Never expose secrets in responses
  return c.json({
    appName,
    debug,
    hasApiKey: !!apiKey,
  })
})

export default app`}
                  filename="src/app/api/config.ts → /api/config"
                />
                <Callout type="info">
                  <strong>Usage pattern:</strong> Cast <code>c</code> once at the top of your handler with <code>const ctx = c as any</code>. Then use <code>requireEnv(ctx, 'KEY')</code> for required vars and <code>getEnv(ctx, 'KEY') ?? 'default'</code> for optional ones.
                </Callout>
              </motion.section>

              {/* Error Handling */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Error Handling</h2>
                <p className="text-slate-300 mb-4">
                  Handle errors gracefully with Hono's error handling:
                </p>
                <CodeBlock 
                  code={`// src/app/api/robust.ts → /api/robust
import { Hono } from 'hono'

const app = new Hono()

// Custom error class
class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 500,
    public code?: string
  ) {
    super(message)
  }
}

// Global error handler
app.onError((err, c) => {
  console.error('API Error:', err)
  
  if (err instanceof ApiError) {
    return c.json({
      error: err.message,
      code: err.code,
    }, err.status)
  }
  
  // Don't leak error details in production
  const isDev = getEnv(c as any, 'NODE_ENV') === 'development'
  
  return c.json({
    error: 'Internal Server Error',
    ...(isDev && { details: err.message }),
  }, 500)
})

// 404 handler
app.notFound((c) => {
  return c.json({
    error: 'Not Found',
    path: c.req.path,
  }, 404)
})

// Example route that throws an error
app.get('/robust/users/:id', async (c) => {
  const id = c.req.param('id')
  
  if (id === 'admin') {
    throw new ApiError('Access denied', 403, 'FORBIDDEN')
  }
  
  const user = await findUser(id)
  
  if (!user) {
    throw new ApiError('User not found', 404, 'NOT_FOUND')
  }
  
  return c.json(user)
})

async function findUser(id: string) {
  // Simulate database lookup
  return id === '123' ? { id, name: 'John' } : null
}

export default app`}
                  filename="src/app/api/robust.ts → /api/robust"
                />
              </motion.section>

              {/* Nested Routes */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Nested Routes with route()</h2>
                <p className="text-slate-300 mb-4">
                  Organize complex APIs with nested sub-routers using Hono's <code className="text-cyan-400">route()</code> method:
                </p>
                <CodeBlock 
                  code={`// src/app/api/index.ts → /api
import { Hono } from 'hono'

const app = new Hono()

// Mount sub-routers
const users = new Hono()
  .get('/users', (c) => c.json({ users: [] }))
  .get('/users/:id', (c) => c.json({ id: c.req.param('id') }))
  .post('/users', async (c) => c.json({ created: await c.req.json() }, 201))

const posts = new Hono()
  .get('/posts', (c) => c.json({ posts: [] }))
  .get('/posts/:id', (c) => c.json({ id: c.req.param('id') }))
  .post('/posts', async (c) => c.json({ created: await c.req.json() }, 201))

// Mount all sub-routers
app.route('/', users)
app.route('/', posts)

export default app`}
                  filename="src/app/api/index.ts → /api"
                />
              </motion.section>

              {/* When to Use Hono vs Plain Handlers */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">When to Use Hono</h2>
                <Table 
                  headers={['Scenario', 'Recommendation']}
                  rows={[
                    ['Multiple endpoints in one file', <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Hono</span>],
                    ['Need middleware (CORS, auth, logging)', <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Hono</span>],
                    ['Complex routing patterns', <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Hono</span>],
                    ['Production APIs with many routes', <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Hono</span>],
                    ['Single endpoint with simple logic', <span className="flex items-center gap-1"><XCircle className="w-3.5 h-3.5 text-rose-400" /> Plain handler</span>],
                    ['Quick prototypes', <span className="flex items-center gap-1"><XCircle className="w-3.5 h-3.5 text-rose-400" /> Plain handler</span>],
                  ]}
                />
              </motion.section>

              {/* Previous / Next Navigation */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }} className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                <Link to="/docs/api-plain" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-500">Previous</div>
                    <div className="text-sm font-medium">Plain Function Handlers</div>
                  </div>
                </Link>
                <Link to="/docs/api-dynamic" className="group flex items-center gap-2 text-right text-slate-400 hover:text-white transition-colors">
                  <div>
                    <div className="text-xs text-slate-500">Next</div>
                    <div className="text-sm font-medium">Dynamic API Routes</div>
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