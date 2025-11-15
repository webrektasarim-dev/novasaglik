import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Production'da admin kullanıcısı oluşturmak için geçici endpoint
// Güvenlik: Bu endpoint'i kullandıktan sonra silin veya koruma ekleyin
export async function POST(request: NextRequest) {
  try {
    // Güvenlik kontrolü - sadece development veya özel bir secret ile çalışsın
    // Production'da ADMIN_CREATE_SECRET environment variable'ı ekleyin
    const secret = request.headers.get('x-admin-secret') || request.nextUrl.searchParams.get('secret')
    
    // Development'ta veya secret doğruysa devam et
    if (process.env.NODE_ENV === 'production') {
      if (!process.env.ADMIN_CREATE_SECRET || secret !== process.env.ADMIN_CREATE_SECRET) {
        return NextResponse.json(
          { error: 'Unauthorized - Geçerli secret gerekli' },
          { status: 401 }
        )
      }
    }

    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password ve name gerekli' },
        { status: 400 }
      )
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10)

    // Admin oluştur (varsa güncelle)
    const admin = await prisma.admin.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        name
      },
      create: {
        email,
        password: hashedPassword,
        name
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Admin kullanıcısı oluşturuldu/güncellendi',
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    })
  } catch (error: any) {
    console.error('Create admin error:', error)
    
    // Eğer kullanıcı zaten varsa
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Bu email zaten kullanılıyor' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Bir hata oluştu', details: error.message },
      { status: 500 }
    )
  }
}

