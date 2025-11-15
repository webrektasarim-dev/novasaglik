import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🏷️ Seeding categories...')

  const defaultCategories = [
    { name: 'Hasta Bakımı', description: 'Evde hasta bakımı ipuçları', color: '#14b8a6' },
    { name: 'Yaşlı Bakımı', description: 'Yaşlı hasta bakım rehberi', color: '#3b82f6' },
    { name: 'Yara Bakımı', description: 'Yara bakımı ve tedavisi', color: '#10b981' },
    { name: 'Kronik Hastalıklar', description: 'Kronik hastalık yönetimi', color: '#8b5cf6' },
    { name: 'Tedavi', description: 'Tedavi yöntemleri', color: '#f97316' },
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

