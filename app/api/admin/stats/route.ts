import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [totalAppointments, pendingAppointments, totalBlogs, totalContacts] = await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: 'pending' } }),
      prisma.blogPost.count(),
      prisma.contact.count()
    ])

    return NextResponse.json({
      totalAppointments,
      pendingAppointments,
      totalBlogs,
      totalContacts
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

