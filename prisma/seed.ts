import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('novasaglik2025', 10)
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@novasaglik.com' },
    update: {},
    create: {
      email: 'admin@novasaglik.com',
      password: hashedPassword,
      name: 'Nova Admin'
    }
  })

  console.log('✅ Admin user created:', admin.email)

  // Create sample blog posts
  const blogPost1 = await prisma.blogPost.create({
    data: {
      title: 'Evde Hasta Bakımında Dikkat Edilmesi Gerekenler',
      slug: 'evde-hasta-bakimi-dikkat-edilmesi-gerekenler',
      excerpt: 'Evde hasta bakımı yaparken nelere dikkat etmelisiniz? Uzman hemşirelerimizden önemli ipuçları.',
      content: 'Evde hasta bakımı detaylı içerik...',
      category: 'Hasta Bakımı',
      published: true
    }
  })

  console.log('✅ Sample blog post created:', blogPost1.title)

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

