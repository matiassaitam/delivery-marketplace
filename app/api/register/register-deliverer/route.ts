import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, password, vehicle } = body

  if (!name || !email || !password || !vehicle) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const deliverer = await prisma.deliverer.create({
      data: {
        name,
        email,
        password: hashedPassword,
        vehicle,
      },
    })

    return NextResponse.json({ deliverer: { id: deliverer.id, name: deliverer.name, email: deliverer.email, vehicle: deliverer.vehicle } })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating deliverer' }, { status: 500 })
  }
}