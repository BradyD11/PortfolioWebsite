/**
 * Converten's visual: a cross-currency transfer as four entries in two
 * independently-balancing legs, bridged through the FX account.
 *
 * The two zero-sums are the point of the drawing. A single arrow from USD to
 * EUR would suggest money changing currency in place; what actually happens is
 * that each currency balances to zero on its own, and the bridge accumulates
 * the net FX position between them.
 */

const LEGS = [
  {
    code: 'USD',
    y: 92,
    rows: [
      { label: 'alice-usd', amount: '-100.00' },
      { label: 'bridge-usd', amount: '+100.00' },
    ],
  },
  {
    code: 'EUR',
    y: 202,
    rows: [
      { label: 'bridge-eur', amount: '-92.00' },
      { label: 'bob-eur', amount: '+92.00' },
    ],
  },
]

export default function LedgerDiagram() {
  return (
    <svg
      viewBox="0 0 520 348"
      className="h-full w-full"
      role="img"
      aria-label="Schematic of a cross-currency transfer in Converten: a USD leg debits alice and credits the bridge, a EUR leg debits the bridge and credits bob, and each currency sums independently to zero."
    >
      <text x="30" y="40" className="fill-[var(--ink-3)] font-data text-[8px] tracking-[0.16em]">
        FX TRANSFER · TWO BALANCING LEGS
      </text>

      {LEGS.map((leg) => (
        <g key={leg.code}>
          <text
            x="30"
            y={leg.y - 12}
            className="fill-[var(--ink-3)] font-data text-[7.5px] tracking-[0.16em]"
          >
            {leg.code} LEG
          </text>
          <rect
            x="30"
            y={leg.y}
            width="330"
            height="62"
            rx="2"
            fill="rgba(255,255,255,0.035)"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
          {leg.rows.map((row, i) => (
            <g key={row.label}>
              <text
                x="44"
                y={leg.y + 24 + i * 24}
                className="fill-[var(--ink-2)] font-data text-[9px]"
              >
                {row.label}
              </text>
              <text
                x="346"
                y={leg.y + 24 + i * 24}
                textAnchor="end"
                className="fill-[var(--ink-2)] font-data text-[9px]"
              >
                {row.amount}
              </text>
            </g>
          ))}

          {/* Each leg nets to zero on its own — stated, not implied. */}
          <line
            x1="30"
            y1={leg.y + 62}
            x2="360"
            y2={leg.y + 62}
            stroke="rgba(99,198,155,0.46)"
            strokeWidth="1"
          />
          <text
            x="378"
            y={leg.y + 36}
            className="fill-[var(--signal-mark)] font-data text-[9px] tracking-[0.1em]"
          >
            = 0
          </text>
        </g>
      ))}

      {/* The bridge ties the two legs together. */}
      <path
        d="M446 123 V271"
        fill="none"
        stroke="rgba(99,198,155,0.46)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <circle cx="446" cy="123" r="3" fill="rgba(99,198,155,0.75)" />
      <circle cx="446" cy="271" r="3" fill="rgba(99,198,155,0.75)" />
      <text
        x="462"
        y="193"
        className="fill-[var(--ink-3)] font-data text-[8px] tracking-[0.16em]"
      >
        BRIDGE
      </text>

      <text x="30" y="316" className="fill-[var(--ink-3)] font-data text-[8px] tracking-[0.16em]">
        TYPE-CHECKED · STM ATOMIC COMMIT
      </text>
    </svg>
  )
}
