import type {
  SiteConfig,
  NavLink,
  StatusRow,
  Stat,
  WorkItem,
  ExperienceItem,
  NowItem,
} from '@/types'

export const SITE_CONFIG: SiteConfig = {
  name: 'alaner652',
  handle: 'alaner652',
  url: 'https://alaner652.com',
  github: 'https://github.com/alaner652',
  description:
    '吳宸麒 (alaner652) — 全端工程師、資安研究者、臺北城市科技大學資工系學生。從負責任揭露校務系統漏洞開始，現在在電算中心做授權資安工作，同時獨立開發 Agora-AI。',
  location: 'Taipei · GMT+8',
  timezone: 'GMT+8',
  copyright: '© 2026 吳宸麒 (alaner652) · Full-Stack Engineer · Security Researcher · Taipei, Taiwan',
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: '/#work', hideSm: true },
  { label: 'Writing', href: '/#writing', hideSm: true },
  { label: 'Now', href: '/#now', hideSm: true },
  { label: 'Resume', href: '/resume', hideSm: true },
]

export const STATUS_ROWS: StatusRow[] = [
  { glyph: '◉', key: 'Building', value: 'Agora-AI', subValue: 'campus AI assistant · deploying' },
  { glyph: '▣', key: 'Working', value: 'TPCU Computer Center', subValue: 'authorized security & tooling' },
  { glyph: '◐', key: 'Assessing', value: 'App & infra security', subValue: 'authorized · ongoing' },
  { glyph: '↳', key: 'Latest case', value: 'Reverse-engineering the school API' },
  { glyph: '✎', key: 'Latest writing', value: '從 Roblox 到電算中心', subValue: 'my story' },
]

export const HERO_STATS: Stat[] = [
  { value: 'Since 2019', label: 'Building / shipping' },
  { value: '10 tools · 69 tests', label: 'Agora-AI agent' },
  { value: 'HITCON ZeroDay', label: 'responsible disclosures · ×2' },
  { value: 'B.Eng · Y3', label: '5-year program · TPCU' },
]

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'W·01',
    status: 'Deploying',
    title: 'Agora-AI — Campus Assistant',
    description:
      '學校 API 無任何文件，<b>逆向工程</b>後包成 agent 工具鏈，讓學生用自然語言查詢課表、成績、出缺勤，並支援請假申請的完整 CRUD。SSE streaming 回應、BYOK 自訂 LLM、可選 Loki / Grafana 可觀測性堆疊。FastAPI · Next.js · Docker Compose · Caddy。',
    metrics: ['105 commits', 'SSE streaming', 'BYOK LLM', 'Docker + Caddy'],
    link: 'https://github.com/alaner652/Agora-AI',
  },
  {
    id: 'W·02',
    status: 'Ongoing · authorized',
    title: 'Application & Infrastructure Security',
    description:
      '從負責任揭露開始的一條線——向 <b>HITCON ZeroDay</b> 通報後，校方聘請主導修補。發現並修補 XSS、IDOR、clickjacking、憑證外洩等真實漏洞，並提出 WAF / reverse-proxy 強化方案。',
    metrics: ['responsible disclosure', 'authorized assessments', 'WAF / reverse-proxy 提案', 'Python 內部工具'],
  },
  {
    id: 'W·03',
    status: 'Shipped · open source',
    title: 'Easy TPCU — 校務系統查詢自動化',
    description:
      '以 Burp Suite 分析校務系統 HTTP 流程，逆向出登入與缺曠查詢 API 後，用 Python 自動化整個流程——將出缺勤紀錄轉為視覺化圖表並推送至 Discord Webhook。Agora-AI 逆向工程的早期概念驗證。',
    metrics: ['Python', 'BeautifulSoup', 'Matplotlib', 'Discord Webhook'],
    link: 'https://github.com/alaner652/tpcu-absence-notifier',
  },
  {
    id: 'W·04',
    status: 'Archived',
    title: 'Ave Mujica Bot — 影像檢索自動化',
    description:
      '為動畫粉絲設計的影像檢索工具。以 OCR 從影片自動擷取字幕與時間碼，建立 JSON 索引庫，使用者輸入台詞關鍵字即可秒級取得對應截圖。首個獨立規劃與部署的全端管線。',
    metrics: ['PaddleOCR', 'Discord.py', 'Python', 'JSON pipeline'],
    link: 'https://www.youtube.com/watch?v=2rXTrJ6X4a8',
  },
  {
    id: 'W·05',
    status: 'Offline · archived',
    title: 'Foodie AI — 語意餐廳推薦',
    description:
      '願景是對的，但技術實作當時過於單純——沒有錯誤處理、架構不穩定，後端現在已壞掉。它的價值在於讓我第一次摸清 LLM + 外部 API 整合的真實複雜度，以及「技術能跑起來」跟「產品能撐住」之間的落差。',
    metrics: ['Gemini API', 'Google Places API', 'Next.js 15'],
    link: 'https://github.com/alaner652/FoodieAI',
  },
  {
    id: 'W·06',
    status: 'Shipped · v1.0.0',
    title: 'osu! Map Manager — 譜面管理工具',
    description:
      '掃描本機已安裝的 osu! 譜面並匯出 CSV，支援批次下載與斷點續傳。以 PyInstaller 打包為 Windows 獨立執行檔，無需安裝 Python 環境即可使用。',
    metrics: ['Python', 'PyInstaller', 'CSV export', '斷點續傳'],
    link: 'https://github.com/alaner652/osu_map_manager',
  },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: '2026 — now',
    role: 'Independent Builder',
    org: 'Personal Projects',
    description:
      '獨立開發與維護個人專案，負責從問題定義到部署上線的完整產品週期。',
  },
  {
    period: '2026 — now',
    role: 'Security & Tooling',
    org: 'TPCU Computer Center',
    description:
      '負責任揭露高風險漏洞後獲聘，在授權範圍內執行安全評估、修補與內部工具開發。',
  },
  {
    period: '2022 — 2024',
    role: 'Lead Scripter',
    org: 'Game Studio (Roblox)',
    description:
      '主導遊戲系統開發與國際協作。從交付中理解市場驗證先於技術實現。',
  },
]



export const NOW_LIST: NowItem[] = [
  { text: '持續深化資安能力——授權評估、攻防實務與系統安全研究' },
  { text: '備戰 116 特殊選才——目標：交大百川、交大資工' },
  { text: '尋找第一份 R&D 相關工作，將工程能力轉化為有商業價值的產品' },
]
