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
    // Request body size kontrolü (Vercel limit: 4.5MB)
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 4 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'İçerik çok büyük. Lütfen görselleri URL olarak kullanın veya içeriği kısaltın.' },
        { status: 413 }
      )
    }

    const { id } = await params;
    const data = await request.json()

    // Content içindeki base64 görselleri kontrol et
    if (data.content && data.content.length > 3 * 1024 * 1024) {
      const base64ImageCount = (data.content.match(/data:image[^"']+/g) || []).length
      if (base64ImageCount > 0) {
        console.warn(`Blog içeriğinde ${base64ImageCount} adet base64 görsel tespit edildi. İçerik boyutu: ${(data.content.length / 1024 / 1024).toFixed(2)}MB`)
      }
    }

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
    
    // 413 hatası için özel mesaj
    if (error.message?.includes('413') || error.message?.includes('too large')) {
      return NextResponse.json(
        { error: 'İçerik çok büyük. Lütfen görselleri URL olarak kullanın veya içeriği kısaltın. Base64 görseller yerine URL kullanmanız önerilir.' },
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
    await prisma.blogPost.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete blog error:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}

