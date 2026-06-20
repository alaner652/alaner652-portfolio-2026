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
  copyright:
    '© 2026 吳宸麒 (alaner652) · Full-Stack Engineer · Security Researcher · Taipei, Taiwan',
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: '/#work', hideSm: true },
  { label: 'Writing', href: '/#writing', hideSm: true },
  { label: 'Now', href: '/#now', hideSm: true },
  { label: 'Resume', href: '/resume', hideSm: true },
]

export const STATUS_ROWS: StatusRow[] = [
  { glyph: '◉', key: 'Building', value: 'Agora-AI', subValue: 'campus AI assistant · deploying' },
  {
    glyph: '▣',
    key: 'Working',
    value: 'TPCU Computer Center',
    subValue: 'authorized security & tooling',
  },
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
      '學生不用再開 portal——<b>逆向工程無文件的校務 API</b>，包成 10-tool agent 鏈，自然語言查課表、成績、出缺勤、請假 CRUD 全包。SSE streaming · BYOK LLM · Loki / Grafana。',
    metrics: ['10 agent tools', '69 tests', 'BYOK LLM', 'Docker + Caddy'],
    link: 'https://github.com/alaner652/Agora-AI',
  },
  {
    id: 'W·02',
    status: 'Ongoing · authorized',
    title: 'Application & Infrastructure Security',
    description:
      '向 <b>HITCON ZeroDay</b> 通報多項高風險漏洞（IDOR、XSS、clickjacking、憑證外洩）——隨後獲聘入電算中心主導修補，並提出 WAF / reverse-proxy 強化方案由校方採用。',
    metrics: ['HITCON ZeroDay', 'authorized assessments', 'WAF 提案落地', 'Python 內部工具'],
  },
  {
    id: 'W·03',
    status: 'Shipped · open source',
    title: 'Easy TPCU — 校務系統查詢自動化',
    description:
      '把「每天手動查出缺勤」這件事全自動化——統計圖表 Discord 推送，零手動操作。Agora-AI 逆向工程的早期概念驗證。',
    metrics: ['Python', 'Burp Suite', 'Matplotlib', 'Discord Webhook'],
    link: 'https://github.com/alaner652/tpcu-absence-notifier',
  },
  {
    id: 'W·04',
    status: 'Built · not deployed',
    title: '雞狗查圖 — 字幕截圖搜尋',
    description:
      '輸入台詞，找到那個畫面。<b>Ave Mujica Bot 的完整重寫</b>——從三個獨立專案（Python + Node.js + Discord.js）收斂成一個乾淨架構：Next.js 網頁 + Python OCR extractor。截圖與 GIF 由 ffmpeg 即時生成，砍掉 4 GB 預存圖片。支援多系列（Ave Mujica、MyGO!!!!!）。',
    metrics: ['Next.js', 'Python EasyOCR', 'ffmpeg on-demand', 'LRU cache', '多系列支援'],
    link: 'https://github.com/alaner652/GirlsBandShot',
  },
  {
    id: 'W·05',
    status: 'Archived',
    title: 'Ave Mujica Bot — 影像檢索自動化',
    description:
      '輸入台詞關鍵字，秒出對應動畫截圖。OCR 逐幀建字幕索引，Discord Bot 查詢——讓粉絲找截圖從翻影片變成一秒的事。',
    metrics: ['PaddleOCR', 'Discord.py', 'Python', 'JSON pipeline'],
    link: 'https://www.youtube.com/watch?v=2rXTrJ6X4a8',
  },
  {
    id: 'W·06',
    status: 'Offline · archived',
    title: 'Foodie AI — 語意餐廳推薦',
    description:
      '願景對，架構太簡單——後端現在壞了。第一次真正搞清楚「技術能跑起來」跟「產品能撐住」之間的落差。',
    metrics: ['Gemini API', 'Google Places API', 'Next.js 15'],
    link: 'https://github.com/alaner652/FoodieAI',
  },
  {
    id: 'W·07',
    status: 'Shipped · v1.0.0',
    title: 'osu! Map Manager — 譜面管理工具',
    description:
      '解決自己的需求，順手發佈。掃描本機譜面、批次下載、斷點續傳，PyInstaller 打包成 Windows 獨立執行檔，不需要裝 Python。',
    metrics: ['Python', 'PyInstaller', 'CSV export', '斷點續傳'],
    link: 'https://github.com/alaner652/osu_map_manager',
  },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: '2026 — now',
    role: 'Independent Builder',
    org: 'Personal Projects',
    description: '獨立開發與維護個人專案，負責從問題定義到部署上線的完整產品週期。',
  },
  {
    period: '2026 — now',
    role: 'Work-Study · Pro Bono Security',
    org: 'TPCU Computer Center',
    description:
      '正式身分為工讀生。透過 HITCON ZeroDay 負責任揭露高風險漏洞（IDOR、XSS、憑證外洩）後，獲電算中心信任，在授權範圍內無償執行資安評估與修補，清除校務系統殘存的 XSS 與後門程式；並提出 WAF / reverse-proxy 強化方案由校方採用，將外部攻擊面縮減約 70%。',
  },
  {
    period: '2022 — 2024',
    role: 'Lead Scripter',
    org: 'Game Studio (Roblox)',
    description: '主導遊戲系統開發與國際協作。從交付中理解市場驗證先於技術實現。',
  },
]

export const NOW_LIST: NowItem[] = [
  { text: '持續深化資安能力——授權評估、攻防實務與系統安全研究' },
  { text: '備戰 116 特殊選才——目標：交大百川、交大資工' },
  { text: '尋找第一份 R&D 相關工作，將工程能力轉化為有商業價值的產品' },
]
