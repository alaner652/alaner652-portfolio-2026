import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { RevealWrapper } from '@/components/common/RevealWrapper'
import { HAND_LINK, Section } from '@/components/layout/Section'
import { getAllPosts } from '@/lib/mdx'

/** 首頁的文章區：一列一篇，左邊手寫日期，右邊大標題；滑過去標題底下刷出一條麥克筆。完整清單在 /blog。 */
export function Writing({ limit = 3 }: { limit?: number }) {
  const posts = getAllPosts().slice(0, limit)

  return (
    <Section
      id="writing"
      label="心得分享"
      aside={
        <Link href="/blog" className={HAND_LINK}>
          全部文章 <ArrowRight size={18} aria-hidden />
        </Link>
      }
    >
      <RevealWrapper>
        {posts.length > 0 ? (
          <ol className="divide-line-soft border-line-soft divide-y border-y">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group/row grid items-baseline gap-x-6 gap-y-1 py-6 md:grid-cols-12 md:py-7"
                >
                  <span className="font-hand text-faint text-[1.2rem] leading-none md:col-span-2">
                    {post.frontmatter.date} · {post.readingMinutes} 分
                  </span>
                  <span className="font-display text-txt group-hover/row:text-amber before:bg-amber/30 relative isolate text-[clamp(1.3rem,2vw,1.75rem)] leading-[1.3] font-medium tracking-[-0.015em] transition-colors before:absolute before:inset-x-[-0.1em] before:bottom-[0.1em] before:-z-10 before:h-[0.4em] before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-out before:content-[''] group-hover/row:before:scale-x-100 motion-reduce:before:transition-none md:col-span-9">
                    {post.frontmatter.title}
                  </span>
                  <ArrowRight
                    size={22}
                    className="text-faint group-hover/row:text-amber hidden justify-self-end transition-[color,transform] group-hover/row:translate-x-1 md:col-span-1 md:block"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-faint font-mono text-xs">Posts coming soon.</p>
        )}
      </RevealWrapper>
    </Section>
  )
}
