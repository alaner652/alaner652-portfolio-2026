import { getDict } from '@/i18n/dict'
import { ogImage, ogLocale } from '@/lib/og'

export const alt = 'small R (alaner652) — portfolio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** 首頁：照首頁 Hero 的字（嗨，我是 small R — / 不只寫程式，也打造自己的產品。），
    「產品」橘色；底下一排會的東西的 logo。版型跟內頁共用 lib/og。 */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await ogLocale(params)
  const d = getDict(locale).home
  return ogImage({
    locale,
    path: '/',
    kicker: d.hi,
    title: [d.line1, d.line2],
    accent: d.accent,
    subtitle: d.tagline,
    icons: [
      'Python',
      'TypeScript',
      'Luau',
      'Roblox Studio',
      'Rojo',
      'Next.js',
      'React',
      'FastAPI',
      'PostgreSQL',
      'Docker',
      'Linux',
      'Burp Suite',
    ],
  })
}
