'use client'

import { SidebarInset } from '@core/ui/components/sidebar'

export function AppSidebarInset({ children }: { children: React.ReactNode }) {
  return <SidebarInset>{children}</SidebarInset>
}
