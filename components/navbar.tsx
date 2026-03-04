"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "./theme-toggle"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="font-bold text-lg tracking-tight">
          Taoshop
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost">Docs</Button>
          <Button variant="ghost">Pricing</Button>
          <Button>Login</Button>
          <ThemeToggle />
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="top" className="pt-10">

            <div className="space-y-6">

              {/* user */}
              <div>
                <p className="text-sm font-medium">khosharecodevn@gmail.com</p>
              </div>

              <Separator />

              {/* main */}
              <div className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start">Dashboard</Button>
                <Button variant="ghost" className="justify-start">Account Settings</Button>
                <Button variant="ghost" className="justify-start">Create Team</Button>
              </div>

              <Separator />

              {/* products */}
              <div className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start">Products</Button>
                <Button variant="ghost" className="justify-start">Resources</Button>
                <Button variant="ghost" className="justify-start">Solutions</Button>
                <Button variant="ghost" className="justify-start">Pricing</Button>
              </div>

              <Separator />

              {/* theme */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Theme</span>
                <ThemeToggle />
              </div>

              <Separator />

              <Button variant="destructive" className="w-full">
                Log Out
              </Button>

            </div>

          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
