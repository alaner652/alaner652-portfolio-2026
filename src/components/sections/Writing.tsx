import Link from 'next/link'

import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { getAllPosts } from '@/lib/mdx'

export function Writing() {
  const posts = getAllPosts()

  return (
    <section id="writing" className="border-line-soft border-t py-[80px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <RevealWrapper>
          <SectionLabel index="04" title="Writing" className="mb-[20px]" />

          {posts.length > 0 ? (
            <div>
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border-line-soft flex flex-wrap items-baseline gap-[16px] border-t py-[16px]"
                >
                  <span className="font-display text-txt group-hover:text-amber min-w-[200px] flex-1 text-[1.02rem] transition-colors duration-[180ms]">
                    {post.frontmatter.title}
                  </span>
                  <time className="text-faint shrink-0 font-mono text-[0.7rem]">
                    {post.frontmatter.date}
                  </time>
                </a>
              ))}
              <Link
                href="/blog"
                className="text-dim hover:text-amber mt-[18px] inline-flex items-center gap-[6px] text-[0.85rem] transition-colors duration-[180ms]"
              >
                All posts →
              </Link>
            </div>
          ) : (
            <p className="text-faint font-mono text-[0.82rem]">Posts coming soon.</p>
          )}
        </RevealWrapper>
      </div>
    </section>
  )
}
