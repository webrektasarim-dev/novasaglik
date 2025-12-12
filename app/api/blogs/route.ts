import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all blogs
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const published = searchParams.get('published')
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam, 10) : undefined
    
    // Blog listesi için content alanını çekme (performans için)
    const blogs = await prisma.blogPost.findMany({
      where: published ? { published: published === 'true' } : {},
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        image: true,
        published: true,
        views: true,
        createdAt: true,
        updatedAt: true,
        // content alanını çekmiyoruz - sadece listeleme için gerekli değil
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    // Admin paneli için cache yok, her zaman fresh data
    const isAdmin = request.headers.get('referer')?.includes('/admin');
    
    return NextResponse.json(blogs || [], {
      headers: isAdmin ? {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      } : {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    })
  } catch (error) {
    console.error('Get blogs error:', error)
    // Hata durumunda boş array döndür ki frontend çökmesin
    return NextResponse.json([], {
      status: 200,
      headers: {
        'Cache-Control': 'no-store'
      }
    })
  }
}

// CREATE new blog
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const blog = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: `${slug}-${Date.now()}`,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        image: data.image || null,
        published: data.published || false
      }
    })

    return NextResponse.json(blog)
  } catch (error: any) {
    console.error('Create blog error:', error)
    
    // 413 hatası için özel mesaj (Vercel limit aşılırsa)
    if (error.message?.includes('413') || error.message?.includes('too large') || error.message?.includes('PayloadTooLarge')) {
      return NextResponse.json(
        { error: 'İçerik çok büyük. Lütfen içeriği kısaltın veya görselleri optimize edin.' },
        { status: 413 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}

