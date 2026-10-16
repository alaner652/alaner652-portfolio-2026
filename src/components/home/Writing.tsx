import { LLink as Link } from '@/i18n/client'

import { t } from '@/i18n/server'
import { getAllPosts } from '@/lib/mdx'

/** 「2026-09-05」→「09.05」 */
export function shortDate(date: string) {
  const [, m, d] = date.split('-')
  return `${m}.${d}`
}

/** 最近寫的：左邊標題 + 手寫一句，右邊三篇一列一篇（標題 + 日期 · 分鐘），最後「全部 N 篇 →」。 */
export function Writing({ limit = 3 }: { limit?: number }) {
  const d = t().home
  const all = getAllPosts()
  const posts = all.slice(0, limit)

  return (
    <section className="wrap grid gap-6 pt-22 pb-18 md:grid-cols-12 md:gap-10 md:pt-36 md:pb-30">
      <div className="md:col-span-4">
        <h2 className="text-text text-h2 font-black tracking-[-0.03em]">{d.writing}</h2>
        <p className="font-hand text-accent mt-1 text-[22px] md:mt-2 md:text-[28px]">
          {d.writingNote}
        </p>
      </div>
      <ol className="md:col-span-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group/post border-line grid gap-x-6 gap-y-1 border-t py-4.5 md:grid-cols-[minmax(0,1fr)_110px] md:items-baseline md:py-6"
            >
              <span className="text-text group-hover/post:text-accent text-lg leading-[1.5] font-bold md:text-2xl md:leading-[1.45]">
                {post.frontmatter.title}
              </span>
              <span className="text-text-3 font-mono text-[11px] md:text-right md:text-xs">
                {shortDate(post.frontmatter.date)} · {post.readingMinutes}′
              </span>
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/blog"
            className="text-accent border-line block border-t pt-4 font-mono text-[13px] md:pt-5"
          >
            {d.allPosts(all.length)}
          </Link>
        </li>
      </ol>
    </section>
  )
}
