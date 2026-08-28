import { useEffect, useRef } from 'react'
import { onTick, approach, prefersReducedMotion } from '../lib/clock'
import { orbitalPosition, orbitPath, TAU } from '../lib/orbits'

/**
 * The hero's orbital field.
 *
 * A lit primary with four spacecraft on real Kepler ellipses, drawn in two
 * passes so bodies behind the primary are actually occluded by it. The plate
 * leans toward the pointer and each body drags a decaying trace, so the field
 * answers to whoever is looking at it rather than looping at them.
 */

/**
 * Semi-major axes are in canvas units where the primary's radius is 0.40, so the
 * whole system spans roughly 1.3 to 2.4 planet radii. Anything wider throws the
 * craft off-canvas, which costs the field the only thing that makes it an orbital
 * diagram rather than a picture of a planet.
 */
const ORBITS = [
  { a: 0.50, e: 0.05, omega: 0.35, period: 15, phase: 0.0, w: 2.2, tone: 'sky' },
  { a: 0.63, e: 0.22, omega: 1.95, period: 27, phase: 2.1, w: 1.9, tone: 'ink' },
  { a: 0.80, e: 0.55, omega: -0.55, period: 44, phase: 4.4, w: 2.8, tone: 'signal' },
  { a: 0.95, e: 0.10, omega: 2.75, period: 68, phase: 1.2, w: 1.7, tone: 'ink' },
]

const TONES = {
  sky: [157, 190, 255],
  ink: [245, 245, 244],
  signal: [99, 198, 155],
}

const TRAIL = 40
const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`

function makeStars(count, rand) {
  return Array.from({ length: count }, () => ({
    x: rand(),
    y: rand(),
    // Three parallax planes; nearer stars are brighter and move more.
    plane: Math.floor(rand() * 3),
    mag: 0.25 + rand() * 0.75,
    twinkle: rand() * TAU,
    rate: 0.35 + rand() * 0.9,
  }))
}

/** Small deterministic PRNG so the sky is identical on every load. */
function mulberry(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function OrbitalField({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const still = prefersReducedMotion()

    let w = 0
    let h = 0
    let dpr = 1
    let unit = 0
    let cx = 0
    let cy = 0
    let R = 0

    const stars = makeStars(340, mulberry(20270517))
    const trails = ORBITS.map(() => [])

    // Pointer state, eased rather than snapped.
    const pointer = { tx: 0, ty: 0, x: 0, y: 0 }
    let visible = true

    function measure() {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(rect.width, 1)
      h = Math.max(rect.height, 1)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const portrait = w < 860
      unit = portrait ? Math.min(w * 0.78, h * 0.44) : Math.min(w * 0.46, h * 0.82)
      R = unit * 0.40
      // Desktop: primary sits right of the text column. Mobile: below it.
      cx = portrait ? w * 0.5 : w * 0.74
      cy = portrait ? h * 0.80 : h * 0.54
    }

    function drawStars(t) {
      const shiftX = pointer.x * 10
      const shiftY = pointer.y * 6
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const depth = 0.35 + s.plane * 0.42
        const x = s.x * w + shiftX * depth
        const y = s.y * h + shiftY * depth
        if (x < -4 || x > w + 4 || y < -4 || y > h + 4) continue

        const flicker = still ? 1 : 0.78 + 0.22 * Math.sin(t * s.rate + s.twinkle)
        const alpha = s.mag * flicker * (0.22 + s.plane * 0.26)
        const size = s.plane === 2 ? 1.7 : s.plane === 1 ? 1.25 : 1
        ctx.fillStyle = `rgba(226,232,246,${alpha.toFixed(3)})`
        ctx.fillRect(x, y, size, size)
      }
    }

    /** Split a sampled orbit into behind-the-primary and in-front runs. */
    function strokeOrbit(pts, behind, tone, alpha) {
      ctx.strokeStyle = rgba(TONES[tone], alpha)
      ctx.lineWidth = 1
      let open = false
      ctx.beginPath()
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        const isBehind = p.depth < 0
        if (isBehind === behind) {
          const x = cx + p.x * unit
          const y = cy + p.y * unit
          if (!open) {
            ctx.moveTo(x, y)
            open = true
          } else {
            ctx.lineTo(x, y)
          }
        } else if (open) {
          open = false
        }
      }
      ctx.stroke()
    }

    function drawPrimary() {
      // Atmosphere: a wide, very faint halo. Offset and blurred, never a flat ring.
      const halo = ctx.createRadialGradient(cx, cy, R * 0.94, cx, cy, R * 1.42)
      halo.addColorStop(0, 'rgba(157,190,255,0.16)')
      halo.addColorStop(0.45, 'rgba(120,150,215,0.05)')
      halo.addColorStop(1, 'rgba(120,150,215,0)')
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.42, 0, TAU)
      ctx.fill()

      // The body itself: night side, then a lit crescent from the upper left.
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, TAU)
      ctx.clip()

      ctx.fillStyle = '#050609'
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2)

      const lx = cx - R * 0.62
      const ly = cy - R * 0.68
      const lit = ctx.createRadialGradient(lx, ly, R * 0.05, lx, ly, R * 2.05)
      lit.addColorStop(0, 'rgba(214,228,255,0.92)')
      lit.addColorStop(0.24, 'rgba(139,168,224,0.44)')
      lit.addColorStop(0.52, 'rgba(74,96,140,0.16)')
      lit.addColorStop(1, 'rgba(20,26,40,0)')
      ctx.fillStyle = lit
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2)
      ctx.restore()

      // Rim light along the terminator's bright edge.
      ctx.strokeStyle = 'rgba(198,218,255,0.5)'
      ctx.lineWidth = 1.1
      ctx.beginPath()
      ctx.arc(cx, cy, Math.max(R - 0.5, 0.5), Math.PI * 0.72, Math.PI * 1.86)
      ctx.stroke()
    }

    function drawBody(p, orbit, tone) {
      const x = cx + p.x * unit
      const y = cy + p.y * unit
      const near = 0.62 + 0.38 * ((p.depth + 1) / 2)
      const colour = TONES[tone]

      const glow = ctx.createRadialGradient(x, y, 0, x, y, orbit.w * 5)
      glow.addColorStop(0, rgba(colour, 0.5 * near))
      glow.addColorStop(1, rgba(colour, 0))
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(x, y, orbit.w * 5, 0, TAU)
      ctx.fill()

      ctx.fillStyle = rgba(colour, Math.min(1, 0.85 * near + 0.15))
      ctx.beginPath()
      ctx.arc(x, y, orbit.w, 0, TAU)
      ctx.fill()
    }

    function drawTrail(hist, tone) {
      if (hist.length < 2) return
      const colour = TONES[tone]
      for (let i = 1; i < hist.length; i++) {
        const k = i / hist.length
        ctx.strokeStyle = rgba(colour, 0.42 * k * k)
        ctx.lineWidth = 0.4 + k * 1.5
        ctx.beginPath()
        ctx.moveTo(cx + hist[i - 1].x * unit, cy + hist[i - 1].y * unit)
        ctx.lineTo(cx + hist[i].x * unit, cy + hist[i].y * unit)
        ctx.stroke()
      }
    }

    function render(t, dt) {
      // Before layout settles the canvas can measure at zero; nothing to draw yet.
      if (!visible || unit < 8) return

      pointer.x = approach(pointer.x, pointer.tx, 3.2, dt)
      pointer.y = approach(pointer.y, pointer.ty, 3.2, dt)

      const plate = {
        tilt: 0.46 + pointer.y * 0.11,
        spin: pointer.x * 0.14,
      }

      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, w, h)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      drawStars(t)

      const state = ORBITS.map((o) => ({
        orbit: o,
        pts: orbitPath(o, plate, 200),
        pos: orbitalPosition(o, t, plate),
      }))

      // Pass 1 — everything behind the primary.
      state.forEach(({ orbit, pts }) => strokeOrbit(pts, true, orbit.tone, 0.14))
      state.forEach(({ orbit, pos }, i) => {
        if (pos.depth < 0) {
          drawTrail(trails[i], orbit.tone)
          drawBody(pos, orbit, orbit.tone)
        }
      })

      drawPrimary()

      // Pass 2 — everything in front of it.
      state.forEach(({ orbit, pts }) => strokeOrbit(pts, false, orbit.tone, 0.28))
      state.forEach(({ orbit, pos }, i) => {
        if (pos.depth >= 0) {
          drawTrail(trails[i], orbit.tone)
          drawBody(pos, orbit, orbit.tone)
        }
      })

      if (!still) {
        state.forEach(({ pos }, i) => {
          trails[i].push({ x: pos.x, y: pos.y })
          if (trails[i].length > TRAIL) trails[i].shift()
        })
      }
    }

    measure()

    const ro = new ResizeObserver(() => {
      measure()
      if (still) render(0, 0)
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { rootMargin: '120px' }
    )
    io.observe(canvas)

    if (still) {
      // One composed frame, no clock, no pointer.
      render(6.5, 0)
      return () => {
        ro.disconnect()
        io.disconnect()
      }
    }

    const onPointerMove = (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1
    }
    const onPointerLeave = () => {
      pointer.tx = 0
      pointer.ty = 0
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave, { passive: true })

    const stop = onTick(render)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
