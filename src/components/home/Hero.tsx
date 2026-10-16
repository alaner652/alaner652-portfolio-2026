import Image from 'next/image'
import Link from 'next/link'

import { IntroOnce } from '@/components/home/IntroOnce'
import { Rise } from '@/components/home/Rise'
import { RECENT, SITE_CONFIG } from '@/constants'
import { BUTTON_PRIMARY } from '@/lib/button'

const LINE_1 = '不只寫程式，'
const LINE_2 = '也打造自己的產品。'

/** 第一屏：滿版人物照（有檔案才放；沒有就是暗底）、左下角一句手寫開場、兩行逐字上浮的主張、一顆按鈕、一行「最近」。
    照片上壓兩層黑色遮罩讓字讀得清楚（稿上唯一允許的漸層）。文字區掛 .hero-drift 跟著捲動往下漂並淡出。
    開頁動畫一個分頁只演一次（IntroOnce + globals.css 的 html[data-intro='done']）。 */
export function Hero() {
  const photo = SITE_CONFIG.heroPhoto
  return (
    <section
      className="relative flex min-h-[78svh] flex-col justify-end overflow-hidden md:min-h-[min(800px,92svh)]"
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
      <div className="wrap hero-drift relative pb-8 md:pb-16">
        <p className="font-hand text-accent text-[26px] md:text-[34px]">嗨，我是 small R —</p>
        <h1
          aria-label={LINE_1 + LINE_2}
          className="text-text mt-1.5 text-[clamp(38px,10.6vw,48px)] md:max-w-[9em] leading-[1.08] font-black tracking-[-0.04em] md:mt-2.5 md:text-[clamp(64px,7.2vw,104px)] md:leading-[1.02] md:tracking-[-0.045em]"
        >
          <Rise text={LINE_1} base={100} />
          <Rise text={LINE_2} base={100 + LINE_1.length * 45} accent={[6, 8]} />
        </h1>
        <div className="intro motion-safe:animate-fade-up mt-6 flex flex-col gap-5 [--fade-delay:900ms] md:mt-10 md:flex-row md:items-center md:gap-7">
          <Link href="/projects" className={BUTTON_PRIMARY}>
            看我做過的東西 →
          </Link>
          <span className="text-text-2 text-base">寫網站、做資安、也做遊戲。</span>
        </div>
        <p className="intro motion-safe:animate-fade-up mt-5 flex items-center gap-3 text-[13px] [--fade-delay:1100ms] md:mt-10 md:text-[15px]">
          <span className="bg-live inline-block size-2 rounded-full" aria-hidden="true" />
          <span className="text-text-3 font-mono text-xs">最近</span>
          <span className="text-text">{RECENT}</span>
        </p>
      </div>
    </section>
  )
}
