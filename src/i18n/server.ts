import { cache } from 'react'

import { DEFAULT_LOCALE, hasLocale, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'

/** 一次請求共用的語系。React 的 cache() 在 server render 裡是以請求為範圍的，
    layout 設一次，底下的 server component 都讀得到，不用一層層傳 props。 */
const store = cache(() => ({ locale: DEFAULT_LOCALE as Locale }))

export function setLocale(locale: Locale) {
  store().locale = locale
}

export function getLocale(): Locale {
  return store().locale
}

/** 目前語系的字典 */
export function t() {
  return getDict(getLocale())
}

/** page / layout 開頭呼叫：讀 params、驗證、寫進 store，回傳語系 */
export async function initLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params
  const l: Locale = hasLocale(locale) ? locale : DEFAULT_LOCALE
  setLocale(l)
  return l
}
