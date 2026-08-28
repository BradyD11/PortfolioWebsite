import { AXIS, ROLES } from '../data'

/**
 * Roles plotted against a real time axis rather than stacked as a list.
 *
 * The list version hides the fact worth noticing: these roles overlap. Brady has
 * been employed continuously since April 2024, usually in two positions at once,
 * while enrolled full-time. On a shared axis that is visible in one glance; in a
 * reverse-chronological list it is invisible.
 *
 * The axis never wraps at narrow widths — it scales, and the org names move above
 * their bars rather than beside them, so the overlap survives the phone.
 */

const span = AXIS.end - AXIS.start
const pct = (year) => ((year - AXIS.start) / span) * 100

const BAR = {
  signal: 'bg-signal',
  sky: 'bg-sky',
  ink: 'bg-ink-2',
}

const YEARS = [2024, 2025, 2026, 2027]

export default function Timeline() {
  return (
    <div className="select-none">
      {/* Axis. End labels hug the rail instead of hanging off it. */}
      <div className="relative mb-6 h-4">
        {YEARS.map((y, i) => (
          <div
            key={y}
            className={`absolute top-0 font-data text-[10px] tracking-wider2 text-ink-3 ${
              i === 0 ? '' : i === YEARS.length - 1 ? '-translate-x-full' : '-translate-x-1/2'
            }`}
            style={{ left: `${pct(y)}%` }}
          >
            {y}
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0">
          {YEARS.map((y) => (
            <div
              key={y}
              className="absolute top-0 bottom-0 w-px bg-hair"
              style={{ left: `${pct(y)}%` }}
            />
          ))}
          {/* Today. The one line on the chart that is not a year. */}
          <div
            className="absolute -top-6 bottom-0 w-px bg-signal/70"
            style={{ left: `${pct(AXIS.now)}%` }}
          />
          <div
            className="absolute -top-6 -translate-x-1/2 font-data text-[9px] tracking-widest2 text-signal"
            style={{ left: `${pct(AXIS.now)}%` }}
          >
            NOW
          </div>
        </div>

        <ul className="relative space-y-6 sm:space-y-3">
          {ROLES.map((role) => {
            const from = pct(role.start)
            const to = pct(role.end ?? AXIS.now)
            const current = role.end === null
            return (
              <li key={role.org} className="group">
                <a
                  href={`#role-${role.org.replace(/\W+/g, '-').toLowerCase()}`}
                  className="block rounded-sm"
                >
                  <span className="sr-only">
                    {role.title}, {role.org}, {role.span}
                  </span>

                  {/* Narrow widths: the name sits above its own bar. */}
                  <span
                    aria-hidden="true"
                    className="mb-1.5 block font-data text-[10px] tracking-wider2 text-ink-3 transition-colors group-hover:text-ink sm:hidden"
                  >
                    {role.org}
                  </span>

                  <span className="relative block h-3">
                    <span
                      className={`absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full transition-all duration-500 ease-out ${
                        BAR[role.tone]
                      } opacity-75 group-hover:h-[5px] group-hover:opacity-100 group-focus-visible:h-[5px]`}
                      style={{ left: `${from}%`, width: `${Math.max(to - from, 0.7)}%` }}
                    />
                    {current && (
                      <span
                        className="absolute top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal"
                        style={{ left: `${to}%` }}
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap pl-3.5 font-data text-[10px] tracking-wider2 text-ink-3 transition-colors group-hover:text-ink sm:block"
                      style={{ left: `${to}%` }}
                    >
                      {role.org}
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
