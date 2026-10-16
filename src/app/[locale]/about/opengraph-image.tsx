import { SITE_CONFIG } from '@/constants'
import { getDict } from '@/i18n/dict'
import { ogImage, ogLocale } from '@/lib/og'

export const alt = 'small R — About'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** /about：頭像 + 「我是 small R。」+ 語言 logo */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await ogLocale(params)
  const d = getDict(locale).about
  return ogImage({
    locale,
    path: '/about',
    kicker: `01 · ${d.title}`,
    title: d.h1,
    subtitle: d.description,
    image: SITE_CONFIG.avatar ? { src: SITE_CONFIG.avatar, shape: 'square' } : undefined,
    icons: ['Python', 'TypeScript', 'Luau', 'Roblox Studio', 'Next.js', 'Docker', 'Burp Suite'],
  })
}
