import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const { email, password, remember } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user)
    return NextResponse.json({}, { status: 401 })

  const ok = await bcrypt.compare(password, user.password)

  if (!ok)
    return NextResponse.json({}, { status: 401 })

  const cookieStore = await cookies()

  cookieStore.set("auth", user.id, {
    httpOnly: true,
    path: "/",
    maxAge: remember ? 60 * 60 * 24 * 30 : undefined,
  })

  return NextResponse.json({ success: true })
}
