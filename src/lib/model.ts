import { Icons } from '../components/icons'

export interface SidebarItem {
  title: string
  url: string
  icon: keyof typeof Icons
  isActive: boolean
  description?: string
  disabled?: boolean
  items?: SidebarItem[]
}

export interface LoginProps {
  dict: {
    errors: {
      invalidEmail: string
      invalidPassword: string
      unexpected?: string
    }
    login: {
      title?: string
      subtitle?: string
      emailLabel?: string
      emailPlaceholder?: string
      passwordLabel?: string
      passwordPlaceholder?: string
      rememberMe?: string
      forgotPassword?: string
      loggingIn?: string
      signIn?: string
    }
  }
  lang: string
}
