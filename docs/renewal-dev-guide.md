# Renewal Dev Guide

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- MDX (`next-mdx-remote`)

## Commands
```bash
npm install
npm run dev
npm run build
```

## Environment
- Copy `.env.example` to `.env.local`
- Set GA4 ID:
  - `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
- GitHub Actions deploy uses repository variable:
  - `Settings -> Secrets and variables -> Actions -> Variables`
  - Name: `NEXT_PUBLIC_GA_ID`

## Content source
- Legacy posts are loaded from `_posts/*.md`
- Project/TIL split is inferred and can be overridden in `lib/posts.ts`

## GitHub Pages notes
- Static export is enabled in `next.config.mjs` (`output: 'export'`)
- `next/image` optimization is disabled for static export (`images.unoptimized: true`)
- `assets/` are synced to `public/assets/` before dev/build by `scripts/sync-assets.mjs`
- Deployment workflow: `.github/workflows/deploy-pages.yml`
- Workflow uploads `out/` as Pages artifact and deploys via `actions/deploy-pages`
- Ensure repository Pages setting is `Build and deployment: GitHub Actions`

## Frontmatter schema
- Common required: `title`, `date`, `summary`, `tags`, `type`
- `type=project` required: `featured`, `links`
- `type=til` optional: `featured`, `links`
