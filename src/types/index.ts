export interface NavLink {
  label: string
  href: string
}

export interface WorkItem {
  status: string
  title: string
  description: string
  metrics: string[]
  link?: string
}

export interface PastItem {
  title: string
  note: string
  link?: string
}

export interface ExperienceItem {
  period: string
  role: string
  org: string
  description: string
}

export interface EducationItem {
  period: string
  school: string
  program: string
  note?: string
}

export interface SkillGroup {
  label: string
  items: string[]
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
  email: string
  /** 建好帳號後填入，Footer、Hero 與 Person JSON-LD 的 sameAs 會自動帶上。 */
  linkedin?: string
  description: string
  location: string
  timezone: string
  copyright: string
}
