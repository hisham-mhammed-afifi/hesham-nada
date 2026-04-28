# Phase 1 — React Migration

This phase ports the static HTML/CSS/JS site at `c:\Users\hisha\Desktop\hesham-nada\` to a **Next.js 15 + TypeScript** project at `c:\Users\hisha\Desktop\hesham-nada-react\`. Goal: pixel-identical parity. Zero new features.

The original static site is untouched — keep it as a reference.

---

## Stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 15** (App Router, RSC) |
| Language | **TypeScript** (strict) |
| Build target | **Static export** (`output: 'export'`) |
| Styling | **Plain CSS** ported from the static site (`tokens.css`, `base.css`, `components.css`) imported globally in `app/layout.tsx` |
| Linting | ESLint 8 + `next/core-web-vitals` |
| Package manager | npm (works with pnpm/yarn too) |

Why Next.js over Vite: Phase 3 needs Next's `Metadata API`, `next/image`, `next/font`, dynamic `opengraph-image.tsx`, and the convention-based `sitemap.ts` / `robots.ts`. Vite would require third-party libraries for each.

---

## Project structure

```
hesham-nada-react/
├── app/
│   ├── layout.tsx            # Root layout: <html>, fonts, global metadata
│   ├── page.tsx              # Home page composition
│   ├── components/
│   │   ├── PageBackground.tsx   # Fixed blush + 4 floral corners
│   │   ├── Hero.tsx
│   │   ├── Countdown.tsx        ('use client' — useEffect timer)
│   │   ├── Story.tsx            (server)
│   │   ├── Schedule.tsx         (server)
│   │   ├── Venue.tsx            (server)
│   │   ├── Gallery.tsx          ('use client' — lightbox state)
│   │   ├── Rsvp.tsx             ('use client' — form + Web3Forms)
│   │   └── Footer.tsx           (server)
│   ├── lib/
│   │   └── content.ts        # Typed copy (story, schedule, gallery, venue)
│   └── styles/
│       ├── tokens.css        # Design tokens (palette, fonts, spacing)
│       ├── base.css          # Reset + typography + buttons
│       └── components.css    # Section + element styles
├── public/
│   ├── flowers.png           # Floral corner sprite (re-used in 4 corners via CSS)
│   ├── rings.svg             # Gold ring monogram
│   ├── photos/               # Gallery photos (drop 01.jpg…08.jpg here)
│   └── favicon.ico           # Add yours
├── next.config.ts            # output: 'export'
├── tsconfig.json
├── package.json
├── .eslintrc.json
└── .gitignore
```

---

## How to run

```bash
# install once
npm install

# dev server
npm run dev          # → http://localhost:3000

# production build (static export to out/)
npm run build

# lint
npm run lint
```

The static build outputs an `out/` directory ready for any static host (Netlify, Vercel, GitHub Pages, cPanel).

---

## What changed vs. the static site

### Source organisation
| Static | React |
|---|---|
| `index.html` | Split into 9 components in `app/components/` + `app/page.tsx` |
| `styles/*.css` | `app/styles/*.css` — imported in `app/layout.tsx` |
| `assets/flowers.png` | `public/flowers.png` (CSS path: `/flowers.png`) |
| `assets/rings.svg` | `public/rings.svg` (referenced via `<img src="/rings.svg">`) |
| `assets/photos/` | `public/photos/` |
| `scripts/countdown.js` | `app/components/Countdown.tsx` — `useEffect` + `setInterval`, `visibilitychange` cleanup |
| `scripts/rsvp.js` | `app/components/Rsvp.tsx` — controlled form with React state; same Web3Forms POST |
| `scripts/gallery.js` | `app/components/Gallery.tsx` — React state for lightbox; same keyboard handlers |
| `scripts/main.js` | Removed; remaining IntersectionObserver scroll-reveal moves to Phase 2 |

### CSS asset paths
The only CSS-level change: `url('../assets/flowers.png')` → `url('/flowers.png')` in `app/styles/components.css`. This is because Next serves anything in `public/` from the URL root.

### Content centralisation
All copy now lives in `app/lib/content.ts` as typed constants:
- `wedding` (date, venue, map, hashtag, RSVP deadline)
- `story[]` (timeline milestones)
- `schedule[]` (events)
- `gallery[]` (photo srcs + alts)

Edit one file, the whole page updates.

### TypeScript types
- `StoryMilestone`, `ScheduleEvent`, `GalleryPhoto` interfaces in `content.ts`
- `Status` discriminated union for the RSVP form state

---

## Server vs. client components

| Component | Mode | Why |
|---|---|---|
| `PageBackground` | server | Pure markup, no interactivity |
| `Hero` | server | Static |
| `Countdown` | **client** | `useEffect` + `setInterval` |
| `Story` | server | Static map |
| `Schedule` | server | Static map |
| `Venue` | server | Static iframe |
| `Gallery` | **client** | `useState` for lightbox + keyboard handlers |
| `Rsvp` | **client** | Controlled form + async submit |
| `Footer` | server | Static |

This keeps the JS bundle minimal — most of the page renders as pure HTML on the server, and only the three interactive components ship JS to the browser.

---

## Configuration choices

### `next.config.ts`
```ts
{
  output: 'export',          // pure static build
  trailingSlash: true,       // /about/ instead of /about — better for cPanel etc.
  images: { unoptimized: true } // required for static export with <img>
}
```

### Web3Forms key
`app/components/Rsvp.tsx` line 6:
```ts
const WEB3FORMS_ACCESS_KEY = 'YOUR-WEB3FORMS-ACCESS-KEY-HERE';
```
Replace with your key from https://web3forms.com. (In a future phase we can move this to an env var.)

### Google Fonts
Currently loaded via `<link>` in `app/layout.tsx` for parity with the static site. **Phase 3** will swap this for `next/font/google` (self-hosted — better Lighthouse + privacy + SEO).

---

## Parity checklist (verify visually with the original static site)

- [x] **Fixed blush page background** with 4 floral corners (transforms identical)
- [x] **Hero** — gold rings, "Save the Date" headline, eyebrow, names with `&` spacing, date block with gold dividers, venue line
- [x] **Countdown** — 4 ivory cells, live values, pauses on tab hidden, target locked to 2026-06-12 19:00 Cairo (= 17:00 UTC)
- [x] **Story** — 4 timeline milestones with gold dots
- [x] **Schedule** — 4 events with gold time + name + italic note
- [x] **Venue** — name, address (Nasr City, Cairo, Egypt), Google Maps iframe, "Open in Google Maps" outline button → user's short link
- [x] **Gallery** — 8-thumbnail grid, lightbox opens on click, Esc/arrow keys, backdrop click closes
- [x] **RSVP** — name, email, attending radio, guest count, dietary, message; Web3Forms POST; status messages
- [x] **Footer** — names, date, hashtag (gold script)

### Build verification
- ✅ `npm run build` succeeds: 1 page, 105 kB First Load JS, exports to `out/`
- ⚠️ 2 expected warnings (resolved in Phase 3):
  - `no-page-custom-font` (Google Fonts via `<link>` instead of `next/font`)
  - `metadataBase property in metadata export is not set` (no production URL configured yet)

---

## Deploy

The `out/` directory after `npm run build` is a complete static site. Drop it on:

- **Netlify Drop** — https://app.netlify.com/drop (drag the `out/` folder)
- **Vercel** — `vercel deploy out/`
- **GitHub Pages** — push `out/` to a `gh-pages` branch
- **cPanel / shared host** — FTP upload `out/` contents to `public_html/`

No environment variables needed.

---

## What's NOT in this phase (coming in Phase 2 + Phase 3)

- Animations (hero entrance choreography, scroll-reveal, parallax, petal-fall)
- Decorative SVG dividers
- "Add to Calendar" button (.ics)
- WhatsApp share button
- Couple photo backdrop in hero
- Masonry gallery
- SEO maximalism (structured data, dynamic OG image, sitemap, robots, geo tags)
- `next/font` self-hosting
- `next/image` optimisation

---

## Files added this phase (count)

- 5 config files (`package.json`, `tsconfig.json`, `next.config.ts`, `.eslintrc.json`, `.gitignore`)
- 1 typed content module (`app/lib/content.ts`)
- 1 root layout + 1 page composition (`app/layout.tsx`, `app/page.tsx`)
- 9 components (`app/components/*.tsx`)
- 3 ported CSS files (`app/styles/*.css`)
- 4 assets (`public/flowers.png`, `public/rings.svg`, plus `public/photos/` and `public/favicon.ico` for user)
- 2 docs (`README.md`, this file)

**Total LOC added:** ~700 (excluding CSS which is a 1:1 port).
