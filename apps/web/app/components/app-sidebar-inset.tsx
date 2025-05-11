'use client'

import { SidebarInset } from '@ui/components/ui/sidebar'

export function AppSidebarInset({ children }: { children: React.ReactNode }) {
  return <SidebarInset>{children}</SidebarInset>
}
