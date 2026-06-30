import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap, Rocket, Box, FileCode, FileJson, FileText } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { siNetlify, siVercel, siCloudflare, siNodedotjs, siDeno } from 'simple-icons'

// ─── Simple Icon component ────────────────────────────────────────────────────
function SimpleIcon({
  icon,
  className = '',
  size = 20,
}: {
  icon: typeof siNetlify
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

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase =
  | 'idle'
  | 'phase1'
  | 'phase2'
  | 'phase3a'
  | 'phase3b'
  | 'phase3c'
  | 'phase4'
  | 'phase5'
  | 'phase6'

// ─── Constants ────────────────────────────────────────────────────────────────
const FILES = [
  { id: 'f0', label: 'page.tsx', color: 'cyan' },
  { id: 'f1', label: 'layout.tsx', color: 'purple' },
  { id: 'f2', label: 'api.ts', color: 'emerald' },
  { id: 'f3', label: 'blog/[slug].tsx', color: 'amber' },
  { id: 'f4', label: 'about/page.tsx', color: 'cyan' },
  { id: 'f5', label: 'middleware.ts', color: 'rose' },
] as const

const FILE_POSITIONS = [
  { x: -140, y: -100 },
  { x: 120, y: -110 },
  { x: 160, y: -10 },
  { x: 130, y: 90 },
  { x: -150, y: 85 },
  { x: -155, y: -20 },
]

const FILE_POSITIONS_MOBILE = [
  { x: -90, y: -70 },
  { x: 80, y: -80 },
  { x: 100, y: -5 },
  { x: 85, y: 65 },
  { x: -95, y: 60 },
  { x: -100, y: -10 },
]

// ─── Easing curves ────────────────────────────────────────────────────────────
const easeSnap = [0.34, 1.56, 0.64, 1.0] as const
const easeFast = [0.25, 0.1, 0.25, 1.0] as const
const easeSmooth = [0.4, 0.0, 0.2, 1.0] as const

// ─── Color tokens ────────────────────────────────────────────────────────────
const COLOR: Record<
  string,
  { bg: string; border: string; text: string; pill: string; line: string }
> = {
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/50',
    text: 'text-cyan-400',
    pill: 'bg-cyan-500',
    line: 'stroke-cyan-400',
  },
  purple: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/50',
    text: 'text-violet-400',
    pill: 'bg-violet-500',
    line: 'stroke-violet-400',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/50',
    text: 'text-emerald-400',
    pill: 'bg-emerald-500',
    line: 'stroke-emerald-400',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/50',
    text: 'text-amber-400',
    pill: 'bg-amber-500',
    line: 'stroke-amber-400',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/50',
    text: 'text-rose-400',
    pill: 'bg-rose-500',
    line: 'stroke-rose-400',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/50',
    text: 'text-blue-400',
    pill: 'bg-blue-500',
    line: 'stroke-blue-400',
  },
}

const MERGE_DOTS = [
  { x: 0, y: -90, color: 'cyan' },
  { x: -90, y: 55, color: 'amber' },
  { x: 90, y: 55, color: 'emerald' },
]

const MERGE_DOTS_MOBILE = [
  { x: 0, y: -60, color: 'cyan' },
  { x: -60, y: 40, color: 'amber' },
  { x: 60, y: 40, color: 'emerald' },
]

// ─── Deployment platforms ─────────────────────────────────────────────────────
const DEPLOY_PLATFORMS = [
  {
    name: 'Netlify',
    entry: 'netlify/edge-functions/api.ts',
    runtime: 'Deno (Edge)',
    color: 'cyan',
    icon: siNetlify,
    iconColor: 'text-cyan-400',
  },
  {
    name: 'Vercel',
    entry: 'api/index.ts',
    runtime: 'Edge',
    color: 'purple',
    icon: siVercel,
    iconColor: 'text-slate-200',
  },
  {
    name: 'Cloudflare',
    entry: 'worker.ts',
    runtime: 'Workers',
    color: 'amber',
    icon: siCloudflare,
    iconColor: 'text-amber-400',
  },
  {
    name: 'Node.js',
    entry: 'server.js',
    runtime: 'Node.js',
    color: 'emerald',
    icon: siNodedotjs,
    iconColor: 'text-emerald-400',
  },
  {
    name: 'Deno',
    entry: 'server/index.ts',
    runtime: 'Deno',
    color: 'blue',
    icon: siDeno,
    iconColor: 'text-blue-400',
  },
]

// ─── Vite build output ────────────────────────────────────────────────────────
const VITE_OUTPUT = [
  { file: 'dist/index.html', size: '1.43 kB', gzip: '0.57 kB' },
  { file: 'dist/css/layout-CcW4yoKV.css', size: '12.18 kB', gzip: '3.22 kB' },
  { file: 'dist/js/layout-BsZsyrnj.js', size: '0.16 kB', gzip: '0.15 kB' },
  { file: 'dist/js/page-DC85EFeG.js', size: '2.63 kB', gzip: '1.17 kB' },
  { file: 'dist/js/jsx-runtime-DShvDiRO.js', size: '8.39 kB', gzip: '3.20 kB' },
  { file: 'dist/js/index-CkZRHBeM.js', size: '228.95 kB', gzip: '72.97 kB' },
]

const VITE_OUTPUT_MOBILE = [
  { file: 'index.html', size: '1.43 kB', gzip: '0.57 kB' },
  { file: 'layout.css', size: '12.18 kB', gzip: '3.22 kB' },
  { file: 'page.js', size: '2.63 kB', gzip: '1.17 kB' },
  { file: 'index.js', size: '228.95 kB', gzip: '72.97 kB' },
]

// ─── Nav content definitions ──────────────────────────────────────────────────
const NAV_CONTENT = [
  {
    key: 'home',
    label: 'Home',
    content: (
      <div className="flex flex-col gap-2 sm:gap-3">
        <div>
          <div className="text-xs sm:text-sm font-bold text-slate-100 leading-snug font-sans">
            Zero-config React framework
          </div>
          <div className="text-[9px] sm:text-[11px] text-slate-500 leading-relaxed mt-0.5 font-mono">
            File routing · Hono API · Deploy anywhere
          </div>
        </div>

        <div className="flex gap-1.5 sm:gap-2">
          {[
            { val: '12k', label: 'GitHub stars', color: 'text-amber-400' },
            { val: '1.2s', label: 'Build time', color: 'text-emerald-400' },
            { val: '48kb', label: 'Bundle', color: 'text-cyan-400' },
          ].map(({ val, label, color }) => (
            <div
              key={label}
              className="flex-1 rounded-lg sm:rounded-xl bg-slate-800/60 border border-slate-700/50 px-2 sm:px-3 py-1.5 sm:py-2 flex flex-col items-center gap-0.5"
            >
              <span className={`text-xs sm:text-sm font-bold ${color} font-mono`}>{val}</span>
              <span className="text-[7px] sm:text-[9px] text-slate-500 text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 text-[10px] sm:text-xs font-semibold text-white cursor-pointer border-0 w-full justify-center font-sans"
        >
          Get started →
        </motion.button>
      </div>
    ),
  },
  {
    key: 'blog',
    label: 'Blog',
    content: (
      <div className="flex flex-col gap-1.5 sm:gap-2">
        {[
          {
            tag: 'Release',
            tagColor: 'text-cyan-400',
            tagBg: 'bg-cyan-500/10',
            title: 'Bini 2.0 is here',
            meta: '3 min · Apr 2025',
          },
          {
            tag: 'Guide',
            tagColor: 'text-violet-400',
            tagBg: 'bg-violet-500/10',
            title: 'File-based routing deep dive',
            meta: '7 min · Mar 2025',
          },
          {
            tag: 'Performance',
            tagColor: 'text-emerald-400',
            tagBg: 'bg-emerald-500/10',
            title: 'How we hit 1.2s builds',
            meta: '5 min · Feb 2025',
          },
        ].map(({ tag, tagColor, tagBg, title, meta }, i) => (
          <motion.div
            key={title}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            className="flex items-start gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-slate-600/60 transition-colors cursor-pointer"
          >
            <div className="flex flex-col gap-0.5 sm:gap-1 flex-1 min-w-0">
              <span
                className={`text-[7px] sm:text-[9px] font-bold tracking-widest uppercase px-1.5 sm:px-2 py-0.5 rounded-md w-fit ${tagColor} ${tagBg} font-mono`}
              >
                {tag}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-200 leading-tight truncate font-sans">
                {title}
              </span>
              <span className="text-[7px] sm:text-[9px] text-slate-500 font-mono">{meta}</span>
            </div>
            <span className="text-slate-600 text-[10px] sm:text-xs mt-1 shrink-0">→</span>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    key: 'api',
    label: 'API',
    content: (
      <div className="flex flex-col gap-2 sm:gap-2.5">
        {[
          { method: 'GET', path: '/api/users', ping: 'emerald', ms: '12ms' },
          { method: 'POST', path: '/api/posts', ping: 'blue', ms: '38ms' },
          { method: 'DELETE', path: '/api/uploads', ping: 'rose', ms: '9ms' },
        ].map(({ method, path, ping, ms }, i) => {
          const methodColor: Record<string, string> = {
            GET: 'text-emerald-400',
            POST: 'text-blue-400',
            DELETE: 'text-rose-400',
          }
          const pingBg: Record<string, string> = {
            emerald: 'bg-emerald-500',
            blue: 'bg-blue-500',
            rose: 'bg-rose-500',
          }
          return (
            <motion.div
              key={path}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-slate-800/40 border border-slate-700/40"
            >
              <span className={`text-[9px] sm:text-[10px] font-bold min-w-9 sm:min-w-10.5 ${methodColor[method]} font-mono`}>
                {method}
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono flex-1 truncate">{path}</span>
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <motion.span
                  className={`size-1 sm:size-1.5 rounded-full ${pingBg[ping]}`}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
                <span className="text-[7px] sm:text-[9px] text-slate-500 font-mono">{ms}</span>
              </div>
            </motion.div>
          )
        })}

        <div className="flex items-center gap-1.5 px-1">
          <span className="size-1 sm:size-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-[7px] sm:text-[9px] text-slate-500 font-mono">All endpoints live · Hono v4</span>
        </div>
      </div>
    ),
  },
]

// ─── Hook for responsive detection ───────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FileChip({
  label,
  color,
  position,
  toCenter,
  delay,
}: {
  label: string
  color: string
  position: { x: number; y: number }
  toCenter: boolean
  delay: number
}) {
  const c = COLOR[color]
  const isMobile = useIsMobile()
  
  return (
    <motion.div
      initial={{ x: position.x, y: position.y, opacity: 0, scale: 0.65, rotate: -4 }}
      animate={
        toCenter
          ? { x: 0, y: 0, opacity: 0, scale: 0.2, rotate: 0 }
          : { x: position.x, y: position.y, opacity: 1, scale: 1, rotate: 0 }
      }
      exit={{ opacity: 0, scale: 0.25, transition: { duration: 0.3 } }}
      transition={
        toCenter
          ? { duration: 0.75, delay, ease: easeFast }
          : { duration: 0.7, delay, ease: easeSnap }
      }
      className={`absolute flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl font-mono text-[9px] sm:text-xs font-medium whitespace-nowrap backdrop-blur-sm border ${c.bg} ${c.border} ${c.text}`}
    >
      <span className={`size-1 sm:size-1.5 rounded-full ${c.pill} opacity-80`} />
      {label}
    </motion.div>
  )
}

function CoreNode({ pulse }: { pulse: boolean }) {
  const isMobile = useIsMobile()
  
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -12 }}
      animate={{ scale: pulse ? 1.12 : 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0.4, opacity: 0, transition: { duration: 0.35 } }}
      transition={{ duration: pulse ? 0.25 : 0.65, ease: easeSnap }}
      className={`absolute flex flex-col items-center justify-center ${isMobile ? 'size-20' : 'size-27'}`}
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full rounded-xl sm:rounded-2xl bg-[#0c1017] border-2 border-cyan-500/60 backdrop-blur-lg overflow-hidden">
        <div className="relative z-10 flex items-center justify-center">
          <img src="/logo.svg" alt="Bini.js" className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} object-contain`} />
        </div>
      </div>
    </motion.div>
  )
}

function AnimatedLine({
  x1,
  y1,
  x2,
  y2,
  delay = 0,
  color = 'emerald',
}: {
  x1: string
  y1: number
  x2: string
  y2: number
  delay?: number
  color?: string
}) {
  const lineColor = COLOR[color]?.line || 'stroke-emerald-400'

  return (
    <>
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className={`stroke-slate-700 stroke-2`}
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ delay, duration: 0.7, ease: easeSmooth }}
      />
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className={`${lineColor} stroke-2`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.8, ease: easeSmooth }}
      />
      <motion.circle
        r="4"
        className={`fill-${color}-400`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          offsetDistance: ['0%', '100%'],
        }}
        transition={{
          duration: 1.5,
          delay: delay + 0.8,
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: 'linear',
        }}
        style={{
          offsetPath: `path("M${x1} ${y1} L${x2} ${y2}")`,
          offsetRotate: 'auto',
        }}
      />
    </>
  )
}

function RouteNode({
  label,
  colorClass,
  borderClass,
  textClass,
  top,
  left,
  delay,
}: {
  label: string
  colorClass: string
  borderClass: string
  textClass: string
  top: string
  left: string
  delay: number
}) {
  const isMobile = useIsMobile()
  
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.45, ease: easeSnap }}
      className={`absolute -translate-x-1/2 ${isMobile ? 'px-2.5 py-1 text-[8px]' : 'px-4 py-1.5 text-xs'} rounded-xl backdrop-blur-sm border font-semibold ${colorClass} ${borderClass} ${textClass}`}
      style={{ top, left }}
    >
      {label}
    </motion.div>
  )
}

function ViteBuildPhase({ complete }: { complete: boolean }) {
  const isMobile = useIsMobile()
  const output = isMobile ? VITE_OUTPUT_MOBILE : VITE_OUTPUT
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.5 }}
      className={`absolute flex flex-col gap-3 sm:gap-4 ${isMobile ? 'w-72' : 'w-130'}`}
    >
      <div className="relative w-full rounded-lg sm:rounded-xl overflow-hidden border border-slate-700/50 bg-[#0d1117] backdrop-blur-sm p-3 sm:p-5 font-mono">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          <Zap className="size-3 sm:size-4 text-emerald-400" />
          <span className="text-[9px] sm:text-[12px] font-semibold">
            <span className="text-emerald-400">vite</span>
            <span className="text-slate-400"> v8.0.8 </span>
            <span className="text-slate-500">{isMobile ? 'building...' : 'building client environment for production...'}</span>
          </span>
        </div>

        <div className="mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Check className="size-3 sm:size-3.5 text-emerald-400" />
            <span className="text-[9px] sm:text-[11px] text-emerald-400">26 modules transformed.</span>
          </div>
          <div className="text-[8px] sm:text-[10px] text-slate-500 pl-4 sm:pl-5 mt-0.5">computing gzip size...</div>
        </div>

        <div className="space-y-0.5">
          {output.map((item, i) => {
            const getIcon = (file: string) => {
              if (file.endsWith('.html')) return <FileCode className="size-2.5 sm:size-3" />
              if (file.endsWith('.css')) return <FileText className="size-2.5 sm:size-3" />
              if (file.endsWith('.js')) return <FileJson className="size-2.5 sm:size-3" />
              return <Box className="size-2.5 sm:size-3" />
            }

            const getFileColor = (file: string) => {
              if (file.endsWith('.html')) return 'text-amber-400'
              if (file.endsWith('.css')) return 'text-cyan-400'
              if (file.endsWith('.js')) return 'text-purple-400'
              return 'text-slate-400'
            }

            return (
              <motion.div
                key={item.file}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
                className="flex items-center text-[8px] sm:text-[10px]"
              >
                <span className="text-slate-500 w-12 sm:w-16 flex items-center gap-1">
                  {getIcon(item.file)}
                  {!isMobile && 'dist/'}
                </span>
                <span className={getFileColor(item.file)}>
                  {isMobile ? item.file : item.file.replace('dist/', '')}
                </span>
                <span className="ml-auto text-slate-500 tabular-nums">
                  {item.size}
                  {complete && (
                    <span className="text-slate-600">
                      {' '}
                      │ <span className="hidden sm:inline">gzip: </span>
                      <span className="text-emerald-400/70">{item.gzip}</span>
                    </span>
                  )}
                </span>
              </motion.div>
            )
          })}
        </div>

        {complete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="mt-2 sm:mt-3 flex items-center gap-1.5 sm:gap-2"
          >
            <Check className="size-3 sm:size-3.5 text-emerald-400" />
            <span className="text-[9px] sm:text-[11px]">
              <span className="text-emerald-400">✓ built in </span>
              <span className="text-emerald-400 font-bold">330ms</span>
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function DeployPhase() {
  const isMobile = useIsMobile()
  const row1 = DEPLOY_PLATFORMS.slice(0, 2)
  const row2 = DEPLOY_PLATFORMS.slice(2, 3)
  const row3 = DEPLOY_PLATFORMS.slice(3, 5)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: easeSmooth }}
      className={`absolute ${isMobile ? 'w-80 -mt-4' : 'w-140 -mt-8'}`}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-3 sm:mb-4"
      >
        <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1 sm:py-1.5 rounded-full bg-linear-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/40 text-[9px] sm:text-xs font-bold text-purple-300 font-mono">
          <Rocket className="size-3 sm:size-3.5" />
          {isMobile ? 'Deploy Everywhere' : 'One Codebase · Deploy Everywhere'}
        </span>
      </motion.div>

      <div className="flex flex-col gap-2 sm:gap-3">
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {row1.map((platform, i) => {
            const col = COLOR[platform.color]
            return (
              <motion.div
                key={platform.name}
                initial={{ x: i === 0 ? -20 : 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.45, ease: easeSnap }}
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden rounded-md sm:rounded-lg border backdrop-blur-sm ${col.bg} ${col.border} p-2 sm:p-3 cursor-pointer group`}
              >
                <div className="flex items-start gap-2 sm:gap-2.5">
                  <div className={`${platform.iconColor} mt-0.5`}>
                    <SimpleIcon icon={platform.icon} size={isMobile ? 14 : 18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                      <span className={`text-[10px] sm:text-xs font-bold ${col.text} font-sans`}>
                        {platform.name}
                      </span>
                      <span className="text-[6px] sm:text-[8px] px-1 sm:px-1.5 py-0.5 rounded bg-slate-800/50 text-slate-400 font-mono">
                        {platform.runtime}
                      </span>
                    </div>
                    <div className="text-[7px] sm:text-[9px] text-slate-400 font-mono truncate bg-slate-900/30 rounded px-1.5 sm:px-2 py-0.5 sm:py-1">
                      {isMobile ? platform.entry.split('/').pop() : platform.entry}
                    </div>
                  </div>
                  <motion.div
                    className={`size-1 sm:size-1.5 rounded-full ${col.pill} mt-1 shrink-0`}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="flex justify-center">
          <div className="w-1/2">
            {row2.map((platform, i) => {
              const col = COLOR[platform.color]
              return (
                <motion.div
                  key={platform.name}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.45, ease: easeSnap }}
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  className={`relative overflow-hidden rounded-md sm:rounded-lg border backdrop-blur-sm ${col.bg} ${col.border} p-2 sm:p-3 cursor-pointer group w-full`}
                >
                  <div className="flex items-start gap-2 sm:gap-2.5">
                    <div className={`${platform.iconColor} mt-0.5`}>
                      <SimpleIcon icon={platform.icon} size={isMobile ? 14 : 18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                        <span className={`text-[10px] sm:text-xs font-bold ${col.text} font-sans`}>
                          {platform.name}
                        </span>
                        <span className="text-[6px] sm:text-[8px] px-1 sm:px-1.5 py-0.5 rounded bg-slate-800/50 text-slate-400 font-mono">
                          {platform.runtime}
                        </span>
                      </div>
                      <div className="text-[7px] sm:text-[9px] text-slate-400 font-mono truncate bg-slate-900/30 rounded px-1.5 sm:px-2 py-0.5 sm:py-1">
                        {isMobile ? platform.entry.split('/').pop() : platform.entry}
                      </div>
                    </div>
                    <motion.div
                      className={`size-1 sm:size-1.5 rounded-full ${col.pill} mt-1 shrink-0`}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 2 * 0.3 }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {row3.map((platform, i) => {
            const col = COLOR[platform.color]
            return (
              <motion.div
                key={platform.name}
                initial={{ x: i === 0 ? -20 : 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.45, ease: easeSnap }}
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden rounded-md sm:rounded-lg border backdrop-blur-sm ${col.bg} ${col.border} p-2 sm:p-3 cursor-pointer group`}
              >
                <div className="flex items-start gap-2 sm:gap-2.5">
                  <div className={`${platform.iconColor} mt-0.5`}>
                    <SimpleIcon icon={platform.icon} size={isMobile ? 14 : 18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                      <span className={`text-[10px] sm:text-xs font-bold ${col.text} font-sans`}>
                        {platform.name}
                      </span>
                      <span className="text-[6px] sm:text-[8px] px-1 sm:px-1.5 py-0.5 rounded bg-slate-800/50 text-slate-400 font-mono">
                        {platform.runtime}
                      </span>
                    </div>
                    <div className="text-[7px] sm:text-[9px] text-slate-400 font-mono truncate bg-slate-900/30 rounded px-1.5 sm:px-2 py-0.5 sm:py-1">
                      {isMobile ? platform.entry.split('/').pop() : platform.entry}
                    </div>
                  </div>
                  <motion.div
                    className={`size-1 sm:size-1.5 rounded-full ${col.pill} mt-1 shrink-0`}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: (i + 3) * 0.3 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        className="mt-3 sm:mt-4 text-center"
      >
        <div className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-slate-800/60 border border-slate-700/50">
          <Check className="size-2.5 sm:size-3 text-emerald-400" />
          <span className="text-[8px] sm:text-[10px] text-slate-300 font-mono">
            {isMobile ? 'Same code · Zero config' : 'Same code · Different platforms · Zero config'}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

function FinalAppCard({ activeNavIdx }: { activeNavIdx: number }) {
  const isMobile = useIsMobile()
  const NAV_LABELS = NAV_CONTENT.map((n) => n.label)

  return (
    <motion.div
      initial={{ scale: 0.65, opacity: 0, y: 24 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: easeSnap }}
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#080c12] border border-slate-700/60 backdrop-blur-xl ${isMobile ? 'w-80' : 'w-90'}`}
    >
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-slate-800">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <div className="size-2 sm:size-2.5 rounded-full bg-red-500 opacity-80" />
          <div className="size-2 sm:size-2.5 rounded-full bg-amber-400 opacity-80" />
          <div className="size-2 sm:size-2.5 rounded-full bg-emerald-500 opacity-80" />
        </div>

        <div className="flex-1 mx-1.5 sm:mx-2 flex items-center bg-slate-800/80 border border-slate-700/50 rounded-md px-2 sm:px-3 py-0.5 sm:py-1 gap-1.5 sm:gap-2">
          <img src="/logo.svg" alt="Bini.js" className="size-3 sm:size-3.5 object-contain opacity-80" />
          <AnimatePresence mode="wait">
            <motion.span
              key={activeNavIdx}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-[7px] sm:text-[9px] text-slate-500 font-mono truncate"
            >
              {activeNavIdx === 0
                ? 'bini.js / home'
                : activeNavIdx === 1
                  ? 'bini.js / blog'
                  : 'bini.js / api'}
            </motion.span>
          </AnimatePresence>
        </div>

        {NAV_LABELS.map((nav, ni) => (
          <motion.span
            key={nav}
            animate={
              activeNavIdx === ni
                ? {
                    background: 'linear-gradient(135deg,#06b6d4,#3b82f6)',
                    color: '#fff',
                  }
                : { background: 'transparent', color: '#475569' }
            }
            transition={{ duration: 0.28 }}
            className="text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md tracking-wide shrink-0 font-mono"
          >
            {nav}
          </motion.span>
        ))}
      </div>

      <div className={`p-3 sm:p-5 overflow-hidden ${isMobile ? 'min-h-32' : 'min-h-40'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNavIdx}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: easeSmooth }}
          >
            {NAV_CONTENT[activeNavIdx].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function BiniAnimation() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [phaseLabel, setPhaseLabel] = useState('')
  const [fileState, setFileState] = useState<'scattered' | 'center' | 'hidden'>('scattered')
  const [coreVisible, setCoreVisible] = useState(false)
  const [corePulse, setCorePulse] = useState(false)
  const [routeVisible, setRouteVisible] = useState(false)
  const [buildVisible, setBuildVisible] = useState(false)
  const [buildComplete, setBuildComplete] = useState(false)
  const [apiVisible, setApiVisible] = useState(false)
  const [mergeDotsVisible, setMergeDotsVisible] = useState(false)
  const [deployVisible, setDeployVisible] = useState(false)
  const [finalVisible, setFinalVisible] = useState(false)
  const [activeNavIdx, setActiveNavIdx] = useState(0)
  const [taglineVisible, setTaglineVisible] = useState(false)

  const isMobile = useIsMobile()
  const filePositions = isMobile ? FILE_POSITIONS_MOBILE : FILE_POSITIONS
  const mergeDots = isMobile ? MERGE_DOTS_MOBILE : MERGE_DOTS

  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])
  const intervals = useRef<ReturnType<typeof setInterval>[]>([])

  const later = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms)
    timeouts.current.push(t)
    return t
  }

  function resetAll() {
    timeouts.current.forEach(clearTimeout)
    intervals.current.forEach(clearInterval)
    timeouts.current = []
    intervals.current = []
    setPhase('idle')
    setPhaseLabel('')
    setFileState('scattered')
    setCoreVisible(false)
    setCorePulse(false)
    setRouteVisible(false)
    setBuildVisible(false)
    setBuildComplete(false)
    setApiVisible(false)
    setMergeDotsVisible(false)
    setDeployVisible(false)
    setFinalVisible(false)
    setActiveNavIdx(0)
    setTaglineVisible(false)
  }

  async function play() {
    resetAll()
    await new Promise((r) => later(r as () => void, 200))

    setPhaseLabel('Raw codebase')
    setPhase('phase1')
    setFileState('scattered')

    later(() => {
      setPhaseLabel('Bini orchestrates')
      setPhase('phase2')
      setCoreVisible(true)
      later(() => {
        setFileState('center')
        later(() => {
          setCorePulse(true)
          later(() => setCorePulse(false), 500)
        }, 1000)
      }, 600)

      later(() => {
        setPhaseLabel('File-based routing')
        setPhase('phase3a')
        setCoreVisible(false)
        setFileState('hidden')
        later(() => setRouteVisible(true), 450)

        later(() => {
          setPhaseLabel('Lightning build with Vite 8')
          setPhase('phase3b')
          setRouteVisible(false)
          later(() => {
            setBuildVisible(true)
            later(() => setBuildComplete(true), 2000)
          }, 450)

          later(() => {
            setPhaseLabel('Integrated API layer')
            setPhase('phase3c')
            setBuildVisible(false)
            setBuildComplete(false)
            later(() => setApiVisible(true), 450)

            later(() => {
              setPhaseLabel('One unified system')
              setPhase('phase4')
              setApiVisible(false)
              later(() => setMergeDotsVisible(true), 350)

              later(() => {
                setPhaseLabel('Deploy anywhere')
                setPhase('phase5')
                setMergeDotsVisible(false)
                later(() => setDeployVisible(true), 400)

                later(() => {
                  setPhaseLabel('')
                  setPhase('phase6')
                  setDeployVisible(false)
                  later(() => {
                    setFinalVisible(true)
                    setActiveNavIdx(0)

                    later(() => setActiveNavIdx(1), 900)
                    later(() => setActiveNavIdx(2), 1900)

                    later(() => {
                      setTaglineVisible(true)
                      later(() => play(), 4800)
                    }, 2800)
                  }, 400)
                }, 3500)
              }, 2500)
            }, 2500)
          }, 2500)
        }, 2500)
      }, 2500)
    }, 2500)
  }

  useEffect(() => {
    play()
    return () => {
      timeouts.current.forEach(clearTimeout)
      intervals.current.forEach(clearInterval)
    }
  }, [isMobile])

  return (
    <div className={`relative w-full flex items-center justify-center select-none overflow-hidden ${isMobile ? 'min-h-110' : 'min-h-150'}`}>
      <style>{`
        @keyframes flow {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .animate-flow {
          animation: flow 2s ease-in-out infinite;
        }
      `}</style>

      <AnimatePresence mode="wait">
        {phaseLabel && (
          <motion.div
            key={phaseLabel}
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: easeSmooth }}
            className={`absolute ${isMobile ? 'bottom-4' : 'bottom-7'} left-0 right-0 flex justify-center z-20 pointer-events-none`}
          >
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 backdrop-blur-md text-[8px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase text-cyan-400 font-mono">
              <motion.span
                className="size-1 sm:size-1.5 rounded-full bg-cyan-400"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              {phaseLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {(phase === 'phase1' || phase === 'phase2') &&
            FILES.map((f, i) => (
              <FileChip
                key={f.id}
                label={f.label}
                color={f.color}
                position={filePositions[i]}
                toCenter={fileState === 'center'}
                delay={i * 0.12}
              />
            ))}
        </AnimatePresence>

        <AnimatePresence>{coreVisible && <CoreNode pulse={corePulse} />}</AnimatePresence>

        <AnimatePresence>
          {routeVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.55 }}
              className={`absolute ${isMobile ? 'w-70 h-60' : 'w-105 h-80'}`}
            >
              <motion.div
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className={`absolute left-1/2 -translate-x-1/2 ${isMobile ? 'top-2' : 'top-4'} px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-cyan-500/10 border-2 border-cyan-500/70 text-xs sm:text-sm font-bold text-cyan-400 backdrop-blur-sm font-mono`}
              >
                /
              </motion.div>

              <svg className="absolute inset-0 w-full h-full z-10">
                <AnimatedLine x1="50%" y1={isMobile ? 40 : 52} x2="18%" y2={isMobile ? 100 : 140} delay={0.45} color="cyan" />
                <AnimatedLine x1="50%" y1={isMobile ? 40 : 52} x2="50%" y2={isMobile ? 100 : 140} delay={0.55} color="purple" />
                <AnimatedLine x1="50%" y1={isMobile ? 40 : 52} x2="82%" y2={isMobile ? 100 : 140} delay={0.65} color="emerald" />
                <AnimatedLine x1="50%" y1={isMobile ? 120 : 172} x2="40%" y2={isMobile ? 170 : 240} delay={0.85} color="amber" />
              </svg>

              <RouteNode
                label="/about"
                top={isMobile ? "100px" : "140px"}
                left="18%"
                colorClass="bg-cyan-500/10"
                borderClass="border-cyan-500/50"
                textClass="text-cyan-400"
                delay={0.55}
              />

              <RouteNode
                label="/blog"
                top={isMobile ? "100px" : "140px"}
                left="50%"
                colorClass="bg-violet-500/10"
                borderClass="border-violet-500/50"
                textClass="text-violet-400"
                delay={0.65}
              />

              <RouteNode
                label="/api/*"
                top={isMobile ? "100px" : "140px"}
                left="82%"
                colorClass="bg-emerald-500/10"
                borderClass="border-emerald-500/60"
                textClass="text-emerald-400"
                delay={0.75}
              />

              <RouteNode
                label="/blog/[slug]"
                top={isMobile ? "170px" : "240px"}
                left="40%"
                colorClass="bg-amber-500/10"
                borderClass="border-amber-500/60"
                textClass="text-amber-400"
                delay={0.9}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {buildVisible && <ViteBuildPhase complete={buildComplete} />}
        </AnimatePresence>

        <AnimatePresence>
          {apiVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.55 }}
              className={`absolute flex flex-col items-center gap-4 sm:gap-7 ${isMobile ? 'w-72' : 'w-95'}`}
            >
              <motion.div
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="px-5 sm:px-8 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/60 text-[11px] sm:text-[13px] font-bold text-emerald-400 backdrop-blur-sm font-mono"
              >
                Hono API Gateway
              </motion.div>
              <div className="flex gap-3 sm:gap-5">
                {[
                  { m: 'GET', c: 'emerald' },
                  { m: 'POST', c: 'blue' },
                  { m: 'PUT', c: 'amber' },
                  { m: 'DELETE', c: 'rose' },
                ].map(({ m, c }, i) => {
                  const col = COLOR[c]
                  return (
                    <motion.span
                      key={m}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.4 + i * 0.12,
                        duration: 0.4,
                        ease: easeSnap,
                      }}
                      className={`px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[8px] sm:text-[10px] font-bold tracking-widest backdrop-blur-sm border ${col.bg} ${col.border} ${col.text} font-mono`}
                    >
                      {m}
                    </motion.span>
                  )
                })}
              </div>
              <div className="w-full flex flex-col gap-1.5 sm:gap-2">
                {[
                  { path: '/api/users', method: 'GET', color: 'emerald' },
                  { path: '/api/posts', method: 'POST', color: 'blue' },
                  { path: '/api/uploads', method: 'PUT', color: 'amber' },
                ].map(({ path, method, color }, i) => {
                  const col = COLOR[color]
                  return (
                    <motion.div
                      key={path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + i * 0.14, duration: 0.4 }}
                      className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border backdrop-blur-sm ${col.bg} ${col.border}`}
                    >
                      <span className={`text-[9px] sm:text-[10px] font-bold min-w-9 sm:min-w-10.5 ${col.text} font-mono`}>
                        {method}
                      </span>
                      <span className="text-[9px] sm:text-[11px] text-slate-400 font-mono truncate">{isMobile ? path.replace('/api/', '') : path}</span>
                      <motion.span
                        className={`ml-auto size-1 sm:size-1.5 rounded-full ${col.pill}`}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mergeDotsVisible &&
            mergeDots.map((d, i) => {
              const col = COLOR[d.color]
              return (
                <motion.div
                  key={i}
                  initial={{ x: d.x, y: d.y, opacity: 1, scale: 1 }}
                  animate={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.85,
                    delay: i * 0.09,
                    ease: 'easeInOut',
                  }}
                  className={`absolute ${isMobile ? 'size-4' : 'size-5'} rounded-full ${col.pill}`}
                />
              )
            })}
        </AnimatePresence>

        <AnimatePresence>{deployVisible && <DeployPhase />}</AnimatePresence>

        <AnimatePresence>
          {finalVisible && <FinalAppCard activeNavIdx={activeNavIdx} />}
        </AnimatePresence>

        <AnimatePresence>
          {taglineVisible && (
            <motion.p
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: easeSmooth }}
              className={`absolute whitespace-nowrap tracking-tight font-bold ${isMobile ? 'text-lg -bottom-16' : 'text-2xl -bottom-22'} bg-linear-to-r from-slate-200 via-slate-300 to-slate-400 bg-clip-text text-transparent font-sans`}
            >
              Build.&thinsp;Ship.&thinsp;Scale.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}