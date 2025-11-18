import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('🏷️ Seeding categories...')

    const defaultCategories = [
      // Hizmetlerimiz kategorileri
      { name: 'Serum Takma', description: 'Evde serum tedavisi ve IV uygulamaları', color: '#14b8a6' },
      { name: 'Enjeksiyon Hizmeti', description: 'Enjeksiyon uygulamaları ve aşı hizmetleri', color: '#3b82f6' },
      { name: 'Hemşirelik Hizmetleri', description: 'Kapsamlı hemşirelik ve hasta bakım hizmetleri', color: '#10b981' },
      { name: 'Yara Bakımı', description: 'Yara bakımı ve pansuman hizmetleri', color: '#8b5cf6' },
      { name: 'Sonda ve Kateter Bakımı', description: 'Sonda ve kateter bakım hizmetleri', color: '#f97316' },
      { name: 'Tansiyon ve Şeker Ölçümü', description: 'Vital bulgu takibi ve ölçüm hizmetleri', color: '#ec4899' },
      { name: 'Taburcu Sonrası Bakım', description: 'Hastane sonrası evde bakım hizmetleri', color: '#eab308' },
      { name: 'Yaşlı Bakımı', description: 'Yaşlı hasta bakımı ve refakatçi hizmetleri', color: '#06b6d4' },
      { name: 'Fizik Tedavi Desteği', description: 'Evde fizik tedavi ve rehabilitasyon hizmetleri', color: '#84cc16' },
      // Genel kategoriler
      { name: 'Hasta Bakımı', description: 'Evde hasta bakımı ipuçları', color: '#14b8a6' },
      { name: 'Kronik Hastalıklar', description: 'Kronik hastalık yönetimi', color: '#8b5cf6' },
      { name: 'Post-Operatif Bakım', description: 'Ameliyat sonrası bakım', color: '#ec4899' },
      { name: 'Sağlıklı Yaşam', description: 'Sağlıklı yaşam ipuçları', color: '#eab308' },
      { name: 'Genel', description: 'Genel sağlık bilgileri', color: '#6b7280' }
    ]

    const created = []
    const skipped = []

    for (const cat of defaultCategories) {
      const slug = cat.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
      
      try {
        const category = await prisma.blogCategory.upsert({
          where: { slug },
          update: {
            description: cat.description,
            color: cat.color
          },
          create: {
            name: cat.name,
            slug: slug,
            description: cat.description,
            color: cat.color
          }
        })

        created.push(category.name)
        console.log(`✅ Category created/updated: ${cat.name}`)
      } catch (error: any) {
        if (error.code === 'P2002') {
          skipped.push(cat.name)
          console.log(`⏭️  Category already exists: ${cat.name}`)
        } else {
          throw error
        }
      }
    }

    console.log('🎉 Categories seeding completed!')

    return NextResponse.json({
      success: true,
      message: 'Kategoriler başarıyla eklendi',
      created: created.length,
      skipped: skipped.length,
      categories: [...created, ...skipped]
    })
  } catch (error) {
    console.error('❌ Seeding error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to seed categories',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

