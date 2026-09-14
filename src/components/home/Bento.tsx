import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { RevealWrapper } from '@/components/common/RevealWrapper'
import { SkillIcon } from '@/components/common/SkillIcon'
import { ContributionSnake } from '@/components/home/ContributionSnake'
import { RIDING_PHOTOS, SITE_CONFIG, SKILLS } from '@/constants'
import SKILL_ICONS from '@/constants/skill-icons.json'
import { type Contributions, getContributions } from '@/lib/github'

const TILE =
  'group/tile bg-panel border-line-soft rounded-card hover:border-amber relative flex flex-col overflow-hidden border p-6 transition-colors'

/** 工作之外：整格一張追焦照，字疊在上面。 */
function PhotoTile() {
  const photo = RIDING_PHOTOS[4]
  return (
    <Link href="/about#offduty" className={`${TILE} min-h-64 bg-transparent md:col-span-7`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 768px) 620px, 100vw"
        className="object-cover object-[50%_18%] transition-transform duration-700 ease-out group-hover/tile:scale-[1.03] motion-reduce:transition-none"
      />
      <span
        className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/10"
        aria-hidden="true"
      />
      <div className="relative mt-auto text-white">
        <div className="text-2xs font-mono tracking-[0.18em] uppercase opacity-80">Off duty</div>
        <h2 className="font-display text-h2 mt-3 font-medium tracking-[-0.015em]">工作之外</h2>
      </div>
      <ArrowUpRight
        size={20}
        strokeWidth={1.5}
        className="absolute right-6 bottom-6 flex size-11 items-center justify-center rounded-full border border-white/60 p-2.5 text-white transition-colors group-hover/tile:border-white group-hover/tile:bg-white/15"
        aria-hidden
      />
    </Link>
  )
}

/** 有 logo 的技能，照 SKILLS 的順序，同一個 logo（Next.js 跟它的 API Routes）只留一次。 */
const ICON_MAP: Record<string, string> = SKILL_ICONS
const LOGO_SKILLS = SKILLS.flatMap((g) => g.items).filter(
  (name, i, all) => ICON_MAP[name] && all.findIndex((n) => ICON_MAP[n] === ICON_MAP[name]) === i
)

/** 一排 logo 往左流，內容複製兩份，跑到 -50% 剛好接回起點。hover 暫停，reduce-motion 不動。 */
function LogoRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div
      className={`animate-marquee flex w-max gap-3 group-hover/tile:[animation-play-state:paused] motion-reduce:animate-none ${reverse ? '[animation-direction:reverse]' : ''}`}
    >
      {[...items, ...items].map((name, i) => (
        <SkillIcon key={`${name}-${i}`} name={name} size={40} />
      ))}
    </div>
  )
}

/** 技能：兩排彩色 logo 一左一右流過去，兩邊漸淡。清單直接來自 SKILLS，跟 /about 一致。 */
function SkillsTile() {
  const half = Math.ceil(LOGO_SKILLS.length / 2)
  return (
    <Link href="/about#skills" className={`${TILE} md:col-span-5`}>
      <div className="text-faint text-2xs font-mono tracking-[0.18em] uppercase">Skills</div>
      <h2 className="font-display group-hover/tile:text-amber text-h2 mt-3 font-medium tracking-[-0.015em] transition-colors">
        會的東西
      </h2>
      <div
        className="-mx-6 mt-6 mb-10 space-y-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
        aria-hidden="true"
      >
        <LogoRow items={LOGO_SKILLS.slice(0, half)} />
        <LogoRow items={LOGO_SKILLS.slice(half)} reverse />
      </div>
      <ArrowRight
        size={22}
        strokeWidth={1.5}
        className="text-dim group-hover/tile:text-amber absolute right-6 bottom-6 transition-colors"
        aria-hidden
      />
    </Link>
  )
}

/** GitHub：整格就是貢獻圖，蛇在上面爬。次數只當小字，不當標題。抓不到就只剩連結。 */
function GithubTile({ data }: { data: Contributions | null }) {
  // 第一天不是週日的話前面補空格，讓每一直欄都是週日到週六
  const pad = data ? new Date(data.days[0].date).getUTCDay() : 0

  return (
    <Link
      href={SITE_CONFIG.github}
      target="_blank"
      rel="noopener noreferrer"
      className={`${TILE} md:col-span-12`}
    >
      {data ? (
        <div className="flex flex-1 items-center">
          <ContributionSnake days={data.days} pad={pad} />
        </div>
      ) : (
        <h2 className="font-display group-hover/tile:text-amber text-h2 font-medium tracking-[-0.015em] transition-colors">
          GitHub
        </h2>
      )}
      <div className="text-faint text-2xs mt-5 flex items-center font-mono tracking-[0.18em] uppercase">
        GitHub
        {data && (
          <span className="ml-3 tracking-[0.04em] normal-case">
            最近一年 {data.total.toLocaleString('en-US')} 次貢獻
          </span>
        )}
        <ArrowUpRight
          size={22}
          strokeWidth={1.5}
          className="text-dim group-hover/tile:text-amber ml-auto transition-colors"
          aria-hidden
        />
      </div>
    </Link>
  )
}

/** Hero 底下的 Bento：一張追焦照 + 技能跑馬燈，底下一整條 GitHub 貢獻圖。
    專案跟文章不在這裡，往下捲就是。 */
export async function Bento() {
  const contributions = await getContributions()

  return (
    <nav aria-label="工作之外、技能、GitHub" className="mx-auto max-w-270 px-6 pb-14 md:pb-20">
      <RevealWrapper>
        <div className="grid gap-4 sm:gap-5 md:auto-rows-[minmax(11rem,auto)] md:grid-cols-12">
          <PhotoTile />
          <SkillsTile />
          <GithubTile data={contributions} />
        </div>
      </RevealWrapper>
    </nav>
  )
}
