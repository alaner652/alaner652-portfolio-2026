import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

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

  const fontData = await readFile(join(process.cwd(), 'public/fonts/NotoSansTC-Regular.ttf'))

  const titleFontSize = title.length > 22 ? '48px' : '60px'
  const shortDesc = description.length > 72 ? description.slice(0, 72) + '…' : description

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
          fontFamily: 'NotoSansTC',
        }}
      >
        {/* top row: date + tags */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: '#888888', fontSize: '14px', letterSpacing: '0.1em' }}>
            {'Writing / ' + date}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {tags.slice(0, 3).map((tag: string) => (
              <div
                key={tag}
                style={{
                  color: '#555555',
                  fontSize: '12px',
                  border: '1px solid #333333',
                  padding: '3px 8px',
                  borderRadius: '4px',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* title + description */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '980px',
          }}
        >
          <div
            style={{
              color: '#f0f0f0',
              fontSize: titleFontSize,
              fontWeight: '700',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: '#888888',
              fontSize: '18px',
              fontWeight: '400',
              lineHeight: 1.5,
              marginTop: '18px',
              maxWidth: '860px',
            }}
          >
            {shortDesc}
          </div>
        </div>

        {/* bottom row: site + handle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }}
            />
            <span style={{ color: '#f59e0b', fontSize: '14px', letterSpacing: '0.1em' }}>
              alaner652.com
            </span>
          </div>
          <div style={{ color: '#444444', fontSize: '14px' }}>alaner652</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'NotoSansTC', data: fontData, style: 'normal', weight: 400 }],
    },
  )
}
