import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { DEFAULT_LOCALE, hasLocale, type Locale } from '@/i18n/config'

export const alt = 'small R (alaner652) — portfolio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const COPY: Record<Locale, { role: string; foot: string; proof: string }> = {
  zh: {
    role: '全端工程師 · Roblox 遊戲 · 資安',
    foot: '做過的東西 · 經歷 · 接案',
    proof: '三件上線的東西 →',
  },
  en: {
    role: 'Full-stack · Roblox games · Security',
    foot: 'Work · About · Hire',
    proof: 'Three things that shipped →',
  },
}

/** 右邊三張截圖：遊戲、網頁、遊戲。輕微交錯疊放，像桌上的三張照片。 */
const SHOTS = [
  { file: 'cat-gunner.jpg', label: 'Build The Cat Gunner', rotate: -4, x: 0, y: 0 },
  { file: 'girls-band-shot.jpg', label: '一句一幀', rotate: 3, x: 70, y: 150 },
  { file: 'cooking-game.jpg', label: 'Cooking Game', rotate: -2, x: 20, y: 300 },
]

const pub = (...p: string[]) => join(process.cwd(), 'public', ...p)

/** 貼網址時的預覽卡：左邊手寫 small R（跟導覽列同一個 logo）、角色一行、底下一句；
    右邊三張作品截圖當證明。zh / en 各一版。 */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale: Locale = hasLocale(raw) ? raw : DEFAULT_LOCALE
  const c = COPY[locale]

  const [noto, caveat, ...shots] = await Promise.all([
    readFile(pub('fonts', 'NotoSansTC-Regular.ttf')),
    readFile(pub('fonts', 'Caveat-Bold.woff')),
    ...SHOTS.map((s) => readFile(pub('og', s.file))),
  ])
  const src = shots.map((b) => `data:image/jpeg;base64,${b.toString('base64')}`)

  return new ImageResponse(
    <div
      style={{
        background: '#0E1013',
        width: '100%',
        height: '100%',
        display: 'flex',
        fontFamily: 'NotoSansTC',
        color: '#F2EFE9',
      }}
    >
      {/* 左：字 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '620px',
          padding: '64px 0 56px 72px',
        }}
      >
        <div style={{ color: '#7C8189', fontSize: '18px', letterSpacing: '0.12em' }}>
          alaner652.com
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: 'Caveat',
              fontSize: '168px',
              lineHeight: 0.9,
              color: '#F2EFE9',
              display: 'flex',
            }}
          >
            small <span style={{ color: '#FF8648', marginLeft: '24px' }}>R</span>
          </div>
          <div style={{ color: '#C4C7CD', fontSize: '28px', marginTop: '28px' }}>{c.role}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#7C8189', fontSize: '17px', letterSpacing: '0.06em' }}>
            {c.foot}
          </div>
          <div style={{ color: '#FF8648', fontSize: '17px', letterSpacing: '0.04em' }}>
            {c.proof}
          </div>
        </div>
      </div>

      {/* 右：三張截圖 */}
      <div style={{ display: 'flex', position: 'relative', flex: 1 }}>
        {SHOTS.map((s, i) => (
          <div
            key={s.file}
            style={{
              position: 'absolute',
              left: `${s.x}px`,
              top: `${s.y + 60}px`,
              width: '440px',
              height: '220px',
              transform: `rotate(${s.rotate}deg)`,
              borderRadius: '8px',
              border: '1px solid #3A3F46',
              background: '#1E2227',
              overflow: 'hidden',
              display: 'flex',
              boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
            }}
          >
            <img
              src={src[i]}
              alt=""
              width={440}
              height={220}
              style={{ width: '440px', height: '220px', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'NotoSansTC', data: noto, style: 'normal', weight: 400 },
        { name: 'Caveat', data: caveat, style: 'normal', weight: 700 },
      ],
    }
  )
}
