// src/pages/docs/installation/page.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  Smartphone,
  Laptop,
  Globe,
  Cpu,
  Boxes,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Layout'
import { DocLayout } from '../../components/DocSidebar'

// ────────────────────────────────────────────────────────────────────────────────
// Dynamic Terminal Component
// ────────────────────────────────────────────────────────────────────────────────
function DynamicTerminal() {
  const [activeTab, setActiveTab] = useState('npm')
  const [copied, setCopied] = useState(false)

  const tabs = [
    { id: 'npm', label: 'npm', command: `npx create-bini-app@latest my-app\ncd my-app\nnpm run dev` },
    { id: 'pnpm', label: 'pnpm', command: `pnpm create bini-app@latest my-app\ncd my-app\npnpm dev` },
    { id: 'yarn', label: 'yarn', command: `yarn create bini-app@latest my-app\ncd my-app\nyarn dev` },
    { id: 'bun', label: 'bun', command: `bun create bini-app@latest my-app\ncd my-app\nbun dev` },
  ]

  const handleCopy = () => {
    const command = tabs.find(t => t.id === activeTab)?.command || ''
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mb-6">
      <div className="rounded-lg overflow-hidden border border-slate-700 bg-[#0a0a0a] shadow-2xl">
        <div className="flex items-center justify-between px-3 py-2 bg-[#1a1a1a] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          
          <div className="flex items-center gap-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-slate-800 transition-colors"
            aria-label="Copy command"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 text-sm">$</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeTab}
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.15 }}
                className="text-slate-200 font-mono text-sm whitespace-pre"
              >
                {tabs.find(t => t.id === activeTab)?.command}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Simple Terminal Component
// ────────────────────────────────────────────────────────────────────────────────
function SimpleTerminal({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg overflow-hidden border border-slate-700 bg-[#0a0a0a] shadow-2xl mb-6">
      <div className="flex items-center justify-between px-3 py-2 bg-[#1a1a1a] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        
        <button
          onClick={handleCopy}
          className="p-1 rounded hover:bg-slate-800 transition-colors"
          aria-label="Copy command"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-slate-500" />
          )}
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 text-sm">$</span>
          <span className="text-slate-200 font-mono text-sm whitespace-pre">{code}</span>
        </div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Prompt Terminal Component
// ────────────────────────────────────────────────────────────────────────────────
function PromptTerminal({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg overflow-hidden border border-slate-700 bg-[#0a0a0a] shadow-2xl mb-6">
      <div className="flex items-center justify-between px-3 py-2 bg-[#1a1a1a] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-xs text-slate-400 font-mono ml-2">Terminal</span>
        </div>
        
        <button
          onClick={handleCopy}
          className="p-1 rounded hover:bg-slate-800 transition-colors"
          aria-label="Copy command"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-slate-500" />
          )}
        </button>
      </div>
      
      <div className="p-4">
        <div className="text-slate-200 font-mono text-sm whitespace-pre">{code}</div>
      </div>
    </div>
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
        {copied ? <CheckCircle className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
      </button>
      <pre className={`bg-[#0a0a0a] border border-slate-700 ${filename ? 'rounded-t-none' : 'rounded-lg'} p-4 overflow-x-auto`}>
        <code className="text-sm font-mono text-slate-200">{code}</code>
      </pre>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Callout Component
// ────────────────────────────────────────────────────────────────────────────────
function Callout({ type, children }: { type: 'info' | 'warning' | 'success' | 'tip'; children: React.ReactNode }) {
  const styles = {
    info: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', icon: Info, color: 'text-cyan-400' },
    warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: AlertTriangle, color: 'text-amber-400' },
    success: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: CheckCircle, color: 'text-emerald-400' },
    tip: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', icon: Sparkles, color: 'text-purple-400' },
  }
  const style = styles[type]
  const Icon = style.icon

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg ${style.bg} border ${style.border} my-6`}>
      <Icon className={`w-5 h-5 ${style.color} shrink-0 mt-0.5`} />
      <div className="text-sm text-slate-200 [&>strong]:text-white [&>code]:text-cyan-400 [&>code]:bg-slate-800 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded">{children}</div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Table Component
// ────────────────────────────────────────────────────────────────────────────────
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
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
// Installation Page
// ────────────────────────────────────────────────────────────────────────────────
export default function InstallationPage() {
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
                <h1 className="text-4xl font-bold text-white mb-2">Installation</h1>
                <p className="text-slate-400 text-sm mb-8">Create a new Bini.js app and run it locally.</p>
              </motion.div>

              {/* Quick start */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Quick start</h2>
                <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-1">
                  <li>Create a new Bini.js app named <code className="text-cyan-400">my-app</code></li>
                  <li><code className="text-cyan-400">cd my-app</code> and start the dev server.</li>
                  <li>Visit <code className="text-cyan-400">http://localhost:3000</code>.</li>
                </ol>
                
                <DynamicTerminal />
                
                <p className="text-slate-400 text-sm mb-8">
                  The default setup enables TypeScript, Tailwind CSS, Oxlint, App Router, with import alias <code className="text-cyan-400">@/*</code>.
                </p>
              </motion.section>

              {/* Native Platform Support Section - NEW */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Native Platform Support</h2>
                <p className="text-slate-300 mb-4">
                  Bini.js lets you build for multiple platforms from a single codebase. Use the <code className="text-cyan-400">--platform</code> flag to target your desired platform during scaffold:
                </p>

                <CodeBlock 
                  code={`npx create-bini-app@latest my-app --platform macos\nnpx create-bini-app@latest my-app --platform android --app-name "My App" --nosign\nnpx create-bini-app@latest my-app --platform windows`}
                />

                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  <div className="p-4 rounded-xl border border-slate-700 bg-[#0a0a0a] hover:border-slate-600 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4 text-cyan-400" />
                      <span className="text-white font-medium text-sm">Web</span>
                    </div>
                    <p className="text-slate-400 text-xs">Default target — Vite + React SPA with Hono API layer</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-700 bg-[#0a0a0a] hover:border-slate-600 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Laptop className="w-4 h-4 text-cyan-400" />
                      <span className="text-white font-medium text-sm">Desktop</span>
                    </div>
                    <p className="text-slate-400 text-xs">Windows, macOS, Linux — real native binaries via Tauri</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-700 bg-[#0a0a0a] hover:border-slate-600 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Smartphone className="w-4 h-4 text-cyan-400" />
                      <span className="text-white font-medium text-sm">Mobile</span>
                    </div>
                    <p className="text-slate-400 text-xs">Android & iOS — real native apps, not WebView wrappers</p>
                  </div>
                </div>

                <Callout type="tip">
                  <strong>One codebase, every target.</strong> The same routes, API handlers, and components compile to a web app, a desktop binary, or a mobile app. Nothing is emulated or wrapped — desktop and mobile builds are real Tauri apps.
                </Callout>
              </motion.section>

              {/* System requirements */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">System requirements</h2>
                <p className="text-slate-300 mb-4">Before you begin, make sure your development environment meets the following requirements:</p>
                <ul className="space-y-2 text-slate-300 mb-6 list-disc list-inside">
                  <li>Minimum Node.js version: <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">20.19.0</a></li>
                  <li>Operating systems: macOS, Windows, and Linux.</li>
                  <li>For desktop builds: <span className="text-white">Windows</span> (C++ Build Tools), <span className="text-white">macOS</span> (Xcode CLT), <span className="text-white">Linux</span> (WebKitGTK)</li>
                  <li>For mobile builds: <span className="text-white">Android</span> (JDK 17, Android Studio), <span className="text-white">iOS</span> (Xcode, CocoaPods)</li>
                </ul>
              </motion.section>

              {/* Supported browsers */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Supported browsers</h2>
                <p className="text-slate-300 mb-4">Bini.js supports modern browsers with zero configuration.</p>
                <ul className="space-y-1 text-slate-300 mb-2 list-disc list-inside">
                  <li>Chrome 111+</li>
                  <li>Edge 111+</li>
                  <li>Firefox 111+</li>
                  <li>Safari 16.4+</li>
                </ul>
                <p className="text-slate-400 text-sm mb-8">
                  Learn more about browser support, including how to configure polyfills and target specific browsers.
                </p>
              </motion.section>

              {/* Create with the CLI */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Create with the CLI</h2>
                <p className="text-slate-300 mb-4">
                  The quickest way to create a new Bini.js app is using <code className="text-cyan-400">create-bini-app</code>, which sets up everything automatically for you. To create a project, run:
                </p>
                
                <SimpleTerminal code="npx create-bini-app@latest" />
                
                <p className="text-slate-300 mt-6">On installation, you'll see the following prompts:</p>
                <PromptTerminal 
                  code={`What is your project named? my-app\nWould you like to use TypeScript? No / Yes\nWould you like to use Tailwind CSS? No / Yes (CSS Modules) / None\nWhich platform would you like to target? web / windows / macos / linux / android / ios`}
                />
                
                <p className="text-slate-300 mt-6">After the prompts, <code className="text-cyan-400">create-bini-app</code> will create a folder with your project name and install the required dependencies.</p>
              </motion.section>

              {/* Run the development server */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Run the development server</h2>
                <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-1">
                  <li>Run <code className="text-cyan-400">npm run dev</code> to start the development server.</li>
                  <li>Visit <code className="text-cyan-400">http://localhost:3000</code> to view your application.</li>
                  <li>Edit the <code className="text-cyan-400">app/page.tsx</code> file and save it to see the updated result in your browser.</li>
                </ol>
              </motion.section>

              {/* CLI Flags - Updated with platform flags */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">CLI Flags</h2>
                <p className="text-slate-300 mb-4">Skip prompts by passing flags directly:</p>
                <CodeBlock code={`npx create-bini-app@latest my-app --typescript --tailwind\nnpx create-bini-app@latest my-app --javascript --css-modules\nnpx create-bini-app@latest my-app --platform macos\nnpx create-bini-app@latest my-app --platform android --app-name "My App" --nosign\nnpx create-bini-app@latest my-app --none\nnpx create-bini-app@latest my-app --force\nnpx create-bini-app@latest my-app --install`} />
                <Table 
                  headers={['Flag', 'Description']} 
                  rows={[
                    ['--typescript', 'Use TypeScript (default)'],
                    ['--javascript', 'Use JavaScript'],
                    ['--tailwind', 'Use Tailwind CSS (default)'],
                    ['--css-modules', 'Use CSS Modules'],
                    ['--none', 'No styling — clean slate'],
                    ['--platform <target>', 'web · windows · macos · linux · android · ios'],
                    ['--app-name <name>', 'Display name — desktop/mobile app name and window title'],
                    ['--sign / --nosign', 'Auto-confirm or skip code-signing setup'],
                    ['--npm / --pnpm / --yarn / --bun', 'Force a specific package manager'],
                    ['--install / --no-install', 'Install dependencies without prompting'],
                    ['--force', 'Overwrite existing directory'],
                    ['--version, -v', 'Print CLI version'],
                    ['--help, -h', 'Show help'],
                  ]} 
                />
                <Callout type="info">
                  In non-interactive mode (CI), the CLI skips prompts and uses defaults: TypeScript, Tailwind CSS, and the <code className="text-cyan-400">web</code> platform. Pass flags to override.
                </Callout>
              </motion.section>

              {/* Set up TypeScript */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Set up TypeScript</h2>
                <p className="text-slate-400 text-sm mb-4">Minimum TypeScript version: v5.1.0</p>
                <p className="text-slate-300 mb-4">
                  Bini.js comes with built-in TypeScript support. To add TypeScript to your project, rename a file to <code className="text-cyan-400">.ts</code> / <code className="text-cyan-400">.tsx</code> and run <code className="text-cyan-400">npm run dev</code>. Bini.js will automatically install the necessary dependencies and add a <code className="text-cyan-400">tsconfig.json</code> file with the recommended config options.
                </p>
              </motion.section>

              {/* Set up linting */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Set up linting</h2>
                <p className="text-slate-300 mb-4">Bini.js uses Oxlint for linting and Oxfmt for formatting — pre-configured and ready to use.</p>
                <CodeBlock 
                  code={`{\n  "scripts": {\n    "lint": "oxlint",\n    "format": "oxfmt",\n    "check": "npm run lint && npm run format"\n  }\n}`}
                  filename="package.json"
                />
                <p className="text-slate-400 text-sm mt-4">
                  These scripts refer to the different stages of developing an application:
                </p>
                <ul className="space-y-1 text-slate-300 mb-6 list-disc list-inside">
                  <li><code className="text-cyan-400">npm run lint</code>: Runs Oxlint (50-100× faster than ESLint).</li>
                  <li><code className="text-cyan-400">npm run format</code>: Runs Oxfmt (Prettier-compatible).</li>
                  <li><code className="text-cyan-400">npm run check</code>: Runs both lint and format.</li>
                </ul>
              </motion.section>

              {/* Set up Absolute Imports */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Set up Absolute Imports and Module Path Aliases</h2>
                <p className="text-slate-300 mb-4">
                  Bini.js has built-in support for path aliases using the <code className="text-cyan-400">"paths"</code> option in <code className="text-cyan-400">tsconfig.json</code>.
                </p>
                <p className="text-slate-300 mb-4">
                  These options allow you to alias project directories to absolute paths, making it easier and cleaner to import modules. For example:
                </p>
                <CodeBlock code={`// Before\nimport { Button } from '../../../components/button'\n\n// After\nimport { Button } from '@/components/button'`} />
                <p className="text-slate-300 mt-4">Path aliases are configured by default:</p>
                <CodeBlock 
                  code={`{\n  "compilerOptions": {\n    "paths": {\n      "@/*": ["./src/*"]\n    }\n  }\n}`}
                  filename="tsconfig.json"
                />
                <Callout type="info">
                  <strong>Note:</strong> <code className="text-cyan-400">baseUrl</code> is deprecated in TypeScript 5.1+. Bini.js uses Vite's built-in alias resolution which works with just <code className="text-cyan-400">"paths"</code> when using <code className="text-cyan-400">"moduleResolution": "bundler"</code>.
                </Callout>
                <p className="text-slate-400 text-sm mt-4">
                  Vite automatically resolves the <code className="text-cyan-400">@</code> alias to the <code className="text-cyan-400">src</code> directory.
                </p>
                <CodeBlock 
                  code={`// vite.config.ts\nimport { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nimport { biniroute } from 'bini-router'\nimport path from 'path'\n\nexport default defineConfig({\n  plugins: [react(), biniroute()],\n  resolve: {\n    alias: {\n      '@': path.resolve(__dirname, './src'),\n    },\n  },\n})`}
                  filename="vite.config.ts"
                />
              </motion.section>

              {/* Previous / Next Navigation */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                <Link to="/docs" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-500">Previous</div>
                    <div className="text-sm font-medium">Getting Started</div>
                  </div>
                </Link>
                <Link to="/docs/project-structure" className="group flex items-center gap-2 text-right text-slate-400 hover:text-white transition-colors">
                  <div>
                    <div className="text-xs text-slate-500">Next</div>
                    <div className="text-sm font-medium">Project Structure</div>
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