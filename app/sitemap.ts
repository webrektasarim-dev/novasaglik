import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const baseUrl = 'https://www.novasaglikhizmeti.com'

// Statik sayfalar
const staticPages = [
  {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  },
  {
    url: `${baseUrl}/hizmetler`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    url: `${baseUrl}/hakkimizda`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  },
  {
    url: `${baseUrl}/iletisim`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    url: `${baseUrl}/randevu`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
]

// Hizmet sayfaları (dinamik)
const serviceSlugs = [
  'serum-takma',
  'enjeksiyon',
  'hemsirelik-hizmeti',
  'labaratuvar',
]

const servicePages = serviceSlugs.map(slug => ({
  url: `${baseUrl}/hizmetler/${slug}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}))

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Blog yazılarını veritabanından çek
    const blogPosts = await prisma.blogPost.findMany({
      where: {
        published: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    // Blog sayfalarını oluştur
    const blogPages = blogPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Tüm sayfaları birleştir
    return [
      ...staticPages,
      ...servicePages,
      ...blogPages,
    ]
  } catch (error) {
    console.error('Sitemap generation error:', error)
    
    // Hata durumunda en azından statik sayfaları döndür
    return [
      ...staticPages,
      ...servicePages,
    ]
  }
}



