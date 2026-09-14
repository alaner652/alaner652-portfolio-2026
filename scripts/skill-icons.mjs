// 抓有顏色的技能 logo 到 public/skill-icons/，給「會的東西」的 chip 用。
// 手動跑：npm run skill-icons —— 只有這時候會碰到第三方服務，線上讀的永遠是 repo 裡的本地檔。
// 新增技能時在 src/constants/skill-icons.json 補一條「顯示名稱 → slug」再重跑，然後把新的 svg commit 進去。
//
// 來源有兩層：
//   1. skillicons.dev —— 圓角深色底 + 彩色 logo，樣式統一，優先用。
//   2. Simple Icons —— skillicons 沒收錄的（Drizzle、Tailscale、OpenWrt、Burp Suite…）
//      拿它的單色 glyph 和品牌色，自己疊到同款的圓角底上，看起來才會是同一組。
//
// slug 以 Simple Icons 的為準（https://simpleicons.org/），skillicons 命名不同的在 SKILLICONS_ALIAS 對照。
// 沒有 logo 的項目（SQL、IDOR / XSS / CSRF、負責任揭露…）不要硬塞，chip 就只顯示文字。

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const MAP_FILE = join(ROOT, 'src', 'constants', 'skill-icons.json')
const OUT_DIR = join(ROOT, 'public', 'skill-icons')

const SKILLICONS_ALIAS = { typescript: 'ts', tailwindcss: 'tailwind', nextdotjs: 'nextjs' }

/** skillicons.dev 深色主題的底色與圓角，自己合成的 fallback 要長得一樣 */
const TILE = { size: 256, radius: 60, fill: '#242938', pad: 40 }

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.text()
}

/** skillicons 沒收錄的 slug 不會 404，只會回一個內容是 "undefined" 的空殼 */
async function fromSkillicons(slug) {
  const svg = await fetchText(`https://skillicons.dev/icons?i=${SKILLICONS_ALIAS[slug] ?? slug}`)
  if (!svg.includes('<path') && !svg.includes('<rect')) return null
  return svg.trim()
}

/** 品牌色太暗（Tailscale 是 #242424）會跟深色底糊在一起，那種就改用白色 */
function readableOnTile(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return lum < 0.2 ? '#ffffff' : hex
}

async function fromSimpleIcons(slug) {
  const svg = await fetchText(`https://cdn.simpleicons.org/${slug}`)
  const color = svg.match(/fill="(#[0-9a-fA-F]{6})"/)?.[1]
  const path = svg.match(/<path d="([^"]+)"/)?.[1]
  if (!color || !path) throw new Error('Simple Icons 回應解析失敗')

  // Simple Icons 的 glyph 是 24x24，放大後置中到 tile 裡
  const scale = (TILE.size - TILE.pad * 2) / 24
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE.size} ${TILE.size}">`,
    `<rect width="${TILE.size}" height="${TILE.size}" rx="${TILE.radius}" fill="${TILE.fill}"/>`,
    `<path transform="translate(${TILE.pad} ${TILE.pad}) scale(${scale})" fill="${readableOnTile(color)}" d="${path}"/>`,
    `</svg>`,
  ].join('')
}

async function main() {
  const map = JSON.parse(await readFile(MAP_FILE, 'utf8'))
  // 多個技能可以共用同一個 slug（Next.js 與 Next.js API Routes），去重後只抓一次
  const slugs = [...new Set(Object.values(map))]

  await mkdir(OUT_DIR, { recursive: true })

  let failed = 0
  for (const slug of slugs) {
    try {
      let svg = await fromSkillicons(slug)
      let source = 'skillicons'
      if (!svg) {
        svg = await fromSimpleIcons(slug)
        source = 'simpleicons'
      }
      await writeFile(join(OUT_DIR, `${slug}.svg`), svg)
      console.log(`✓ ${slug}  (${source})`)
    } catch (err) {
      failed += 1
      console.error(`✗ ${slug}: ${err.message}`)
    }
  }

  if (failed) {
    console.error(`\n${failed} 個沒抓到，檢查 slug 有沒有打錯：https://simpleicons.org/`)
    process.exit(1)
  }
}

main()
