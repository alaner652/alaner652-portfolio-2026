import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

import type { BlogPost, BlogPostFrontmatter } from '@/types'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

/** 估閱讀時間：中文每分鐘約 400 字、英文約 200 詞，兩種混著算。
    先把程式碼區塊和 MDX 標籤拿掉，不然一篇貼了很多 log 的文章會被算成半小時。 */
export function estimateReadingMinutes(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g,'')
    .replace(/<[^>]+>/g,'')
    .replace(/^(import|export)\s.*$/gm,'')
  const cjk = (text.match(/[\u2e80-\u9fff\uf900-\ufaff]/g) ?? []).length
  const words = (text.replace(/[\u2e80-\u9fff\uf900-\ufaff]/g,'').match(/[A-Za-z0-9]+/g) ?? [])
    .length
  return Math.max(1, Math.round(cjk / 400 + words / 200))
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  // *.en.mdx 是翻譯，不算一篇獨立文章
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx') && !f.endsWith('.en.mdx'))

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        frontmatter: data as BlogPostFrontmatter,
        readingMinutes: estimateReadingMinutes(content),
      }
    })
    .filter((post) => !post.frontmatter.hidden)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}

/** 讀一篇。locale 是 en 時先找 slug.en.mdx，沒有就退回中文並把 lang 標成 zh，頁面好提示。 */
export function getPostBySlug(
  slug: string,
  locale: 'zh' | 'en' = 'zh'
): {
  frontmatter: BlogPostFrontmatter
  content: string
  readingMinutes: number
  lang: 'zh' | 'en'
} | null {
  const enPath = path.join(BLOG_DIR, `${slug}.en.mdx`)
  const useEn = locale === 'en' && fs.existsSync(enPath)
  const filePath = useEn ? enPath : path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    frontmatter: data as BlogPostFrontmatter,
    content,
    readingMinutes: estimateReadingMinutes(content),
    lang: useEn ? 'en' : 'zh',
  }
}
