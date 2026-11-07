import type { MetadataRoute } from 'next'
import { cases } from '@/lib/career-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.nurse-canvas.com'
  const lastModified = new Date()

  return [
    {
      url: baseUrl,
      lastModified,
    },
    ...cases.map((careerCase) => ({
      url: `${baseUrl}/cases/${careerCase.id}`,
      lastModified,
    })),
  ]
}
