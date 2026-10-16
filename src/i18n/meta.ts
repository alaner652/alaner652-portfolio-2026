import type { Metadata } from 'next'

import { SITE_CONFIG } from '@/constants'
import { DEFAULT_LOCALE, hasLocale, localePath, type Locale } from '@/i18n/config'
import { getDict, type Dict } from '@/i18n/dict'

type PageKey = Exclude<keyof Dict, 'nav' | 'footer' | 'home' | 'site'>

const OG_LOCALE: Record<Locale, string> = { zh: 'zh_TW', en: 'en_US' }

/** 每個語系都列出另一個語系的網址，搜尋引擎才知道兩頁是同一頁的翻譯 */
export function languages(path: string) {
  return { 'zh-Hant': localePath('zh', path), en: localePath('en', path) }
}

/** 內頁共用的 metadata：標題和描述讀字典，canonical 帶語系前綴，hreflang 兩個語系都列。 */
export function pageMeta(
  localeRaw: string,
  key: PageKey,
  path: string,
  type: 'website' | 'profile' = 'website'
): Metadata {
  const locale: Locale = hasLocale(localeRaw) ? localeRaw : DEFAULT_LOCALE
  const d = getDict(locale)[key]
  const url = localePath(locale, path)
  const title = `${d.title} | ${SITE_CONFIG.name}`
  // 內頁自己定義了 openGraph，就不會繼承 app/[locale]/opengraph-image，這裡明確指回去
  const image = localePath(locale, '/opengraph-image')
  return {
    title: d.title,
    description: d.description,
    alternates: { canonical: url, languages: languages(path) },
    openGraph: {
      title,
      description: d.description,
      url,
      type,
      locale: OG_LOCALE[locale],
      siteName: SITE_CONFIG.name,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: d.description,
      creator: `@${SITE_CONFIG.handle}`,
      images: [image],
    },
  }
}
