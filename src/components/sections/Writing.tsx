import Link from 'next/link'

import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { getAllPosts } from '@/lib/mdx'

export function Writing() {
  const posts = getAllPosts()

  return (
    <section id="writing" className="border-line-soft border-t py-14 md:py-20">
      <div className="mx-auto max-w-270 px-6">
        <RevealWrapper>
          <SectionLabel
            title="心得分享"
            note="大多是記錄，不是教學。"
            className="mb-7"
          />

          {posts.length > 0 ? (
            <div>
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border-line-soft hover:bg-panel-hi -mx-3 flex flex-wrap items-baseline gap-4 border-t px-3 py-4 transition-colors duration-180"
                >
                  <span className="font-display text-txt group-hover:text-amber min-w-50 flex-1 text-md transition-colors duration-180">
                    {post.frontmatter.title}
                  </span>
                  <time className="text-faint shrink-0 font-mono text-2xs">
                    {post.frontmatter.date}
                  </time>
                </Link>
              ))}
              <Link
                href="/blog"
                className="text-dim hover:text-amber mt-4.5 inline-flex items-center gap-1.5 text-sm transition-colors duration-180"
              >
                All posts →
              </Link>
            </div>
          ) : (
            <p className="text-faint font-mono text-xs">Posts coming soon.</p>
          )}
        </RevealWrapper>
      </div>
    </section>
  )
}
