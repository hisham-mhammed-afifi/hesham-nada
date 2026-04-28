# Hesham & Nada — Wedding Site (React)

Next.js 15 + TypeScript port of the static wedding save-the-date.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Outputs a static site to `out/` (configured via `output: 'export'` in `next.config.ts`). Drag `out/` onto Netlify Drop / Vercel / GitHub Pages / cPanel.

## Project docs

- `PHASE-1-REACT-MIGRATION.md` — what this phase did, parity checklist
- `PHASE-2-ENHANCEMENTS.md` — added in Phase 2
- `PHASE-3-SEO.md` — added in Phase 3

## Editing content

All copy lives in `app/lib/content.ts` — story milestones, schedule events, gallery photos, venue info, dates. Edit one file, the page updates.
