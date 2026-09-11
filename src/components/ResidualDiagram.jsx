/**
 * The econometrics project's visual: two stages separated by the walk-forward
 * boundary, ending in a verdict that is negative.
 *
 * The dashed cutoff is the point of the drawing. Stage 2 only ever sees data
 * to the left of it, which is the whole claim the project rests on — and the
 * result panel says the signal dies net of costs, because reporting the
 * negative finding is the contribution.
 */

const BARS = [
  0.32, -0.18, 0.44, 0.12, -0.36, 0.22, 0.52, -0.28, 0.16, 0.38, -0.44, 0.24,
  0.48, -0.22, 0.34, 0.18, -0.3, 0.42, 0.26, -0.16,
]

const BASE = 150
const SCALE = 46

export default function ResidualDiagram() {
  return (
    <svg
      viewBox="0 0 520 348"
      className="h-full w-full"
      role="img"
      aria-label="Schematic of the residual analysis: stage one produces out-of-sample FF5 residuals, a walk-forward cutoff separates training from prediction, and the strategy's weak rank-IC signal disappears once transaction costs are applied."
    >
      <text x="30" y="40" className="fill-[var(--ink-3)] font-data text-[8px] tracking-[0.16em]">
        STAGE 01 · OUT-OF-SAMPLE FF5 RESIDUALS
      </text>

      {/* Residual series. Sign alternates because a residual has no drift. */}
      <line x1="30" y1={BASE} x2="404" y2={BASE} stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      <g>
        {BARS.map((v, i) => {
          const x = 34 + i * 18.6
          const h = Math.abs(v) * SCALE
          const y = v > 0 ? BASE - h : BASE
          const past = i < 13
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="7"
              height={h}
              rx="1"
              fill={past ? 'rgba(157,190,255,0.5)' : 'rgba(255,255,255,0.13)'}
            />
          )
        })}
      </g>

      {/* The walk-forward boundary: stage 2 never sees past it. */}
      <path
        d="M282 74 V226"
        fill="none"
        stroke="rgba(99,198,155,0.6)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <text x="290" y="86" className="fill-[var(--signal-mark)] font-data text-[7.5px] tracking-[0.16em]">
        CUTOFF t
      </text>
      <text x="30" y="238" className="fill-[var(--ink-3)] font-data text-[7.5px] tracking-[0.16em]">
        KNOWABLE AT t
      </text>
      <text x="290" y="238" className="fill-[var(--ink-3)] font-data text-[7.5px] tracking-[0.16em]">
        PREDICTED t+1
      </text>

      {/* Stage 2 and its verdict. */}
      <rect
        x="30"
        y="258"
        width="132"
        height="42"
        rx="2"
        fill="rgba(255,255,255,0.035)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />
      <text x="42" y="275" className="fill-[var(--ink-3)] font-data text-[7.5px] tracking-[0.16em]">
        STAGE 02
      </text>
      <text x="42" y="291" className="fill-[var(--ink-2)] font-data text-[9px]">
        LightGBM · ridge
      </text>

      <line x1="162" y1="279" x2="186" y2="279" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      <path d="M192 279 l-6 -3 v6 z" fill="rgba(255,255,255,0.36)" />

      <text x="200" y="275" className="fill-[var(--ink-3)] font-data text-[7.5px] tracking-[0.16em]">
        RANK IC +0.03
      </text>
      <text x="200" y="291" className="fill-[var(--ink-2)] font-data text-[9px]">
        t ≈ 3.1
      </text>

      <line x1="300" y1="279" x2="324" y2="279" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      <path d="M330 279 l-6 -3 v6 z" fill="rgba(255,255,255,0.36)" />

      {/* The finding is negative, and the drawing has to say so. */}
      <text x="338" y="275" className="fill-[var(--ink-3)] font-data text-[7.5px] tracking-[0.16em]">
        NET OF 15BPS
      </text>
      <text x="338" y="291" className="fill-[var(--ink-2)] font-data text-[9px]">
        no edge
      </text>

      <text x="424" y="152" className="fill-[var(--ink-3)] font-data text-[8px] tracking-[0.16em]">
        e(i,t)
      </text>
    </svg>
  )
}
