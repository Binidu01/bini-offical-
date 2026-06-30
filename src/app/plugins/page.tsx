// src/app/plugins/page.tsx
import React from 'react'
import { motion } from 'framer-motion'
import {
  Info,
  ExternalLink,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Header, Footer } from '../../components/Layout'
import {
  siGithub,
  siNpm,
} from 'simple-icons'
import type { SimpleIcon as SimpleIconType } from 'simple-icons'

// Simple Icon component
function SimpleIcon({ 
  icon, 
  className = "", 
  size = 14 
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
// Callout Component
// ────────────────────────────────────────────────────────────────────────────────
function Callout({ type, children }: { type: 'info' | 'note'; children: React.ReactNode }) {
  const styles = {
    info: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', color: 'text-cyan-400' },
    note: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', color: 'text-amber-400' },
  }
  const style = styles[type]

  return (
    <div className={`p-4 rounded-lg ${style.bg} border ${style.border} my-6`}>
      <div className="flex items-center gap-2 mb-1">
        <Info className={`w-4 h-4 ${style.color}`} />
        <p className={`text-sm font-medium uppercase ${style.color}`}>
          {type === 'info' ? 'Note' : 'Note'}
        </p>
      </div>
      <div className="text-sm text-slate-300 [&>strong]:text-white [&>code]:text-cyan-400 [&>code]:bg-slate-800 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded">{children}</div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Plugin Card Component (for Bini.js official packages)
// ────────────────────────────────────────────────────────────────────────────────
function PluginCard({ 
  name, 
  description, 
  href,
  githubRepo,
  official = false,
}: { 
  name: string
  description: string
  href?: string
  githubRepo?: string
  official?: boolean
}) {
  return (
    <div className="p-6 rounded-xl border border-slate-800 bg-[#0a0a0a] hover:border-slate-700 transition-all h-full flex flex-col">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2 flex-wrap mb-2">
          {name}
          {official && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Official
            </span>
          )}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
        {href && (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <SimpleIcon icon={siNpm} className="text-cyan-400" size={14} />
            npm
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
        {githubRepo && (
          <a 
            href={`https://github.com/Binidu01/${githubRepo}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <SimpleIcon icon={siGithub} size={14} />
            GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Community Card Component (npm only)
// ────────────────────────────────────────────────────────────────────────────────
function CommunityCard({ 
  name, 
  description, 
  npmUrl,
}: { 
  name: string
  description: string
  npmUrl?: string
}) {
  return (
    <div className="p-6 rounded-xl border border-slate-800 bg-[#0a0a0a] hover:border-slate-700 transition-all h-full flex flex-col">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
      {npmUrl && (
        <div className="mt-4 pt-3 border-t border-slate-800">
          <a 
            href={npmUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <SimpleIcon icon={siNpm} className="text-cyan-400" size={14} />
            npm
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Section Component
// ────────────────────────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">
        {title}
      </h2>
      {children}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Plugins Page
// ────────────────────────────────────────────────────────────────────────────────
export default function PluginsPage() {
  return (
    <div className="min-h-screen bg-black font-sans antialiased overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-300 h-200 bg-linear-to-b from-cyan-500/5 via-sky-500/3 to-transparent rounded-full blur-3xl" />
      </div>

      <Header />

      <div className="relative pt-24 lg:pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Plugins & Packages</h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              The complete Bini.js ecosystem — everything you need to build modern web applications.
            </p>
          </motion.div>

          {/* Note */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Callout type="note">
              Bini.js is built on Vite and aims to provide out-of-the-box support for common web development patterns. 
              Before searching for a plugin, check out the <Link to="/docs" className="text-cyan-400 hover:underline">documentation</Link>. 
              Many cases where a plugin would be needed in other projects are already covered in Bini.js by default.
            </Callout>
          </motion.div>

          {/* Core Framework */}
          <Section title="Core Framework">
            <p className="text-slate-300 mb-6">
              The main package that scaffolds a complete Bini.js project.
            </p>
            <div className="max-w-2xl">
              <PluginCard
                name="create-bini-app"
                description="The Zero-Config React Framework for the Modern Web. One command to create a complete Bini.js project with routing, API routes, and deployment configuration."
                href="https://www.npmjs.com/package/create-bini-app"
                githubRepo="bini-cli"
                official
              />
            </div>
          </Section>

          {/* Official Plugins */}
          <Section title="Official Plugins">
            <p className="text-slate-300 mb-6">
              These plugins are automatically included and configured in every Bini.js project.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <PluginCard
                name="bini-router"
                description="File-based routing, nested layouts, auto-imports, and Hono-powered API routes for Vite + React. The heart of Bini.js routing."
                href="https://www.npmjs.com/package/bini-router"
                githubRepo="bini-router"
                official
              />
              <PluginCard
                name="bini-env"
                description="Universal environment variable loader and Vite plugin. Works in Node.js, Deno, Bun, and Vite edge functions without leaking secrets."
                href="https://www.npmjs.com/package/bini-env"
                githubRepo="bini-env"
                official
              />
              <PluginCard
                name="bini-server"
                description="Zero-dependency production server for bini-router apps. Serves static files, handles API routes, and provides SPA fallback with ETag support."
                href="https://www.npmjs.com/package/bini-server"
                githubRepo="bini-server"
                official
              />
              <PluginCard
                name="bini-overlay"
                description="Next.js-style error overlay and animated loading badge. Shows Bini.js logo during development and morphs into a full error panel."
                href="https://www.npmjs.com/package/bini-overlay"
                githubRepo="bini-overlay"
                official
              />
            </div>
          </Section>

          {/* Additional Plugins */}
          <Section title="Additional Plugins">
            <p className="text-slate-300 mb-6">
              Optional plugins maintained by the Bini.js team for specific deployment scenarios.
            </p>
            <div className="max-w-2xl">
              <PluginCard
                name="bini-export"
                description="Static SPA export for bini-router. Pre-renders routes, generates 404.html, and strips platform files for GitHub Pages and other fully static hosts."
                href="https://www.npmjs.com/package/bini-export"
                githubRepo="bini-export"
                official
              />
            </div>
          </Section>

          {/* Built-in Vite Plugins */}
          <Section title="Built-in Vite Plugins">
            <p className="text-slate-300 mb-4">
              Plugins are added in <code className="text-cyan-400">vite.config.ts</code> under the <code className="text-cyan-400">plugins</code> array:
            </p>
            <pre className="bg-[#0a0a0a] border border-slate-700 rounded-lg p-4 overflow-x-auto mb-6">
              <code className="text-sm font-mono text-slate-200">
{`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { biniroute } from 'bini-router'
import { biniEnv } from 'bini-env'

export default defineConfig({
  plugins: [
    react(),           // React Fast Refresh
    biniEnv(),         // Environment variables
    biniroute(),       // File-based routing & API routes
    // Add more plugins here
  ],
})`}
              </code>
            </pre>
            <p className="text-slate-300 mb-6">
              These Vite plugins are automatically included based on your project configuration:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <CommunityCard
                name="@vitejs/plugin-react"
                description="Provides React Fast Refresh support. Automatically configured in every Bini.js project."
                npmUrl="https://www.npmjs.com/package/@vitejs/plugin-react"
              />
              <CommunityCard
                name="@tailwindcss/vite"
                description="Tailwind CSS v4 Vite plugin. Zero-config — just works. Included when you select Tailwind during project creation."
                npmUrl="https://www.npmjs.com/package/@tailwindcss/vite"
              />
            </div>
          </Section>

          {/* Compatible Community Plugins */}
          <Section title="Compatible Community Plugins">
            <p className="text-slate-300 mb-6">
              Bini.js is compatible with most Vite and Rollup plugins. Here are some popular ones:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <CommunityCard
                name="vite-plugin-pwa"
                description="Zero-config PWA plugin. Adds service worker and manifest support for offline capabilities."
                npmUrl="https://www.npmjs.com/package/vite-plugin-pwa"
              />
              <CommunityCard
                name="vite-plugin-svgr"
                description="Transform SVGs into React components. Import SVGs directly as components."
                npmUrl="https://www.npmjs.com/package/vite-plugin-svgr"
              />
              <CommunityCard
                name="vite-plugin-compression"
                description="Compress your bundle with Gzip or Brotli. Reduces bundle size for faster loading."
                npmUrl="https://www.npmjs.com/package/vite-plugin-compression"
              />
              <CommunityCard
                name="rollup-plugin-visualizer"
                description="Visualize and analyze your bundle. See which packages take up the most space."
                npmUrl="https://www.npmjs.com/package/rollup-plugin-visualizer"
              />
            </div>
            <Callout type="info">
              <strong>Most Vite plugins work with Bini.js.</strong> Check the{' '}
              <a href="https://github.com/vitejs/awesome-vite#plugins" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                Awesome Vite <ExternalLink className="w-3 h-3" />
              </a>{' '}
              list for more community plugins.
            </Callout>
          </Section>

          {/* Hono Middleware & Plugins */}
          <Section title="Hono Middleware & Plugins">
            <p className="text-slate-300 mb-6">
              Bini.js uses Hono for API routes. You can use any Hono middleware in your <code className="text-cyan-400">src/app/api/</code> files.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <CommunityCard
                name="hono/cors"
                description="Cross-Origin Resource Sharing middleware for Hono. Enable CORS for your API routes."
                npmUrl="https://www.npmjs.com/package/hono"
              />
              <CommunityCard
                name="hono/jwt"
                description="JWT authentication middleware. Protect your API routes with JSON Web Tokens."
                npmUrl="https://www.npmjs.com/package/hono"
              />
              <CommunityCard
                name="hono/logger"
                description="Simple logging middleware. Log incoming requests with method, path, and response time."
                npmUrl="https://www.npmjs.com/package/hono"
              />
              <CommunityCard
                name="@hono/zod-validator"
                description="Zod validation middleware for Hono. Validate request body, query, and headers with Zod schemas."
                npmUrl="https://www.npmjs.com/package/@hono/zod-validator"
              />
            </div>
            <Callout type="info">
              <strong>All Hono middleware works in Bini.js API routes.</strong> Import them directly from <code>hono</code> or install additional packages like{' '}
              <code>@hono/zod-validator</code>. See the{' '}
              <a href="https://hono.dev/docs/middleware/builtin/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                Hono middleware documentation <ExternalLink className="w-3 h-3" />
              </a>{' '}
              for the complete list.
            </Callout>
            <p className="text-slate-300 mt-4">
              Example of using Hono middleware in an API route:
            </p>
            <pre className="bg-[#0a0a0a] border border-slate-700 rounded-lg p-4 overflow-x-auto mt-4">
              <code className="text-sm font-mono text-slate-200">
{`// src/app/api/secure.ts
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'
import { logger } from 'hono/logger'

const app = new Hono()

app.use('*', cors())
app.use('*', logger())
app.use('/admin/*', jwt({ secret: process.env.JWT_SECRET! }))

app.get('/', (c) => c.json({ message: 'API with middleware' }))

export default app`}
              </code>
            </pre>
          </Section>

        </div>
      </div>

      <Footer />
    </div>
  )
}