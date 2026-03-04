"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Loader2,
  User
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { toast } from "sonner"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const res = await fetch("/api/me")

      if (!res.ok) {
        setUser(null)
        return
      }

      const data = await res.json()
      setUser(data)
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" })
    toast.success("Đã đăng xuất")
    window.location.href = "/login"
  }

  function shortEmail(email: string) {
    if (email.length <= 18) return email
    return email.slice(0, 10) + "..."
  }

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4">

          {/* ===== LOGO ===== */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight text-foreground hover:opacity-80 transition"
          >
            <svg width="22" height="18" viewBox="0 0 76 65" className="fill-current">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
            <span className="text-sm sm:text-base">TAOSHOP.PRO.VN</span>
          </Link>

          {/* ===== RIGHT SIDE ===== */}
          <div className="flex items-center gap-2">

            {loading && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}

            {/* ===== NOT LOGIN (Ask AI → Đăng nhập) ===== */}
            {!loading && !user && (
              <Link href="/login">
                <Button className="rounded-xl">
                  Đăng nhập
                </Button>
              </Link>
            )}

            {/* ===== LOGGED IN (show email like Vercel) ===== */}
            {!loading && user && (
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="rounded-xl max-w-[140px] truncate"
                >
                  <User className="w-4 h-4 mr-2" />
                  {shortEmail(user.email)}
                </Button>
              </Link>
            )}

            {/* MENU BUTTON */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* ================= FULLSCREEN MENU ================= */}
      {open && (
        <div className="fixed inset-0 bg-background z-[100]">

          {/* header */}
          <div className="flex items-center justify-between h-14 px-4 border-b">
            <span className="font-semibold">Menu</span>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* content */}
          <div className="p-6 text-base">

  {/* ===== USER INFO ===== */}
  {user && (
    <>
      <p className="text-sm text-muted-foreground break-all mb-4">
        {user.email}
      </p>
      <div className="border-t mb-5" />
    </>
  )}

  {/* ===== MAIN ACTIONS ===== */}
  <div className="space-y-3">

    {!user ? (
      <>
        <Link href="/login" className="block">
          <Button className="w-full h-11 rounded-xl">
            Đăng nhập
          </Button>
        </Link>

        <Link href="/register" className="block">
          <Button
            variant="outline"
            className="w-full h-11 rounded-xl"
          >
            Đăng ký
          </Button>
        </Link>
      </>
    ) : (
      <>
        <Link href="/dashboard" className="block">
          <Button
            variant="outline"
            className="w-full h-11 rounded-xl"
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </Link>

        <Button
          variant="destructive"
          className="w-full h-11 rounded-xl"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Đăng xuất
        </Button>
      </>
    )}
  </div>

  {/* ===== DIVIDER ===== */}
  <div className="border-t my-6" />

  {/* ===== THEME ===== */}
  <div className="flex items-center justify-between py-2">
    <span className="text-sm font-medium">
      Giao diện
    </span>
    <ThemeToggle />
  </div>

</div>
        </div>
      )}
    </>
  )
}
