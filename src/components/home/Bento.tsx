import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { MetricChip } from '@/components/common/MetricChip'
import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SkillIcon } from '@/components/common/SkillIcon'
import { JOURNEY, SITE_CONFIG, SKILLS } from '@/constants'

/** 格子的外殼：整格是一個連結，標題在上、右上角一個 ↗，hover 邊框轉琥珀。 */
function Cell({
  href,
  title,
  className = '',
  children,
}: {
  href: string
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`group/cell bg-panel border-line-soft rounded-card hover:border-amber flex flex-col overflow-hidden border p-5 transition-colors ${className}`}
    >
      <div className="mb-5 flex items-center">
        <h2 className="font-display group-hover/cell:text-amber text-lg font-medium tracking-[-0.01em] transition-colors">
          {title}
        </h2>
        <ArrowUpRight
          size={14}
          className="text-faint group-hover/cell:text-amber ml-auto transition-colors"
          aria-hidden
        />
      </div>
      {children}
    </Link>
  )
}

/** 關於：頭像 + 名字。自介和在讀／在做 Hero 跟 /about 都有了，這裡不重複。 */
function AboutCell() {
  return (
    <Cell href="/about" title="關於我" className="md:col-span-2">
      <div className="mt-auto flex items-center gap-3.5">
        {SITE_CONFIG.avatar ? (
          <Image
            src={SITE_CONFIG.avatar}
            alt=""
            width={48}
            height={48}
            className="border-line-soft size-12 shrink-0 rounded-full border object-cover"
          />
        ) : (
          <span className="bg-orange-tint text-orange-ink font-display flex size-12 shrink-0 items-center justify-center rounded-full text-lg font-medium">
            R
          </span>
        )}
        <div className="min-w-0">
          <div className="text-txt truncate text-base font-medium">吳宸麒</div>
          <div className="text-dim truncate font-mono text-2xs tracking-[0.04em]">
            {SITE_CONFIG.handle} · small R
          </div>
        </div>
      </div>
    </Cell>
  )
}

/** 經歷：最新那段的預覽，長得跟 /about 時間軸的一格一樣，只是縮小。 */
function JourneyCell() {
  const now = JOURNEY[JOURNEY.length - 1]

  return (
    <Cell href="/about#experience" title="經歷" className="md:col-span-4">
      <div className="mt-auto grid gap-x-5 gap-y-1 sm:grid-cols-[auto_1fr]">
        <div className="sm:text-right">
          <div className="font-display text-xl font-medium whitespace-nowrap tabular-nums">
            {now.period}
          </div>
          <div className="text-faint font-mono text-2xs tracking-[0.04em]">{now.stage}</div>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-medium">{now.title}</h3>
            <MetricChip tone={now.tone}>{now.track}</MetricChip>
          </div>
          <p className="text-dim mt-1.5 line-clamp-2 text-sm leading-[1.65]">{now.detail}</p>
        </div>
      </div>
    </Cell>
  )
}

/** 技能：所有技能排成一條跑馬燈。內容複製兩份、位移 -50% 接回起點，hover 停下來。
    reduce motion 時不跑，改成正常換行排開。 */
function SkillsCell() {
  const all = SKILLS.flatMap((g) => g.items)

  return (
    <Cell href="/about#skills" title="會的東西" className="md:col-span-6">
      <div
        className="group/marquee -mx-5 overflow-hidden motion-reduce:mx-0 motion-reduce:overflow-visible"
        aria-hidden="true"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <ul className="motion-safe:animate-marquee flex w-max gap-2 px-5 group-hover/marquee:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:px-0">
          {[...all, ...all].map((item, i) => (
            <li
              key={`${item}-${i}`}
              className={`rounded-chip bg-panel-hi text-txt inline-flex shrink-0 items-center gap-2 py-1.5 pr-3 pl-1.5 font-mono text-xs ${
                i >= all.length ? 'motion-reduce:hidden' : ''
              }`}
            >
              <SkillIcon name={item} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Cell>
  )
}

/** Hero / 我能做什麼 底下的 Bento：上排關於 + 經歷，下排技能跑滿。
    每格都是 /about 對應區塊的入口，只放一眼看得懂的東西，字留給 /about。 */
export function Bento() {
  return (
    <nav aria-label="關於、經歷、技能" className="mx-auto max-w-270 px-6 pb-14 md:pb-20">
      <RevealWrapper>
        <div className="grid gap-4 sm:gap-5 md:grid-cols-6">
          <AboutCell />
          <JourneyCell />
          <SkillsCell />
        </div>
      </RevealWrapper>
    </nav>
  )
}
