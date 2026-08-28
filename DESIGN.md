# Design

Recorded from the built site, not from intention. Change this file when the build
changes, not before.

## World

**Mission console.** True black ground, one cold family and one warm family, and
hairlines instead of containers. There are no cards on this page: sections are
separated by rules and space, and every panel that looks like a frame is a data
plot with a real border, never a decorative shell.

The world is pinned to [orbitscape.space](https://orbitscape.space) — Brady's own
platform — so the portfolio and the product he ships read as the same hand.

## Colour

Restrained: neutrals plus two reserved hues that never decorate.

| Token | Value | Owns |
| --- | --- | --- |
| `--ground` | `#000000` | The page. True black, not near-black. |
| `--ground-raised` | `#08080a` | Plot panel interiors only. |
| `--ink` | `#f5f5f4` | Display type, headings, primary values. |
| `--ink-2` | `#a1a19e` | Body copy. 9.1:1 on ground. |
| `--ink-3` | `#7e7e7a` | Telemetry labels. 5.2:1 on ground — the floor, never lowered. |
| `--line` | `rgba(255,255,255,.09)` | Section rules, panel borders. |
| `--line-strong` | `rgba(255,255,255,.18)` | Secondary button borders, tick marks. |
| `--signal` | `#ffa23a` | **Live state and the primary action only.** The availability beacon, the "now" marker, current roles, the scoring loop, the primary CTA. Never decoration. |
| `--sky` | `#9dbeff` | **Anything traversable.** Links, orbit paths, the lit limb. |

The two hues carry a temperature argument: warm means *now, act on this*; cold
means *go there*. If a new element is neither, it is neutral.

## Type

- **Manrope** (200–400) — display and body. Wide-tracked at small sizes, near
  neutral tracking at display sizes, `-0.02em` on the largest.
- **Martian Mono** (300) — the `.label` class and every data run: dates, metrics,
  facts, axis ticks, buttons. **Monospace here means measurement, never mood.**
  It is not used for prose.

Scale: h1 `clamp(2.125rem, 4.6vw, 3.75rem)`; section h2 `clamp(1.75rem, 3.4vw,
2.75rem)`; body `0.9375rem`–`1.0625rem` at `1.6`–`1.72` leading; labels
`0.6875rem` at `0.16em`. Measure caps at ~52ch.

Numerals are tabular everywhere they can be compared (`.tnum`).

## Motion

**One clock.** `src/lib/clock.js` runs a single rAF loop; the orbital field, the
trajectory marker, and the pipeline pulse all read the same elapsed time, so they
are phase-locked rather than three loops drifting apart. The loop owns its own
liveness — it stores no frame id to cancel, because a stale id reads as "running"
and silently strands every later subscriber. A throwing subscriber is dropped, not
allowed to stop the page.

`prefers-reduced-motion` is honoured wholesale: every canvas and SVG component
renders one composed frame and never subscribes, and scroll reveals are disabled.
Reveals are opacity-1 by default and only hidden once JS arms them, so the page is
readable with scripting off.

## Signature elements

- **`OrbitalField`** — the hero. Four bodies on real Kepler ellipses around a lit
  primary, drawn in two passes so bodies behind the primary are occluded by it.
  The plate leans toward the pointer; each body drags a decaying trace. Semi-major
  axes are held between 1.3 and 2.4 primary radii so the craft stay on canvas.
- **`TrajectoryPlot`** — Orbitscape's visual. Flat top-down engineering view,
  deliberately the opposite of the hero's tilted plate. Drawn to true scale
  (lunar semi-major axis = 384,400 km); the scale bar is derived from that
  constant, never eyeballed.
- **`PipelineDiagram`** — the Sol pipeline. Job array, three chained stages, and
  the scoring arc returning to parameters. The loop is the drawing's argument.
- **`Timeline`** — roles on a shared time axis rather than a reverse-chronological
  list, because the overlap is the fact worth seeing. It scales at narrow widths
  and never wraps: org names move above their bars instead of beside them.

- **`public/og.png`** — the link-preview card, built in the same world (black ground,
  Martian Mono name at `0.22em`, Manrope 200 pitch, amber availability dot, orbits
  clearing the primary). Source is `tools/og-card.html`; regenerate with
  `node tools/render-og.mjs`. 1200×630, declared in `index.html`.

## Rules that hold

- No gradient text, no glass, no icon-and-heading card grids, no eyebrows above
  headings, no section numbers.
- Browser surfaces are themed: selection, caret, focus rings, and scrollbars all
  come from the palette.
- Focus is always visible (`2px` signal, `3px` offset).
- Every link resolves. Only `orbitscape.space` is claimed as live.
