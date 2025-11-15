import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export async function verifyAdmin(email: string, password: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email }
    })

    if (!admin) {
      return null
    }

    const isValid = await bcrypt.compare(password, admin.password)
    
    if (!isValid) {
      return null
    }

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name
    }
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

export async function createAdmin(email: string, password: string, name: string) {
  const hashedPassword = await bcrypt.hash(password, 10)
  
  return prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      name
    }
  })
}

