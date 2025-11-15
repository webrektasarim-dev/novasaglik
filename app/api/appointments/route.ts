import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all appointments
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    
    const appointments = await prisma.appointment.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Get appointments error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}

// CREATE new appointment
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Randevu çakışma kontrolü - aynı tarih ve saatte başka randevu var mı?
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        date: data.date,
        time: data.time,
        status: {
          not: 'cancelled' // İptal edilen randevular çakışma sayılmaz
        }
      }
    })

    if (conflictingAppointment) {
      return NextResponse.json(
        { 
          error: 'Bu tarih ve saatte zaten bir randevu var. Lütfen başka bir saat seçin.',
          conflict: true
        },
        { status: 409 }
      )
    }
    
    const appointment = await prisma.appointment.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        date: data.date,
        time: data.time,
        message: data.message || null,
        status: 'pending'
      }
    })

    // Email bildirimi gönder (opsiyonel - email servisi kurulduğunda aktif edilebilir)
    // TODO: Email bildirimi ekle

    return NextResponse.json({
      success: true,
      appointment,
      message: 'Randevu talebiniz alındı. En kısa sürede size dönüş yapacağız.'
    })
  } catch (error) {
    console.error('Create appointment error:', error)
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}

