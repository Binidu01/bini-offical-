// src/components/DocSidebar.tsx
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

// ────────────────────────────────────────────────────────────────────────────────
// Section Component (non-collapsible, always visible)
// ────────────────────────────────────────────────────────────────────────────────
function Section({ 
  title, 
  titleHref = null,
  items 
}: { 
  title: string
  titleHref?: string | null
  items: { title: string; href: string }[]
}) {
  const location = useLocation()
  const isActive = titleHref ? location.pathname === titleHref : false

  return (
    <div className="mb-4">
      {titleHref ? (
        <Link
          to={titleHref}
          className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 transition-colors ${
            isActive 
              ? 'text-cyan-400' 
              : 'text-white/40 hover:text-white/60'
          }`}
        >
          {title}
        </Link>
      ) : (
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
          {title}
        </h3>
      )}
      <div className="space-y-0">
        {items.map((item) => {
          const isItemActive = location.pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`block py-1 text-sm transition-colors ${
                isItemActive 
                  ? 'text-cyan-400 font-medium' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Documentation Sidebar Content (Categorized, always visible)
// ────────────────────────────────────────────────────────────────────────────────
function DocSidebarContent() {
  // Getting Started Section - Title is a link
  const gettingStartedItems = [
    { title: 'Installation', href: '/docs/installation' },
    { title: 'Project Structure', href: '/docs/project-structure' },
    { title: 'Layouts and Pages', href: '/docs/layouts-and-pages' },
    { title: 'Linking and Navigating', href: '/docs/linking-and-navigating' },
  ]

  // Routing Section
  const routingItems = [
    { title: 'Folder-Based Routing', href: '/docs/folder-based-routing' },
    { title: 'File-Based Routing', href: '/docs/file-based-routing' },
    { title: 'Dynamic Routes', href: '/docs/dynamic-routes' },
    { title: '404 Page', href: '/docs/notfound' },
    { title: 'Loading UI', href: '/docs/load' },
  ]

  // API Routes Section
  const apiRoutesItems = [
    { title: 'API Routes Overview', href: '/docs/api-routes' },
    { title: 'Plain Function Handlers', href: '/docs/api-plain' },
    { title: 'Hono Integration', href: '/docs/api-hono' },
    { title: 'Dynamic API Routes', href: '/docs/api-dynamic' },
  ]

  // Styling Section
  const stylingItems = [
    { title: 'CSS Overview', href: '/docs/css' },
    { title: 'Tailwind CSS', href: '/docs/tailwind' },
    { title: 'CSS Modules', href: '/docs/css-modules' },
  ]

  // Deployment Section
  const deploymentItems = [
    { title: 'Static Export', href: '/docs/static-export' },
    { title: 'Environment Variables', href: '/docs/environment-variables' },
    { title: 'Platforms', href: '/docs/platforms' },
    { title: 'Deploying Overview', href: '/docs/deploying' },
  ]

  return (
    <nav className="py-1">
      <Section title="Getting Started" titleHref="/docs" items={gettingStartedItems} />
      <Section title="Routing" items={routingItems} />
      <Section title="API Routes" items={apiRoutesItems} />
      <Section title="Styling" items={stylingItems} />
      <Section title="Deployment" items={deploymentItems} />
    </nav>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Documentation Sidebar (Desktop only) - Fixed with independent scrollbar
// ────────────────────────────────────────────────────────────────────────────────
export function DocSidebar() {
  return (
    <div className="fixed top-20 max-h-[calc(100vh-5rem)] w-48 overflow-y-auto overflow-x-hidden pb-4">
      <DocSidebarContent />
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────────
// Full Documentation Layout (with mobile responsiveness)
// ────────────────────────────────────────────────────────────────────────────────
export function DocLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex">
          {/* Left Sidebar - Fixed position with independent scroll */}
          <aside className="w-48 shrink-0">
            <DocSidebar />
          </aside>
          
          {/* Spacer for fixed sidebar */}
          <div className="w-48 shrink-0" />
          
          {/* Main Content - No gap, no padding */}
          <main className="flex-1 min-w-0 pb-8">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Menu Button */}
        <div className="mb-1">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="flex items-center gap-1 text-white hover:text-cyan-400 transition-colors"
            aria-label={mobileMenuOpen ? 'Collapse documentation menu' : 'Expand documentation menu'}
          >
            <span className="text-sm font-medium">Menu</span>
            {mobileMenuOpen ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
        </div>

        {/* Divider line */}
        <div className="border-t border-slate-800 mb-2" />

        {/* Collapsible Sidebar (for mobile only) - with scrollbar */}
        <div className={`overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-80 mb-2' : 'max-h-0'}`}>
          <div className="max-h-72 overflow-y-auto pb-1">
            <DocSidebarContent />
          </div>
        </div>

        {/* Mobile Main Content */}
        <main className="pb-8">
          {children}
        </main>
      </div>
    </>
  )
}

export default DocSidebar