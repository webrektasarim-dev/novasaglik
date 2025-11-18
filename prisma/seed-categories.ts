import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
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

  for (const cat of defaultCategories) {
    const slug = cat.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
    
    await prisma.blogCategory.upsert({
      where: { slug },
      update: {},
      create: {
        name: cat.name,
        slug: slug,
        description: cat.description,
        color: cat.color
      }
    })

    console.log(`✅ Category created/updated: ${cat.name}`)
  }

  console.log('🎉 Categories seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

