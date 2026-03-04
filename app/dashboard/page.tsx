"use client"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"

export default function Dashboard() {
  async function logout() {
    await fetch("/api/logout", { method: "POST" })
    window.location.href = "/login"
  }

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-semibold">Xin chào 👋</h1>
      <p>Bạn đã đăng nhập thành công.</p>

      <Button onClick={logout} variant="destructive">
        Đăng xuất
      </Button>
    </div>
  )
}
