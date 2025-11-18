import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'site-settings' }
    })

    return NextResponse.json({
      maintenanceMode: settings?.maintenanceMode || false
    })
  } catch (error: any) {
    console.error('Maintenance check error:', error)
    // If there's an error, assume maintenance mode is off
    return NextResponse.json({
      maintenanceMode: false
    })
  }
}

