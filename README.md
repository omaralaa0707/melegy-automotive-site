# Melegy Auto — site 22 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with Melegy Auto, and not an official site.**

- **Live:** https://melegy-automotive-site.vercel.app
- **Repo:** [melegy-automotive-site](https://github.com/omaralaa0707/melegy-automotive-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: A dark counter with a lit paper form on it: ground #1C1A17 (their evening stucco facade, desaturated), paper #EDE3CE (the sheet itself), a workshop red #DD7057 lifted from their own "AUTO" signage lettering (kept to text on dark surfaces only), and a deeper stamp-ink red #A23429 reserved for the mark itself

**Type pairing**
: Bitter + Space Mono / Katibeh + Vazirmatn (AR)

**3D / signature technique**
: **The stamp**: a real sheet of paper in 3D on a counter, with a rubber stamp hovering above it that drops straight down (not a swinging pivot — a vertical fall keeps it in frame at every stage) and inks a crooked, canvas-textured "SOLD" mark on contact, then lifts away again. Idle for an available file, struck for a closed one

**Motion language**
: The tick — content snaps up past full size by a hair and settles, quick and mechanical, the way a checkbox gets ticked; no travel, no fade drift

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/melegyauto/
- Facebook: https://www.facebook.com/profile.php?id=61582233003912

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
