import type { LucideIcon } from 'lucide-react'

/** 分類色盤的五個色相。對應 globals.css 的 --color-{tone}-ink / -tint。 */
export type Tone = 'orange' | 'gold' | 'green' | 'blue' | 'plum'

/** 專案目前的狀態，決定狀態點的顏色。 */
export type WorkStatus = 'live' | 'open' | 'idle'

/** 專案分類。同時是清單上方那排篩選 chip 的選項，順序就是顯示順序。 */
export const PROJECT_CATEGORIES = ['資安', 'Web', 'AI', '工具', '遊戲'] as const
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
  /** 份量輕的項目可以不列技術標籤 */
  metrics?: string[]
  link?: string
  /** 次要連結（如 demo 影片）。帶了 demo 的卡片改在底部列出 GitHub / Demo 兩個連結，
      而不是整張可點——避免 <a> 巢狀。 */
  demo?: string
  /** public/ 底下的預覽圖路徑，由 `npm run shots` 產生。沒有連結的項目就沒有圖。 */
  preview?: string
  /** 首頁精選。挑三個能替 OFFERS 那三條主張作證的，順序照 WORK_ITEMS。 */
  featured?: boolean
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

/** /about「經歷」的一段：不是履歷的職稱列表，是照時間講「那時候在幹嘛」。
    正式的工作與學歷仍以 EXPERIENCE / EDUCATION（和 /resume）為準，這裡不要跟它們打架。 */
export interface JourneyEntry {
  /** 年份或區間，像「2019」「2022 — 2023」。首位年份用來排序與縮圖 */
  period: string
  /** 當時的年級：小六、國一、專三… */
  stage: string
  /** 這段的主軸，同時是 chip 的文字：遊戲、接案、Web、社群、資安… */
  track: string
  tone: Tone
  title: string
  detail: string
  /** 正在進行的那一段，chip 換成「現在」並用綠點 */
  current?: boolean
}

/** 相片：src 指向 public/，width/height 是原檔像素。 */
export interface Photo {
  src: string
  width: number
  height: number
  alt: string
}

/** 首頁「我能做什麼」的一步：一個圖示 + 一個能力主張 + 一句說明。
    三步照交付流程排（做出來 → 守得住 → 摸清楚），順序就是顯示順序。 */
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
  /** public/ 底下的頭像路徑（例如 '/avatar.jpg'）。沒填的話 Hero 用 monogram 佔位。 */
  avatar?: string
  description: string
  location: string
  timezone: string
  copyright: string
}
