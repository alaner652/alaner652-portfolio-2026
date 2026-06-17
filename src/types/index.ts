export interface NavLink {
  label: string
  href: string
  hideSm?: boolean
}

export interface StatusRow {
  glyph: string
  key: string
  value: string
  subValue?: string
}

export interface Stat {
  value: string
  label: string
}

export interface WorkItem {
  id: string
  status: string
  title: string
  description: string
  metrics: string[]
  link?: string
}

export interface ExperienceItem {
  period: string
  role: string
  org: string
  description: string
}


export interface NowItem {
  text: string
}

export interface BlogPostFrontmatter {
  title: string
  date: string
  description: string
  tags?: string[]
  wide?: boolean
  hidden?: boolean
}

export interface BlogPost {
  slug: string
  frontmatter: BlogPostFrontmatter
}

export interface SiteConfig {
  name: string
  handle: string
  url: string
  github: string
  description: string
  location: string
  timezone: string
  copyright: string
}
