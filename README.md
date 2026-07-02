# nickkalas-portfolio

Personal portfolio — single-page, static-export Next.js site
("Ops Console, Founder-Grade" design). Spec and plan live in
`docs/superpowers/`.

## Develop

    npm install
    npm run dev          # http://localhost:3000

## Validate

    npm run format:check && npm run lint && npm run typecheck && npm test && npm run build

## Deploy

Pushes to `master` run CI and deploy `out/` to Cloudflare Workers
static assets via `wrangler.jsonc`.

One-time setup (owner actions):

1. GitHub repo secrets: `CLOUDFLARE_API_TOKEN` (Workers Scripts:Edit
   token) and `CLOUDFLARE_ACCOUNT_ID`.
2. The domain must be active in the Cloudflare account; the custom
   domain binds from `wrangler.jsonc` `routes` on first deploy.
3. When demo.kelevo.ai goes live, flip `demo.live` to `true` in
   `src/content/site.ts`.
4. Product screenshots: drop curated PNGs (seeded/fictional data
   only) into `public/screenshots/` and register each in the
   `screenshots` array in `src/content/site.ts`.

Manual deploy: `npm run build && npm run deploy`.

## Pre-share checklist

- Responsive pass (phone + desktop), cross-browser.
- Lighthouse ≥ 95 all categories.
- Link check: demo CTA, GitHub, LinkedIn, CV download, mailto.
