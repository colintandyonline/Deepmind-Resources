import type { MetadataRoute } from 'next'
import { getPublicSiteRoutes } from '@/lib/public-site-routes'

export default function sitemap(): MetadataRoute.Sitemap {
  return getPublicSiteRoutes().map((route) => ({
    url: route.url,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
