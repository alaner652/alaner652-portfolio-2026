'use client'

import { LLink as Link } from '@/i18n/client'
import { useMemo, useState } from 'react'

import { Reveal, RevealItem } from '@/components/motion/Reveal'

import { useDict } from '@/i18n/client'
import type { Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'
import type { BlogPost } from '@/types'

const ALL = '__all__'

function shortDate(date: string) {
  const [, m, d] = date.split('-')
  return `${m}.${d}`
}

/** 照「年-月」分組，順序跟 posts 一樣新的在前。 */
function groupByMonth(posts: BlogPost[], monthLabel: (y: string, m: number) => string) {
  const groups: { key: string; mm: string; label: string; posts: BlogPost[] }[] = []
  for (const post of posts) {
    const [year, month] = post.frontmatter.date.split('-')
    const key = `${year}-${month}`
    let g = groups.find((x) => x.key === key)
    if (!g) {
      g = { key, mm: month, label: monthLabel(year, Number(month)), posts: [] }
      groups.push(g)
    }
    g.posts.push(post)
  }
  return groups
}

/** /blog 的目錄：上面一排 #標籤 + 搜尋，底下照月份分組，月份是空心大數字。
    最新那篇放大並帶摘要（frontmatter 的 description），其餘一列一篇。 */
export function PostIndex({ posts, tags }: { posts: BlogPost[]; tags: string[]; locale: Locale }) {
  const d = useDict().blog
  const [tag, setTag] = useState(ALL)
  const [q, setQ] = useState('')

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return posts.filter((p) => {
      if (tag !== ALL && !p.frontmatter.tags?.includes(tag)) return false
      if (!needle) return true
      return [p.frontmatter.title, p.frontmatter.description, ...(p.frontmatter.tags ?? [])]
        .join('')
        .toLowerCase()
        .includes(needle)
    })
  }, [posts, tag, q])
  const groups = groupByMonth(shown, d.monthLabel)
  const lead = shown[0]?.slug

  return (
    <>
      <div className="wrap border-line flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b py-2.5">
        <div
          role="group"
          aria-label={d.title}
          // 手機標籤一排橫滑：右緣淡出，看得出還有東西
          className="-mx-5 flex gap-5 overflow-x-auto px-5 font-mono text-[13px] [mask-image:linear-gradient(90deg,#000_85%,transparent)] [scrollbar-width:none] md:mx-0 md:flex-wrap md:gap-6 md:px-0 md:text-sm md:[mask-image:none]"
        >
          {[ALL, ...tags].map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={tag === t}
              onClick={() => setTag(t)}
              className={cn(
                'min-h-10 shrink-0 cursor-pointer',
                tag === t ? 'text-accent' : 'text-text-3 hover:text-text transition-colors'
              )}
            >
              #{t === ALL ? d.all : t}
            </button>
          ))}
        </div>
        <label className="text-text-3 flex w-full items-center gap-2 text-sm md:w-auto">
          {d.search}
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={d.searchPlaceholder}
            className="border-border-strong text-text placeholder:text-text-3 focus-visible:border-accent h-9 min-w-0 flex-1 border-b bg-transparent text-sm outline-none md:w-60 md:flex-none"
          />
        </label>
      </div>

      {/* 換標籤／搜尋：整段重掛，淡入一次（docs/動畫設計.md 文章 4） */}
      <Reveal
        load
        small
        as="section"
        key={`${tag}|${q}`}
        className="wrap pt-7 pb-10 md:pt-12 md:pb-24"
      >
        {groups.length === 0 && <p className="text-text-3 py-10 text-sm">{d.empty}</p>}
        {groups.map((g) => (
          <div key={g.key} className="mb-5 grid gap-x-8 md:mb-14 md:grid-cols-12">
            <div className="flex items-end gap-3 md:col-span-3 md:block">
              <div className="md:sticky md:top-24">
                {/* 月份從底下升起（跟關於頁的年份刻意不同）。
                    觀察的是外層的 clip 框，不是被推到框外的數字本身：被 clip 掉的元素 IntersectionObserver 永遠看不到它。 */}
                <Reveal
                  stagger={0}
                  className="-mb-[0.06em] overflow-clip pb-[0.06em]"
                  aria-hidden="true"
                >
                  <RevealItem
                    variants={{
                      hidden: { y: '105%' },
                      show: { y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.1, 1] } },
                    }}
                    className="outline-num text-[72px] md:text-[150px] md:leading-[0.85]"
                  >
                    {g.mm}
                  </RevealItem>
                </Reveal>
                <div className="text-text-3 font-mono text-[11px] md:mt-2.5 md:text-[13px]">
                  {g.label} · {d.count(g.posts.length)}
                </div>
              </div>
            </div>
            <Reveal as="ol" stagger={0.05} className="md:col-span-9">
              {g.posts.map((post) => {
                const big = post.slug === lead
                return (
                  <RevealItem as="li" key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group/post border-line grid gap-x-6 gap-y-2 border-t py-4 md:grid-cols-[minmax(0,1fr)_180px] md:items-baseline md:py-5.5"
                    >
                      <span className="flex flex-col gap-2.5">
                        <span
                          className={cn(
                            'text-text group-hover/post:text-accent leading-[1.35] font-black tracking-[-0.01em] text-balance transition-colors',
                            big ? 'text-[26px] md:text-[48px]' : 'text-lg md:text-[26px]'
                          )}
                        >
                          {post.frontmatter.title}
                        </span>
                        {/* 每篇都帶摘要，只看標題猜不出在講什麼；最新那篇字大一點、不截斷 */}
                        {post.frontmatter.description && (
                          <span
                            className={cn(
                              'text-text-2 max-w-[40em] leading-[1.75]',
                              big
                                ? 'text-[15px] md:text-[17px] md:leading-[1.8]'
                                : 'line-clamp-2 text-sm md:text-[15px]'
                            )}
                          >
                            {post.frontmatter.description}
                          </span>
                        )}
                      </span>
                      <span className="text-text-3 font-mono text-[11px] leading-[1.9] md:text-right md:text-xs">
                        {shortDate(post.frontmatter.date)} · {d.minutes(post.readingMinutes)}
                        {post.frontmatter.tags?.length ? (
                          <span className="ml-3 md:ml-0 md:block">
                            {post.frontmatter.tags
                              .slice(0, 2)
                              .map((t) => `#${t}`)
                              .join(' ')}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </RevealItem>
                )
              })}
            </Reveal>
          </div>
        ))}
      </Reveal>
    </>
  )
}
