import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('Starting migration for SiteSettings table...')
    
    // SiteSettings tablosunu oluştur (PostgreSQL syntax)
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "SiteSettings" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "maintenanceMode" BOOLEAN NOT NULL DEFAULT false,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)
    
    console.log('SiteSettings table created successfully')
    
    // Default settings ekle
    await prisma.$executeRawUnsafe(`
      INSERT INTO "SiteSettings" ("id", "maintenanceMode", "updatedAt")
      VALUES ('site-settings', false, CURRENT_TIMESTAMP)
      ON CONFLICT ("id") DO NOTHING;
    `)
    
    console.log('Default settings inserted successfully')
    
    // Kontrol et
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'site-settings' }
    })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Migration completed successfully',
      settings: settings
    })
  } catch (error: any) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { 
        error: 'Migration failed', 
        details: error.message,
        code: error.code
      },
      { status: 500 }
    )
  }
}

