// types/index.ts

export interface Project {
  id: string
  slug: string
  title: string
  subtitle: string
  category: string
  location: string
  area: string
  duration: string
  year: number
  status: 'completed' | 'ongoing' | 'upcoming'
  client: string
  description: string
  fullDescription: string
  coverImage: string
  images: string[]
  tags: string[]
  featured: boolean
  value?: string
  architect?: string
}

export interface Service {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  fullDescription: string
  icon: string
  coverImage: string
  features: string[]
  process: ProcessStep[]
  featured: boolean
  order: number
}

export interface ProcessStep {
  step: number
  title: string
  description: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  social?: {
    linkedin?: string
    instagram?: string
  }
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  authorImage: string
  category: string
  tags: string[]
  coverImage: string
  publishedAt: string
  featured: boolean
  readTime: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  image: string
  projectId?: string
}

export interface Stat {
  label: string
  value: string
  suffix: string
  description: string
}

export interface SiteConfig {
  siteName: string
  tagline: string
  description: string
  phone: string
  email: string
  address: string
  city: string
  social: {
    instagram?: string
    linkedin?: string
    facebook?: string
    youtube?: string
  }
  mapCoordinates?: {
    lat: number
    lng: number
  }
}
