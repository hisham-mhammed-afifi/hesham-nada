# Phase 2 — Enhancements

This phase layers 10 enhancements on top of the parity port from Phase 1. Every animation respects `prefers-reduced-motion: reduce`.

## Dependencies added

- **`framer-motion@^12`** — declarative animations, viewport-triggered reveals, scroll parallax, automatic reduced-motion. ~47 kB gzipped, only loaded for components that use it.

No `.ics` library — the generator is hand-rolled in `app/lib/ics.ts` (~50 lines, RFC 5545 minimal).

---

## The 10 enhancements

### 1. Hero entrance choreography
**Where:** [app/components/Hero.tsx](app/components/Hero.tsx)

The hero card's six elements (rings → headline → eyebrow → names → date → venue → Add to Calendar) fade in sequentially on first page load. Each element: `opacity 0→1, y 12→0`, 600 ms cubic-bezier `[0.2, 0.7, 0.2, 1]`, staggered by 150 ms.

Implementation: a `seq(i)` helper that returns Framer Motion props with `delay: 0.2 + i * 0.15`. Under reduced motion, returns `{}` (instant render).

### 2. Scroll-reveal for sections
**Where:** Countdown cells, Story milestones, Schedule rows, Gallery items, Venue (entire body via `<Reveal>` wrapper).

Each list item uses `<motion.li>` / `<motion.div>` / `<motion.button>` with `whileInView` + `viewport={{ once: true, margin: '-15%' }}`. Items in the same list stagger 60-100 ms apart so the row sweeps in rather than appearing all at once.

The reusable `<Reveal>` wrapper at [app/components/Reveal.tsx](app/components/Reveal.tsx) is used for sections that don't need item-level staggering (just the Venue right now).

### 3. Subtle flower parallax
**Where:** [app/components/PageBackground.tsx](app/components/PageBackground.tsx)

`useScroll` captures `scrollY`; `useTransform(scrollY, [0, 1500], [0, -12])` maps it to a vertical offset on the `.page-bg` wrapper. Result: as the page scrolls, the entire floral frame drifts up ~12 px — barely perceptible but adds depth. Disabled under reduced motion (renders the static fallback).

### 4. Gold flourish dividers between sections
**Where:** [app/components/FlourishDivider.tsx](app/components/FlourishDivider.tsx) — used in [app/page.tsx](app/page.tsx) between every section pair.

Pure SVG, ~1 KB. A horizontal gold gradient line fades in from 0 to 0.55 opacity at the centre, where a three-element ornament sits: `leaf · diamond · leaf`. Server-rendered, no JS.

### 5. Decorative under-flourish on section titles
**Where:** [app/components/SectionTitle.tsx](app/components/SectionTitle.tsx) — used by every section (`Countdown`, `Story`, `Schedule`, `Venue`, `Gallery`, `Rsvp`).

Mini version of the divider's ornament (60 px wide) renders directly under each section heading. Title block also accepts an optional `lede` prop so the Cormorant italic intro line is part of the same component.

### 6. "Add to Calendar" button ⭐
**Where:** [app/components/AddToCalendar.tsx](app/components/AddToCalendar.tsx) (button) + [app/lib/ics.ts](app/lib/ics.ts) (generator). Rendered last in the Hero choreography sequence.

On click: builds a minimal RFC 5545 `.ics` blob (UID, DTSTAMP, DTSTART/DTEND in UTC, SUMMARY, DESCRIPTION, LOCATION, URL, STATUS, TRANSP), creates an object URL, programmatically clicks an `<a download>`, then revokes. Compatible with iCal, Google Calendar, Outlook, and Apple Calendar.

Event detail: `2026-06-12 19:00 → 2026-06-13 01:00` Cairo time (UTC+2 → 17:00 UTC start).

### 7. Petal-fall on RSVP success
**Where:** [app/components/PetalRain.tsx](app/components/PetalRain.tsx) (petals) — mounted via React portal from [app/components/Rsvp.tsx](app/components/Rsvp.tsx) on `attending=yes` success.

32 petals with randomized properties (left position, delay 0-1.2s, duration 2.4-4s, x-drift -110 to +110 px, rotation 0-360°, size 10-20 px). Each petal is a CSS `radial-gradient` shaped with `border-radius: 60% 0 60% 0` to look like a flower petal. CSS keyframe `petalFall` animates `translate3d` + 720° rotation to the bottom of the viewport.

Auto-unmounts after 4500 ms via `setTimeout`. Hidden under reduced motion (`.petal { display: none; }`).

Petals only fire on **yes** RSVPs — declines don't get celebratory petals.

### 8. WhatsApp share button
**Where:** [app/components/ShareButton.tsx](app/components/ShareButton.tsx) — placed in [app/components/Footer.tsx](app/components/Footer.tsx) under the hashtag.

Uses `navigator.share()` if available (mobile native share sheet); falls back to `https://wa.me/?text=…` deep link with a pre-formatted message: `Save the date for Hesham & Nada — June 12, 2026 at Panorama October Garden. #HeshamWedsNada [URL]`. Includes a small WhatsApp icon SVG.

### 9. Couple photo as hero backdrop
**Where:** [app/components/Hero.tsx](app/components/Hero.tsx) line 28.

If `public/couple.jpg` exists, an `<img>` sits at `inset: 0` inside `.hero-card` with `opacity: 0.14`, `filter: blur(2px) saturate(1.1)`, `z-index: -1`. If the image 404s, the `onError` handler unmounts it gracefully — site looks identical to before.

To enable: drop a 1600×1200 portrait/landscape photo at `public/couple.jpg`.

### 10. Masonry gallery
**Where:** [app/components/Gallery.tsx](app/components/Gallery.tsx) — class `gallery-grid--masonry` enabled.

Replaces strict CSS Grid square thumbnails with **CSS columns** (2 cols default, 3 ≥720 px, 4 ≥1100 px). Each `<button>` has `break-inside: avoid` so images don't split across columns. Image aspect ratio respected (no forced square).

**Hover overlay:** subtle dark gradient covers the bottom 45% with a Cormorant-italic ivory caption (from `gallery[i].caption` in [content.ts](app/lib/content.ts)) sliding up on hover/focus. Items without a caption just get the gradient overlay.

Lightbox unchanged from Phase 1.

---

## Reduced-motion handling

Every animated component checks `useReducedMotion()` from Framer Motion. When true:
- Hero choreography: instant render, no fade-up
- Scroll-reveal: instant render, no fade-up
- Parallax: static (no transform)
- Petals: hidden via CSS `display: none`
- Hover overlays: opacity transition disabled

Toggle macOS *System Preferences → Accessibility → Display → Reduce motion* (or Windows *Settings → Accessibility → Visual effects → Animation effects: off*) and reload. Site stays fully functional, no motion.

---

## File additions / changes this phase

### New files
```
app/components/Reveal.tsx
app/components/FlourishDivider.tsx
app/components/SectionTitle.tsx
app/components/PetalRain.tsx
app/components/AddToCalendar.tsx
app/components/ShareButton.tsx
app/lib/ics.ts
app/styles/animations.css
PHASE-2-ENHANCEMENTS.md  (this file)
```

### Modified files
```
package.json                         (+ framer-motion)
app/layout.tsx                       (+ animations.css import)
app/page.tsx                         (+ FlourishDivider between sections)
app/lib/content.ts                   (gallery captions: optional `caption?: string`)
app/components/PageBackground.tsx    (now 'use client' + parallax)
app/components/Hero.tsx              (now 'use client' + choreography + couple + AddToCalendar)
app/components/Countdown.tsx         (+ SectionTitle + cell stagger)
app/components/Story.tsx             (now 'use client' + SectionTitle + milestone stagger)
app/components/Schedule.tsx          (now 'use client' + SectionTitle + row stagger)
app/components/Venue.tsx             (+ SectionTitle + Reveal wrapper)
app/components/Gallery.tsx           (+ SectionTitle + masonry + captions + reveal)
app/components/Rsvp.tsx              (+ SectionTitle + PetalRain on yes-success)
app/components/Footer.tsx            (+ ShareButton)
```

### Bundle impact
- Phase 1 home page: 2.34 kB route + 102 kB shared = **105 kB** First Load JS
- Phase 2 home page: 49.8 kB route + 102 kB shared = **152 kB** First Load JS
- The +47 kB delta is almost entirely Framer Motion. Acceptable for a wedding site (LCP image far outweighs JS in Lighthouse weighting).

---

## Verification checklist

- [x] `npm run build` succeeds
- [ ] **Dev** (`npm run dev`):
  - Page load: hero animates in with stagger
  - Scroll: each section reveals as you reach it
  - Scroll back: corners drifted slightly (parallax visible)
  - Gallery: masonry layout, hover shows caption overlay
  - Click "Add to Calendar": `.ics` downloads, opens in your calendar app with correct event
  - Submit RSVP "yes": petals fall briefly across the screen
  - Click WhatsApp share button: native share sheet (mobile) or WhatsApp Web (desktop) opens with prefilled message
- [ ] Toggle OS "Reduce motion" → reload: no animations fire, content fully usable
- [ ] **Mobile** (Chrome DevTools responsive): masonry → 2 columns, petals fall correctly, share opens native sheet, hero choreography plays

---

## Things to note before Phase 3

- The `WEB3FORMS_ACCESS_KEY` placeholder in [app/components/Rsvp.tsx](app/components/Rsvp.tsx) still needs to be filled in for the form to actually submit. Until then, "Send RSVP" returns the "not configured" error message.
- `/public/couple.jpg` is optional — if absent the hero looks identical to Phase 1; if present it adds a soft photo behind the script.
- Two ESLint warnings remain (`no-page-custom-font` for Google Fonts via `<link>`, `metadataBase not set`) — Phase 3 resolves both via `next/font` and Metadata API config.

→ **Pause for user review before Phase 3 (SEO maximalism).**
