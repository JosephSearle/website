export interface TimelineEntry {
  id: string
  dateRange: string
  role: string
  company: string
  location: string
  description: string
  tags: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  url: string
  iconVariant: 'terracotta' | 'sage'
}

export interface Post {
  id: string
  date: string
  category: string
  title: string
  excerpt: string
  slug: string
}

export interface PostWithBody extends Post {
  body?: unknown[]
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}
