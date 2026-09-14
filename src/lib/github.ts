import { SITE_CONFIG } from '@/constants'

export interface ContributionDay {
  date: string
  /** GitHub 自己分的 0–4 深淺 */
  level: 0 | 1 | 2 | 3 | 4
  count: number
}

export interface Contributions {
  days: ContributionDay[]
  total: number
}

/** 抓 GitHub 個人頁那張貢獻圖。走公開的 HTML 片段，不用 token；一天重抓一次。
    GitHub 改版面就會抓不到，抓不到回 null，Bento 那格自己降級，不要讓首頁掛掉。 */
export async function getContributions(): Promise<Contributions | null> {
  const handle = SITE_CONFIG.github.split('/').pop()
  if (!handle) return null

  try {
    const res = await fetch(`https://github.com/users/${handle}/contributions`, {
      next: { revalidate: 86400 },
      headers: { 'user-agent': 'alaner652.com' },
    })
    if (!res.ok) return null
    const html = await res.text()

    // 每天一個 <td data-date data-level id>，次數在另一個 <tool-tip for={id}> 裡
    const counts = new Map<string, number>()
    for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
      const n = /^(\d[\d,]*) contribution/.exec(m[2])
      counts.set(m[1], n ? Number(n[1].replaceAll(',', '')) : 0)
    }
    const days: ContributionDay[] = []
    for (const m of html.matchAll(/<td\b[^>]*ContributionCalendar-day[^>]*>/g)) {
      const attr = (name: string) => new RegExp(`${name}="([^"]*)"`).exec(m[0])?.[1]
      const date = attr('data-date')
      const id = attr('id')
      if (!date || !id) continue
      const level = Math.min(4, Number(attr('data-level') ?? 0)) as ContributionDay['level']
      days.push({ date, level, count: counts.get(id) ?? 0 })
    }
    if (days.length < 300) return null
    days.sort((a, b) => a.date.localeCompare(b.date))
    return { days, total: days.reduce((sum, d) => sum + d.count, 0) }
  } catch {
    return null
  }
}
