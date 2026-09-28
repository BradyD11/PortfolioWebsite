/**
 * PerFin's visual: four identical transit fares from a real statement, each
 * given a distinct content-derived id by its occurrence index.
 *
 * The collision group is the point of the drawing. Keyed on (date, amount,
 * merchant) alone these four rows collapse into one; the occurrence index keeps
 * them apart, while a re-import of the same file still maps onto the same ids
 * and is skipped.
 */

const ROWS = [
  { occ: 0, id: '3f9c…a1' },
  { occ: 1, id: 'b27e…4d' },
  { occ: 2, id: '06d1…9c' },
  { occ: 3, id: 'e84a…17' },
]

export default function DedupDiagram() {
  return (
    <svg
      viewBox="0 0 520 348"
      className="h-full w-full"
      role="img"
      aria-label="Schematic of PerFin's import deduplication: four identical three-dollar transit fares on the same day each receive a distinct content-derived id through an occurrence index, and re-importing the same statement adds zero new rows."
    >
      <text x="30" y="40" className="fill-[var(--ink-3)] font-data text-[8px] tracking-[0.16em]">
        IMPORT · CONTENT-DERIVED IDS
      </text>

      <text x="30" y="72" className="fill-[var(--ink-3)] font-data text-[7.5px] tracking-[0.16em]">
        4× SAME DATE · AMOUNT · MERCHANT
      </text>
      <rect
        x="30"
        y="84"
        width="300"
        height="132"
        rx="2"
        fill="rgba(255,255,255,0.035)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />
      {ROWS.map((row, i) => {
        const y = 110 + i * 30
        return (
          <g key={row.occ}>
            <text x="44" y={y} className="fill-[var(--ink-2)] font-data text-[9px]">
              08/07 MTA*NYCT PAYGO
            </text>
            <text x="248" y={y} textAnchor="end" className="fill-[var(--ink-2)] font-data text-[9px]">
              -3.00
            </text>
            <text x="316" y={y} textAnchor="end" className="fill-[var(--signal-mark)] font-data text-[9px]">
              #{row.occ}
            </text>

            {/* Each row resolves to its own id — none is discarded. */}
            <path
              d={`M330 ${y - 3} H392`}
              fill="none"
              stroke="rgba(99,198,155,0.46)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <circle cx="392" cy={y - 3} r="2.5" fill="rgba(99,198,155,0.75)" />
            <text x="404" y={y} className="fill-[var(--ink-2)] font-data text-[9px]">
              {row.id}
            </text>
          </g>
        )
      })}
      <text x="404" y="72" className="fill-[var(--ink-3)] font-data text-[7.5px] tracking-[0.16em]">
        SHA-256
      </text>

      <line x1="30" y1="244" x2="490" y2="244" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <text x="30" y="270" className="fill-[var(--ink-3)] font-data text-[7.5px] tracking-[0.16em]">
        SAME FILE TWICE
      </text>
      <text x="490" y="270" textAnchor="end" className="fill-[var(--ink-2)] font-data text-[9px]">
        339 new → 0 new · 339 skipped
      </text>
      <text x="30" y="292" className="fill-[var(--ink-3)] font-data text-[7.5px] tracking-[0.16em]">
        OVERLAPPING EXPORTS
      </text>
      <text x="490" y="292" textAnchor="end" className="fill-[var(--ink-2)] font-data text-[9px]">
        454 rows either order
      </text>

      <text x="30" y="324" className="fill-[var(--ink-3)] font-data text-[8px] tracking-[0.16em]">
        INTEGER CENTS · NEVER A DOUBLE
      </text>
    </svg>
  )
}
