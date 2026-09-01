// 抓專案預覽圖到 public/shots/，給「做過的東西」的縮圖用。
// 手動跑：npm run shots —— 只有這時候會碰到第三方服務，線上讀的永遠是 repo 裡的本地檔。
// 專案改版時重跑一次，把新的圖 commit 進去就好。
//
// 這份清單要和 src/constants/index.ts 的 WORK_ITEMS.preview 對得起來。

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'shots')

/** github：用官方的 repo 預覽卡。site：沒有 og:image 的站，只能真的去截圖。 */
const TARGETS = [
  { slug: 'agora-ai', kind: 'github', repo: 'alaner652/Agora-AI' },
  { slug: 'order', kind: 'github', repo: 'alaner652/order' },
  { slug: 'girls-band-shot', kind: 'site', url: 'https://girls-band-shot.alaner652.com' },
]

/** 一個 target 可以有多個來源，前面的失敗就換下一個。 */
function sourcesFor(target) {
  if (target.kind === 'github') {
    // 路徑裡的 1 是 GitHub 自己的 cache buster，內容只跟 owner/repo 有關
    return [`https://opengraph.githubassets.com/1/${target.repo}`]
  }
  const encoded = encodeURIComponent(target.url)
  return [
    `https://api.microlink.io/?url=${encoded}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=720`,
    `https://image.thum.io/get/width/1280/${target.url}`,
  ]
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

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
  // thum.io 還在排隊時會先回一張很小的佔位圖，寧可換下一個來源也不要寫壞檔
  if (buf.byteLength < 10_000) throw new Error(`太小，可能是佔位圖（${buf.byteLength} B）`)
  return buf
}

async function capture(target) {
  for (const source of sourcesFor(target)) {
    try {
      const buf = await fetchImage(source)
      const file = join(OUT_DIR, `${target.slug}.png`)
      await writeFile(file, buf)
      console.log(`  ✓ ${target.slug}.png  ${(buf.byteLength / 1024).toFixed(0)} KB`)
      return true
    } catch (err) {
      console.warn(`  … ${new URL(source).host} 失敗：${err.message}`)
    }
  }
  console.error(`  ✗ ${target.slug} 全部來源都失敗，保留舊檔`)
  return false
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
  console.log(`\n全部完成 → public/shots/`)
}
