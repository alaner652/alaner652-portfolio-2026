import type {
  HireReceipt,
  HireReview,
  Photo,
  SiteConfig,
  NavLink,
  WorkItem,
  EducationItem,
  JourneyEntry,
  Offer,
  HireService,
  HireStep,
  SkillGroup,
} from '@/types'

export const SITE_CONFIG: SiteConfig = {
  name: 'alaner652',
  handle: 'alaner652',
  url: 'https://alaner652.com',
  github: 'https://github.com/alaner652',
  instagram: 'https://www.instagram.com/alaner652/',
  threads: 'https://www.threads.com/@alaner652',
  discord: 'https://discord.gg/HXn95dRd',
  email: 'hhgg12661@gmail.com',
  // 2026-10-17 暫時換成解析度較高的玩偶近照（原本的 /avatar.jpg 只有 400px，先留著）
  avatar: '/avatar-plush.jpg',
  // 首頁 Hero 的滿版人物照（橫式、人在右 1/3）。放進 public/ 再填路徑；沒填就是純暗底
  heroPhoto: undefined,
  description:
    'small R（alaner652），台北的全端工程師，專注資安。用攻擊者的視角把產品做到上線；在大學電算中心做授權範圍內的資安與內部自動化。',
  location: 'Taipei',
  timezone: 'GMT+8',
  copyright: '© 2026 small R · 台北',
}

export const NAV_LINKS: NavLink[] = [
  { label: '關於', href: '/about' },
  { label: '做過的東西', href: '/projects' },
  { label: '心得分享', href: '/blog' },
  { label: '履歷', href: '/resume' },
  { label: '接案', href: '/hire' },
]

/** /about「我是誰」那張卡的自介，首頁 Bento 也拿同一段。裡面的每個事實都來自下面的
    JOURNEY / EDUCATION，這裡只是把它們串成話；改了那邊記得回來對一次。 */
export const ABOUT_WHO =
  'small R，網路上叫 alaner652。國中自己摸 Roblox Studio，2022 年開始接 Roblox 案子，先是收 Robux，2024 年起收現金；後來自己做產品，前端後端部署一個人包。2026 年因為通報校務系統的漏洞被電算中心找進去，現在在授權範圍內做資安和內部自動化。'

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

/** 首頁「我能做什麼」的三步，照交付流程排。每一步都對應下面 WORK_ITEMS / JOURNEY
    裡的實際東西，不要寫沒有東西撐的主張。履歷的 Summary 是同一組說法的英文版，改這裡也要一起改。 */
export const OFFERS: Offer[] = [
  {
    verb: '做出來',
    label: '端到端交付',
    description: '前端、後端、部署維運一個人做完。一句一幀、早餐店點餐系統都是這樣做出來的。',
  },
  {
    verb: '守得住',
    label: '攻防視角',
    description:
      '用攻擊者的方式看自己做的東西。在一套校務系統找到 IDOR，負責任揭露後受邀進電算中心修補。',
  },
  {
    verb: '摸清楚',
    label: '逆向與自動化',
    description: '把沒有文件的系統摸清楚，變成能用的 API 和工具。Agora-AI 就是這樣來的。',
  },
]

/** /hire 的內容。這頁的讀者是要付錢的人，不是審查委員：只講接什麼、怎麼合作、做過哪些，
    不講學歷。examples 對到 WORK_ITEMS 的 title，改專案名記得回來對一次。 */
export const HIRE = {
  lead: 'Roblox 腳本師，專長是戰鬥系統：連段、技能、打擊感、FPS 框架，也能接整個遊戲。2022 年開始接案、2024 年起正式收費，現在是 CubexStudios 的共同創辦人兼首席腳本師。',
  /** 客戶在 Discord 留的評價。桌機放原始截圖（public/proof/reviews/，原檔在 docs/roblox-evidence/raw/），
      text 是截圖裡的原文（錯字也不改），給替代文字和手機版用。 */
  reviews: [
    {
      name: 'King Croc',
      image: '/proof/reviews/king-croc.png',
      width: 944,
      height: 126,
      text: '10/10, great services with smooth scripting. Exceeds heavily with combat based requests, has a nice personality and is easy to communicate to. I highly recommend.',
    },
    {
      name: 'Handly',
      image: '/proof/reviews/handly.png',
      width: 1020,
      height: 107,
      text: 'Small R, thank you for that combat system 🙏 It works very well, your prices are the best that I found on the market. I will contact you in the future for more scripts',
    },
    {
      name: 'DiaszVFX',
      image: '/proof/reviews/diaszvfx.png',
      width: 706,
      height: 154,
      text: '11/10 Small R is deffinitely who anyone should go to when script related stuff is needed, the combat looks sick and makes the game enjoyable and it was delivered in a shorter time in comparison to past developers i worked with, overall, great scripter!',
    },
    {
      name: 'killer91',
      image: '/proof/reviews/killer91.png',
      width: 762,
      height: 161,
      text: '100/10, Small R is the best scripter I know and even then he is constantly improving and learning more things. The combat and skills he makes look really cool, and just from seeing what he has made I can imagine how clean the code is. I can tell he puts a lot of effort into his work and into learning new skills',
    },
    {
      name: 'pi派萌',
      image: '/proof/reviews/pi-pai-meng.png',
      width: 1033,
      height: 85,
      text: 'SmallR是我在進行多次合作中，最愉快的一次，他寫的腳本非常順暢，並完美的完成我的所有需求，因此我十分推薦他跟您做合作',
    },
  ] satisfies HireReview[],
  /** PayPal 收款紀錄，只列個人客戶。用原始截圖（真實性），頭像模糊、姓名用遮罩條蓋掉；金額照原圖顯示
      （public/proof/receipts/，原檔在 docs/roblox-evidence/raw/；2026-10-18 他選「原始截圖 + 一點美化」）。
      CubexStudios 的三筆不列在這裡，寫成工作室經歷（他是共同創辦人，算客戶付款會灌水）。
      備註照收據原文，被 PayPal 截斷的那則保留刪節號。 */
  receipts: [
    {
      image: '/proof/receipts/paypal-1.jpg',
      amount: '+$95.30 USD',
      width: 1170,
      height: 347,
      who: 'H. P.',
      month: 1,
      day: 20,
    },
    {
      image: '/proof/receipts/paypal-2.jpg',
      amount: '+$15.00 USD',
      width: 1170,
      height: 339,
      who: 'J. C.',
      month: 4,
      day: 6,
      memo: 'Good work 👍 Taiwan #1',
    },
    {
      image: '/proof/receipts/paypal-3.jpg',
      amount: '+NT$2,014',
      width: 1170,
      height: 359,
      who: 'J. C.',
      month: 5,
      day: 7,
      memo: 'Love you brother keep up the great wo…',
    },
    {
      image: '/proof/receipts/paypal-4.jpg',
      amount: '+$35.00 USD',
      width: 1170,
      height: 327,
      who: 'J. C.',
      month: 5,
      day: 29,
      memo: 'Keep up the great work',
    },
    // 用 Robux 付的委託：客戶在 Discord 貼出買下我開的 Game Pass（2024-02，dunny）。
    // 頭像模糊、名字遮掉，跟 PayPal 收據同一種處理（2026-10-19 他說要處理）
    {
      image: '/proof/receipts/robux-1.jpg',
      width: 1276,
      height: 688,
      amount: 'R$25,000',
      who: 'dunny',
      month: 2,
      day: 11,
    },
    {
      image: '/proof/receipts/robux-2.jpg',
      width: 1296,
      height: 706,
      amount: 'R$3,000',
      who: 'dunny',
      month: 2,
      day: 20,
    },
  ] satisfies HireReceipt[],
  studio:
    '2024 年開始替 CubexStudios 寫腳本，委託過劍類戰鬥系統（Sword System）。後來成為共同創辦人兼首席腳本師，2026 年起一起做工作室自己的遊戲。',
  services: [
    {
      label: '戰鬥系統',
      description:
        '連段、技能、格擋與閃避、處決、打擊感（鏡頭震動、受擊硬直、特效時機），也做過 FPS 框架。傷害和判定放在伺服器算，客戶端只送「我出招了」，exploit 改不了結果。客戶的評價裡最常被提到的就是這一塊。',
      deliverable: '接得進你專案的戰鬥模組',
      examples: ['soullike'],
    },
    {
      label: '遊戲系統',
      description:
        '養成、背包、抽卡與合成、Boss、排行榜、每日任務、存檔。存檔用 ProfileStore 鎖 session，每個 remote 都先做頻率限制、型別、所有權和餘額檢查才寫入。',
      deliverable: '可以直接接上的系統模組',
      examples: ['Cooking Game'],
    },
    {
      label: '整個遊戲',
      description:
        '從企劃、系統、UI 到上線後看數據調整。Build The Cat Gunner 就是一個人（AI 輔助）從開工做到上架。也可以只接你缺的那一塊。',
      deliverable: '能上架的遊戲',
      examples: ['Build The Cat Gunner'],
    },
  ] satisfies HireService[],
  /** 「接什麼」標題底下的一句：原本「怎麼寫」那一段（2026-11-10 拿掉）縮成這一行，字照原文。 */
  servicesNote:
    '在編輯器寫 strict Luau，Lune 跑自動化測試，Rojo 同步進 Studio；可調的數值都放在 config。',
  steps: [
    {
      label: '聊需求',
      description:
        'Discord 傳訊息說你要做什麼系統、什麼類型的遊戲、大概什麼時候要。有參考影片最好，不用寫規格書。',
    },
    {
      label: '報價',
      description:
        '按案報價，PayPal 收款。範圍和交付物先講清楚，之後加東西另外算，不會做到一半改價。',
    },
    {
      label: '開發',
      description:
        '先做一個能動的版本錄給你看，再往上加。有進度就更新，不會消失兩個禮拜然後交一包東西。',
    },
    {
      label: '交付',
      description:
        '程式碼歸你：可以是 Rojo 專案，也可以直接放進你的 place。數值放在 config，會說明怎麼調。交付後約定期限內的問題我處理。',
    },
  ] satisfies HireStep[],
  /** 先講清楚省大家時間。 */
  notes: [
    {
      q: '可以用英文溝通嗎？',
      a: '可以。合作過的開發者大多在國外，一直都是全英文溝通。',
    },
    {
      q: '多久能做完？',
      a: '看範圍。報價時會一起給時程，做不到的不會先答應。',
    },
    {
      q: '做完之後東西是誰的？',
      a: '你的。我只留作品集展示的權利，而且會先問過你；要保密的案子就不放。',
    },
    {
      q: 'Roblox 以外的也接嗎？',
      a: '接。網頁產品、LINE Bot、自動化、系統整合、授權範圍內的資安檢測都做過，案例在作品集。',
    },
  ],
  /** /hire「作品」要列的專案，照 WORK_ITEMS 的 title。 */
  cases: ['soullike', 'Build The Cat Gunner', 'Cooking Game'],
}

/** 所有專案一份清單，照「影響力（外部認可、真實使用者、付費）× 技術深度」排，停掉的也留著。
    前三個標 featured 上首頁。排名標準與上次的數據見 memory 的 portfolio-ranking（2026-11-10 起）。
    電算中心的資安工作不在這裡：那是經歷，不是作品，寫在 JOURNEY 和 OFFERS。
    category 對應清單上方的篩選 chip；preview 由 `npm run shots` 產生：有產品畫面的放畫面，
    沒有的放 GitHub 的 repo 卡（2026-10-15 決定：沒圖的列空著更糟）。
    result 是一句結果，全部取自 description 裡已經寫的事，不另外加數字。 */
export const WORK_ITEMS: WorkItem[] = [
  {
    // 2026 臺北城市通微服務大黑客松佳作（2026-11-08），五人團隊「全員被電組」。repo 在隊友帳號下，
    // 只寫他自己 commit 裡做的事：MVP 在 ~/small-R/side-projects/codefest_MCP（Ynoob87 20 個 commit，先 MCP 接 Claude、後改直接函式呼叫），
    // 正式 repo 是 Ynoob87 的 12 個 commit（tools/townpass、工具接進 agent、聊天框版面）；
    // 停車場和公廁改接官方資料、open_official_service、填表、語音都是隊友做的，不要寫進來。
    // 例外：共用服務工具庫（tools/townpass/src/registry）是他提的想法、justin 實作，只能寫「我提出、隊友實作」。
    // 參賽證明（certificate）只露他自己的名字、四位隊友模糊（2026-11-10 他要的）；合照有隊友的臉（more-1）
    status: '黑客松佳作',
    tone: 'open',
    category: 'AI',
    slug: 'taipei-codefest',
    featured: true,
    title: '城市通安心助手',
    result:
      '城市通服務太多，一般人都難下手，身障者和長者更難；所以不只做 agent，也讓整個服務用得了。2026 臺北城市通微服務大黑客松佳作。',
    description:
      '城市通裡的無障礙助理：說一句話或點一下，就能找到無障礙廁所、身障車位，或帶著已知的資料前往台北通服務，確認後才前往、不代為送出。agent 之外也補上無障礙：螢幕閱讀器讀得到、字級可放大、震動與語音回饋。模型在手機本機執行，對話不送雲端。第一次參加，五人團隊；我負責提案發想、agent 設計和工具串接，從 MVP 做起，把台北通服務和開放資料包成 16 支唯讀工具。',
    highlights: [
      'MVP 是我先寫的：把台北通服務包成唯讀 MCP 工具、接上 Claude，先把構想跑起來；驗證可行後改成直接函式呼叫，才能在瀏覽器和手機上跑。',
      '跟業師討論後調整串接方式，降低後續維護門檻：服務和開放資料一律包成唯讀工具，逾時、快取、格式驗證交給同一層讀取處理。',
      '模型碰不到網址和定位：網址只來自程式內的清單，座標只在瀏覽器裡算距離。',
      '只做唯讀：查詢直接顯示，其他動作先讓使用者確認；會送件、付款或顯示個資的頁面只給連結。',
      '提出共用服務工具庫的方向：由主機上的模型把頁面或 API 文件逐步解析成工具，新服務不用一個個手動串。團隊照這個方向重構，由隊友實作。',
    ],
    lessons: [
      '團隊合作本身是要學的能力。以前多半一個人做到底，這次很多時間花在對齊和整合。',
      'AI 讓開發變快，也放大理解落差：沒有底層經驗，很難分辨方案是對的還是只是「能跑」。',
      '做出來離能上線還很遠：只支援 Android、部分服務還是示範資料，架構也還有點拼湊。',
    ],
    metrics: ['TypeScript', 'Vue', 'MCP', 'Vitest'],
    link: 'https://github.com/Twcat0503/2026_taipei_codefest',
    preview: '/shots/works/taipei-codefest/cover-2.jpg',
    gallery: [
      '/shots/works/taipei-codefest/more-1.jpg',
      '/shots/works/taipei-codefest/certificate.jpg',
    ],
  },
  {
    // 替學校做的電腦教室借用系統（2026-11 上線）。repo 是私人的、正式站在校內，所以沒有公開連結。
    // 不寫學校名稱、網址、教室代碼、人數，也不寫學校系統的資料表或弱點；截圖全是 DATA_MODE=demo 的示範資料。
    // 完整案例在 src/content/projects/labslot.mdx（英文版 labslot.en.mdx）
    status: '校內上線',
    tone: 'live',
    category: 'Web',
    slug: 'labslot',
    title: 'LabSlot',
    result: '替學校做的電腦教室借用系統，部署在校內伺服器；學校原本的系統一行都沒改。',
    description:
      '教職員用學校帳號登入，看每間電腦教室一週的課表和已借出的節次，按節申請、管理員審核。課表與身分從學校資料庫唯讀讀取，申請與紀錄存在自己的 SQLite；前後端打包成一個 jar，用 Docker 部署在學校的 Ubuntu 伺服器。每個選擇都先問一句：沒有人盯著的時候，它撐得住嗎？',
    metrics: ['Java', 'Spring Boot', 'React', 'TypeScript', 'SQLite', 'Docker'],
    link: 'https://labslot.tpcu.edu.tw/',
    preview: '/shots/works/labslot/cover.jpg',
    coverTone: 'light',
    gallery: ['/shots/works/labslot/more-1.jpg', '/shots/works/labslot/more-2.jpg'],
  },
  {
    // 替學校招生考試做的線上考試系統（repo tpcu-testa，私人），目標 2026 年底上線；還沒在校內演練，所以不寫「上線」。
    // 數字全部取自 repo 的 docs/status.md（300 人負載、斷網、重啟、備份還原）。截圖是 dev profile 的示範資料（假名字）。
    // 不寫學校名稱、網址、考試人數。完整案例在 src/content/projects/testa.mdx（英文版 testa.en.mdx）
    status: '準備上線',
    tone: 'open',
    category: 'Web',
    slug: 'testa',
    title: 'Testa',
    result: '替學校招生考試做的線上考試系統：功能完成，在正式環境的映像檔上驗過 300 人同時作答與斷網考完一整場。',
    description:
      '教師出題、承辦人排考試並印登入單，考生在電腦教室用准考證號和登入碼作答；選擇與填空自動批改，申論題由一到多位老師匿名評分。計時、交卷、批改都只在伺服器做，送給考生的試卷不含答案。整套跑在校內一台 VM 上，不需要網際網路。接下來是到電腦教室實際演練。',
    metrics: ['Java', 'Spring Boot', 'Vue', 'PostgreSQL', 'Docker'],
    preview: '/shots/works/testa/cover.jpg',
    coverTone: 'light',
    gallery: [1, 2, 3].map((n) => `/shots/works/testa/more-${n}.jpg`),
  },
  {
    status: '運作中',
    tone: 'live',
    category: '遊戲',
    slug: 'build-the-cat-gunner',
    featured: true,
    title: 'Build The Cat Gunner',
    result: '接案之後第一款自己發行的 Roblox 遊戲。',
    description:
      "帶著貓咪小隊一路打：擲骰合成槍枝從 D 升到 XX，每 10 關一隻 Boss，打到底就重生再來。接案之後第一款以 Alaner's Studio 名義自己發行的遊戲，2026 年 10 月上線。",
    metrics: ['Luau', 'Roblox Studio'],
    link: 'https://www.roblox.com/games/104411764341408',
    preview: '/shots/works/build-the-cat-gunner/cover.png',
  },
  {
    status: '開源',
    tone: 'open',
    category: 'AI',
    slug: 'tpcu-mcp',
    featured: true,
    title: 'TPCU MCP',
    result: 'Agora-AI 的範圍重新想過一次：不做後端，做成 MCP server。',
    description:
      '把校務系統的課表、缺曠、成績、請假、工讀考勤包成 18 個 MCP 工具，Claude Code、Claude Desktop 這類支援 MCP 的 AI 應用可以直接在對話裡查和操作。stdio transport、零額外後端；帳密只在記憶體，不落地。有副作用的工具帶 destructiveHint，要先向使用者確認。頁面流程和解析規則延用 Agora-AI，用 TypeScript 重寫成獨立專案。',
    metrics: ['TypeScript', 'MCP', 'Vitest'],
    link: 'https://github.com/alaner652/tpcu-mcp',
    preview: '/shots/works/tpcu-mcp/cover.jpg',
  },
  {
    status: '運作中',
    tone: 'live',
    category: 'Web',
    slug: 'girls-band-shot',
    title: '一句一幀',
    result: '三個各做各的舊專案，併成一套搬到網頁上。',
    description:
      '輸入台詞，找到那個畫面。把三個各做各的舊專案併成一套並搬到網頁上，截圖和 GIF 改成用 ffmpeg 即時生成加 LRU cache。',
    metrics: ['Next.js', 'EasyOCR', 'ffmpeg'],
    link: 'https://girls-band-shot.alaner652.com',
    preview: '/shots/works/girls-band-shot/cover.jpg',
    gallery: ['/shots/works/girls-band-shot/more-1.jpg'],
  },
  {
    status: '開源',
    tone: 'open',
    category: 'Web',
    slug: 'order',
    title: '早餐店點餐系統',
    result: '訂單用狀態機管理、SSE 即時同步進度。',
    description:
      '掃碼用 LINE 登入點餐，下單推 Flex Message 給店主。訂單用狀態機管、SSE 同步進度，並存菜單快照，之後改菜單不會動到歷史訂單。',
    metrics: ['Next.js', 'SQLite', 'Drizzle ORM', 'LINE Messaging API'],
    link: 'https://github.com/alaner652/order',
    preview: '/shots/works/order/cover.png',
    card: true,
  },
  {
    status: '可遊玩的原型',
    tone: 'live',
    category: '遊戲',
    slug: 'soullike',
    title: 'soullike',
    result: '一場打得完的魂系頭目戰：連段、格擋、處決，還有會讀你動作的敵人。',
    description:
      'Roblox 上的魂系動作遊戲，目標是盡可能重現魂系的戰鬥手感，花了很多時間研究每一代的特色和數值。五段連段、重擊、格擋、翻滾無敵幀、背刺與處決；敵人有架勢條，打穿會破防。攻擊判定的時機從動畫的 keyframe marker 推出來，不手寫。敵人靠視野、聽覺、視線三件事發現你，還會延遲揮擊打亂節奏。玩家和敵人共用一套資料驅動的狀態機，傷害、無敵與超甲窗口全部由伺服器計算。離完美重現還有一大段路：有些動作甚至還沒有對應的動畫可以做。一人開發、AI 輔助。',
    metrics: ['Luau', 'Roblox Studio', 'Rojo'],
    link: 'https://www.roblox.com/games/87345305308537/soullike',
    preview: '/shots/works/soullike/cover.jpg',
    // 實機影片：等上傳到 YouTube 後填網址（video: 'https://youtu.be/…'）。裁好的檔在 docs/soullike-demo-cropped.mp4
    gallery: [1, 2, 3, 4].map((n) => `/shots/works/soullike/more-${n}.jpg`),
  },
  {
    slug: 'alaner652-portfolio',
    status: '運作中',
    tone: 'live',
    category: 'Web',
    title: 'alaner652.com',
    result: '你正在看的這個網站：設計稿先畫完，再照稿一頁一頁做出來。',
    description:
      '這個網站本身。Next.js App Router、Tailwind CSS v4，文章用 MDX 寫；設計稿先在畫布上定案（暗色、少卡片、每頁一個版面主軸），再照稿實作。作品、經歷、技能全部只有一份資料，首頁、關於、履歷都從同一處讀。',
    metrics: ['Next.js', 'Tailwind CSS', 'MDX'],
    link: 'https://github.com/alaner652/alaner652-portfolio-2026',
    demo: 'https://alaner652.com',
    preview: '/shots/works/alaner652-portfolio/cover.jpg',
    gallery: [1, 2, 3, 4, 5].map((n) => `/shots/works/alaner652-portfolio/more-${n}.jpg`),
  },
  {
    status: '已暫停',
    tone: 'idle',
    category: 'AI',
    slug: 'agora-ai',
    title: 'Agora-AI',
    result: '沒有文件的校務 API，逆向成 10 個 agent 工具。',
    description:
      '把沒有文件的校務 API 逆向出來，包成 10 個 agent 工具，使用者可以直接問「我這週有什麼課」。部署在校方提供的 VM 上。目前暫停，想重新想清楚範圍。',
    metrics: ['FastAPI', 'Next.js', 'Docker'],
    link: 'https://github.com/alaner652/Agora-AI',
    preview: '/shots/works/agora-ai/cover.png',
    card: true,
  },
  {
    status: '接案作品',
    tone: 'idle',
    category: '遊戲',
    slug: 'cooking-game',
    title: 'Cooking Game',
    result: '用 Luau 做出整套遊戲系統與互動邏輯。',
    description:
      '接案期間在 Roblox 上開發的料理主題遊戲，用 Luau 實作遊戲系統與互動邏輯。影片是當時的展示。',
    metrics: ['Luau', 'Roblox Studio'],
    link: 'https://youtu.be/gYcwkoDgL_g',
    preview: '/shots/works/cooking-game/cover.jpg',
  },
  {
    status: '已下線',
    tone: 'idle',
    category: 'AI',
    slug: 'foodie-ai',
    title: 'Foodie AI',
    result: '架構撐不住、後端掛了，但學到「跑得起來」和「撐得住」是兩件事。',
    description:
      '語意餐廳推薦。想法我現在還是覺得可以，但架構撐不住，後端早就掛了。第一次搞懂「跑得起來」和「撐得住」是兩件事。',
    link: 'https://github.com/alaner652/FoodieAI',
    demo: 'https://www.youtube.com/watch?v=780-adKzw94',
    preview: '/shots/works/foodie-ai/cover.png',
    card: true,
  },
  {
    status: '已停用',
    tone: 'idle',
    category: '工具',
    slug: 'easy-tpcu',
    title: 'Easy TPCU',
    result: '分析校務系統的副產品，後來變成 Agora-AI 的起點。',
    description:
      '自動登入校務系統抓缺勤、畫成圖推到 Discord。分析校務系統的副產品，後來變成 Agora-AI 的起點。',
    link: 'https://github.com/alaner652/tpcu-absence-notifier',
    preview: '/shots/works/easy-tpcu/cover.png',
    card: true,
  },
  {
    status: '已停用',
    tone: 'idle',
    category: '工具',
    slug: 'ave-mujica-bot',
    title: 'Ave Mujica Bot',
    result: '第一個真的有人在用的東西。',
    description:
      'OCR 逐幀把字幕轉成 JSON 索引，串 Discord Bot 查截圖。第一個真的有人在用的東西，現在由一句一幀接手。',
    link: 'https://www.youtube.com/watch?v=2rXTrJ6X4a8',
    preview: '/shots/works/ave-mujica-bot/cover.jpg',
  },
]

/** /about「經歷」：照時間講，舊的在上，寫那一年在幹嘛。學歷的正式版只在 /resume（EDUCATION）。 */
export const JOURNEY: JourneyEntry[] = [
  {
    period: '2019 — 2020',
    track: '遊戲',
    title: '第一次打開 Roblox',
    milestone: true,
    detail:
      '先是玩。後來發現遊戲是可以自己做的，也是從這裡開始查英文教學、看 YouTube。2020 年上學期在體育班，下學期轉學。那陣子很迷 Roblox，大部分時間都泡在裡面。',
  },
  {
    period: '2021',
    track: '遊戲',
    title: '開始做遊戲、寫程式',
    detail:
      '從 Roblox Studio 和 Lua 開始，從改地圖到搞懂函數、事件、物件，第一次自己把遊戲做出來。',
  },
  {
    period: '2022 — 2024',
    track: '接案',
    title: '從 Robux 到正式接案',
    milestone: true,
    detail:
      '2022 年開始接案，一開始收 Robux，也做過不收錢的合作。後來和幾個各地的開發者固定合作做遊戲，全英文溝通，負責技能系統、打擊感和 FPS 框架；2024 年起正式收費。2023 年也開始接觸前端、網頁這些遊戲以外的領域。',
  },
  {
    period: '2024',
    track: '遊戲',
    title: '加入 CubexStudios',
    detail:
      '開始和 CubexStudios 合作寫遊戲腳本，後來成為共同創辦人兼首席腳本師。2026 年起一起打造工作室自己的遊戲。',
  },
  {
    period: '2024',
    track: '社群',
    title: '走出去看別人怎麼做',
    detail: '開始參加不同領域的社群。暑假以開發者身分去 Flutter Meetup，現場最年輕的是我。',
  },
  {
    period: '2025',
    track: '資安',
    title: '沉澱，資安長出來',
    milestone: true,
    detail: '少跑外面，一個人專研更多東西，資安是這一年長出來的。也開始投實習。',
  },
  {
    period: '2026 —',
    track: '現在',
    title: '還沒開始的一年',
    milestone: true,
    detail:
      '4 到 6 月在校務系統找到漏洞，透過 HITCON ZeroDay 通報，之後被電算中心找進去，現在還在做。遊戲這邊不再只寫腳本：和 CubexStudios 做工作室自己的遊戲，也自己發行了 Build The Cat Gunner，企劃、UI、數值平衡、投廣告、上線後看數據都自己來。打工、創業、自學繼續並行。',
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
  {
    label: '語言',
    items: ['Python', 'TypeScript', 'JavaScript', 'Lua', 'Luau', 'C', 'C++', 'C#', 'Java', 'Go'],
  },
  {
    label: '遊戲開發',
    items: [
      'Roblox Studio',
      'Rojo',
      'Wally',
      'Lune',
      'luau-lsp',
      'StyLua',
      'Charm',
      'Unity',
      'Godot',
    ],
  },
  {
    label: '後端與服務',
    items: [
      'FastAPI',
      'Next.js API Routes',
      'Drizzle ORM',
      'PostgreSQL',
      'SQLite',
      'MongoDB',
      'Supabase',
      'Appwrite',
    ],
  },
  {
    label: '前端',
    items: ['Next.js', 'React', 'Vue', 'Tailwind CSS'],
  },
  {
    label: '基礎設施',
    items: ['Docker', 'Linux', 'OpenWrt', 'Cloudflare Tunnel', 'Proxmox', 'Tailscale'],
  },
  {
    label: '工具與 AI',
    items: [
      'Git',
      'Burp Suite',
      'Claude Code',
      'MCP',
      'Gemini API',
      'LINE Messaging API',
      'Vitest',
      'ffmpeg',
    ],
  },
]
