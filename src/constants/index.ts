import type {
  SiteConfig,
  NavLink,
  StatusRow,
  Stat,
  WorkItem,
  ExperienceItem,
  MindoyoTag,
  WritingTopic,
  NowItem,
} from '@/types'

export const SITE_CONFIG: SiteConfig = {
  name: 'alaner652',
  handle: 'alaner652',
  url: 'https://alaner652.com',
  github: 'https://github.com/alaner652',
  description: 'alaner652 — 全端工程師與資工系學生。我做能減少日常摩擦的工具。Currently building Agora-AI.',
  location: 'Taipei · GMT+8',
  timezone: 'GMT+8',
  copyright: '© 2026 alaner652 · Software Engineer, Student, Builder · Taipei, Taiwan',
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: '#work', hideSm: true },
  { label: 'Writing', href: '#writing', hideSm: true },
  { label: 'Now', href: '#now', hideSm: true },
]

export const STATUS_ROWS: StatusRow[] = [
  { glyph: '◉', key: 'Building', value: 'Agora-AI', subValue: 'campus AI assistant' },
  { glyph: '◐', key: 'Researching', value: 'App & infrastructure security' },
  { glyph: '▣', key: 'Working', value: 'TPCU Computer Center', subValue: 'since the disclosure' },
  { glyph: '↳', key: 'Latest case', value: 'Reverse-engineering the school API' },
  { glyph: '✎', key: 'Latest writing', value: 'Designing systems that disappear' },
]

export const HERO_STATS: Stat[] = [
  { value: 'Since 2019', label: 'Building / shipping' },
  { value: '10 tools · 69 tests', label: 'Agora-AI agent' },
  { value: 'Responsible', label: 'Security disclosures' },
  { value: 'B.Eng · Y3', label: '5-year program · TPCU' },
]

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'W·01',
    status: 'Deploying',
    title: 'Agora-AI — Campus Assistant',
    description:
      '一個 LLM 驅動的學生行政助理。學校的 API 沒有任何文件，所以我把它<b>逆向出來</b>，再包成一套 agent 工具讓學生用自然語言查詢校務。FastAPI · Next.js · SQLite · Docker。',
    metrics: ['10 agent tools', '69 passing tests', 'session + persistence', 'Cloudflare Tunnel 上線中'],
  },
  {
    id: 'W·02',
    status: 'Ongoing · authorized',
    title: 'Application & Infrastructure Security',
    description:
      '從負責任揭露開始的一條線。發現並修補多項真實漏洞（XSS、IDOR、clickjacking、憑證外洩等），並向校方提出 <b>WAF / reverse-proxy 強化方案</b>——目前在授權範圍內持續評估與修補。',
    metrics: ['responsible disclosure', 'authorized assessments', 'WAF / reverse-proxy 提案'],
  },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: '2025 — now',
    role: 'Founder & Builder',
    org: 'Mindoyo',
    description:
      '我自己的專案都放在這裡:Agora-AI、校園點餐、資安工作。負責產品規劃、系統設計、開發與技術決策——從問題定義一路做到上線。',
  },
  {
    period: 'present',
    role: 'Security & Tooling',
    org: 'TPCU Computer Center',
    description:
      '起點是負責任揭露學校系統的安全問題——之後被請進來修補它。現在負責授權範圍內的資安評估、漏洞修補與內部工具開發。',
  },
  {
    period: 'earlier',
    role: 'Lead Scripter',
    org: 'Game Studio',
    description:
      '負責遊戲系統開發、腳本架構與技術實作。也學到最重要的一課:做出來不等於有人要——市場驗證比技術更早該做。',
  },
]

export const MINDOYO_TAGS: MindoyoTag[] = [
  { label: 'Agora-AI · 校園 AI 助理' },
  { label: 'App & infra security' },
  { label: 'Campus ordering system' },
  { label: 'Self-hosting & infrastructure' },
]

export const WRITING_TOPICS: WritingTopic[] = [
  { label: 'System Design', href: '#' },
  { label: 'Security & Responsible Disclosure', href: '#' },
  { label: 'Linux & Self-hosting', href: '#' },
  { label: 'AI Engineering', href: '#' },
  { label: 'Product Development', href: '#' },
  { label: 'Startup Journey', href: '#' },
]

export const NOW_LIST: NowItem[] = [
  { text: '把 Agora-AI 推上學校 VM 正式上線' },
  { text: '開發校園點餐系統，準備找第一批店家試用' },
  { text: '持續做授權範圍內的資安評估與修補' },
  { text: '準備 116 特殊選才——交大百川' },
  { text: '學系統設計與分散式系統；side experiment: 用 LLM 排訓練菜單' },
]
