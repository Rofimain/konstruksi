import { NextResponse } from 'next/server'
import { getSettings } from '@/lib/db'
import { siteConfig } from '@/data'

export const revalidate = 60

export async function GET() {
  try {
    const settings = await getSettings()
    // Fallback ke siteConfig kalau Supabase belum disetup
    return NextResponse.json({
      site_name:   settings.site_name   || siteConfig.siteName,
      tagline:     settings.tagline     || siteConfig.tagline,
      description: settings.description || siteConfig.description,
      phone:       settings.phone       || siteConfig.phone,
      email:       settings.email       || siteConfig.email,
      address:     settings.address     || siteConfig.address,
      whatsapp:    settings.whatsapp    || '',
      instagram:   settings.instagram   || siteConfig.social.instagram || '',
      linkedin:    settings.linkedin    || siteConfig.social.linkedin  || '',
      facebook:    settings.facebook    || siteConfig.social.facebook  || '',
      youtube:     settings.youtube     || siteConfig.social.youtube   || '',
    })
  } catch {
    // Fallback ke static data
    return NextResponse.json({
      site_name:   siteConfig.siteName,
      tagline:     siteConfig.tagline,
      description: siteConfig.description,
      phone:       siteConfig.phone,
      email:       siteConfig.email,
      address:     siteConfig.address,
      whatsapp:    '',
    })
  }
}
