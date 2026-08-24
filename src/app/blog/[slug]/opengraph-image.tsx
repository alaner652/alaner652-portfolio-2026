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
          background: '#FCFAF4',
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
          <div style={{ color: '#7E725D', fontSize: '15px', letterSpacing: '0.04em' }}>
            {'Writing / ' + date}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {tags.slice(0, 3).map((tag: string) => (
              <div
                key={tag}
                style={{
                  color: '#7E725D',
                  fontSize: '13px',
                  border: '1px solid #E7DEC9',
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
              color: '#332D24',
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
              color: '#736A5A',
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
              style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E06122' }}
            />
            <span style={{ color: '#736A5A', fontSize: '15px', letterSpacing: '0.04em' }}>
              alaner652.com
            </span>
          </div>
          <div style={{ color: '#7E725D', fontSize: '14px' }}>alaner652</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'NotoSansTC', data: fontData, style: 'normal', weight: 400 }],
    },
  )
}
