import { useEffect, useRef } from 'react'
import { onTick, prefersReducedMotion } from '../lib/clock'

/**
 * The Sol pipeline's visual: a job array feeding three chained stages, with the
 * scoring pass writing the next run's parameters.
 *
 * The loop is the point of the drawing. A straight three-box chain would be a
 * flowchart of any pipeline; the arc returning from SCORE to PARAMETERS is what
 * makes this one search instead of merely execute.
 */

const STAGES = [
  { label: 'STAGE 01', note: 'Model A' },
  { label: 'STAGE 02', note: 'Model B' },
  { label: 'STAGE 03', note: 'Model C' },
]

const COLS = 6
const ROWS = 7
const CELLS = COLS * ROWS

export default function PipelineDiagram() {
  const cellsRef = useRef([])
  const pulseRef = useRef(null)
  const chainRef = useRef(null)

  useEffect(() => {
    const still = prefersReducedMotion()
    const pulse = pulseRef.current
    const chain = chainRef.current
    if (!chain || !pulse) return

    const len = chain.getTotalLength()

    const place = (t) => {
      // The pulse runs the chain; the array fills behind it on the same clock.
      const cycle = (t % 9) / 9
      const p = chain.getPointAtLength(cycle * len)
      pulse.setAttribute('cx', p.x.toFixed(2))
      pulse.setAttribute('cy', p.y.toFixed(2))
      pulse.setAttribute('opacity', (0.25 + 0.75 * Math.sin(cycle * Math.PI)).toFixed(3))

      const lit = Math.floor(cycle * CELLS * 1.15)
      for (let i = 0; i < CELLS; i++) {
        const cell = cellsRef.current[i]
        if (!cell) continue
        const on = i < lit
        cell.setAttribute('fill', on ? 'rgba(255,162,58,0.72)' : 'rgba(255,255,255,0.07)')
      }
    }

    if (still) {
      place(4.2)
      return
    }
    return onTick(place)
  }, [])

  return (
    <svg
      viewBox="0 0 520 348"
      className="h-full w-full"
      role="img"
      aria-label="Schematic of the Sol pipeline: a SLURM job array feeds three sequential model stages, and a scoring pass loops back to set the next run's parameters."
    >
      {/* SLURM job array */}
      <text x="30" y="40" className="fill-[var(--ink-3)] font-data text-[8px] tracking-[0.16em]">
        SLURM ARRAY
      </text>
      <g>
        {Array.from({ length: CELLS }, (_, i) => (
          <rect
            key={i}
            ref={(el) => (cellsRef.current[i] = el)}
            x={30 + (i % COLS) * 13}
            y={54 + Math.floor(i / COLS) * 13}
            width="9"
            height="9"
            rx="1.5"
            fill="rgba(255,255,255,0.07)"
          />
        ))}
      </g>
      <line x1="115" y1="150" x2="176" y2="150" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      <path d="M176 150 l-6 -3 v6 z" fill="rgba(255,255,255,0.36)" />

      {/* The chain the pulse rides */}
      <path
        ref={chainRef}
        d="M180 150 H436 M436 150"
        fill="none"
        stroke="none"
      />

      {/* Three sequential stages */}
      <g>
        {STAGES.map((s, i) => {
          const x = 180 + i * 90
          return (
            <g key={s.label}>
              <rect
                x={x}
                y="124"
                width="72"
                height="52"
                rx="2"
                fill="rgba(255,255,255,0.035)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />
              <text x={x + 10} y="146" className="fill-[var(--ink-3)] font-data text-[7.5px] tracking-[0.16em]">
                {s.label}
              </text>
              <text x={x + 10} y="163" className="fill-[var(--ink-2)] font-data text-[9px]">
                {s.note}
              </text>
              {i < 2 && (
                <>
                  <line x1={x + 72} y1="150" x2={x + 84} y2="150" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
                  <path d={`M${x + 90} 150 l-6 -3 v6 z`} fill="rgba(255,255,255,0.36)" />
                </>
              )}
            </g>
          )
        })}
      </g>

      {/* Scoring pass */}
      <line x1="432" y1="150" x2="452" y2="150" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      <rect x="452" y="128" width="44" height="44" rx="22" fill="none" stroke="rgba(255,162,58,0.55)" strokeWidth="1" />
      <text x="462" y="154" className="fill-[var(--signal)] font-data text-[8px] tracking-[0.1em]">
        SCORE
      </text>

      {/* The feedback arc — the reason this is a loop and not a chain */}
      <path
        d="M474 172 V246 Q474 262 458 262 H198 Q182 262 182 246 V182"
        fill="none"
        stroke="rgba(255,162,58,0.42)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <path d="M182 176 l-3.5 7 h7 z" fill="rgba(255,162,58,0.7)" />
      <text x="286" y="282" className="fill-[var(--ink-3)] font-data text-[8px] tracking-[0.16em]">
        NEXT PARAMETERS
      </text>

      <circle ref={pulseRef} cx="180" cy="150" r="3.2" fill="#ffa23a" />

      <text x="30" y="316" className="fill-[var(--ink-3)] font-data text-[8px] tracking-[0.16em]">
        APPTAINER · REPRODUCIBLE PER NODE
      </text>
    </svg>
  )
}
