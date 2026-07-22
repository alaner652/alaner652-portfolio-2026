import type { Metadata } from 'next'

import { Eyebrow } from '@/components/common/Eyebrow'
import { getAllPosts } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Writing',
  description: '記錄研究、系統設計、資安與產品開發的思考過程。',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Writing | alaner652',
    description: '記錄研究、系統設計、資安與產品開發的思考過程。',
    url: '/blog',
    type: 'website',
    locale: 'zh_TW',
    siteName: 'alaner652',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writing | alaner652',
    description: '記錄研究、系統設計、資安與產品開發的思考過程。',
    creator: '@alaner652',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-[1080px] px-6 py-[72px]">
      <div className="mb-[40px]">
        <Eyebrow>Writing</Eyebrow>
        <h1 className="font-display mt-[12px] text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-[-0.015em]">
          記錄研究與思考
        </h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-dim font-mono text-[0.9rem]">No posts yet.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group border-line-soft block border-t py-[26px]"
            >
              <div className="flex flex-wrap items-start justify-between gap-[16px]">
                <h2 className="font-display group-hover:text-amber text-[1.15rem] font-medium tracking-[-0.01em] transition-colors duration-[180ms]">
                  {post.frontmatter.title}
                </h2>
                <time className="text-faint shrink-0 pt-[3px] font-mono text-[0.72rem]">
                  {post.frontmatter.date}
                </time>
              </div>
              {post.frontmatter.description && (
                <p className="text-dim mt-[8px] max-w-[60ch] text-[0.95rem] leading-[1.6]">
                  {post.frontmatter.description}
                </p>
              )}
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="mt-[14px] flex flex-wrap gap-[8px]">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-dim bg-panel-hi border-line-soft rounded-[5px] border px-[9px] py-[3px] font-mono text-[0.68rem]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
