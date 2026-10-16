import { NextResponse, type NextRequest } from 'next/server'

import { DEFAULT_LOCALE, LOCALES } from '@/i18n/config'

/** 語系路由：
    - /en/...        → 原樣交給 app/[locale]
    - /zh/...        → 轉址到不帶前綴的網址（zh 只有一種寫法，避免重複網址）
    - 其他 /...      → 內部改寫成 /zh/...（網址列不變）
    不照 Accept-Language 自動跳轉：英文是使用者自己切的，不要替人決定。 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || '/'
    return NextResponse.redirect(url, 308)
  }

  const hasPrefix = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasPrefix) return

  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // 跳過 _next、API、根目錄的 metadata 圖（opengraph-image / icon）與所有帶副檔名的靜態檔
  matcher: ['/((?!_next|api|opengraph-image|twitter-image|icon|apple-icon|.*\\..*).*)'],
}
