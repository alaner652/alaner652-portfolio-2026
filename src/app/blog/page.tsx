import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { Eyebrow } from '@/components/common/Eyebrow'

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
    <div className="max-w-[1080px] mx-auto px-6 py-[72px]">
      <div className="mb-[48px]">
        <Eyebrow>Writing</Eyebrow>
        <h1 className="font-display font-semibold text-[clamp(1.7rem,3.6vw,2.5rem)] tracking-[-0.015em] mt-[12px]">
          記錄研究與思考。
        </h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-dim font-mono text-[0.9rem]">No posts yet.</p>
      ) : (
        <div className="grid gap-[18px]">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block border border-line rounded-[12px] bg-panel px-[26px] py-[24px] transition-[border-color,transform,background] duration-[200ms] hover:border-amber hover:translate-y-[-3px] hover:bg-panel-hi"
            >
              <div className="flex items-start justify-between gap-[16px] flex-wrap">
                <h2 className="font-display font-semibold text-[1.2rem] tracking-[-0.01em]">
                  {post.frontmatter.title}
                </h2>
                <time className="font-mono text-[0.72rem] text-faint shrink-0 pt-[3px]">
                  {post.frontmatter.date}
                </time>
              </div>
              {post.frontmatter.description && (
                <p className="text-dim text-[0.95rem] mt-[8px] max-w-[56ch]">
                  {post.frontmatter.description}
                </p>
              )}
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="flex gap-[8px] mt-[14px] flex-wrap">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[0.66rem] text-faint border border-line-soft px-[8px] py-[3px] rounded-[5px]"
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
