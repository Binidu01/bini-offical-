// src/pages/docs/api-plain/page.tsx
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
// Plain Function Handlers Page
// ────────────────────────────────────────────────────────────────────────────────
export default function ApiPlainPage() {
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
                <h1 className="text-4xl font-bold text-white mb-2">Plain Function Handlers</h1>
                <p className="text-slate-400 text-sm mb-8">
                  Learn how to create simple API endpoints using plain JavaScript functions in Bini.js.
                </p>
              </motion.div>

              {/* Overview */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <p className="text-slate-300 mb-6">
                  Plain function handlers are the simplest way to create API routes in Bini.js. They're perfect for simple endpoints that don't need complex routing or middleware.
                </p>
                <Callout type="info">
                  <strong>File-based routing:</strong> Your file path determines the API route. A file at <code>src/app/api/hello.ts</code> is served at <code>/api/hello</code>. There are no root <code>/</code> API routes — every file maps to a named route based on its filename.
                </Callout>
              </motion.section>

              {/* Basic Handler */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Basic Handler</h2>
                <p className="text-slate-300 mb-4">
                  Export a default function that receives the <code className="text-cyan-400">Request</code> object. The function name doesn't matter — only the file path determines the route:
                </p>
                <CodeBlock 
                  code={`// src/app/api/hello.ts → /api/hello
export default function handler(req: Request) {
  return Response.json({ message: 'hello', method: req.method })
}`}
                  filename="src/app/api/hello.ts → /api/hello"
                />
                <p className="text-slate-300 mt-4">
                  This creates an endpoint at <code className="text-cyan-400">/api/hello</code> that responds to all HTTP methods. The handler works the same way in <code className="text-cyan-400">vite dev</code>, <code className="text-cyan-400">vite preview</code>, and all production platforms.
                </p>
              </motion.section>

              {/* File-Based Routing Table */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Route Mapping</h2>
                <p className="text-slate-300 mb-4">
                  Your file structure directly maps to API routes:
                </p>
                <Table 
                  headers={['File Path', 'API Route']}
                  rows={[
                    ['src/app/api/hello.ts', '/api/hello'],
                    ['src/app/api/user.ts', '/api/user'],
                    ['src/app/api/posts.ts', '/api/posts'],
                    ['src/app/api/posts/[id].ts', '/api/posts/:id'],
                    ['src/app/api/posts/index.ts', '/api/posts'],
                    ['src/app/api/[...catch].ts', '/api/* (catch-all)'],
                  ]}
                />
              </motion.section>

              {/* Handling Different Methods */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Handling Different HTTP Methods</h2>
                <p className="text-slate-300 mb-4">
                  Check <code className="text-cyan-400">request.method</code> to handle different HTTP verbs:
                </p>
                <CodeBlock 
                  code={`// src/app/api/posts.ts → /api/posts
export default function handler(request: Request) {
  // Handle GET — list all posts
  if (request.method === 'GET') {
    return Response.json({ posts: [] })
  }
  
  // Handle POST — create a new post
  if (request.method === 'POST') {
    return Response.json({ message: 'Post created' }, { status: 201 })
  }
  
  // Handle PUT — update a post
  if (request.method === 'PUT') {
    return Response.json({ message: 'Post updated' })
  }
  
  // Handle DELETE — delete a post
  if (request.method === 'DELETE') {
    return Response.json({ message: 'Post deleted' })
  }
  
  // Method not allowed
  return Response.json(
    { error: 'Method not allowed' }, 
    { status: 405 }
  )
}`}
                  filename="src/app/api/posts.ts → /api/posts"
                />
                <Table 
                  headers={['Method', 'Typical Use']}
                  rows={[
                    ['GET', 'Retrieve data'],
                    ['POST', 'Create new data'],
                    ['PUT', 'Replace existing data'],
                    ['PATCH', 'Partially update data'],
                    ['DELETE', 'Remove data'],
                  ]}
                />
              </motion.section>

              {/* Reading Request Data */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Reading Request Data</h2>
                <p className="text-slate-300 mb-4">
                  Access different parts of the incoming request:
                </p>
                <CodeBlock 
                  code={`// src/app/api/echo.ts → /api/echo
export default async function handler(request: Request) {
  // Parse JSON body
  const body = await request.json().catch(() => null)
  
  // Parse form data
  const formData = await request.formData().catch(() => null)
  
  // Read headers
  const userAgent = request.headers.get('User-Agent')
  const auth = request.headers.get('Authorization')
  
  // Read query parameters
  const url = new URL(request.url)
  const page = url.searchParams.get('page')
  const limit = url.searchParams.get('limit')
  
  // Read cookies
  const cookies = request.headers.get('Cookie')
  
  return Response.json({
    method: request.method,
    url: request.url,
    body,
    formData: formData ? Object.fromEntries(formData) : null,
    headers: { userAgent, auth },
    query: { page, limit },
    cookies,
  })
}`}
                  filename="src/app/api/echo.ts → /api/echo"
                />
              </motion.section>

              {/* Sending Responses */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Sending Responses</h2>
                <p className="text-slate-300 mb-4">
                  Return different types of responses:
                </p>
                <CodeBlock 
                  code={`// src/app/api/responses.ts → /api/responses
export default function handler(request: Request) {
  const type = new URL(request.url).searchParams.get('type')
  
  // JSON response (most common)
  if (type === 'json') {
    return Response.json({ message: 'Hello JSON' })
  }
  
  // Plain text response
  if (type === 'text') {
    return new Response('Hello Text', {
      headers: { 'Content-Type': 'text/plain' }
    })
  }
  
  // HTML response
  if (type === 'html') {
    return new Response('<h1>Hello HTML</h1>', {
      headers: { 'Content-Type': 'text/html' }
    })
  }
  
  // Response with custom status
  if (type === 'created') {
    return Response.json(
      { message: 'Resource created' }, 
      { status: 201 }
    )
  }
  
  // Response with headers
  if (type === 'cached') {
    return Response.json(
      { data: 'cached response' },
      { 
        headers: {
          'Cache-Control': 'max-age=3600',
          'X-Custom-Header': 'value',
        }
      }
    )
  }
  
  // Redirect response
  if (type === 'redirect') {
    return Response.redirect('https://example.com', 302)
  }
  
  // Error response
  return Response.json(
    { error: 'Invalid type parameter' }, 
    { status: 400 }
  )
}`}
                  filename="src/app/api/responses.ts → /api/responses"
                />
              </motion.section>

              {/* Dynamic Routes with Plain Handlers */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Dynamic Routes with Plain Handlers</h2>
                <p className="text-slate-300 mb-4">
                  For dynamic routes (files with <code className="text-cyan-400">[param]</code> in the name), route parameters are passed via the <code className="text-cyan-400">x-bini-params</code> request header as a JSON string:
                </p>
                <CodeBlock 
                  code={`// src/app/api/posts/[id].ts → /api/posts/:id
export default async function handler(request: Request) {
  // Dynamic params are passed in the x-bini-params header
  const paramsHeader = request.headers.get('x-bini-params')
  const params = paramsHeader ? JSON.parse(paramsHeader) : {}
  const id = params.id
  
  if (request.method === 'GET') {
    const post = await getPostById(id)
    
    if (!post) {
      return Response.json(
        { error: 'Post not found' }, 
        { status: 404 }
      )
    }
    
    return Response.json(post)
  }
  
  if (request.method === 'PUT') {
    const body = await request.json()
    const updated = await updatePost(id, body)
    return Response.json(updated)
  }
  
  if (request.method === 'DELETE') {
    await deletePost(id)
    return Response.json({ message: 'Post deleted' })
  }
  
  return Response.json(
    { error: 'Method not allowed' }, 
    { status: 405 }
  )
}

// Mock functions
async function getPostById(id: string) {
  return { id, title: \`Post \${id}\`, content: '...' }
}

async function updatePost(id: string, data: any) {
  return { id, ...data }
}

async function deletePost(id: string) {
  return true
}`}
                  filename="src/app/api/posts/[id].ts → /api/posts/:id"
                />
              </motion.section>

              {/* Catch-all with Plain Handlers */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Catch-all Routes</h2>
                <p className="text-slate-300 mb-4">
                  Handle all unmatched API routes with a catch-all handler using <code className="text-cyan-400">[...catch]</code> in the filename:
                </p>
                <CodeBlock 
                  code={`// src/app/api/[...catch].ts → /api/* (catch-all)
export default function handler(request: Request) {
  const url = new URL(request.url)
  
  return Response.json({
    error: 'Not Found',
    path: url.pathname,
    method: request.method,
    timestamp: new Date().toISOString(),
  }, { status: 404 })
}`}
                  filename="src/app/api/[...catch].ts → /api/*"
                />
              </motion.section>

              {/* Environment Variables */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Environment Variables</h2>
                <p className="text-slate-300 mb-4">
                  Use <code className="text-cyan-400">getEnv()</code> and <code className="text-cyan-400">requireEnv()</code> from <code className="text-cyan-400">bini-env</code> — both are auto-imported in API routes. They read from the Hono request context and work uniformly across all platforms:
                </p>
                <CodeBlock 
                  code={`// src/app/api/config.ts → /api/config
import { getEnv, requireEnv } from 'bini-env'

export default function handler(request: Request) {
  // requireEnv throws if the var is missing
  const apiKey = requireEnv('MY_API_KEY')
  
  // getEnv returns undefined if missing — use ?? for defaults
  const debug = getEnv('DEBUG_MODE') ?? 'false'
  const appName = getEnv('APP_NAME') ?? 'Bini.js'
  
  return Response.json({
    appName,
    debug: debug === 'true',
    hasApiKey: !!apiKey,
  })
}`}
                  filename="src/app/api/config.ts → /api/config"
                />
                <Callout type="info">
                  <strong>Works everywhere:</strong> <code>getEnv</code> and <code>requireEnv</code> read from the Hono request context, which resolves from the correct source on every platform automatically — Node.js, Bun, Deno, Vercel Edge, Netlify Edge, or Cloudflare Workers. No platform-specific code needed. No <code>.env</code> parsing at runtime.
                </Callout>
                <Table 
                  headers={['Function', 'Returns', 'Behavior']}
                  rows={[
                    ['getEnv(key)', 'string | undefined', 'Returns undefined if missing — use ?? for defaults'],
                    ['requireEnv(key)', 'string', 'Throws immediately if missing or empty — fail fast on required config'],
                  ]}
                />
              </motion.section>

              {/* Error Handling */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Error Handling</h2>
                <p className="text-slate-300 mb-4">
                  Properly handle errors in your API routes:
                </p>
                <CodeBlock 
                  code={`// src/app/api/safe.ts → /api/safe
import { getEnv } from 'bini-env'

export default async function handler(request: Request) {
  try {
    // Parse and validate input
    const body = await request.json()
    
    if (!body.email || !body.name) {
      return Response.json(
        { error: 'Missing required fields: email, name' }, 
        { status: 400 }
      )
    }
    
    // Process the request
    const result = await processRequest(body)
    
    return Response.json({ success: true, data: result })
    
  } catch (error: any) {
    console.error('API Error:', error)
    
    // Don't leak error details in production
    const isDev = getEnv('NODE_ENV') === 'development'
    
    return Response.json(
      { 
        error: 'Internal Server Error',
        ...(isDev && { details: error.message })
      }, 
      { status: 500 }
    )
  }
}

async function processRequest(data: any) {
  // Your business logic here
  return { id: Date.now(), ...data }
}`}
                  filename="src/app/api/safe.ts → /api/safe"
                />
              </motion.section>

              {/* When to Use Plain Handlers vs Hono */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">When to Use Plain Handlers</h2>
                <Table 
                  headers={['Scenario', 'Recommendation']}
                  rows={[
                    ['Single endpoint with simple logic', <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Plain handler</span>],
                    ['Quick prototypes', <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Plain handler</span>],
                    ['Simple CRUD operations', <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Plain handler</span>],
                    ['Multiple endpoints in one file', <span className="flex items-center gap-1"><XCircle className="w-3.5 h-3.5 text-rose-400" /> Use Hono</span>],
                    ['Need middleware (CORS, auth, logging)', <span className="flex items-center gap-1"><XCircle className="w-3.5 h-3.5 text-rose-400" /> Use Hono</span>],
                    ['Complex routing patterns', <span className="flex items-center gap-1"><XCircle className="w-3.5 h-3.5 text-rose-400" /> Use Hono</span>],
                    ['Production APIs with many routes', <span className="flex items-center gap-1"><XCircle className="w-3.5 h-3.5 text-rose-400" /> Use Hono</span>],
                  ]}
                />
                <Callout type="tip">
                  Start with plain handlers for simple endpoints. Switch to Hono when you need middleware, complex routing, or better organization.
                </Callout>
              </motion.section>

              {/* Complete Example */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Complete Example</h2>
                <p className="text-slate-300 mb-4">
                  A full-featured plain function handler with validation, error handling, and multiple methods:
                </p>
                <CodeBlock 
                  code={`// src/app/api/todos.ts → /api/todos
import { getEnv } from 'bini-env'

interface Todo {
  id: string
  title: string
  completed: boolean
}

// In-memory storage (use a real database in production)
const todos: Todo[] = []

export default async function handler(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  
  try {
    // GET /api/todos — list all todos
    if (request.method === 'GET' && !id) {
      return Response.json(todos)
    }
    
    // GET /api/todos?id=123 — get single todo
    if (request.method === 'GET' && id) {
      const todo = todos.find(t => t.id === id)
      if (!todo) {
        return Response.json({ error: 'Todo not found' }, { status: 404 })
      }
      return Response.json(todo)
    }
    
    // POST /api/todos — create a new todo
    if (request.method === 'POST') {
      const body = await request.json()
      
      // Validation
      if (!body.title || typeof body.title !== 'string') {
        return Response.json(
          { error: 'Title is required and must be a string' }, 
          { status: 400 }
        )
      }
      
      const todo: Todo = {
        id: Date.now().toString(),
        title: body.title,
        completed: body.completed ?? false,
      }
      
      todos.push(todo)
      return Response.json(todo, { status: 201 })
    }
    
    // PUT /api/todos?id=123 — update a todo
    if (request.method === 'PUT' && id) {
      const body = await request.json()
      const index = todos.findIndex(t => t.id === id)
      
      if (index === -1) {
        return Response.json({ error: 'Todo not found' }, { status: 404 })
      }
      
      todos[index] = { ...todos[index], ...body }
      return Response.json(todos[index])
    }
    
    // DELETE /api/todos?id=123 — delete a todo
    if (request.method === 'DELETE' && id) {
      const index = todos.findIndex(t => t.id === id)
      
      if (index === -1) {
        return Response.json({ error: 'Todo not found' }, { status: 404 })
      }
      
      todos.splice(index, 1)
      return Response.json({ message: 'Todo deleted' })
    }
    
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
    
  } catch (error: any) {
    const isDev = getEnv('NODE_ENV') === 'development'
    console.error('Todos API Error:', error)
    return Response.json(
      { 
        error: 'Internal Server Error',
        ...(isDev && { details: error.message })
      }, 
      { status: 500 }
    )
  }
}`}
                  filename="src/app/api/todos.ts → /api/todos"
                />
              </motion.section>

              {/* Previous / Next Navigation */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                <Link to="/docs/api-routes" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-500">Previous</div>
                    <div className="text-sm font-medium">API Routes Overview</div>
                  </div>
                </Link>
                <Link to="/docs/api-hono" className="group flex items-center gap-2 text-right text-slate-400 hover:text-white transition-colors">
                  <div>
                    <div className="text-xs text-slate-500">Next</div>
                    <div className="text-sm font-medium">Hono Integration</div>
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