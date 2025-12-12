// Neon veritabanına veri import etme scripti
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function importData() {
  try {
    console.log('📥 Importing data to Neon...')
    
    // Backup dosyasını oku
    const backupPath = path.join(__dirname, '..', 'backup-data.json')
    
    if (!fs.existsSync(backupPath)) {
      console.error('❌ Backup file not found:', backupPath)
      console.log('💡 First run: node scripts/export-from-sqlite.js')
      process.exit(1)
    }
    
    const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'))
    
    console.log(`📊 Found backup from: ${backupData.exportedAt}`)
    console.log(`   - Blogs: ${backupData.blogs?.length || 0}`)
    console.log(`   - Categories: ${backupData.categories?.length || 0}`)
    console.log(`   - Admins: ${backupData.admins?.length || 0}`)
    console.log(`   - Appointments: ${backupData.appointments?.length || 0}`)
    console.log(`   - Contacts: ${backupData.contacts?.length || 0}`)
    
    // Categories import
    if (backupData.categories && backupData.categories.length > 0) {
      console.log('\n📁 Importing categories...')
      for (const cat of backupData.categories) {
        await prisma.blogCategory.upsert({
          where: { slug: cat.slug },
          update: {
            name: cat.name,
            description: cat.description,
            color: cat.color
          },
          create: {
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            description: cat.description,
            color: cat.color,
            createdAt: new Date(cat.createdAt),
            updatedAt: new Date(cat.updatedAt)
          }
        })
      }
      console.log(`✅ Imported ${backupData.categories.length} categories`)
    }
    
    // Blogs import
    if (backupData.blogs && backupData.blogs.length > 0) {
      console.log('\n📝 Importing blogs...')
      for (const blog of backupData.blogs) {
        try {
          await prisma.blogPost.upsert({
            where: { slug: blog.slug },
            update: {
              title: blog.title,
              excerpt: blog.excerpt,
              content: blog.content,
              category: blog.category,
              image: blog.image,
              published: blog.published,
              views: blog.views
            },
            create: {
              id: blog.id,
              title: blog.title,
              slug: blog.slug,
              excerpt: blog.excerpt,
              content: blog.content,
              category: blog.category,
              image: blog.image,
              published: blog.published,
              views: blog.views || 0,
              createdAt: new Date(blog.createdAt),
              updatedAt: new Date(blog.updatedAt)
            }
          })
        } catch (error) {
          console.warn(`⚠️  Skipped blog: ${blog.title} - ${error.message}`)
        }
      }
      console.log(`✅ Imported ${backupData.blogs.length} blogs`)
    }
    
    // Admins import
    if (backupData.admins && backupData.admins.length > 0) {
      console.log('\n👤 Importing admins...')
      for (const admin of backupData.admins) {
        await prisma.admin.upsert({
          where: { email: admin.email },
          update: {},
          create: {
            id: admin.id,
            email: admin.email,
            password: admin.password,
            name: admin.name,
            createdAt: new Date(admin.createdAt),
            updatedAt: new Date(admin.updatedAt)
          }
        })
      }
      console.log(`✅ Imported ${backupData.admins.length} admins`)
    }
    
    // Appointments import
    if (backupData.appointments && backupData.appointments.length > 0) {
      console.log('\n📅 Importing appointments...')
      for (const appointment of backupData.appointments) {
        try {
          await prisma.appointment.create({
            data: {
              id: appointment.id,
              name: appointment.name,
              email: appointment.email,
              phone: appointment.phone,
              service: appointment.service,
              date: appointment.date,
              time: appointment.time,
              message: appointment.message,
              status: appointment.status,
              createdAt: new Date(appointment.createdAt),
              updatedAt: new Date(appointment.updatedAt)
            }
          })
        } catch (error) {
          console.warn(`⚠️  Skipped appointment: ${appointment.id} - ${error.message}`)
        }
      }
      console.log(`✅ Imported ${backupData.appointments.length} appointments`)
    }
    
    // Contacts import
    if (backupData.contacts && backupData.contacts.length > 0) {
      console.log('\n📧 Importing contacts...')
      for (const contact of backupData.contacts) {
        try {
          await prisma.contact.create({
            data: {
              id: contact.id,
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
              subject: contact.subject,
              message: contact.message,
              status: contact.status,
              createdAt: new Date(contact.createdAt),
              updatedAt: new Date(contact.updatedAt)
            }
          })
        } catch (error) {
          console.warn(`⚠️  Skipped contact: ${contact.id} - ${error.message}`)
        }
      }
      console.log(`✅ Imported ${backupData.contacts.length} contacts`)
    }
    
    console.log('\n🎉 Import completed successfully!')
    
  } catch (error) {
    console.error('❌ Import error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

importData()

