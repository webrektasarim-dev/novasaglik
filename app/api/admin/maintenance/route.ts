import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'novasaglik-secret-key-2024'

// Get maintenance mode status
export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: 'site-settings' }
    })

    // If settings don't exist, create them with default values
    if (!settings) {
      try {
        settings = await prisma.siteSettings.create({
          data: {
            id: 'site-settings',
            maintenanceMode: false
          }
        })
      } catch (createError: any) {
        // If table doesn't exist, return default value
        if (createError.code === 'P2001' || createError.message?.includes('does not exist')) {
          return NextResponse.json({
            maintenanceMode: false,
            message: 'Settings table not found. Please run migration.'
          })
        }
        throw createError
      }
    }

    return NextResponse.json({
      maintenanceMode: settings.maintenanceMode
    })
  } catch (error: any) {
    console.error('Error fetching maintenance status:', error)
    // If table doesn't exist, return default value instead of error
    if (error.code === 'P2001' || error.message?.includes('does not exist') || error.message?.includes('Unknown table')) {
      return NextResponse.json({
        maintenanceMode: false,
        message: 'Settings table not found. Please run migration.'
      })
    }
    return NextResponse.json(
      { error: 'Bir hata oluştu', details: error.message },
      { status: 500 }
    )
  }
}

// Toggle maintenance mode
export async function POST(request: NextRequest) {
  try {
    // Verify admin token
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    try {
      jwt.verify(token, JWT_SECRET)
    } catch (error) {
      return NextResponse.json(
        { error: 'Geçersiz token' },
        { status: 401 }
      )
    }

    const { maintenanceMode } = await request.json()

    // Get or create settings
    let settings = await prisma.siteSettings.findUnique({
      where: { id: 'site-settings' }
    })

    if (!settings) {
      try {
        settings = await prisma.siteSettings.create({
          data: {
            id: 'site-settings',
            maintenanceMode: maintenanceMode ?? false
          }
        })
      } catch (createError: any) {
        // If table doesn't exist, try to create it via raw SQL
        if (createError.code === 'P2001' || createError.message?.includes('does not exist') || createError.message?.includes('Unknown table')) {
          try {
            // Try to create table via raw SQL (PostgreSQL syntax)
            await prisma.$executeRawUnsafe(`
              CREATE TABLE IF NOT EXISTS "SiteSettings" (
                "id" TEXT NOT NULL PRIMARY KEY,
                "maintenanceMode" BOOLEAN NOT NULL DEFAULT false,
                "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
              );
            `)
            
            // Insert default settings (PostgreSQL syntax)
            await prisma.$executeRawUnsafe(`
              INSERT INTO "SiteSettings" ("id", "maintenanceMode", "updatedAt")
              VALUES ('site-settings', ${maintenanceMode ?? false ? 'true' : 'false'}, CURRENT_TIMESTAMP)
              ON CONFLICT ("id") DO NOTHING;
            `)
            
            settings = await prisma.siteSettings.findUnique({
              where: { id: 'site-settings' }
            })
          } catch (sqlError: any) {
            console.error('SQL creation error:', sqlError)
            return NextResponse.json(
              { 
                error: 'Veritabanı tablosu bulunamadı. Lütfen migration çalıştırın.',
                details: sqlError.message,
                code: 'MIGRATION_REQUIRED'
              },
              { status: 500 }
            )
          }
        } else {
          throw createError
        }
      }
    } else {
      settings = await prisma.siteSettings.update({
        where: { id: 'site-settings' },
        data: {
          maintenanceMode: maintenanceMode ?? !settings.maintenanceMode
        }
      })
    }

    return NextResponse.json({
      success: true,
      maintenanceMode: settings?.maintenanceMode ?? false
    })
  } catch (error: any) {
    console.error('Error updating maintenance mode:', error)
    
    // More detailed error messages
    if (error.code === 'P2001' || error.message?.includes('does not exist') || error.message?.includes('Unknown table')) {
      return NextResponse.json(
        { 
          error: 'Veritabanı tablosu bulunamadı. Lütfen migration çalıştırın.',
          code: 'MIGRATION_REQUIRED'
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Bir hata oluştu',
        details: error.message,
        code: error.code || 'UNKNOWN_ERROR'
      },
      { status: 500 }
    )
  }
}

