import {
  Timer,
  TrendingUp,
  Hammer,
  Settings as SettingsIcon,
} from 'lucide-react'

import type { LucideIcon } from 'lucide-react'

export type Icon = LucideIcon

export const Icons: Record<string, Icon> = {
  timeline: Timer,
  trends: TrendingUp,
  maintenance: Hammer,
  settings: SettingsIcon,
}
