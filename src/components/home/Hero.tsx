import Image from 'next/image'
import { LLink as Link } from '@/i18n/client'

import { Chars } from '@/components/motion/Chars'
import { HeroDrift } from '@/components/motion/HeroDrift'
import { Reveal } from '@/components/motion/Reveal'
import { SITE_CONFIG } from '@/constants'
import { t } from '@/i18n/server'
import { BUTTON_PRIMARY } from '@/lib/button'
import { charsEnd } from '@/lib/motion'

/** 第一屏：滿版人物照（有檔案才放；沒有就是暗底加點陣，文字改垂直置中、高度收短，免得上半屏空著）、左下角一句手寫開場、兩行主張、一顆按鈕。
    照片上壓兩層黑色遮罩讓字讀得清楚（稿上唯一允許的漸層）。
    動畫（docs/動畫設計.md 首頁 1–4）：手寫淡入、H1 逐字升起、按鈕最後進；整塊文字跟著捲動漂移淡出。 */
export function Hero() {
  const d = t().home
  const LINE_1 = d.line1
  const LINE_2 = d.line2
  const photo = SITE_CONFIG.heroPhoto
  // 逐字：第一行 0.1s 開始，第二行接在第一行最後一字之後；按鈕等第二行出完再 0.1s
  const t1 = 0.1
  const t2 = charsEnd(LINE_1, t1)
  const tCta = charsEnd(LINE_2, t2) + 0.1
  return (
    <section
      className={
        photo
          ? 'relative flex min-h-[78svh] flex-col justify-end overflow-hidden md:min-h-[min(800px,92svh)]'
          : 'relative flex min-h-[64svh] flex-col justify-center overflow-hidden md:min-h-[min(680px,78svh)]'
      }
      data-nav-overlay={photo ? '' : undefined}
    >
      {!photo && <div aria-hidden="true" className="dots dots-fade absolute inset-0" />}
      {photo && (
        <>
          <Image
            src={photo}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,16,19,.92)_0%,rgba(14,16,19,.55)_42%,rgba(14,16,19,0)_70%),linear-gradient(0deg,#0e1013_0%,rgba(14,16,19,0)_28%)]"
          />
        </>
      )}
      <HeroDrift className={photo ? 'wrap relative pb-8 md:pb-16' : 'wrap relative py-10 md:py-14'}>
        <Reveal load small as="p" className="font-hand text-accent text-[26px] md:text-[34px]">
          {d.hi}
        </Reveal>
        <h1
          aria-label={LINE_1 + LINE_2}
          className="text-text mt-1.5 text-[clamp(38px,10.6vw,48px)] leading-[1.08] font-black tracking-[-0.04em] md:mt-2.5 md:text-[clamp(64px,7.2vw,104px)] md:leading-[1.02] md:tracking-[-0.045em]"
        >
          <Chars text={LINE_1} delay={t1} />
          <Chars text={LINE_2} delay={t2} accent={d.accent} />
        </h1>
        <Reveal
          load
          small
          delay={tCta}
          className="mt-6 flex flex-col gap-5 md:mt-10 md:flex-row md:items-center md:gap-7"
        >
          <Link href="/projects" className={BUTTON_PRIMARY}>
            {d.cta}
          </Link>
          <span className="text-text-2 text-base">{d.tagline}</span>
        </Reveal>
      </HeroDrift>
    </section>
  )
}
