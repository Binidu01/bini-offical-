// src/pages/docs/page.tsx
import React from 'react'
import { motion } from 'framer-motion'
import {
  MessageCircle,
  ExternalLink,
  ArrowRight,
  Smartphone,
  Laptop,
  Tablet,
  Globe,
  Cpu,
  ShieldCheck,
  Gauge,
  Boxes,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Layout'
import { DocLayout } from '../../components/DocSidebar'
import { siGithub } from 'simple-icons'

// Simple Icon component
function SimpleIcon({ 
  icon, 
  className = "", 
  size = 20 
}: { 
  icon: typeof siGithub
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
// Main Docs Landing Page
// ────────────────────────────────────────────────────────────────────────────────
export default function DocsPage() {
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
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Bini.js Docs</h1>
                <p className="text-lg text-white mb-12">
                  Welcome to the Bini.js documentation!
                </p>
              </motion.div>

              {/* What is Bini.js? */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">What is Bini.js?</h2>
                <p className="text-white leading-relaxed">
                  Bini.js is a React framework for building modern applications that run natively across web, desktop, and mobile — all from a single codebase. You use React Components to build user interfaces, and Bini.js handles the complexity of multi-platform deployment.
                </p>
                <p className="text-white mt-4 leading-relaxed">
                  It automatically configures lower-level tools like Vite, React Router, and Hono, while providing a seamless path to native apps through Tauri. You can focus on building your product and shipping quickly, without worrying about the underlying platform differences.
                </p>
                <p className="text-white mt-4 leading-relaxed">
                  Whether you're building a web app, a desktop application for Windows, macOS, or Linux, or a mobile app for Android and iOS — Bini.js gives you the tools to do it all from one project.
                </p>
              </motion.section>

              {/* Native Capabilities Section - NEW */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.12 }} 
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-white mb-4">Native Apps from a Single Codebase</h2>
                <p className="text-white mb-6 leading-relaxed">
                  Bini.js goes beyond the browser. With Tauri integration, your React app becomes a real native application on every major platform — not a wrapped web view.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                        <Laptop className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h3 className="text-white font-semibold">Desktop Apps</h3>
                    </div>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span><span className="text-white font-medium">Windows</span> — Native WebView2 binary with Authenticode signing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span><span className="text-white font-medium">macOS</span> — Native WKWebView app with Developer ID notarization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span><span className="text-white font-medium">Linux</span> — Native WebKitGTK binary as a GPG-signed AppImage</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-purple-400" />
                      </div>
                      <h3 className="text-white font-semibold">Mobile Apps</h3>
                    </div>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span><span className="text-white font-medium">Android</span> — Native APK/AAB via Tauri's Android backend</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span><span className="text-white font-medium">iOS</span> — Native app via Tauri's iOS backend, running in WKWebView</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span className="text-white font-medium text-sm">Real Native</span>
                    </div>
                    <p className="text-white/60 text-xs">Not wrapped — compiled to native binaries with full system access</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span className="text-white font-medium text-sm">Auto Plugin Wiring</span>
                    </div>
                    <p className="text-white/60 text-xs">bini-native detects web APIs you call and wires Rust plugins automatically</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Boxes className="w-4 h-4 text-cyan-400" />
                      <span className="text-white font-medium text-sm">One Codebase</span>
                    </div>
                    <p className="text-white/60 text-xs">Same routes, API handlers, and components compile to every target</p>
                  </div>
                </div>
              </motion.section>

              {/* How to use the docs */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">How to use the docs</h2>
                <p className="text-white mb-4">
                  The docs are organized into several sections:
                </p>
                <ul className="space-y-2 text-white list-disc list-inside mb-4">
                  <li><span className="font-medium text-cyan-400">Getting Started:</span> Step-by-step tutorials to help you create a new application and learn the core Bini.js features.</li>
                  <li><span className="font-medium text-cyan-400">Routing:</span> Learn about folder-based and file-based routing, dynamic routes, and more.</li>
                  <li><span className="font-medium text-cyan-400">API Routes:</span> Build backend endpoints with Hono or plain functions.</li>
                  <li><span className="font-medium text-cyan-400">Styling:</span> Style your app with Tailwind CSS, CSS Modules, or plain CSS.</li>
                  <li><span className="font-medium text-cyan-400">Platforms:</span> Build for web, Windows, macOS, Linux, Android, and iOS from one codebase.</li>
                  <li><span className="font-medium text-cyan-400">Deployment:</span> Deploy to Node.js, Netlify, Vercel, Cloudflare, or Deno.</li>
                </ul>
              </motion.section>

              {/* Bini.js Router */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Bini.js Router</h2>
                <p className="text-white mb-4">
                  Bini.js uses a file-system based router that supports:
                </p>
                <ul className="space-y-3 text-white list-disc list-inside mb-6">
                  <li>
                    <span className="font-medium text-cyan-400">Folder-Based Routing:</span> Folders define URL segments. Nesting folders creates nested routes automatically. 
                    <span className="block mt-1 ml-5 text-white/80 text-sm">For example, <code className="text-cyan-400">app/blog/</code> creates <code className="text-cyan-400">/blog</code>, and <code className="text-cyan-400">app/blog/[slug]/</code> creates dynamic routes like <code className="text-cyan-400">/blog/my-post</code>.</span>
                  </li>
                  <li>
                    <span className="font-medium text-cyan-400">File-Based Routing:</span> Special files define route behavior:
                    <ul className="mt-2 ml-5 space-y-1 list-disc text-white/80 text-sm">
                      <li><code className="text-cyan-400">page.tsx</code> — Creates a public route accessible at the folder's URL</li>
                      <li><code className="text-cyan-400">layout.tsx</code> — Wraps pages and nested layouts, persists across navigation</li>
                      <li><code className="text-cyan-400">loading.tsx</code> — Shows loading UI while the page content streams</li>
                      <li><code className="text-cyan-400">not-found.tsx</code> — Custom 404 page for unmatched routes</li>
                    </ul>
                  </li>
                </ul>
                <p className="text-white text-sm">
                  Routes are automatically code-split — no manual <code className="text-cyan-400">React.lazy()</code> required.
                </p>
              </motion.section>

              {/* Pre-requisite knowledge */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Pre-requisite knowledge</h2>
                <p className="text-white mb-4">
                  Our documentation assumes some familiarity with web development. Before getting started, it'll help if you're comfortable with:
                </p>
                <ul className="space-y-2 text-white list-disc list-inside mb-4">
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                  <li>React</li>
                </ul>
                <p className="text-white text-sm">
                  If you're new to React or need a refresher, we recommend starting with the{' '}
                  <a href="https://react.dev/learn" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                    React documentation <ExternalLink className="w-3 h-3" />
                  </a>.
                </p>
              </motion.section>

              {/* Join our Community */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12">
                <div className="p-6 rounded-xl border border-white bg-black/50">
                  <h2 className="text-2xl font-bold text-white mb-4">Join our Community</h2>
                  <p className="text-white mb-4">
                    If you have questions about anything related to Bini.js, you're always welcome to ask our community on:
                  </p>
                  <div className="flex flex-wrap items-center gap-6">
                    <a href="https://github.com/Binidu01/bini-cli/discussions" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:text-cyan-400 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      GitHub Discussions
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                    <a href="https://github.com/Binidu01/bini-cli" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:text-cyan-400 transition-colors">
                      <SimpleIcon icon={siGithub} className="w-4 h-4" size={16} />
                      GitHub
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                  </div>
                </div>
              </motion.section>

              {/* Next Steps */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <h2 className="text-2xl font-bold text-white mb-4">Next Steps</h2>
                <p className="text-white mb-4">
                  Create your first application and learn the core Bini.js features.
                </p>
                <Link to="/docs/installation" className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:underline">
                  Getting Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.section>

            </div>
          </DocLayout>
          
        </div>
      </div>
    </div>
  )
}