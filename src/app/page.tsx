import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { siGithub } from 'simple-icons'

import { BiniAnimation } from '../components/BiniAnimation'
import { FoundationAnimation } from '../components/FoundationAnimation'
import { Header, Footer } from '../components/Layout'
import { FeaturesSection } from '../components/FeatureAnimation'

// Simple Icon component
function SimpleIcon({
  icon,
  className = '',
  size = 20,
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

const Home = () => {
  const [activeTab, setActiveTab] = useState('npm')
  const [copied, setCopied] = useState(false)

  const tabs = [
    { id: 'npm', label: 'npm', command: 'npx create-bini-app@latest' },
    { id: 'pnpm', label: 'pnpm', command: 'pnpm create bini-app@latest' },
    { id: 'yarn', label: 'yarn', command: 'yarn create bini-app@latest' },
    { id: 'bun', label: 'bun', command: 'bun create bini-app@latest' },
  ]

  const packages = [
    {
      name: 'bini-router',
      desc: 'File-based routing, nested layouts, Hono API routes, auto-imports, metadata, and multi-platform deploy for Vite.',
      features: [
        'File-based routing',
        'Nested layouts',
        'Auto-imports',
        'Metadata',
        'Hono API routes',
        '5 platforms',
      ],
    },
    {
      name: 'bini-server',
      desc: 'Zero-dependency production server. Pure Node.js http — serves dist/ and proxies /api/* with ETag, timeouts, and graceful shutdown.',
      features: [
        'Zero deps',
        'ETag / 304',
        '30s timeouts',
        '10MB limit',
        'Graceful shutdown',
        'Port increment',
      ],
    },
    {
      name: 'bini-overlay',
      desc: 'Animated logo badge for dev. Morphs into error pill on failures. Full overlay with Shiki-highlighted code frames.',
      features: [
        'SVG animation',
        'Error pill',
        'Multi-error nav',
        'Shiki highlight',
        'HMR aware',
        'Dev only',
      ],
    },
    {
      name: 'bini-export',
      desc: 'Static SPA export — pre-renders every static route, generates smart 404.html, and strips platform files.',
      features: ['Pre-render', 'Smart 404', 'Platform cleanup', 'Custom not-found', 'Zero config'],
    },
    {
      name: 'bini-env',
      desc: 'Zero-config environment variable system. Universal getEnv/requireEnv API with clean startup banner.',
      features: [
        'Clean banner',
        '.env detection',
        'Universal API',
        'Prefix protection',
        'Edge-safe',
        'TypeScript',
      ],
    },
    {
      name: 'create-bini-app',
      desc: 'One-command scaffold. TypeScript or JavaScript, Tailwind v4 or CSS Modules, Oxlint + Oxfmt.',
      features: [
        'TS & JS',
        'Tailwind v4',
        'CSS Modules',
        'Oxlint + Oxfmt',
        'Auto favicons',
        'Netlify ready',
      ],
    },
  ]

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black font-sans antialiased">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-300 h-200 bg-linear-to-b from-cyan-500/5 via-sky-500/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-200/20 to-transparent" />
      </div>

      {/* Header */}
      <Header />

      {/* Hero Section - Added pt-16 lg:pt-20 to account for fixed header */}
      <section className="relative pt-16 lg:pt-20 pb-8 lg:pb-10 px-4 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Logo above heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex justify-center mb-4"
          >
            <img 
              src="/logo.svg" 
              alt="Bini.js Logo" 
              className="w-12 h-12 lg:w-14 lg:h-14"
            />
          </motion.div>

          {/* Heading centered at top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="text-center mb-6 lg:mb-8"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.2]">
              The Zero-Config React Framework
              <br />
              <span className="bg-linear-to-r from-cyan-400 via-sky-400 to-blue-400 bg-clip-text text-transparent">
                for the Modern Web
              </span>
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center relative">
            {/* Vertical divider */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-slate-700 to-transparent" />

            {/* Left Column - Text and Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="text-center lg:text-left lg:pr-6"
            >
              <p className="text-base lg:text-lg text-slate-400 max-w-xl lg:max-w-none mx-auto lg:mx-0 mb-5 leading-relaxed">
                Build modern, high-performance web applications effortlessly without wrestling with complex tooling, steep learning curves, or endless configuration files. Focus entirely on your unique ideas and user experience, while the underlying infrastructure handles the heavy lifting for you.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-5">
                <Link
                  to="/docs"
                  className="group relative px-5 py-2.5 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-100 transition-all shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <a
                  href="https://github.com/Binidu01/bini-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-black border border-slate-700 text-slate-300 font-medium hover:border-slate-600 hover:bg-slate-900 transition-all shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <SimpleIcon icon={siGithub} size={18} />
                    GitHub
                    <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                  </span>
                </a>
              </div>

              {/* Terminal Preview */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-lg mx-auto lg:mx-0"
              >
                <div className="rounded-lg overflow-hidden border border-slate-700 bg-[#0a0a0a] shadow-2xl">
                  {/* Terminal header with tabs */}
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
                      onClick={() => handleCopy(tabs.find((t) => t.id === activeTab)?.command || '')}
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
                  
                  {/* Terminal body */}
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
                          className="text-slate-200 font-mono text-sm"
                        >
                          {tabs.find((t) => t.id === activeTab)?.command}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Animation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="relative w-full lg:pl-6"
            >
              <div className="w-full flex items-center justify-center">
                <div className="w-full max-w-full mx-auto">
                  <BiniAnimation />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-6 lg:mt-8"
          >
            <a
              href="#foundation"
              className="inline-flex flex-col items-center gap-2 text-sm text-slate-500 hover:text-slate-400 transition-colors group"
              aria-label="Scroll to foundation"
            >
              <span className="text-xs uppercase tracking-wider font-medium">
                Built on a solid foundation
              </span>
              <ChevronDown className="w-4 h-4 animate-bounce group-hover:animate-none group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Foundation Section */}
      <section
        id="foundation"
        className="relative py-16 lg:py-20 px-4 lg:px-8 border-t border-slate-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Built on a foundation of fast, production-grade tooling
            </h2>
          </motion.div>

          <div className="min-h-130 lg:min-h-150 w-full flex items-center justify-center">
            <FoundationAnimation />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Ecosystem Section */}
      <section className="relative py-24 px-6 lg:px-8 border-t border-slate-800 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Six packages. One framework.
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Every package is purpose-built and works seamlessly together — or standalone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-6 rounded-xl border border-slate-800 bg-black hover:border-slate-700 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-base font-bold text-cyan-400">
                    {pkg.name}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-4">{pkg.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {pkg.features.slice(0, 3).map((f, j) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-1 rounded-md bg-slate-900 text-slate-400"
                    >
                      {f}
                    </span>
                  ))}
                  {pkg.features.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-md bg-slate-900 text-slate-500">
                      +{pkg.features.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home