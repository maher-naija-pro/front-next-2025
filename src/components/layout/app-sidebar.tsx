'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { SidebarItems } from '@/constants/data'
import { Icons } from '@/components/icons'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      className="pt-16 h-screen box-border overflow-y-auto"
      collapsible="icon"
    >
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarMenu>
          {SidebarItems.map((item) => {
            const IconComponent = Icons[item.icon]
            return (
              <SidebarMenuItem key={item.title} className="mb-2">
                <SidebarMenuButton
                  asChild
                  isActive={pathname == item.url}
                  className="flex items-center gap-2 px-8 py-6 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Link
                    href={item.url}
                    className="flex items-center gap-2 w-full"
                  >
                    <IconComponent className="h-4 w-4 flex-shrink" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
