import { useEffect, useMemo, useRef } from 'react'
import { onTick, prefersReducedMotion } from '../lib/clock'
import { eccentricAnomaly, TAU } from '../lib/orbits'

/**
 * Orbitscape's visual: a cis-lunar transfer, plotted top-down.
 *
 * Deliberately flat where the hero is a tilted plate — this is the engineering
 * view, the one you read numbers off, not the one you fly through. The transfer
 * is a real ellipse whose apogee meets the lunar distance, and the marker on it
 * obeys Kepler, so it loiters at apogee exactly as the spacecraft would.
 */

const EARTH = { x: 200, y: 158 }
const LEO = { a: 34, e: 0 }
const TRANSFER = { a: 94, e: 0.575, omega: -0.42 }
// The lunar orbit shares the transfer's apse line, and the Moon is parked at that
// apoapsis: the plot then shows an encounter rather than two unrelated curves.
const MOON_ORBIT = { a: 148, e: 0.055, omega: TRANSFER.omega }

// The plot is drawn to a real scale: the lunar semi-major axis is 384,400 km, so
// one canvas unit is that distance over MOON_ORBIT.a. The scale bar is derived
// from it rather than guessed, because a wrong bar on an orbital plot is the one
// error this audience will spot.
const KM_PER_UNIT = 384400 / MOON_ORBIT.a
const BAR_KM = 200000
const BAR_UNITS = BAR_KM / KM_PER_UNIT

function point(orbit, E) {
  const { a, e, omega = 0 } = orbit
  const px = a * (Math.cos(E) - e)
  const py = a * Math.sqrt(1 - e * e) * Math.sin(E)
  return {
    x: EARTH.x + px * Math.cos(omega) - py * Math.sin(omega),
    y: EARTH.y + px * Math.sin(omega) + py * Math.cos(omega),
  }
}

function pathOf(orbit, samples = 160) {
  let d = ''
  for (let i = 0; i <= samples; i++) {
    const p = point(orbit, (i / samples) * TAU)
    d += `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`
  }
  return `${d}Z`
}

const moonAt = point(MOON_ORBIT, Math.PI)

export default function TrajectoryPlot() {
  const craftRef = useRef(null)

  const paths = useMemo(
    () => ({
      leo: pathOf(LEO, 64),
      moon: pathOf(MOON_ORBIT, 200),
      transfer: pathOf(TRANSFER, 200),
    }),
    []
  )

  useEffect(() => {
    const still = prefersReducedMotion()
    const craft = craftRef.current
    if (!craft) return

    const place = (t) => {
      const Ec = eccentricAnomaly((t / 22) * TAU, TRANSFER.e)
      const pc = point(TRANSFER, Ec)
      craft.setAttribute('cx', pc.x.toFixed(2))
      craft.setAttribute('cy', pc.y.toFixed(2))
    }

    if (still) {
      place(7)
      return
    }
    return onTick(place)
  }, [])

  return (
    <svg
      viewBox="0 0 520 348"
      className="h-full w-full"
      role="img"
      aria-label="Top-down plot of a cis-lunar transfer trajectory: a spacecraft departs low Earth orbit on an elliptical path whose apogee meets the Moon's orbit."
    >
      <defs>
        <radialGradient id="tp-earth" cx="34%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#dbe6ff" />
          <stop offset="42%" stopColor="#7f9bd6" />
          <stop offset="100%" stopColor="#0b1020" />
        </radialGradient>
        <radialGradient id="tp-halo" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="rgba(157,190,255,0.20)" />
          <stop offset="100%" stopColor="rgba(157,190,255,0)" />
        </radialGradient>
      </defs>

      {/* Scale bar, measured off the plot's own geometry rather than eyeballed. */}
      <g stroke="rgba(255,255,255,0.28)" strokeWidth="1">
        <line x1="40" y1="328" x2={40 + BAR_UNITS} y2="328" />
        <line x1="40" y1="324" x2="40" y2="332" />
        <line x1={40 + BAR_UNITS} y1="324" x2={40 + BAR_UNITS} y2="332" />
      </g>
      <text x="40" y="343" className="fill-[var(--ink-3)] font-data text-[8px] tracking-[0.14em]">
        {BAR_KM.toLocaleString('en-US')} KM
      </text>

      <path d={paths.moon} fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1" strokeDasharray="3 5" />
      <path d={paths.leo} fill="none" stroke="rgba(157,190,255,0.34)" strokeWidth="1" />
      <path d={paths.transfer} fill="none" stroke="rgba(255,162,58,0.62)" strokeWidth="1.4" />

      <circle cx={EARTH.x} cy={EARTH.y} r="44" fill="url(#tp-halo)" />
      <circle cx={EARTH.x} cy={EARTH.y} r="17" fill="url(#tp-earth)" />

      <circle cx={moonAt.x} cy={moonAt.y} r="6" fill="#cbd3e4" />
      <circle ref={craftRef} cx={EARTH.x} cy={EARTH.y} r="3.6" fill="#ffa23a" />

      <g className="fill-[var(--ink-3)] font-data text-[8px] tracking-[0.16em]">
        <text x={EARTH.x - 16} y={EARTH.y + 56}>EARTH</text>
        <text x={EARTH.x + 38} y={EARTH.y - 20}>TLI BURN</text>
        <text x={moonAt.x - 14} y={moonAt.y + 24}>MOON</text>
        <text x="352" y="52">LUNAR ORBIT</text>
      </g>
      <g stroke="rgba(255,255,255,0.22)" strokeWidth="1">
        <line x1="348" y1="48" x2="311" y2="60" />
      </g>
    </svg>
  )
}
