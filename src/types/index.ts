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
  /** 作品詳情頁的網址：/projects/{slug}。跟 public/shots/works/ 底下的資料夾名一致 */
  slug: string
  status: string
  tone: WorkStatus
  category: ProjectCategory
  title: string
  description: string
  /** 一句結果：做完之後世界哪裡不一樣了。卡片和精選列把它放在描述前面，
      因為訪客先看結果再決定要不要讀細節。沒有可說的結果就不填，不要硬湊。 */
  result?: string
  /** 份量輕的項目可以不列技術標籤 */
  metrics?: string[]
  link?: string
  /** 次要連結（如 demo 影片）。帶了 demo 的卡片改在底部列出 GitHub / Demo 兩個連結，
      而不是整張可點——避免 <a> 巢狀。 */
  demo?: string
  /** public/ 底下的預覽圖路徑，由 `npm run shots` 產生。
      只放真的看得到產品的圖（網站截圖、影片畫面）；GitHub 自動產生的 repo 卡不算，
      那種圖每張都長一樣，沒圖的項目改用排版式封面（ProjectCover 自己處理）。 */
  preview?: string
  /** 實機影片：YouTube 網址（嵌入播放器），或 public/ 底下的 mp4。詳情頁「畫面」排第一個。
      影片不進 repo（會永久留在 git 歷史），優先放 YouTube。 */
  video?: string
  /** 更多畫面：網站其他分頁的截圖（public/shots/works/{slug}/more-N），詳情頁「畫面」排在封面後面。 */
  gallery?: string[]
  /** preview 是 GitHub 的 repo 卡，不是產品畫面。列表照放，但不拿來當 /projects 的主視覺。 */
  card?: boolean
  /** 首頁精選。挑三個能替 OFFERS 那三條主張作證的，順序照 WORK_ITEMS。 */
  featured?: boolean
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
  /** 這段的主軸：遊戲、接案、Web、社群、資安… */
  track: string
  title: string
  detail: string
  /** 正在進行的那一段，chip 換成「現在」 */
  current?: boolean
  /** 首頁那排大年份只挑幾個里程碑 */
  milestone?: boolean
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
  /** 三個字的動詞，首頁用超大字放：做出來／守得住／摸清楚 */
  verb: string
  label: string
  description: string
}

/** /hire「接什麼」的一項：一種案型 + 一句範圍 + 幾個站上做過的例子（對到 WORK_ITEMS 的 title）。 */
export interface HireService {
  label: string
  description: string
  /** 交付的是什麼，一句：「能跑的網址，不是一包程式碼」 */
  deliverable: string
  /** 做過的例子，頁面上列成小字：通常是 WORK_ITEMS 的 title，也可以是經歷（像電算中心的資安工作）。
      沒做過的案型就不要放 */
  examples?: string[]
}

/** /hire「怎麼合作」的一步。 */
/** /hire「客戶怎麼說」：Discord 上的評價，原文照登 */
export interface HireReview {
  name: string
  /** 截圖裡的原文，給替代文字和手機版 */
  text: string
  /** public/ 底下的原始截圖，寬高是原檔像素 */
  image: string
  width: number
  height: number
}

/** /hire「接案紀錄」：PayPal 收款，付款人打碼、不放金額 */
export interface HireReceipt {
  /** public/ 底下打碼過的原始截圖，寬高是原檔像素 */
  image: string
  width: number
  height: number
  /** 收據上的金額，照原圖（給替代文字） */
  amount: string
  /** 打碼後的付款人，像「J. C.」（只用在替代文字） */
  who: string
  month: number
  day: number
  /** 付款附言，照收據原文 */
  memo?: string
}

/** /hire「怎麼寫」的一步：做什麼 + 用什麼工具 */
export interface HireWorkflowStep {
  label: string
  text: string
  tools: string[]
}

export interface HireStep {
  label: string
  description: string
}

export interface SkillGroup {
  label: string
  items: string[]
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
  /** 估的閱讀分鐘數，從內文字數算，不是手填的 */
  readingMinutes: number
}

export interface SiteConfig {
  name: string
  handle: string
  url: string
  github: string
  email: string
  /** 建好帳號後填入，Footer、Hero 與 Person JSON-LD 的 sameAs 會自動帶上。 */
  linkedin?: string
  /** 社群帳號，Footer 跟 Person JSON-LD 的 sameAs 用。 */
  instagram?: string
  threads?: string
  /** Discord 好友邀請連結 */
  discord?: string
  /** public/ 底下的頭像路徑（例如 '/avatar.jpg'）。沒填的話 Hero 用 monogram 佔位。 */
  avatar?: string
  /** 首頁 Hero 滿版照，public/ 底下的路徑。沒填就不放圖 */
  heroPhoto?: string
  description: string
  location: string
  timezone: string
  copyright: string
}
