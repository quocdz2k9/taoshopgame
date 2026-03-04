"use client"

import { useTheme } from "next-themes"
import { Sun, Moon, Laptop } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const Item = ({
    value,
    icon: Icon,
  }: {
    value: string
    icon: any
  }) => (
    <button
      onClick={() => setTheme(value)}
      className={cn(
        "p-2 rounded-lg transition",
        theme === value && "bg-muted"
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  )

  return (
    <div className="flex items-center gap-1 rounded-xl border bg-background p-1">
      <Item value="system" icon={Laptop} />
      <Item value="light" icon={Sun} />
      <Item value="dark" icon={Moon} />
    </div>
  )
}
