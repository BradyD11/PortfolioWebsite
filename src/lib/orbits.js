/**
 * Two-body orbital mechanics, solved properly.
 *
 * Bodies here are not dots sliding around a circle at constant speed — each one
 * travels a real ellipse with the primary at a focus, and Kepler's second law
 * makes it sweep fast at periapsis and loiter at apoapsis. That difference is
 * the whole reason the field reads as orbits rather than as a screensaver.
 */

const TAU = Math.PI * 2

/**
 * Solve Kepler's equation  M = E - e·sin E  for the eccentric anomaly E.
 * Newton-Raphson; converges in a handful of steps for e < 0.9.
 */
export function eccentricAnomaly(M, e) {
  const m = ((M % TAU) + TAU) % TAU
  let E = e < 0.8 ? m : Math.PI

  for (let i = 0; i < 6; i++) {
    const f = E - e * Math.sin(E) - m
    const fp = 1 - e * Math.cos(E)
    const step = f / fp
    E -= step
    if (Math.abs(step) < 1e-9) break
  }
  return E
}

/**
 * Position of a body on its orbit at time `t`, projected to the screen.
 *
 * Returns canvas-space offsets from the primary, plus `depth` (negative behind
 * the primary, positive in front) so the renderer can occlude and dim correctly.
 */
export function orbitalPosition(orbit, t, plate) {
  const { a, e, omega, period, phase } = orbit
  const { tilt, spin } = plate

  const M = (t / period) * TAU + phase
  const E = eccentricAnomaly(M, e)

  // Perifocal plane, primary at the focus.
  const px = a * (Math.cos(E) - e)
  const py = a * Math.sqrt(1 - e * e) * Math.sin(E)

  // Argument of periapsis, then the viewer's own rotation of the whole plate.
  const ang = omega + spin
  const x = px * Math.cos(ang) - py * Math.sin(ang)
  const y = px * Math.sin(ang) + py * Math.cos(ang)

  return {
    x,
    y: y * Math.sin(tilt),
    depth: Math.cos(tilt) * (y / Math.abs(a)),
  }
}

/** Sample a full orbit into a screen-space polyline. */
export function orbitPath(orbit, plate, samples = 220) {
  const pts = new Array(samples + 1)
  for (let i = 0; i <= samples; i++) {
    // Step in eccentric anomaly for even spatial sampling.
    const E = (i / samples) * TAU
    const { a, e, omega } = orbit
    const px = a * (Math.cos(E) - e)
    const py = a * Math.sqrt(1 - e * e) * Math.sin(E)
    const ang = omega + plate.spin
    const x = px * Math.cos(ang) - py * Math.sin(ang)
    const y = px * Math.sin(ang) + py * Math.cos(ang)
    pts[i] = { x, y: y * Math.sin(plate.tilt), depth: Math.cos(plate.tilt) * (y / Math.abs(a)) }
  }
  return pts
}

export { TAU }
