import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendNotificationEmail } from '@/lib/email'

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
    
    // Aynı tarih ve saatte birden fazla randevuya izin veriliyor
    
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

    await sendNotificationEmail({
      subject: `Yeni Randevu Talebi - ${appointment.name}`,
      text: `
Yeni bir randevu talebi alındı:
- İsim: ${appointment.name}
- E-posta: ${appointment.email}
- Telefon: ${appointment.phone}
- Hizmet: ${appointment.service}
- Tarih: ${appointment.date}
- Saat: ${appointment.time}
- Mesaj: ${appointment.message || '-'}
      `.trim(),
      html: `
        <h2>Yeni Randevu Talebi</h2>
        <p><strong>İsim:</strong> ${appointment.name}</p>
        <p><strong>E-posta:</strong> ${appointment.email}</p>
        <p><strong>Telefon:</strong> ${appointment.phone}</p>
        <p><strong>Talep Edilen Hizmet:</strong> ${appointment.service}</p>
        <p><strong>Tarih:</strong> ${appointment.date}</p>
        <p><strong>Saat:</strong> ${appointment.time}</p>
        ${appointment.message ? `<p><strong>Mesaj:</strong><br/>${appointment.message.replace(/\n/g, '<br>')}</p>` : ''}
      `,
    })

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

