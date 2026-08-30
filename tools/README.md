# tools

## `og-card.html` — source for `public/og.png`

`public/og.png` is the link-preview card recruiters see when this site is pasted
into Slack, LinkedIn, or iMessage. It is **rendered from `og-card.html`**, not
drawn by hand, so it stays regenerable when the pitch line or availability
changes.

To regenerate after editing `og-card.html` (needs Chrome installed):

```bash
npm i -D puppeteer-core && node tools/render-og.mjs
```

The card is 1200×630 — the size Open Graph and Twitter both expect. Keep those
dimensions; `index.html` declares them in `og:image:width` / `og:image:height`,
and a mismatch makes some clients skip the preview.

It deliberately carries **no photograph**, so swapping `public/headshot.jpg` never
leaves a stale face baked into the card.
