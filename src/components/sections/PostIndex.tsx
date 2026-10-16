'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { cn } from '@/lib/utils'
import type { BlogPost } from '@/types'

const MONTHS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
const ALL = '全部'

function shortDate(date: string) {
  const [, m, d] = date.split('-')
  return `${m}.${d}`
}

/** 照「年-月」分組，順序跟 posts 一樣新的在前。 */
function groupByMonth(posts: BlogPost[]) {
  const groups: { key: string; mm: string; label: string; posts: BlogPost[] }[] = []
  for (const post of posts) {
    const [year, month] = post.frontmatter.date.split('-')
    const key = `${year}-${month}`
    let g = groups.find((x) => x.key === key)
    if (!g) {
      g = { key, mm: month, label: `${year} ${MONTHS[Number(month) - 1]}月`, posts: [] }
      groups.push(g)
    }
    g.posts.push(post)
  }
  return groups
}

/** /blog 的目錄：上面一排 #標籤 + 搜尋，底下照月份分組，月份是空心大數字。
    最新那篇放大並帶摘要（frontmatter 的 description），其餘一列一篇。 */
export function PostIndex({ posts, tags }: { posts: BlogPost[]; tags: string[] }) {
  const [tag, setTag] = useState(ALL)
  const [q, setQ] = useState('')

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return posts.filter((p) => {
      if (tag !== ALL && !p.frontmatter.tags?.includes(tag)) return false
      if (!needle) return true
      return [p.frontmatter.title, p.frontmatter.description, ...(p.frontmatter.tags ?? [])]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })
  }, [posts, tag, q])
  const groups = groupByMonth(shown)
  const lead = shown[0]?.slug

  return (
    <>
      <div className="wrap border-line flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b py-2.5">
        <div
          role="group"
          aria-label="主題"
          className="-mx-5 flex gap-5 overflow-x-auto px-5 font-mono text-[13px] [scrollbar-width:none] md:mx-0 md:flex-wrap md:gap-6 md:px-0 md:text-sm"
        >
          {[ALL, ...tags].map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={tag === t}
              onClick={() => setTag(t)}
              className={cn(
                'min-h-10 shrink-0 cursor-pointer transition-colors',
                tag === t ? 'text-accent' : 'text-text-3 hover:text-text'
              )}
            >
              #{t}
            </button>
          ))}
        </div>
        <label className="text-text-3 hidden items-center gap-2 text-sm md:flex">
          搜尋
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="標題或標籤"
            className="border-border-strong text-text placeholder:text-text-3 focus-visible:border-accent h-9 w-60 border-b bg-transparent text-sm outline-none"
          />
        </label>
      </div>

      <section className="wrap pt-7 pb-10 md:pt-12 md:pb-24">
        {groups.length === 0 && <p className="text-text-3 py-10 text-sm">沒有符合的文章。</p>}
        {groups.map((g) => (
          <div key={g.key} className="mb-5 grid gap-x-8 md:mb-14 md:grid-cols-12">
            <div className="flex items-end gap-3 md:col-span-3 md:block">
              <div className="md:sticky md:top-24">
                <div
                  className="outline-num text-[72px] md:text-[150px] md:leading-[0.85]"
                  aria-hidden="true"
                >
                  {g.mm}
                </div>
                <div className="text-text-3 font-mono text-[11px] md:mt-2.5 md:text-[13px]">
                  {g.label} · {g.posts.length} 篇
                </div>
              </div>
            </div>
            <ol className="md:col-span-9">
              {g.posts.map((post) => {
                const big = post.slug === lead
                return (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group/post border-line grid gap-x-6 gap-y-2 border-t py-4 md:grid-cols-[minmax(0,1fr)_180px] md:items-baseline md:py-5.5"
                    >
                      <span className="flex flex-col gap-2.5">
                        <span
                          className={cn(
                            'text-text group-hover/post:text-accent leading-[1.35] font-black tracking-[-0.01em] transition-colors',
                            big ? 'text-[26px] md:text-[48px]' : 'text-lg md:text-[26px]'
                          )}
                        >
                          {post.frontmatter.title}
                        </span>
                        {big && post.frontmatter.description && (
                          <span className="text-text-2 hidden max-w-[36em] text-[17px] leading-[1.8] md:block">
                            {post.frontmatter.description}
                          </span>
                        )}
                      </span>
                      <span className="text-text-3 font-mono text-[11px] leading-[1.9] md:text-right md:text-xs">
                        {shortDate(post.frontmatter.date)} · {post.readingMinutes}′
                        <span className="md:block">
                          {' '}
                          {post.frontmatter.tags
                            ?.slice(0, 2)
                            .map((t) => `#${t}`)
                            .join(' ')}
                        </span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
        ))}
      </section>
    </>
  )
}
