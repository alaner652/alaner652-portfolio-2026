// 抓專案預覽圖到 public/shots/works/<slug>/，給「做過的東西」的縮圖和詳情頁用。
// 每個作品一個資料夾：cover.<ext> 是封面（WORK_ITEMS.preview），more-1.png、more-2.png… 是網站其他分頁
// （WORK_ITEMS.gallery），照 target.pages 的順序編號。
// 手動跑：npm run shots —— 只有這時候會碰到第三方服務，線上讀的永遠是 repo 裡的本地檔。
// 專案改版時重跑一次，把新的圖 commit 進去就好。
//
// 這份清單要和 src/constants/index.ts 的 WORK_ITEMS.preview 對得起來。

import { spawn } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'shots', 'works')

/** github：用官方的 repo 預覽卡。youtube：影片縮圖。roblox：遊戲頁的第一張縮圖（universeId
    用 apis.roblox.com/universes/v1/places/{placeId}/universe 查）。
    site：沒有 og:image 的站，只能真的去截圖。沒有公開頁面的項目就不列在這裡。
    pages：網站的其他分頁，每頁截一張 more-N。可以是路徑字串，或 { path, type: { selector, text } }：
      先在 selector 那格輸入 text 再截（搜尋結果是前端 fetch 出來的，網址帶不了關鍵字）。
    coverManual：封面是手動放的，只截 pages，不動 cover。
    localUrl：本機有跑這個站就優先截本機（只能用本機 Chrome，雲端截圖服務連不到 localhost）。 */
const TARGETS = [
  { slug: 'agora-ai', kind: 'github', repo: 'alaner652/Agora-AI' },
  { slug: 'order', kind: 'github', repo: 'alaner652/order' },
  {
    slug: 'girls-band-shot',
    kind: 'site',
    url: 'https://girls-band-shot.alaner652.com',
    pages: [{ path: '/search', type: { selector: 'input', text: '祥子' } }],
  },
  {
    slug: 'alaner652-portfolio',
    kind: 'site',
    url: 'https://alaner652.com',
    // 本機有跑（npm run dev / start）就截本機的最新版，沒跑才截線上
    localUrl: process.env.SHOTS_LOCAL_URL ?? 'http://localhost:3000',
    pages: ['/about', '/projects', '/blog', '/resume', '/hire'],
  },
  { slug: 'easy-tpcu', kind: 'github', repo: 'alaner652/tpcu-absence-notifier' },
  { slug: 'ave-mujica-bot', kind: 'youtube', videoId: '2rXTrJ6X4a8' },
  { slug: 'foodie-ai', kind: 'github', repo: 'alaner652/FoodieAI' },
  { slug: 'osu-map-manager', kind: 'github', repo: 'alaner652/osu_map_manager' },
  { slug: 'cooking-game', kind: 'youtube', videoId: 'gYcwkoDgL_g' },
  // 註：tpcu-mcp 是對話截圖、build-the-cat-gunner 是遊戲 icon 合成的 2:1 封面，都是手動放進 public/shots/works/ 的。
  // 註：soullike 的封面、more-N 和 demo.mp4 都是從 Studio 錄影裁出遊戲視窗（ffmpeg crop=862:658:380:248）手動做的。
  // 註：ZeroDay 公告頁在 Cloudflare 後面，伺服器端抓 og:image 會被 403 擋掉，
  // 所以 campus-security 的縮圖得手動放進 public/shots/works/。og kind 對其他站仍可用。
]

/** 一個 target 可以有多個來源，前面的失敗就換下一個。 */
function sourcesFor(target, url = target.url, type) {
  if (target.kind === 'github') {
    // 路徑裡的 1 是 GitHub 自己的 cache buster，內容只跟 owner/repo 有關
    return [`https://opengraph.githubassets.com/1/${target.repo}`]
  }
  if (target.kind === 'roblox') {
    // 縮圖網址會換，每次都先問 thumbnails API 拿目前那張
    return [
      async () => {
        const res = await fetch(
          `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${target.universeId}&size=768x432&format=Png&countPerUniverse=1`,
          { signal: AbortSignal.timeout(45_000) }
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        const url = json.data?.[0]?.thumbnails?.[0]?.imageUrl
        if (!url) throw new Error('沒有縮圖')
        return url
      },
    ]
  }
  if (target.kind === 'youtube') {
    // maxres 不一定存在（舊片或低畫質上傳），沒有就退到一定會有的 hq
    return [
      `https://img.youtube.com/vi/${target.videoId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${target.videoId}/hqdefault.jpg`,
    ]
  }
  const encoded = encodeURIComponent(url)
  const local = CHROME ? [{ local: true, url, type }] : []
  return [
    ...local,
    `https://api.microlink.io/?url=${encoded}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=720`,
    `https://image.thum.io/get/width/1280/${url}`,
  ]
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/* ── 本機截圖 ──
   site 類優先用本機的 headless Chrome（Playwright 裝過就會有 chrome-headless-shell）走 DevTools Protocol：
   可以先打字再截、直接出 JPEG（整頁 PNG 一張要 1–2 MB）。找不到瀏覽器才退回 microlink / thum.io。 */
function findChrome() {
  const root = join(homedir(), 'Library', 'Caches', 'ms-playwright')
  if (!existsSync(root)) return null
  const dirs = readdirSync(root)
    .filter((d) => d.startsWith('chromium_headless_shell-'))
    .sort()
    .reverse()
  for (const d of dirs) {
    const bin = join(root, d, 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell')
    if (existsSync(bin)) return bin
  }
  return null
}

const CHROME = findChrome()
const VIEWPORT = { width: 1280, height: 720, deviceScaleFactor: 2 }

async function localShot(url, type) {
  const profile = join(OUT_DIR, '..', '.chrome-profile')
  const proc = spawn(
    CHROME,
    [
      '--headless',
      '--remote-debugging-port=0',
      `--user-data-dir=${profile}`,
      '--hide-scrollbars',
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] }
  )
  try {
    // Chrome 把 DevTools 的 websocket 位址印在 stderr
    const browserWs = await new Promise((resolve, reject) => {
      let buf = ''
      const timer = setTimeout(() => reject(new Error('Chrome 沒有回報 DevTools 位址')), 15_000)
      proc.stderr.on('data', (chunk) => {
        buf += chunk
        const m = buf.match(/DevTools listening on (ws:\/\/\S+)/)
        if (m) {
          clearTimeout(timer)
          resolve(m[1])
        }
      })
    })
    const port = new URL(browserWs).port
    const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
    const page = targets.find((t) => t.type === 'page')
    const ws = new WebSocket(page.webSocketDebuggerUrl)
    await new Promise((r) => ws.addEventListener('open', r, { once: true }))
    let id = 0
    const pending = new Map()
    ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data)
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg)
        pending.delete(msg.id)
      }
    })
    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const n = ++id
        pending.set(n, (msg) =>
          msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result)
        )
        ws.send(JSON.stringify({ id: n, method, params }))
      })

    await send('Emulation.setDeviceMetricsOverride', { ...VIEWPORT, mobile: false })
    await send('Page.enable')
    await send('Page.navigate', { url })
    await sleep(8000) // 等字型、圖片和進場動畫跑完（4 秒會拍到淡入一半的畫面）
    if (type) {
      // React 的受控 input 要用原生 setter 改值再丟 input 事件，它才收得到
      await send('Runtime.evaluate', {
        expression: `(() => {
          const el = document.querySelector(${JSON.stringify(type.selector)})
          const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
          set.call(el, ${JSON.stringify(type.text)})
          el.dispatchEvent(new Event('input', { bubbles: true }))
          el.form?.requestSubmit?.()
        })()`,
      })
      await sleep(8000) // 等搜尋結果和縮圖
    }
    const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 82 })
    ws.close()
    return { buf: Buffer.from(data, 'base64'), ext: 'jpg' }
  } finally {
    proc.kill()
    await rm(profile, { recursive: true, force: true })
  }
}

/** 抓頁面 HTML，解析出 og:image（或 twitter:image）的絕對網址。 */
async function resolveOgImage(pageUrl) {
  const res = await fetch(pageUrl, {
    redirect: 'follow',
    signal: AbortSignal.timeout(45_000),
    // 有些站（Cloudflare 後面）對沒有瀏覽器 UA 的請求回 403
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      accept: 'text/html,application/xhtml+xml',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const html = await res.text()
  const match =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)
  if (!match) throw new Error('頁面沒有 og:image')
  return new URL(match[1], pageUrl).href
}

async function fetchImage(url) {
  let res
  // opengraph.githubassets.com 對連續請求會回 429，等一下再試就過了
  for (let attempt = 0; ; attempt++) {
    res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(45_000) })
    if (res.status !== 429 || attempt === 3) break
    await sleep(2000 * (attempt + 1))
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const type = res.headers.get('content-type') ?? ''
  if (!type.startsWith('image/')) throw new Error(`不是圖片（${type || 'no content-type'}）`)

  const buf = Buffer.from(await res.arrayBuffer())
  // thum.io 還在排隊時會先回一張很小的佔位圖，YouTube 沒有 maxres 時也會回一張灰底小圖，
  // 寧可換下一個來源也不要寫壞檔
  if (buf.byteLength < 10_000) throw new Error(`太小，可能是佔位圖（${buf.byteLength} B）`)
  // 副檔名跟著真正的格式走（YouTube 給的是 JPEG），不要一律寫成 .png
  return { buf, ext: type.includes('jpeg') ? 'jpg' : 'png' }
}

/** 一張圖：依序試 sources，成功就寫成 <slug>/<name>.<ext>。 */
async function saveFirst(target, sources, name) {
  for (let source of sources) {
    try {
      // roblox 這種要先問 API 才知道網址的，source 是一個回傳網址的函式
      if (typeof source === 'function') source = await source()
      const { buf, ext } = source.local
        ? await localShot(source.url, source.type)
        : await fetchImage(source)
      const dir = join(OUT_DIR, target.slug)
      await mkdir(dir, { recursive: true })
      const file = `${name}.${ext}`
      // 換了格式（png → jpg）就把舊副檔名的檔刪掉，免得資料夾裡留兩份
      for (const old of ['png', 'jpg'].filter((e) => e !== ext))
        await rm(join(dir, `${name}.${old}`), { force: true })
      await writeFile(join(dir, file), buf)
      console.log(`  ✓ ${target.slug}/${file}  ${(buf.byteLength / 1024).toFixed(0)} KB`)
      return true
    } catch (err) {
      const host =
        typeof source === 'string'
          ? new URL(source).host
          : source.local
            ? '本機 Chrome'
            : 'roblox thumbnails API'
      console.warn(`  … ${host} 失敗：${err.message}`)
    }
  }
  console.error(`  ✗ ${target.slug}/${name} 全部來源都失敗，保留舊檔`)
  return false
}

async function reachable(url) {
  try {
    return (await fetch(url, { signal: AbortSignal.timeout(5000) })).ok
  } catch {
    return false
  }
}

async function capture(target) {
  if (target.localUrl && CHROME && (await reachable(target.localUrl))) {
    console.log(`  （截本機 ${target.localUrl}）`)
    target = { ...target, url: target.localUrl }
  }
  let ok = true
  if (!target.coverManual) ok = await captureCover(target)
  for (const [i, page] of (target.pages ?? []).entries()) {
    const { path, type } = typeof page === 'string' ? { path: page } : page
    const url = new URL(path, target.url).href
    if (!(await saveFirst(target, sourcesFor(target, url, type), `more-${i + 1}`))) ok = false
  }
  return ok
}

async function captureCover(target) {
  let sources
  if (target.kind === 'og') {
    try {
      sources = [await resolveOgImage(target.url)]
    } catch (err) {
      console.error(`  ✗ ${target.slug} 解析 og:image 失敗：${err.message}`)
      return false
    }
  } else {
    sources = sourcesFor(target)
  }
  return saveFirst(target, sources, 'cover')
}

await mkdir(OUT_DIR, { recursive: true })
let failed = 0
for (const target of TARGETS) {
  console.log(`${target.slug}:`)
  if (!(await capture(target))) failed += 1
}

if (failed > 0) {
  console.error(`\n${failed} 個目標沒抓到。`)
  process.exitCode = 1
} else {
  console.log(`\n全部完成 → public/shots/works/`)
}
