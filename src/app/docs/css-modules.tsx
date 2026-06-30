// src/pages/docs/css-modules/page.tsx
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
// CSS Modules Page
// ────────────────────────────────────────────────────────────────────────────────
export default function CSSModulesPage() {
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
                <h1 className="text-4xl font-bold text-white mb-2">CSS Modules</h1>
                <p className="text-slate-400 text-sm mb-8">
                  Learn how to use CSS Modules in Bini.js for component-scoped styling.
                </p>
              </motion.div>

              {/* Overview */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <p className="text-slate-300 mb-6">
                  CSS Modules allow you to write component-scoped CSS without worrying about naming conflicts. Vite processes <code className="text-cyan-400">.module.css</code> files automatically — no configuration needed.
                </p>
                <Callout type="info">
                  <strong>Zero Configuration:</strong> Vite handles CSS Modules natively. Any file ending in <code>.module.css</code> is automatically processed as a CSS Module.
                </Callout>
              </motion.section>

              {/* Basic Usage */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Basic Usage</h2>
                <p className="text-slate-300 mb-4">
                  Create a <code className="text-cyan-400">.module.css</code> file and import it in your component:
                </p>
                <CodeBlock 
                  code={`/* src/app/components/Button.module.css */
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.primary {
  background: #06b6d4;
  color: black;
  border: none;
}

.primary:hover {
  background: #0891b2;
}

.secondary {
  background: transparent;
  color: white;
  border: 1px solid #334155;
}

.secondary:hover {
  background: #1e293b;
}`}
                  filename="Button.module.css"
                />
                <CodeBlock 
                  code={`// src/app/components/Button.tsx
import styles from './Button.module.css'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  return (
    <button 
      className={\`\${styles.button} \${styles[variant]}\`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}`}
                  filename="Button.tsx"
                />
              </motion.section>

              {/* Multiple Classes */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Combining Classes</h2>
                <p className="text-slate-300 mb-4">
                  Combine multiple CSS Module classes using template literals:
                </p>
                <CodeBlock 
                  code={`/* src/app/components/Card.module.css */
.card {
  background: #0a0a0a;
  border: 1px solid #1e293b;
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.featured {
  border-color: #06b6d4;
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.1);
}

.large {
  padding: 2rem;
}`}
                  filename="Card.module.css"
                />
                <CodeBlock 
                  code={`// src/app/components/Card.tsx
import styles from './Card.module.css'

interface CardProps {
  featured?: boolean
  size?: 'normal' | 'large'
  children: React.ReactNode
}

export function Card({ featured, size = 'normal', children }: CardProps) {
  return (
    <div className={\`\${styles.card} \${featured ? styles.featured : ''} \${size === 'large' ? styles.large : ''}\`}>
      {children}
    </div>
  )
}`}
                  filename="Card.tsx"
                />
                <Callout type="tip">
                  Use the <code>clsx</code> or <code>classnames</code> library for cleaner conditional class composition.
                </Callout>
              </motion.section>

              {/* With clsx */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Using clsx for Cleaner Code</h2>
                <p className="text-slate-300 mb-4">
                  Install <code className="text-cyan-400">clsx</code> for cleaner conditional classes:
                </p>
                <CodeBlock 
                  code={`npm install clsx`}
                />
                <CodeBlock 
                  code={`// src/app/components/Card.tsx
import clsx from 'clsx'
import styles from './Card.module.css'

interface CardProps {
  featured?: boolean
  size?: 'normal' | 'large'
  children: React.ReactNode
}

export function Card({ featured, size = 'normal', children }: CardProps) {
  return (
    <div className={clsx(
      styles.card,
      featured && styles.featured,
      size === 'large' && styles.large
    )}>
      {children}
    </div>
  )
}`}
                  filename="Card.tsx"
                />
              </motion.section>

              {/* Global vs Local */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Global vs Local Scope</h2>
                <p className="text-slate-300 mb-4">
                  CSS Modules are locally scoped by default. Use <code className="text-cyan-400">:global</code> to target global selectors:
                </p>
                <CodeBlock 
                  code={`/* src/app/components/Container.module.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Target global class */
.container :global(.heading) {
  margin-bottom: 1rem;
}

/* Global selector */
:global(.dark) .container {
  background: #000;
}`}
                  filename="Container.module.css"
                />
              </motion.section>

              {/* Composing Classes */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Composing Classes</h2>
                <p className="text-slate-300 mb-4">
                  Use <code className="text-cyan-400">composes</code> to reuse styles from other classes:
                </p>
                <CodeBlock 
                  code={`/* src/app/components/Form.module.css */
.baseInput {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #334155;
  background: #0a0a0a;
  color: white;
  font-size: 1rem;
}

.baseInput:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.1);
}

.textInput {
  composes: baseInput;
}

.errorInput {
  composes: baseInput;
  border-color: #ef4444;
}

.errorInput:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
}`}
                  filename="Form.module.css"
                />
              </motion.section>

              {/* CSS Variables in Modules */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">CSS Variables in Modules</h2>
                <p className="text-slate-300 mb-4">
                  Use CSS variables for dynamic styling within modules:
                </p>
                <CodeBlock 
                  code={`/* src/app/components/Progress.module.css */
.progress {
  width: 100%;
  height: 0.5rem;
  background: #1e293b;
  border-radius: 9999px;
  overflow: hidden;
}

.bar {
  height: 100%;
  width: var(--progress);
  background: linear-gradient(to right, #06b6d4, #3b82f6);
  transition: width 0.3s ease;
}`}
                  filename="Progress.module.css"
                />
                <CodeBlock 
                  code={`// src/app/components/Progress.tsx
import styles from './Progress.module.css'

interface ProgressProps {
  value: number
  max?: number
}

export function Progress({ value, max = 100 }: ProgressProps) {
  const percentage = (value / max) * 100
  
  return (
    <div className={styles.progress}>
      <div 
        className={styles.bar} 
        style={{ '--progress': \`\${percentage}%\` } as React.CSSProperties}
      />
    </div>
  )
}`}
                  filename="Progress.tsx"
                />
              </motion.section>

              {/* Animations */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Animations</h2>
                <p className="text-slate-300 mb-4">
                  Define animations in CSS Modules:
                </p>
                <CodeBlock 
                  code={`/* src/app/components/Spinner.module.css */
.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #1e293b;
  border-top-color: #06b6d4;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Pulse animation */
.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}`}
                  filename="Spinner.module.css"
                />
                <CodeBlock 
                  code={`// src/app/components/Spinner.tsx
import styles from './Spinner.module.css'

export function Spinner() {
  return <div className={styles.spinner} />
}

export function LoadingPulse() {
  return (
    <div className={styles.pulse}>
      Loading...
    </div>
  )
}`}
                  filename="Spinner.tsx"
                />
              </motion.section>

              {/* Media Queries */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Media Queries</h2>
                <p className="text-slate-300 mb-4">
                  Write responsive styles with media queries:
                </p>
                <CodeBlock 
                  code={`/* src/app/components/Grid.module.css */
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  padding: 1rem;
}

@media (min-width: 768px) {
  .card {
    padding: 1.5rem;
  }
}`}
                  filename="Grid.module.css"
                />
              </motion.section>

              {/* Complete Example */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Complete Example</h2>
                <p className="text-slate-300 mb-4">
                  A full-featured component using CSS Modules:
                </p>
                <CodeBlock 
                  code={`/* src/app/components/Modal.module.css */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease;
}

.modal {
  background: #0a0a0a;
  border: 1px solid #1e293b;
  border-radius: 1rem;
  padding: 1.5rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
}

.close {
  composes: button from './Button.module.css';
  padding: 0.25rem 0.5rem;
  background: transparent;
  color: #94a3b8;
}

.close:hover {
  color: white;
}

.content {
  color: #94a3b8;
  line-height: 1.5;
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #1e293b;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}`}
                  filename="Modal.module.css"
                />
                <CodeBlock 
                  code={`// src/app/components/Modal.tsx
import { useEffect } from 'react'
import styles from './Modal.module.css'
import buttonStyles from './Button.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.close} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}`}
                  filename="Modal.tsx"
                />
              </motion.section>

              {/* Best Practices */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Best Practices</h2>
                <ul className="space-y-3 text-slate-300 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Use camelCase for class names</strong> — <code>.myComponent</code> not <code>.my-component</code>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Keep modules close to components</strong> — Colocate <code>.module.css</code> with the component.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Use composes for shared styles</strong> — Avoid duplicating common patterns.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Use CSS variables for theming</strong> — Share values across modules.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span><strong className="text-white">Use clsx for conditional classes</strong> — Cleaner than template literals.</span>
                  </li>
                </ul>
              </motion.section>

              {/* Previous / Next Navigation */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                <Link to="/docs/tailwind" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-500">Previous</div>
                    <div className="text-sm font-medium">Tailwind CSS</div>
                  </div>
                </Link>
                <Link to="/docs/static-export" className="group flex items-center gap-2 text-right text-slate-400 hover:text-white transition-colors">
                  <div>
                    <div className="text-xs text-slate-500">Next</div>
                    <div className="text-sm font-medium">Static Export</div>
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