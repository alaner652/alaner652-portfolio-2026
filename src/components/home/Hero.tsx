import Link from 'next/link'
import type { CSSProperties } from 'react'

import { Marker } from '@/components/common/Marker'
import { Typed } from '@/components/common/Typed'
import { IntroOnce } from '@/components/home/IntroOnce'
import { NameTyper } from '@/components/home/NameTyper'
import { SITE_CONFIG } from '@/constants'
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from '@/lib/button'

/** 第一屏是一句話，自己把自己寫出來：「small R」一個字一個字跳出來（0.1s 起、每字 60ms），
    接著主張緊接著打（0.6s 起、每字 70ms；中間不留空檔，留了會像卡住），打完游標在句尾眨幾下、麥克筆畫過關鍵字，
    然後底排（細線 + 身分／補充句／按鈕三欄）一起淡入。不放圖，字標本身就是圖。全部是 CSS 延遲，reduce motion 直接全部顯示。
    滑到名字上還是會換成本名或帳號（NameTyper）。
    高度只撐 90svh，不是整屏：底下 Bento 的相片會露出一截，代替「往下捲」的提示。
    開頁動畫一個分頁只演一次（IntroOnce + globals.css 的 html[data-intro='done']）。 */
export function Hero() {
  return (
    <header className="hero-intro mx-auto flex min-h-[calc(90svh-4.25rem)] w-full max-w-270 flex-col px-6 pt-8 pb-12 md:pt-12">
      <IntroOnce />
      <div className="flex flex-1 flex-col justify-center py-8 [@media(max-height:760px)]:py-4">
        {/* h1 = 名字 + 主張。讀屏會念「small R，不只寫程式，也打造自己的產品。」 */}
        <h1>
          <span className="font-hand text-wordmark text-txt -ml-[0.03em] block h-[1em] leading-[0.95] font-semibold tracking-[0.01em] whitespace-nowrap">
            <NameTyper />
          </span>
          <span className="sr-only">，</span>
          <span className="font-display text-display text-txt mt-6 block max-w-[18em] leading-[1.18] font-medium tracking-[-0.02em] md:mt-8">
            <Typed text="不只寫程式，也" base={600} step={70} />
            <Marker draw="load" delay={1700}>
              <Typed text="打造自己的產品" base={1090} step={70} />
            </Marker>
            <Typed text="。" base={1580} />
            <span
              className="tcursor"
              style={{ '--base': '1650ms' } as CSSProperties}
              aria-hidden="true"
            />
          </span>
        </h1>
        {/* 底排照草稿 Hero A / v3 首頁：一條細線，底下三欄——左邊身分（mono 小字）、中間補充句、右邊兩顆按鈕。
            手機疊成一欄。身分是純文字不是連結：第一屏只留兩顆按鈕。 */}
        <div className="intro motion-safe:animate-fade-up border-line-soft mt-10 grid gap-x-6 gap-y-5 border-t pt-7 [--fade-delay:1750ms] md:mt-12 md:grid-cols-12 md:items-start">
          <p className="text-faint flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs tracking-[0.1em] md:col-span-3 md:flex-col md:gap-y-1.5">
            <span className="text-txt">吳宸麒</span>
            <span>{SITE_CONFIG.handle}</span>
            <span>
              {SITE_CONFIG.location} · {SITE_CONFIG.timezone}
            </span>
          </p>
          <p className="text-dim text-lead max-w-[28em] leading-[1.7] md:col-span-5">
            寫網站、做資安、也做遊戲。最近第一次把自己的 Roblox 遊戲推上線。
          </p>
          <div className="flex flex-wrap gap-3 text-base md:col-span-4 md:justify-end">
            <Link href="/projects" className={BUTTON_PRIMARY}>
              探索我的作品
            </Link>
            <Link href="/about" className={BUTTON_SECONDARY}>
              認識我
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
