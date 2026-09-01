import type { LucideIcon } from 'lucide-react'

/** 分類色盤的五個色相。對應 globals.css 的 --color-{tone}-ink / -tint。 */
export type Tone = 'orange' | 'gold' | 'green' | 'blue' | 'plum'

/** 專案目前的狀態，決定狀態點的顏色。 */
export type WorkStatus = 'live' | 'open' | 'idle'

/** 專案分類。同時是清單上方那排篩選 chip 的選項，順序就是顯示順序。 */
export const PROJECT_CATEGORIES = ['資安', 'Web', 'AI', '工具'] as const
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export interface NavLink {
  label: string
  href: string
}

export interface WorkItem {
  status: string
  tone: WorkStatus
  category: ProjectCategory
  title: string
  description: string
  /** 以前做的那幾個沒有技術標籤——份量本來就比較輕，不硬補 */
  metrics?: string[]
  link?: string
  /** public/ 底下的預覽圖路徑，由 `npm run shots` 產生。沒有連結的項目就沒有圖。 */
  preview?: string
}

export interface ExperienceItem {
  period: string
  role: string
  org: string
  description: string
}

export interface EducationItem {
  period: string
  school: string
  program: string
  note?: string
}

/** 「關於」的「我可以提供什麼」：一個圖示 + 一個能力主張 + 一句證據。 */
export interface Offer {
  label: string
  description: string
  tone: Tone
  icon: LucideIcon
}

export interface SkillGroup {
  label: string
  items: string[]
  tone: Tone
}

export interface BlogPostFrontmatter {
  title: string
  date: string
  description: string
  tags?: string[]
  wide?: boolean
  hidden?: boolean
}

export interface BlogPost {
  slug: string
  frontmatter: BlogPostFrontmatter
}

export interface SiteConfig {
  name: string
  handle: string
  url: string
  github: string
  email: string
  /** 建好帳號後填入，Footer、Hero 與 Person JSON-LD 的 sameAs 會自動帶上。 */
  linkedin?: string
  description: string
  location: string
  timezone: string
  copyright: string
}
