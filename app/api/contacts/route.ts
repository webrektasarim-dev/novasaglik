import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendNotificationEmail } from '@/lib/email'

// GET all contacts
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    
    const contacts = await prisma.contact.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Get contacts error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

// CREATE new contact
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        status: 'new'
      }
    })

    // Send notification email
    await sendNotificationEmail({
      subject: `Yeni İletişim Mesajı - ${contact.name}`,
      text: `
Yeni iletişim mesajı alındı:
- İsim: ${contact.name}
- E-posta: ${contact.email}
- Telefon: ${contact.phone}
- Konu: ${contact.subject}
- Mesaj: ${contact.message}
      `.trim(),
      html: `
        <h2>Yeni İletişim Mesajı</h2>
        <p><strong>İsim:</strong> ${contact.name}</p>
        <p><strong>E-posta:</strong> ${contact.email}</p>
        <p><strong>Telefon:</strong> ${contact.phone}</p>
        <p><strong>Konu:</strong> ${contact.subject || '-'}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${contact.message?.replace(/\n/g, '<br>') || '-'}</p>
      `,
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Create contact error:', error)
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    )
  }
}

