import type { Metadata } from 'next'
import Image from 'next/image'
import { LLink as Link } from '@/i18n/client'
import { notFound } from 'next/navigation'

import { SITE_CONFIG, WORK_ITEMS } from '@/constants'
import { content } from '@/i18n/content'
import { hasLocale, localePath } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { languages } from '@/i18n/meta'
import { initLocale, t } from '@/i18n/server'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return WORK_ITEMS.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const l = hasLocale(locale) ? locale : 'zh'
  const path = `/projects/${slug}`
  const item = content(l).WORK_ITEMS.find((w) => w.slug === slug)
  if (!item) return {}
  const title = item.title
  const description = item.result ?? item.description
  return {
    title,
    description,
    alternates: { canonical: localePath(l, path), languages: languages(path) },
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      url: localePath(l, path),
      type: 'website',
      locale: l === 'en' ? 'en_US' : 'zh_TW',
      siteName: SITE_CONFIG.name,
      images: item.preview ? [item.preview] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      creator: `@${SITE_CONFIG.handle}`,
    },
  }
}

type LinkLabels = ReturnType<typeof getDict>['projects']['link']
function linkLabel(url: string, L: LinkLabels) {
  if (url.includes('github')) return L.github
  if (url.includes('youtu')) return L.video
  if (url.includes('roblox')) return L.roblox
  return L.live
}

/** 一段：左邊編號 + 標題，右邊內容。 */
function Sec({ no, title, children }: { no: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-line grid gap-4 border-t py-10 md:grid-cols-12 md:gap-8 md:py-14">
      <h2 className="text-text text-[22px] font-black md:col-span-3 md:text-[28px]">
        <span className="text-accent mb-1.5 block font-mono text-[13px] font-normal">{no}</span>
        {title}
      </h2>
      <div className="md:col-span-8">{children}</div>
    </section>
  )
}

/** 作品詳情（簡化版）：滿版截圖當底的頁首 → 一列事實（分類／技術／連結）→ 概述 → 畫面 → 下一個作品。
    內容全部來自 WORK_ITEMS；之後要寫長一點的「問題／解法／學到的事」再加欄位。 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  await initLocale(params)
  const { slug } = await params
  const d = t().projects
  const items = content().WORK_ITEMS
  const index = items.findIndex((w) => w.slug === slug)
  if (index < 0) notFound()
  const item = items[index]
  const next = items[(index + 1) % items.length]
  const links = [item.link, item.demo].filter((l): l is string => Boolean(l))

  return (
    <article>
      {/* 頁首：截圖鋪滿、壓暗，標題壓在下緣。GitHub 卡那種圖再加一點模糊，別讓它像一張沒放好的圖 */}
      <header
        className="relative flex min-h-[70svh] flex-col justify-end overflow-hidden md:min-h-[min(720px,88svh)]"
        data-nav-overlay=""
      >
        {item.preview && (
          <>
            <Image
              src={item.preview}
              alt=""
              fill
              priority
              sizes="100vw"
              className={cn(
                'object-cover object-top opacity-50',
                item.card && 'scale-110 blur-[6px]'
              )}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(0deg,#0e1013_0%,rgba(14,16,19,.75)_45%,rgba(14,16,19,.45)_100%)]"
            />
          </>
        )}
        <div className="wrap relative pb-8 md:pb-12">
          <nav aria-label="麵包屑" className="text-text-3 text-sm">
            <Link href="/projects" className="text-text-2 hover:text-text transition-colors">
              {d.title}
            </Link>{''}
            / {item.title}
          </nav>
          <h1 className="text-text mt-3 text-[clamp(44px,12vw,56px)] leading-none font-black tracking-[-0.04em] md:mt-4 md:text-[clamp(72px,9.5vw,140px)] md:leading-[0.95] md:tracking-[-0.05em]">
            {item.title}
          </h1>
          {item.result && (
            <p className="text-text-2 mt-3 max-w-[34em] text-[15px] leading-[1.75] md:mt-5 md:text-[21px] md:leading-[1.7]">
              {item.result}
            </p>
          )}
        </div>
      </header>

      {/* 事實列 */}
      <div className="border-line border-y">
        <dl className="wrap grid gap-x-6 text-[15px] md:grid-cols-3">
          <div className="border-line flex justify-between gap-4 border-b py-3 md:block md:border-r md:border-b-0 md:py-5">
            <dt className="text-text-3 text-[13px]">{d.category}</dt>
            <dd className="text-text md:mt-1">{d.categories[item.category] ?? item.category}</dd>
          </div>
          <div className="border-line flex justify-between gap-4 border-b py-3 md:block md:border-r md:border-b-0 md:py-5 md:pl-6">
            <dt className="text-text-3 text-[13px]">{d.tech}</dt>
            <dd className="text-text text-right md:mt-1 md:text-left">
              {item.metrics?.join('、') ?? '—'}
            </dd>
          </div>
          <div className="flex justify-between gap-4 py-3 md:block md:py-5 md:pl-6">
            <dt className="text-text-3 text-[13px]">{d.links}</dt>
            <dd className="text-text flex gap-4 md:mt-1">
              {links.length ? (
                links.map((href) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-accent hover:text-accent border-b transition-colors"
                  >
                    {linkLabel(href, d.link)} ↗
                  </a>
                ))
              ) : (
                <span className="text-text-3">{d.noLinks}</span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      <div className="wrap">
        <Sec no="01" title={d.overview}>
          <p className="text-text-body text-[15px] leading-[1.9] md:text-[17px]">
            {item.description}
          </p>
        </Sec>
        {item.preview && !item.card && (
          <Sec no="02" title={d.screens}>
            <figure className="m-0">
              <div className="border-border overflow-hidden rounded border">
                <Image
                  src={item.preview}
                  alt={d.screenAlt(item.title)}
                  width={1600}
                  height={900}
                  sizes="(min-width: 768px) 860px, 100vw"
                  className="w-full"
                />
              </div>
            </figure>
          </Sec>
        )}
      </div>

      {/* 下一個作品 */}
      <Link href={`/projects/${next.slug}`} className="group/next border-line block border-t">
        <div className="wrap flex items-end justify-between gap-6 py-8 md:py-12">
          <div>
            <div className="text-text-3 text-sm">{d.next}</div>
            <div className="text-text group-hover/next:text-accent mt-2 text-[36px] leading-none font-black tracking-[-0.03em] md:text-[clamp(48px,6vw,88px)] md:tracking-[-0.04em] transition-colors">
              {next.title}
            </div>
          </div>
          <span className="text-accent text-[40px] leading-none md:text-[64px]" aria-hidden="true">
            →
          </span>
        </div>
      </Link>
    </article>
  )
}
