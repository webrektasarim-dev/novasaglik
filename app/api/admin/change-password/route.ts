import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updatePassword } from '@/lib/auth'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'novasaglik-secret-key-2024'

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

    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (error) {
      return NextResponse.json(
        { error: 'Geçersiz token' },
        { status: 401 }
      )
    }

    const { currentPassword, newPassword } = await request.json()

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Mevcut şifre ve yeni şifre gereklidir' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Yeni şifre en az 6 karakter olmalıdır' },
        { status: 400 }
      )
    }

    // Get admin from database
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id }
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin kullanıcısı bulunamadı' },
        { status: 404 }
      )
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, admin.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Mevcut şifre yanlış' },
        { status: 401 }
      )
    }

    // Update password
    await updatePassword(decoded.id, newPassword)

    return NextResponse.json({
      success: true,
      message: 'Şifre başarıyla değiştirildi'
    })
  } catch (error: any) {
    console.error('Error changing password:', error)
    return NextResponse.json(
      { 
        error: 'Bir hata oluştu',
        details: error.message
      },
      { status: 500 }
    )
  }
}

