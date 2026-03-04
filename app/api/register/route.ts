import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const existed = await prisma.user.findUnique({
    where: { email },
  })

  if (existed)
    return NextResponse.json(
      { message: "Email đã tồn tại" },
      { status: 400 }
    )

  const hash = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      password: hash,
    },
  })

  return NextResponse.json({ success: true })
}
