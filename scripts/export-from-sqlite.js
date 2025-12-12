// SQLite veritabanından veri export etme scripti
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

// SQLite için Prisma client
const sqlitePrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db'
    }
  }
})

async function exportData() {
  try {
    console.log('📤 Exporting data from SQLite...')
    
    // Tüm verileri çek
    const blogs = await sqlitePrisma.blogPost.findMany()
    const categories = await sqlitePrisma.blogCategory.findMany()
    const admins = await sqlitePrisma.admin.findMany()
    const appointments = await sqlitePrisma.appointment.findMany()
    const contacts = await sqlitePrisma.contact.findMany()
    
    const exportData = {
      blogs,
      categories,
      admins,
      appointments,
      contacts,
      exportedAt: new Date().toISOString()
    }
    
    // JSON dosyasına kaydet
    const exportPath = path.join(__dirname, '..', 'backup-data.json')
    fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2))
    
    console.log('✅ Data exported successfully!')
    console.log(`📁 Export file: ${exportPath}`)
    console.log(`📊 Exported:`)
    console.log(`   - Blogs: ${blogs.length}`)
    console.log(`   - Categories: ${categories.length}`)
    console.log(`   - Admins: ${admins.length}`)
    console.log(`   - Appointments: ${appointments.length}`)
    console.log(`   - Contacts: ${contacts.length}`)
    
  } catch (error) {
    console.error('❌ Export error:', error)
    process.exit(1)
  } finally {
    await sqlitePrisma.$disconnect()
  }
}

exportData()

