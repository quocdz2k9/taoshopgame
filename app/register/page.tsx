"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import Navbar from "@/components/navbar"

export default function RegisterPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()

    if (password !== confirm) {
      toast.error("Mật khẩu không khớp")
      return
    }

    setLoading(true)

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    setLoading(false)

    if (!res.ok) {
      toast.error("Email đã tồn tại")
      return
    }

    toast.success("Tạo tài khoản thành công 🎉")
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">

      <form
        onSubmit={handleRegister}
        className="w-full max-w-md space-y-6 border rounded-2xl p-8 shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center">
          Tạo tài khoản mới
        </h1>

        {/* email */}
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* password */}
        <div className="space-y-2">
          <Label>Mật khẩu</Label>
          <Input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* confirm */}
        <div className="space-y-2">
          <Label>Nhập lại mật khẩu</Label>
          <Input
            type="password"
            required
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <Button className="w-full rounded-xl" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Đăng ký
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Đã có tài khoản?{" "}
          <Link href="/login" className="underline font-medium">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  )
}
