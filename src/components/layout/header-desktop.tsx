'use client'

import React from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '../ui/separator'
import { UserNav } from './user-nav'
import { ModeToggle } from './ThemeToggle/theme-toggle'
import { User } from 'lucide-react'
import useScroll from '@/hooks/use-scroll'
import { cn } from '@/lib/utils'

export default function Header() {
  const scrolled = useScroll(5)
  const selectedLayout = useSelectedLayoutSegment()

  return (
    <header
      className={cn(
        'sticky inset-x-0 top-0 z-40 w-full border-b transition-all',
        {
          'border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-gray-200 bg-white': selectedLayout,
        }
      )}
    >
      <div className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="/assets/logo/amperon.png" alt="@selma" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span
              className="font-semibold text-lg leading-tight select-none"
              style={{ color: '#0b1a3d' }}
            >
              Amperon Technologies
            </span>
          </Link>

          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
