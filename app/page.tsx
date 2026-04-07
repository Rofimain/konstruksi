import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { getProjects, getServices, getBlogPosts, getTestimonials } from '@/lib/db'

export const revalidate = 60

export default async function HomePage() {
  const [projects, services, posts, testimonials] = await Promise.all([
    getProjects({ featured: true }).catch(() => []),
    getServices().catch(() => []),
    getBlogPosts({ published: true }).catch(() => []),
    getTestimonials().catch(() => []),
  ])

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection services={services} />
      <PortfolioSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogPreviewSection posts={posts} />
      <CtaSection />
    </>
  )
}
