import Link from 'next/link'

import { Eyebrow } from '@/components/common/Eyebrow'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { getAllPosts } from '@/lib/mdx'

export function Writing() {
  const posts = getAllPosts()

  return (
    <section id="writing" className="border-line-soft border-t py-[72px]">
      <div className="mx-auto max-w-[1080px] px-6">
        <RevealWrapper>
          <div className="mb-[38px]">
            <Eyebrow>Writing</Eyebrow>
            <h2 className="font-display mt-[12px] text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold tracking-[-0.015em]">
              記錄研究與思考。
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-[14px]">
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border-line bg-panel hover:border-amber hover:bg-panel-hi flex flex-wrap items-baseline gap-[16px] rounded-[10px] border px-[22px] py-[18px] transition-[border-color,background] duration-[200ms]"
                >
                  <span className="font-display text-txt group-hover:text-amber min-w-[200px] flex-1 text-[1.05rem] font-medium transition-colors duration-[180ms]">
                    {post.frontmatter.title}
                  </span>
                  <time className="text-faint shrink-0 font-mono text-[0.7rem]">
                    {post.frontmatter.date}
                  </time>
                </a>
              ))}
              <Link
                href="/blog"
                className="text-dim hover:text-amber mt-[4px] inline-flex items-center gap-[6px] font-mono text-[0.78rem] transition-colors duration-[180ms]"
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
