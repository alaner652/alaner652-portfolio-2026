import { Layers, ShieldHalf, Wrench } from 'lucide-react'

import type {
  SiteConfig,
  NavLink,
  WorkItem,
  ExperienceItem,
  EducationItem,
  Offer,
  SkillGroup,
} from '@/types'

export const SITE_CONFIG: SiteConfig = {
  name: 'alaner652',
  handle: 'alaner652',
  url: 'https://alaner652.com',
  github: 'https://github.com/alaner652',
  email: 'hhgg12661@gmail.com',
  description: '吳宸麒 (alaner652)，五專資工四年級的全端工程師。用攻擊者的視角把產品做到上線；在學校電算中心做授權範圍內的資安工作。',
  location: 'Taipei',
  timezone: 'GMT+8',
  copyright: '© 2026 吳宸麒，台北',
}

export const NAV_LINKS: NavLink[] = [
  { label: '關於', href: '/#about' },
  { label: '做過的東西', href: '/#work' },
  { label: '心得分享', href: '/#writing' },
  { label: '履歷', href: '/resume' },
]

/** 每一條都對應下面 WORK_ITEMS / EXPERIENCE 裡的實際證據，不要寫沒有東西撐的主張。
    履歷的 Summary 是同一組說法的英文版，改這裡也要一起改。 */
export const OFFERS: Offer[] = [
  {
    label: '端到端交付',
    tone: 'orange',
    icon: Layers,
    description: '前端、後端、部署維運一個人做完。一句一幀、早餐店點餐系統都是這樣一個人做完的。',
  },
  {
    label: '攻防視角',
    tone: 'green',
    icon: ShieldHalf,
    description: '在校務系統找到能讀別人資料的 IDOR，透過 HITCON ZeroDay 揭露後進電算中心修補。',
  },
  {
    label: '逆向與自動化',
    tone: 'blue',
    icon: Wrench,
    description: '把沒有文件的系統摸清楚，變成能用的 API 和工具。Agora-AI 就是這樣來的。',
  },
]

/** 所有專案一份清單，停掉的也留著，用狀態標示。
    category 對應清單上方的篩選 chip；preview 由 `npm run shots` 產生。 */
export const WORK_ITEMS: WorkItem[] = [
  {
    status: '進行中',
    tone: 'live',
    category: '資安',
    title: '校務系統的安全工作',
    description: '發現一個能讀到其他學生資料的 IDOR，透過 HITCON ZeroDay 揭露後被電算中心找進去。在授權範圍內補掉幾個後門、修了幾個 XSS，也寫了幾支 Python 內部自動化工具減少單位的人工流程。',
    metrics: ['Burp Suite', 'Python', '授權範圍內'],
  },
  {
    status: '已暫停',
    tone: 'idle',
    category: 'AI',
    title: 'Agora-AI',
    description: '把沒有文件的校務 API 逆向出來，包成 10 個 agent 工具，學生可以直接問「我這週有什麼課」。部署在學校 VM 上。目前暫停，想重新想清楚範圍。',
    metrics: ['FastAPI', 'Next.js', 'Docker'],
    link: 'https://github.com/alaner652/Agora-AI',
    preview: '/shots/agora-ai.png',
  },
  {
    status: '運作中',
    tone: 'live',
    category: 'Web',
    title: '一句一幀',
    description: '輸入台詞，找到那個畫面。把三個各做各的舊專案併成一套並搬到網頁上。截圖和 GIF 改成用 ffmpeg 即時生成加 LRU cache，圖片儲存從 4 GB 降到 0。',
    metrics: ['Next.js', 'EasyOCR', 'ffmpeg'],
    link: 'https://girls-band-shot.alaner652.com',
    preview: '/shots/girls-band-shot.png',
  },
  {
    status: '開源',
    tone: 'open',
    category: 'Web',
    title: '早餐店點餐系統',
    description: '掃碼用 LINE 登入點餐，下單推 Flex Message 給店主。訂單用狀態機管、SSE 同步進度，並存菜單快照，之後改菜單不會動到歷史訂單。',
    metrics: ['Next.js', 'SQLite + Drizzle', 'LINE Bot'],
    link: 'https://github.com/alaner652/order',
    preview: '/shots/order.png',
  },
  {
    status: '已停用',
    tone: 'idle',
    category: '工具',
    title: 'Easy TPCU',
    description: '自動登入校務系統抓缺勤、畫成圖推到 Discord。分析校務系統的副產品，後來變成 Agora-AI 的起點。',
    link: 'https://github.com/alaner652/tpcu-absence-notifier',
    preview: '/shots/easy-tpcu.png',
  },
  {
    status: '已停用',
    tone: 'idle',
    category: '工具',
    title: 'Ave Mujica Bot',
    description: 'OCR 逐幀把字幕轉成 JSON 索引，串 Discord Bot 查截圖。第一個真的有人在用的東西，現在由一句一幀接手。',
    link: 'https://www.youtube.com/watch?v=2rXTrJ6X4a8',
    preview: '/shots/ave-mujica-bot.jpg',
  },
  {
    status: '已下線',
    tone: 'idle',
    category: 'AI',
    title: 'Foodie AI',
    description: '語意餐廳推薦。想法我現在還是覺得可以，但架構撐不住，後端早就掛了。第一次搞懂「跑得起來」和「撐得住」是兩件事。',
    link: 'https://github.com/alaner652/FoodieAI',
    preview: '/shots/foodie-ai.png',
  },
  {
    status: '開源',
    tone: 'open',
    category: '工具',
    title: 'osu! Map Manager',
    description: '純粹自己要用才寫的譜面管理工具，打包成 exe，朋友不用裝 Python 也能跑。',
    link: 'https://github.com/alaner652/osu_map_manager',
    preview: '/shots/osu-map-manager.png',
  },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: '2026 — 現在',
    role: '資安與自動化',
    org: '校電算中心',
    description: '通報漏洞之後被找進去的，沒有正式職稱，學校以記功、獎狀與獎學金支持。資安在授權範圍內動手，也寫內部自動化工具減少單位的人工流程。在這裡才體會到：看得到問題，不代表有權限去動它。',
  },
  {
    period: '2022 — 2024',
    role: '接案開發者',
    org: 'Roblox · 遠端',
    description: '本質是自由接案，2022 年開始有人付錢請我寫。後來和幾個各地的開發者固定合作做遊戲，全英文溝通，我負責技能系統、打擊感和 FPS 框架。國中自己摸 Roblox Studio 起家。',
  },
]

export const EDUCATION: EducationItem[] = [
  {
    period: '2022 — 2027（預計）',
    school: '台北城市科技大學',
    program: '資訊工程科 五專部',
    note: '目前四年級。同時在準備 116 特殊選才。',
  },
]

export const SKILLS: SkillGroup[] = [
  { label: '語言', tone: 'orange', items: ['Python', 'TypeScript', 'Lua / Luau', 'SQL'] },
  {
    label: '後端與資料',
    tone: 'green',
    items: ['FastAPI', 'Next.js API Routes', 'Drizzle ORM', 'SQLite'],
  },
  {
    label: '前端',
    tone: 'blue',
    items: ['Next.js', 'React', 'Tailwind CSS'],
  },
  {
    label: '基礎設施',
    tone: 'gold',
    items: ['Docker', 'Linux', 'OpenWrt', 'Cloudflare Tunnel', 'Proxmox', 'Tailscale'],
  },
  {
    label: '資安',
    tone: 'plum',
    items: ['Burp Suite', 'IDOR / XSS / CSRF', '負責任揭露', 'WAF / reverse proxy'],
  },
]
