/** 分類色盤的五個色相。對應 globals.css 的 --color-{tone}-ink / -tint。 */
export type Tone = 'orange' | 'gold' | 'green' | 'blue' | 'plum'

/** 專案目前的狀態，決定右上角那顆點的顏色。 */
export type WorkStatus = 'live' | 'open' | 'idle'

export interface NavLink {
  label: string
  href: string
}

export interface WorkItem {
  status: string
  tone: WorkStatus
  title: string
  description: string
  metrics: string[]
  link?: string
}

export interface PastItem {
  title: string
  note: string
  link?: string
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

/** Hero 的「我可以提供什麼」：一個能力主張配一句證據。 */
export interface Offer {
  label: string
  description: string
  tone: Tone
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
