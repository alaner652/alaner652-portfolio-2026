import Link from 'next/link'

import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Section } from '@/components/layout/Section'
import { getAllPosts } from '@/lib/mdx'

export function Writing() {
  const posts = getAllPosts()

  return (
    <Section id="writing">
      <RevealWrapper>
        <SectionLabel title="心得分享" note="大多是記錄，不是教學。" className="mb-8" />

        {posts.length > 0 ? (
          <div>
            <div className="divide-line-soft -mx-3 divide-y">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group hover:bg-panel-hi flex flex-wrap items-baseline gap-4 px-3 py-4 transition-colors"
                >
                  <span className="font-display text-txt group-hover:text-amber min-w-50 flex-1 text-md transition-colors">
                    {post.frontmatter.title}
                  </span>
                  <time className="text-faint shrink-0 font-mono text-2xs">
                    {post.frontmatter.date}
                  </time>
                </Link>
              ))}
            </div>
            <Link
              href="/blog"
              className="text-dim hover:text-amber mt-4 inline-flex items-center gap-1.5 text-sm transition-colors"
            >
              All posts →
            </Link>
          </div>
        ) : (
          <p className="text-faint font-mono text-xs">Posts coming soon.</p>
        )}
      </RevealWrapper>
    </Section>
  )
}
