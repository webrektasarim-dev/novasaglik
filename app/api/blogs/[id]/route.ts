import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET single blog
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = await prisma.blogPost.findUnique({
      where: { id }
    })

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Get blog error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

// UPDATE blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json()

    const blog = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        image: data.image,
        published: data.published
      }
    })

    return NextResponse.json(blog)
  } catch (error: any) {
    console.error('Update blog error:', error)
    
    // 413 hatası için özel mesaj (Vercel limit aşılırsa)
    if (error.message?.includes('413') || error.message?.includes('too large') || error.message?.includes('PayloadTooLarge')) {
      return NextResponse.json(
        { error: 'İçerik çok büyük. Lütfen içeriği kısaltın veya görselleri optimize edin.' },
        { status: 413 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

// DELETE blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Önce blog'un var olup olmadığını kontrol et
    const blog = await prisma.blogPost.findUnique({
      where: { id }
    })

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    // Blog'u sil
    await prisma.blogPost.delete({
      where: { id }
    })

    return NextResponse.json({ 
      success: true,
      message: 'Blog başarıyla silindi'
    })
  } catch (error: any) {
    console.error('Delete blog error:', error)
    
    // Prisma hatalarını kontrol et
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Blog bulunamadı' },
        { status: 404 }
      )
    }
    
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Blog silinemiyor, bağlı kayıtlar var' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Blog silinirken hata oluştu',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

