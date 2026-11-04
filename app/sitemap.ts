import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://nurse-career-visualization.vercel.app',
      lastModified: new Date(),
    },
  ]
}
