import { ImageResponse } from 'next/og'

export const alt = 'alaner652 — Full-Stack Engineer · Security Researcher'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAF6EC',
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
            color: '#635B4C',
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
              color: '#241F18',
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
              color: '#635B4C',
              fontSize: '24px',
              fontFamily: 'sans-serif',
            }}
          >
            Full-Stack Engineer · Security Researcher · Taipei
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
              color: '#9A907C',
              fontSize: '15px',
              fontFamily: 'sans-serif',
              letterSpacing: '0.04em',
            }}
          >
            Agora-AI · HITCON ZeroDay · TPCU
          </div>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#DE5A16',
            }}
          />
        </div>
      </div>
    ),
    size,
  )
}
