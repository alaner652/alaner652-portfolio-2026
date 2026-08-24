import type { Metadata } from 'next'
import Link from 'next/link'

import { Eyebrow } from '@/components/common/Eyebrow'
import { getAllPosts } from '@/lib/mdx'

export const metadata: Metadata = {
  title: '心得分享',
  description: '記錄研究、系統設計、資安與產品開發的思考過程。',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: '心得分享 | alaner652',
    description: '記錄研究、系統設計、資安與產品開發的思考過程。',
    url: '/blog',
    type: 'website',
    locale: 'zh_TW',
    siteName: 'alaner652',
  },
  twitter: {
    card: 'summary_large_image',
    title: '心得分享 | alaner652',
    description: '記錄研究、系統設計、資安與產品開發的思考過程。',
    creator: '@alaner652',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-270 px-6 py-12 md:py-18">
      <div className="mb-10">
        <Eyebrow>心得分享</Eyebrow>
        <h1 className="font-display mt-3 text-h1 font-medium tracking-[-0.015em]">
          做過、踩過、想過的事
        </h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-dim font-mono text-sm">No posts yet.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group border-line-soft hover:bg-panel-hi -mx-4 block border-t px-4 py-6.5 transition-colors duration-180"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h2 className="font-display group-hover:text-amber text-lg font-medium tracking-[-0.01em] transition-colors duration-180">
                  {post.frontmatter.title}
                </h2>
                <time className="text-faint shrink-0 pt-0.75 font-mono text-2xs">
                  {post.frontmatter.date}
                </time>
              </div>
              {post.frontmatter.description && (
                <p className="text-dim mt-2 max-w-[60ch] text-base leading-[1.6]">
                  {post.frontmatter.description}
                </p>
              )}
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-dim bg-panel-hi border-line-soft rounded-[5px] border px-2.25 py-0.75 font-mono text-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
