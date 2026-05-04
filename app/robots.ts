import type { MetadataRoute } from 'next'

const SITE_URL = 'https://deepmindresources.pro'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/auth/', '/dashboard/', '/account/', '/settings/', '/progress/', '/brain/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
