// 抓有顏色的技能 logo 到 public/skill-icons/，給「會的東西」的 chip 用。
// 手動跑：npm run skill-icons —— 只有這時候會碰到第三方服務，線上讀的永遠是 repo 裡的本地檔。
// 新增技能時在 src/constants/skill-icons.json 補一條「顯示名稱 → slug」再重跑，然後把新的 svg commit 進去。
//
// 來源有三層：
//   1. skillicons.dev —— 圓角深色底 + 彩色 logo，樣式統一，優先用。
//   2. Simple Icons —— skillicons 沒收錄的（Drizzle、Tailscale、OpenWrt、Burp Suite…）
//      拿它的單色 glyph 和品牌色，自己疊到同款的圓角底上，看起來才會是同一組。
//   3. 官方 repo —— 兩邊都沒有、但官方有 logo 的（Rojo、Lune、Wally、luau-lsp、StyLua、Charm），見下方 OFFICIAL。
//
// slug 以 Simple Icons 的為準（https://simpleicons.org/），skillicons 命名不同的在 SKILLICONS_ALIAS 對照。
// 找不到官方 logo 的項目不放進 SKILLS（2026-10-17 決定），不要自己畫一個。

import { execFileSync } from 'node:child_process'
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const MAP_FILE = join(ROOT, 'src', 'constants', 'skill-icons.json')
const OUT_DIR = join(ROOT, 'public', 'skill-icons')

const SKILLICONS_ALIAS = {
  typescript: 'ts',
  tailwindcss: 'tailwind',
  nextdotjs: 'nextjs',
  javascript: 'js',
  cplusplus: 'cpp',
  csharp: 'cs',
  postgresql: 'postgres',
  vuedotjs: 'vue',
}

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

/** 兩個圖示庫都沒收錄、但官方 repo 有 logo 的：直接抓官方檔，包成 data URI 疊到同款圓角底上。
    viewBox 用來裁掉附帶的字（Wally 的 logo 是「狗 + Wally 字」，只留左邊的狗）。
    PNG 一律先用 macOS 的 sips 縮到 128px 再嵌，免得一張 icon 幾百 KB（Charm 原檔 512px、260KB）。
    沒有官方 logo 的工具不硬做，直接從 SKILLS 拿掉（2026-10-17 他的決定）。 */
const OFFICIAL = {
  rojo: {
    url: 'https://raw.githubusercontent.com/rojo-rbx/rojo/master/assets/brand_images/icon-32.png',
  },
  // Luau 官網的 logo；luau-lsp 的 icon 也是同一個藍色方塊，所以兩個長得一樣是正常的
  luau: { url: 'https://raw.githubusercontent.com/luau-lang/site/master/public/favicon.svg' },
  lune: { url: 'https://raw.githubusercontent.com/lune-org/lune/main/assets/logo/tilt_svg.svg' },
  wally: {
    url: 'https://raw.githubusercontent.com/UpliftGames/wally/main/wally-logo.svg',
    viewBox: '0 0 61.1 61.1',
  },
  'luau-lsp': {
    url: 'https://raw.githubusercontent.com/JohnnyMorganz/luau-lsp/main/editors/code/assets/icon.png',
  },
  stylua: {
    url: 'https://raw.githubusercontent.com/JohnnyMorganz/StyLua/main/stylua-vscode/assets/icon.png',
  },
  charm: { url: 'https://raw.githubusercontent.com/littensy/charm/main/assets/logo.png' },
}

async function fromOfficial(slug) {
  const { url, viewBox } = OFFICIAL[slug]
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  let buf = Buffer.from(await res.arrayBuffer())
  let mime = 'image/png'
  if (url.endsWith('.svg')) {
    mime = 'image/svg+xml'
    if (viewBox)
      buf = Buffer.from(buf.toString('utf8').replace(/viewBox="[^"]*"/, `viewBox="${viewBox}"`))
  } else {
    const dir = await mkdtemp(join(tmpdir(), 'skill-icon-'))
    const src = join(dir, 'in.png')
    const out = join(dir, 'out.png')
    await writeFile(src, buf)
    execFileSync('sips', ['-Z', '128', src, '--out', out], { stdio: 'ignore' })
    buf = await readFile(out)
  }
  const inner = TILE.size - TILE.pad * 2
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE.size} ${TILE.size}">`,
    `<rect width="${TILE.size}" height="${TILE.size}" rx="${TILE.radius}" fill="${TILE.fill}"/>`,
    `<image x="${TILE.pad}" y="${TILE.pad}" width="${inner}" height="${inner}" href="data:${mime};base64,${buf.toString('base64')}"/>`,
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
      let svg = OFFICIAL[slug] ? await fromOfficial(slug) : await fromSkillicons(slug)
      let source = OFFICIAL[slug] ? 'official' : 'skillicons'
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
