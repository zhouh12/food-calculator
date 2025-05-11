import '../globals.css'
import '@core/ui/globals.css'
import type { Metadata } from 'next'
import { AppSidebar } from '../components/app-sidebar'
import { AppSidebarInset } from '../components/app-sidebar-inset'
import { AppSidebarProvider } from '../components/app-siderbar-provider'

export const metadata: Metadata = {
  title: 'Explorer Dashboard',
  description: 'Blockchain Explorer Dashboard',
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppSidebarProvider>
      <AppSidebar />
      <AppSidebarInset>{children}</AppSidebarInset>
    </AppSidebarProvider>
  )
}
