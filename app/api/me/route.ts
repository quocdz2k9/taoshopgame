import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const cookieStore = await cookies()
  const auth = cookieStore.get("auth")

  if (!auth)
    return NextResponse.json({}, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: auth.value },
    select: { id: true, email: true },
  })

  return NextResponse.json(user)
}
