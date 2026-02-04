'use client'

import { Menu, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TopBarProps {
  onMenuClick: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
      >
        <Menu size={20} className="text-foreground" />
      </button>

      <div className="hidden md:block" />

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
          <Bell size={20} className="text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <User size={20} className="text-foreground" />
        </button>
      </div>
    </header>
  )
}
