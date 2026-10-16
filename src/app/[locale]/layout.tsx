import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import Script from 'next/script'
import { JetBrains_Mono, Noto_Sans_TC, Caveat } from 'next/font/google'

// 霞鶩文楷 TC — handwriting/kai font for Chinese headings (TC subset only, lazy per unicode-range)
import '@fontsource/lxgw-wenkai-tc/chinese-traditional-400.css'
import '@fontsource/lxgw-wenkai-tc/chinese-traditional-700.css'
import '../globals.css'
import { Footer } from '@/components/layout/Footer'
import { Nav } from '@/components/layout/Nav'
import { SITE_CONFIG } from '@/constants'
import { HTML_LANG, LOCALES, hasLocale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { setLocale } from '@/i18n/server'
import { notFound } from 'next/navigation'

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

// 手寫體：Caveat 只有拉丁字母，中文由 globals.css 的 --font-hand 接霞鶩文楷
const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: 'variable',
})

// 主要字體：內文 400、標題 900。CJK 無法預載子集，交給瀏覽器照 unicode-range 懶載
const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-tc',
  weight: ['400', '500', '700', '900'],
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — Software Engineer, Security, Builder`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'alaner652',
    '全端工程師',
    'Full Stack Engineer',
    'Software Engineer',
    'Agora-AI',
    'Security Research',
    'Next.js',
    'TypeScript',
    'Taipei',
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: `${SITE_CONFIG.name} — Software Engineer, Security, Builder`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — Software Engineer, Security, Builder`,
    description: SITE_CONFIG.description,
    creator: `@${SITE_CONFIG.handle}`,
  },
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  setLocale(locale)
  const d = getDict(locale)
  return (
    // suppressHydrationWarning：底下那支開頁腳本會在 React 接手前給 <html> 加 data-intro，
    // dev 的 hydration 比對會把它當成伺服器多出來的屬性而報錯；只壓這一層，裡面的不受影響
    <html
      lang={HTML_LANG[locale]}
      className={`${jetbrainsMono.variable} ${notoSansTC.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col print:bg-white print:text-black">
        {/* 首頁開頁動畫一個分頁只演一次：看過就在 <html> 掛 data-intro="done"（見 home/IntroOnce.tsx）。
            用 next/script 的 beforeInteractive 放在 hydration 之前；原生 <script> 在語系切換時會被 React 當成
            client render 而警告。dev 下它可能排得比較後面，硬重整時偶爾會先閃一下動畫，production 不會。 */}
        <Script id="intro-once" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem('intro'))document.documentElement.dataset.intro='done'}catch(e){}`}
        </Script>
        {/* RevealWrapper 靠 IntersectionObserver 淡入；JS 失效時強制顯示，避免整頁空白 */}
        <noscript>
          <style>
            {'.reveal,.reveal .reveal-item{opacity:1!important;transform:none!important}'}
          </style>
        </noscript>
        <a
          href="#main"
          className="focus:bg-surface focus:text-text focus:border-border sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-chip focus:border focus:px-4 focus:py-2 print:hidden"
        >
          {d.nav.skip}
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
