# Nick Kalaitzidis Portfolio

This is the source for [nickkalas.dev](https://nickkalas.dev), a single-page
portfolio for Nick Kalaitzidis.

If you are reviewing this for a hiring process, the site is meant to show more
than a resume summary. It frames Kelevo, a transportation-management SaaS, as a
case study in zero-to-one product engineering: product judgment, full-stack
implementation, domain-driven design, deployment, and launch readiness.

## What To Look For

- **Founder-engineer execution:** Kelevo is presented as a solo-built SaaS
  product, not a toy demo.
- **Domain context:** the portfolio connects trucking dispatch experience to
  product and engineering decisions.
- **Technical ownership:** the site highlights backend APIs, React surfaces,
  PostgreSQL/Prisma modeling, Stripe billing, OCR document intake, and
  multi-tenant capability gating.
- **Public proof:** screenshots, an OCR workflow clip, and a downloadable CV are
  included as static assets.

## Project Shape

The portfolio is a static-export Next.js site deployed through Cloudflare
Workers static assets.

Key files:

- `src/content/site.ts` — central portfolio copy, links, features, screenshots,
  and demo state.
- `src/app/page.tsx` — page assembly.
- `src/sections/` — the main portfolio sections.
- `public/screenshots/` — curated seeded Kelevo screenshots.
- `public/media/` — OCR workflow video.
- `public/cv/` — downloadable public CV.
- `public/og.png` — social sharing image.

## Tech Stack

- Next.js static export
- React
- TypeScript
- Tailwind CSS
- Vitest and Testing Library
- `vitest-axe` accessibility check
- Cloudflare Workers static assets

## Run Locally

```bash
npm install
npm run dev
```

The local dev server defaults to `http://localhost:3000`.

## Validate

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

The test suite checks section composition, content rendering, links, and basic
accessibility.

## Deployment

Pushes to `master` run GitHub Actions validation and deploy the exported `out/`
directory to Cloudflare Workers static assets through `wrangler.jsonc`.

When the live Kelevo demo is ready, `demo.live` in `src/content/site.ts` can be
flipped from `false` to `true` so the demo CTA points to `https://demo.kelevo.ai`
instead of the case study.
