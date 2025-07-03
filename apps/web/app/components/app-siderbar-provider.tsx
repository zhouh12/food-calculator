'use client'

import { SidebarProvider } from '@core/ui/components/sidebar'

export function AppSidebarProvider({ children }: { children: React.ReactNode }) {
  return <SidebarProvider>{children}</SidebarProvider>
}
