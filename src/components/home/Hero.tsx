import Image from 'next/image'
import { LLink as Link } from '@/i18n/client'

import { IntroOnce } from '@/components/home/IntroOnce'
import { Rise } from '@/components/home/Rise'
import { SITE_CONFIG } from '@/constants'
import { t } from '@/i18n/server'
import { BUTTON_PRIMARY } from '@/lib/button'

/** 第一屏：滿版人物照（有檔案才放；沒有就是暗底，文字改垂直置中、高度收短，免得上半屏空著）、左下角一句手寫開場、兩行逐字上浮的主張、一顆按鈕。
    照片上壓兩層黑色遮罩讓字讀得清楚（稿上唯一允許的漸層）。文字區掛 .hero-drift 跟著捲動往下漂並淡出。
    開頁動畫一個分頁只演一次（IntroOnce + globals.css 的 html[data-intro='done']）。 */
export function Hero() {
  const d = t().home
  const LINE_1 = d.line1
  const LINE_2 = d.line2
  const photo = SITE_CONFIG.heroPhoto
  return (
    <section
      className={
        photo
          ? 'relative flex min-h-[78svh] flex-col justify-end overflow-hidden md:min-h-[min(800px,92svh)]'
          : 'relative flex min-h-[64svh] flex-col justify-center overflow-hidden md:min-h-[min(680px,78svh)]'
      }
      data-nav-overlay={photo ? '' : undefined}
    >
      <IntroOnce />
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
      <div
        className={
          photo
            ? 'wrap hero-drift relative pb-8 md:pb-16'
            : 'wrap hero-drift relative py-10 md:py-14'
        }
      >
        <p className="font-hand text-accent text-[26px] md:text-[34px]">{d.hi}</p>
        <h1
          aria-label={LINE_1 + LINE_2}
          className="text-text mt-1.5 text-[clamp(38px,10.6vw,48px)] leading-[1.08] font-black tracking-[-0.04em] md:mt-2.5 md:text-[clamp(64px,7.2vw,104px)] md:leading-[1.02] md:tracking-[-0.045em]"
        >
          <Rise text={LINE_1} base={100} />
          <Rise text={LINE_2} base={100 + LINE_1.length * 45} accent={d.accent} />
        </h1>
        <div className="intro motion-safe:animate-fade-up mt-6 flex flex-col gap-5 [--fade-delay:900ms] md:mt-10 md:flex-row md:items-center md:gap-7">
          <Link href="/projects" className={BUTTON_PRIMARY}>
            {d.cta}
          </Link>
          <span className="text-text-2 text-base">{d.tagline}</span>
        </div>
      </div>
    </section>
  )
}
