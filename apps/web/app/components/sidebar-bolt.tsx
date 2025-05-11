'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@core/ui/lib/utils'
import { Button } from '@core/ui/components/button'
import { ScrollArea } from '@core/ui/components/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@core/ui/components/sheet'
import { Menu, Globe, Coins, BarChart2, Wrench, Settings } from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Blockchain', href: '/blockchain', icon: Globe },
  { name: 'Tokens', href: '/tokens', icon: Coins },
  { name: 'Charts & stats', href: '/stats', icon: BarChart2 },
  { name: 'API', href: '/api', icon: Wrench },
  { name: 'Other', href: '/other', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <ScrollArea className="h-full py-6">
            <div className="px-4 py-2">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold">INK</span>
              </Link>
            </div>
            <div className="space-y-1 px-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      pathname === item.href ? 'bg-accent' : 'transparent'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background px-6">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">INK</span>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground',
                            pathname === item.href ? 'bg-accent' : 'transparent'
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
