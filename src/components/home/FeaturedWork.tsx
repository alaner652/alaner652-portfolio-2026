import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SectionLabel } from '@/components/common/SectionLabel'
import { Section } from '@/components/layout/Section'
import { ProjectCover } from '@/components/sections/ProjectCard'
import { WORK_ITEMS } from '@/constants'
import { cn } from '@/lib/utils'
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

/** 一列精選：左邊縮圖（有真的畫面才放）、右邊文字，列與列之間只用一條細線。
    跟 /projects 是同一份資料、不同版式——首頁三個要讀得像文章，不是像商品櫃。
    標題是連結（GitHub 或 demo）；有兩個連結的項目再在底下列出來。/hire 的案例也用這個。 */
export function FeaturedRow({ item }: { item: WorkItem }) {
  const primary = item.link ?? item.demo

  return (
    <article
      className={cn('group/card grid gap-5', item.preview && 'md:grid-cols-[20rem_1fr] md:gap-10')}
    >
      <ProjectCover
        item={item}
        className="border-line-soft rounded-card border md:self-start"
        sizes="(min-width: 768px) 320px, 100vw"
      />
      <div className="min-w-0">
        <h3 className="font-display text-h3 font-medium tracking-[-0.01em]">
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
        <p className="text-txt mt-2.5 text-md font-medium">{item.result ?? item.description}</p>
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

/** 首頁精選：回到最一開始的版式——一列一件、細線分隔，只放 WORK_ITEMS 裡標 featured 的那幾個；
    完整清單和篩選在 /projects。 */
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
