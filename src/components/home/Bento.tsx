import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { LLink as Link } from '@/i18n/client'

import { SkillIcon } from '@/components/common/SkillIcon'
import { ContributionSnake } from '@/components/home/ContributionSnake'
import { RIDING_PHOTOS, SITE_CONFIG, SKILLS } from '@/constants'
import SKILL_ICONS from '@/constants/skill-icons.json'
import { t } from '@/i18n/server'
import { type Contributions, getContributions } from '@/lib/github'

const TILE =
  'group/tile bg-surface border-line rounded-card hover:border-border-strong relative flex flex-col overflow-hidden border p-6 '

/** 工作之外：整格一張追焦照，字疊在上面。 */
function PhotoTile() {
  const d = t().home
  const photo = RIDING_PHOTOS[4]
  return (
    <Link href="/about#offduty" className={`${TILE} min-h-64 bg-transparent md:col-span-7`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        // Bento 緊貼在 90svh 的 Hero 底下，這張照片的上緣就在第一屏裡，是 LCP：先載，不然 dev 會一直警告
        priority
        sizes="(min-width: 768px) 620px, 100vw"
        className="object-cover object-[50%_18%]"
      />
      <span
        className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/10"
        aria-hidden="true"
      />
      <div className="relative mt-auto text-white">
        <div className="text-2xs font-mono tracking-[0.18em] uppercase opacity-80">{d.offDuty}</div>
        <h2 className="mt-3 text-[28px] font-black tracking-[-0.02em]">{d.offDuty}</h2>
      </div>
      <ArrowUpRight
        size={20}
        strokeWidth={1.5}
        className="absolute right-6 bottom-6 flex size-11 items-center justify-center rounded-full border border-white/60 p-2.5 text-white group-hover/tile:border-white group-hover/tile:bg-white/15"
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

/** 一排 logo（靜態，沒有跑馬燈） */
function LogoRow({ items }: { items: string[] }) {
  return (
    <div className="flex w-max gap-3">
      {items.map((name, i) => (
        <SkillIcon key={`${name}-${i}`} name={name} size={40} />
      ))}
    </div>
  )
}

/** 技能：兩排彩色 logo 一左一右流過去，兩邊漸淡。清單直接來自 SKILLS，跟 /about 一致。 */
function SkillsTile() {
  const d = t().home
  const half = Math.ceil(LOGO_SKILLS.length / 2)
  return (
    <Link href="/about#skills" className={`${TILE} md:col-span-5`}>
      <div className="text-text-3 text-2xs font-mono tracking-[0.18em] uppercase">{d.skills}</div>
      <h2 className="group-hover/tile:text-accent mt-3 text-[28px] font-black tracking-[-0.02em]">
        {d.skills}
      </h2>
      <div
        className="-mx-6 mt-6 mb-10 space-y-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
        aria-hidden="true"
      >
        <LogoRow items={LOGO_SKILLS.slice(0, half)} />
        <LogoRow items={LOGO_SKILLS.slice(half)} />
      </div>
      <ArrowRight
        size={22}
        strokeWidth={1.5}
        className="text-text-2 group-hover/tile:text-accent absolute right-6 bottom-6"
        aria-hidden
      />
    </Link>
  )
}

/** GitHub：整格就是貢獻圖，蛇在上面爬。次數只當小字，不當標題。抓不到就只剩連結。 */
function GithubTile({ data }: { data: Contributions | null }) {
  const d = t().home
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
        <h2 className="group-hover/tile:text-accent text-[28px] font-black tracking-[-0.02em]">
          GitHub
        </h2>
      )}
      <div className="text-text-3 text-2xs mt-5 flex items-center font-mono tracking-[0.18em] uppercase">
        GitHub
        {data && (
          <span className="ml-3 tracking-[0.04em] normal-case">
            {d.contributions(data.total.toLocaleString('en-US'))}
          </span>
        )}
        <ArrowUpRight
          size={22}
          strokeWidth={1.5}
          className="text-text-2 group-hover/tile:text-accent ml-auto"
          aria-hidden
        />
      </div>
    </Link>
  )
}

/** Hero 底下的 Bento：一張追焦照 + 技能跑馬燈，底下一整條 GitHub 貢獻圖。
    緊貼著 Hero，相片的上緣會露在第一屏底下，所以不用捲到才出現的 RevealWrapper，
    而是接在 Hero 的按鈕後面淡入（.intro：第二次進首頁就不等了）。專案跟文章不在這裡，往下捲就是。 */
export async function Bento() {
  const contributions = await getContributions()

  return (
    <nav aria-label={t().home.bentoLabel} className="intro wrap pt-10 pb-6 md:pt-16 md:pb-10">
      <div className="grid gap-4 sm:gap-5 md:auto-rows-[minmax(11rem,auto)] md:grid-cols-12">
        <PhotoTile />
        <SkillsTile />
        <GithubTile data={contributions} />
      </div>
    </nav>
  )
}
