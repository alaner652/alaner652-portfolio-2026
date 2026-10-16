import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

import { ImageResponse } from 'next/og'

import SKILL_ICONS from '@/constants/skill-icons.json'
import { DEFAULT_LOCALE, hasLocale, type Locale } from '@/i18n/config'

/* ── 連結預覽圖（opengraph-image）的共用版型 ──
   每個路由各自一個 opengraph-image.tsx，只決定「這頁要說什麼、配什麼圖」，排版都在這裡：
   左上手寫字標、右上這頁的網址；中間 kicker（編號 · 頁名，跟導覽列一樣）+ 大標 + 一句說明；
   右邊放這頁的代表圖（作品封面、頭像、截圖拼貼）；底下一排技能 logo 或幾個重點。
   （satori 不支援 repeating-linear-gradient，網站上的斜紋點綴這裡畫不出來，就不放。）
   顏色跟網站同一組 token。字型：標題 Noto Sans TC Black、內文 Regular、字標 Caveat。 */

export const OG_SIZE = { width: 1200, height: 630 }

const C = {
  bg: '#0E1013',
  surface: '#16191D',
  line: '#23272D',
  border: '#2E3339',
  text: '#F2EFE9',
  text2: '#C4C7CD',
  text3: '#7C8189',
  accent: '#FF8648',
}

const ICON_MAP: Record<string, string> = SKILL_ICONS

const pub = (...p: string[]) => join(process.cwd(), 'public', ...p)

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
}

/** public/ 底下的檔案轉成 data URI，satori 只吃得到這種 */
export async function publicImage(path: string) {
  const buf = await readFile(pub(path.replace(/^\//, '')))
  return `data:${MIME[extname(path).toLowerCase()] ?? 'image/png'};base64,${buf.toString('base64')}`
}

export async function ogLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params
  return hasLocale(locale) ? locale : DEFAULT_LOCALE
}

export interface OgInput {
  locale: Locale
  /** 這頁的網址路徑，右上角顯示 alaner652.com{path} */
  path: string
  /** 標題上面那行小字：「02 · 做過的東西」 */
  kicker: string
  /** 大標；給陣列就是自己決定換行（每個元素一行），不讓它斷在詞中間 */
  title: string | string[]
  /** 標題裡要變橘的那段字（跟首頁 Hero 一樣） */
  accent?: string
  subtitle?: string
  /** 右邊的代表圖（public/ 路徑）。shape 決定框的比例 */
  image?: { src: string; shape: 'wide' | 'square' }
  /** 右邊改放幾張截圖拼成一疊（作品列表用） */
  stack?: string[]
  /** 底下一排技能 logo（技能名稱要對得到 skill-icons.json） */
  icons?: string[]
  /** 底下一排純文字重點（沒有 logo 的時候用） */
  tags?: string[]
}

export async function ogImage(o: OgInput) {
  const [black, regular, caveat] = await Promise.all([
    readFile(pub('fonts', 'NotoSansTC-Black.ttf')),
    readFile(pub('fonts', 'NotoSansTC-Regular.ttf')),
    readFile(pub('fonts', 'Caveat-Bold.woff')),
  ])
  // 同一個 logo 只放一次（Next.js 和 Next.js API Routes 共用一張）
  const icons = (o.icons ?? [])
    .filter((n, i, all) => ICON_MAP[n] && all.findIndex((m) => ICON_MAP[m] === ICON_MAP[n]) === i)
    .slice(0, 12)
  const lines = Array.isArray(o.title) ? o.title : [o.title]
  const [image, stack, iconSrc] = await Promise.all([
    o.image ? publicImage(o.image.src) : null,
    Promise.all((o.stack ?? []).slice(0, 3).map(publicImage)),
    Promise.all(icons.map((n) => publicImage(`/skill-icons/${ICON_MAP[n]}.svg`))),
  ])
  const hasVisual = Boolean(image) || stack.length > 0
  const textWidth = stack.length ? 560 : hasVisual ? 600 : 1040
  // 字級照最長那一行的實際字寬算：中日文一個字約 1em、英數約 0.56em，塞進文字欄寬，最大 96。
  // 單一字串的標題先試一行放不放得下（字級 ≥ 56 就一行），太長才讓它自己折成兩行。
  const units = (t: string) =>
    [...t].reduce(
      (n, ch) => n + (/[\u2e80-\u9fff\uf900-\ufaff\uff00-\uffef]/.test(ch) ? 1 : 0.56),
      0
    )
  const fit = (u: number) => Math.floor((textWidth * 0.96) / u)
  const widest = Math.max(...lines.map(units))
  const oneLine = fit(widest)
  const titleSize = Math.max(
    44,
    Math.min(96, Array.isArray(o.title) || oneLine >= 56 ? oneLine : fit(widest / 2))
  )
  // 底下的重點：放得下幾個就放幾個（約 1000px 寬、22px 字），不讓最後一個被切掉
  const tags: string[] = []
  let used = 0
  for (const t of o.tags ?? []) {
    const w = units(t) * 22 + 28
    if (used + w > 1000) break
    tags.push(t)
    used += w
  }

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: C.bg,
        color: C.text,
        fontFamily: 'Regular',
        padding: '52px 64px 0 72px',
        position: 'relative',
      }}
    >
      {/* 頂列：字標 / 網址 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', fontFamily: 'Caveat', fontSize: 52, lineHeight: 1 }}>
          small<span style={{ color: C.accent, marginLeft: 12 }}>R</span>
        </div>
        <div style={{ display: 'flex', color: C.text3, fontSize: 22, letterSpacing: '0.02em' }}>
          alaner652.com
          <span style={{ color: C.text2 }}>{o.path === '/' ? '' : o.path}</span>
        </div>
      </div>

      {/* 主體 */}
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: textWidth }}>
          <div style={{ display: 'flex', color: C.accent, fontSize: 24, letterSpacing: '0.06em' }}>
            {o.kicker}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Black',
              fontSize: titleSize,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              marginTop: 18,
              flexDirection: 'column',
            }}
          >
            {lines.map((l) => {
              const at = o.accent ? l.indexOf(o.accent) : -1
              if (at < 0) return <span key={l}>{l}</span>
              return (
                // whiteSpace: pre：flex 會吃掉片段頭尾的空格（英文的 own products 會黏在一起）
                <span key={l} style={{ display: 'flex', whiteSpace: 'pre' }}>
                  {l.slice(0, at)}
                  <span style={{ color: C.accent }}>{o.accent}</span>
                  {l.slice(at + (o.accent?.length ?? 0))}
                </span>
              )
            })}
          </div>
          {o.subtitle && (
            <div
              style={{
                display: 'flex',
                color: C.text2,
                fontSize: 26,
                lineHeight: 1.55,
                marginTop: 22,
                lineClamp: 2,
              }}
            >
              {o.subtitle}
            </div>
          )}
        </div>

        {image && o.image && (
          <div
            style={{
              display: 'flex',
              marginLeft: 'auto',
              width: o.image.shape === 'square' ? 360 : 440,
              height: o.image.shape === 'square' ? 360 : 248,
              borderRadius: 14,
              border: `1px solid ${C.border}`,
              overflow: 'hidden',
              boxShadow: '0 24px 48px rgba(0,0,0,0.55)',
            }}
          >
            <img
              src={image}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
        )}

        {stack.length > 0 && (
          <div
            style={{
              display: 'flex',
              position: 'relative',
              marginLeft: 'auto',
              width: 450,
              height: 360,
            }}
          >
            {stack.map((src, i) => (
              <div
                key={src.slice(-24)}
                style={{
                  display: 'flex',
                  position: 'absolute',
                  left: [0, 50, 20][i],
                  top: [0, 110, 220][i],
                  width: 400,
                  height: 188,
                  borderRadius: 10,
                  border: `1px solid ${C.border}`,
                  overflow: 'hidden',
                  transform: `rotate(${[-3, 2.5, -1.5][i]}deg)`,
                  boxShadow: '0 18px 36px rgba(0,0,0,0.55)',
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 底列：logo 或重點，上面一條分隔線，左邊一小段橘色 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 96,
          borderTop: `1px solid ${C.line}`,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -1,
            left: 0,
            width: 72,
            height: 3,
            background: C.accent,
            display: 'flex',
          }}
        />
        {iconSrc.length > 0 ? (
          <div style={{ display: 'flex', gap: 14 }}>
            {iconSrc.map((src, i) => (
              <img
                key={icons[i]}
                src={src}
                alt=""
                width={44}
                height={44}
                style={{ borderRadius: 10 }}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 28, color: C.text3, fontSize: 22 }}>
            {tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Black', data: black, style: 'normal', weight: 900 },
        { name: 'Regular', data: regular, style: 'normal', weight: 400 },
        { name: 'Caveat', data: caveat, style: 'normal', weight: 700 },
      ],
    }
  )
}
