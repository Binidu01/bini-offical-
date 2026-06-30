// src/pages/docs/tailwind/page.tsx
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
// Tailwind CSS Page
// ────────────────────────────────────────────────────────────────────────────────
export default function TailwindPage() {
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
                <h1 className="text-4xl font-bold text-white mb-2">Tailwind CSS</h1>
                <p className="text-slate-400 text-sm mb-8">
                  Learn how to use Tailwind CSS v4 in your Bini.js application with zero configuration.
                </p>
              </motion.div>

              {/* Overview */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <p className="text-slate-300 mb-6">
                  Tailwind CSS v4 is the default styling option in Bini.js. It's pre-configured using the official Vite plugin — no PostCSS configuration needed.
                </p>
                <Callout type="info">
                  <strong>Zero Configuration:</strong> Bini.js uses the <code>@tailwindcss/vite</code> plugin. Everything works out of the box — no <code>postcss.config.js</code> or <code>tailwind.config.js</code> required.
                </Callout>
              </motion.section>

              {/* Setup */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Setup</h2>
                <p className="text-slate-300 mb-4">
                  When you create a new Bini.js project with Tailwind, everything is configured automatically:
                </p>
                <CodeBlock 
                  code={`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { biniroute } from 'bini-router'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // Automatically added
    biniroute(),
  ],
})`}
                  filename="vite.config.ts"
                />
                <CodeBlock 
                  code={`/* src/app/globals.css */
@import 'tailwindcss';`}
                  filename="app/globals.css"
                />
              </motion.section>

              {/* Basic Usage */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Basic Usage</h2>
                <p className="text-slate-300 mb-4">
                  Use Tailwind's utility classes directly in your components:
                </p>
                <CodeBlock 
                  code={`// src/app/page.tsx
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <h1 className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
        Welcome to Bini.js
      </h1>
      <p className="mt-4 text-lg text-slate-400">
        Styled with Tailwind CSS v4
      </p>
      <button className="mt-6 rounded-lg bg-cyan-500 px-4 py-2 font-medium text-black hover:bg-cyan-400 transition-colors">
        Get Started
      </button>
    </div>
  )
}`}
                  filename="app/page.tsx"
                />
              </motion.section>

              {/* Tailwind v4 Features */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Tailwind CSS v4 Features</h2>
                <p className="text-slate-300 mb-4">
                  Tailwind v4 introduces several improvements over v3:
                </p>
                <Table 
                  headers={['Feature', 'Description']}
                  rows={[
                    ['Vite Plugin', 'Native Vite integration — no PostCSS config needed'],
                    ['CSS-first config', 'Configure via CSS variables instead of JS'],
                    ['Lightning CSS', 'Faster builds with Lightning CSS'],
                    ['Simplified setup', 'Just @import "tailwindcss" — that\'s it'],
                    ['Modern syntax', 'Uses modern CSS features like @layer, @theme'],
                  ]}
                />
              </motion.section>

              {/* Theming with CSS Variables */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Theming with CSS Variables</h2>
                <p className="text-slate-300 mb-4">
                  Tailwind v4 uses CSS variables for theming. Customize colors, fonts, and more:
                </p>
                <CodeBlock 
                  code={`/* src/app/globals.css */
@import 'tailwindcss';

@theme {
  --color-primary: #06b6d4;
  --color-primary-dark: #0891b2;
  --color-secondary: #8b5cf6;
  --color-accent: #f59e0b;
  
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  --spacing-container: 1200px;
  --radius-card: 1rem;
}

@layer base {
  body {
    @apply bg-black text-white antialiased;
  }
}`}
                  filename="app/globals.css"
                />
                <p className="text-slate-300 mt-4">
                  Use your custom theme values:
                </p>
                <CodeBlock 
                  code={`// src/app/components/Card.tsx
export function Card({ children }) {
  return (
    <div className="rounded-(--radius-card) bg-linear-to-r from-primary to-primary-dark p-6">
      {children}
    </div>
  )
}`}
                  filename="Card.tsx"
                />
              </motion.section>

              {/* Responsive Design */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Responsive Design</h2>
                <p className="text-slate-300 mb-4">
                  Use Tailwind's responsive prefixes to adapt your layout:
                </p>
                <CodeBlock 
                  code={`// src/app/page.tsx
export default function ResponsivePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg bg-slate-900 p-4">
            <h2 className="text-lg font-semibold text-white sm:text-xl lg:text-2xl">
              Card {i + 1}
            </h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Responsive card content
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}`}
                  filename="app/page.tsx"
                />
                <Table 
                  headers={['Breakpoint', 'Min Width']}
                  rows={[
                    ['sm', '640px'],
                    ['md', '768px'],
                    ['lg', '1024px'],
                    ['xl', '1280px'],
                    ['2xl', '1536px'],
                  ]}
                />
              </motion.section>

              {/* Dark Mode */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Dark Mode</h2>
                <p className="text-slate-300 mb-4">
                  Tailwind v4 supports dark mode out of the box using the <code className="text-cyan-400">dark:</code> variant:
                </p>
                <CodeBlock 
                  code={`// src/app/components/ThemeToggle.tsx
export function ThemeToggle() {
  return (
    <div className="rounded-lg bg-white p-4 dark:bg-slate-900">
      <h2 className="text-slate-900 dark:text-white">
        Theme Aware Component
      </h2>
      <p className="text-slate-600 dark:text-slate-400">
        This text adapts to light and dark mode
      </p>
      <button className="mt-4 rounded-md bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-500">
        Toggle Theme
      </button>
    </div>
  )
}`}
                  filename="ThemeToggle.tsx"
                />
              </motion.section>

              {/* Custom Utilities */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Custom Utilities</h2>
                <p className="text-slate-300 mb-4">
                  Create custom utilities using <code className="text-cyan-400">@utility</code>:
                </p>
                <CodeBlock 
                  code={`/* src/app/globals.css */
@import 'tailwindcss';

@utility text-gradient {
  background: linear-gradient(to right, var(--tw-gradient-stops));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@utility card-hover {
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
}`}
                  filename="app/globals.css"
                />
                <CodeBlock 
                  code={`// Using custom utilities
export function FeatureCard() {
  return (
    <div className="card-hover rounded-lg bg-slate-900 p-6">
      <h3 className="text-gradient from-cyan-400 to-blue-500 text-xl font-bold">
        Custom Utility
      </h3>
    </div>
  )
}`}
                />
              </motion.section>

              {/* Common Patterns */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Common Patterns</h2>
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">Container</h3>
                <CodeBlock 
                  code={`<div className="container mx-auto px-4">
  {/* Content */}
</div>`}
                />
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">Flex Center</h3>
                <CodeBlock 
                  code={`<div className="flex items-center justify-center">
  {/* Centered content */}
</div>`}
                />
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">Grid Layout</h3>
                <CodeBlock 
                  code={`<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* Grid items */}
</div>`}
                />
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">Sticky Header</h3>
                <CodeBlock 
                  code={`<header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm">
  {/* Header content */}
</header>`}
                />
                
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">Button Styles</h3>
                <CodeBlock 
                  code={`// Primary button
<button className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-black hover:bg-cyan-400 transition-colors">
  Primary
</button>

// Secondary button
<button className="rounded-lg border border-slate-700 px-4 py-2 font-medium text-white hover:bg-slate-900 transition-colors">
  Secondary
</button>

// Ghost button
<button className="rounded-lg px-4 py-2 font-medium text-slate-400 hover:text-white transition-colors">
  Ghost
</button>`}
                />
              </motion.section>

              {/* Best Practices */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Best Practices</h2>
                <ul className="space-y-3 text-slate-300 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Use semantic class ordering</strong> — Layout → Sizing → Spacing → Typography → Visuals.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Extract repeated patterns</strong> — Use components for repeated UI patterns.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Use CSS variables for theming</strong> — Makes dark mode and customization easy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Leverage @utility</strong> — Create custom utilities for project-specific patterns.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Use arbitrary values sparingly</strong> — Prefer theme values over <code>w-[327px]</code>.</span>
                  </li>
                </ul>
              </motion.section>

              {/* Previous / Next Navigation */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                <Link to="/docs/css" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-500">Previous</div>
                    <div className="text-sm font-medium">CSS Overview</div>
                  </div>
                </Link>
                <Link to="/docs/css-modules" className="group flex items-center gap-2 text-right text-slate-400 hover:text-white transition-colors">
                  <div>
                    <div className="text-xs text-slate-500">Next</div>
                    <div className="text-sm font-medium">CSS Modules</div>
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