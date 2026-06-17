# alaner652-portfolio

Personal site built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

## Stack

- **Next.js 16** (App Router, Edge runtime for OG images)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (`@base-ui/react`)
- **MDX** via `next-mdx-remote` + `gray-matter` (blog)
- **Mermaid** (lazy-loaded client component for diagrams in MDX)
- **ESLint** + **Prettier**

## Dev

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Structure

```
src/
├── app/
│   ├── page.tsx                   # home
│   ├── layout.tsx                 # root layout, global metadata
│   ├── resume/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx        # MDX rendering
│   ├── opengraph-image.tsx        # Edge OG image (home)
│   ├── blog/[slug]/opengraph-image.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── sections/                  # Hero About Work Experience Writing Now Philosophy
│   ├── layout/                    # Nav Footer
│   └── common/                    # Card Stack Columns StatusPanel LiveClock RevealWrapper Mermaid …
├── constants/index.ts             # all site content (single source of truth)
├── content/blog/                  # *.mdx posts
├── lib/
│   ├── mdx.ts                     # MDX loader + frontmatter parser
│   └── utils.ts
└── types/index.ts
```

## Content

All copy, links, and data live in `src/constants/index.ts`. No content is hardcoded in components.

Blog posts are `.mdx` files in `src/content/blog/`. Required frontmatter:

```yaml
---
title: ''
date: 'YYYY-MM-DD'
summary: ''
---
```

## Deploy

Vercel — zero config, auto-detects Next.js.
