import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// UPDATE category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json()

    const category = await prisma.blogCategory.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        color: data.color
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Update category error:', error)
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

// DELETE category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Check if category is being used
    const postsUsingCategory = await prisma.blogPost.count({
      where: { 
        category: {
          equals: (await prisma.blogCategory.findUnique({ where: { id } }))?.name
        }
      }
    })

    if (postsUsingCategory > 0) {
      return NextResponse.json(
        { error: `Bu kategori ${postsUsingCategory} blog yazısında kullanılıyor. Önce o yazıları başka kategoriye taşıyın.` },
        { status: 400 }
      )
    }

    await prisma.blogCategory.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete category error:', error)
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}

