import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

export const alt = 'alaner652 — 吳宸麒的個人網站'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fontData = await readFile(join(process.cwd(), 'public/fonts/NotoSansTC-Regular.ttf'))

  return new ImageResponse(
    (
      <div
        style={{
          background: '#FCFAF4',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
        }}
      >
        <span
          style={{
            color: '#736A5A',
            fontSize: '17px',
            fontFamily: 'sans-serif',
            letterSpacing: '0.04em',
          }}
        >
          alaner652.com
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              color: '#332D24',
              fontSize: '72px',
              fontFamily: 'sans-serif',
              fontWeight: '700',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            alaner652
          </div>
          <div
            style={{
              color: '#736A5A',
              fontSize: '24px',
              fontFamily: 'NotoSansTC, sans-serif',
            }}
          >
            吳宸麒，五專資工四年級。台北。
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              color: '#7E725D',
              fontSize: '15px',
              fontFamily: 'NotoSansTC, sans-serif',
              letterSpacing: '0.04em',
            }}
          >
            做過的東西、經歷、還有一些寫下來的記錄
          </div>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#E06122',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'NotoSansTC', data: fontData, style: 'normal', weight: 400 }],
    },
  )
}
