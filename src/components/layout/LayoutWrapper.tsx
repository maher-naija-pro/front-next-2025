'use client'

import React from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import SidebarLayout from './layout-sidebar'
import HeaderMobile from './header-mobile'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useIsMobile()

  if (isMobile === undefined) return null

  return (
    <>
      {isMobile && <HeaderMobile />}
      {isMobile ? <>{children}</> : <SidebarLayout>{children}</SidebarLayout>}
    </>
  )
}
