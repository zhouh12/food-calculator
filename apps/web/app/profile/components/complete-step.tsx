'use client'

import { Button } from '@core/ui/components/button'
import Link from 'next/link'

export function CompleteStep() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Profile Complete!</h1>
        <p className="text-gray-400 mt-2">Your custom plan is ready</p>
      </div>

      <Link href="/dashboard" className="block">
        <Button className="w-full">Go to Dashboard</Button>
      </Link>
    </div>
  )
}
