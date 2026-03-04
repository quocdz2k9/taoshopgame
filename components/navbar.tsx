"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4">

          {/* logo */}
<Link
  href="/"
  className="flex items-center gap-2 font-semibold tracking-tight text-foreground"
>
  <svg
    width="22"
    height="18"
    viewBox="0 0 76 65"
    className="fill-current"
  >
    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
  </svg>

  <span className="text-sm sm:text-base">
    TAOSHOP.PRO.VN
  </span>
</Link>

          {/* right side */}
          <div className="flex items-center gap-3">
            <Button className="rounded-xl">
              Đăng nhập
            </Button>

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

      {/* ===== FULLSCREEN MENU ===== */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-background">

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
          <div className="p-6 space-y-6 text-base">

            <p className="text-muted-foreground">
              khosharecodevn@gmail.com
            </p>

            <hr />

            <div className="space-y-3">
              <p>Dashboard</p>
              <p>Account Settings</p>
              <p>Create Team</p>
            </div>

            <hr />

            <div className="space-y-3">
              <p>Products</p>
              <p>Resources</p>
              <p>Solutions</p>
              <p>Pricing</p>
            </div>

            <hr />

            <div className="flex items-center justify-between">
              <span>Theme</span>
              <ThemeToggle />
            </div>

            <Button
              variant="destructive"
              className="w-full rounded-xl"
            >
              Log Out
            </Button>

          </div>
        </div>
      )}
    </>
  )
}
