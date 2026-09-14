import { Layers, ShieldHalf, Wrench } from 'lucide-react'

import type {
  Photo,
  SiteConfig,
  NavLink,
  WorkItem,
  ExperienceItem,
  EducationItem,
  JourneyEntry,
  Offer,
  SkillGroup,
} from '@/types'

export const SITE_CONFIG: SiteConfig = {
  name: 'alaner652',
  handle: 'alaner652',
  url: 'https://alaner652.com',
  github: 'https://github.com/alaner652',
  instagram: 'https://www.instagram.com/alaner652/',
  threads: 'https://www.threads.com/@alaner652',
  email: 'hhgg12661@gmail.com',
  avatar: '/avatar.jpg',
  description:
    '吳宸麒 (alaner652)，五專資工四年級的全端工程師。用攻擊者的視角把產品做到上線；在學校電算中心做授權範圍內的資安工作。',
  location: 'Taipei',
  timezone: 'GMT+8',
  copyright: '© 2026 吳宸麒，台北',
}

export const NAV_LINKS: NavLink[] = [
  { label: '關於', href: '/about' },
  { label: '做過的東西', href: '/projects' },
  { label: '心得分享', href: '/blog' },
  { label: '履歷', href: '/resume' },
]

/** /about「我是誰」那張卡的自介，首頁 Bento 也拿同一段。裡面的每個事實都來自下面的
    EXPERIENCE / EDUCATION / JOURNEY，這裡只是把它們串成話；改了那邊記得回來對一次。 */
export const ABOUT_WHO =
  '吳宸麒，網路上叫 alaner652 或 small R。台北城市科技大學資訊工程科五專部四年級。國中自己摸 Roblox Studio，2022 年開始有人付錢請我寫遊戲；後來自己做產品，前端後端部署一個人包。2026 年因為通報校務系統的漏洞被電算中心找進去，現在在授權範圍內做資安和內部自動化。'

/** /about「我想說的」那張卡：一段開場 + 幾句從專案和文章裡撿回來的話。
    lines 每一句後面的 from 是它出自哪裡，不要放沒有出處的金句。 */
export const ABOUT_WORDS = {
  lead: '喜歡的東西一直在換：一開始是遊戲，後來是網頁，現在是資安。家裡沒有人做資訊，也沒補習班，每一段都是自己查資料摸出來的。下面幾句是一路上真的學到的，不是想出來的。',
  lines: [
    { text: '只要查得到答案，就能做出來。', from: '國中第一次打開 Roblox Studio' },
    { text: '做出來不等於有人要。', from: 'Roblox 接案' },
    { text: '「跑得起來」和「撐得住」是兩件事。', from: 'Foodie AI 後端掛掉之後' },
    { text: '看得到問題，不代表有權限去動它。', from: '校電算中心' },
  ],
}

/** 首頁「我能做什麼」的三步，照交付流程排。每一步都對應下面 WORK_ITEMS / EXPERIENCE
    裡的實際東西，不要寫沒有東西撐的主張。履歷的 Summary 是同一組說法的英文版，改這裡也要一起改。 */
export const OFFERS: Offer[] = [
  {
    label: '端到端交付',
    tone: 'orange',
    icon: Layers,
    description: '前端、後端、部署維運一個人做完。一句一幀、早餐店點餐系統都是這樣做出來的。',
  },
  {
    label: '攻防視角',
    tone: 'green',
    icon: ShieldHalf,
    description: '用攻擊者的方式看自己做的東西。在校務系統找到 IDOR，負責任揭露後進電算中心修補。',
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
    featured: true,
    description:
      '發現一個能讀到其他學生資料的 IDOR，透過 HITCON ZeroDay 揭露後被電算中心找進去。在授權範圍內補掉幾個後門、修了幾個 XSS，也寫了幾支 Python 內部自動化工具減少單位的人工流程。',
    metrics: ['Burp Suite', 'Python', '授權範圍內'],
    link: 'https://zeroday.hitcon.org/vulnerability/ZD-2026-00351',
  },
  {
    status: '已暫停',
    tone: 'idle',
    category: 'AI',
    title: 'Agora-AI',
    description:
      '把沒有文件的校務 API 逆向出來，包成 10 個 agent 工具，學生可以直接問「我這週有什麼課」。部署在學校 VM 上。目前暫停，想重新想清楚範圍。',
    metrics: ['FastAPI', 'Next.js', 'Docker'],
    link: 'https://github.com/alaner652/Agora-AI',
    preview: '/shots/agora-ai.png',
  },
  {
    status: '運作中',
    tone: 'live',
    category: 'Web',
    title: '一句一幀',
    featured: true,
    description:
      '輸入台詞，找到那個畫面。把三個各做各的舊專案併成一套並搬到網頁上。截圖和 GIF 改成用 ffmpeg 即時生成加 LRU cache，圖片儲存從 4 GB 降到 0。',
    metrics: ['Next.js', 'EasyOCR', 'ffmpeg'],
    link: 'https://girls-band-shot.alaner652.com',
    preview: '/shots/girls-band-shot.png',
  },
  {
    status: '開源',
    tone: 'open',
    category: 'Web',
    title: '早餐店點餐系統',
    featured: true,
    description:
      '掃碼用 LINE 登入點餐，下單推 Flex Message 給店主。訂單用狀態機管、SSE 同步進度，並存菜單快照，之後改菜單不會動到歷史訂單。',
    metrics: ['Next.js', 'SQLite + Drizzle', 'LINE Bot'],
    link: 'https://github.com/alaner652/order',
    preview: '/shots/order.png',
  },
  {
    status: '已停用',
    tone: 'idle',
    category: '工具',
    title: 'Easy TPCU',
    description:
      '自動登入校務系統抓缺勤、畫成圖推到 Discord。分析校務系統的副產品，後來變成 Agora-AI 的起點。',
    link: 'https://github.com/alaner652/tpcu-absence-notifier',
    preview: '/shots/easy-tpcu.png',
  },
  {
    status: '已停用',
    tone: 'idle',
    category: '工具',
    title: 'Ave Mujica Bot',
    description:
      'OCR 逐幀把字幕轉成 JSON 索引，串 Discord Bot 查截圖。第一個真的有人在用的東西，現在由一句一幀接手。',
    link: 'https://www.youtube.com/watch?v=2rXTrJ6X4a8',
    preview: '/shots/ave-mujica-bot.jpg',
  },
  {
    status: '已下線',
    tone: 'idle',
    category: 'AI',
    title: 'Foodie AI',
    description:
      '語意餐廳推薦。想法我現在還是覺得可以，但架構撐不住，後端早就掛了。第一次搞懂「跑得起來」和「撐得住」是兩件事。',
    link: 'https://github.com/alaner652/FoodieAI',
    demo: 'https://www.youtube.com/watch?v=780-adKzw94',
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
  {
    status: '接案作品',
    tone: 'idle',
    category: '遊戲',
    title: 'Cooking Game',
    description:
      '接案期間在 Roblox 上開發的料理主題遊戲，用 Luau 實作遊戲系統與互動邏輯。影片是當時的展示。',
    metrics: ['Luau', 'Roblox'],
    link: 'https://youtu.be/gYcwkoDgL_g',
    preview: '/shots/cooking-game.jpg',
  },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: '2026 — 現在',
    role: '資安與自動化',
    org: '校電算中心',
    description:
      '通報漏洞之後被找進去的，沒有正式職稱，學校以記功、獎狀與獎學金支持。資安在授權範圍內動手，也寫內部自動化工具減少單位的人工流程。在這裡才體會到：看得到問題，不代表有權限去動它。',
  },
  {
    period: '2022 — 2024',
    role: '接案開發者',
    org: 'Roblox · 遠端',
    description:
      '本質是自由接案，2022 年開始有人付錢請我寫。後來和幾個各地的開發者固定合作做遊戲，全英文溝通，我負責技能系統、打擊感和 FPS 框架。國中自己摸 Roblox Studio 起家。',
  },
]

/** /about「經歷」：照時間講，舊的在上。年份是用「2023 進五專、現在專四」往回推的學年度，
    寫學年開始那一年。這裡講的是「那時候在幹嘛」，職稱和學歷的正式版在 EXPERIENCE / EDUCATION。 */
export const JOURNEY: JourneyEntry[] = [
  {
    period: '2019',
    stage: '小六',
    track: '遊戲',
    tone: 'orange',
    title: '第一次打開 Roblox',
    detail: '先是玩。後來發現遊戲是可以自己做的，也是從這裡開始查英文教學、看 YouTube。',
  },
  {
    period: '2020',
    stage: '國一',
    track: '轉學',
    tone: 'gold',
    title: '體育班，然後轉學',
    detail:
      '上學期在體育班，下學期轉到桃園市立觀音高中國中部。那陣子很迷 Roblox，大部分時間都泡在裡面。',
  },
  {
    period: '2021',
    stage: '國二',
    track: '遊戲',
    tone: 'orange',
    title: '開始做遊戲、寫程式',
    detail:
      '從 Roblox Studio 和 Lua 開始，從改地圖到搞懂函數、事件、物件，第一次自己把遊戲做出來。',
  },
  {
    period: '2022 — 2023',
    stage: '國三 → 專一',
    track: '接案',
    tone: 'orange',
    title: '開始有人付錢請我寫',
    detail:
      '2022 年接到第一個付費案子。後來和幾個各地的開發者固定合作做遊戲，全英文溝通，負責技能系統、打擊感和 FPS 框架。',
  },
  {
    period: '2023',
    stage: '專一',
    track: 'Web',
    tone: 'blue',
    title: '撕榜進五專，開始碰網頁',
    detail:
      '透過撕榜進台北城市科技大學資訊工程科五專部。下學期開始接觸前端、網頁這些遊戲以外的領域。',
  },
  {
    period: '2024',
    stage: '專二',
    track: '社群',
    tone: 'green',
    title: '走出去看別人怎麼做',
    detail: '開始參加不同領域的社群。暑假以開發者身分去 Flutter Meetup，現場最年輕的是我。',
  },
  {
    period: '2025',
    stage: '專三',
    track: '資安',
    tone: 'plum',
    title: '沉澱，然後打出第一個洞',
    detail:
      '少跑外面，一個人專研更多東西，資安是這一年長出來的。在校務系統找到第一個漏洞，透過 HITCON ZeroDay 通報，之後被電算中心找進去。也開始投實習。',
  },
  {
    period: '2026 —',
    stage: '專四',
    track: '現在',
    tone: 'green',
    title: '還沒開始的一年',
    detail:
      '電算中心的工作還在做。專四的目標是特殊選才，專心一點讀書；遊戲、打工、創業、自學繼續並行。',
    current: true,
  },
]

export const EDUCATION: EducationItem[] = [
  {
    period: '2023 — 2028（預計）',
    school: '台北城市科技大學',
    program: '資訊工程科 五專部',
    note: '目前四年級。同時在準備 116 特殊選才。',
  },
]

/** /about 底下「工作之外」的追焦照。檔案在 public/riding/，原檔在 docs/追焦照/。
    寬高要填真的，next/image 才不會在載入時跳版。 */
export const RIDING_PHOTOS: Photo[] = [
  { src: '/riding/01.jpg', width: 1086, height: 724, alt: '山路彎道上的追焦照，背景是綠色山坡' },
  { src: '/riding/02.jpg', width: 1086, height: 724, alt: '沿著護欄壓彎的追焦照' },
  { src: '/riding/03.jpg', width: 1086, height: 724, alt: '高架橋下經過三角錐的追焦照' },
  { src: '/riding/04.jpg', width: 725, height: 1086, alt: '彎道標誌前的直式追焦照' },
  { src: '/riding/05.jpg', width: 1086, height: 724, alt: '正面迎來的追焦照' },
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
