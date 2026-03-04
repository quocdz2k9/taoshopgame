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

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password, remember }),
    })

    setLoading(false)

    if (!res.ok) {
      toast.error("Sai email hoặc mật khẩu")
      return
    }

    toast.success("Đăng nhập thành công")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-6 border rounded-2xl p-8 shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center">
          Đăng nhập tài khoản
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

        {/* remember */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          Ghi nhớ đăng nhập
        </label>

        <Button className="w-full rounded-xl" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Đăng nhập
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="underline font-medium">
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  )
}
