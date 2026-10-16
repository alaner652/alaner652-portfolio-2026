/** 語系設定：zh 是預設、網址不帶前綴；en 走 /en/...。 */
export const LOCALES = ['zh', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'zh'

export function hasLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x)
}

/** <html lang> 用的值 */
export const HTML_LANG: Record<Locale, string> = { zh: 'zh-Hant', en: 'en' }

/** 站內路徑加上語系前綴：zh 原樣，en 加 /en */
export function localePath(locale: Locale, path: string) {
  if (locale === DEFAULT_LOCALE) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

/** 從網址 pathname 讀語系，並回傳去掉前綴的路徑 */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  for (const l of LOCALES) {
    if (l === DEFAULT_LOCALE) continue
    if (pathname === `/${l}`) return { locale: l, path: '/' }
    if (pathname.startsWith(`/${l}/`)) return { locale: l, path: pathname.slice(l.length + 1) }
  }
  return { locale: DEFAULT_LOCALE, path: pathname }
}
