import { motion, AnimatePresence } from 'framer-motion'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { siReact, siVite } from 'simple-icons'
import type { SimpleIcon as SimpleIconType } from 'simple-icons'

// ─── Hono Logo ───────────────────────────────────────────────
function HonoLogo({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size}>
      <path fill="#ff5b11" d="M12.4365 0.2520325c0.062375-0.0080215 0.11745 0.0077075 0.16515 0.0471875 1.755075 2.142025 3.40665 4.359855 4.954725 6.65348 1.14615 1.725625 2.121325 3.550175 2.92565 5.4738 1.2845 3.426025 0.616 6.40675-2.005475 8.9421-2.293725 1.938575-4.936225 2.693575-7.927575 2.265025-3.57555-0.729025-6.00575-2.7974-7.290525-6.205225-0.33465-1.109425-0.44475-2.241925-0.3303-3.397525 0.19055-1.9891 0.662425-3.9081 1.415625-5.7569 0.31385-0.75435 0.722825-1.4464 1.2269-2.076275 0.411225 0.4898 0.80445 0.993175 1.179675 1.510025 0.17375 0.181625 0.354625 0.35465 0.542675 0.51905C8.728325 5.378325 10.44285 2.7201 12.4365 0.2520325Z" opacity=".993" strokeWidth="0.25"/>
      <path fill="#ff9758" d="M12.10625 4.07425c1.73145 2.008325 3.296525 4.1475 4.695175 6.41755 0.438525 0.75115 0.800275 1.537625 1.085325 2.3594 0.593825 2.336175-0.043225 4.26305-1.9111 5.7805-1.80655 1.2712-3.788425 1.6487-5.945675 1.132525-2.326325-0.721875-3.671175-2.286975-4.034575-4.6952-0.088175-0.7593-0.009525-1.4986 0.23595-2.217825 0.35005-0.888875 0.774725-1.73825 1.274075-2.54815 0.471875-0.6921 0.94375-1.38415 1.415625-2.07625 1.071925-1.378375 2.13365-2.762525 3.1852-4.15255Z" strokeWidth="0.25"/>
    </svg>
  )
}

// ─── Tool definitions ─────────────────────────────────────────
const TOOLS = [
  {
    name: 'Vite 8',
    icon: siVite as SimpleIconType,
    color: '#a855f7',
    description: 'Next Generation Frontend Tooling',
    features: ['Rust-powered build', 'Instant HMR', 'Optimized bundles'],
    chipSide: 'left' as const,
  },
  {
    name: 'React 19',
    icon: siReact as SimpleIconType,
    color: '#00e5ff',
    description: 'The Library for Web & Native',
    features: ['Actions', 'Concurrent rendering', 'Compiler'],
    chipSide: 'bottom' as const,
  },
  {
    name: 'Hono 4',
    icon: null as SimpleIconType | null,
    color: '#f97316',
    description: 'Ultrafast Edge Framework',
    features: ['Edge-ready', 'Middleware', 'Type-safe RPC'],
    chipSide: 'right' as const,
  },
]

// ─── Types ────────────────────────────────────────────────────
interface WireGeo {
  sx: number; sy: number
  b1x: number; b1y: number
  b2x: number; b2y: number
  ex: number; ey: number
  d: string
  totalLength: number
}

interface Geo {
  w: number; h: number
  chipLeft: { x: number; y: number }
  chipBottom: { x: number; y: number }
  chipRight: { x: number; y: number }
  cardTops: number[]
  cardCxs: number[]
}

function segLen(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(bx - ax, by - ay)
}

// ─── Chip diagonal sweep (bottom-left → top-right) - Professional & Subtle ───
function ChipSweepLight() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
      style={{ zIndex: 10 }}
    >
      <motion.div
        style={{
          position: 'absolute',
          width: '220%',
          height: '220%',
          top: '-60%',
          left: '-160%',
          // More subtle, professional gradient with lower opacity
          background:
            'linear-gradient(125deg, transparent 40%, rgba(255,255,255,0.0) 44%, rgba(255,255,255,0.04) 48%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.04) 52%, rgba(255,255,255,0.0) 56%, transparent 60%)',
          transform: 'rotate(0deg)',
        }}
        animate={{ left: ['-160%', '120%'] }}
        transition={{
          duration: 3.0,
          repeat: Infinity,
          repeatDelay: 2.5,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

// ─── Continuous light ray ─────────────────────────────────────
function LightRay({
  wire,
  color,
  duration = 1.8,
  delay = 0,
  glowIntensity = 4,
}: {
  wire: WireGeo
  color: string
  duration?: number
  delay?: number
  glowIntensity?: number
}) {
  const pathRef = useRef<SVGPathElement>(null)
  const [len, setLen] = useState(wire.totalLength || 300)

  useEffect(() => {
    if (pathRef.current) {
      const l = pathRef.current.getTotalLength()
      if (l > 0) setLen(l)
    }
  }, [wire.d])

  const dashLen = Math.min(len * 0.18, 70)
  const travel = len + dashLen * 2

  return (
    <motion.path
      ref={pathRef}
      d={wire.d}
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={`${dashLen} ${len + dashLen}`}
      animate={{ strokeDashoffset: [travel, -travel] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{ filter: `drop-shadow(0 0 ${glowIntensity}px ${color})` }}
    />
  )
}

// ─── Main component ───────────────────────────────────────────
export function FoundationAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const chipRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<React.RefObject<HTMLDivElement | null>>>(
    TOOLS.map(() => React.createRef())
  )

  const [geo, setGeo] = useState<Geo | null>(null)

  useEffect(() => {
    const measure = () => {
      const cont = containerRef.current
      const chip = chipRef.current
      if (!cont || !chip) return
      const cr = cont.getBoundingClientRect()
      const hr = chip.getBoundingClientRect()

      const chipCx = hr.left - cr.left + hr.width / 2
      const chipCy = hr.top - cr.top + hr.height / 2

      const cardTops: number[] = []
      const cardCxs: number[] = []
      for (const ref of cardRefs.current) {
        const el = ref.current
        if (!el) { cardTops.push(0); cardCxs.push(0); continue }
        const r = el.getBoundingClientRect()
        cardTops.push(r.top - cr.top)
        cardCxs.push(r.left - cr.left + r.width / 2)
      }

      setGeo({
        w: cr.width,
        h: cr.height,
        chipLeft:   { x: hr.left - cr.left,           y: chipCy },
        chipBottom: { x: chipCx,                       y: hr.bottom - cr.top },
        chipRight:  { x: hr.left - cr.left + hr.width, y: chipCy },
        cardTops,
        cardCxs,
      })
    }

    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    const t = setTimeout(measure, 200)
    return () => { ro.disconnect(); clearTimeout(t) }
  }, [])

  const getWire = useCallback((col: number): WireGeo | null => {
    if (!geo) return null
    const tool = TOOLS[col]
    const sx = geo.cardCxs[col]
    const sy = geo.cardTops[col]
    let ex: number, ey: number
    let b1x: number, b1y: number
    let b2x: number, b2y: number
    let d: string

    if (tool.chipSide === 'left') {
      ex = geo.chipLeft.x; ey = geo.chipLeft.y
      b1x = sx;  b1y = ey
      b2x = ex;  b2y = ey
      d = `M ${sx} ${sy} L ${b1x} ${b1y} L ${ex} ${ey}`
    } else if (tool.chipSide === 'bottom') {
      ex = geo.chipBottom.x; ey = geo.chipBottom.y
      b1x = sx;  b1y = sy + (ey - sy) * 0.5
      b2x = ex;  b2y = b1y
      d = `M ${sx} ${sy} L ${b1x} ${b1y} L ${b2x} ${b2y} L ${ex} ${ey}`
    } else {
      ex = geo.chipRight.x; ey = geo.chipRight.y
      b1x = sx;  b1y = ey
      b2x = ex;  b2y = ey
      d = `M ${sx} ${sy} L ${b1x} ${b1y} L ${ex} ${ey}`
    }

    const d1 = segLen(sx, sy, b1x, b1y)
    const d2 = segLen(b1x, b1y, b2x, b2y)
    const d3 = segLen(b2x, b2y, ex, ey)

    return { sx, sy, b1x, b1y, b2x, b2y, ex, ey, d, totalLength: d1 + d2 + d3 }
  }, [geo])

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-hidden"
      style={{ minHeight: 520 }}
    >
      {geo && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={geo.w}
          height={geo.h}
          style={{ zIndex: 1 }}
        >
          <defs>
            {TOOLS.map((tool, i) => (
              <linearGradient key={i} id={`wg${i}`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor={tool.color} stopOpacity="0.07" />
                <stop offset="100%" stopColor={tool.color} stopOpacity={i === 1 ? "0.65" : "0.45"} />
              </linearGradient>
            ))}
          </defs>

          {/* Static wire tracks */}
          {TOOLS.map((tool, i) => {
            const w = getWire(i)
            if (!w) return null
            
            // Only change opacity for React wire, keep everything else same
            const trackOpacity = i === 1 ? 0.08 : 0.03
            
            return (
              <g key={i}>
                <path 
                  d={w.d} 
                  fill="none" 
                  stroke={tool.color} 
                  strokeWidth={8} 
                  strokeOpacity={trackOpacity} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  d={w.d} 
                  fill="none" 
                  stroke={`url(#wg${i})`} 
                  strokeWidth={1} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <circle cx={w.sx} cy={w.sy} r={2} fill={tool.color} opacity={0.3} />
                <circle cx={w.ex} cy={w.ey} r={2} fill={tool.color} opacity={0.5} />
              </g>
            )
          })}

          {/* Continuous light rays */}
          {TOOLS.map((tool, i) => {
            const w = getWire(i)
            if (!w) return null
            
            return (
              <LightRay
                key={i}
                wire={w}
                color={tool.color}
                duration={2.0 + i * 0.3}
                delay={i * 0.65}
                glowIntensity={i === 1 ? 6 : 4}
              />
            )
          })}
        </svg>
      )}

      <div className="relative flex flex-col items-center pt-10 pb-14 px-6" style={{ zIndex: 2 }}>

        {/* Chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex gap-1.5 mb-1.5">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="w-px h-4 rounded-full"
                style={{ background: i === 3 ? '#00e5ff' : 'rgb(71 85 105)' }}
                animate={{ opacity: i === 3 ? [0.4, 0.8, 0.4] : [0.15, 0.4, 0.15] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.13 }}
              />
            ))}
          </div>

          <div className="relative flex items-center">
            <div className="flex flex-col gap-2 mr-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-px w-4 rounded-full"
                  style={{ background: i === 2 ? '#a855f7' : 'rgb(71 85 105)' }}
                  animate={{ opacity: i === 2 ? [0.4, 0.8, 0.4] : [0.15, 0.4, 0.15] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </div>

            <motion.div
              ref={chipRef}
              className="relative w-32 h-32 rounded-2xl flex items-center justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                border: '1px solid rgba(148,163,184,0.08)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
              }}
            >
              <ChipSweepLight />

              <svg className="absolute inset-0 w-full h-full opacity-[0.1]" viewBox="0 0 128 128">
                <line x1="0"   y1="64"  x2="28"  y2="64"  stroke="#a855f7" strokeWidth="1.5" />
                <circle cx="28" cy="64" r="2" fill="#a855f7" />
                <line x1="64"  y1="128" x2="64"  y2="100" stroke="#00e5ff" strokeWidth="1.5" />
                <circle cx="64" cy="100" r="2" fill="#00e5ff" />
                <line x1="128" y1="64"  x2="100" y2="64"  stroke="#f97316" strokeWidth="1.5" />
                <circle cx="100" cy="64" r="2" fill="#f97316" />
                <rect x="44" y="44" width="40" height="40" rx="4"
                  fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="0.75" />
              </svg>

              <img
                src="/logo.svg"
                alt="Bini.js"
                className="relative w-14 h-14 object-contain z-10"
              />
            </motion.div>

            <div className="flex flex-col gap-2 ml-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-px w-4 rounded-full"
                  style={{ background: i === 2 ? '#f97316' : 'rgb(71 85 105)' }}
                  animate={{ opacity: i === 2 ? [0.4, 0.8, 0.4] : [0.15, 0.4, 0.15] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.18 + 0.5 }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-1.5 mt-1.5">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="w-px h-4 rounded-full"
                style={{ background: i === 3 ? '#00e5ff' : 'rgb(71 85 105)' }}
                animate={{ opacity: i === 3 ? [0.4, 0.8, 0.4] : [0.15, 0.4, 0.15] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.13 + 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        <div className="h-16" />

        {/* Cards */}
        <div className="flex items-stretch justify-center gap-4 w-full flex-wrap sm:flex-nowrap">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              ref={cardRefs.current[i] as React.RefObject<HTMLDivElement>}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              className="flex-1 min-w-45 max-w-55 rounded-2xl p-5 flex flex-col gap-3 cursor-default"
              style={{
                background: 'linear-gradient(160deg, #151f2e 0%, #0d1422 100%)',
                border: `1px solid ${tool.color}1a`,
                boxShadow: `0 0 0 1px ${tool.color}08, 0 8px 28px rgba(0,0,0,0.28)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${tool.color}12`, border: `1px solid ${tool.color}22` }}
                >
                  {tool.name === 'Hono 4' ? (
                    <HonoLogo size={20} />
                  ) : tool.icon ? (
                    <svg role="img" viewBox="0 0 24 24" width={20} height={20} fill={tool.color} dangerouslySetInnerHTML={{ __html: tool.icon.svg }} />
                  ) : null}
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold leading-tight" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    {tool.name}
                  </h3>
                  <span className="text-[10px] font-medium tracking-wide uppercase" style={{ color: tool.color, opacity: 0.7 }}>
                    {tool.name === 'Vite 8' ? 'Bundler' : tool.name === 'React 19' ? 'UI' : 'API'}
                  </span>
                </div>
              </div>

              <div style={{ height: 1, background: 'rgba(148,163,184,0.06)' }} />

              <p className="text-[11.5px] leading-relaxed" style={{ color: 'rgba(148,163,184,0.65)' }}>
                {tool.description}
              </p>

              <div className="flex flex-col gap-1.5 mt-auto">
                {tool.features.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ background: tool.color, opacity: 0.6 }} />
                    <span className="text-[11px]" style={{ color: 'rgba(148,163,184,0.5)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}