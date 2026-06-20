import { ImageResponse } from 'next/og'

import { getPostBySlug } from '@/lib/mdx'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const title = post?.frontmatter.title ?? 'Writing'
  const description = post?.frontmatter.description ?? ''
  const date = post?.frontmatter.date ?? ''
  const tags = post?.frontmatter.tags ?? []

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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              color: '#888888',
              fontSize: '14px',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
            }}
          >
            Writing / {date}
          </div>
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {tags.slice(0, 3).map((tag: string) => (
                <div
                  key={tag}
                  style={{
                    color: '#555555',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    border: '1px solid #333333',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    letterSpacing: '0.05em',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              color: '#f0f0f0',
              fontSize: title.length > 30 ? '48px' : '60px',
              fontFamily: 'sans-serif',
              fontWeight: '700',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              maxWidth: '980px',
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                color: '#888888',
                fontSize: '20px',
                fontFamily: 'sans-serif',
                lineHeight: 1.5,
                maxWidth: '860px',
              }}
            >
              {description.length > 80 ? description.slice(0, 80) + '…' : description}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#f59e0b',
              }}
            />
            <span
              style={{
                color: '#f59e0b',
                fontSize: '14px',
                fontFamily: 'monospace',
                letterSpacing: '0.1em',
              }}
            >
              alaner652.com
            </span>
          </div>
          <div
            style={{
              color: '#444444',
              fontSize: '14px',
              fontFamily: 'monospace',
            }}
          >
            吳宸麒 (alaner652)
          </div>
        </div>
      </div>
    ),
    size,
  )
}
