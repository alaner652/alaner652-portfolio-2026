import { ImageResponse } from 'next/og'

export const alt = 'alaner652 — Full-Stack Engineer · Security Researcher'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#f59e0b',
            }}
          />
          <span
            style={{
              color: '#f59e0b',
              fontSize: '15px',
              fontFamily: 'monospace',
              letterSpacing: '0.12em',
            }}
          >
            alaner652.com
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              color: '#f0f0f0',
              fontSize: '72px',
              fontFamily: 'sans-serif',
              fontWeight: '700',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Wu Chen-Chi
          </div>
          <div
            style={{
              color: '#888888',
              fontSize: '22px',
              fontFamily: 'monospace',
              letterSpacing: '0.04em',
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
              color: '#444444',
              fontSize: '14px',
              fontFamily: 'monospace',
              letterSpacing: '0.08em',
            }}
          >
            Agora-AI · HITCON ZeroDay · TPCU
          </div>
          <div
            style={{
              color: '#333333',
              fontSize: '14px',
              fontFamily: 'monospace',
            }}
          >
            吳宸麒
          </div>
        </div>
      </div>
    ),
    size,
  )
}
