'use client'
import { Input } from '@core/ui/components/input'
import { Button } from '@core/ui/components/button'
import { useState } from 'react'
import { signUp } from '@/(auth)/actions/sign-up'

export default function SignUp() {
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">GIVY CRM WEBAPP</h2>
          <p className="text-sm text-gray-400 mt-2">@Givy</p>
          <p className="text-sm text-gray-400 mt-4 max-w-sm mx-auto">
            The CRM platform that is simple to set up and easy to use Givy lets you handle all your
            customers, campaign, and coupon in one place.
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          action={async (formData) => {
            const result = await signUp(formData)
            if (result.success) {
              console.log('User signed up successfully')
            } else if (result.error) {
              console.error(result.error)
            }
          }}
        >
          <div className="space-y-4">
            <div>
              <Input
                id="name"
                name="name"
                type="text"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                placeholder="Name"
              />
            </div>
            <div>
              <Input
                id="email"
                name="email"
                type="text"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                placeholder="Email"
              />
            </div>
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                placeholder="Password"
              />
            </div>
            <div>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Create account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
