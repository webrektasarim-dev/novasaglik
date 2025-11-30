import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 400 }
      )
    }

    // File validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Sadece resim dosyaları yüklenebilir (JPG, PNG, GIF, WEBP)' },
        { status: 400 }
      )
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Dosya boyutu maksimum 5MB olmalıdır' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-z0-9.]/gi, '-').toLowerCase()
    const filename = `${timestamp}-${originalName}`
    
    // Check if we're in a serverless environment (Vercel)
    const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV
    
    if (isVercel) {
      // In Vercel/serverless, we can't write to filesystem
      // Convert to base64 and return it, or use external storage
      const base64 = buffer.toString('base64')
      const dataUrl = `data:${file.type};base64,${base64}`
      
      return NextResponse.json({
        success: true,
        url: dataUrl,
        filename: filename,
        message: 'Not: Vercel ortamında dosya sistemi yazma desteklenmiyor. Lütfen görsel URL\'si kullanın veya Cloudinary gibi bir servis entegre edin.'
      })
    }

    // Local development - save to filesystem
    const uploadDir = path.join(process.cwd(), 'public', 'blog-images')
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (err: any) {
      // Directory might already exist, but check for other errors
      if (err.code !== 'EEXIST') {
        console.error('Directory creation error:', err)
        throw err
      }
    }

    // Save file
    const filepath = path.join(uploadDir, filename)
    await writeFile(filepath, buffer)

    // Return public URL
    const url = `/blog-images/${filename}`

    return NextResponse.json({
      success: true,
      url: url,
      filename: filename
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    
    // Provide more detailed error message
    let errorMessage = 'Dosya yüklenirken hata oluştu'
    if (error.code === 'EACCES' || error.code === 'EPERM') {
      errorMessage = 'Dosya yazma izni yok. Vercel ortamında dosya sistemi yazma desteklenmiyor. Lütfen görsel URL\'si kullanın.'
    } else if (error.code === 'ENOENT') {
      errorMessage = 'Dizin bulunamadı'
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

