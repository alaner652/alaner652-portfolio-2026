import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { Eyebrow } from '@/components/common/Eyebrow'
import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Section } from '@/components/layout/Section'
import { ProjectCover, STATUS } from '@/components/sections/ProjectCard'
import { WORK_ITEMS } from '@/constants'
import type { WorkItem } from '@/types'

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-dim hover:text-amber inline-flex items-center gap-1 font-mono text-xs transition-colors"
    >
      {children} <ArrowUpRight size={12} aria-hidden />
    </a>
  )
}

/** 一列精選：左邊縮圖、右邊文字，列與列之間只用一條細線。
    跟 /projects 的卡片格是同一份資料、不同版式——首頁三個要讀得像文章，不是像商品櫃。
    標題是連結（GitHub 或 demo）；有兩個連結的項目再在底下列出來。 */
function FeaturedRow({ item }: { item: WorkItem }) {
  const primary = item.link ?? item.demo
  const { dot, text } = STATUS[item.tone]

  return (
    <article className="grid gap-5 md:grid-cols-[17rem_1fr] md:gap-10">
      <ProjectCover
        item={item}
        className="border-line-soft rounded-card overflow-hidden border md:self-start"
      />
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className={`size-1.5 rounded-full ${dot}`} aria-hidden="true" />
          <Eyebrow className={text}>{item.status}</Eyebrow>
        </div>
        <h3 className="font-display mt-2 text-h3 font-medium tracking-[-0.01em]">
          {primary ? (
            <a
              href={primary}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber inline-flex items-center gap-1.5 transition-colors"
            >
              {item.title}
              <ArrowUpRight size={16} className="text-faint" aria-hidden />
            </a>
          ) : (
            item.title
          )}
        </h3>
        <p className="text-dim mt-2.5 max-w-[56ch] text-md leading-[1.75]">{item.description}</p>
        {(item.metrics || item.demo) && (
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
            {item.metrics && (
              <div className="flex flex-wrap gap-2">
                {item.metrics.map((m) => (
                  <MetricChip key={m}>{m}</MetricChip>
                ))}
              </div>
            )}
            {item.demo && (
              <div className="flex gap-4">
                {item.link && <ExtLink href={item.link}>GitHub</ExtLink>}
                <ExtLink href={item.demo}>Demo</ExtLink>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

/** 首頁精選：只放 WORK_ITEMS 裡標 featured 的那幾個，完整清單和篩選在 /projects。 */
export function FeaturedWork() {
  const items = WORK_ITEMS.filter((i) => i.featured)

  return (
    <Section id="work">
      <RevealWrapper className="mb-10">
        <SectionLabel title="做過的東西" note="挑三個能替上面那些話作證的。" />
      </RevealWrapper>

      {/* 間距放在 RevealWrapper 上，divide-y 才能落在列與列之間 */}
      <div className="divide-line-soft divide-y">
        {items.map((item) => (
          <RevealWrapper key={item.title} className="py-8 first:pt-0 last:pb-0 md:py-10">
            <FeaturedRow item={item} />
          </RevealWrapper>
        ))}
      </div>

      <RevealWrapper>
        <Link
          href="/projects"
          className="text-dim hover:text-amber mt-8 inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          全部 {WORK_ITEMS.length} 個專案 →
        </Link>
      </RevealWrapper>
    </Section>
  )
}
