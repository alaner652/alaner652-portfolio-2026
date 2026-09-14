import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { EDUCATION, EXPERIENCE, SITE_CONFIG, WORK_ITEMS } from '@/constants'
import { getAllPosts } from '@/lib/mdx'

/** 一列：左邊 mono 小標，右邊主要文字 + 一行補充。整列可點。 */
function NowRow({
  label,
  title,
  sub,
  href,
}: {
  label: string
  title: string
  sub?: string
  href: string
}) {
  return (
    <Link href={href} className="group hover:bg-panel-hi flex gap-4 px-5 py-3.5 transition-colors">
      <dt className="text-faint w-10 shrink-0 pt-0.5 font-mono text-2xs tracking-[0.06em]">
        {label}
      </dt>
      <dd className="min-w-0 flex-1">
        <div className="font-display group-hover:text-amber flex items-baseline gap-1.5 text-base font-medium transition-colors">
          <span className="truncate">{title}</span>
          <ArrowUpRight size={14} className="text-faint shrink-0 translate-y-0.5" aria-hidden />
        </div>
        {sub && <div className="text-dim mt-0.5 text-sm leading-[1.5]">{sub}</div>}
      </dd>
    </Link>
  )
}

/** Hero 右欄的「現在」卡片：三件正在做的事，全部從 constants / blog 讀，不另外維護。 */
export function NowCard() {
  const current = WORK_ITEMS.find((i) => i.featured && i.tone === 'live')
  const job = EXPERIENCE[0]
  const school = EDUCATION[0]
  const latest = getAllPosts()[0]

  return (
    <aside aria-label="現在" className="motion-safe:animate-fade-up [animation-delay:240ms]">
      <div className="mb-2 flex items-center gap-2">
        <span className="bg-green-ink size-1.5 rounded-full" aria-hidden="true" />
        <span className="text-faint font-mono text-2xs tracking-[0.08em] uppercase">Now</span>
      </div>

      <dl className="divide-line-soft border-line-soft divide-y border-y">
        {current && (
          <NowRow
            label="在做"
            title={current.title}
            sub={`${job.org} · ${job.role}`}
            href="/projects"
          />
        )}
        <NowRow label="在讀" title={school.school} sub={school.program} href="/about" />
        {latest && (
          <NowRow
            label="在寫"
            title={latest.frontmatter.title}
            sub={latest.frontmatter.date}
            href={`/blog/${latest.slug}`}
          />
        )}
      </dl>

      <div className="border-line-soft text-faint flex items-center justify-between border-t px-5 py-3 font-mono text-2xs tracking-[0.04em]">
        <span>
          {SITE_CONFIG.location} · {SITE_CONFIG.timezone}
        </span>
        <a
          href={SITE_CONFIG.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber inline-flex items-center gap-1 transition-colors"
        >
          GitHub <ArrowUpRight size={12} aria-hidden />
        </a>
      </div>
    </aside>
  )
}
