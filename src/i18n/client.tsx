'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

import { localePath, splitLocale, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'

/** client component 用：從網址讀語系 */
export function useLocale(): Locale {
  return splitLocale(usePathname()).locale
}

export function useDict() {
  return getDict(useLocale())
}

/** 站內連結：照目前語系自動加前綴。外部網址和 mailto 原樣。 */
export function LLink({ href, ...rest }: ComponentProps<typeof NextLink> & { href: string }) {
  const locale = useLocale()
  const internal = href.startsWith('/')
  return <NextLink href={internal ? localePath(locale, href) : href} {...rest} />
}
