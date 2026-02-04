'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Map,
  Truck,
  Trash2,
  Calendar,
  BarChart3,
  DollarSign,
  Zap,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Map, label: 'Live Map', href: '/map' },
  { icon: Truck, label: 'Drivers', href: '/drivers' },
  { icon: Trash2, label: 'Bins', href: '/bins' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: DollarSign, label: 'Pricing', href: '/pricing' },
  { icon: Zap, label: 'Decision Support', href: '/decision-support' },
]

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Refined Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => onOpenChange(false)}
        />
      )}

      <aside
        className={cn(
          'fixed md:relative z-50 h-screen transition-all duration-300 ease-in-out border-r border-border bg-card flex flex-col',
          open ? 'w-64' : 'w-0 -translate-x-full md:translate-x-0 md:w-20'
        )}
      >
        {/* Header/Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 mb-4">
          {open && (
            <div className="flex items-center gap-2 pl-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="text-primary-foreground" size={18} fill="currentColor" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                WasteFlow
              </span>
            </div>
          )}
          
          <button
            onClick={() => onOpenChange(!open)}
            className={cn(
              "p-2 rounded-xl border border-border bg-background hover:bg-accent text-muted-foreground transition-all duration-200",
              !open && "mx-auto"
            )}
          >
            {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />
                )}

                <Icon 
                  size={20} 
                  className={cn(
                    "flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} 
                />
                
                {open && (
                  <span className={cn(
                    "text-sm font-medium transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                  )}>
                    {item.label}
                  </span>
                )}
                
                {/* Tooltip for collapsed state would go here */}
              </Link>
            )
          })}
        </nav>

        {/* Footer/Profile Section */}
        <div className="p-3 mt-auto border-t border-border">
          <button className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
            "hover:bg-accent group text-muted-foreground hover:text-foreground",
            !open && "justify-center"
          )}>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
              <UserCircle size={24} className="group-hover:text-primary transition-colors" />
            </div>
            {open && (
              <div className="flex flex-col items-start overflow-hidden text-left">
                <span className="text-sm font-semibold truncate w-full">Admin User</span>
                <span className="text-xs text-muted-foreground truncate w-full">View Settings</span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}