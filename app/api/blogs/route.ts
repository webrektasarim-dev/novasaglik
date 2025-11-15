import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all blogs
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const published = searchParams.get('published')
    
    const blogs = await prisma.blogPost.findMany({
      where: published ? { published: published === 'true' } : {},
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Get blogs error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    )
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
  } catch (error) {
    console.error('Create blog error:', error)
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}

