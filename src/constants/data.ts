import { SidebarItem } from '@/lib/model'

export const SidebarItems: SidebarItem[] = [
  {
    title: 'Timeline',
    url: '/timeline',
    icon: 'timeline', // correspond à Icons.timeline
    isActive: false,
  },
  {
    title: 'Trends',
    url: '/trends',
    icon: 'trends',
    isActive: false,
  },
  {
    title: 'Maintenance',
    url: '/maintenance',
    icon: 'maintenance',
    isActive: false,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: 'settings',
    isActive: false,
  },
]
