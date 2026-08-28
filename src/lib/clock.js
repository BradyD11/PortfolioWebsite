/**
 * One clock for the whole page.
 *
 * Every animated element — the orbital field, the pipeline pulse, the trajectory
 * marker — reads the same elapsed time, so they stay phase-locked instead of
 * drifting apart on independent loops. Nothing on this page animates on a timer
 * of its own.
 *
 * The loop owns its own liveness: it runs while anything is subscribed and
 * retires itself the moment nothing is. There is deliberately no stored frame id
 * to cancel — holding one means a cleanup, a StrictMode remount, or a throwing
 * subscriber can leave a consumed id behind that reads as "already running", and
 * every later subscriber then waits forever on a loop that already stopped.
 */

const subscribers = new Set()

let running = false
let startedAt = 0
let lastAt = 0

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function frame(now) {
  if (subscribers.size === 0) {
    running = false
    return
  }

  const t = (now - startedAt) / 1000
  const dt = Math.min((now - lastAt) / 1000, 1 / 20) // clamp after a background tab
  lastAt = now

  // A throwing subscriber drops out; it never takes the rest of the page's
  // motion down with it.
  for (const fn of subscribers) {
    try {
      fn(t, dt)
    } catch (err) {
      subscribers.delete(fn)
      // eslint-disable-next-line no-console
      console.error('[clock] subscriber removed after error', err)
    }
  }

  requestAnimationFrame(frame)
}

/** Subscribe to the clock. Returns an unsubscribe function. */
export function onTick(fn) {
  subscribers.add(fn)

  if (!running) {
    running = true
    startedAt = lastAt = performance.now()
    requestAnimationFrame(frame)
  }

  return () => {
    subscribers.delete(fn)
  }
}

/** Frame-rate-independent easing toward a target. */
export const approach = (current, target, rate, dt) =>
  current + (target - current) * (1 - Math.exp(-rate * dt))
