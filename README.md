# Nick Kalaitzidis portfolio

Source for [nickkalas.dev](https://nickkalas.dev), a developer portfolio with a short experience summary, a downloadable CV, and a separate Kelevo engineering case study.

## Content

- `src/content/site.ts`: identity, contact links, experience, skills, and demo URL.
- `src/app/page.tsx`: the hiring-focused homepage.
- `src/app/work/kelevo/page.tsx`: the Kelevo case-study route.
- `src/sections/CaseStudy.tsx`: implementation examples, test scope, and limitations.
- `public/cv/Nick_Kalaitzidis_CV_2026.pdf`: the general single-column CV, copied from Career HQ.
- `public/screenshots/`: demo screenshots using sample data.
- `public/media/`: an existing OCR recording, labelled as an earlier interface.

Keep copy factual: distinguish independently developed software from customer adoption, and test coverage from universal correctness guarantees. Keep the portfolio and CV chronology consistent.

## Development

Next.js static export, React, TypeScript, and CSS. Run `npm run dev` locally.

Before publishing, run `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`. Tests cover navigation, accessible content, demo fallback, and both page layouts.

## Publishing

Pushes to `master` validate and deploy the `out/` export through Cloudflare Workers static assets. Building locally does not publish.

The public CV now uses Career HQ’s General Software Engineer edition. Legacy CV filenames in Career HQ are retained for existing application tooling.
