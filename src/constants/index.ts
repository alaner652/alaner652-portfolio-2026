import type {
  SiteConfig,
  NavLink,
  WorkItem,
  PastItem,
  ExperienceItem,
  EducationItem,
  SkillGroup,
} from '@/types'

export const SITE_CONFIG: SiteConfig = {
  name: 'alaner652',
  handle: 'alaner652',
  url: 'https://alaner652.com',
  github: 'https://github.com/alaner652',
  email: 'hhgg12661@gmail.com',
  description:
    '吳宸麒 (alaner652)，五專資工四年級。在學校電算中心做授權範圍內的資安工作，其餘時間寫自己想用的東西。',
  location: 'Taipei',
  timezone: 'GMT+8',
  copyright: '© 2026 吳宸麒，台北',
}

export const NAV_LINKS: NavLink[] = [
  { label: '做過的東西', href: '/#work' },
  { label: '心得分享', href: '/#writing' },
  { label: '履歷', href: '/resume' },
]

export const WORK_ITEMS: WorkItem[] = [
  {
    status: '進行中',
    title: '校務系統的安全工作',
    description:
      '在校務系統裡發現了幾個真實的問題，其中一個 IDOR 可以讀到其他學生的資料，透過 HITCON ZeroDay 做負責任揭露。之後電算中心找我進去，在授權範圍內做評估和修補：補掉一個後門，用自己的思路修了一些 XSS，也寫了幾支 Python 內部工具讓維運流程順一點。另外提過 WAF 和 reverse-proxy 的強化方案，後來因為行政因素外包給廠商執行，廠商做的方向跟我提的接近。規模都不大，但都是我實際動手修掉的。',
    metrics: ['Burp Suite', 'Python', '授權範圍內'],
  },
  {
    status: '已暫停',
    title: 'Agora-AI',
    description:
      '校務系統的 API 沒有任何公開文件，但我逆向的時候已經摸熟了。把它包成 10 個 agent 工具、69 個通過的測試，讓學生可以直接問「我這週有什麼課」、「上個月缺了幾節」，不用自己開 portal 一頁一頁翻。FastAPI 寫後端、SQLite 存資料、Gemini 做語意推理，Next.js 做前端，Docker 容器化後透過 Cloudflare Tunnel 部署到學校 VM。目前暫停，我想重新想清楚範圍再繼續。',
    metrics: ['FastAPI', 'Next.js', 'Docker'],
    link: 'https://github.com/alaner652/Agora-AI',
  },
  {
    status: '運作中',
    title: '一句一幀',
    description:
      '輸入台詞，找到那個畫面。下面 Ave Mujica Bot 的重寫版，把原本各做各的三個專案併成一套，順便從 Discord 搬到網頁上，可以跨 Ave Mujica、MyGO!!!!!、YUME∞MITA 搜尋。截圖和 GIF 改成用 ffmpeg 從原片即時生成，加上 LRU cache，圖片儲存從 4 GB 降到 0——如果照原本的做法把 GIF 也預先產好，會膨脹到 156 GB。',
    metrics: ['Next.js', 'EasyOCR', 'ffmpeg'],
    link: 'https://girls-band-shot.alaner652.com',
  },
  {
    status: '開源',
    title: '早餐店點餐系統',
    description:
      '顧客掃碼用 LINE 登入點餐，下單後推 Flex Message 給店主。訂單流程用狀態機管（PENDING → READY），SSE 同步進度。Drizzle ORM 管 9 張表，訂單存快照欄位，之後改菜單才不會動到已經成立的歷史訂單。',
    metrics: ['Next.js', 'SQLite + Drizzle', 'LINE Bot'],
    link: 'https://github.com/alaner652/order',
  },
]

/** 停掉、被取代、或本來就只是小工具的東西。放著是因為它們也算數。 */
export const PAST_ITEMS: PastItem[] = [
  {
    title: 'Easy TPCU',
    note: '自動登入校務系統抓出缺勤、畫成圖推到 Discord。分析校務系統時的副產品，後來變成 Agora-AI 的起點。',
    link: 'https://github.com/alaner652/tpcu-absence-notifier',
  },
  {
    title: 'Ave Mujica Bot',
    note: 'OCR 逐幀把字幕轉成 JSON 索引，串 Discord Bot 查截圖。我第一個從「我想做」走到「真的有人在用」的東西，現在由一句一幀接手。',
    link: 'https://www.youtube.com/watch?v=2rXTrJ6X4a8',
  },
  {
    title: 'Foodie AI',
    note: '語意餐廳推薦。想法我現在還是覺得可以，但架構撐不住，後端早就掛了也沒修。第一次搞懂「跑得起來」和「撐得住」是兩件事。',
    link: 'https://github.com/alaner652/FoodieAI',
  },
  {
    title: 'osu! Map Manager',
    note: '純粹自己要用才寫的譜面管理工具，打包成 exe，朋友不用裝 Python 也能跑。',
    link: 'https://github.com/alaner652/osu_map_manager',
  },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: '2026 — 現在',
    role: '工讀生',
    org: '學校電算中心',
    description:
      '通報漏洞之後進來的。身分上就是工讀生，單位的各種雜事我也會去幫忙；組長願意讓我試一些比較實驗性的東西，資安方面就在授權範圍內用自己會的去做。在這裡才真的體會到：你看得到問題，不代表你有權限去動它。',
  },
  {
    period: '2022 — 2024',
    role: 'Lead Scripter',
    org: '國際遊戲工作室（Roblox）',
    description:
      '全英文環境，跟世界各地的開發者一起寫技能系統、打擊感機制和 FPS 框架。國中就開始自己摸 Roblox Studio，2022 年開始有人付錢請我寫。',
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
  { label: '語言', items: ['Python', 'TypeScript', 'Lua / Luau', 'SQL'] },
  {
    label: '後端與資料',
    items: ['FastAPI', 'Next.js API Routes', 'Drizzle ORM', 'SQLite'],
  },
  {
    label: '前端',
    items: ['Next.js', 'React', 'Tailwind CSS'],
  },
  {
    label: '基礎設施',
    items: ['Docker', 'Linux', 'OpenWrt', 'Cloudflare Tunnel', 'Proxmox', 'Tailscale'],
  },
  {
    label: '資安',
    items: ['Burp Suite', 'IDOR / XSS / CSRF', '負責任揭露', 'WAF / reverse proxy'],
  },
]
