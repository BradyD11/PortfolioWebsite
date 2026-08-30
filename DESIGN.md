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
| `--signal` | `#23694e` | **Fills only** — the primary CTA, and any surface carrying white text. Deep pine: 6.0:1 under `--ink`, and 3.2:1 as a shape against the page, which is the floor for a UI component. |
| `--signal-mark` | `#63c69b` | **Marks only** — the availability beacon, the "now" line, current-role bars, bullet dashes, focus rings, the scoring loop. A 1px rule or a 7px dot in the dark tone simply disappears on black; this is the same accent at mark weight. |
| `--sky` | `#9dbeff` | **Anything traversable.** Links, orbit paths, the lit limb. |

Every colour is stored as **bare RGB channels** (`--signal-mark-rgb: 99 198 155`) with
resolved `rgb()` values alongside, and Tailwind maps them through `<alpha-value>`.
This is not cosmetic: given a whole `var()` colour, Tailwind cannot build its
`/alpha` modifier and emits **no rule at all** — `bg-signal-mark/60` compiles to
nothing and the element renders with no background, silently. The channel form is
what keeps opacity modifiers working.

The two hues carry an argument: green means *now, act on this*; blue means *go
there*. If a new element is neither, it is neutral.

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

- **`OrbitalField`** — the hero. Three bodies on real Kepler ellipses around a lit
  primary, drawn in two passes so bodies behind the primary are occluded by it.
  The plate leans toward the pointer; each body drags a decaying trace.

  Three rules keep it reading as drawn rather than generated, each learned by
  getting it wrong first:

  1. **Clearance.** Semi-major axes run 1.9–3.0 primary radii with modest
     eccentricities, so paths sweep around the body instead of grazing it.
     Nothing runs tangent to the limb — a path that grazes the silhouette reads
     as a coincidence, not a choice.
  2. **Depth is a ramp, not a switch.** Brightness and width follow depth
     continuously, and both halves share one ramp, so they meet at identical
     values where they cross and leave no seam.
  3. **Every path is cased in black.** A 1px line at low alpha has almost no
     contrast against the lit face, so an unhoused path evaporates partway across
     the disc and reads as a line that stopped for no reason. The casing is
     invisible against space, and is what lets a path cross a lit body.

  The primary carries a faint rim around its **whole** circumference, not only
  the lit arc. A path slipping behind it has to vanish at something visible; with
  the night side fading into black there was no occluder on screen at the moment
  a line disappeared, and correct occlusion still read as a line that quit.
- **Orbitscape card** — a real screenshot of the live landing page
  (`public/orbitscape.webp`, 1600×1071, captured with software WebGL because the
  page is GPU-dependent). Orbitscape's own ground is black, so the shot sits
  inside the card without a seam. It replaced a drawn trajectory plot: the actual
  product is better evidence than an illustration of it.
- **Capability band** — two columns, Full-stack and Machine learning, sitting
  directly under the fold. It answers "what kind of engineer is this" before the
  visitor reaches any single project. Every line traces to a role in `ROLES`.
- **`PipelineDiagram`** — the Sol pipeline. Job array, three chained stages, and
  the scoring arc returning to parameters. The loop is the drawing's argument.
- **`Timeline`** — roles on a shared time axis rather than a reverse-chronological
  list, because the overlap is the fact worth seeing. It scales at narrow widths
  and never wraps: org names move above their bars instead of beside them.

- **`public/og.png`** — the link-preview card, built in the same world (black ground,
  Martian Mono name at `0.22em`, Manrope 200 pitch, amber availability dot, orbits
  clearing the primary). Source is `tools/og-card.html`; regenerate with
  `node tools/render-og.mjs`. 1200×630, declared in `index.html`.

- **Portrait** — `public/headshot4.webp`, square-cropped by CSS (`object-cover
  object-top`) at 72–88px beside the name. Slightly de-saturated and contrast-lifted
  so a studio backdrop sits on a true-black page without a bright rectangle.

## Rules that hold

- No gradient text, no glass, no icon-and-heading card grids, no eyebrows above
  headings, no section numbers.
- New palette entries are added as `--*-rgb` channel triplets, never as hex
  strings alone, or every `/alpha` class built on them silently vanishes.
- Browser surfaces are themed: selection, caret, focus rings, and scrollbars all
  come from the palette.
- Focus is always visible (`2px` signal, `3px` offset).
- Every link resolves. Only `orbitscape.space` is claimed as live.
- No location and no response-time promise anywhere on the page.
- Full-resolution originals stay out of the render path; the page loads derived
  assets sized for their display box.
