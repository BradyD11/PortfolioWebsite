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
 * Three orbits, not four, and each is given real clearance: semi-major axes run
 * 1.9 to 3.0 primary radii, so the paths sweep *around* the body instead of
 * grazing its limb. Four tightly-packed ellipses at mixed rotations read as a
 * tangle of scratches rather than as a system, and eccentricities are kept modest
 * so no periapsis dives back toward the surface. Nothing runs tangent to the limb
 * either: a path that grazes the silhouette reads as a coincidence, not a choice.
 */
const ORBITS = [
  { a: 0.66, e: 0.07, omega: 0.38, period: 17, phase: 0.0, w: 2.2, tone: 'sky' },
  { a: 0.85, e: 0.16, omega: 2.05, period: 32, phase: 2.3, w: 2.0, tone: 'ink' },
  { a: 1.02, e: 0.30, omega: -0.62, period: 58, phase: 4.4, w: 2.7, tone: 'signal' },
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
      R = unit * 0.34
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

    const BUCKETS = 8

    /**
     * Stroke one half of an orbit — the run behind the primary, or the run in
     * front of it.
     *
     * Two things here are doing real work. First, brightness and width follow
     * depth rather than being flat per half, so a path recedes instead of
     * switching states; because both halves use the same ramp, they meet at
     * identical values where they cross and leave no seam.
     *
     * Second, every segment is laid over a dark casing. A 1px line at low alpha
     * has almost no contrast against the primary's lit face, so an unhoused path
     * simply evaporates partway across the disc and reads as a line that stopped
     * for no reason. The casing costs nothing against black space, where it is
     * invisible, and is what lets a path cross a lit body and stay a path.
     */
    function strokeOrbit(pts, behind, tone) {
      const colour = TONES[tone]
      const lanes = Array.from({ length: BUCKETS }, () => [])

      for (let i = 1; i < pts.length; i++) {
        const p = pts[i - 1]
        const q = pts[i]
        if (q.depth < 0 !== behind) continue
        // 0 at the far side of the orbit, 1 at the near side.
        const near = Math.min(0.999, Math.max(0, (q.depth + 1) / 2))
        lanes[(near * BUCKETS) | 0].push(p, q)
      }

      for (let k = 0; k < BUCKETS; k++) {
        const lane = lanes[k]
        if (!lane.length) continue

        const near = (k + 0.5) / BUCKETS
        const width = 0.85 + near * 0.85

        ctx.beginPath()
        for (let i = 0; i < lane.length; i += 2) {
          ctx.moveTo(cx + lane[i].x * unit, cy + lane[i].y * unit)
          ctx.lineTo(cx + lane[i + 1].x * unit, cy + lane[i + 1].y * unit)
        }

        ctx.strokeStyle = `rgba(0,0,0,${(0.5 * near).toFixed(3)})`
        ctx.lineWidth = width + 2.6
        ctx.stroke()

        ctx.strokeStyle = rgba(colour, 0.13 + near * 0.4)
        ctx.lineWidth = width
        ctx.stroke()
      }
    }

    function drawPrimary() {
      // Atmosphere: a wide, very faint halo. Offset and blurred, never a flat ring.
      const halo = ctx.createRadialGradient(cx, cy, R * 0.94, cx, cy, R * 1.42)
      halo.addColorStop(0, 'rgba(157,190,255,0.20)')
      halo.addColorStop(0.45, 'rgba(120,150,215,0.07)')
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

      /*
       * The body needs an edge the whole way round, not only where it is lit.
       * A path that slips behind the primary has to vanish *at something*; with
       * the night side fading into black space there is no visible occluder at
       * the moment the line disappears, and correct occlusion still reads as a
       * line that stopped for no reason. This faint full rim is what makes the
       * silhouette present, and it is why the orbits now look deliberate.
       */
      ctx.strokeStyle = 'rgba(126,152,205,0.30)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, Math.max(R - 0.5, 0.5), 0, TAU)
      ctx.stroke()

      // Rim light along the terminator's bright edge, over the full rim.
      ctx.strokeStyle = 'rgba(198,218,255,0.52)'
      ctx.lineWidth = 1.2
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
        tilt: 0.56 + pointer.y * 0.10,
        spin: pointer.x * 0.14,
      }

      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, w, h)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      drawStars(t)

      const state = ORBITS.map((o) => ({
        orbit: o,
        pts: orbitPath(o, plate, 260),
        pos: orbitalPosition(o, t, plate),
      }))

      // Pass 1 — everything behind the primary.
      state.forEach(({ orbit, pts }) => strokeOrbit(pts, true, orbit.tone))
      state.forEach(({ orbit, pos }, i) => {
        if (pos.depth < 0) {
          drawTrail(trails[i], orbit.tone)
          drawBody(pos, orbit, orbit.tone)
        }
      })

      drawPrimary()

      // Pass 2 — everything in front of it.
      state.forEach(({ orbit, pts }) => strokeOrbit(pts, false, orbit.tone))
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
